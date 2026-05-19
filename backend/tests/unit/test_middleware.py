"""Unit tests for the API middleware stack (T1.2).

These exercise the middleware in isolation against an in-process FastAPI
app — no Redis or Postgres required. Integration tests with live infra
land in tests/integration/ in later tickets.
"""

from __future__ import annotations

import uuid

import pytest
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

from app.api.middleware import (
    REQUEST_ID_HEADER,
    RateLimiter,
    RequestIDMiddleware,
    SecurityHeadersMiddleware,
    register_exception_handlers,
)


@pytest.fixture
def app() -> FastAPI:
    """Minimal FastAPI app with our middleware + a few synthetic routes."""

    app = FastAPI()
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(RequestIDMiddleware)
    register_exception_handlers(app)

    @app.get("/ping")
    async def ping() -> dict[str, str]:
        return {"pong": "ok"}

    @app.get("/boom")
    async def boom() -> None:
        raise RuntimeError("intentional test failure")

    @app.get("/bad-request")
    async def bad_request() -> None:
        raise HTTPException(status_code=400, detail="invalid_input")

    return app


@pytest.fixture
def client(app: FastAPI) -> TestClient:
    # raise_server_exceptions=False so we can assert the JSON envelope
    # instead of bubbling the test handler's RuntimeError to pytest.
    return TestClient(app, raise_server_exceptions=False)


# ---- Security headers -------------------------------------------------------


@pytest.mark.unit
class TestSecurityHeaders:
    def test_locked_csp_on_json_routes(self, client: TestClient) -> None:
        resp = client.get("/ping")
        assert resp.status_code == 200
        csp = resp.headers["Content-Security-Policy"]
        assert "default-src 'none'" in csp
        assert "frame-ancestors 'none'" in csp

    def test_hsts_preload_value(self, client: TestClient) -> None:
        resp = client.get("/ping")
        # SECURITY.md T1.2: max-age >= 2 years, includeSubDomains, preload
        assert resp.headers["Strict-Transport-Security"] == (
            "max-age=63072000; includeSubDomains; preload"
        )

    def test_clickjacking_and_mime_sniffing_off(self, client: TestClient) -> None:
        resp = client.get("/ping")
        assert resp.headers["X-Frame-Options"] == "DENY"
        assert resp.headers["X-Content-Type-Options"] == "nosniff"

    def test_referrer_and_permissions_policy(self, client: TestClient) -> None:
        resp = client.get("/ping")
        assert resp.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"
        assert "geolocation=()" in resp.headers["Permissions-Policy"]
        assert "microphone=()" in resp.headers["Permissions-Policy"]
        assert "camera=()" in resp.headers["Permissions-Policy"]


# ---- Request ID -------------------------------------------------------------


@pytest.mark.unit
class TestRequestId:
    def test_generated_when_no_header(self, client: TestClient) -> None:
        resp = client.get("/ping")
        rid = resp.headers[REQUEST_ID_HEADER]
        # Must be a parseable UUID — i.e. not an arbitrary string.
        uuid.UUID(rid)

    def test_incoming_uuid_is_honoured(self, client: TestClient) -> None:
        provided = "01234567-89ab-cdef-0123-456789abcdef"
        resp = client.get("/ping", headers={REQUEST_ID_HEADER: provided})
        assert resp.headers[REQUEST_ID_HEADER] == provided

    def test_malformed_incoming_id_is_replaced(self, client: TestClient) -> None:
        resp = client.get("/ping", headers={REQUEST_ID_HEADER: "not-a-uuid"})
        rid = resp.headers[REQUEST_ID_HEADER]
        uuid.UUID(rid)  # would raise if the malformed value leaked through
        assert rid != "not-a-uuid"


# ---- Error envelope ---------------------------------------------------------


@pytest.mark.unit
class TestErrorEnvelope:
    def test_unhandled_exception_returns_canonical_500(self, client: TestClient) -> None:
        resp = client.get("/boom")
        assert resp.status_code == 500
        body = resp.json()
        assert body["ok"] is False
        assert body["error"] == "internal_error"
        # request_id present and matches the response header
        uuid.UUID(body["request_id"])
        assert body["request_id"] == resp.headers[REQUEST_ID_HEADER]
        # No stack trace leaked into the envelope.
        assert "Traceback" not in resp.text
        assert "RuntimeError" not in resp.text

    def test_http_exception_keeps_status_and_carries_code(self, client: TestClient) -> None:
        resp = client.get("/bad-request")
        assert resp.status_code == 400
        body = resp.json()
        assert body["ok"] is False
        assert body["error"] == "invalid_input"
        assert body["request_id"] == resp.headers[REQUEST_ID_HEADER]


# ---- Rate limiter -----------------------------------------------------------


class _FakeRedis:
    """Bare-minimum stand-in covering only the operations RateLimiter needs."""

    def __init__(self) -> None:
        self.counts: dict[str, int] = {}
        self.ttls: dict[str, int] = {}

    def pipeline(self) -> _FakePipeline:
        return _FakePipeline(self)

    async def expire(self, key: str, seconds: int) -> bool:
        self.ttls[key] = seconds
        return True


class _FakePipeline:
    def __init__(self, redis: _FakeRedis) -> None:
        self._redis = redis
        self._ops: list[tuple[str, str, int]] = []

    def incr(self, key: str, amount: int = 1) -> _FakePipeline:
        self._ops.append(("incr", key, amount))
        return self

    def ttl(self, key: str) -> _FakePipeline:
        self._ops.append(("ttl", key, 0))
        return self

    async def execute(self) -> list[int]:
        results: list[int] = []
        for op, key, amount in self._ops:
            if op == "incr":
                new_value = self._redis.counts.get(key, 0) + amount
                self._redis.counts[key] = new_value
                results.append(new_value)
            elif op == "ttl":
                results.append(self._redis.ttls.get(key, -1))
        return results


@pytest.mark.unit
class TestRateLimiter:
    @pytest.fixture
    def limited_app(self) -> tuple[FastAPI, _FakeRedis]:
        app = FastAPI()
        app.add_middleware(SecurityHeadersMiddleware)
        app.add_middleware(RequestIDMiddleware)
        register_exception_handlers(app)

        fake_redis = _FakeRedis()
        app.state.redis = fake_redis

        limiter = RateLimiter(limit=3, window_seconds=60, scope="test")

        from fastapi import Depends

        @app.get("/limited")
        async def limited(_: None = Depends(limiter)) -> dict[str, str]:
            return {"ok": "true"}

        return app, fake_redis

    def test_allows_under_limit(self, limited_app: tuple[FastAPI, _FakeRedis]) -> None:
        app, _ = limited_app
        client = TestClient(app)
        for _ in range(3):
            resp = client.get("/limited")
            assert resp.status_code == 200

    def test_blocks_over_limit_with_retry_after(
        self, limited_app: tuple[FastAPI, _FakeRedis]
    ) -> None:
        app, _ = limited_app
        client = TestClient(app)
        for _ in range(3):
            assert client.get("/limited").status_code == 200
        resp = client.get("/limited")
        assert resp.status_code == 429
        assert resp.json()["error"] == "rate_limited"
        assert "Retry-After" in resp.headers

    def test_fails_secure_when_redis_unavailable(self) -> None:
        app = FastAPI()
        app.add_middleware(RequestIDMiddleware)
        register_exception_handlers(app)
        # Intentionally do NOT set app.state.redis — simulates Redis outage.
        limiter = RateLimiter(limit=3, window_seconds=60, scope="test")

        from fastapi import Depends

        @app.get("/limited")
        async def limited(_: None = Depends(limiter)) -> dict[str, str]:
            return {"ok": "true"}

        client = TestClient(app)
        resp = client.get("/limited")
        # Fail-secure per SECURITY.md A10: deny rather than allow.
        assert resp.status_code == 503
        assert resp.json()["error"] == "rate_limiter_unavailable"
