from __future__ import annotations

from uuid import UUID

from litestar.exceptions import NotAuthorizedException, NotFoundException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ...config import Settings
from ...db.models import Shop, User
from ..auth.guards import CurrentUser
from .schemas import (
    CreateShopRequestSchema,
    CreateShopResponseSchema,
    GetShopResponseSchema,
    ListShopsResponseSchema,
    ShopSchema,
)


class ShopService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def list_shops(
        self,
        db_session: AsyncSession,
        limit: int,
        offset: int,
    ) -> ListShopsResponseSchema:
        total_statement = select(func.count(Shop.id))
        total = int((await db_session.execute(total_statement)).scalar_one())

        statement = select(Shop).order_by(Shop.created_at.desc()).limit(limit).offset(offset)
        result = await db_session.execute(statement)
        shops = list(result.scalars().unique().all())
        return ListShopsResponseSchema(
            shops=[ShopSchema.from_model(shop) for shop in shops],
            total=total,
        )

    async def get_shop(self, db_session: AsyncSession, shop_id: UUID) -> GetShopResponseSchema:
        statement = select(Shop).where(Shop.id == shop_id)
        result = await db_session.execute(statement)
        shop = result.scalar_one_or_none()
        if shop is None:
            raise NotFoundException(detail="Shop not found")
        return GetShopResponseSchema(shop=ShopSchema.from_model(shop))

    async def create_shop(
        self,
        db_session: AsyncSession,
        current_user: CurrentUser,
        data: CreateShopRequestSchema,
    ) -> CreateShopResponseSchema:
        user_statement = select(User).where(User.id == current_user.id)
        user_result = await db_session.execute(user_statement)
        user = user_result.scalar_one_or_none()
        if user is None or not user.is_admin:
            raise NotAuthorizedException(detail="Admin access required")

        shop = Shop(name=data.name, image=self.settings.default_shop_image_url)
        db_session.add(shop)
        await db_session.commit()
        await db_session.refresh(shop)
        return CreateShopResponseSchema(shop=ShopSchema.from_model(shop))
