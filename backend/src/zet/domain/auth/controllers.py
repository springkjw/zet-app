from __future__ import annotations

from typing import Any

from litestar import Controller, Request, get, patch, post
from litestar.security.jwt import Token
from sqlalchemy.ext.asyncio import AsyncSession

from .guards import CurrentUser, requires_active_user
from .schemas import (
    CurrentUserResponseSchema,
    LoginRequestSchema,
    LoginResponseSchema,
    LogoutResponseSchema,
    RefreshTokenRequestSchema,
    RefreshTokenResponseSchema,
    UpdatePreferredShopsRequestSchema,
    UpdatePreferredShopsResponseSchema,
    UpdateProfileRequestSchema,
    UpdateProfileResponseSchema,
)
from .services import AuthService


class AuthController(Controller):
    path = "/api/auth"
    tags = ["Auth"]

    @post("/login", status_code=200, exclude_from_auth=True)
    async def login(
        self,
        data: LoginRequestSchema,
        db_session: AsyncSession,
        auth_service: AuthService,
    ) -> LoginResponseSchema:
        return await auth_service.login(db_session=db_session, data=data)

    @post(
        "/logout",
        status_code=200,
        guards=[requires_active_user],
    )
    async def logout(
        self,
        request: Request[CurrentUser, Token, Any],
        auth_service: AuthService,
    ) -> LogoutResponseSchema:
        response = await auth_service.logout(request.auth)
        return LogoutResponseSchema(**response)

    @post("/refresh", status_code=200, exclude_from_auth=True)
    async def refresh(
        self,
        data: RefreshTokenRequestSchema,
        db_session: AsyncSession,
        auth_service: AuthService,
    ) -> RefreshTokenResponseSchema:
        return await auth_service.refresh_tokens(
            db_session=db_session,
            refresh_token=data.refresh_token,
        )

    @get(
        "/me",
        status_code=200,
        guards=[requires_active_user],
    )
    async def me(
        self,
        request: Request[CurrentUser, Token, Any],
        db_session: AsyncSession,
        auth_service: AuthService,
    ) -> CurrentUserResponseSchema:
        return await auth_service.get_current_user(db_session=db_session, current_user=request.user)

    @patch(
        "/me",
        status_code=200,
        guards=[requires_active_user],
    )
    async def update_profile(
        self,
        data: UpdateProfileRequestSchema,
        request: Request[CurrentUser, Token, Any],
        db_session: AsyncSession,
        auth_service: AuthService,
    ) -> UpdateProfileResponseSchema:
        return await auth_service.update_profile(
            db_session=db_session,
            current_user=request.user,
            nickname=data.nickname,
        )

    @patch(
        "/preferred-shops",
        status_code=200,
        guards=[requires_active_user],
    )
    async def update_preferred_shops(
        self,
        data: UpdatePreferredShopsRequestSchema,
        request: Request[CurrentUser, Token, Any],
        db_session: AsyncSession,
        auth_service: AuthService,
    ) -> UpdatePreferredShopsResponseSchema:
        return await auth_service.update_preferred_shops(
            db_session=db_session,
            current_user=request.user,
            shop_ids=data.shop_ids,
        )
