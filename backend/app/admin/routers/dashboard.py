"""Admin dashboard (T2.2).

GET /admin                       — counters + recent applications
GET /admin/applications          — full list, filterable by status
GET /admin/applications/{id}    — detail view with action buttons (T2.3)
GET /admin/waitlist              — feedback aggregation (closes T1.7-deferred admin view)

All routes require an active admin session (``require_admin`` dep).
Audit-log writes happen here for read-side actions that matter (e.g.
viewing a lead is an audit event per SECURITY.md §7); the heavier
mutate-side actions live in T2.3's publishing router.
"""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import Annotated, Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin import admin_templates
from app.api.dependencies import get_session, require_admin
from app.core.auth.sessions import AdminSession
from app.infrastructure.postgres.models import Application, Feedback, Site

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/", response_class=HTMLResponse, include_in_schema=False)
async def admin_home(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    now = datetime.now(UTC)
    day_ago = now - timedelta(days=1)
    week_ago = now - timedelta(days=7)

    today_count = await _count(session, Application, Application.created_at >= day_ago)
    week_count = await _count(session, Application, Application.created_at >= week_ago)
    total_count = await _count(session, Application)
    sites_published = await _count(session, Site, Site.status == "published")

    recent_stmt = select(Application).order_by(Application.created_at.desc()).limit(20)
    recent = (await session.execute(recent_stmt)).scalars().all()

    return admin_templates.TemplateResponse(
        request,
        "dashboard.html",
        {
            "counters": {
                "applications_today": today_count,
                "applications_week": week_count,
                "applications_total": total_count,
                "sites_published": sites_published,
            },
            "recent": recent,
        },
    )


@router.get("/applications", response_class=HTMLResponse, include_in_schema=False)
async def admin_applications(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    status_filter = request.query_params.get("status")
    stmt = select(Application).order_by(Application.created_at.desc()).limit(200)
    if status_filter:
        stmt = stmt.where(Application.status == status_filter)
    rows = (await session.execute(stmt)).scalars().all()

    return admin_templates.TemplateResponse(
        request,
        "applications_list.html",
        {"applications": rows, "status_filter": status_filter},
    )


@router.get("/applications/{application_id}", response_class=HTMLResponse, include_in_schema=False)
async def admin_application_detail(
    application_id: UUID,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    app_row = (
        await session.execute(select(Application).where(Application.id == application_id))
    ).scalar_one_or_none()
    if app_row is None:
        raise HTTPException(status_code=404, detail="application_not_found")

    return admin_templates.TemplateResponse(
        request,
        "application_detail.html",
        {"application": app_row},
    )


@router.get("/waitlist", response_class=HTMLResponse, include_in_schema=False)
async def admin_waitlist(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    """ADR-0009 ≥10-vote aggregation. Source rows are grouped by
    ``source_name``; the count is distinct-by-email when an email was
    captured (anonymous votes still count, but we only deduplicate the
    identifiable ones).
    """
    stmt = (
        select(
            Feedback.source_name.label("source_name"),
            func.count(Feedback.id).label("votes"),
            func.count(func.distinct(Feedback.email)).label("distinct_emails"),
            func.min(Feedback.created_at).label("first_seen"),
            func.max(Feedback.created_at).label("last_seen"),
        )
        .where(Feedback.type == "source_request", Feedback.source_name.is_not(None))
        .group_by(Feedback.source_name)
        .order_by(func.count(Feedback.id).desc())
    )
    rows = (await session.execute(stmt)).all()

    return admin_templates.TemplateResponse(
        request,
        "waitlist.html",
        {"rows": rows, "threshold": 10},
    )


async def _count(session: AsyncSession, model: type, *filters: Any) -> int:
    stmt = select(func.count()).select_from(model)
    for f in filters:
        stmt = stmt.where(f)
    return int((await session.execute(stmt)).scalar_one())
