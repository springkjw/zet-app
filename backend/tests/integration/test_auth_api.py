from __future__ import annotations

import json
from datetime import UTC, datetime, timedelta
from typing import Any

import httpx
import jwt
import pytest
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from cryptography.hazmat.primitives.asymmetric import rsa
from jwt.algorithms import RSAAlgorithm

from zet.db.models.user import User


def _http_json_response(url: str, status_code: int, payload: dict) -> httpx.Response:
    return httpx.Response(status_code, json=payload, request=httpx.Request("GET", url))


def _build_apple_signing_material(*, kid: str = "apple-integration-test-key") -> tuple[Any, dict[str, object]]:
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    jwk = json.loads(RSAAlgorithm.to_jwk(private_key.public_key()))
    jwk.update({"kid": kid, "alg": "RS256", "use": "sig"})
    return private_key, jwk


def _build_apple_id_token(
    private_key: Any,
    *,
    kid: str,
    audience: str = "dev.geniusproject.zet",
    issuer: str = "https://appleid.apple.com",
    subject: str = "apple-user-123",
    email: str = "apple@example.com",
    expires_delta: timedelta = timedelta(minutes=5),
) -> str:
    now = datetime.now(tz=UTC)
    return jwt.encode(
        {
            "iss": issuer,
            "aud": audience,
            "sub": subject,
            "email": email,
            "iat": int(now.timestamp()),
            "exp": int((now + expires_delta).timestamp()),
        },
        private_key,
        algorithm="RS256",
        headers={"kid": kid},
    )


@pytest.fixture
def apple_signing_material() -> tuple[Any, dict[str, object]]:
    return _build_apple_signing_material()


@pytest.fixture
def apple_identity_token(apple_signing_material: tuple[Any, dict[str, object]]) -> str:
    private_key, jwk = apple_signing_material
    return _build_apple_id_token(private_key, kid=str(jwk["kid"]))


@pytest.fixture(autouse=True)
def mock_provider_network(
    monkeypatch: pytest.MonkeyPatch,
    apple_signing_material: tuple[Any, dict[str, object]],
) -> None:
    _, apple_jwk = apple_signing_material

    async def fake_get(
        self: httpx.AsyncClient,
        url: str,
        *,
        headers: dict[str, str] | None = None,
        **_: object,
    ) -> httpx.Response:
        authorization = (headers or {}).get("Authorization", "")
        credential = authorization.removeprefix("Bearer ")

        if url == "https://kapi.kakao.com/v1/user/access_token_info":
            if credential in {"provider-token", "stable-token", "shared-subject"}:
                return _http_json_response(url, 200, {"id": 1001, "expires_in": 7199, "app_id": 1234})
            if credential == "different-kakao-user":
                return _http_json_response(url, 200, {"id": 1002, "expires_in": 7199, "app_id": 1234})
            return _http_json_response(url, 401, {"msg": "invalid token", "code": -401})

        if url == "https://kapi.kakao.com/v2/user/me":
            if credential in {"provider-token", "stable-token", "shared-subject"}:
                return _http_json_response(
                    url,
                    200,
                    {
                        "id": 1001,
                        "properties": {"nickname": "kakao-user"},
                        "kakao_account": {"email": "kakao@example.com"},
                    },
                )
            if credential == "different-kakao-user":
                return _http_json_response(
                    url,
                    200,
                    {
                        "id": 1002,
                        "properties": {"nickname": "other-kakao-user"},
                        "kakao_account": {"email": "other-kakao@example.com"},
                    },
                )
            return _http_json_response(url, 401, {"msg": "invalid token", "code": -401})

        if url == "https://openapi.naver.com/v1/nid/me":
            if credential in {"shared-subject", "refreshable-token"}:
                return _http_json_response(
                    url,
                    200,
                    {
                        "resultcode": "00",
                        "message": "success",
                        "response": {
                            "id": "naver-user-001",
                            "email": "naver@example.com",
                            "name": "Naver User",
                        },
                    },
                )
            return _http_json_response(url, 401, {"resultcode": "024", "message": "Authentication failed"})

        if url == "https://appleid.apple.com/auth/keys":
            return _http_json_response(url, 200, {"keys": [apple_jwk]})

        raise AssertionError(f"unexpected url: {url}")

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)


def build_login_payload(**overrides):
    payload = {
        "provider": "kakao",
        "credentialType": "access_token",
        "credential": "provider-token",
        "platform": "ios",
    }
    payload.update(overrides)
    return payload


async def get_user_count(test_settings) -> int:
    engine = create_async_engine(test_settings.database_url)
    session_maker = async_sessionmaker(engine, expire_on_commit=False)
    try:
        async with session_maker() as session:
            result = await session.execute(select(func.count()).select_from(User))
            return result.scalar_one()
    finally:
        await engine.dispose()


async def update_user_flags(test_settings, user_id, *, nickname: str, has_agreed_to_terms: bool, has_completed_onboarding: bool) -> None:
    engine = create_async_engine(test_settings.database_url)
    session_maker = async_sessionmaker(engine, expire_on_commit=False)
    try:
        async with session_maker() as session:
            user = await session.get(User, user_id)
            assert user is not None
            user.nickname = nickname
            user.has_agreed_to_terms = has_agreed_to_terms
            user.has_completed_onboarding = has_completed_onboarding
            await session.commit()
    finally:
        await engine.dispose()


async def test_social_login_returns_expected_shape(client) -> None:
    response = await client.post(
        "/api/auth/login",
        json=build_login_payload(),
    )

    assert response.status_code == 200
    body = response.json()
    assert set(body.keys()) == {"user", "tokens", "onboarding", "isNewUser"}
    assert body["user"]["provider"] == "kakao"
    assert "accessToken" in body["tokens"]
    assert "refreshToken" in body["tokens"]
    assert body["onboarding"] == {
        "hasAgreedToTerms": False,
        "hasCompletedOnboarding": False,
    }
    assert body["isNewUser"] is True


async def test_social_login_reuses_existing_provider_user_and_preserves_onboarding(client, test_settings) -> None:
    first_response = await client.post("/api/auth/login", json=build_login_payload(credential="stable-token"))

    assert first_response.status_code == 200
    first_body = first_response.json()
    user_id = first_body["user"]["id"]

    await update_user_flags(
        test_settings,
        user_id,
        nickname="returning-user",
        has_agreed_to_terms=True,
        has_completed_onboarding=True,
    )

    second_response = await client.post("/api/auth/login", json=build_login_payload(credential="stable-token"))

    assert second_response.status_code == 200
    second_body = second_response.json()
    assert second_body["user"]["id"] == user_id
    assert second_body["user"]["nickname"] == "returning-user"
    assert second_body["onboarding"] == {
        "hasAgreedToTerms": True,
        "hasCompletedOnboarding": True,
    }
    assert second_body["isNewUser"] is False


async def test_social_login_recovers_from_provider_identity_creation_race(client, test_settings, monkeypatch: pytest.MonkeyPatch) -> None:
    from sqlalchemy.ext.asyncio import AsyncSession

    original_commit = AsyncSession.commit
    injected_race = False

    async def race_commit(self: AsyncSession) -> None:
        nonlocal injected_race

        pending_user = next(
            (
                instance
                for instance in self.new
                if isinstance(instance, User)
                and instance.provider.value == "kakao"
                and instance.provider_subject == "1001"
            ),
            None,
        )

        if pending_user is not None and not injected_race:
            injected_race = True

            engine = create_async_engine(test_settings.database_url)
            session_maker = async_sessionmaker(engine, expire_on_commit=False)
            try:
                async with session_maker() as session:
                    session.add(
                        User(
                            nickname="raced-user",
                            provider=pending_user.provider,
                            provider_subject=pending_user.provider_subject,
                            has_agreed_to_terms=False,
                            has_completed_onboarding=False,
                        )
                    )
                    await original_commit(session)
            finally:
                await engine.dispose()

        await original_commit(self)

    monkeypatch.setattr(AsyncSession, "commit", race_commit)

    response = await client.post(
        "/api/auth/login",
        json=build_login_payload(),
    )

    assert response.status_code == 200
    body = response.json()
    assert body["user"]["nickname"] == "raced-user"
    assert body["isNewUser"] is False
    assert await get_user_count(test_settings) == 1


async def test_social_login_keeps_users_provider_scoped(client, test_settings) -> None:
    kakao_response = await client.post(
        "/api/auth/login",
        json=build_login_payload(provider="kakao", credentialType="access_token", credential="shared-subject"),
    )
    naver_response = await client.post(
        "/api/auth/login",
        json=build_login_payload(
            provider="naver",
            credentialType="access_token",
            credential="shared-subject",
            platform="android",
        ),
    )

    assert kakao_response.status_code == 200
    assert naver_response.status_code == 200
    assert kakao_response.json()["user"]["id"] != naver_response.json()["user"]["id"]
    assert await get_user_count(test_settings) == 2


async def test_social_login_rejects_invalid_verifier_credential_without_persisting_user(client, test_settings) -> None:
    response = await client.post(
        "/api/auth/login",
        json=build_login_payload(credential="invalid_signature"),
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "kakao verification failed: invalid_token"
    assert await get_user_count(test_settings) == 0


async def test_social_login_rejects_whitespace_credential_without_persisting_user(client, test_settings) -> None:
    response = await client.post(
        "/api/auth/login",
        json=build_login_payload(credential="   "),
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "kakao verification failed: empty_credential"
    assert await get_user_count(test_settings) == 0


async def test_refresh_returns_new_tokens(client) -> None:
    login_response = await client.post(
        "/api/auth/login",
        json=build_login_payload(
            provider="naver",
            credentialType="access_token",
            credential="refreshable-token",
            platform="android",
        ),
    )
    refresh_token = login_response.json()["tokens"]["refreshToken"]

    response = await client.post("/api/auth/refresh", json={"refreshToken": refresh_token})

    assert response.status_code == 200
    body = response.json()
    assert set(body["tokens"].keys()) == {"accessToken", "refreshToken"}


async def test_apple_social_login_accepts_valid_identity_token(client, apple_identity_token: str) -> None:
    response = await client.post(
        "/api/auth/login",
        json=build_login_payload(
            provider="apple",
            credentialType="id_token",
            credential=apple_identity_token,
            platform="ios",
        ),
    )

    assert response.status_code == 200
    body = response.json()
    assert body["user"]["provider"] == "apple"
    assert body["user"]["nickname"] == "apple@example.com"
    assert body["isNewUser"] is True


async def test_login_schema_rejects_legacy_provider_token_payload(client) -> None:
    response = await client.post(
        "/api/auth/login",
        json={"provider": "apple", "token": "legacy-token"},
    )

    assert response.status_code == 400


async def test_login_schema_rejects_provider_credential_type_mismatch(client, test_settings) -> None:
    response = await client.post(
        "/api/auth/login",
        json=build_login_payload(provider="apple", credentialType="access_token", credential="apple-token"),
    )

    assert response.status_code == 400
    assert await get_user_count(test_settings) == 0
