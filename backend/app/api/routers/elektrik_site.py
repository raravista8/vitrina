"""Serve the *elektrik-spb* customer site from the api, keyed by Host.

Same model as ``milreview_site`` (this prod has no Object Storage write path):
Caddy routes ``elektrik-spb.samosite.online/*`` → ``api:8000`` and this
catch-all GET returns the pre-rendered files in ``app.state.elektrik_files``
(rendered once at startup by ``app.core.publishing.elektrik.render_all``).

Registered **last** (after ``/api/*`` + the milreview catch-all) so it only
matches GETs no other route claimed, and **Host-guarded** so it can't shadow
the main domain. The lead form POSTs to ``/api/leads/elektrik`` — a real API
route that matches before this catch-all (POST, and registered earlier).
"""

from __future__ import annotations

from fastapi import APIRouter, Request, Response

router = APIRouter()

# Customer-site CSP. Allows Google Fonts + inline styles/scripts (the design
# ships inline handlers + a config <script>), same-origin fetch to
# /api/leads/elektrik, and Yandex SmartCaptcha (frame + script + connect) in
# case it's enabled for this site. Images are self-hosted WebP.
CONTENT_CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline' https://smartcaptcha.yandexcloud.net; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "font-src 'self' https://fonts.gstatic.com; "
    "img-src 'self' data:; "
    "connect-src 'self' https://smartcaptcha.yandexcloud.net; "
    "frame-src https://smartcaptcha.yandexcloud.net; "
    "form-action 'self'; frame-ancestors 'none'; base-uri 'self'"
)


@router.get("/{file_path:path}", include_in_schema=False)
async def serve_elektrik(file_path: str, request: Request) -> Response:
    host = (request.headers.get("host") or "").split(":")[0].lower()
    expected: str | None = getattr(request.app.state, "elektrik_host", None)
    if not expected or host != expected:
        return Response(status_code=404)

    files: dict[str, tuple[str | bytes, str]] = (
        getattr(request.app.state, "elektrik_files", {}) or {}
    )
    key = file_path or "index.html"
    entry = files.get(key)
    if entry is None:
        return Response(status_code=404)

    content, content_type = entry
    # Images cache longer than HTML/CSS/JS (content-hashed by name in practice;
    # safe short max-age keeps re-renders visible quickly).
    is_asset = key.endswith((".webp", ".png", ".jpg", ".svg"))
    return Response(
        content=content,
        media_type=content_type,
        headers={
            "Cache-Control": f"public, max-age={86400 if is_asset else 300}",
            "Content-Security-Policy": CONTENT_CSP,
        },
    )
