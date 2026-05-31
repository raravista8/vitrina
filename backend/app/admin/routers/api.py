"""JSON admin API (PR-E ... PR-I).

Sibling to the existing Jinja2 admin routes — same auth (signed cookie
in Redis-backed AdminSessionStore), same data model, but speaks JSON
so the Next.js admin (PR-F+) can consume it. The Jinja routes are kept
intact for now; both surfaces share the same session, so a founder
logged-in via Jinja keeps their session in the Next.js shell too.

Routes (mounted under ``/admin/api``):

  POST   /login                       — step 1: password → challenge_id
  POST   /login/totp                  — step 2: challenge_id + TOTP → cookie
  POST   /login/backup                — step 2 alt: challenge_id + backup code
  POST   /logout                      — clears cookie + invalidates session
  GET    /me                          — current admin (auth-gate health-check)

  GET    /dashboard                   — metrics (apps/leads/sites by status)
  GET    /apps                        — paginated applications list (PR-G)
  GET    /apps/{id}                   — application detail (PR-G)
  POST   /apps/{id}/approve           — mark approved (PR-G)
  POST   /apps/{id}/reject            — mark rejected (PR-G)

  GET    /sites                       — paginated sites list (PR-H)
  GET    /sites/{id}                  — site detail (PR-H)
  GET    /leads                       — paginated masked leads (PR-H)
  POST   /leads/decrypt-bulk          — TOTP-gated bulk decrypt (PR-H)

  GET    /waitlist                    — source aggregation (PR-I)
  GET    /feedback                    — paginated feedback inbox (PR-I)
  GET    /settings                    — admin-visible settings snapshot (PR-I)

Every route except the three /login* + /logout requires
``require_admin``. Response envelope per CLAUDE.md §Conventions:
``{"ok": true, "data": {...}}`` or ``{"ok": false, "error": "<code>"}``.

Anti-enumeration: invalid login returns ``invalid_credentials`` for
both wrong-username and wrong-password; expired challenge returns
``invalid_challenge`` so timing attacks can't differentiate.
"""

from __future__ import annotations

import uuid
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Annotated, Any, Final, Literal

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    admin_login_rate_limiter,
    get_admin_session_store,
    get_client_ip,
    get_lead_fernet,
    get_login_challenge_store,
    get_session,
    require_admin,
)
from app.core.auth.admin import (
    find_and_consume_backup_code,
    verify_password,
    verify_totp,
)
from app.core.auth.login_challenge import LoginChallengeStore
from app.core.auth.sessions import (
    ADMIN_SESSION_TTL_SECONDS,
    AdminSession,
    AdminSessionStore,
)
from app.core.feedback.service import get_tally
from app.core.leads.encryption import LeadDecryptionError
from app.core.leads.encryption import decrypt as decrypt_lead_field
from app.core.leads.encryption import decrypt as fernet_decrypt
from app.infrastructure.postgres.models import (
    CHANGE_REQUEST_STATUSES,
    AdminCredentials,
    Application,
    ApplicationPhoto,
    ApplicationTextFile,
    ChangeRequest,
    Consent,
    Feedback,
    FeedbackSubmission,
    FeedbackVote,
    Lead,
    Site,
    User,
)
from app.utils.logging import get_logger

router = APIRouter(prefix="/admin/api", tags=["admin-api"])

ADMIN_SESSION_COOKIE = "admin_session"


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------


def _envelope_ok(data: Any) -> dict[str, Any]:
    return {"ok": True, "data": data}


def _issue_admin_session_cookie(
    *, response: Response, request: Request, store: AdminSessionStore, session_id: str
) -> None:
    """Set the signed ``admin_session`` cookie on the response.

    ``Path=/`` so the Next.js admin (under ``/admin/*``) AND the JSON API
    (``/admin/api/*``) both receive the cookie — the same browser treats them
    as one origin in dev (Next dev proxies ``/admin`` → backend) and prod
    (Caddy reverse-proxies both surfaces). Shared by the password-only login
    branch and the post-2FA branch so both issue an identical cookie.
    """
    response.set_cookie(
        key=ADMIN_SESSION_COOKIE,
        value=store.sign_cookie(session_id),
        max_age=ADMIN_SESSION_TTL_SECONDS,
        httponly=True,
        secure=request.url.scheme == "https",
        samesite="strict",
        path="/",
    )


class _LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=256)


class _LoginTotpRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    challenge_id: str = Field(min_length=16, max_length=128)
    code: str = Field(min_length=6, max_length=8)


# ---------------------------------------------------------------------------
# Login — 2 steps
# ---------------------------------------------------------------------------


@router.post("/login", status_code=200)
async def admin_api_login(
    body: _LoginRequest,
    request: Request,
    response: Response,
    session: Annotated[AsyncSession, Depends(get_session)],
    challenges: Annotated[LoginChallengeStore, Depends(get_login_challenge_store)],
    store: Annotated[AdminSessionStore, Depends(get_admin_session_store)],
    _ratelimit: Annotated[None, Depends(admin_login_rate_limiter)],
) -> dict[str, Any]:
    """Step 1: username + password.

    On invalid credentials returns 401 with code ``invalid_credentials``
    — identical message for unknown-username and bad-password so
    timing-based enumeration is harder. Rate limit shared with the
    Jinja /admin/login route: 5/15min per IP, then 1h block.

    Two outcomes depending on ``ADMIN_2FA_REQUIRED``:

      - **true (default)** → mint a 5-minute challenge and return
        ``{"challenge_id", "expires_in"}``; the client must complete step 2
        (``/login/totp`` or ``/login/backup``).
      - **false** → password alone authenticates: set the ``admin_session``
        cookie here and return ``{"authenticated": true}`` (no challenge_id),
        so the client skips step 2. The TOTP secret + backup codes stay in
        the DB untouched — flipping the flag back restores the 2-step flow
        with zero code change.
    """
    from app.config import get_settings

    log = get_logger("admin.api.login")
    ip = get_client_ip(request)

    creds = (
        await session.execute(
            select(AdminCredentials).where(AdminCredentials.username == body.username)
        )
    ).scalar_one_or_none()

    if creds is None or not verify_password(body.password, creds.password_hash):
        log.info("admin_login_step1_failed", ip=ip, reason="invalid_credentials")
        raise HTTPException(status_code=401, detail="invalid_credentials")

    if not get_settings().admin_2fa_required:
        creds.last_login_at = datetime.now(UTC)
        record = await store.create(creds.id)
        await session.commit()
        _issue_admin_session_cookie(
            response=response, request=request, store=store, session_id=record.session_id
        )
        log.info("admin_login_success", ip=ip, admin_id=str(creds.id), method="password_only")
        return _envelope_ok({"authenticated": True})

    challenge_id, ttl = await challenges.mint(creds.id)
    log.info("admin_login_step1_ok", ip=ip, admin_id=str(creds.id))
    return _envelope_ok({"challenge_id": challenge_id, "expires_in": ttl})


@router.post("/login/totp", status_code=200)
async def admin_api_login_totp(
    body: _LoginTotpRequest,
    request: Request,
    response: Response,
    session: Annotated[AsyncSession, Depends(get_session)],
    challenges: Annotated[LoginChallengeStore, Depends(get_login_challenge_store)],
    store: Annotated[AdminSessionStore, Depends(get_admin_session_store)],
) -> dict[str, Any]:
    """Step 2 (primary): consume challenge + TOTP → set admin_session cookie."""
    return await _consume_challenge_with_code(
        kind="totp",
        body=body,
        request=request,
        response=response,
        session=session,
        challenges=challenges,
        store=store,
    )


@router.post("/login/backup", status_code=200)
async def admin_api_login_backup(
    body: _LoginTotpRequest,
    request: Request,
    response: Response,
    session: Annotated[AsyncSession, Depends(get_session)],
    challenges: Annotated[LoginChallengeStore, Depends(get_login_challenge_store)],
    store: Annotated[AdminSessionStore, Depends(get_admin_session_store)],
) -> dict[str, Any]:
    """Step 2 (alt): consume challenge + backup code → set cookie.

    Backup codes are single-use; the matched code is removed from
    ``admin_credentials.backup_codes_hashes`` on success.
    """
    return await _consume_challenge_with_code(
        kind="backup",
        body=body,
        request=request,
        response=response,
        session=session,
        challenges=challenges,
        store=store,
    )


async def _consume_challenge_with_code(
    *,
    kind: Literal["totp", "backup"],
    body: _LoginTotpRequest,
    request: Request,
    response: Response,
    session: AsyncSession,
    challenges: LoginChallengeStore,
    store: AdminSessionStore,
) -> dict[str, Any]:
    log = get_logger("admin.api.login")
    ip = get_client_ip(request)

    admin_id = await challenges.consume(body.challenge_id)
    if admin_id is None:
        log.info("admin_login_step2_failed", ip=ip, reason="invalid_challenge")
        raise HTTPException(status_code=401, detail="invalid_challenge")

    creds = (
        await session.execute(select(AdminCredentials).where(AdminCredentials.id == admin_id))
    ).scalar_one_or_none()
    if creds is None:
        log.info("admin_login_step2_failed", ip=ip, reason="admin_not_found")
        raise HTTPException(status_code=401, detail="invalid_challenge")

    if kind == "totp":
        if not verify_totp(creds.totp_secret, body.code):
            log.info("admin_login_step2_failed", ip=ip, reason="invalid_totp")
            raise HTTPException(status_code=401, detail="invalid_code")
    else:
        matched, remaining = find_and_consume_backup_code(body.code, creds.backup_codes_hashes)
        if not matched:
            log.info("admin_login_step2_failed", ip=ip, reason="invalid_backup")
            raise HTTPException(status_code=401, detail="invalid_code")
        creds.backup_codes_hashes = remaining

    creds.last_login_at = datetime.now(UTC)
    record = await store.create(creds.id)
    await session.commit()
    log.info("admin_login_success", ip=ip, admin_id=str(record.admin_id), method=kind)

    _issue_admin_session_cookie(
        response=response, request=request, store=store, session_id=record.session_id
    )
    return _envelope_ok({"backup_codes_remaining": len(creds.backup_codes_hashes)})


@router.post("/logout", status_code=200)
async def admin_api_logout(
    request: Request,
    response: Response,
    store: Annotated[AdminSessionStore, Depends(get_admin_session_store)],
) -> dict[str, Any]:
    raw = request.cookies.get(ADMIN_SESSION_COOKIE)
    if raw is not None:
        session_id = store.unsign_cookie(raw)
        if session_id is not None:
            await store.delete(session_id)
    response.delete_cookie(ADMIN_SESSION_COOKIE, path="/")
    return _envelope_ok({"logged_out": True})


@router.get("/me", status_code=200)
async def admin_api_me(
    admin: Annotated[AdminSession, Depends(require_admin)],
) -> dict[str, Any]:
    """Auth-gate health-check used by Next.js layout to decide whether
    to render the admin chrome or redirect to /admin/login."""
    return _envelope_ok(
        {
            "admin_id": str(admin.admin_id),
            "session_id_prefix": admin.session_id[:8],
            "created_at": admin.created_at.isoformat(),
            "last_seen_at": admin.last_seen_at.isoformat(),
        }
    )


# ---------------------------------------------------------------------------
# Dashboard (PR-G)
# ---------------------------------------------------------------------------


@router.get("/dashboard", status_code=200)
async def admin_api_dashboard(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Counters + 14-day funnel time-series.

    Cheap aggregate queries — no admin's dashboard load should cost
    more than a single round-trip per metric. Tests should mock the
    session, not hit Redis-cached counters.
    """
    apps_total = (await session.execute(select(func.count()).select_from(Application))).scalar_one()
    apps_pending = (
        await session.execute(
            select(func.count()).select_from(Application).where(Application.status == "pending")
        )
    ).scalar_one()
    sites_published = (
        await session.execute(
            select(func.count()).select_from(Site).where(Site.status == "published")
        )
    ).scalar_one()
    leads_total = (await session.execute(select(func.count()).select_from(Lead))).scalar_one()
    feedback_total = (
        await session.execute(select(func.count()).select_from(Feedback))
    ).scalar_one()

    # Past-14-day applications-per-day series for the dashboard chart.
    cutoff = datetime.now(UTC) - timedelta(days=14)
    rows = (
        await session.execute(
            select(
                func.date_trunc("day", Application.created_at).label("day"),
                func.count().label("count"),
            )
            .where(Application.created_at >= cutoff)
            .group_by("day")
            .order_by("day")
        )
    ).all()
    series = [
        {"day": (r.day if isinstance(r.day, str) else r.day.date().isoformat()), "count": r.count}
        for r in rows
    ]

    return _envelope_ok(
        {
            "counters": {
                "apps_total": apps_total,
                "apps_pending": apps_pending,
                "sites_published": sites_published,
                "leads_total": leads_total,
                "feedback_total": feedback_total,
            },
            "applications_series_14d": series,
        }
    )


# ---------------------------------------------------------------------------
# Applications list + detail + actions (PR-G)
# ---------------------------------------------------------------------------


@router.get("/apps", status_code=200)
async def admin_api_apps_list(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    status: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> dict[str, Any]:
    limit = max(1, min(limit, 200))
    offset = max(0, offset)
    stmt = select(Application).order_by(Application.created_at.desc())
    if status:
        stmt = stmt.where(Application.status == status)
    rows = (await session.execute(stmt.limit(limit).offset(offset))).scalars().all()
    total = (
        await session.execute(
            select(func.count()).select_from(Application)
            if status is None
            else select(func.count()).select_from(Application).where(Application.status == status)
        )
    ).scalar_one()
    return _envelope_ok(
        {
            "total": total,
            "items": [_app_row(r) for r in rows],
            "limit": limit,
            "offset": offset,
        }
    )


@router.get("/apps/{application_id}", status_code=200)
async def admin_api_app_detail(
    application_id: uuid.UUID,
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> dict[str, Any]:
    """App Detail — full payload including photos + text-files + decrypted
    customer_contact for photo-mode apps.

    canon 0.3.0: per the brief §1 «customer_contact decryption policy»,
    `customer_contact_value_enc` is decrypted inline (admin session +
    TOTP at login is sufficient — no per-view TOTP re-prompt). The value
    IS PII but is also rendered publicly on the customer-site CTA so it
    has weaker privacy expectations than leads.
    """
    row = (
        await session.execute(select(Application).where(Application.id == application_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="application_not_found")

    user = (
        (await session.execute(select(User).where(User.id == row.user_id))).scalar_one_or_none()
        if row.user_id
        else None
    )
    consent = (
        (
            await session.execute(select(Consent).where(Consent.id == row.consent_id))
        ).scalar_one_or_none()
        if row.consent_id
        else None
    )

    # Photo-mode extras: load photo manifest + text-file manifest + decrypt
    # customer_contact_value.
    photos: list[dict[str, Any]] = []
    text_files: list[dict[str, Any]] = []
    customer_contact_value: str | None = None
    if row.mode == "photo":
        photo_rows = (
            (
                await session.execute(
                    select(ApplicationPhoto)
                    .where(ApplicationPhoto.application_id == row.id)
                    .order_by(ApplicationPhoto.index)
                )
            )
            .scalars()
            .all()
        )
        photos = [
            {
                "id": str(p.id),
                "index": p.index,
                "filename": p.filename,
                "mime": p.mime,
                "size_bytes": p.size_bytes,
                "photo_type": p.photo_type,
                # Download URL via admin file-proxy endpoint (defined below).
                "download_url": f"/admin/api/apps/{row.id}/photos/{p.id}",
            }
            for p in photo_rows
        ]

        text_rows = (
            (
                await session.execute(
                    select(ApplicationTextFile)
                    .where(ApplicationTextFile.application_id == row.id)
                    .order_by(ApplicationTextFile.index)
                )
            )
            .scalars()
            .all()
        )
        text_files = [
            {
                "id": str(t.id),
                "index": t.index,
                "filename": t.filename,
                "mime": t.mime,
                "size_bytes": t.size_bytes,
                "download_url": f"/admin/api/apps/{row.id}/text-files/{t.id}",
            }
            for t in text_rows
        ]

        if row.customer_contact_value_enc:
            try:
                customer_contact_value = fernet_decrypt(
                    row.customer_contact_value_enc,
                    fernet=fernet,
                )
            except LeadDecryptionError:
                customer_contact_value = "[decryption_failed]"

    return _envelope_ok(
        {
            "application": _app_row(row),
            "photo_details": (
                {
                    "description": row.description,
                    "city": row.city,
                    "customer_contact_type": row.customer_contact_type,
                    "customer_contact_value": customer_contact_value,
                    "photos": photos,
                    "text_files": text_files,
                }
                if row.mode == "photo"
                else None
            ),
            "user": _user_row(user) if user else None,
            "consent": _consent_row(consent) if consent else None,
        }
    )


# ---------------------------------------------------------------------------
# Admin file-proxy — stream photos + text files from UPLOADS_DIR to admin UI
# ---------------------------------------------------------------------------


@router.get("/apps/{application_id}/photos/{photo_id}", status_code=200)
async def admin_api_app_photo(
    application_id: uuid.UUID,
    photo_id: uuid.UUID,
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> FileResponse:
    """Stream a photo file from UPLOADS_DIR to the admin UI.

    Admin-session-gated. Returns 404 for unknown IDs without revealing
    whether they exist on disk vs in DB (consistent 404 surface).
    """
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
    path = Path(photo.disk_path)
    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail="photo_disk_missing")
    return FileResponse(
        path=str(path),
        media_type=photo.mime,
        filename=photo.filename,
    )


@router.get(
    "/apps/{application_id}/text-files/{text_file_id}",
    status_code=200,
)
async def admin_api_app_text_file(
    application_id: uuid.UUID,
    text_file_id: uuid.UUID,
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> FileResponse:
    """Stream a text file (PDF / DOCX / TXT / RTF) from UPLOADS_DIR."""
    tf = (
        await session.execute(
            select(ApplicationTextFile).where(
                ApplicationTextFile.id == text_file_id,
                ApplicationTextFile.application_id == application_id,
            )
        )
    ).scalar_one_or_none()
    if tf is None:
        raise HTTPException(status_code=404, detail="text_file_not_found")
    path = Path(tf.disk_path)
    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail="text_file_disk_missing")
    return FileResponse(
        path=str(path),
        media_type=tf.mime,
        filename=tf.filename,
    )


@router.post("/apps/{application_id}/approve", status_code=200)
async def admin_api_app_approve(
    application_id: uuid.UUID,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    return await _advance_application(application_id, "approved", admin, session)


@router.post("/apps/{application_id}/reject", status_code=200)
async def admin_api_app_reject(
    application_id: uuid.UUID,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    return await _advance_application(application_id, "rejected", admin, session)


async def _advance_application(
    application_id: uuid.UUID,
    new_status: Literal["approved", "rejected"],
    admin: AdminSession,
    session: AsyncSession,
) -> dict[str, Any]:
    log = get_logger("admin.api.apps")
    row = (
        await session.execute(select(Application).where(Application.id == application_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="application_not_found")
    if row.status not in {"pending", new_status}:
        raise HTTPException(status_code=409, detail=f"cannot_transition_from_{row.status}")
    row.status = new_status
    await session.commit()
    log.info(
        "application_status_advanced",
        admin_id=str(admin.admin_id),
        application_id=str(application_id),
        new_status=new_status,
    )
    return _envelope_ok({"application_id": str(application_id), "status": new_status})


# ---------------------------------------------------------------------------
# Sites list + detail (PR-H)
# ---------------------------------------------------------------------------


@router.get("/sites", status_code=200)
async def admin_api_sites_list(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    status: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> dict[str, Any]:
    limit = max(1, min(limit, 200))
    offset = max(0, offset)
    stmt = select(Site).order_by(Site.created_at.desc())
    if status:
        stmt = stmt.where(Site.status == status)
    rows = (await session.execute(stmt.limit(limit).offset(offset))).scalars().all()
    total = (
        await session.execute(
            select(func.count()).select_from(Site)
            if status is None
            else select(func.count()).select_from(Site).where(Site.status == status)
        )
    ).scalar_one()
    return _envelope_ok(
        {
            "total": total,
            "items": [_site_row(r) for r in rows],
            "limit": limit,
            "offset": offset,
        }
    )


@router.get("/sites/{site_id}", status_code=200)
async def admin_api_site_detail(
    site_id: uuid.UUID,
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    row = (await session.execute(select(Site).where(Site.id == site_id))).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="site_not_found")
    leads_count = (
        await session.execute(select(func.count()).select_from(Lead).where(Lead.site_id == site_id))
    ).scalar_one()
    return _envelope_ok({"site": _site_row(row), "leads_count": leads_count})


# ---------------------------------------------------------------------------
# Site lifecycle actions (PR #129) — pause_sync / resume_sync / archive / unarchive
#
# Canon's `<SiteDetail>` ships a 6-action toolbar (publish / republish /
# pause_sync / resume_sync / archive / unarchive). publish + republish
# already live on the legacy Jinja route `POST /admin/sites/{id}/publish`;
# the four below close the gap so the founder can manage site state from
# the JSON UI without hitting the Jinja form-handler.
#
# Transition matrix:
#
#   ┌────────────┬───────────────────────────────────┬───────────────────┐
#   │ action     │ allowed from (Site.status)        │ → new status       │
#   ├────────────┼───────────────────────────────────┼───────────────────┤
#   │ pause_sync │ published                          │ sync_paused        │
#   │ resume_sync│ sync_paused                        │ published          │
#   │ archive    │ ANY except archived                │ archived           │
#   │ unarchive  │ archived                           │ published          │
#   └────────────┴───────────────────────────────────┴───────────────────┘
#
# unarchive → published (not back to «whatever was before») because we
# don't track the prior status, and `published` is the most useful
# default — founder can always pause/archive again if needed.
# ---------------------------------------------------------------------------


_SITE_ACTION_TRANSITIONS: dict[str, tuple[set[str], str]] = {
    # action_name → (allowed_from_set, new_status). Empty allowed_from set
    # means «any status except the new one» (used for archive).
    "pause_sync": ({"published"}, "sync_paused"),
    "resume_sync": ({"sync_paused"}, "published"),
    "archive": (set(), "archived"),
    "unarchive": ({"archived"}, "published"),
}


async def _advance_site_status(
    site_id: uuid.UUID,
    action: str,
    admin: AdminSession,
    session: AsyncSession,
) -> dict[str, Any]:
    """Apply a single site lifecycle action with transition validation.

    Returns the envelope `{site_id, status, action}` on success. Raises
    HTTPException 404 if the site doesn't exist, 409 if the requested
    action is not legal from the site's current status.
    """
    log = get_logger("admin.api.sites")
    transition = _SITE_ACTION_TRANSITIONS[action]
    allowed_from, new_status = transition

    row = (await session.execute(select(Site).where(Site.id == site_id))).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="site_not_found")

    # archive is "any → archived" but never «archived → archived» (no-op).
    if not allowed_from:
        if row.status == new_status:
            raise HTTPException(status_code=409, detail=f"already_{new_status}")
    else:
        if row.status not in allowed_from:
            raise HTTPException(
                status_code=409,
                detail=f"cannot_{action}_from_{row.status}",
            )

    row.status = new_status
    await session.commit()
    log.info(
        "site_status_advanced",
        admin_id=str(admin.admin_id),
        site_id=str(site_id),
        action=action,
        new_status=new_status,
    )
    return _envelope_ok({"site_id": str(site_id), "status": new_status, "action": action})


@router.post("/sites/{site_id}/pause_sync", status_code=200)
async def admin_api_site_pause_sync(
    site_id: uuid.UUID,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    return await _advance_site_status(site_id, "pause_sync", admin, session)


@router.post("/sites/{site_id}/resume_sync", status_code=200)
async def admin_api_site_resume_sync(
    site_id: uuid.UUID,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    return await _advance_site_status(site_id, "resume_sync", admin, session)


@router.post("/sites/{site_id}/archive", status_code=200)
async def admin_api_site_archive(
    site_id: uuid.UUID,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    return await _advance_site_status(site_id, "archive", admin, session)


@router.post("/sites/{site_id}/unarchive", status_code=200)
async def admin_api_site_unarchive(
    site_id: uuid.UUID,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    return await _advance_site_status(site_id, "unarchive", admin, session)


# ---------------------------------------------------------------------------
# Leads list + bulk decrypt (PR-H)
# ---------------------------------------------------------------------------


class _LeadsDecryptRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    lead_ids: list[uuid.UUID] = Field(min_length=1, max_length=50)
    totp_code: str = Field(min_length=6, max_length=8)


@router.get("/leads", status_code=200)
async def admin_api_leads_list(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    site_id: uuid.UUID | None = None,
    limit: int = 50,
    offset: int = 0,
) -> dict[str, Any]:
    limit = max(1, min(limit, 200))
    offset = max(0, offset)
    stmt = select(Lead).order_by(Lead.created_at.desc())
    if site_id is not None:
        stmt = stmt.where(Lead.site_id == site_id)
    rows = (await session.execute(stmt.limit(limit).offset(offset))).scalars().all()
    total = (
        await session.execute(
            select(func.count()).select_from(Lead)
            if site_id is None
            else select(func.count()).select_from(Lead).where(Lead.site_id == site_id)
        )
    ).scalar_one()
    # PII fields are never returned in masked form on this list — only
    # status + timestamps + ip prefix. The decrypt endpoint below is the
    # only path that ever produces plaintext, gated by a fresh TOTP.
    return _envelope_ok(
        {
            "total": total,
            "items": [_lead_row_masked(r) for r in rows],
            "limit": limit,
            "offset": offset,
        }
    )


@router.post("/leads/decrypt-bulk", status_code=200)
async def admin_api_leads_decrypt_bulk(
    body: _LeadsDecryptRequest,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    request: Request,
) -> dict[str, Any]:
    """Re-prompt for TOTP before producing plaintext PII for ≤50 leads.

    SECURITY.md §A07 + §B7: every decrypt-batch is audited (
    `lead_decrypted` event per id) and gated by a fresh code. The TOTP
    is checked against the *current* admin's credentials, so a stolen
    session cookie without the TOTP device cannot decrypt.
    """
    log = get_logger("admin.api.leads")
    creds = (
        await session.execute(select(AdminCredentials).where(AdminCredentials.id == admin.admin_id))
    ).scalar_one_or_none()
    if creds is None or not verify_totp(creds.totp_secret, body.totp_code):
        log.info("lead_decrypt_rejected", reason="invalid_totp", admin_id=str(admin.admin_id))
        raise HTTPException(status_code=401, detail="invalid_totp")

    fernet: MultiFernet = request.app.state.lead_fernet

    rows = (await session.execute(select(Lead).where(Lead.id.in_(body.lead_ids)))).scalars().all()
    if not rows:
        raise HTTPException(status_code=404, detail="no_leads_found")

    def _safe_decrypt(blob: bytes | None) -> str | None:
        if blob is None:
            return None
        try:
            return decrypt_lead_field(blob, fernet=fernet)
        except LeadDecryptionError:
            return "[decryption_failed]"

    decrypted: list[dict[str, Any]] = []
    for row in rows:
        name = _safe_decrypt(row.name_enc)
        phone = _safe_decrypt(row.phone_enc)
        message = _safe_decrypt(row.message_enc)
        decrypted.append(
            {
                "id": str(row.id),
                "site_id": str(row.site_id),
                "name": name,
                "phone": phone,
                "message": message,
                "status": row.status,
                "created_at": row.created_at.isoformat(),
            }
        )
        log.info(
            "lead_decrypted",
            admin_id=str(admin.admin_id),
            lead_id=str(row.id),
            site_id=str(row.site_id),
        )

    return _envelope_ok({"leads": decrypted, "count": len(decrypted)})


# ---------------------------------------------------------------------------
# Waitlist + Feedback + Settings (PR-I)
# ---------------------------------------------------------------------------


@router.get("/waitlist", status_code=200)
async def admin_api_waitlist(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Aggregate `feedback.source_name` counts (FR-092). Rows with ≥10
    distinct emails are flagged ``ready=true`` so the founder sees
    what's actionable at a glance.

    Rows where the source has been marked «in development» (by
    `POST /admin/api/waitlist/{source}/mark-in-development`) are filtered
    out of the aggregation — they're soft-archived but kept in the
    feedback table for audit.
    """
    rows = (
        await session.execute(
            select(
                Feedback.source_name.label("source_name"),
                func.count(func.distinct(Feedback.email)).label("votes"),
                func.min(Feedback.created_at).label("first_seen"),
                func.max(Feedback.created_at).label("last_seen"),
            )
            .where(Feedback.type == "source_request")
            .where(Feedback.source_name.is_not(None))
            .where(Feedback.marked_in_development_at.is_(None))
            .group_by(Feedback.source_name)
            .order_by(func.count(func.distinct(Feedback.email)).desc())
        )
    ).all()
    items = [
        {
            "source_name": r.source_name,
            "votes": r.votes,
            "first_seen": r.first_seen.isoformat() if r.first_seen else None,
            "last_seen": r.last_seen.isoformat() if r.last_seen else None,
            "ready": r.votes >= 10,
        }
        for r in rows
    ]
    return _envelope_ok({"items": items, "threshold": 10})


@router.get("/feedback/votes", status_code=200)
async def admin_api_feedback_votes(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Roll up canon-0.9.0 modal votes by `option_key` (ADR-0009 rev.2 /
    `docs/handoff/FEEDBACK_BACKEND.md` §5).

    Distinct-voter count per key; `ready=true` once it reached the 10-vote
    threshold (the founder was already TG-alerted on crossing). Separate from
    `/waitlist`, which aggregates the legacy `feedback.source_name` rows —
    the vote modal and the old single-row callers feed different tables.
    """
    tally = await get_tally(session)
    items = [
        {"option_key": key, "votes": votes, "ready": votes >= 10}
        for key, votes in sorted(tally.items.items(), key=lambda kv: kv[1], reverse=True)
    ]
    return _envelope_ok({"items": items, "total_week": tally.total_week, "threshold": 10})


@router.post(
    "/waitlist/{source_name}/mark-in-development",
    status_code=200,
)
async def admin_api_waitlist_mark_in_development(
    source_name: str,
    admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Soft-archive every `feedback` row of type='source_request' with
    this `source_name` so the row stops appearing in the waitlist
    aggregation. The underlying rows are kept (audit trail) — only the
    `marked_in_development_at` timestamp is set.

    Idempotent: rows already marked are not re-updated (WHERE clause
    filters NULL). The 404 is for «no votes ever recorded for this
    source» so the founder gets feedback instead of a silent 200.
    """
    log = get_logger("admin.api.waitlist")
    # Path arg `source_name` arrives URL-decoded by FastAPI. Backend's
    # `feedback.source_name` is at most 64 chars (column type String(64));
    # reject anything that wouldn't match for a useful error.
    if not source_name or len(source_name) > 64:
        raise HTTPException(status_code=400, detail="invalid_source_name")

    # Count candidates first so we can return a meaningful response on 0
    # without an UPDATE-with-no-rows being indistinguishable from a real
    # idempotent re-call.
    pending_count = (
        await session.execute(
            select(func.count())
            .select_from(Feedback)
            .where(Feedback.type == "source_request")
            .where(Feedback.source_name == source_name)
            .where(Feedback.marked_in_development_at.is_(None))
        )
    ).scalar_one()
    if pending_count == 0:
        # Either no votes ever (404), or all already marked (200 idempotent).
        any_count = (
            await session.execute(
                select(func.count())
                .select_from(Feedback)
                .where(Feedback.type == "source_request")
                .where(Feedback.source_name == source_name)
            )
        ).scalar_one()
        if any_count == 0:
            raise HTTPException(status_code=404, detail="source_not_found")
        # All already marked — return idempotently with marked=0 so the
        # client can show a sensible toast.
        return _envelope_ok({"source_name": source_name, "marked": 0, "idempotent": True})

    now = datetime.now(UTC)
    # Bulk update without going through ORM-state per row. `pending_count`
    # already captured the exact row count above, so we use it instead of
    # `result.rowcount` (typed as Result[Any].rowcount which mypy strict
    # doesn't allow — same pattern as `core/erasure/service.py`).
    await session.execute(
        update(Feedback)
        .where(Feedback.type == "source_request")
        .where(Feedback.source_name == source_name)
        .where(Feedback.marked_in_development_at.is_(None))
        .values(marked_in_development_at=now)
    )
    await session.commit()
    log.info(
        "waitlist_marked_in_development",
        admin_id=str(admin.admin_id),
        source_name=source_name,
        marked=pending_count,
    )
    return _envelope_ok({"source_name": source_name, "marked": pending_count, "idempotent": False})


@router.get("/feedback", status_code=200)
async def admin_api_feedback_list(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    type_filter: str | None = None,
    q: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> dict[str, Any]:
    limit = max(1, min(limit, 200))
    offset = max(0, offset)
    # Two stores feed the inbox: the legacy `feedback` table (old single-row
    # callers + own_source/own_feature free-text) AND `feedback_submission`
    # (the 0.9.x vote-modal — the live entry point). Fetch the newest `window`
    # from each, merge by created_at, then page in Python. Volumes are tiny
    # (pre-launch micro-SaaS); the per-source `window` cap keeps it bounded.
    window = offset + limit
    pattern = f"%{q}%" if q else None

    # ── legacy feedback ──────────────────────────────────────────────────
    fstmt = select(Feedback).order_by(Feedback.created_at.desc())
    if type_filter:
        fstmt = fstmt.where(Feedback.type == type_filter)
    if pattern is not None:
        fstmt = fstmt.where(
            or_(
                Feedback.message.ilike(pattern),
                Feedback.source_name.ilike(pattern),
                Feedback.email.ilike(pattern),
            )
        )
    legacy = (await session.execute(fstmt.limit(window))).scalars().all()

    # ── 0.9.x modal submissions — shown under «all» + «general» (their
    #    source/feature votes render inside the row's checkboxes block) ─────
    submissions: list[FeedbackSubmission] = []
    votes_by_sub: dict[uuid.UUID, list[tuple[str, str]]] = {}
    if type_filter in (None, "general"):
        sstmt = select(FeedbackSubmission).order_by(FeedbackSubmission.created_at.desc())
        if pattern is not None:
            sstmt = sstmt.where(
                or_(
                    FeedbackSubmission.message.ilike(pattern),
                    FeedbackSubmission.name.ilike(pattern),
                )
            )
        submissions = list((await session.execute(sstmt.limit(window))).scalars().all())
        sub_ids = [s.id for s in submissions]
        if sub_ids:
            vrows = (
                await session.execute(
                    select(
                        FeedbackVote.submission_id,
                        FeedbackVote.kind,
                        FeedbackVote.option_key,
                    )
                    .where(FeedbackVote.submission_id.in_(sub_ids))
                    .order_by(FeedbackVote.created_at)
                )
            ).all()
            for sid, kind, key in vrows:
                votes_by_sub.setdefault(sid, []).append((kind, key))

    # ── merge by created_at desc, page in Python ─────────────────────────
    merged: list[tuple[datetime, dict[str, Any]]] = [
        (r.created_at, _feedback_row(r)) for r in legacy
    ] + [(s.created_at, _submission_inbox_row(s, votes_by_sub.get(s.id, []))) for s in submissions]
    merged.sort(key=lambda t: t[0], reverse=True)
    page = [row for _, row in merged[offset : offset + limit]]

    legacy_total = (await session.execute(select(func.count()).select_from(Feedback))).scalar_one()
    sub_total = (
        await session.execute(select(func.count()).select_from(FeedbackSubmission))
    ).scalar_one()
    return _envelope_ok(
        {
            "total": legacy_total + sub_total,
            "items": page,
            "limit": limit,
            "offset": offset,
        }
    )


@router.get("/settings", status_code=200)
async def admin_api_settings(
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> dict[str, Any]:
    """Read-only settings snapshot for the Settings screen.

    SECURITY.md §A02 / §B7: we never echo secrets. Booleans only —
    ``set`` indicators tell the founder which env-vars are populated
    without revealing the values.
    """
    from app.config import get_settings

    s = get_settings()
    return _envelope_ok(
        {
            "environment": s.environment.value,
            "log_level": s.log_level.value,
            "app_base_url": s.app_base_url,
            "landing_base_url": s.landing_base_url,
            "sites_base_domain": s.sites_base_domain,
            "feature_max_bot": s.feature_max_bot,
            "feature_auto_sync": s.feature_auto_sync,
            "captcha_configured": bool(s.yandex_smartcaptcha_server_key),
            "tg_bot_configured": bool(s.tg_bot_token),
            "yandexgpt_configured": bool(s.yandexgpt_api_key),
            "yookassa_configured": bool(s.yookassa_shop_id and s.yookassa_secret_key),
            "s3_configured": bool(s.s3_bucket and s.s3_access_key),
            "fernet_keys_configured": bool(s.fernet_keys),
        }
    )


# ---------------------------------------------------------------------------
# Row serialisers — keep envelope shape stable for the Next.js UI
# ---------------------------------------------------------------------------


def _app_row(row: Application) -> dict[str, Any]:
    """Application row for /apps list — mode + base fields. Photo-branch
    details (description, photos, text files) only loaded in /apps/{id}.

    canon 0.3.0: `mode` discriminates link vs photo branches.
    """
    return {
        "id": str(row.id),
        "mode": row.mode,
        "source_type": row.source_type,
        "source_url": row.source_url,
        # Photo-branch summary fields (NULL on link mode)
        "city": row.city,
        "description_preview": (row.description[:140] + "…")
        if row.description and len(row.description) > 140
        else row.description,
        "contact_type": row.contact_type,
        "contact_value_masked": _mask_contact_value(row.contact_value, row.contact_type),
        "status": row.status,
        "rejection_reason": row.rejection_reason,
        "is_manual_review": row.is_manual_review,
        "user_id": str(row.user_id) if row.user_id else None,
        "created_at": row.created_at.isoformat() if row.created_at else None,
    }


def _site_row(row: Site) -> dict[str, Any]:
    return {
        "id": str(row.id),
        "user_id": str(row.user_id),
        "subdomain": row.subdomain,
        "custom_domain": row.custom_domain,
        "source_type": row.source_type,
        "source_url": row.source_url,
        "status": row.status,
        "last_synced_at": row.last_synced_at.isoformat() if row.last_synced_at else None,
        "published_at": row.published_at.isoformat() if row.published_at else None,
        "created_at": row.created_at.isoformat() if row.created_at else None,
    }


def _lead_row_masked(row: Lead) -> dict[str, Any]:
    return {
        "id": str(row.id),
        "site_id": str(row.site_id),
        "status": row.status,
        "ip_prefix": _ip_prefix(row.ip),
        "created_at": row.created_at.isoformat() if row.created_at else None,
    }


# Human RU labels for vote option_keys, mirrored from canon FB_SOURCES /
# FB_FEATURES (@samosite/canon/customer — canon doesn't export them; keep in
# sync if canon adds/renames options). @todo canon-gap: export key→label map.
_VOTE_LABELS: Final[dict[str, str]] = {
    "source:vk": "ВКонтакте",
    "source:ozon": "Ozon-витрина",
    "source:youtube": "YouTube / Shorts",
    "source:dzen": "Дзен",
    "source:max": "MAX-канал",
    "feature:yclients": "YCLIENTS интеграция",
    "feature:amocrm": "amoCRM интеграция",
    "feature:custom_domain": "Свой домен",
    "feature:no_watermark": "Убрать «Сделано на Самосайте»",
    "feature:multilang": "Несколько языков",
    "feature:payments": "Онлайн-оплата",
    "feature:blog": "Блог-CMS",
    "feature:stats": "Статистика посетителей",
}


def _feedback_row(row: Feedback) -> dict[str, Any]:
    return {
        "id": str(row.id),
        "type": row.type,
        "source_name": row.source_name,
        # Full contact (not masked): feedback contact is the follow-up address
        # the visitor gave so the founder can REPLY. Founder-only inbox behind
        # admin auth. Distinct from end-customer leads (Fernet-encrypted +
        # TOTP-gated decrypt) — those stay masked.
        "email_or_contact_masked": row.email,
        "message": row.message,
        "checkboxes": row.checkboxes,
        "created_at": row.created_at.isoformat() if row.created_at else None,
    }


def _submission_inbox_row(sub: FeedbackSubmission, votes: list[tuple[str, str]]) -> dict[str, Any]:
    """Map a 0.9.x vote-modal submission into the canon `S18_FeedbackInbox`
    row shape (``type='general'``). The picked options render as a readable
    list in the prominent «Сообщение» field (canon's <p> collapses newlines,
    so we join inline) — NOT the raw `checkboxes` JSON dump (left empty so the
    inbox skips that block). ``contact`` is shown IN FULL so the founder can
    reply (same rationale as `_feedback_row`)."""
    labels = [_VOTE_LABELS.get(f"{kind}:{key}", key) for kind, key in votes]
    name = (sub.name or "").strip()
    comment = (sub.message or "").strip()
    segments: list[str] = []
    if name and comment:
        segments.append(f"{name}: {comment}")
    elif comment:
        segments.append(comment)
    elif name:
        segments.append(name)
    if labels:
        segments.append("Голоса: " + ", ".join(labels))
    return {
        "id": str(sub.id),
        "type": "general",
        "source_name": None,
        "email_or_contact_masked": sub.contact or None,
        "message": " · ".join(segments) or None,
        "checkboxes": {},
        "created_at": sub.created_at.isoformat() if sub.created_at else None,
    }


def _user_row(user: User) -> dict[str, Any]:
    return {
        "id": str(user.id),
        "contact_type": user.contact_type,
        "contact_value_masked": _mask_contact_value(user.contact_value, user.contact_type),
        "plan": user.plan,
        "plan_until": user.plan_until.isoformat() if user.plan_until else None,
    }


def _consent_row(consent: Consent) -> dict[str, Any]:
    return {
        "id": str(consent.id),
        "policy_version": consent.policy_version,
        "created_at": consent.created_at.isoformat() if consent.created_at else None,
    }


# ---------------------------------------------------------------------------
# PII masking — never log or render raw values without a fresh TOTP
# ---------------------------------------------------------------------------


def _mask_contact_value(value: str, contact_type: str) -> str:
    if contact_type == "email":
        local, _, domain = value.partition("@")
        return f"{local[:1]}***@{domain}" if local else "***"
    if contact_type == "phone":
        return f"+7***{value[-4:]}" if len(value) >= 4 else "***"
    if value.startswith("@"):
        body = value[1:]
        return f"@{body[:2]}***{body[-2:]}" if len(body) > 4 else "@***"
    return "***"


def _ip_prefix(ip: str | None) -> str | None:
    if ip is None:
        return None
    parts = ip.split(".")
    if len(parts) == 4:
        return f"{parts[0]}.{parts[1]}.0.0/16"
    # IPv6 — keep first hextet pair.
    return ip.split(":")[0] + "::/32"


# ---------------------------------------------------------------------------
# Change requests (client ЛК «Изменения») — founder inbox + status control
# ---------------------------------------------------------------------------


class _ChangeRequestStatusBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    status: str


@router.get("/change-requests", status_code=200)
async def admin_api_change_requests(
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
    status: str | None = None,
) -> dict[str, Any]:
    """Founder inbox of client edit requests (source=lk_change_request), newest
    first, with the requesting site's subdomain."""
    stmt = (
        select(ChangeRequest, Site.subdomain)
        .join(Site, Site.id == ChangeRequest.site_id)
        .order_by(ChangeRequest.created_at.desc())
    )
    if status:
        stmt = stmt.where(ChangeRequest.status == status)
    rows = (await session.execute(stmt)).all()
    return _envelope_ok(
        {
            "items": [
                {
                    "id": str(cr.id),
                    "site_id": str(cr.site_id),
                    "subdomain": subdomain,
                    "text": cr.text,
                    "status": cr.status,
                    "source": cr.source,
                    "created_at": cr.created_at.isoformat(),
                }
                for cr, subdomain in rows
            ]
        }
    )


@router.post("/change-requests/{cr_id}/status", status_code=200)
async def admin_api_change_request_status(
    cr_id: uuid.UUID,
    body: _ChangeRequestStatusBody,
    _admin: Annotated[AdminSession, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Founder moves a change-request's status; the client sees it in the ЛК."""
    if body.status not in CHANGE_REQUEST_STATUSES:
        raise HTTPException(status_code=400, detail="invalid_status")
    cr = (
        await session.execute(select(ChangeRequest).where(ChangeRequest.id == cr_id))
    ).scalar_one_or_none()
    if cr is None:
        raise HTTPException(status_code=404, detail="change_request_not_found")
    cr.status = body.status
    await session.commit()
    return _envelope_ok({"id": str(cr.id), "status": cr.status})
