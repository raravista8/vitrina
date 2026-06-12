"""Preview endpoints.

``POST /api/preview`` — Hero badge enrichment (T1.4b). Lightweight,
rate-limited, no persistence. Returns either the enriched PreviewData
on success or 503 ``preview_unavailable`` so the frontend falls back to
the static badge.

Instant-preview (frozen contract — CANON_INSTANT_PREVIEW_TZ §6 +
CANON_INSTANT_PREVIEW_REV2_TZ §7):

  - ``GET  /api/preview/search``            — поиск по названию (Я.Карты)
  - ``POST /api/preview/draft``             — start an async draft build
  - ``GET  /api/preview/draft/{draft_id}``  — poll build state
"""

from __future__ import annotations

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Request

from app.api.dependencies import (
    get_preview_draft_service,
    get_preview_search_service,
    get_preview_service,
    preview_draft_poll_rate_limiter,
    preview_draft_rate_limiter,
    preview_rate_limiter,
    preview_search_rate_limiter,
)
from app.api.schemas.preview import (
    PreviewCountsSchema,
    PreviewData,
    PreviewRequest,
    PreviewResponse,
)
from app.api.schemas.preview_draft import (
    CandidateRatingSchema,
    DraftCountsSchema,
    DraftCreateData,
    DraftCreateRequest,
    DraftCreateResponse,
    DraftPollData,
    DraftPollResponse,
    DraftReviewSchema,
    DraftServiceSchema,
    PreviewDraftSchema,
    PreviewSearchData,
    PreviewSearchResponse,
    SourceCandidateSchema,
)
from app.core.parsing.ports import ParsingError
from app.core.parsing.url_validator import validate_source_url
from app.core.preview.draft import DraftState
from app.core.preview.draft_builder import ANY_DOMAIN_ALLOWLIST, PreviewDraftService
from app.core.preview.ports import PreviewSourceType
from app.core.preview.search import PreviewSearchService
from app.core.preview.service import PreviewService
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["preview"])


@router.post("/preview", response_model=PreviewResponse, status_code=200)
async def post_preview(
    body: PreviewRequest,
    _request: Request,
    service: Annotated[PreviewService, Depends(get_preview_service)],
    _ratelimit: Annotated[None, Depends(preview_rate_limiter)],
) -> PreviewResponse:
    log = get_logger("api.preview")
    outcome = await service.preview(
        source_type=PreviewSourceType(body.source_type),
        source_url=str(body.source_url),
    )

    if outcome.result is None:
        log.info("preview_returning_fallback", reason=outcome.reason)
        # 503 — frontend treats any non-200 as fallback to static badge.
        # We don't surface upstream-specific reasons to the browser, but the
        # structured log carries them so ops can diagnose.
        raise HTTPException(status_code=503, detail="preview_unavailable")

    counts = outcome.result.counts
    return PreviewResponse(
        data=PreviewData(
            source_type=outcome.result.source_type.value,
            name=outcome.result.name,
            counts=PreviewCountsSchema(
                posts=counts.posts,
                photos=counts.photos,
                reviews=counts.reviews,
            ),
        )
    )


# --- instant-preview: search by name (rev.2 §7) -------------------------------


@router.get("/preview/search", response_model=PreviewSearchResponse, status_code=200)
async def preview_search(
    service: Annotated[PreviewSearchService, Depends(get_preview_search_service)],
    _ratelimit: Annotated[None, Depends(preview_search_rate_limiter)],
    q: Annotated[str, Query(min_length=1, max_length=120, description="Название дела")],
    city: Annotated[str | None, Query(max_length=80, description="Город (опционально)")] = None,
) -> PreviewSearchResponse:
    log = get_logger("api.preview_search")
    outcome = await service.search(q=q, city=city)

    if outcome.candidates is None:
        if outcome.reason == "not_configured":
            # Geosearch key unset — operator action needed; never crash.
            raise HTTPException(status_code=502, detail="search_not_configured")
        log.info("preview_search_upstream_failed", reason=outcome.reason)
        raise HTTPException(status_code=502, detail="upstream_unavailable")

    return PreviewSearchResponse(
        data=PreviewSearchData(
            candidates=[
                SourceCandidateSchema(
                    id=c.id,
                    name=c.name,
                    address=c.address,
                    rating=(
                        CandidateRatingSchema(value=c.rating.value, count=c.rating.count)
                        if c.rating is not None
                        else None
                    ),
                    photo=c.photo,
                )
                for c in outcome.candidates
            ]
        )
    )


# --- instant-preview: draft build (rev.1 §6 + rev.2 §7) -------------------------


@router.post("/preview/draft", response_model=DraftCreateResponse, status_code=202)
async def create_preview_draft(
    body: DraftCreateRequest,
    service: Annotated[PreviewDraftService, Depends(get_preview_draft_service)],
    _ratelimit: Annotated[None, Depends(preview_draft_rate_limiter)],
) -> DraftCreateResponse:
    log = get_logger("api.preview_draft")

    if body.url is not None:
        raw_url = str(body.url)
        # Cheap synchronous SSRF gate: scheme / IP-literal rejection. The
        # full DNS private-range check runs again inside the build task
        # before any outbound fetch (core/parsing/url_validator).
        try:
            validate_source_url(
                raw_url, domain_allowlist=ANY_DOMAIN_ALLOWLIST, allow_resolution=False
            )
        except ParsingError:
            log.info("preview_draft_url_rejected")
            raise HTTPException(status_code=400, detail="invalid_url") from None
        draft_id = await service.start_from_url(raw_url)
    else:
        if body.candidate_id is None:  # pragma: no cover — XOR validator guarantees
            raise HTTPException(status_code=422, detail="validation_failed")
        started = await service.start_from_candidate(str(body.candidate_id))
        if started is None:
            raise HTTPException(status_code=404, detail="candidate_not_found")
        draft_id = started

    return DraftCreateResponse(data=DraftCreateData(draft_id=draft_id))


@router.get("/preview/draft/{draft_id}", response_model=DraftPollResponse, status_code=200)
async def poll_preview_draft(
    draft_id: uuid.UUID,
    service: Annotated[PreviewDraftService, Depends(get_preview_draft_service)],
    _ratelimit: Annotated[None, Depends(preview_draft_poll_rate_limiter)],
) -> DraftPollResponse:
    state = await service.get_state(str(draft_id))
    if state is None:
        raise HTTPException(status_code=404, detail="draft_not_found")
    return DraftPollResponse(data=_state_to_schema(state))


def _state_to_schema(state: DraftState) -> DraftPollData:
    draft_schema: PreviewDraftSchema | None = None
    if state.draft is not None:
        draft = state.draft
        draft_schema = PreviewDraftSchema(
            source=draft.source.value,
            name=draft.name,
            category=draft.category,
            district=draft.district,
            rating=(
                CandidateRatingSchema(value=draft.rating.value, count=draft.rating.count)
                if draft.rating is not None
                else None
            ),
            photos=list(draft.photos),
            reviews=[
                DraftReviewSchema(author=r.author, text=r.text, rating=r.rating)
                for r in draft.reviews
            ],
            services=[DraftServiceSchema(title=s.title, price=s.price) for s in draft.services],
            theme_id=draft.theme_id,
            family_id=draft.family_id,
        )
    return DraftPollData(
        status=state.status.value,
        stage=state.stage.value,
        counts=DraftCountsSchema(photos=state.counts.photos, reviews=state.counts.reviews),
        draft=draft_schema,
    )
