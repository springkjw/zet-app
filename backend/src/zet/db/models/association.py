from __future__ import annotations

from uuid import UUID

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from advanced_alchemy.base import UUIDBase


class UserPreferredShop(UUIDBase):
    __tablename__ = "user_preferred_shops"
    __table_args__ = (UniqueConstraint("user_id", "shop_id", name="uq_user_preferred_shop"),)

    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    shop_id: Mapped[UUID] = mapped_column(ForeignKey("shops.id", ondelete="CASCADE"), nullable=False)


user_preferred_shops = UserPreferredShop.__table__


__all__ = ["user_preferred_shops", "UserPreferredShop"]
