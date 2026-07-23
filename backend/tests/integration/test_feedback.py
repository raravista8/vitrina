"""End-to-end tests for POST /api/feedback (T1.7).

Shares the testcontainers Postgres + fake Redis / dispatcher pattern
with test_applications.py. Covers waitlist + feature-request + bug +
general kinds, captcha rejection, consent-required, rate-limit, and the
persistence side-effect (row in `feedback` with the right columns).
"""

from __future__ import annotations

from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI

from app.api.dependencies import (
    feedback_rate_limiter,
    get_captcha_verifier,
    get_notification_dispatcher,
    get_session,
)
from app.core.captcha.verifier import CaptchaResult, CaptchaVerifier
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import ChannelType, DeliveryResult
from app.main import create_app

DEV_TOKEN = "DEV_TOKEN"

pytestmark = pytest.mark.integration


class _FakeRedis:
    def __init__(self) -> None:
        self.counts: dict[str, int] = {}
        self.ttls: dict[str, int] = {}

    def pipeline(self) -> _FakePipeline:
        return _FakePipeline(self)

    async def expire(self, key: str, seconds: int) -> bool:
        self.ttls[key] = seconds
        return True

    async def ping(self) -> bool:
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
        for op, key, _ in self._ops:
            if op == "incr":
                new_value = self._redis.counts.get(key, 0) + 1
                self._redis.counts[key] = new_value
                results.append(new_value)
            elif op == "ttl":
                results.append(self._redis.ttls.get(key, -1))
        return results


class _RecordingDispatcher(NotificationDispatcher):
    def __init__(self) -> None:
        super().__init__(channels={}, founder_telegram_chat_id=None)
        self.founder_calls: list[tuple[str, str]] = []

    async def notify_founder(self, kind, message):  # type: ignore[override,no-untyped-def]
        self.founder_calls.append((kind.value, message.title))
        return DeliveryResult(delivered=True, channel=ChannelType.telegram, recipient="test-chat")


@pytest_asyncio.fixture
async def app(_postgres_container: str, db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session() -> AsyncIterator:
        yield db_session

    dispatcher = _RecordingDispatcher()
    fastapi_app.state.test_dispatcher = dispatcher
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: dispatcher
    fastapi_app.state.redis = _FakeRedis()
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


# --- happy path per kind -----------------------------------------------------


@pytest.mark.parametrize(
    ("kind", "extras"),
    [
        (
            "source_request",
            {"source_name": "instagram", "source_url": "https://instagram.com/foo"},
        ),
        ("feature_request", {"checkboxes": {"yclients": True}}),
        ("bug", {"message": "Кнопка не нажимается"}),
        ("general", {"message": "Спасибо!"}),
    ],
    ids=["source", "feature", "bug", "general"],
)
async def test_feedback_happy_path(client: httpx.AsyncClient, kind: str, extras: dict) -> None:
    payload = {
        "type": kind,
        "checkboxes": extras.get("checkboxes", {}),
        "consent_given": True,
        "captcha_token": DEV_TOKEN,
        **{k: v for k, v in extras.items() if k != "checkboxes"},
    }
    resp = await client.post("/api/feedback", json=payload)
    assert resp.status_code == 202, resp.text
    body = resp.json()
    assert body["ok"] is True
    assert "feedback_id" in body["data"]


# --- validation failures -----------------------------------------------------


async def test_feedback_consent_required(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/feedback",
        json={
            "type": "general",
            "message": "test",
            "checkboxes": {},
            "consent_given": False,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "consent_required"


async def test_feedback_invalid_captcha(app: FastAPI, client: httpx.AsyncClient) -> None:
    class _Rejecting(CaptchaVerifier):
        def __init__(self) -> None:
            super().__init__(server_key=None, dev_mode=False)

        async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
            return CaptchaResult(is_valid=False, reason="forced")

    app.dependency_overrides[get_captcha_verifier] = _Rejecting

    resp = await client.post(
        "/api/feedback",
        json={
            "type": "general",
            "message": "test",
            "checkboxes": {},
            "consent_given": True,
            "captcha_token": "x",
        },
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_captcha"


async def test_feedback_invalid_type_returns_422(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/feedback",
        json={
            "type": "unknown_kind",
            "checkboxes": {},
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 422


async def test_feedback_extra_fields_rejected(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/feedback",
        json={
            "type": "general",
            "checkboxes": {},
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
            "evil_extra": "<script>",
        },
    )
    assert resp.status_code == 422


# --- rate limit --------------------------------------------------------------


async def test_feedback_rate_limit_blocks_after_budget(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    payload = {
        "type": "general",
        "message": "ping",
        "checkboxes": {},
        "consent_given": True,
        "captcha_token": DEV_TOKEN,
    }
    for _ in range(feedback_rate_limiter.limit):
        ok = await client.post("/api/feedback", json=payload)
        assert ok.status_code == 202

    blocked = await client.post("/api/feedback", json=payload)
    assert blocked.status_code == 429
    assert blocked.json()["error"] == "rate_limited"


# --- persistence side-effect -------------------------------------------------


async def test_feedback_persistence_writes_row_and_notifies(
    app: FastAPI,
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    from sqlalchemy import select

    from app.infrastructure.postgres.models import Feedback

    resp = await client.post(
        "/api/feedback",
        json={
            "type": "source_request",
            "source_name": "instagram",
            "source_url": "https://instagram.com/foo",
            "checkboxes": {"instagram": True},
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 202

    rows = (await db_session.execute(select(Feedback))).scalars().all()
    assert len(rows) == 1
    row = rows[0]
    assert row.type == "source_request"
    assert row.source_name == "instagram"
    # source_url is stashed inside the JSONB payload, not a column.
    assert row.checkboxes.get("_source_url") == "https://instagram.com/foo"
    assert row.checkboxes.get("instagram") is True

    test_dispatcher = app.state.test_dispatcher
    assert len(test_dispatcher.founder_calls) == 1
    kind, title = test_dispatcher.founder_calls[0]
    assert kind == "application_received"
    assert title.startswith("📋 Waitlist: instagram")


async def test_feedback_records_anonymous_consent(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    """T6.1: every PII-collecting form lands a Consent row, even when
    the subject is anonymous (waitlist signup with no user account)."""
    from sqlalchemy import select

    from app.infrastructure.postgres.models import Consent

    resp = await client.post(
        "/api/feedback",
        json={
            "type": "feature_request",
            "email": "alice@example.com",
            "message": "Хочу blog module",
            "checkboxes": {},
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 202

    consents = (await db_session.execute(select(Consent))).scalars().all()
    assert len(consents) == 1
    row = consents[0]
    assert row.user_id is None  # feedback is anonymous
    assert row.policy_version == 1
    assert "ИП «Vitrina»" in row.consent_text
    # IP / user_agent are best-effort — the test client doesn't supply a
    # `X-Forwarded-For`, but the user_agent header is set by httpx so
    # we assert at least that landed.
    assert row.user_agent is not None


# ===========================================================================
# Vote-first surface (canon 0.9.x) — RETIRED July 2026
# ===========================================================================


async def test_tally_endpoint_removed(client: httpx.AsyncClient) -> None:
    resp = await client.get("/api/feedback/tally")
    assert resp.status_code == 404


async def test_votes_payload_rejected_as_422(client: httpx.AsyncClient) -> None:
    """A stale vote-first client gets a validation error, not a silent write —
    the smart-union routing was removed with the retire."""
    resp = await client.post(
        "/api/feedback",
        json={"votes": [{"kind": "source", "key": "vk"}], "contact": "@late_voter"},
    )
    assert resp.status_code == 422
