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
from typing import Annotated, Any, Literal

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    admin_login_rate_limiter,
    get_admin_session_store,
    get_client_ip,
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
from app.core.leads.encryption import LeadDecryptionError
from app.core.leads.encryption import decrypt as decrypt_lead_field
from app.infrastructure.postgres.models import (
    AdminCredentials,
    Application,
    Consent,
    Feedback,
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
    session: Annotated[AsyncSession, Depends(get_session)],
    challenges: Annotated[LoginChallengeStore, Depends(get_login_challenge_store)],
    _ratelimit: Annotated[None, Depends(admin_login_rate_limiter)],
) -> dict[str, Any]:
    """Step 1: username + password → challenge_id (5min TTL).

    On invalid credentials returns 401 with code ``invalid_credentials``
    — identical message for unknown-username and bad-password so
    timing-based enumeration is harder. Rate limit shared with the
    Jinja /admin/login route: 5/15min per IP, then 1h block.
    """
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

    response.set_cookie(
        key=ADMIN_SESSION_COOKIE,
        value=store.sign_cookie(record.session_id),
        max_age=ADMIN_SESSION_TTL_SECONDS,
        httponly=True,
        secure=request.url.scheme == "https",
        samesite="strict",
        # Path=/ so the Next.js admin (under /admin/*) AND the JSON
        # API (/admin/api/*) both receive the cookie — same browser
        # treats them as one origin in dev (Next dev proxies /admin
        # → backend) and prod (Caddy reverse-proxies both surfaces).
        path="/",
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
) -> dict[str, Any]:
    row = (
        await session.execute(select(Application).where(Application.id == application_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="application_not_found")

    # Resolve user + consent for context. Both are SET-NULL on user delete
    # per SECURITY.md §9.3, so we tolerate `None` here.
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

    return _envelope_ok(
        {
            "application": _app_row(row),
            "user": _user_row(user) if user else None,
            "consent": _consent_row(consent) if consent else None,
        }
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
    what's actionable at a glance."""
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
    stmt = select(Feedback).order_by(Feedback.created_at.desc())
    if type_filter:
        stmt = stmt.where(Feedback.type == type_filter)
    if q:
        pattern = f"%{q}%"
        stmt = stmt.where(
            or_(
                Feedback.message.ilike(pattern),
                Feedback.source_name.ilike(pattern),
                Feedback.email.ilike(pattern),
            )
        )
    rows = (await session.execute(stmt.limit(limit).offset(offset))).scalars().all()
    total = (await session.execute(select(func.count()).select_from(Feedback))).scalar_one()
    return _envelope_ok(
        {
            "total": total,
            "items": [_feedback_row(r) for r in rows],
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
    return {
        "id": str(row.id),
        "source_type": row.source_type,
        "source_url": row.source_url,
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


def _feedback_row(row: Feedback) -> dict[str, Any]:
    return {
        "id": str(row.id),
        "type": row.type,
        "source_name": row.source_name,
        "email_or_contact_masked": _mask_email(row.email),
        "message": row.message,
        "checkboxes": row.checkboxes,
        "created_at": row.created_at.isoformat() if row.created_at else None,
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


def _mask_email(value: str | None) -> str | None:
    if not value:
        return None
    if "@" in value:
        return _mask_contact_value(value, "email")
    return _mask_contact_value(value, "telegram")


def _ip_prefix(ip: str | None) -> str | None:
    if ip is None:
        return None
    parts = ip.split(".")
    if len(parts) == 4:
        return f"{parts[0]}.{parts[1]}.0.0/16"
    # IPv6 — keep first hextet pair.
    return ip.split(":")[0] + "::/32"
