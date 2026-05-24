"""End-to-end tests for ``POST /api/auth/login`` (canon 0.4.0).

Hits the FastAPI app via httpx ASGITransport against a testcontainers
Postgres + an in-memory fake Redis. Covers:

  - Happy path: bcrypt verify succeeds → 200 + ``samosite_session`` cookie
  - Unknown login → 401 invalid_credentials (constant-time response)
  - Wrong password → 401 invalid_credentials
  - 5 consecutive fails → 6th attempt returns 429 with **Retry-After header**
    (regression test for headers vanishing when set via ``response.headers``
    instead of ``HTTPException(headers=...)``)
"""

from __future__ import annotations

from collections.abc import AsyncIterator

import bcrypt
import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI

from app.api.dependencies import get_customer_session_store, get_session
from app.core.auth.customer import CustomerSessionStore
from app.infrastructure.postgres.models import User
from app.main import create_app

pytestmark = pytest.mark.integration


# --------------------------------------------------------------------------- #
# Fake Redis — covers what the auth router actually calls.
# --------------------------------------------------------------------------- #


class _FakeRedis:
    """In-memory stand-in for ``redis.asyncio.Redis``.

    Implements only ``ttl``, ``incr``, ``expire``, ``set``, ``get``,
    ``delete`` — the exact surface ``api/routers/auth.py`` and
    ``core/auth/customer.py::CustomerSessionStore`` touch.
    """

    def __init__(self) -> None:
        self._values: dict[str, bytes] = {}
        self._ttls: dict[str, int] = {}

    async def ttl(self, key: str) -> int:
        if key not in self._values:
            return -2
        return self._ttls.get(key, -1)

    async def incr(self, key: str) -> int:
        current = int(self._values.get(key, b"0").decode())
        new = current + 1
        self._values[key] = str(new).encode()
        return new

    async def expire(self, key: str, seconds: int) -> bool:
        if key in self._values:
            self._ttls[key] = seconds
            return True
        return False

    async def set(
        self,
        key: str,
        value: bytes | str,
        *,
        ex: int | None = None,
    ) -> bool:
        self._values[key] = value if isinstance(value, bytes) else value.encode()
        if ex is not None:
            self._ttls[key] = ex
        return True

    async def get(self, key: str) -> bytes | None:
        return self._values.get(key)

    async def delete(self, *keys: str) -> int:
        n = 0
        for k in keys:
            if k in self._values:
                del self._values[k]
                self._ttls.pop(k, None)
                n += 1
        return n


# --------------------------------------------------------------------------- #
# Fixtures
# --------------------------------------------------------------------------- #


@pytest_asyncio.fixture
async def app(_postgres_container: str, db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session() -> AsyncIterator:
        yield db_session

    fake_redis = _FakeRedis()
    store = CustomerSessionStore(fake_redis, secret_key="test-secret-32-bytes-or-longer-xxxx")

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_customer_session_store] = lambda: store
    fastapi_app.state.redis = fake_redis

    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest_asyncio.fixture
async def provisioned_user(db_session) -> User:  # type: ignore[no-untyped-def]
    """Seed a User with canon 0.4.0 ``login`` + ``password_hash``."""
    plain = "correct-horse-battery-staple"
    pw_hash = bcrypt.hashpw(plain.encode(), bcrypt.gensalt(rounds=4)).decode()
    user = User(
        contact_type="email",
        contact_value="anna@example.com",
        login="studia-anna",
        password_hash=pw_hash,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    # Stash plaintext on the model for tests — not persisted.
    user._plaintext_password = plain  # type: ignore[attr-defined]
    return user


# --------------------------------------------------------------------------- #
# Happy path
# --------------------------------------------------------------------------- #


async def test_login_success_sets_cookie(client: httpx.AsyncClient, provisioned_user: User) -> None:
    resp = await client.post(
        "/api/auth/login",
        json={
            "login": provisioned_user.login,
            "password": provisioned_user._plaintext_password,  # type: ignore[attr-defined]
        },
    )
    assert resp.status_code == 200, resp.text
    assert resp.json() == {"ok": True}
    # FastAPI / Starlette use lowercased header names on the response,
    # but Set-Cookie may be on httpx as 'set-cookie'.
    cookies = resp.headers.get_list("set-cookie")
    assert any("samosite_session=" in c for c in cookies)
    assert any("HttpOnly" in c for c in cookies)
    assert any("SameSite=strict" in c.lower() or "samesite=strict" in c.lower() for c in cookies)


# --------------------------------------------------------------------------- #
# Failure paths
# --------------------------------------------------------------------------- #


async def test_unknown_login_returns_401(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/auth/login",
        json={"login": "no-such-master", "password": "whatever"},  # pragma: allowlist secret
    )
    assert resp.status_code == 401
    assert resp.json()["error"] == "invalid_credentials"


async def test_wrong_password_returns_401(
    client: httpx.AsyncClient, provisioned_user: User
) -> None:
    bad_pw = "definitely-wrong"  # pragma: allowlist secret
    resp = await client.post(
        "/api/auth/login",
        json={"login": provisioned_user.login, "password": bad_pw},
    )
    assert resp.status_code == 401
    assert resp.json()["error"] == "invalid_credentials"


# --------------------------------------------------------------------------- #
# Rate-limit + Retry-After header (regression — the headers must reach the
# client, not vanish into a discarded Response object).
# --------------------------------------------------------------------------- #


async def test_rate_limit_returns_429_with_retry_after_header(
    client: httpx.AsyncClient,
) -> None:
    login = "nonexistent-rate-test"
    payload = {"login": login, "password": "wrong"}  # pragma: allowlist secret

    # 5 fails — each returns 401, the 5th installs the lockout.
    for _ in range(5):
        r = await client.post("/api/auth/login", json=payload)
        assert r.status_code == 401, r.text

    # 6th attempt — lockout is active, must be 429 + Retry-After header.
    locked = await client.post("/api/auth/login", json=payload)
    assert locked.status_code == 429, locked.text
    assert locked.json()["error"] == "rate_limited"

    # The actual regression assertion: header must reach the client.
    assert "retry-after" in locked.headers, locked.headers
    retry_after = locked.headers["retry-after"]
    assert retry_after.isdigit(), retry_after
    assert int(retry_after) > 0, retry_after


# --------------------------------------------------------------------------- #
# Logout
# --------------------------------------------------------------------------- #


async def test_logout_clears_cookie(client: httpx.AsyncClient, provisioned_user: User) -> None:
    # Login first.
    login_resp = await client.post(
        "/api/auth/login",
        json={
            "login": provisioned_user.login,
            "password": provisioned_user._plaintext_password,  # type: ignore[attr-defined]
        },
    )
    assert login_resp.status_code == 200

    # Logout — should send a Set-Cookie that expires samosite_session.
    logout_resp = await client.post("/api/auth/logout")
    assert logout_resp.status_code == 200
    cookies = logout_resp.headers.get_list("set-cookie")
    assert any("samosite_session=" in c and "Max-Age=0" in c for c in cookies), cookies
