from __future__ import annotations

from uuid import UUID

from pydantic import Field

from zet.db.models.user import SocialProvider, User
from zet.lib.schema import CamelizedBaseSchema


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
    token: str = Field(min_length=1)


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
