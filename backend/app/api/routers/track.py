"""``POST /api/track`` — customer-site analytics events (T5.1).

Public endpoint that customer-site JavaScript pings on page events:
pageview, click_phone, click_tg, click_wa, form_view, form_submit.

Rate-limited 100/min per IP so a malicious embed can't amplify
events into the database. ``site_id`` is validated against the
``sites`` table — a missing or non-published site → 404 so the
endpoint can't be used to enumerate hidden subdomains.

The endpoint does NOT accept arbitrary payload sizes: we serialise
the JSON payload and reject anything over 4 KB. The events table is
BIGSERIAL — high-volume by design — so payload bloat would slow
admin dashboards far before it filled disk.

No PII expected in ``payload`` (the customer-site script doesn't
emit any), but if a master mod's their template to add some, the
sanitiser at admin-view time strips it.
"""

from __future__ import annotations

import json
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    get_client_ip,
    get_session,
    track_rate_limiter,
)
from app.api.schemas.track import (
    TrackEventData,
    TrackEventRequest,
    TrackEventResponse,
)
from app.infrastructure.postgres.models import Event, Site
from app.utils.logging import get_logger

MAX_PAYLOAD_BYTES = 4_096

router = APIRouter(prefix="/api", tags=["track"])


@router.post(
    "/track",
    response_model=TrackEventResponse,
    status_code=202,
)
async def post_track(
    body: TrackEventRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _ratelimit: Annotated[None, Depends(track_rate_limiter)],
) -> TrackEventResponse:
    log = get_logger("api.track")

    # Payload size guard before any DB lookup — a malicious tracker
    # could flood the rate-limit with tiny requests but if any one
    # request is huge we drop it cheaply.
    payload_bytes = len(json.dumps(body.payload, ensure_ascii=False).encode("utf-8"))
    if payload_bytes > MAX_PAYLOAD_BYTES:
        raise HTTPException(status_code=413, detail="payload_too_large")

    site = (
        await session.execute(select(Site.id, Site.status).where(Site.id == body.site_id))
    ).one_or_none()
    if site is None:
        # 404 instead of 200 so the endpoint can't enumerate the
        # subdomain namespace.
        raise HTTPException(status_code=404, detail="site_not_found")
    if site.status != "published":
        raise HTTPException(status_code=404, detail="site_not_found")

    event = Event(
        site_id=body.site_id,
        event_type=body.event_type,
        payload=body.payload,
    )
    session.add(event)
    await session.flush()
    await session.commit()

    ip = get_client_ip(request)
    log.info(
        "track_event",
        event_id=event.id,
        site_id=str(body.site_id),
        event_type=body.event_type,
        ip_prefix=_ip_prefix(ip),
    )
    return TrackEventResponse(data=TrackEventData(event_id=event.id))


def _ip_prefix(ip: str | None) -> str:
    if not ip:
        return ""
    parts = ip.split(".")
    if len(parts) != 4:
        return "***"
    return f"{parts[0]}.{parts[1]}.0.0/16"
