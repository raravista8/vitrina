"""FastAPI application entrypoint.

`create_app()` wires the security middleware stack (request-id, headers,
canonical error envelopes), opens a Redis connection on startup for the
rate limiter, and mounts /healthz + /readyz for container probes.

T1.3 will mount API routers under `app.api.routers`.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app import __version__
from app.api.middleware import (
    RequestIDMiddleware,
    SecurityHeadersMiddleware,
    register_exception_handlers,
)
from app.api.routers.applications import router as applications_router
from app.config import get_settings
from app.utils.logging import configure_logging, get_logger


@asynccontextmanager
async def _lifespan(app: FastAPI) -> Any:
    """Open infra clients on startup; close them on shutdown."""
    configure_logging()
    log = get_logger("app.main")
    settings = get_settings()

    # Redis (used by rate_limit + queues). Lazy-import keeps `import app.main`
    # cheap for unit tests that don't need a Redis connection.
    redis_client = None
    try:
        from redis.asyncio import Redis

        redis_client = Redis.from_url(settings.redis_url, encoding="utf-8", decode_responses=False)
        # Probe so misconfiguration surfaces on boot, not on the first request.
        await redis_client.ping()
        log.info("redis_connected", url_scheme=settings.redis_url.split("://", 1)[0])
    except Exception as exc:  # pragma: no cover — covered by integration tests
        # We do NOT crash the process: /readyz will report not-ready until
        # Redis is back, but /healthz still passes (liveness vs readiness).
        log.warning("redis_unavailable", error=exc.__class__.__name__)
        redis_client = None

    app.state.redis = redis_client

    try:
        yield
    finally:
        if redis_client is not None:
            await redis_client.close()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Vitrina API",
        version=__version__,
        docs_url="/docs" if settings.debug else None,
        redoc_url=None,
        openapi_url="/openapi.json" if settings.debug else None,
        lifespan=_lifespan,
    )

    # Middleware: order matters. Starlette evaluates them inside-out, so the
    # last `add_middleware` call runs first on the request and last on the
    # response. We want the request-id assigned BEFORE the headers middleware
    # sees the response, hence headers added first then request-id.
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(RequestIDMiddleware)

    register_exception_handlers(app)

    app.include_router(applications_router)

    @app.get("/healthz", include_in_schema=False)
    async def healthz() -> JSONResponse:
        """Liveness: process is up and serving HTTP. Used by Docker healthcheck."""
        return JSONResponse({"ok": True, "data": {"status": "alive"}})

    @app.get("/readyz", include_in_schema=False)
    async def readyz() -> JSONResponse:
        """Readiness: every dependency this process talks to is reachable.

        Currently checks Redis (set by `_lifespan`). T1.1 wired the schema;
        Postgres readiness lands when T1.3 attaches the engine. Crypto key
        readiness lands with T5.x.
        """
        checks: dict[str, bool] = {}

        redis_client = getattr(app.state, "redis", None)
        if redis_client is None:
            checks["redis"] = False
        else:
            try:
                await redis_client.ping()
                checks["redis"] = True
            except Exception:  # readiness probe is best-effort
                checks["redis"] = False

        all_ready = all(checks.values()) and len(checks) > 0
        body = {"ok": all_ready, "data": {"checks": checks}}
        return JSONResponse(body, status_code=200 if all_ready else 503)

    return app


app = create_app()
