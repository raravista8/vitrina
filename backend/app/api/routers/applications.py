"""``POST /api/submit-application`` — first user-facing endpoint (T1.3).
``POST /api/submit-application/photo`` — multipart variant (PR-B #6).
``GET  /api/applications/{id}/tg-bot-status`` — Step #4 polling (UI-PR-A).

Validates input via Pydantic, runs the rate limiter, delegates to the
``core.applications.service`` for persistence, returns the canonical
success envelope ``{"ok": true, "data": {...}}``. Errors flow through the
T1.2 exception handler chain — a ``DomainError`` from the service becomes
HTTPException(400, detail=<code>) which the handler turns into the
``{"ok": false, "error": "<code>", "request_id": "..."}`` envelope.

The tg-bot-status route is polled every 5s by the Submit modal while
step=4. It returns ``{added: bool}`` — the SubmitModal advances to
Step #5 (confirmation) the instant ``added`` flips to true.

The /photo variant accepts multipart/form-data with ``files[]`` plus a
parallel ``photo_types[]`` array, business name, category, city, contact,
consent flag, and captcha token. Files are validated against FR-014/015
(30 max, 10MB per file, 100MB total, magic-byte sniff via the existing
``core.parsing.adapters.photos`` helpers) and written to ``UPLOADS_DIR``.
"""

from __future__ import annotations

import tempfile
from pathlib import Path
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile
from pydantic import BaseModel, ConfigDict
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    application_rate_limiter,
    get_captcha_verifier,
    get_client_ip,
    get_notification_dispatcher,
    get_session,
)
from app.api.schemas.applications import (
    SubmitApplicationData,
    SubmitApplicationRequest,
    SubmitApplicationResponse,
)
from app.config import get_settings
from app.core.applications.service import submit_application
from app.core.captcha.verifier import CaptchaVerifier
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.core.parsing.adapters.photos import (
    ALLOWED_MIME_TYPES,
    MAX_BYTES_PER_FILE,
    MAX_TOTAL_BYTES,
    PhotoBatchRejectedError,
    UploadedPhoto,
    detect_mime,
    validate_batch,
)
from app.infrastructure.postgres.models import ApplicationPhoto
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
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> SubmitApplicationResponse:
    log = get_logger("api.applications")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

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

    # v2 (FR-002a / ADR-0008 v2): if frontend supplied an explicit
    # `channel`, validate that it matches the server-detected
    # contact_type. Mismatch → 400 invalid_contact_for_channel.
    # When `channel` is None (v1 callers), this branch is skipped and
    # auto-detect alone governs (compat layer).
    if body.channel is not None and result.unwrap().contact_type != body.channel:
        log.info(
            "application_rejected",
            code="invalid_contact_for_channel",
            requested=body.channel,
            detected=result.unwrap().contact_type,
        )
        raise HTTPException(status_code=400, detail="invalid_contact_for_channel")

    application = result.unwrap()
    log.info(
        "application_accepted",
        application_id=str(application.id),
        source_type=application.source_type,
        contact_type=application.contact_type,
    )

    # Founder admin alert. Best-effort: NotificationDispatcher swallows
    # delivery failures and logs them — the user has already received a
    # 202 in any case (FR-002 "respond 202 within 1s").
    await notifier.notify_founder(
        kind=NotificationKind.application_received,
        message=NotificationMessage(
            title=f"🆕 Заявка #{str(application.id)[:8]}",
            body=(
                f"Источник: {application.source_type}"
                f"\nКонтакт: {_mask_contact(application.contact_value, application.contact_type)} "
                f"({application.contact_type})"
                f"\nURL: {application.source_url or '—'}"
            ),
        ),
    )

    return SubmitApplicationResponse(
        data=SubmitApplicationData(
            application_id=application.id,
            contact_type=application.contact_type,  # type: ignore[arg-type]
        )
    )


# ---- tg-bot-status (UI Step #4 polling) ----------------------------------


class _TgBotStatusData(BaseModel):
    model_config = ConfigDict(extra="forbid")
    added: bool


class _TgBotStatusResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    ok: bool = True
    data: _TgBotStatusData


@router.get(
    "/applications/{application_id}/tg-bot-status",
    response_model=_TgBotStatusResponse,
)
async def get_tg_bot_status(
    application_id: UUID,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> _TgBotStatusResponse:
    """Polled by the Submit modal's Step #4 every 5s.

    Signal source: ``applications.status`` advances past ``pending``
    once the parser-worker (T3.4) ingests the channel or the founder
    approves manually. The UI receives ``added=true`` and jumps to
    Step #5 (confirmation).

    The endpoint is intentionally cheap — one SELECT, no auth (the
    application_id is a UUIDv4, unguessable, and the only data it
    leaks is a single boolean). 404 for unknown IDs is safe — there's
    no enumeration value in a guess.
    """
    from app.infrastructure.postgres.models import Application

    row = (
        await session.execute(select(Application).where(Application.id == application_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="application_not_found")
    # `status` moves off "pending" when the bot ingests or founder
    # approves. Both flows are "we've got what we need" from the
    # user's perspective.
    added = row.status != "pending"
    return _TgBotStatusResponse(data=_TgBotStatusData(added=added))


# =============================================================================
# POST /api/submit-application/photo — multipart variant (PR-B #6)
# =============================================================================


_PHOTO_TYPE_DEFAULT = "unknown"
_ALLOWED_PHOTO_TYPES_FOR_DB = frozenset(
    {"work", "profile_screenshot", "business_card", "booklet", "unknown"}
)
_MIN_PHOTO_FILES = 5  # design canvas screen #6 — CTA disabled below 5


def _resolve_uploads_dir() -> Path:
    """``UPLOADS_DIR`` from settings; falls back to a process-tmpdir
    subfolder so ``make dev`` and tests work without env wiring."""
    configured = get_settings().uploads_dir
    path = Path(configured) if configured else Path(tempfile.gettempdir()) / "vitrina-uploads"
    path.mkdir(parents=True, exist_ok=True)
    return path


def _extension_for_mime(mime: str) -> str:
    return {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/heic": "heic",
    }.get(mime, "bin")


@router.post(
    "/submit-application/photo",
    response_model=SubmitApplicationResponse,
    status_code=202,
)
async def post_submit_application_photo(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
    files: Annotated[list[UploadFile], File(description="5–30 image files")],
    contact: Annotated[str, Form(min_length=2, max_length=320)],
    consent_given: Annotated[bool, Form()],
    captcha_token: Annotated[str, Form(min_length=1, max_length=4096)],
    business_name: Annotated[str | None, Form(max_length=200)] = None,
    category: Annotated[str | None, Form(max_length=80)] = None,
    city: Annotated[str | None, Form(max_length=120)] = None,
    photo_types: Annotated[list[str] | None, Form()] = None,
) -> SubmitApplicationResponse:
    """Multipart variant of ``POST /api/submit-application`` for the
    photo-upload flow (Design canvas screen #6).

    Validation order (fail-fast):

    1. CAPTCHA token — 400 if invalid (no PII exposed)
    2. File count — 413 if outside [_MIN_PHOTO_FILES, MAX_FILES]
    3. Per-file size — 413 if >MAX_BYTES_PER_FILE
    4. Total batch size — 413 if >MAX_TOTAL_BYTES
    5. Magic-byte sniff per file — 400 ``bad_magic_bytes`` if any file
       has a Content-Type / extension that doesn't match its actual
       bytes (FR-015)
    6. Application + consent + user persisted via the same core service
       as the JSON endpoint
    7. Files written to ``UPLOADS_DIR/<application_id>/<index>.<ext>``,
       one ``application_photos`` row per file

    On any failure after step 6, the application row is rolled back so
    we never leak orphan rows. Founder receives a single TG-notification
    with file count + photo_type histogram (no PII content of files).
    """
    log = get_logger("api.applications.photo")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    # 1. CAPTCHA — same rules as the JSON endpoint
    captcha_result = await captcha.verify(captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    # 2-4. File count + size limits (FR-014).
    if len(files) < _MIN_PHOTO_FILES:
        raise HTTPException(status_code=413, detail="too_few_files")

    # Read bytes once so we can size-check + magic-byte-sniff + persist
    # all from the same buffer (UploadFile streams are single-use).
    contents: list[tuple[UploadFile, bytes]] = []
    total_bytes = 0
    for upload in files:
        body = await upload.read()
        contents.append((upload, body))
        total_bytes += len(body)
        if len(body) > MAX_BYTES_PER_FILE:
            raise HTTPException(status_code=413, detail="file_too_large")
        if total_bytes > MAX_TOTAL_BYTES:
            raise HTTPException(status_code=413, detail="batch_too_large")

    # validate_batch covers the upper count bound + empty-file rejection
    # and gives us a single error code surface aligned with FR-014.
    upload_models = [
        UploadedPhoto(filename=upload.filename or f"upload-{i}.bin", content=body)
        for i, (upload, body) in enumerate(contents)
    ]
    try:
        validate_batch(upload_models)
    except PhotoBatchRejectedError as exc:
        log.info("photo_batch_rejected", reason=str(exc))
        raise HTTPException(status_code=413, detail="photo_batch_rejected") from exc

    # 5. Magic-byte sniff. We do this BEFORE persisting the application
    # so a bad batch never leaves an application row behind.
    detected_mimes: list[str] = []
    for upload, body in contents:
        sniff = detect_mime(body)
        if sniff is None or sniff not in ALLOWED_MIME_TYPES:
            log.info("bad_magic_bytes", filename=upload.filename)
            raise HTTPException(status_code=400, detail="bad_magic_bytes")
        detected_mimes.append(sniff)

    # Per-file photo_type (defaults to "unknown" when client didn't send
    # the parallel array or sent an unrecognised value). The vision-LLM
    # in T4 classifies the latter.
    types_in: list[str] = photo_types if photo_types else []
    resolved_types: list[str] = []
    for i in range(len(contents)):
        raw_type = types_in[i] if i < len(types_in) else _PHOTO_TYPE_DEFAULT
        resolved_types.append(
            raw_type if raw_type in _ALLOWED_PHOTO_TYPES_FOR_DB else _PHOTO_TYPE_DEFAULT
        )

    # 6. Persist application — same service as the JSON endpoint.
    result = await submit_application(
        session=session,
        source_url=None,
        source_type="photo",
        contact=contact,
        consent_given=consent_given,
        ip=ip,
        user_agent=user_agent,
    )
    if result.is_err():
        err = result.unwrap_err()
        log.info("application_rejected", code=err.code)
        raise HTTPException(status_code=400, detail=err.code)

    application = result.unwrap()

    # 7. Files to disk + application_photos rows. We flush the per-photo
    # inserts before the session.commit() at the end of the request so
    # the FK to applications resolves; the parent already exists from
    # the service call above.
    uploads_root = _resolve_uploads_dir()
    target_dir = uploads_root / str(application.id)
    target_dir.mkdir(parents=True, exist_ok=True)

    by_type: dict[str, int] = {}
    for index, ((upload, body), mime, ptype) in enumerate(
        zip(contents, detected_mimes, resolved_types, strict=True)
    ):
        ext = _extension_for_mime(mime)
        disk_path = target_dir / f"{index:02d}.{ext}"
        disk_path.write_bytes(body)
        session.add(
            ApplicationPhoto(
                application_id=application.id,
                index=index,
                filename=upload.filename or f"upload-{index}.{ext}",
                photo_type=ptype,
                mime=mime,
                size_bytes=len(body),
                disk_path=str(disk_path),
            )
        )
        by_type[ptype] = by_type.get(ptype, 0) + 1

    log.info(
        "photo_application_accepted",
        application_id=str(application.id),
        contact_type=application.contact_type,
        file_count=len(contents),
        total_bytes=total_bytes,
        by_type=by_type,
        business_name_set=business_name is not None,
        category=category,
        city=city,
    )

    # Founder admin alert (best-effort).
    await notifier.notify_founder(
        kind=NotificationKind.application_received,
        message=NotificationMessage(
            title=f"📸 Заявка #{str(application.id)[:8]} (фото)",
            body=(
                f"Источник: photo ({len(contents)} файлов, "
                f"{total_bytes // 1024} КБ)"
                f"\nКонтакт: {_mask_contact(application.contact_value, application.contact_type)} "
                f"({application.contact_type})"
                f"\nИмя дела: {business_name or '—'}"
                f"\nКатегория: {category or '—'}"
                f"\nГород: {city or '—'}"
                f"\nТипы: {by_type}"
            ),
        ),
    )

    return SubmitApplicationResponse(
        data=SubmitApplicationData(
            application_id=application.id,
            contact_type=application.contact_type,  # type: ignore[arg-type]
        )
    )


def _mask_contact(value: str, contact_type: str) -> str:
    """Mask PII for the founder-facing alert.

    Same rule as app/utils/logging.py PIIRedactor but applied per
    contact_type so the admin gets a useful hint without seeing the full
    phone / email.
    """
    if contact_type == "email":
        local, _, domain = value.partition("@")
        return f"{local[:1]}***@{domain}" if local else "***"
    if contact_type == "phone":
        return f"+7***{value[-4:]}" if len(value) >= 4 else "***"
    if contact_type in {"telegram", "max"}:
        # Keep leading "@" / "max://", mask the body.
        prefix, body = (value[:1], value[1:]) if value.startswith("@") else value.split("//", 1)
        if isinstance(prefix, str) and isinstance(body, str):
            if len(body) <= 4:
                return f"{prefix}***"
            return f"{prefix}{body[:2]}***{body[-2:]}"
    return "***"
