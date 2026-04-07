from __future__ import annotations

from typing import ClassVar

from advanced_alchemy.utils.text import camelize
from pydantic import BaseModel, ConfigDict


class CamelizedBaseSchema(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(
        alias_generator=camelize,
        from_attributes=True,
        populate_by_name=True,
    )
