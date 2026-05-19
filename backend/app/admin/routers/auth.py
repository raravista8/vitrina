"""Admin login / logout (T2.1).

GET  /admin/login   — Jinja2 form (one combined username + password + TOTP form)
POST /admin/login   — verify creds, set session cookie, redirect to /admin
POST /admin/logout  — delete session, clear cookie

Failed-login rate limit: 5 attempts per IP per 15 min (SECURITY.md T7.1).
Sessions live in Redis for 4 h (SECURITY.md A07).
"""

from __future__ import annotations

from datetime import UTC
from typing import Annotated, Any

from fastapi import APIRouter, Depends, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin import admin_templates
from app.api.dependencies import (
    admin_login_rate_limiter,
    get_admin_session_store,
    get_client_ip,
    get_session,
)
from app.core.auth.admin import (
    find_and_consume_backup_code,
    verify_password,
    verify_totp,
)
from app.core.auth.sessions import (
    ADMIN_SESSION_TTL_SECONDS,
    AdminSessionStore,
)
from app.infrastructure.postgres.models import AdminCredentials
from app.utils.logging import get_logger

router = APIRouter(prefix="/admin", tags=["admin-auth"])

ADMIN_SESSION_COOKIE = "admin_session"


@router.get("/login", response_class=HTMLResponse, include_in_schema=False)
async def admin_login_form(request: Request) -> HTMLResponse:
    return admin_templates.TemplateResponse(
        request,
        "login.html",
        {"error": request.query_params.get("error")},
    )


@router.post("/login", response_class=Response, include_in_schema=False)
async def admin_login_submit(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    store: Annotated[AdminSessionStore, Depends(get_admin_session_store)],
    _ratelimit: Annotated[None, Depends(admin_login_rate_limiter)],
    username: Annotated[str, Form(min_length=1, max_length=64)],
    password: Annotated[str, Form(min_length=1, max_length=256)],
    totp: Annotated[str, Form(min_length=6, max_length=8)],
) -> Response:
    log = get_logger("admin.auth")
    ip = get_client_ip(request)

    creds = (
        await session.execute(select(AdminCredentials).where(AdminCredentials.username == username))
    ).scalar_one_or_none()

    if creds is None or not verify_password(password, creds.password_hash):
        log.info("admin_login_failed", ip=ip, reason="invalid_credentials")
        return _redirect_to_login("invalid_credentials")

    # Accept either TOTP or backup code.
    if verify_totp(creds.totp_secret, totp):
        pass
    else:
        matched, remaining = find_and_consume_backup_code(totp, creds.backup_codes_hashes)
        if not matched:
            log.info("admin_login_failed", ip=ip, reason="invalid_2fa")
            return _redirect_to_login("invalid_credentials")
        creds.backup_codes_hashes = remaining

    from datetime import datetime

    creds.last_login_at = datetime.now(UTC)
    record = await store.create(creds.id)
    log.info("admin_login_success", ip=ip, admin_id=str(record.admin_id))

    response = RedirectResponse(url="/admin", status_code=303)
    response.set_cookie(
        key=ADMIN_SESSION_COOKIE,
        value=store.sign_cookie(record.session_id),
        max_age=ADMIN_SESSION_TTL_SECONDS,
        httponly=True,
        secure=request.url.scheme == "https",
        samesite="strict",
        path="/admin",
    )
    await session.commit()
    return response


@router.post("/logout", response_class=Response, include_in_schema=False)
async def admin_logout(
    request: Request,
    store: Annotated[AdminSessionStore, Depends(get_admin_session_store)],
) -> Response:
    raw = request.cookies.get(ADMIN_SESSION_COOKIE)
    if raw is not None:
        session_id = store.unsign_cookie(raw)
        if session_id is not None:
            await store.delete(session_id)
    response = RedirectResponse(url="/admin/login", status_code=303)
    response.delete_cookie(ADMIN_SESSION_COOKIE, path="/admin")
    return response


def _redirect_to_login(reason: str) -> Response:
    return RedirectResponse(url=f"/admin/login?error={reason}", status_code=303)


# Tracked here so future tests can import a Mapping without hitting the DB.
ERROR_MESSAGES: dict[str, str] = {
    "invalid_credentials": "Неверный логин, пароль или код 2FA",
    "rate_limited": "Слишком много попыток. Попробуйте через 15 минут.",
}

_ = Any  # Form() collects type annotations at import; keep typing import alive
