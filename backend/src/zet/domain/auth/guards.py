from __future__ import annotations

from typing import Any
from uuid import UUID

from litestar.connection import ASGIConnection
from litestar.exceptions import NotAuthorizedException
from litestar.handlers.base import BaseRouteHandler
from litestar.security.jwt import JWTAuth, Token
from pydantic import BaseModel, ConfigDict

from ...config import Settings


class CurrentUser(BaseModel):
    model_config = ConfigDict(frozen=True)

    id: UUID
    is_admin: bool = False
    is_active: bool = True


class JWTState:
    def __init__(self, auth: JWTAuth[CurrentUser], revoked_token_ids: set[str]) -> None:
        self.auth = auth
        self.revoked_token_ids = revoked_token_ids


async def retrieve_user_handler(token: Token, connection: ASGIConnection[Any, Any, Any, Any]) -> CurrentUser:
    revoked_token_ids: set[str] = connection.app.state.revoked_token_ids
    token_jti = token.jti if isinstance(token.jti, str) else None
    if token_jti and token_jti in revoked_token_ids:
        raise NotAuthorizedException(detail="Token has been revoked")

    extras = token.extras or {}
    return CurrentUser(
        id=UUID(token.sub),
        is_admin=bool(extras.get("is_admin", False)),
        is_active=bool(extras.get("is_active", True)),
    )


def create_jwt_auth(settings: Settings) -> JWTAuth[CurrentUser]:
    return JWTAuth[CurrentUser](
        retrieve_user_handler=retrieve_user_handler,
        token_secret=settings.jwt_secret,
        algorithm=settings.jwt_algorithm,
        exclude=[r"/schema.*"],
    )


def requires_active_user(connection: ASGIConnection[Any, Any, Any, Any], _: BaseRouteHandler) -> None:
    user = getattr(connection, "user", None)
    if user is None or not getattr(user, "is_active", False):
        raise NotAuthorizedException(detail="Authentication required")
