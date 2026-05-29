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
# Vote-first modal (canon 0.9.0 / ADR-0009 rev.2) — POST votes[] + tally
# ===========================================================================


async def test_votes_happy_path(client: httpx.AsyncClient, db_session) -> None:  # type: ignore[no-untyped-def]
    from sqlalchemy import func, select

    from app.infrastructure.postgres.models import FeedbackSubmission, FeedbackVote

    resp = await client.post(
        "/api/feedback",
        json={
            "votes": [
                {"kind": "source", "key": "vk"},
                {"kind": "feature", "key": "custom_domain"},
            ],
            "name": "Аня",
            "contact": "@studia_anna",
        },
    )
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["ok"] is True
    assert body["data"]["accepted"] == 2
    assert body["data"]["tally"]["items"]["vk"] == 1
    assert body["data"]["tally"]["items"]["custom_domain"] == 1
    assert body["data"]["tally"]["total_week"] == 2

    sub_count = await db_session.scalar(select(func.count()).select_from(FeedbackSubmission))
    vote_count = await db_session.scalar(select(func.count()).select_from(FeedbackVote))
    assert sub_count == 1
    assert vote_count == 2
    # Raw IP is never persisted — only a hash (or NULL when no XFF header).
    sub = (await db_session.execute(select(FeedbackSubmission))).scalars().one()
    assert sub.contact == "@studia_anna"


async def test_votes_routing_disjoint_from_legacy(client: httpx.AsyncClient) -> None:
    """A votes payload routes to the votes path (200), a legacy payload to the
    legacy path (202) — the smart-union picks by disjoint required fields."""
    votes_resp = await client.post(
        "/api/feedback", json={"votes": [{"kind": "feature", "key": "blog"}]}
    )
    assert votes_resp.status_code == 200

    legacy_resp = await client.post(
        "/api/feedback",
        json={
            "type": "source_request",
            "source_name": "instagram",
            "checkboxes": {},
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert legacy_resp.status_code == 202


async def test_votes_dedupe_same_voter_same_key(client: httpx.AsyncClient, db_session) -> None:  # type: ignore[no-untyped-def]
    from sqlalchemy import func, select

    from app.infrastructure.postgres.models import FeedbackVote

    payload = {"votes": [{"kind": "source", "key": "vk"}], "contact": "@dup_user"}
    first = await client.post("/api/feedback", json=payload)
    assert first.status_code == 200
    second = await client.post("/api/feedback", json=payload)
    assert second.status_code == 200
    # Idempotent: the repeat is reported accepted but NOT double-counted.
    assert second.json()["data"]["accepted"] == 1
    assert second.json()["data"]["tally"]["items"]["vk"] == 1
    vote_count = await db_session.scalar(select(func.count()).select_from(FeedbackVote))
    assert vote_count == 1  # only the first insert persisted


async def test_votes_per_ip_cap(client: httpx.AsyncClient, db_session) -> None:  # type: ignore[no-untyped-def]
    from sqlalchemy import func, select

    from app.core.feedback.service import VOTE_PER_IP_HOURLY_CAP
    from app.infrastructure.postgres.models import FeedbackVote

    # 25 distinct keys from one IP, no contact → voter = ip_hash, no dedupe.
    # Cap clamps inserts to VOTE_PER_IP_HOURLY_CAP (20); the rest are dropped.
    votes = [{"kind": "feature", "key": f"opt-{i}"} for i in range(25)]
    resp = await client.post(
        "/api/feedback",
        json={"votes": votes},
        headers={"X-Forwarded-For": "203.0.113.7"},
    )
    assert resp.status_code == 200
    assert resp.json()["data"]["accepted"] == VOTE_PER_IP_HOURLY_CAP
    vote_count = await db_session.scalar(select(func.count()).select_from(FeedbackVote))
    assert vote_count == VOTE_PER_IP_HOURLY_CAP


async def test_votes_honeypot_silently_accepts(client: httpx.AsyncClient, db_session) -> None:  # type: ignore[no-untyped-def]
    from sqlalchemy import func, select

    from app.infrastructure.postgres.models import FeedbackVote

    resp = await client.post(
        "/api/feedback",
        json={"votes": [{"kind": "source", "key": "vk"}], "honeypot": "I am a bot"},
    )
    assert resp.status_code == 200
    assert resp.json()["data"]["accepted"] == 0
    vote_count = await db_session.scalar(select(func.count()).select_from(FeedbackVote))
    assert vote_count == 0  # nothing written


async def test_votes_threshold_alerts_founder_once(app: FastAPI, client: httpx.AsyncClient) -> None:
    dispatcher = app.state.test_dispatcher
    # 10 distinct voters all vote "vk". Each gets a distinct contact (→ distinct
    # voter for the tally) AND a distinct X-Forwarded-For so the per-IP request
    # rate-limiter (3/h/IP) doesn't trip — in production these are 10 real
    # people on 10 IPs, so this mirrors reality, not an abuse pattern.
    for i in range(10):
        resp = await client.post(
            "/api/feedback",
            json={"votes": [{"kind": "source", "key": "vk"}], "contact": f"@voter_{i}"},
            headers={"X-Forwarded-For": f"198.51.100.{i}"},
        )
        assert resp.status_code == 200, resp.text

    vk_alerts = [t for _, t in dispatcher.founder_calls if "vk" in t and "10" in t]
    assert len(vk_alerts) == 1  # fired exactly once on the 10th distinct voter

    # An 11th distinct voter must NOT re-alert.
    await client.post(
        "/api/feedback",
        json={"votes": [{"kind": "source", "key": "vk"}], "contact": "@voter_11"},
        headers={"X-Forwarded-For": "198.51.100.211"},
    )
    vk_alerts_after = [t for _, t in dispatcher.founder_calls if "vk" in t and "10" in t]
    assert len(vk_alerts_after) == 1


async def test_votes_own_source_creates_legacy_feedback_row(
    client: httpx.AsyncClient, db_session
) -> None:  # type: ignore[no-untyped-def]
    from sqlalchemy import select

    from app.infrastructure.postgres.models import Feedback

    resp = await client.post(
        "/api/feedback",
        json={
            "votes": [{"kind": "feature", "key": "stats"}],
            "own_source": "Тинькофф-витрина",
        },
    )
    assert resp.status_code == 200
    rows = (await db_session.execute(select(Feedback))).scalars().all()
    assert any(r.type == "source_request" and r.message == "Тинькофф-витрина" for r in rows)


async def test_tally_endpoint(client: httpx.AsyncClient) -> None:
    await client.post(
        "/api/feedback",
        json={"votes": [{"kind": "source", "key": "vk"}], "contact": "@a"},
    )
    await client.post(
        "/api/feedback",
        json={"votes": [{"kind": "source", "key": "vk"}], "contact": "@b"},
    )
    resp = await client.get("/api/feedback/tally")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["items"]["vk"] == 2
    assert data["total_week"] == 2


async def test_votes_invalid_kind_422(client: httpx.AsyncClient) -> None:
    resp = await client.post("/api/feedback", json={"votes": [{"kind": "bogus", "key": "vk"}]})
    assert resp.status_code == 422


async def test_votes_empty_list_422(client: httpx.AsyncClient) -> None:
    resp = await client.post("/api/feedback", json={"votes": []})
    assert resp.status_code == 422
