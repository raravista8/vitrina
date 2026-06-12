"""Pydantic schemas for the instant-preview endpoints.

Frozen contract: ``docs/handoff/CANON_INSTANT_PREVIEW_TZ.md §6``
(PreviewDraft + poll response) and ``..._REV2_TZ.md §7``
(``/api/preview/search`` + the ``candidate_id`` draft variant).
"""

from __future__ import annotations

import uuid
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, model_validator

# --- GET /api/preview/search --------------------------------------------------


class CandidateRatingSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")

    value: float
    count: int


class SourceCandidateSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    name: str
    address: str
    rating: CandidateRatingSchema | None
    photo: str | None


class PreviewSearchData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    candidates: list[SourceCandidateSchema]


class PreviewSearchResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: PreviewSearchData


# --- POST /api/preview/draft ----------------------------------------------------


class DraftCreateRequest(BaseModel):
    """Exactly one of ``url`` / ``candidate_id`` (ТЗ rev.2 §7)."""

    model_config = ConfigDict(extra="forbid")

    url: Annotated[HttpUrl | None, Field(description="Source URL (rev.1 variant)")] = None
    candidate_id: Annotated[
        uuid.UUID | None,
        Field(description="Opaque id from GET /api/preview/search (rev.2 variant)"),
    ] = None

    @model_validator(mode="after")
    def _exactly_one_source(self) -> DraftCreateRequest:
        if (self.url is None) == (self.candidate_id is None):
            msg = "exactly one of 'url' or 'candidate_id' is required"
            raise ValueError(msg)
        return self


class DraftCreateData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    draft_id: str


class DraftCreateResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: DraftCreateData


# --- GET /api/preview/draft/{draft_id} ------------------------------------------


class DraftCountsSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")

    photos: int
    reviews: int


class DraftReviewSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")

    author: str
    text: str
    rating: int


class DraftServiceSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str
    price: str | None


class PreviewDraftSchema(BaseModel):
    """1:1 the frozen ``PreviewDraft`` TS interface (ТЗ rev.1 §6)."""

    model_config = ConfigDict(extra="forbid")

    source: Literal["yandex_maps", "telegram", "twogis", "avito", "website"]
    name: str
    category: str | None
    district: str | None
    rating: CandidateRatingSchema | None
    photos: list[str]
    reviews: list[DraftReviewSchema]
    services: list[DraftServiceSchema]
    theme_id: str
    family_id: str


class DraftPollData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: Literal["building", "ready", "failed"]
    stage: Literal["fetching", "photos", "reviews", "styling"]
    counts: DraftCountsSchema
    draft: PreviewDraftSchema | None = None


class DraftPollResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: DraftPollData


__all__ = [
    "CandidateRatingSchema",
    "DraftCountsSchema",
    "DraftCreateData",
    "DraftCreateRequest",
    "DraftCreateResponse",
    "DraftPollData",
    "DraftPollResponse",
    "DraftReviewSchema",
    "DraftServiceSchema",
    "PreviewDraftSchema",
    "PreviewSearchData",
    "PreviewSearchResponse",
    "SourceCandidateSchema",
]
