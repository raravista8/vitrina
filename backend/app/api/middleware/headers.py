"""Security-headers middleware.

Adds the headers required by SECURITY.md A02 to every response. The API
itself never renders user-supplied HTML, so its CSP is locked down to
``default-src 'none'`` — the only HTML the API serves is FastAPI's
auto-generated Swagger UI at ``/docs``, which gets a relaxed CSP.

Customer-facing sites and the landing have their own CSPs set at the
template / Next.js layer; this middleware governs only API responses.

Implemented as pure ASGI (not BaseHTTPMiddleware) — see request_id.py for
the rationale.
"""

from __future__ import annotations

from starlette.types import ASGIApp, Message, Receive, Scope, Send

# Locked-down baseline for JSON API responses.
_API_CSP = "default-src 'none'; frame-ancestors 'none'"

# Relaxed CSP for FastAPI's Swagger UI (dev-only paths). Allows the CDN that
# FastAPI's `get_swagger_ui_html` references by default.
_DOCS_CSP = (
    "default-src 'self'; "
    "script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; "
    "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; "
    "img-src 'self' data: https://fastapi.tiangolo.com; "
    "frame-ancestors 'none'"
)

_RELAXED_CSP_PATH_PREFIXES = ("/docs", "/redoc", "/openapi.json")

# HSTS preload-eligible value (SECURITY.md T1.2).
HSTS_VALUE = "max-age=63072000; includeSubDomains; preload"


_BASE_HEADERS_BYTES: tuple[tuple[bytes, bytes], ...] = (
    (b"strict-transport-security", HSTS_VALUE.encode("latin-1")),
    (b"x-frame-options", b"DENY"),
    (b"x-content-type-options", b"nosniff"),
    (b"referrer-policy", b"strict-origin-when-cross-origin"),
    (b"permissions-policy", b"geolocation=(), microphone=(), camera=()"),
)


class SecurityHeadersMiddleware:
    """Set the OWASP-A02 baseline of security headers on every response.

    Each header is added only when the downstream response hasn't already
    set it — handlers retain the right to opt out for a specific endpoint
    (e.g. CSP for an HTML landing) by emitting the header explicitly.
    """

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        path = scope.get("path", "")
        csp = _DOCS_CSP if path.startswith(_RELAXED_CSP_PATH_PREFIXES) else _API_CSP
        csp_bytes = (b"content-security-policy", csp.encode("latin-1"))

        async def send_wrapper(message: Message) -> None:
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                existing_keys = {h[0].lower() for h in headers}
                for name, value in (*_BASE_HEADERS_BYTES, csp_bytes):
                    if name not in existing_keys:
                        headers.append((name, value))
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, send_wrapper)
