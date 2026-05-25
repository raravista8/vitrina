"""``POST /api/submit-application`` — JSON link-mode entry (T1.3 + canon 0.3.0).
``POST /api/submit-application/photo`` — multipart photo-mode entry (extended
in 0.3.0 with description, city, customer_contact, text_files).

Validates input via Pydantic, runs the rate limiter, delegates to the
``core.applications.service`` for persistence, returns the canonical
success envelope ``{"ok": true, "data": {...}}``. Errors flow through the
T1.2 exception handler chain.

canon 0.3.0 changes:
  * Removed ``GET /api/applications/{id}/tg-bot-status`` — the personal-
    notification onboarding step (`@SamositeBot` invite) is gone from the
    intake flow. Notifications now happen post-approval via email/TG by
    the operator.
  * Photo endpoint extended with the four photo-branch fields
    (description, city, customer_contact_*) + optional text_files[]
    multipart attachments.
  * Photo endpoint persists Fernet-encrypted `customer_contact_value` via
    the service.
"""

from __future__ import annotations

import tempfile
from pathlib import Path
from typing import Annotated
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    application_rate_limiter,
    get_captcha_verifier,
    get_client_ip,
    get_lead_fernet,
    get_notification_dispatcher,
    get_session,
)
from app.api.schemas.applications import (
    SubmitApplicationData,
    SubmitApplicationLinkRequest,
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
from app.core.parsing.file_validators import (
    TextFileValidationError,
    validate_text_file_batch,
)
from app.infrastructure.postgres.models import ApplicationPhoto, ApplicationTextFile
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["applications"])


@router.post(
    "/submit-application",
    response_model=SubmitApplicationResponse,
    status_code=202,
)
async def post_submit_application(
    body: SubmitApplicationLinkRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> SubmitApplicationResponse:
    """JSON entry — mode='link' only.

    The photo flow uses ``POST /submit-application/photo`` (multipart)
    because photo bytes accompany the JSON fields in the same request.
    """
    log = get_logger("api.applications")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    result = await submit_application(
        session=session,
        mode="link",
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
    # `channel`, validate that it matches the server-detected contact_type.
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
        mode="link",
        source_type=application.source_type,
        contact_type=application.contact_type,
    )

    await notifier.notify_founder(
        kind=NotificationKind.application_received,
        message=NotificationMessage(
            title=f"🆕 Заявка #{str(application.id)[:8]}",
            body=(
                f"Mode: link"
                f"\nИсточник: {application.source_type}"
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


# =============================================================================
# POST /api/submit-application/photo — multipart photo-mode (canon 0.3.0)
# =============================================================================
#
# canon 0.3.0 schema:
#   files[]                 — image bytes (existing)
#   contact                 — notify channel value (existing)
#   channel                 — notify channel type (existing optional)
#   consent_given           — bool (existing)
#   captcha_token           — captcha (existing)
#   description             — NEW required (≥30 chars after trim)
#   city                    — NEW required
#   customer_contact_type   — NEW required ('phone' | 'telegram')
#   customer_contact_value  — NEW required (Fernet-encrypted server-side)
#   text_files[]            — NEW optional (PDF/DOCX/TXT/RTF, ≤10 files)


_PHOTO_TYPE_DEFAULT = "unknown"
_ALLOWED_PHOTO_TYPES_FOR_DB = frozenset(
    {"work", "profile_screenshot", "business_card", "booklet", "unknown"}
)
_MIN_PHOTO_FILES = 1  # user can submit with just 1 photo (was 5 per
# canvas — relaxed at consumer request «пусть будет хоть одно»).
_MIN_DESCRIPTION_CHARS = 30


def _resolve_uploads_dir() -> Path:
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


def _text_extension_for_mime(mime: str) -> str:
    return {
        "application/pdf": "pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "text/plain": "txt",
        "application/rtf": "rtf",
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
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
    files: Annotated[list[UploadFile], File(description="5–60 image files")],
    # Notify channel — how WE reach the master.
    contact: Annotated[str, Form(min_length=2, max_length=320)],
    consent_given: Annotated[bool, Form()],
    captcha_token: Annotated[str, Form(min_length=1, max_length=4096)],
    channel: Annotated[str | None, Form(max_length=16)] = None,
    # canon 0.3.0 photo-branch required fields.
    description: Annotated[
        str,
        Form(
            min_length=_MIN_DESCRIPTION_CHARS,
            max_length=4000,
            description="What the business does — free-text from the master.",
        ),
    ] = "",
    city: Annotated[str, Form(min_length=1, max_length=128)] = "",
    customer_contact_type: Annotated[str, Form(max_length=16)] = "",
    customer_contact_value: Annotated[str, Form(min_length=2, max_length=64)] = "",
    # Optional text attachments (PDF/DOCX/TXT/RTF, ≤10 files).
    text_files: Annotated[list[UploadFile] | None, File()] = None,
    # Legacy photo classification (deprecated — kept for compat). Reads
    # the parallel `photo_types[]` array; defaults to "unknown" per-slot.
    photo_types: Annotated[list[str] | None, Form()] = None,
) -> SubmitApplicationResponse:
    """Multipart photo-flow entry for canon 0.3.0.

    Validation order (fail-fast):
      1. CAPTCHA
      2. description ≥30 chars, city, customer_contact_* all present
         (Pydantic-style guard mirrored here since multipart Form() can't
         carry the discriminated union directly)
      3. File count + per-file size + total size
      4. Magic-byte sniff per photo
      5. text_files[] magic-byte sniff per file (if provided)
      6. Application persistence (service-level mode='photo' guard)
      7. Photos + text files to disk + manifest rows

    Founder gets a single TG-notification with file counts + description
    snippet (no PII).
    """
    log = get_logger("api.applications.photo")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    # 1. CAPTCHA
    captcha_result = await captcha.verify(captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    # 2. Photo-mode required fields (multipart can't validate via Pydantic)
    if len(description.strip()) < _MIN_DESCRIPTION_CHARS:
        raise HTTPException(status_code=400, detail="description_too_short")
    if not city.strip():
        raise HTTPException(status_code=400, detail="city_required")
    if customer_contact_type not in ("phone", "telegram"):
        raise HTTPException(status_code=400, detail="invalid_customer_contact_type")
    if not customer_contact_value.strip():
        raise HTTPException(status_code=400, detail="customer_contact_required")

    # 3. File count + size limits
    if len(files) < _MIN_PHOTO_FILES:
        raise HTTPException(status_code=413, detail="too_few_files")

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

    upload_models = [
        UploadedPhoto(filename=upload.filename or f"upload-{i}.bin", content=body)
        for i, (upload, body) in enumerate(contents)
    ]
    try:
        validate_batch(upload_models)
    except PhotoBatchRejectedError as exc:
        log.info("photo_batch_rejected", reason=str(exc))
        raise HTTPException(status_code=413, detail="photo_batch_rejected") from exc

    # 4. Magic-byte sniff per photo
    detected_mimes: list[str] = []
    for upload, body in contents:
        sniff = detect_mime(body)
        if sniff is None or sniff not in ALLOWED_MIME_TYPES:
            log.info("bad_magic_bytes", filename=upload.filename)
            raise HTTPException(status_code=400, detail="bad_magic_bytes")
        detected_mimes.append(sniff)

    # 5. text_files[] magic-byte sniff (optional)
    text_payloads: list[tuple[str, bytes, str]] = []
    if text_files:
        raw_text: list[tuple[str, bytes]] = []
        for tf in text_files:
            tb = await tf.read()
            raw_text.append((tf.filename or "file.txt", tb))
        try:
            text_payloads = validate_text_file_batch(raw_text)
        except TextFileValidationError as exc:
            log.info("text_file_rejected", code=exc.code, detail=exc.detail)
            raise HTTPException(status_code=400, detail=exc.code) from exc

    # photo_types (legacy parallel array)
    types_in: list[str] = photo_types if photo_types else []
    resolved_types: list[str] = []
    for i in range(len(contents)):
        raw_type = types_in[i] if i < len(types_in) else _PHOTO_TYPE_DEFAULT
        resolved_types.append(
            raw_type if raw_type in _ALLOWED_PHOTO_TYPES_FOR_DB else _PHOTO_TYPE_DEFAULT
        )

    # 6. Persist application (mode='photo')
    result = await submit_application(
        session=session,
        mode="photo",
        source_url=None,
        source_type="photo",
        description=description.strip(),
        city=city.strip(),
        customer_contact_type=customer_contact_type,
        customer_contact_value=customer_contact_value.strip(),
        contact=contact,
        consent_given=consent_given,
        ip=ip,
        user_agent=user_agent,
        fernet=fernet,
    )
    if result.is_err():
        err = result.unwrap_err()
        log.info("application_rejected", code=err.code)
        raise HTTPException(status_code=400, detail=err.code)

    application = result.unwrap()

    # v2: explicit channel check
    if channel is not None and application.contact_type != channel:
        # We've already persisted the row — rolling back here would leave
        # the disk files orphaned. Accept the row and log the mismatch;
        # downstream operator can correct manually.
        log.warning(
            "channel_mismatch_after_persist",
            requested=channel,
            detected=application.contact_type,
            application_id=str(application.id),
        )

    # 7. Files to disk + manifest rows
    uploads_root = _resolve_uploads_dir()
    target_dir = uploads_root / str(application.id)
    target_dir.mkdir(parents=True, exist_ok=True)
    text_dir = target_dir / "text"
    if text_payloads:
        text_dir.mkdir(parents=True, exist_ok=True)

    # Photos
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

    # Text files
    for index, (filename, body, mime) in enumerate(text_payloads):
        ext = _text_extension_for_mime(mime)
        disk_path = text_dir / f"{index:02d}.{ext}"
        disk_path.write_bytes(body)
        session.add(
            ApplicationTextFile(
                application_id=application.id,
                index=index,
                filename=filename,
                mime=mime,
                size_bytes=len(body),
                disk_path=str(disk_path),
            )
        )

    log.info(
        "photo_application_accepted",
        application_id=str(application.id),
        mode="photo",
        contact_type=application.contact_type,
        photo_count=len(contents),
        text_file_count=len(text_payloads),
        total_bytes=total_bytes,
        by_type=by_type,
        city=city.strip(),
        customer_contact_type=customer_contact_type,
    )

    # Founder alert
    description_snip = description.strip().replace("\n", " ")
    if len(description_snip) > 140:
        description_snip = description_snip[:137] + "…"
    await notifier.notify_founder(
        kind=NotificationKind.application_received,
        message=NotificationMessage(
            title=f"📸 Заявка #{str(application.id)[:8]} (фото)",
            body=(
                f"Mode: photo"
                f"\nГород: {city.strip()}"
                f"\nКонтакт клиента: {_mask_contact(customer_contact_value.strip(), customer_contact_type)} "
                f"({customer_contact_type})"
                f"\nКонтакт notify: {_mask_contact(application.contact_value, application.contact_type)} "
                f"({application.contact_type})"
                f"\nФото: {len(contents)} ({total_bytes // 1024} КБ)"
                f"\nТекст. файлов: {len(text_payloads)}"
                f"\nОписание: {description_snip}"
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
    """Mask PII for the founder-facing alert."""
    if contact_type == "email":
        local, _, domain = value.partition("@")
        return f"{local[:1]}***@{domain}" if local else "***"
    if contact_type == "phone":
        return f"+7***{value[-4:]}" if len(value) >= 4 else "***"
    if contact_type in {"telegram", "max"}:
        prefix, body = (value[:1], value[1:]) if value.startswith("@") else value.split("//", 1)
        if isinstance(prefix, str) and isinstance(body, str):
            if len(body) <= 4:
                return f"{prefix}***"
            return f"{prefix}{body[:2]}***{body[-2:]}"
    return "***"


# Public alias to satisfy import callers (e.g. tests that import UUID dep)
__all__ = ["router"]
_ = UUID  # silence unused import — kept for future endpoints
