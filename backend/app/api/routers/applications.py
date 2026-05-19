"""``POST /api/submit-application`` — first user-facing endpoint (T1.3).

Validates input via Pydantic, runs the rate limiter, delegates to the
``core.applications.service`` for persistence, returns the canonical
success envelope ``{"ok": true, "data": {...}}``. Errors flow through the
T1.2 exception handler chain — a ``DomainError`` from the service becomes
HTTPException(400, detail=<code>) which the handler turns into the
``{"ok": false, "error": "<code>", "request_id": "..."}`` envelope.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    application_rate_limiter,
    get_client_ip,
    get_session,
)
from app.api.schemas.applications import (
    SubmitApplicationData,
    SubmitApplicationRequest,
    SubmitApplicationResponse,
)
from app.core.applications.service import submit_application
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["applications"])


@router.post(
    "/submit-application",
    response_model=SubmitApplicationResponse,
    status_code=202,
)
async def post_submit_application(
    body: SubmitApplicationRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> SubmitApplicationResponse:
    log = get_logger("api.applications")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    result = await submit_application(
        session=session,
        source_url=str(body.source_url) if body.source_url else None,
        source_type=body.source_type,
        contact=body.contact,
        consent_given=body.consent_given,
        ip=ip,
        user_agent=user_agent,
    )

    if result.is_err():
        err = result.unwrap_err()
        log.info("application_rejected", code=err.code)
        raise HTTPException(status_code=400, detail=err.code)

    application = result.unwrap()
    log.info(
        "application_accepted",
        application_id=str(application.id),
        source_type=application.source_type,
        contact_type=application.contact_type,
    )
    # T1.6 wires the notifier dispatcher; for T1.3 we log so the founder can
    # see new applications via `docker compose logs api`.
    log.info("founder_notify_pending", application_id=str(application.id))

    return SubmitApplicationResponse(
        data=SubmitApplicationData(
            application_id=application.id,
            contact_type=application.contact_type,  # type: ignore[arg-type]
        )
    )
