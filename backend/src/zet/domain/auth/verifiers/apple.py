from __future__ import annotations

import json
from typing import Any

import httpx
import jwt
from jwt import DecodeError, ExpiredSignatureError, InvalidAudienceError, InvalidIssuerError, InvalidSignatureError, PyJWTError
from jwt.algorithms import RSAAlgorithm
from pydantic import BaseModel, Field

from ....config import Settings
from ....db.models.user import SocialProvider
from ..schemas import MobilePlatform
from .base import NormalizedSocialIdentity, SocialVerificationError, SocialVerifier

APPLE_SIGNING_ALGORITHM = "RS256"
PROVIDER_REQUEST_TIMEOUT_SECONDS = 5.0


class AppleVerifierConfig(BaseModel):
    bundle_id: str = Field(min_length=1)
    service_id: str = Field(min_length=1)
    issuer: str = Field(min_length=1)
    jwks_url: str = Field(min_length=1)

    @classmethod
    def from_settings(cls, settings: Settings) -> "AppleVerifierConfig":
        return cls(
            bundle_id=settings.auth_apple_bundle_id,
            service_id=settings.auth_apple_service_id,
            issuer=settings.auth_apple_issuer,
            jwks_url=settings.auth_apple_jwks_url,
        )


class AppleVerifier(SocialVerifier):
    provider = SocialProvider.APPLE
    credential_type = "id_token"

    def __init__(self, config: AppleVerifierConfig) -> None:
        self.config = config

    async def _verify_credential(
        self,
        credential: str,
        platform: MobilePlatform,
    ) -> NormalizedSocialIdentity:
        header = self._read_token_header(credential)
        signing_key = await self._fetch_signing_key(header["kid"])

        try:
            claims = jwt.decode(
                credential,
                key=signing_key,
                algorithms=[APPLE_SIGNING_ALGORITHM],
                audience=self._allowed_audiences(platform),
                issuer=self.config.issuer,
                options={"require": ["iss", "aud", "exp", "iat", "sub"]},
            )
        except ExpiredSignatureError as exc:
            raise SocialVerificationError(self.provider, "expired") from exc
        except InvalidAudienceError as exc:
            raise SocialVerificationError(self.provider, "invalid_audience") from exc
        except InvalidIssuerError as exc:
            raise SocialVerificationError(self.provider, "invalid_issuer") from exc
        except InvalidSignatureError as exc:
            raise SocialVerificationError(self.provider, "invalid_signature") from exc
        except DecodeError as exc:
            raise SocialVerificationError(self.provider, "malformed_token") from exc
        except PyJWTError as exc:
            raise SocialVerificationError(self.provider, "invalid_token") from exc

        provider_user_id = claims.get("sub")
        normalized_subject = provider_user_id.strip() if isinstance(provider_user_id, str) else ""
        if not normalized_subject:
            raise SocialVerificationError(self.provider, "malformed_token")

        email = claims.get("email")
        normalized_email = email.strip() if isinstance(email, str) else ""
        return NormalizedSocialIdentity(
            provider=self.provider,
            provider_user_id=normalized_subject,
            email=normalized_email or None,
            display_name=None,
        )

    def _read_token_header(self, credential: str) -> dict[str, str]:
        try:
            header = jwt.get_unverified_header(credential)
        except PyJWTError as exc:
            raise SocialVerificationError(self.provider, "malformed_token") from exc

        kid = header.get("kid")
        alg = header.get("alg")
        if not isinstance(kid, str) or not kid.strip() or alg != APPLE_SIGNING_ALGORITHM:
            raise SocialVerificationError(self.provider, "malformed_token")
        return {"kid": kid}

    async def _fetch_signing_key(self, kid: str) -> Any:
        payload = await self._fetch_jwks()
        keys = payload.get("keys")
        if not isinstance(keys, list):
            raise SocialVerificationError(self.provider, "malformed_response")

        for key in keys:
            if isinstance(key, dict) and key.get("kid") == kid:
                try:
                    return RSAAlgorithm.from_jwk(json.dumps(key))
                except (TypeError, ValueError) as exc:
                    raise SocialVerificationError(self.provider, "invalid_signature") from exc
        raise SocialVerificationError(self.provider, "invalid_signature")

    async def _fetch_jwks(self) -> dict[str, Any]:
        try:
            async with httpx.AsyncClient(timeout=PROVIDER_REQUEST_TIMEOUT_SECONDS) as client:
                response = await client.get(self.config.jwks_url)
        except httpx.HTTPError as exc:
            raise SocialVerificationError(self.provider, "provider_unreachable") from exc

        if response.status_code >= 400:
            raise SocialVerificationError(self.provider, "provider_error")

        payload = response.json()
        if not isinstance(payload, dict):
            raise SocialVerificationError(self.provider, "malformed_response")
        return payload

    def _allowed_audiences(self, platform: MobilePlatform) -> tuple[str, ...]:
        if platform == "ios":
            return tuple(audience for audience in (self.config.bundle_id.strip(),) if audience)

        return tuple(audience for audience in (self.config.service_id.strip(),) if audience)
