"""Global exception handlers.

Maps every exception that escapes the route handler chain to the canonical
error envelope from CLAUDE.md §Conventions:

    {"ok": false, "error": "<code>", "request_id": "<uuid>"}

No stack trace ever reaches the client (SECURITY.md A10 — fail-secure
defaults). Full diagnostics go to structlog (request_id-correlated) and to
Sentry via the SDK's automatic capture.
"""

from __future__ import annotations

from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.api.middleware.request_id import REQUEST_ID_HEADER, current_request_id
from app.utils.logging import get_logger


def _envelope(
    error_code: str,
    *,
    status_code: int,
    headers: dict[str, str] | None = None,
    inject_request_id_header: bool = False,
) -> JSONResponse:
    """Build the canonical error envelope.

    HTTPException / RequestValidationError responses travel through our
    ASGI middleware on the way out, which already attaches X-Request-ID.
    The 500-from-arbitrary-exception path, however, originates in
    Starlette's ServerErrorMiddleware OUTSIDE our middleware stack — so
    that handler sets ``inject_request_id_header=True`` and the header is
    embedded directly in the response.
    """
    rid = current_request_id()
    body: dict[str, Any] = {
        "ok": False,
        "error": error_code,
        "request_id": rid,
    }
    response_headers: dict[str, str] = dict(headers or {})
    if inject_request_id_header and rid:
        response_headers.setdefault(REQUEST_ID_HEADER, rid)
    return JSONResponse(body, status_code=status_code, headers=response_headers)


async def _handle_http_exception(_: Request, exc: HTTPException) -> JSONResponse:
    """HTTPException keeps its status; the `detail` field becomes the error code
    if it's a string, otherwise we fall back to a generic per-status code.
    Any headers attached to the exception (e.g. ``Retry-After`` from the rate
    limiter) are propagated to the response."""
    code = _http_error_code(exc)
    log = get_logger("api.errors")
    log.info("http_exception", status=exc.status_code, code=code)
    return _envelope(code, status_code=exc.status_code, headers=dict(exc.headers or {}))


async def _handle_validation_error(_: Request, exc: RequestValidationError) -> JSONResponse:
    log = get_logger("api.errors")
    log.info("validation_error", errors=exc.errors())
    return _envelope("validation_failed", status_code=422)


async def _handle_unexpected(_: Request, exc: Exception) -> JSONResponse:
    """Catch-all: never leak the traceback to the client. Sentry SDK auto-
    captures via the FastAPI integration; structlog logs with full stack."""
    log = get_logger("api.errors")
    log.exception("unhandled_exception", exc_class=exc.__class__.__name__)
    return _envelope("internal_error", status_code=500, inject_request_id_header=True)


def _http_error_code(exc: HTTPException) -> str:
    if isinstance(exc.detail, str) and exc.detail:
        # Allow handlers to raise `HTTPException(status_code=429, detail="rate_limited")`.
        return exc.detail.lower().replace(" ", "_")
    return f"http_{exc.status_code}"


def register_exception_handlers(app: FastAPI) -> None:
    """Attach the handlers to a FastAPI app. Idempotent for tests."""
    app.add_exception_handler(HTTPException, _handle_http_exception)  # type: ignore[arg-type]
    app.add_exception_handler(RequestValidationError, _handle_validation_error)  # type: ignore[arg-type]
    app.add_exception_handler(Exception, _handle_unexpected)
