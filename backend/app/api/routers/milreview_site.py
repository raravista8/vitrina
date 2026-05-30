"""Serve the *milreview* content site from the api, keyed by Host.

This prod has no Object Storage write path, so milreview is served directly by
the app server instead of from S3: Caddy routes ``milreview.samosite.online/*``
→ ``api:8000`` (see the dedicated block in ``infra/Caddyfile``), and this
catch-all GET returns the pre-rendered static files held in
``app.state.milreview_files`` (rendered once at startup by
``app.core.publishing.milreview.render_all``).

Registered **last** so it only catches GETs no other router matched, and it is
**Host-guarded** — any request whose Host isn't the milreview host gets 404, so
it can never shadow the main-domain / admin / api surfaces.
"""

from __future__ import annotations

from fastapi import APIRouter, Request, Response

router = APIRouter()

# Content-site CSP — kept in sync with the milreview block in infra/Caddyfile
# (Caddy overwrites at the edge; we also set it here so a direct api hit is
# correct). Allows Google Fonts + inline styles/scripts (static authored markup)
# + the milreview.ru photo hot-links (until images are localised). No forms/PII.
CONTENT_CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline'; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "font-src 'self' https://fonts.gstatic.com; "
    "img-src 'self' data: https://milreview.ru https://storage.yandexcloud.net; "
    "connect-src 'self'; frame-ancestors 'none'; base-uri 'self'"
)


@router.get("/{file_path:path}", include_in_schema=False)
async def serve_milreview(file_path: str, request: Request) -> Response:
    host = (request.headers.get("host") or "").split(":")[0].lower()
    expected: str | None = getattr(request.app.state, "milreview_host", None)
    if not expected or host != expected:
        return Response(status_code=404)

    files: dict[str, tuple[str, str]] = getattr(request.app.state, "milreview_files", {}) or {}
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
            "Content-Security-Policy": CONTENT_CSP,
        },
    )
