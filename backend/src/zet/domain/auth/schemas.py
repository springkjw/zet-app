from __future__ import annotations

from typing import Literal
from uuid import UUID

from pydantic import Field, model_validator

from zet.db.models.user import SocialProvider, User
from zet.lib.schema import CamelizedBaseSchema

LoginCredentialType = Literal["access_token", "id_token"]
MobilePlatform = Literal["ios", "android"]

PROVIDER_CREDENTIAL_TYPE_MAP: dict[SocialProvider, LoginCredentialType] = {
    SocialProvider.KAKAO: "access_token",
    SocialProvider.NAVER: "access_token",
    SocialProvider.APPLE: "id_token",
}


class UserSchema(CamelizedBaseSchema):
    id: UUID
    nickname: str = Field(min_length=1, max_length=20)
    provider: SocialProvider
    preferred_shop_ids: list[UUID] = Field(default_factory=list)
    created_at: str

    @classmethod
    def from_model(cls, user: User) -> "UserSchema":
        return cls(
            id=user.id,
            nickname=user.nickname,
            provider=user.provider,
            preferred_shop_ids=[shop.id for shop in user.preferred_shops],
            created_at=user.created_at.isoformat(),
        )


class AuthTokensSchema(CamelizedBaseSchema):
    access_token: str = Field(min_length=1)
    refresh_token: str | None = Field(default=None, min_length=1)


class OnboardingStateSchema(CamelizedBaseSchema):
    has_agreed_to_terms: bool
    has_completed_onboarding: bool


class LoginRequestSchema(CamelizedBaseSchema):
    provider: SocialProvider
    credential_type: LoginCredentialType
    credential: str = Field(min_length=1)
    platform: MobilePlatform

    @model_validator(mode="after")
    def validate_provider_credential_type(self) -> "LoginRequestSchema":
        expected_credential_type = PROVIDER_CREDENTIAL_TYPE_MAP[self.provider]
        if self.credential_type != expected_credential_type:
            raise ValueError(f"{self.provider.value} login requires {expected_credential_type}")
        return self


class LoginResponseSchema(CamelizedBaseSchema):
    user: UserSchema
    tokens: AuthTokensSchema
    onboarding: OnboardingStateSchema
    is_new_user: bool


class RefreshTokenRequestSchema(CamelizedBaseSchema):
    refresh_token: str = Field(min_length=1)


class RefreshTokenResponseSchema(CamelizedBaseSchema):
    tokens: AuthTokensSchema


class UpdatePreferredShopsRequestSchema(CamelizedBaseSchema):
    shop_ids: list[UUID]


class UpdatePreferredShopsResponseSchema(CamelizedBaseSchema):
    user: UserSchema


class UpdateProfileRequestSchema(CamelizedBaseSchema):
    nickname: str = Field(min_length=1, max_length=20)


class UpdateProfileResponseSchema(CamelizedBaseSchema):
    user: UserSchema


class CurrentUserResponseSchema(CamelizedBaseSchema):
    user: UserSchema


class LogoutResponseSchema(CamelizedBaseSchema):
    success: bool
