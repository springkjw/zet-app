from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Iterable

from pydantic import BaseModel, ConfigDict, Field

from ....db.models.user import SocialProvider
from ..schemas import LoginCredentialType, MobilePlatform


class NormalizedSocialIdentity(BaseModel):
    provider: SocialProvider
    provider_user_id: str = Field(min_length=1)
    email: str | None = None
    display_name: str | None = None


class SocialVerificationError(ValueError):
    def __init__(self, provider: SocialProvider, reason: str) -> None:
        self.provider = provider
        self.reason = reason
        super().__init__(f"{provider.value} verification failed: {reason}")


class SocialVerifier(ABC):
    provider: SocialProvider
    credential_type: LoginCredentialType

    async def verify(
        self,
        *,
        credential_type: LoginCredentialType,
        credential: str,
        platform: MobilePlatform,
    ) -> NormalizedSocialIdentity:
        self._validate_credential_type(credential_type)
        normalized_credential = credential.strip()
        if not normalized_credential:
            raise SocialVerificationError(self.provider, "empty_credential")
        return await self._verify_credential(normalized_credential, platform)

    def _validate_credential_type(self, credential_type: LoginCredentialType) -> None:
        if credential_type != self.credential_type:
            raise SocialVerificationError(self.provider, f"unsupported_credential_type:{credential_type}")

    @abstractmethod
    async def _verify_credential(
        self,
        credential: str,
        platform: MobilePlatform,
    ) -> NormalizedSocialIdentity:
        raise NotImplementedError


class SocialVerifierRegistry(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    verifiers: dict[SocialProvider, SocialVerifier]

    def __init__(self, verifiers: Iterable[SocialVerifier]) -> None:
        super().__init__(verifiers={verifier.provider: verifier for verifier in verifiers})

    async def verify(
        self,
        *,
        provider: SocialProvider,
        credential_type: LoginCredentialType,
        credential: str,
        platform: MobilePlatform,
    ) -> NormalizedSocialIdentity:
        verifier = self.verifiers[provider]
        return await verifier.verify(
            credential_type=credential_type,
            credential=credential,
            platform=platform,
        )
