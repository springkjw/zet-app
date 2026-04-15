from __future__ import annotations

from typing import Any

from litestar import Request

from ..config import Settings
from ..domain.auth.guards import JWTState
from ..domain.auth.services import AuthService
from ..domain.auth.verifiers import build_social_verifier_registry
from ..domain.shops.services import ShopService


def provide_settings(request: Request[Any, Any, Any]) -> Settings:
    return request.app.state.settings


def provide_auth_service(request: Request[Any, Any, Any]) -> AuthService:
    jwt_state = JWTState(request.app.state.jwt_auth, request.app.state.revoked_token_ids)
    return AuthService(
        settings=request.app.state.settings,
        jwt_state=jwt_state,
        social_verifiers=build_social_verifier_registry(request.app.state.settings),
    )


def provide_shop_service(request: Request[Any, Any, Any]) -> ShopService:
    return ShopService(settings=request.app.state.settings)
