"""``POST /api/preview`` — Hero badge enrichment (T1.4b).

Lightweight, rate-limited, no persistence. Returns either the enriched
PreviewData on success or 503 ``preview_unavailable`` so the frontend
falls back to the static badge.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request

from app.api.dependencies import (
    get_preview_service,
    preview_rate_limiter,
)
from app.api.schemas.preview import (
    PreviewCountsSchema,
    PreviewData,
    PreviewRequest,
    PreviewResponse,
)
from app.core.preview.ports import PreviewSourceType
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
