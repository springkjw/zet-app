from __future__ import annotations

from datetime import timedelta
from uuid import UUID, uuid4

from litestar.exceptions import NotAuthorizedException, ValidationException
from litestar.security.jwt import Token
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from ...config import Settings
from ...db.models import Shop, SocialProvider, User
from .guards import CurrentUser, JWTState
from .schemas import (
    AuthTokensSchema,
    CurrentUserResponseSchema,
    LoginRequestSchema,
    LoginCredentialType,
    LoginResponseSchema,
    MobilePlatform,
    OnboardingStateSchema,
    RefreshTokenResponseSchema,
    UpdatePreferredShopsResponseSchema,
    UpdateProfileResponseSchema,
    UserSchema,
)
from .verifiers import NormalizedSocialIdentity, SocialVerificationError, SocialVerifierRegistry


class AuthService:
    def __init__(
        self,
        settings: Settings,
        jwt_state: JWTState,
        social_verifiers: SocialVerifierRegistry,
    ) -> None:
        self.settings = settings
        self.jwt_state = jwt_state
        self.social_verifiers = social_verifiers

    async def login(
        self,
        db_session: AsyncSession,
        data: LoginRequestSchema,
    ) -> LoginResponseSchema:
        identity = await self._verify_identity(data)
        user, is_new_user = await self._resolve_or_create_user(db_session, identity)

        user = await self._load_user(db_session, user.id)
        tokens = self._issue_tokens(user)
        return LoginResponseSchema(
            user=UserSchema.from_model(user),
            tokens=tokens,
            onboarding=OnboardingStateSchema(
                has_agreed_to_terms=user.has_agreed_to_terms,
                has_completed_onboarding=user.has_completed_onboarding,
            ),
            is_new_user=is_new_user,
        )

    async def logout(self, token: Token) -> dict[str, bool]:
        token_jti = token.jti if isinstance(token.jti, str) else None
        if token_jti:
            self.jwt_state.revoked_token_ids.add(token_jti)
        return {"success": True}

    async def refresh_tokens(
        self,
        db_session: AsyncSession,
        refresh_token: str,
    ) -> RefreshTokenResponseSchema:
        token = Token.decode(
            encoded_token=refresh_token,
            secret=self.settings.jwt_secret,
            algorithm=self.settings.jwt_algorithm,
        )
        extras = token.extras or {}
        if extras.get("token_type") != "refresh":
            raise NotAuthorizedException(detail="Invalid refresh token")
        token_jti = token.jti if isinstance(token.jti, str) else None
        if token_jti and token_jti in self.jwt_state.revoked_token_ids:
            raise NotAuthorizedException(detail="Refresh token has been revoked")

        user = await self._load_user(db_session, UUID(token.sub))
        if token_jti:
            self.jwt_state.revoked_token_ids.add(token_jti)
        return RefreshTokenResponseSchema(tokens=self._issue_tokens(user))

    async def get_current_user(
        self,
        db_session: AsyncSession,
        current_user: CurrentUser,
    ) -> CurrentUserResponseSchema:
        user = await self._load_user(db_session, current_user.id)
        return CurrentUserResponseSchema(user=UserSchema.from_model(user))

    async def update_profile(
        self,
        db_session: AsyncSession,
        current_user: CurrentUser,
        nickname: str,
    ) -> UpdateProfileResponseSchema:
        user = await self._load_user(db_session, current_user.id)
        user.nickname = nickname
        await db_session.commit()
        user = await self._load_user(db_session, current_user.id)
        return UpdateProfileResponseSchema(user=UserSchema.from_model(user))

    async def update_preferred_shops(
        self,
        db_session: AsyncSession,
        current_user: CurrentUser,
        shop_ids: list[UUID],
    ) -> UpdatePreferredShopsResponseSchema:
        user = await self._load_user(db_session, current_user.id)
        shops = await self._load_shops(db_session, shop_ids)
        if len(shops) != len(set(shop_ids)):
            raise ValidationException(detail="One or more shops do not exist")
        user.preferred_shops = shops
        await db_session.commit()
        user = await self._load_user(db_session, current_user.id)
        return UpdatePreferredShopsResponseSchema(user=UserSchema.from_model(user))

    async def _verify_identity(self, data: LoginRequestSchema) -> NormalizedSocialIdentity:
        try:
            return await self.social_verifiers.verify(
                provider=data.provider,
                credential_type=data.credential_type,
                credential=data.credential,
                platform=data.platform,
            )
        except SocialVerificationError as exc:
            raise NotAuthorizedException(detail=str(exc)) from exc

    async def _resolve_or_create_user(
        self,
        db_session: AsyncSession,
        identity: NormalizedSocialIdentity,
    ) -> tuple[User, bool]:
        existing_user = await self._get_user_by_identity(db_session, identity.provider, identity.provider_user_id)
        if existing_user is not None:
            return existing_user, False

        user = User(
            nickname=self._resolve_display_name(identity),
            provider=identity.provider,
            provider_subject=identity.provider_user_id,
            has_agreed_to_terms=False,
            has_completed_onboarding=False,
        )
        db_session.add(user)
        try:
            await db_session.commit()
        except IntegrityError:
            await db_session.rollback()
            raced_user = await self._get_user_by_identity(
                db_session,
                identity.provider,
                identity.provider_user_id,
            )
            if raced_user is None:
                raise
            return raced_user, False
        return user, True

    async def _get_user_by_identity(
        self,
        db_session: AsyncSession,
        provider: SocialProvider,
        subject: str,
    ) -> User | None:
        statement = (
            select(User)
            .options(selectinload(User.preferred_shops))
            .where(User.provider == provider, User.provider_subject == subject)
        )
        result = await db_session.execute(statement)
        return result.scalar_one_or_none()

    async def _load_user(self, db_session: AsyncSession, user_id: UUID) -> User:
        statement = select(User).options(selectinload(User.preferred_shops)).where(User.id == user_id)
        result = await db_session.execute(statement)
        user = result.scalar_one_or_none()
        if user is None:
            raise NotAuthorizedException(detail="User not found")
        return user

    async def _load_shops(self, db_session: AsyncSession, shop_ids: list[UUID]) -> list[Shop]:
        if not shop_ids:
            return []
        statement = select(Shop).where(Shop.id.in_(shop_ids))
        result = await db_session.execute(statement)
        shops = {shop.id: shop for shop in result.scalars().unique().all()}
        return [shops[shop_id] for shop_id in shop_ids if shop_id in shops]

    def _issue_tokens(self, user: User) -> AuthTokensSchema:
        access_token = self.jwt_state.auth.create_token(
            identifier=str(user.id),
            token_expiration=timedelta(minutes=self.settings.jwt_access_token_ttl_minutes),
            token_unique_jwt_id=uuid4().hex,
            token_extras={
                "token_type": "access",
                "is_admin": user.is_admin,
                "is_active": True,
            },
        )
        refresh_token = self.jwt_state.auth.create_token(
            identifier=str(user.id),
            token_expiration=timedelta(days=self.settings.jwt_refresh_token_ttl_days),
            token_unique_jwt_id=uuid4().hex,
            token_extras={
                "token_type": "refresh",
                "is_admin": user.is_admin,
                "is_active": True,
            },
        )
        return AuthTokensSchema(access_token=access_token, refresh_token=refresh_token)

    def _resolve_display_name(self, identity: NormalizedSocialIdentity) -> str:
        display_name = identity.display_name or identity.email or f"{identity.provider.value}-{identity.provider_user_id[:8]}"
        return display_name[:20]
