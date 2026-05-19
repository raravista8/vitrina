"""Pydantic schemas for ``POST /api/preview`` (T1.4b)."""

from __future__ import annotations

from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class PreviewRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    source_url: Annotated[HttpUrl, Field(description="MVP source URL")]
    source_type: Annotated[
        Literal["telegram", "ymaps"],
        Field(description="Frontend tells us the type — server doesn't re-detect"),
    ]


class PreviewCountsSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")

    posts: int | None = None
    photos: int | None = None
    reviews: int | None = None


class PreviewData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    source_type: Literal["telegram", "ymaps"]
    name: str | None
    counts: PreviewCountsSchema


class PreviewResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: PreviewData


__all__ = [
    "PreviewCountsSchema",
    "PreviewData",
    "PreviewRequest",
    "PreviewResponse",
]
