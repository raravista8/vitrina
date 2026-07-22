"""Admin feedback inbox (Feedback v2, CANON_FEEDBACK_V2_TZ).

GET /admin/feedback — единый список обращений: v2 («Что останавливает?» /
«Задать вопрос») + исторические строки старой формы (waitlist / votes).
Фильтр по type. Контакт (notify-канал) показывается открыто — та же
политика, что ``applications.contact_value`` в карточке заявки; Fernet
здесь нет, аудит на просмотр списка не пишется (по аналогии с
applications-list).

Отдельный роутер-файл: dashboard.py уже на пороге ~300-строчного правила
(backend/CLAUDE.md «split by sub-domain»), прецедент — leads.py.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin import admin_templates
from app.api.dependencies import get_session, require_admin
from app.core.auth.sessions import AdminSession
from app.infrastructure.postgres.models import FEEDBACK_TYPES, Feedback

router = APIRouter(prefix="/admin", tags=["admin"])

# Человеческие подписи типов (v2 + legacy).
TYPE_LABELS = {
    "blocker": "блокер",
    "question": "вопрос",
    "source_request": "waitlist-источник",
    "feature_request": "фича",
    "bug": "баг",
    "general": "прочее",
}
TRIGGER_LABELS = {"exit": "exit-intent", "scroll": "скролл 60%", "button": "кнопка"}


@router.get("/feedback", response_class=HTMLResponse, include_in_schema=False)
async def admin_feedback(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    type_filter = request.query_params.get("type")
    stmt = select(Feedback).order_by(Feedback.created_at.desc()).limit(200)
    if type_filter in FEEDBACK_TYPES:
        stmt = stmt.where(Feedback.type == type_filter)
    rows = (await session.execute(stmt)).scalars().all()

    return admin_templates.TemplateResponse(
        request,
        "feedback_list.html",
        {
            "rows": rows,
            "type_filter": type_filter,
            "type_labels": TYPE_LABELS,
            "trigger_labels": TRIGGER_LABELS,
            "types": FEEDBACK_TYPES,
        },
    )
