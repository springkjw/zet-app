from __future__ import annotations

from typing import Any

import httpx
from pydantic import BaseModel, Field

from ....config import Settings
from ....db.models.user import SocialProvider
from ..schemas import MobilePlatform
from .base import NormalizedSocialIdentity, SocialVerificationError, SocialVerifier

KAKAO_ACCESS_TOKEN_INFO_URL = "https://kapi.kakao.com/v1/user/access_token_info"
KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me"
PROVIDER_REQUEST_TIMEOUT_SECONDS = 5.0


class KakaoVerifierConfig(BaseModel):
    app_key: str = Field(min_length=1)
    rest_api_key: str = Field(min_length=1)
    jwks_url: str = Field(min_length=1)

    @classmethod
    def from_settings(cls, settings: Settings) -> "KakaoVerifierConfig":
        return cls(
            app_key=settings.auth_kakao_app_key,
            rest_api_key=settings.auth_kakao_rest_api_key,
            jwks_url=settings.auth_kakao_jwks_url,
        )


class KakaoVerifier(SocialVerifier):
    provider = SocialProvider.KAKAO
    credential_type = "access_token"

    def __init__(self, config: KakaoVerifierConfig) -> None:
        self.config = config

    async def _verify_credential(
        self,
        credential: str,
        platform: MobilePlatform,
    ) -> NormalizedSocialIdentity:
        _ = platform
        token_info = await self._fetch_provider_payload(KAKAO_ACCESS_TOKEN_INFO_URL, credential)
        user_info = await self._fetch_provider_payload(KAKAO_USERINFO_URL, credential)

        token_subject = self._extract_subject(token_info)
        user_subject = self._extract_subject(user_info)
        if token_subject != user_subject:
            raise SocialVerificationError(self.provider, "subject_mismatch")

        return NormalizedSocialIdentity(
            provider=self.provider,
            provider_user_id=token_subject,
            email=self._extract_email(user_info),
            display_name=self._extract_display_name(user_info),
        )

    async def _fetch_provider_payload(self, url: str, credential: str) -> dict[str, Any]:
        try:
            async with httpx.AsyncClient(timeout=PROVIDER_REQUEST_TIMEOUT_SECONDS) as client:
                response = await client.get(url, headers={"Authorization": f"Bearer {credential}"})
        except httpx.HTTPError as exc:
            raise SocialVerificationError(self.provider, "provider_unreachable") from exc

        if response.status_code in {401, 403}:
            raise SocialVerificationError(self.provider, "invalid_token")
        if response.status_code >= 400:
            raise SocialVerificationError(self.provider, "provider_error")

        payload = response.json()
        if not isinstance(payload, dict):
            raise SocialVerificationError(self.provider, "malformed_response")
        return payload

    def _extract_subject(self, payload: dict[str, Any]) -> str:
        subject = payload.get("id")
        normalized_subject = str(subject).strip() if subject is not None else ""
        if not normalized_subject:
            raise SocialVerificationError(self.provider, "malformed_response")
        return normalized_subject

    def _extract_email(self, payload: dict[str, Any]) -> str | None:
        account = payload.get("kakao_account")
        if not isinstance(account, dict):
            return None
        email = account.get("email")
        normalized_email = email.strip() if isinstance(email, str) else ""
        return normalized_email or None

    def _extract_display_name(self, payload: dict[str, Any]) -> str | None:
        properties = payload.get("properties")
        if isinstance(properties, dict):
            nickname = properties.get("nickname")
            normalized_nickname = nickname.strip() if isinstance(nickname, str) else ""
            if normalized_nickname:
                return normalized_nickname

        account = payload.get("kakao_account")
        if isinstance(account, dict):
            profile = account.get("profile")
            if isinstance(profile, dict):
                nickname = profile.get("nickname")
                normalized_nickname = nickname.strip() if isinstance(nickname, str) else ""
                if normalized_nickname:
                    return normalized_nickname
        return None
