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

import re
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
from app.core.contact.auto_detect import validate_channel_value
from app.core.notify.dispatcher import NotificationDispatcher, UserContact
from app.core.notify.ports import ChannelType, NotificationKind, NotificationMessage
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
            # Email subject for the founder alert (TG keeps the #id title).
            metadata={"email_subject": "новая заявка на сайт"},
        ),
    )

    await _ack_applicant(
        notifier,
        contact_type=application.contact_type,
        contact_value=application.contact_value,
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


# Единая точка правды о корне загрузок: admin-роуты отдают файлы заявок и
# обязаны резолвить корень так же, как писатель выше (path-containment check).
resolve_uploads_dir = _resolve_uploads_dir


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

    # Без commit манифест-строки молча откатывались при закрытии сессии
    # (submit_application коммитит только Application) — файлы оставались
    # сиротами на диске, а admin-карточка видела пустые «Фото»/«Файлы».
    await session.commit()

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
            # Email subject for the founder alert (TG keeps the #id title).
            metadata={"email_subject": "новая заявка на сайт"},
        ),
    )

    await _ack_applicant(
        notifier,
        contact_type=application.contact_type,
        contact_value=application.contact_value,
    )

    return SubmitApplicationResponse(
        data=SubmitApplicationData(
            application_id=application.id,
            contact_type=application.contact_type,  # type: ignore[arg-type]
        )
    )


# =============================================================================
# POST /api/submit-application/v2 — intake v2 «ниша → источник → запись →
# контакты» (июль 2026). Исполнение заявки РУЧНОЕ (founder собирает сайт
# сам) — эндпоинт только собирает данные и шлёт founder'у полный тикет.
# =============================================================================

_V2_SOURCE_PATHS = ("name", "screenshot", "link", "photo")
_V2_BOOKING_PLATFORMS = ("dikidi", "yclients", "phone", "none")
_V2_CHANNELS = ("telegram", "max", "whatsapp", "email", "phone")
_V2_MAX_PHOTOS = 5  # спека: «до 5 фото»; скриншот — ровно 1
_V2_MAX_SCREENSHOT_BYTES = 8 * 1024 * 1024  # спека: изображения до 8 МБ
_V2_URL_RE = re.compile(r"^https?://\S+\.\S+", re.IGNORECASE)
_V2_LINK_SOURCES = {  # путь «ссылка»: узнаваемые платформы → source_type
    "yandex.ru/maps": "ymaps",
    "maps.yandex": "ymaps",
    "yandex.com/maps": "ymaps",
    "t.me/": "telegram",
    "telegram.me/": "telegram",
    "2gis.ru": "twogis",
    "2gis.com": "twogis",
    "avito.ru": "avito",
    "vk.com": "vk",
    "vk.ru": "vk",
}


def _v2_detect_link_source(url: str) -> str:
    lowered = url.lower()
    for marker, source in _V2_LINK_SOURCES.items():
        if marker in lowered:
            return source
    return "website"


@router.post("/submit-application/v2", status_code=202)
async def submit_application_v2(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _rate: Annotated[None, Depends(application_rate_limiter)],
    source_path: Annotated[str, Form(max_length=16)],
    contact_channel: Annotated[str, Form(max_length=16)],
    contact: Annotated[str, Form(min_length=2, max_length=128)],
    consent_given: Annotated[bool, Form()] = False,
    captcha_token: Annotated[str, Form(max_length=2048)] = "",
    niche: Annotated[str, Form(max_length=32)] = "",
    business_name: Annotated[str, Form(max_length=160)] = "",
    city: Annotated[str, Form(max_length=128)] = "",
    source_url: Annotated[str, Form(max_length=1024)] = "",
    booking_platform: Annotated[str, Form(max_length=16)] = "none",
    booking_url: Annotated[str, Form(max_length=1024)] = "",
    booking_phone: Annotated[str, Form(max_length=32)] = "",
    files: Annotated[list[UploadFile], File()] = [],  # noqa: B006 — FastAPI sentinel
) -> SubmitApplicationResponse:
    """Единый вход нового флоу. Валидация по путям (спека v2):

      name       — business_name обязателен (город опционален)
      screenshot — ровно 1 изображение ≤ 8 МБ (photo_type='profile_screenshot')
      link       — валидный http(s)-URL; платформа детектится best-effort
      photo      — 1..5 изображений (photo_type='work')

    Запись: dikidi|yclients → booking_url опционален, но если дан — URL;
    phone → booking_phone валидный телефон (Fernet at rest); none — ничего.
    Контакт: канал задаётся ЯВНО (включая whatsapp), значение валидируется
    против канала. Файлы проверяются по magic-bytes, как в photo-режиме.
    """
    log = get_logger("api.applications.v2")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    # 1. CAPTCHA (та же семантика, что у существующих эндпоинтов)
    captcha_result = await captcha.verify(captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    # 2. Общие enum-поля
    if source_path not in _V2_SOURCE_PATHS:
        raise HTTPException(status_code=400, detail="invalid_source_path")
    if booking_platform not in _V2_BOOKING_PLATFORMS:
        raise HTTPException(status_code=400, detail="invalid_booking_platform")
    if contact_channel not in _V2_CHANNELS:
        raise HTTPException(status_code=400, detail="invalid_contact_channel")

    # 3. Path-специфичные инварианты
    business_name = business_name.strip()
    source_url = source_url.strip()
    resolved_source_type = "photo"
    if source_path == "name":
        if len(business_name) < 2:
            raise HTTPException(status_code=400, detail="business_name_required")
        # Карточку ищет founder руками (Я.Карты) — source_type фиксируем ymaps.
        resolved_source_type = "ymaps"
    elif source_path == "link":
        if not _V2_URL_RE.match(source_url):
            raise HTTPException(status_code=400, detail="invalid_source_url")
        resolved_source_type = _v2_detect_link_source(source_url)
    elif source_path == "screenshot":
        if len(files) != 1:
            raise HTTPException(status_code=400, detail="screenshot_requires_one_file")
    else:  # photo
        if not 1 <= len(files) <= _V2_MAX_PHOTOS:
            raise HTTPException(status_code=400, detail="photo_count_out_of_range")

    # 4. Запись («куда ведёт кнопка Записаться»)
    booking_url = booking_url.strip()
    booking_phone_norm: str | None = None
    if booking_platform in ("dikidi", "yclients"):
        if booking_url and not _V2_URL_RE.match(booking_url):
            raise HTTPException(status_code=400, detail="invalid_booking_url")
    elif booking_platform == "phone":
        raw_phone = booking_phone.strip()
        if raw_phone:
            booking_phone_norm = validate_channel_value("phone", raw_phone)
            if booking_phone_norm is None:
                raise HTTPException(status_code=400, detail="invalid_booking_phone")
        booking_url = ""
    else:  # none
        booking_url = ""

    # 5. Файлы: размер + magic-bytes (переиспользуем photo-пайплайн)
    contents: list[tuple[UploadFile, bytes]] = []
    total_bytes = 0
    max_per_file = _V2_MAX_SCREENSHOT_BYTES if source_path == "screenshot" else MAX_BYTES_PER_FILE
    for upload in files[: _V2_MAX_PHOTOS + 1]:
        body = await upload.read()
        if not body:
            continue
        if len(body) > max_per_file:
            raise HTTPException(status_code=413, detail="file_too_large")
        total_bytes += len(body)
        if total_bytes > MAX_TOTAL_BYTES:
            raise HTTPException(status_code=413, detail="batch_too_large")
        contents.append((upload, body))

    detected_mimes: list[str] = []
    for _upload, body in contents:
        mime = detect_mime(body)
        if mime not in ALLOWED_MIME_TYPES:
            raise HTTPException(status_code=400, detail="unsupported_file_type")
        detected_mimes.append(mime)

    # 6. Персист (user + consent + application атомарно)
    result = await submit_application(
        session=session,
        source_url=source_url or None,
        source_type=resolved_source_type,
        contact=contact,
        consent_given=consent_given,
        ip=ip,
        user_agent=user_agent,
        mode="v2",
        city=city.strip() or None,
        fernet=fernet,
        contact_channel=contact_channel,
        source_path=source_path,
        niche=niche.strip() or None,
        business_name=business_name or None,
        booking_platform=booking_platform,
        booking_url=booking_url or None,
        booking_phone=booking_phone_norm,
    )
    if result.is_err():
        error = result.unwrap_err()
        status = 400 if error.code != "contact_conflict" else 409
        raise HTTPException(status_code=status, detail=error.code)
    application = result.unwrap()

    # 7. Файлы на диск + манифест (photo_type по пути)
    ptype = "profile_screenshot" if source_path == "screenshot" else "work"
    if contents:
        uploads_root = _resolve_uploads_dir()
        target_dir = uploads_root / str(application.id)
        target_dir.mkdir(parents=True, exist_ok=True)
        for index, ((upload, body), mime) in enumerate(zip(contents, detected_mimes, strict=True)):
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
        await session.commit()

    log.info(
        "v2_application_accepted",
        application_id=str(application.id),
        source_path=source_path,
        source_type=resolved_source_type,
        niche=niche or None,
        booking_platform=booking_platform,
        contact_type=application.contact_type,
        files=len(contents),
    )

    # 8. Founder-тикет: всё, что нужно для РУЧНОЙ сборки, в одном письме
    booking_line = booking_platform
    if booking_url:
        booking_line += f" · {booking_url}"
    if booking_phone_norm:
        booking_line += f" · {_mask_contact(booking_phone_norm, 'phone')}"
    await notifier.notify_founder(
        kind=NotificationKind.application_received,
        message=NotificationMessage(
            title=f"🆕 Заявка v2 #{str(application.id)[:8]}",
            body=(
                f"Путь: {source_path}"
                f"\nНиша: {niche or '—'}"
                f"\nНазвание: {business_name or '—'}"
                f"\nГород: {city.strip() or '—'}"
                f"\nСсылка: {source_url or '—'} ({resolved_source_type})"
                f"\nЗапись: {booking_line}"
                f"\nФайлы: {len(contents)} ({ptype if contents else '—'})"
                f"\nКонтакт: {_mask_contact(application.contact_value, application.contact_type)} "
                f"({application.contact_type})"
            ),
            metadata={"email_subject": "новая заявка на сайт (v2)"},
        ),
    )

    await _ack_applicant(
        notifier,
        contact_type=application.contact_type,
        contact_value=application.contact_value,
    )

    return SubmitApplicationResponse(
        data=SubmitApplicationData(
            application_id=application.id,
            contact_type=application.contact_type,  # type: ignore[arg-type]
        )
    )


# users.contact_type → dispatcher channel. "phone" maps to SMS, which the
# ALLOWED_CHANNELS_FOR_KIND policy excludes for application_received
# (FR-002c — no SMS on submit), so phone applicants get no ack by design.
# intake v2: "whatsapp" не мапится (адаптера нет) — .get() вернёт None и
# _ack_applicant молча пропустит; заработает при появлении канала.
_CONTACT_TO_CHANNEL: dict[str, ChannelType] = {
    "telegram": ChannelType.telegram,
    "email": ChannelType.email,
    "max": ChannelType.max,
    "phone": ChannelType.sms,
}


async def _ack_applicant(
    notifier: NotificationDispatcher, *, contact_type: str, contact_value: str
) -> None:
    """Speed-to-lead: instant «заявка принята» ack to the applicant on their
    chosen channel, fired right after the founder alert. The submit impulse
    dies in minutes — an immediate confirmation with a concrete promise keeps
    the loop warm until the site is ready. Best-effort: today only the email
    channel delivers (TG is blocked from the VPS — OPERATIONS §4; SMS is
    excluded on submit per FR-002c; MAX has no adapter), the rest skip
    silently and start working as their adapters come online. Never fails
    the 202."""
    log = get_logger("api.applications.ack")
    channel = _CONTACT_TO_CHANNEL.get(contact_type)
    if channel is None:
        return
    try:
        delivery = await notifier.notify_user(
            contact=UserContact(primary_type=channel, primary_value=contact_value),
            kind=NotificationKind.application_received,
            message=NotificationMessage(
                # title doubles as the email Subject (SmtpClient contract).
                title="Заявка принята — собираем ваш сайт",
                body=(
                    "Самосайт принял вашу заявку и уже собирает сайт.\n\n"
                    "Напишем сюда, как только всё будет готово — обычно "
                    "в течение 2 часов.\n\n"
                    "Есть вопросы или хотите что-то добавить? Просто ответьте "
                    "на это сообщение."
                ),
            ),
        )
        log.info(
            "applicant_ack",
            channel=delivery.channel.value,
            delivered=delivery.delivered,
            reason=delivery.reason,
        )
    except Exception as exc:
        log.warning("applicant_ack_failed", error=str(exc))


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
