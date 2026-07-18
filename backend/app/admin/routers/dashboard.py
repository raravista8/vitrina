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

import re
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Annotated, Any
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import FileResponse, HTMLResponse
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin import admin_templates
from app.api.dependencies import (
    get_client_ip,
    get_lead_fernet,
    get_session,
    require_admin,
)
from app.api.routers.applications import resolve_uploads_dir
from app.core.auth.sessions import AdminSession
from app.core.leads.encryption import LeadDecryptionError, decrypt
from app.core.leads.pii_masking import mask_email, mask_phone
from app.infrastructure.postgres.models import (
    AdminAction,
    Application,
    ApplicationPhoto,
    ApplicationTextFile,
    Feedback,
    Site,
)
from app.utils.logging import get_logger

router = APIRouter(prefix="/admin", tags=["admin"])
_log = get_logger("admin.applications")

DECRYPTION_PLACEHOLDER = "[decryption_failed]"

# Человеческие подписи для карточки заявки (intake v2 + photo-режим).
V2_PATH_LABELS = {
    "name": "по названию — найти на Картах",
    "screenshot": "скриншот профиля",
    "link": "по ссылке",
    "photo": "фото работ",
}
BOOKING_LABELS = {
    "dikidi": "Dikidi",
    "yclients": "YClients",
    "phone": "по телефону и в мессенджерах",
    "none": "пока никак",
}


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
    admin: Annotated[AdminSession, Depends(require_admin)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> HTMLResponse:
    """Карточка заявки для ручной сборки сайта.

    Fernet-поля (телефон записи v2, контакт клиента photo-режима)
    по умолчанию показываются маской — как в founder-письме, без
    аудита. ``?reveal=1`` рендерит их полностью и пишет immutable
    ``admin_actions`` строку ``application_contact_decrypted``
    (та же политика, что ``lead_decrypted`` в T5.3).
    """
    app_row = (
        await session.execute(select(Application).where(Application.id == application_id))
    ).scalar_one_or_none()
    if app_row is None:
        raise HTTPException(status_code=404, detail="application_not_found")

    photos = (
        (
            await session.execute(
                select(ApplicationPhoto)
                .where(ApplicationPhoto.application_id == application_id)
                .order_by(ApplicationPhoto.index)
            )
        )
        .scalars()
        .all()
    )
    text_files = (
        (
            await session.execute(
                select(ApplicationTextFile)
                .where(ApplicationTextFile.application_id == application_id)
                .order_by(ApplicationTextFile.index)
            )
        )
        .scalars()
        .all()
    )

    booking_phone, booking_ok = _try_decrypt_optional(app_row.booking_phone_enc, fernet=fernet)
    customer_contact, customer_ok = _try_decrypt_optional(
        app_row.customer_contact_value_enc, fernet=fernet
    )
    has_encrypted = booking_phone is not None or customer_contact is not None
    reveal = request.query_params.get("reveal") == "1" and has_encrypted

    if reveal:
        session.add(
            AdminAction(
                admin_id=UUID(str(admin.admin_id)),
                action="application_contact_decrypted",
                target_type="application",
                target_id=str(app_row.id),
                params={
                    "booking_phone_decryption_ok": booking_ok,
                    "customer_contact_decryption_ok": customer_ok,
                },
                ip=get_client_ip(request),
            )
        )
        await session.commit()
        _log.info(
            "application_contact_decrypted",
            application_id=str(app_row.id),
            admin_id=str(admin.admin_id),
            all_ok=booking_ok and customer_ok,
        )

    return admin_templates.TemplateResponse(
        request,
        "application_detail.html",
        {
            "application": app_row,
            "photos": photos,
            "text_files": text_files,
            "path_labels": V2_PATH_LABELS,
            "booking_labels": BOOKING_LABELS,
            "reveal": reveal,
            "has_encrypted": has_encrypted,
            "booking_phone": booking_phone
            if reveal
            else _mask_or_placeholder(booking_phone, ok=booking_ok, contact_type="phone"),
            "customer_contact": customer_contact
            if reveal
            else _mask_or_placeholder(
                customer_contact, ok=customer_ok, contact_type=app_row.customer_contact_type
            ),
        },
    )


@router.get(
    "/applications/{application_id}/photos/{photo_id}",
    include_in_schema=False,
)
async def admin_application_photo(
    application_id: UUID,
    photo_id: UUID,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> FileResponse:
    """Отдаёт загруженное фото заявки (превью в карточке). Файл обязан
    лежать под uploads-корнем — containment-проверка на случай, если в
    ``disk_path`` каким-то образом оказался посторонний путь."""
    photo = (
        await session.execute(
            select(ApplicationPhoto).where(
                ApplicationPhoto.id == photo_id,
                ApplicationPhoto.application_id == application_id,
            )
        )
    ).scalar_one_or_none()
    if photo is None:
        raise HTTPException(status_code=404, detail="photo_not_found")
    return _serve_upload(disk_path=photo.disk_path, mime=photo.mime, filename=photo.filename)


@router.get(
    "/applications/{application_id}/files/{file_id}",
    include_in_schema=False,
)
async def admin_application_text_file(
    application_id: UUID,
    file_id: UUID,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> FileResponse:
    """Отдаёт текстовый файл заявки photo-режима (прайс, описание услуг)."""
    text_file = (
        await session.execute(
            select(ApplicationTextFile).where(
                ApplicationTextFile.id == file_id,
                ApplicationTextFile.application_id == application_id,
            )
        )
    ).scalar_one_or_none()
    if text_file is None:
        raise HTTPException(status_code=404, detail="file_not_found")
    return _serve_upload(
        disk_path=text_file.disk_path, mime=text_file.mime, filename=text_file.filename
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


def _try_decrypt_optional(
    ciphertext: bytes | None, *, fernet: MultiFernet
) -> tuple[str | None, bool]:
    """None → (None, True); битый шифротекст → (плейсхолдер, False)."""
    if ciphertext is None:
        return None, True
    try:
        return decrypt(bytes(ciphertext), fernet=fernet), True
    except LeadDecryptionError:
        _log.warning("application_contact_decryption_failed")
        return DECRYPTION_PLACEHOLDER, False


def _mask_or_placeholder(value: str | None, *, ok: bool, contact_type: str | None) -> str | None:
    """Маска для дефолтного (без reveal) рендера — та же степень
    раскрытия, что в founder-письме. Плейсхолдер расшифровки не маскируем."""
    if value is None or not ok:
        return value
    if contact_type in {"phone", "whatsapp"}:
        return mask_phone(value)
    if contact_type == "email":
        return mask_email(value)
    return _mask_handle(value)


def _mask_handle(value: str) -> str:
    """@username / max-идентификатор: первые 2 + последние 2 символа тела."""
    prefix, body = (value[0], value[1:]) if value.startswith("@") else ("", value)
    if len(body) <= 4:
        return f"{prefix}***"
    return f"{prefix}{body[:2]}***{body[-2:]}"


def _serve_upload(*, disk_path: str, mime: str, filename: str) -> FileResponse:
    uploads_root = resolve_uploads_dir().resolve()
    path = Path(disk_path).resolve()
    if not path.is_relative_to(uploads_root) or not path.is_file():
        raise HTTPException(status_code=404, detail="file_missing")
    # Имя пришло от загрузившего — чистим до безопасного ASCII/кириллицы,
    # чтобы в Content-Disposition не утекали управляющие символы.
    safe_name = re.sub(r"[^\w.\- а-яА-ЯёЁ]", "_", filename)[:120] or "file"
    return FileResponse(path, media_type=mime, filename=safe_name)
