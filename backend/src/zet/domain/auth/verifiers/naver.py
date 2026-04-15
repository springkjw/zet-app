from __future__ import annotations

from typing import Any

import httpx
from pydantic import BaseModel, Field

from ....config import Settings
from ....db.models.user import SocialProvider
from ..schemas import MobilePlatform
from .base import NormalizedSocialIdentity, SocialVerificationError, SocialVerifier

PROVIDER_REQUEST_TIMEOUT_SECONDS = 5.0


class NaverVerifierConfig(BaseModel):
    client_id: str = Field(min_length=1)
    client_secret: str = Field(min_length=1)
    userinfo_url: str = Field(min_length=1)

    @classmethod
    def from_settings(cls, settings: Settings) -> "NaverVerifierConfig":
        return cls(
            client_id=settings.auth_naver_client_id,
            client_secret=settings.auth_naver_client_secret,
            userinfo_url=settings.auth_naver_userinfo_url,
        )


class NaverVerifier(SocialVerifier):
    provider = SocialProvider.NAVER
    credential_type = "access_token"

    def __init__(self, config: NaverVerifierConfig) -> None:
        self.config = config

    async def _verify_credential(
        self,
        credential: str,
        platform: MobilePlatform,
    ) -> NormalizedSocialIdentity:
        _ = platform
        payload = await self._fetch_user_profile(credential)
        profile = payload.get("response")
        if payload.get("resultcode") != "00" or not isinstance(profile, dict):
            raise SocialVerificationError(self.provider, "invalid_token")

        provider_user_id = self._require_string(profile, "id")
        return NormalizedSocialIdentity(
            provider=self.provider,
            provider_user_id=provider_user_id,
            email=self._optional_string(profile.get("email")),
            display_name=self._resolve_display_name(profile),
        )

    async def _fetch_user_profile(self, credential: str) -> dict[str, Any]:
        try:
            async with httpx.AsyncClient(timeout=PROVIDER_REQUEST_TIMEOUT_SECONDS) as client:
                response = await client.get(
                    self.config.userinfo_url,
                    headers={
                        "Authorization": f"Bearer {credential}",
                        "X-Naver-Client-Id": self.config.client_id,
                        "X-Naver-Client-Secret": self.config.client_secret,
                    },
                )
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

    def _require_string(self, payload: dict[str, Any], key: str) -> str:
        value = payload.get(key)
        normalized_value = value.strip() if isinstance(value, str) else ""
        if not normalized_value:
            raise SocialVerificationError(self.provider, "malformed_response")
        return normalized_value

    def _optional_string(self, value: Any) -> str | None:
        normalized_value = value.strip() if isinstance(value, str) else ""
        return normalized_value or None

    def _resolve_display_name(self, profile: dict[str, Any]) -> str | None:
        for key in ("name", "nickname"):
            value = self._optional_string(profile.get(key))
            if value:
                return value
        return None
