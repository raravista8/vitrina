"""FastAPI dependency factories.

Centralises ``Depends()`` providers so routers stay thin:

  - ``get_session``       — yields an ``AsyncSession`` per request
  - ``get_client_ip``     — leftmost X-Forwarded-For, then request.client.host
  - ``application_rate_limiter`` — 3/h/IP per FR-004
"""

from __future__ import annotations

from collections.abc import AsyncIterator

from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.middleware import RateLimiter
from app.config import get_settings
from app.core.captcha.verifier import CaptchaVerifier, build_captcha_verifier
from app.core.notify.dispatcher import NotificationDispatcher
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
