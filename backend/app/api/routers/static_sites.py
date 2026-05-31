"""Host-dispatching catch-all that serves the app-server-rendered static sites.

This prod has no Object Storage write path, so content sites are rendered once
at startup and served directly by the api (Caddy proxies each host →
``api:8000``). A **single** catch-all owns all of them — two separate
``/{file_path:path}`` routes would conflict (Starlette matches the first by
path and never falls through), so every static site is dispatched here by Host:

- ``milreview.samosite.online`` → ``app.state.milreview_files`` (MILREVIEW_CSP)
- ``elektrik-spb.samosite.online`` → ``app.state.elektrik_files`` (ELEKTRIK_CSP)

Registered **last** so it only matches GETs no API/admin/health route claimed,
and Host-guarded so a non-registered Host gets 404 (never shadows the main
domain). The elektrik lead form POSTs to ``/api/leads/elektrik`` — a POST route
matched before this GET catch-all.
"""

from __future__ import annotations

from fastapi import APIRouter, Request, Response

router = APIRouter()

# milreview content-site CSP: Google Fonts + inline styles/scripts (static
# authored markup) + milreview.ru photo hot-links. No forms / PII.
MILREVIEW_CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline'; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "font-src 'self' https://fonts.gstatic.com; "
    "img-src 'self' data: https://milreview.ru https://storage.yandexcloud.net; "
    "connect-src 'self'; frame-ancestors 'none'; base-uri 'self'"
)

# elektrik customer-site CSP: Google Fonts + inline styles/scripts (design ships
# inline handlers + a config <script>), same-origin fetch to /api/leads/elektrik,
# and Yandex SmartCaptcha (frame + script + connect). Self-hosted WebP images.
ELEKTRIK_CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline' https://smartcaptcha.yandexcloud.net; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "font-src 'self' https://fonts.gstatic.com; "
    "img-src 'self' data:; "
    "connect-src 'self' https://smartcaptcha.yandexcloud.net; "
    "frame-src https://smartcaptcha.yandexcloud.net; "
    "form-action 'self'; frame-ancestors 'none'; base-uri 'self'"
)

# (host_attr, files_attr, csp) on app.state. Add a row to host another site.
_SITES: tuple[tuple[str, str, str], ...] = (
    ("milreview_host", "milreview_files", MILREVIEW_CSP),
    ("elektrik_host", "elektrik_files", ELEKTRIK_CSP),
)


@router.get("/{file_path:path}", include_in_schema=False)
async def serve_static_site(file_path: str, request: Request) -> Response:
    host = (request.headers.get("host") or "").split(":")[0].lower()
    state = request.app.state
    # owner-deleted sites (status=pending_purge) stop serving immediately — the
    # delete endpoint adds the host here; survives restart via the startup probe.
    purged = getattr(state, "purged_hosts", None)
    if purged and host in purged:
        return Response(status_code=410)
    for host_attr, files_attr, csp in _SITES:
        if getattr(state, host_attr, None) != host:
            continue
        files: dict[str, tuple[str | bytes, str]] = getattr(state, files_attr, {}) or {}
        key = file_path or "index.html"
        entry = files.get(key)
        if entry is None:
            return Response(status_code=404)
        content, content_type = entry
        return Response(
            content=content,
            media_type=content_type,
            headers={
                "Cache-Control": "public, max-age=300",
                "Content-Security-Policy": csp,
            },
        )
    return Response(status_code=404)
