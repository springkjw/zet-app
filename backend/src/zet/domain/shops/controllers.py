from __future__ import annotations

from typing import Any
from uuid import UUID

from litestar import Controller, Request, get, post
from litestar.params import Parameter
from litestar.security.jwt import Token
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.guards import CurrentUser, requires_active_user
from .schemas import (
    CreateShopRequestSchema,
    CreateShopResponseSchema,
    GetShopResponseSchema,
    ListShopsResponseSchema,
)
from .services import ShopService


class ShopController(Controller):
    path = "/api/shops"
    tags = ["Shops"]

    @get("", status_code=200, exclude_from_auth=True)
    async def list_shops(
        self,
        db_session: AsyncSession,
        shop_service: ShopService,
        limit: int = Parameter(default=10, ge=1, le=100, required=False),
        offset: int = Parameter(default=0, ge=0, required=False),
    ) -> ListShopsResponseSchema:
        return await shop_service.list_shops(
            db_session=db_session,
            limit=limit,
            offset=offset,
        )

    @get("/{shop_id:uuid}", status_code=200, exclude_from_auth=True)
    async def get_shop(
        self,
        shop_id: UUID,
        db_session: AsyncSession,
        shop_service: ShopService,
    ) -> GetShopResponseSchema:
        return await shop_service.get_shop(db_session=db_session, shop_id=shop_id)

    @post("", status_code=201, guards=[requires_active_user])
    async def create_shop(
        self,
        data: CreateShopRequestSchema,
        request: Request[CurrentUser, Token, Any],
        db_session: AsyncSession,
        shop_service: ShopService,
    ) -> CreateShopResponseSchema:
        return await shop_service.create_shop(
            db_session=db_session,
            current_user=request.user,
            data=data,
        )
