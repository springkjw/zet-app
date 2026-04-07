from __future__ import annotations

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from advanced_alchemy.base import UUIDAuditBase

from .association import user_preferred_shops


class Shop(UUIDAuditBase):
    __tablename__ = "shops"

    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    image: Mapped[str] = mapped_column(String(length=2048), nullable=False)
    preferred_by_users: Mapped[list["User"]] = relationship(
        secondary=user_preferred_shops,
        back_populates="preferred_shops",
        lazy="selectin",
    )


__all__ = ["Shop"]
