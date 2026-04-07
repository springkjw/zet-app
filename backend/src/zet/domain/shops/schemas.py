from __future__ import annotations

from uuid import UUID

from pydantic import Field

from zet.db.models.shop import Shop
from zet.lib.schema import CamelizedBaseSchema


class ShopSchema(CamelizedBaseSchema):
    id: UUID
    name: str = Field(min_length=1)
    image: str = Field(min_length=1)

    @classmethod
    def from_model(cls, shop: Shop) -> "ShopSchema":
        return cls(id=shop.id, name=shop.name, image=shop.image)


class ListShopsResponseSchema(CamelizedBaseSchema):
    shops: list[ShopSchema]
    total: int = Field(ge=0)


class GetShopResponseSchema(CamelizedBaseSchema):
    shop: ShopSchema


class CreateShopRequestSchema(CamelizedBaseSchema):
    name: str = Field(min_length=1)


class CreateShopResponseSchema(CamelizedBaseSchema):
    shop: ShopSchema
