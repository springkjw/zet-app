from __future__ import annotations

import json
from datetime import UTC, datetime, timedelta
from typing import Any

import httpx
import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from jwt.algorithms import RSAAlgorithm

from zet.db.models.user import SocialProvider
from zet.domain.auth.verifiers import (
    AppleVerifier,
    AppleVerifierConfig,
    KakaoVerifier,
    KakaoVerifierConfig,
    NaverVerifier,
    NaverVerifierConfig,
    SocialVerificationError,
)


def _http_json_response(url: str, status_code: int, payload: dict) -> httpx.Response:
    return httpx.Response(status_code, json=payload, request=httpx.Request("GET", url))


def _build_apple_signing_material(*, kid: str = "apple-unit-test-key") -> tuple[Any, dict[str, object]]:
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    jwk = json.loads(RSAAlgorithm.to_jwk(private_key.public_key()))
    jwk.update({"kid": kid, "alg": "RS256", "use": "sig"})
    return private_key, jwk


def _build_apple_id_token(
    private_key: Any,
    *,
    kid: str,
    audience: str = "com.geniusproject.zet",
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


@pytest.mark.asyncio
async def test_kakao_verifier_normalizes_identity_from_kakao_userinfo(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = KakaoVerifier(
        KakaoVerifierConfig(
            app_key="kakao-app-key",
            rest_api_key="kakao-rest-api-key",
            jwks_url="https://kauth.kakao.com/.well-known/jwks.json",
        )
    )

    async def fake_get(self: httpx.AsyncClient, url: str, *, headers: dict[str, str] | None = None, **_: object) -> httpx.Response:
        assert headers == {"Authorization": "Bearer kakao-access-token"}
        if url == "https://kapi.kakao.com/v1/user/access_token_info":
            return _http_json_response(url, 200, {"id": 123456789, "expires_in": 7199, "app_id": 1234})
        if url == "https://kapi.kakao.com/v2/user/me":
            return _http_json_response(
                url,
                200,
                {
                    "id": 123456789,
                    "properties": {"nickname": "kakao-user"},
                    "kakao_account": {"email": "kakao@example.com"},
                },
            )
        raise AssertionError(f"unexpected url: {url}")

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    identity = await verifier.verify(
        credential_type="access_token",
        credential="kakao-access-token",
        platform="ios",
    )

    assert identity.model_dump() == {
        "provider": SocialProvider.KAKAO,
        "provider_user_id": "123456789",
        "email": "kakao@example.com",
        "display_name": "kakao-user",
    }


@pytest.mark.asyncio
async def test_kakao_verifier_rejects_invalid_access_token(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = KakaoVerifier(
        KakaoVerifierConfig(
            app_key="kakao-app-key",
            rest_api_key="kakao-rest-api-key",
            jwks_url="https://kauth.kakao.com/.well-known/jwks.json",
        )
    )

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 401, {"msg": "this access token does not exist", "code": -401})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="invalid_token"):
        await verifier.verify(
            credential_type="access_token",
            credential="forged-kakao-token",
            platform="ios",
        )


@pytest.mark.asyncio
async def test_naver_verifier_normalizes_identity_from_naver_profile(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = NaverVerifier(
        NaverVerifierConfig(
            client_id="naver-client-id",
            client_secret="naver-client-secret",
            userinfo_url="https://openapi.naver.com/v1/nid/me",
        )
    )

    async def fake_get(self: httpx.AsyncClient, url: str, *, headers: dict[str, str] | None = None, **_: object) -> httpx.Response:
        assert url == "https://openapi.naver.com/v1/nid/me"
        assert headers == {
            "Authorization": "Bearer naver-access-token",
            "X-Naver-Client-Id": "naver-client-id",
            "X-Naver-Client-Secret": "naver-client-secret",
        }
        return _http_json_response(
            url,
            200,
            {
                "resultcode": "00",
                "message": "success",
                "response": {
                    "id": "naver-user-123",
                    "email": "naver@example.com",
                    "nickname": "naver-user",
                    "name": "Naver User",
                },
            },
        )

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    identity = await verifier.verify(
        credential_type="access_token",
        credential="naver-access-token",
        platform="android",
    )

    assert identity.model_dump() == {
        "provider": SocialProvider.NAVER,
        "provider_user_id": "naver-user-123",
        "email": "naver@example.com",
        "display_name": "Naver User",
    }


@pytest.mark.asyncio
async def test_naver_verifier_rejects_invalid_access_token(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = NaverVerifier(
        NaverVerifierConfig(
            client_id="naver-client-id",
            client_secret="naver-client-secret",
            userinfo_url="https://openapi.naver.com/v1/nid/me",
        )
    )

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 401, {"resultcode": "024", "message": "Authentication failed"})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="invalid_token"):
        await verifier.verify(
            credential_type="access_token",
            credential="forged-naver-token",
            platform="android",
        )


@pytest.mark.asyncio
async def test_apple_verifier_validates_jwt_signature_and_claims(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = AppleVerifier(
        AppleVerifierConfig(
            bundle_id="com.geniusproject.zet",
            service_id="com.geniusproject.zet.web",
            issuer="https://appleid.apple.com",
            jwks_url="https://appleid.apple.com/auth/keys",
        )
    )
    private_key, jwk = _build_apple_signing_material()
    token = _build_apple_id_token(private_key, kid=str(jwk["kid"]))

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        assert url == "https://appleid.apple.com/auth/keys"
        return _http_json_response(url, 200, {"keys": [jwk]})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    identity = await verifier.verify(
        credential_type="id_token",
        credential=token,
        platform="ios",
    )

    assert identity.model_dump() == {
        "provider": SocialProvider.APPLE,
        "provider_user_id": "apple-user-123",
        "email": "apple@example.com",
        "display_name": None,
    }


@pytest.mark.asyncio
async def test_apple_verifier_rejects_invalid_issuer(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = AppleVerifier(
        AppleVerifierConfig(
            bundle_id="com.geniusproject.zet",
            service_id="com.geniusproject.zet.web",
            issuer="https://appleid.apple.com",
            jwks_url="https://appleid.apple.com/auth/keys",
        )
    )
    private_key, jwk = _build_apple_signing_material()
    token = _build_apple_id_token(
        private_key,
        kid=str(jwk["kid"]),
        issuer="https://evil.example.com",
    )

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 200, {"keys": [jwk]})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="invalid_issuer"):
        await verifier.verify(
            credential_type="id_token",
            credential=token,
            platform="ios",
        )


@pytest.mark.asyncio
async def test_apple_verifier_rejects_invalid_audience(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = AppleVerifier(
        AppleVerifierConfig(
            bundle_id="com.geniusproject.zet",
            service_id="com.geniusproject.zet.web",
            issuer="https://appleid.apple.com",
            jwks_url="https://appleid.apple.com/auth/keys",
        )
    )
    private_key, jwk = _build_apple_signing_material()
    token = _build_apple_id_token(
        private_key,
        kid=str(jwk["kid"]),
        audience="com.example.other",
    )

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 200, {"keys": [jwk]})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="invalid_audience"):
        await verifier.verify(
            credential_type="id_token",
            credential=token,
            platform="ios",
        )


@pytest.mark.asyncio
async def test_apple_verifier_rejects_service_audience_for_ios_login(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = AppleVerifier(
        AppleVerifierConfig(
            bundle_id="com.geniusproject.zet",
            service_id="com.geniusproject.zet.web",
            issuer="https://appleid.apple.com",
            jwks_url="https://appleid.apple.com/auth/keys",
        )
    )
    private_key, jwk = _build_apple_signing_material()
    token = _build_apple_id_token(
        private_key,
        kid=str(jwk["kid"]),
        audience="com.geniusproject.zet.web",
    )

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 200, {"keys": [jwk]})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="invalid_audience"):
        await verifier.verify(
            credential_type="id_token",
            credential=token,
            platform="ios",
        )


@pytest.mark.asyncio
async def test_apple_verifier_rejects_expired_token(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = AppleVerifier(
        AppleVerifierConfig(
            bundle_id="com.geniusproject.zet",
            service_id="com.geniusproject.zet.web",
            issuer="https://appleid.apple.com",
            jwks_url="https://appleid.apple.com/auth/keys",
        )
    )
    private_key, jwk = _build_apple_signing_material()
    token = _build_apple_id_token(
        private_key,
        kid=str(jwk["kid"]),
        expires_delta=timedelta(minutes=-5),
    )

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 200, {"keys": [jwk]})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="expired"):
        await verifier.verify(
            credential_type="id_token",
            credential=token,
            platform="ios",
        )


@pytest.mark.asyncio
async def test_apple_verifier_rejects_invalid_signature(monkeypatch: pytest.MonkeyPatch) -> None:
    verifier = AppleVerifier(
        AppleVerifierConfig(
            bundle_id="com.geniusproject.zet",
            service_id="com.geniusproject.zet.web",
            issuer="https://appleid.apple.com",
            jwks_url="https://appleid.apple.com/auth/keys",
        )
    )
    signing_key, signing_jwk = _build_apple_signing_material(kid="signing-key")
    other_private_key, other_jwk = _build_apple_signing_material(kid="other-key")
    token = _build_apple_id_token(signing_key, kid=str(signing_jwk["kid"]))

    async def fake_get(self: httpx.AsyncClient, url: str, **_: object) -> httpx.Response:
        return _http_json_response(url, 200, {"keys": [other_jwk]})

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)

    with pytest.raises(SocialVerificationError, match="invalid_signature"):
        await verifier.verify(
            credential_type="id_token",
            credential=token,
            platform="ios",
        )
