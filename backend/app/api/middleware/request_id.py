"""Request-ID middleware.

Generates (or accepts via header) a stable UUIDv4 per HTTP request. Two
consumers:
  - structlog: the contextvar is bound so every log line in the request's
    call stack inherits ``request_id`` without explicit plumbing.
  - error handler: pulls the contextvar to populate the canonical
    ``request_id`` field in error envelopes (see CLAUDE.md §Conventions).

The same id is echoed back to clients via the ``X-Request-ID`` response
header so support can correlate user-reported errors against logs.

Written as a pure ASGI callable rather than ``BaseHTTPMiddleware`` because
the latter swallows exceptions from downstream handlers — they never reach
``app.add_exception_handler(Exception, ...)``. Pure ASGI propagates
correctly, which is required for the error-envelope contract in T1.2.
"""

from __future__ import annotations

import contextvars
import uuid

import structlog
from starlette.types import ASGIApp, Message, Receive, Scope, Send

REQUEST_ID_HEADER = "X-Request-ID"
_HEADER_KEY = REQUEST_ID_HEADER.lower().encode("latin-1")

# Module-level contextvar bound by RequestIDMiddleware. structlog's
# `merge_contextvars` processor (configured in app.utils.logging)
# automatically copies anything in `structlog.contextvars` into log events;
# we additionally expose a plain contextvars.ContextVar for non-log callers
# (e.g. the error handler).
request_id_var: contextvars.ContextVar[str | None] = contextvars.ContextVar(
    "request_id", default=None
)


def current_request_id() -> str | None:
    """Return the current request's id, or None if called outside a request."""
    return request_id_var.get()


class RequestIDMiddleware:
    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        incoming = _extract_incoming(scope)
        request_id = incoming if incoming and _looks_like_uuid(incoming) else str(uuid.uuid4())

        # NOTE: we do NOT reset the contextvar after the inner app returns.
        # contextvars are bound to the current asyncio.Task, so the value
        # dies naturally when the request task ends. If we reset() in a
        # `finally` block, the exception path unwinds OUR contextvar before
        # the outer ServerErrorMiddleware invokes the error handler — which
        # then sees `request_id=None` in the canonical envelope.
        request_id_var.set(request_id)
        structlog.contextvars.bind_contextvars(request_id=request_id)

        async def send_wrapper(message: Message) -> None:
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                headers.append((_HEADER_KEY, request_id.encode("latin-1")))
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, send_wrapper)


def _extract_incoming(scope: Scope) -> str | None:
    headers: list[tuple[bytes, bytes]] = scope.get("headers", [])
    for key, value in headers:
        if key.lower() == _HEADER_KEY:
            try:
                return value.decode("latin-1")
            except UnicodeDecodeError:
                return None
    return None


def _looks_like_uuid(value: str) -> bool:
    """Reject malformed/spoofed values from clients before we honour them."""
    try:
        uuid.UUID(value)
    except (ValueError, AttributeError):
        return False
    return True
