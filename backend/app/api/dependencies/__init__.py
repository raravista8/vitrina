"""FastAPI dependency factories.

Centralises ``Depends()`` providers so routers stay thin:

  - ``get_session``       — yields an ``AsyncSession`` per request
  - ``get_client_ip``     — leftmost X-Forwarded-For, then request.client.host
  - ``application_rate_limiter`` — 3/h/IP per FR-004
"""

from __future__ import annotations

from collections.abc import AsyncIterator

from fastapi import Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.middleware import RateLimiter
from app.config import get_settings
from app.core.auth.sessions import AdminSession, AdminSessionStore
from app.core.captcha.verifier import CaptchaVerifier, build_captcha_verifier
from app.core.content.ports import LlmClient
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.preview.service import PreviewService
from app.infrastructure.postgres.engine import get_sessionmaker


async def get_session() -> AsyncIterator[AsyncSession]:
    """Yield an AsyncSession, closing it when the request completes.

    Transactions are scoped by the caller via ``session.begin()`` or
    ``session.commit()`` — the dependency itself doesn't open a tx.
    """
    sessionmaker = await get_sessionmaker()
    async with sessionmaker() as session:
        yield session


def get_client_ip(request: Request) -> str | None:
    """Return the client IP, preferring the leftmost X-Forwarded-For entry
    (which Caddy populates) and falling back to ``request.client.host``."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",", 1)[0].strip()
    return request.client.host if request.client is not None else None


# Per FR-004: applications endpoint allows N submissions per IP per hour.
# Configured via Settings.rate_limit_applications_per_ip_per_hour (default 3).
def _build_application_rate_limiter() -> RateLimiter:
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_applications_per_ip_per_hour,
        window_seconds=3600,
        scope="applications",
    )


application_rate_limiter = _build_application_rate_limiter()


def _build_feedback_rate_limiter() -> RateLimiter:
    """Feedback endpoint: same 3/h/IP as applications. Feedback is an
    abuse target too (free-text → searchable in admin), so we keep the
    same budget rather than relaxing it."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_applications_per_ip_per_hour,
        window_seconds=3600,
        scope="feedback",
    )


feedback_rate_limiter = _build_feedback_rate_limiter()


def _build_preview_rate_limiter() -> RateLimiter:
    """FR-005a: 10 req/min/IP keeps the preview endpoint useless for
    upstream-reconnaissance / harvesting attacks."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_preview_per_ip_per_min,
        window_seconds=60,
        scope="preview",
    )


preview_rate_limiter = _build_preview_rate_limiter()


def _build_admin_login_rate_limiter() -> RateLimiter:
    """SECURITY.md T7.1: 5 attempts per IP per 15 min."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_admin_login_per_ip_per_15min,
        window_seconds=15 * 60,
        scope="admin_login",
    )


admin_login_rate_limiter = _build_admin_login_rate_limiter()


def get_admin_session_store(request: Request) -> AdminSessionStore:
    """Per-app AdminSessionStore. Lifespan attaches Redis + secret on startup."""
    store: AdminSessionStore | None = getattr(request.app.state, "admin_session_store", None)
    if store is None:
        msg = "admin_session_store not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return store


async def require_admin(
    request: Request,
    store: AdminSessionStore = Depends(get_admin_session_store),
) -> AdminSession:
    """Dependency for every /admin/* route except /admin/login.

    Reads the signed cookie, looks the session up in Redis, refreshes its
    last_seen_at, and returns the AdminSession. On any failure 303-redirects
    to /admin/login. Per SECURITY.md A07.
    """
    raw = request.cookies.get("admin_session")
    if raw is None:
        raise _unauthorised_redirect()

    session_id = store.unsign_cookie(raw)
    if session_id is None:
        raise _unauthorised_redirect()

    record = await store.load(session_id)
    if record is None:
        raise _unauthorised_redirect()

    return await store.touch(record)


def _unauthorised_redirect() -> HTTPException:
    # 303 forces a GET on /admin/login; the browser drops form data which is
    # what we want for an expired session.
    return HTTPException(
        status_code=303,
        detail="admin_login_required",
        headers={"Location": "/admin/login"},
    )


def get_captcha_verifier() -> CaptchaVerifier:
    """Module-singleton-ish factory. Tests override via
    ``app.dependency_overrides[get_captcha_verifier] = lambda: <fake>``."""
    return build_captcha_verifier(get_settings())


def get_notification_dispatcher(request: Request) -> NotificationDispatcher:
    """Return the per-app NotificationDispatcher initialised in lifespan.

    Tests override the dep directly to inject a fake dispatcher; here we
    just look up the instance set on ``app.state``.
    """
    dispatcher: NotificationDispatcher | None = getattr(
        request.app.state, "notification_dispatcher", None
    )
    if dispatcher is None:
        msg = "notification_dispatcher not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return dispatcher


def get_preview_service(request: Request) -> PreviewService:
    """Per-app PreviewService initialised by the lifespan (T1.4b)."""
    svc: PreviewService | None = getattr(request.app.state, "preview_service", None)
    if svc is None:
        msg = "preview_service not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return svc


def get_content_llm(request: Request) -> LlmClient:
    """Per-app LlmClient initialised in lifespan (T4.1). Falls back to
    a ``YandexGptClient`` constructed with empty credentials when the
    env vars aren't set — that client's ``is_available()`` returns
    False and the content service returns a failed outcome instead of
    crashing the admin request."""
    client: LlmClient | None = getattr(request.app.state, "content_llm", None)
    if client is None:
        msg = "content_llm not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return client
