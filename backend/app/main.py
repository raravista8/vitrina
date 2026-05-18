"""FastAPI application entrypoint.

T0.1: minimal app with `/healthz` and `/readyz` for container healthchecks.
T1.2 will attach middleware (security headers, request_id, error handler,
rate limit) and mount routers under `app.api.routers`.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app import __version__
from app.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Vitrina API",
        version=__version__,
        docs_url="/docs" if settings.debug else None,
        redoc_url=None,
        openapi_url="/openapi.json" if settings.debug else None,
    )

    @app.get("/healthz", include_in_schema=False)
    async def healthz() -> JSONResponse:
        return JSONResponse({"ok": True, "data": {"status": "alive"}})

    @app.get("/readyz", include_in_schema=False)
    async def readyz() -> JSONResponse:
        # T1.2 will check Postgres + Redis + Fernet key availability.
        return JSONResponse({"ok": True, "data": {"status": "ready"}})

    return app


app = create_app()
