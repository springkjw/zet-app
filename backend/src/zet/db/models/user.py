from __future__ import annotations

from enum import Enum
from sqlalchemy import Boolean, Enum as SqlEnum, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from advanced_alchemy.base import UUIDAuditBase

from .association import user_preferred_shops


class SocialProvider(str, Enum):
    KAKAO = "kakao"
    NAVER = "naver"
    APPLE = "apple"


class User(UUIDAuditBase):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("provider", "provider_subject", name="uq_users_provider_subject"),)

    nickname: Mapped[str] = mapped_column(String(length=20), nullable=False)
    provider: Mapped[SocialProvider] = mapped_column(
        SqlEnum(SocialProvider, native_enum=False),
        nullable=False,
    )
    provider_subject: Mapped[str] = mapped_column(String(length=255), nullable=False)
    has_agreed_to_terms: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    has_completed_onboarding: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    preferred_shops: Mapped[list["Shop"]] = relationship(
        secondary=user_preferred_shops,
        back_populates="preferred_by_users",
        lazy="selectin",
    )


__all__ = ["SocialProvider", "User"]
