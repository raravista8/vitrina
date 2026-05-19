"""End-to-end tests for `/api/me/delete-data` + confirm (T6.2 / FR-071).

Verifies the full erasure lifecycle:

  1. POST /api/me/delete-data with a known contact → 202, magic-link
     email queued, `deletion_requests.pending` row landed
  2. POST /api/me/delete-data/confirm?token=... → user + sites purged
     (CASCADE), feedback nulled, applications nulled, consents
     retained, `admin_actions` row inserted
  3. Anti-enumeration: POST with a non-existent contact returns the
     same 202 envelope and writes NO row
  4. Expired token rejected
  5. Token reuse rejected (lifecycle = completed)
"""

from __future__ import annotations

from collections.abc import AsyncIterator
from datetime import UTC, datetime, timedelta

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import (
    application_rate_limiter,
    get_notification_dispatcher,
    get_session,
)
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import DeliveryResult
from app.infrastructure.postgres.models import (
    AdminAction,
    Consent,
    DeletionRequest,
    Feedback,
    Site,
    User,
)
from app.main import create_app

pytestmark = pytest.mark.integration


# --- fakes -----------------------------------------------------------------


class _FakeRedis:
    def __init__(self) -> None:
        self.counts: dict[str, int] = {}

    def pipeline(self):
        return _FakePipeline(self)

    async def expire(self, *_a, **_kw) -> bool:
        return True

    async def ping(self) -> bool:
        return True


class _FakePipeline:
    def __init__(self, redis: _FakeRedis) -> None:
        self._r = redis
        self._ops: list[tuple[str, str]] = []

    def incr(self, key: str, amount: int = 1):
        self._ops.append(("incr", key))
        return self

    def ttl(self, key: str):
        self._ops.append(("ttl", key))
        return self

    async def execute(self) -> list[int]:
        out: list[int] = []
        for op, key in self._ops:
            if op == "incr":
                self._r.counts[key] = self._r.counts.get(key, 0) + 1
                out.append(self._r.counts[key])
            else:
                out.append(-1)
        return out


class _RecordingDispatcher(NotificationDispatcher):
    def __init__(self) -> None:
        super().__init__(channels={}, founder_telegram_chat_id=None)
        self.user_sends: list[tuple[str, str, str]] = []  # (channel, recipient, body)

    async def notify_user(self, contact, kind, message):  # type: ignore[override,no-untyped-def]
        self.user_sends.append((contact.primary_type.value, contact.primary_value, message.body))
        return DeliveryResult(
            delivered=True,
            channel=contact.primary_type,
            recipient=contact.primary_value,
        )


# --- fixtures --------------------------------------------------------------


@pytest_asyncio.fixture
async def app(_postgres_container, db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    test_dispatcher = _RecordingDispatcher()
    fastapi_app.state.test_dispatcher = test_dispatcher
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: test_dispatcher
    fastapi_app.state.redis = _FakeRedis()
    # Disable rate limiting for the erasure endpoint — it shares the
    # applications limiter, and we POST multiple times per test.
    fastapi_app.dependency_overrides[application_rate_limiter] = lambda: None

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
async def seeded_user_with_site(db_session):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="alice@example.com")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="alice",
        source_type="ymaps",
        status="published",
    )
    db_session.add(site)
    consent = Consent(
        user_id=user.id,
        policy_version=1,
        consent_text="...",
    )
    db_session.add(consent)
    feedback = Feedback(
        user_id=user.id,
        email="alice@example.com",
        type="feature_request",
        message="x",
        checkboxes={},
    )
    db_session.add(feedback)
    await db_session.commit()
    return user, site


# --- happy path ------------------------------------------------------------


async def test_full_erasure_lifecycle(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user_with_site,  # type: ignore[no-untyped-def]
    app: FastAPI,
) -> None:
    user, site = seeded_user_with_site

    resp = await client.post(
        "/api/me/delete-data",
        json={"contact": "alice@example.com"},
    )
    assert resp.status_code == 202, resp.text

    # Magic-link email queued
    dispatcher = app.state.test_dispatcher
    assert len(dispatcher.user_sends) == 1
    channel, recipient, body = dispatcher.user_sends[0]
    assert channel == "email"
    assert recipient == "alice@example.com"
    assert "/api/me/delete-data/confirm?token=" in body

    # Pull the token off the URL the dispatcher saw — same as a real
    # mail client would.
    token = body.split("token=", 1)[1].split()[0].rstrip(")")

    # Pending row landed
    pending = (await db_session.execute(select(DeletionRequest))).scalars().all()
    assert len(pending) == 1
    assert pending[0].status == "pending"
    assert pending[0].user_id == user.id

    # Confirm
    resp2 = await client.post(f"/api/me/delete-data/confirm?token={token}")
    assert resp2.status_code == 200, resp2.text
    payload = resp2.json()
    assert payload["data"]["sites_deleted"] == 1

    # User + site gone
    assert (
        await db_session.execute(select(User).where(User.id == user.id))
    ).scalar_one_or_none() is None
    assert (
        await db_session.execute(select(Site).where(Site.id == site.id))
    ).scalar_one_or_none() is None

    # Consent retained (legal evidence)
    consents = (await db_session.execute(select(Consent))).scalars().all()
    assert len(consents) == 1
    assert consents[0].user_id is None  # SET NULL preserves the row

    # Feedback retained, PII nulled
    fb_rows = (await db_session.execute(select(Feedback))).scalars().all()
    assert len(fb_rows) == 1
    assert fb_rows[0].user_id is None
    assert fb_rows[0].email is None

    # Audit row written
    actions = (await db_session.execute(select(AdminAction))).scalars().all()
    assert any(a.action == "user_data_deleted" for a in actions)


async def test_anti_enumeration_unknown_contact_returns_same_202(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post("/api/me/delete-data", json={"contact": "ghost@nowhere.test"})
    assert resp.status_code == 202
    rows = (await db_session.execute(select(DeletionRequest))).scalars().all()
    assert rows == []  # no row materialised


async def test_invalid_contact_rejected(client: httpx.AsyncClient) -> None:
    resp = await client.post("/api/me/delete-data", json={"contact": "not a contact"})
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_contact"


async def test_missing_token_rejected(client: httpx.AsyncClient) -> None:
    resp = await client.post("/api/me/delete-data/confirm")
    assert resp.status_code == 400


async def test_invalid_token_rejected(client: httpx.AsyncClient) -> None:
    resp = await client.post("/api/me/delete-data/confirm?token=does-not-exist-anywhere")
    assert resp.status_code == 400


async def test_expired_token_rejected(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user_with_site,  # type: ignore[no-untyped-def]
    app: FastAPI,
) -> None:
    # Issue a token then back-date it past the TTL.
    await client.post("/api/me/delete-data", json={"contact": "alice@example.com"})
    row = (await db_session.execute(select(DeletionRequest))).scalar_one()
    row.expires_at = datetime.now(UTC) - timedelta(minutes=1)
    await db_session.commit()

    dispatcher = app.state.test_dispatcher
    body = dispatcher.user_sends[0][2]
    token = body.split("token=", 1)[1].split()[0].rstrip(")")

    resp = await client.post(f"/api/me/delete-data/confirm?token={token}")
    assert resp.status_code == 400


async def test_token_reuse_rejected_after_completion(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user_with_site,  # type: ignore[no-untyped-def]
    app: FastAPI,
) -> None:
    await client.post("/api/me/delete-data", json={"contact": "alice@example.com"})
    dispatcher = app.state.test_dispatcher
    body = dispatcher.user_sends[0][2]
    confirm_line = next(
        line for line in body.splitlines() if "/api/me/delete-data/confirm?token=" in line
    )
    token = confirm_line.split("token=", 1)[1].split()[0]

    resp1 = await client.post(f"/api/me/delete-data/confirm?token={token}")
    assert resp1.status_code == 200

    resp2 = await client.post(f"/api/me/delete-data/confirm?token={token}")
    assert resp2.status_code == 400


async def test_dashboard_renders_user_sites(
    client: httpx.AsyncClient,
    seeded_user_with_site,  # type: ignore[no-untyped-def]
    app: FastAPI,
) -> None:
    """T6.5: same magic-link token also opens a read-only dashboard."""
    await client.post("/api/me/delete-data", json={"contact": "alice@example.com"})
    body = app.state.test_dispatcher.user_sends[0][2]
    dashboard_line = next(line for line in body.splitlines() if "/api/me/dashboard?token=" in line)
    token = dashboard_line.split("token=", 1)[1].split()[0]

    resp = await client.get(f"/api/me/dashboard?token={token}")
    assert resp.status_code == 200
    html = resp.text
    assert "alice.vitrina.site" in html
    assert "Удалить безвозвратно" in html


async def test_dashboard_with_expired_token_returns_400(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user_with_site,  # type: ignore[no-untyped-def]
    app: FastAPI,
) -> None:
    await client.post("/api/me/delete-data", json={"contact": "alice@example.com"})
    row = (await db_session.execute(select(DeletionRequest))).scalar_one()
    row.expires_at = datetime.now(UTC) - timedelta(minutes=1)
    await db_session.commit()
    body = app.state.test_dispatcher.user_sends[0][2]
    dashboard_line = next(line for line in body.splitlines() if "/api/me/dashboard?token=" in line)
    token = dashboard_line.split("token=", 1)[1].split()[0]
    resp = await client.get(f"/api/me/dashboard?token={token}")
    assert resp.status_code == 400
