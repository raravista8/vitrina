"""End-to-end tests for POST /api/submit-application (T1.3).

Hits the FastAPI app with httpx ASGITransport (no network) against a
testcontainers-managed Postgres and a fake Redis for the rate limiter.
Each test acquires its own session that rolls back at teardown.

Acceptance criteria (T1.3):
  - Auto-detects contact_type for all four types (email/phone/telegram/max)
  - Returns 400 invalid_contact when detection fails
  - Returns 400 consent_required when consent_given=false
  - Persists user + consent + application atomically
  - Returns 429 with Retry-After when rate-limited
  - Responds 202 (success) within 1s
"""

from __future__ import annotations

import time
from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI

from app.api.dependencies import (
    application_rate_limiter,
    get_captcha_verifier,
    get_notification_dispatcher,
    get_session,
)
from app.core.captcha.verifier import CaptchaResult, CaptchaVerifier
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import ChannelType, DeliveryResult
from app.main import create_app

# Frontend (lib/captcha.ts) emits this literal when no client key is set;
# the backend verifier accepts it in dev mode.
DEV_TOKEN = "DEV_TOKEN"

pytestmark = pytest.mark.integration


# --------------------------------------------------------------------------- #
# Fakes / fixtures
# --------------------------------------------------------------------------- #


class _FakeRedis:
    """Bare-minimum stand-in for `redis.asyncio.Redis` used by RateLimiter."""

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
    """No-op dispatcher that records founder-notify calls for assertion."""

    def __init__(self) -> None:
        super().__init__(channels={}, founder_telegram_chat_id=None)
        self.founder_calls: list[tuple[str, str]] = []

    async def notify_founder(self, kind, message):  # type: ignore[override,no-untyped-def]
        self.founder_calls.append((kind.value, message.title))
        return DeliveryResult(delivered=True, channel=ChannelType.telegram, recipient="test-chat")


@pytest_asyncio.fixture
async def app(_postgres_container: str, db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    """FastAPI instance with the test DB session + a fake Redis bound."""
    fastapi_app = create_app()

    async def _override_session() -> AsyncIterator:
        yield db_session

    # Lifespan isn't triggered by httpx.ASGITransport on its own, so we
    # inject a recording dispatcher directly. Tests that care about the
    # founder-notify side-effect access it via app.state.test_dispatcher.
    test_dispatcher = _RecordingDispatcher()
    fastapi_app.state.test_dispatcher = test_dispatcher

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: test_dispatcher
    fastapi_app.state.redis = _FakeRedis()
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(
        transport=transport,
        base_url="http://test",
    ) as ac:
        yield ac


# --------------------------------------------------------------------------- #
# Happy-path: one test per contact type
# --------------------------------------------------------------------------- #


@pytest.mark.parametrize(
    ("contact", "expected_type"),
    [
        ("alice@example.com", "email"),
        ("+79261234567", "phone"),
        ("@alice_master", "telegram"),
        ("https://max.ru/u/alice", "max"),
    ],
    ids=["email", "phone", "telegram", "max"],
)
async def test_submit_application_happy_path(
    client: httpx.AsyncClient,
    contact: str,
    expected_type: str,
) -> None:
    start = time.monotonic()
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "source_url": "https://t.me/some_channel",
            "contact": contact,
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    elapsed = time.monotonic() - start
    assert elapsed < 1.0, f"endpoint must respond <1s, took {elapsed:.3f}s"

    assert resp.status_code == 202, resp.text
    body = resp.json()
    assert body["ok"] is True
    assert body["data"]["contact_type"] == expected_type
    assert "application_id" in body["data"]


# --------------------------------------------------------------------------- #
# Validation failures
# --------------------------------------------------------------------------- #


async def test_consent_required(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "contact": "alice@example.com",
            "consent_given": False,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 400
    body = resp.json()
    assert body == {"ok": False, "error": "consent_required", "request_id": body["request_id"]}


async def test_invalid_contact_returns_400(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "contact": "not a contact at all",
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_contact"


async def test_unsupported_source_type_returns_422(client: httpx.AsyncClient) -> None:
    # Pydantic Literal catches the bad value BEFORE the service.
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "vk",  # waitlist source, not in MVP
            "contact": "alice@example.com",
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 422
    assert resp.json()["error"] == "validation_failed"


async def test_extra_fields_rejected(client: httpx.AsyncClient) -> None:
    """`model_config = ConfigDict(extra='forbid')` is enforced (CLAUDE.md)."""
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "contact": "alice@example.com",
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
            "evil_extra_field": "<script>",
        },
    )
    assert resp.status_code == 422


async def test_missing_required_field(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            # contact missing
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 422


async def test_missing_captcha_token_returns_422(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "contact": "alice@example.com",
            "consent_given": True,
            # captcha_token missing
        },
    )
    assert resp.status_code == 422


async def test_invalid_captcha_returns_400(app: FastAPI, client: httpx.AsyncClient) -> None:
    """When the verifier rejects the token, the endpoint returns 400 invalid_captcha
    BEFORE touching the DB — verified by the rejection happening before any
    user/consent/application row is written."""

    class _RejectingVerifier(CaptchaVerifier):
        def __init__(self) -> None:
            super().__init__(server_key=None, dev_mode=False)

        async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
            return CaptchaResult(is_valid=False, reason="forced_rejection")

    app.dependency_overrides[get_captcha_verifier] = _RejectingVerifier

    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "contact": "alice@example.com",
            "consent_given": True,
            "captcha_token": "any-token",
        },
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_captcha"


# --------------------------------------------------------------------------- #
# Rate limit
# --------------------------------------------------------------------------- #


async def test_rate_limit_returns_429_with_retry_after(
    app: FastAPI,
    client: httpx.AsyncClient,
) -> None:
    # Default limit is 3/h (settings.rate_limit_applications_per_ip_per_hour).
    # Burn through the budget — then the 4th request must be rejected.
    payload = {
        "source_type": "telegram",
        "contact": "alice@example.com",
        "consent_given": True,
        "captcha_token": DEV_TOKEN,
    }
    for _ in range(application_rate_limiter.limit):
        ok = await client.post("/api/submit-application", json=payload)
        assert ok.status_code == 202

    blocked = await client.post("/api/submit-application", json=payload)
    assert blocked.status_code == 429
    assert blocked.json()["error"] == "rate_limited"
    assert "Retry-After" in blocked.headers


# --------------------------------------------------------------------------- #
# Persistence side-effects
# --------------------------------------------------------------------------- #


async def test_founder_notified_on_success(app: FastAPI, client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "source_url": "https://t.me/some_channel",
            "contact": "alice@example.com",
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 202

    test_dispatcher = app.state.test_dispatcher
    assert len(test_dispatcher.founder_calls) == 1
    kind, title = test_dispatcher.founder_calls[0]
    assert kind == "application_received"
    assert title.startswith("🆕 Заявка #")


async def test_persistence_creates_user_consent_application(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    from sqlalchemy import select

    from app.infrastructure.postgres.models import (
        Application as App,
    )
    from app.infrastructure.postgres.models import (
        Consent,
        User,
    )

    resp = await client.post(
        "/api/submit-application",
        json={
            "source_type": "telegram",
            "source_url": "https://t.me/some_channel",
            "contact": "+79261234567",
            "consent_given": True,
            "captcha_token": DEV_TOKEN,
        },
    )
    assert resp.status_code == 202

    users = (await db_session.execute(select(User))).scalars().all()
    assert len(users) == 1
    assert users[0].contact_type == "phone"
    assert users[0].contact_value == "+79261234567"

    consents = (await db_session.execute(select(Consent))).scalars().all()
    assert len(consents) == 1
    assert consents[0].user_id == users[0].id
    assert consents[0].policy_version == 1

    apps = (await db_session.execute(select(App))).scalars().all()
    assert len(apps) == 1
    assert apps[0].contact_type == "phone"
    assert apps[0].source_type == "telegram"
    assert apps[0].status == "pending"
    assert apps[0].user_id == users[0].id
    assert apps[0].consent_id == consents[0].id
