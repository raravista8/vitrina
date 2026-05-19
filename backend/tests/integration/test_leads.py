"""End-to-end tests for POST /api/leads (T5.2, FR-050 / FR-052)."""

from __future__ import annotations

from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from cryptography.fernet import Fernet, MultiFernet
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import (
    get_captcha_verifier,
    get_lead_fernet,
    get_notification_dispatcher,
    get_session,
    leads_daily_rate_limiter,
    leads_hourly_rate_limiter,
)
from app.core.captcha.verifier import CaptchaResult
from app.core.leads.encryption import decrypt
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import DeliveryResult
from app.infrastructure.postgres.models import Lead, Site, User
from app.main import create_app

DEV_TOKEN = "DEV_TOKEN"

pytestmark = pytest.mark.integration


# --- fakes ----------------------------------------------------------------


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


class _AcceptingCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=True)


class _RejectingCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=False, reason="test_rejection")


class _RecordingDispatcher(NotificationDispatcher):
    """Captures notify_user calls so tests can assert masked PII
    landed on the right contact channel."""

    def __init__(self) -> None:
        super().__init__(channels={}, founder_telegram_chat_id=None)
        self.user_sends: list[tuple[str, str, str, str]] = []

    async def notify_user(self, contact, kind, message):  # type: ignore[override,no-untyped-def]
        self.user_sends.append(
            (contact.primary_type.value, contact.primary_value, message.title, message.body)
        )
        return DeliveryResult(
            delivered=True, channel=contact.primary_type, recipient=contact.primary_value
        )


# --- fixtures -------------------------------------------------------------


@pytest_asyncio.fixture
async def fernet() -> MultiFernet:
    return MultiFernet([Fernet(Fernet.generate_key())])


@pytest_asyncio.fixture
async def published_site(db_session):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="owner@example.com")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="anna",
        source_type="ymaps",
        status="published",
    )
    db_session.add(site)
    await db_session.commit()
    return site


@pytest_asyncio.fixture
async def app(db_session, fernet) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fastapi_app.state.lead_fernet = fernet
    fastapi_app.state.redis = _FakeRedis()
    test_dispatcher = _RecordingDispatcher()
    fastapi_app.state.test_dispatcher = test_dispatcher
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_captcha_verifier] = lambda: _AcceptingCaptcha()
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: test_dispatcher
    # Default: rate limits disabled. Tests that exercise them re-attach.
    fastapi_app.dependency_overrides[leads_hourly_rate_limiter] = lambda: None
    fastapi_app.dependency_overrides[leads_daily_rate_limiter] = lambda: None

    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


def _payload(site_id, **overrides):  # type: ignore[no-untyped-def]
    base = {
        "site_id": str(site_id),
        "name": "Анна Иванова",
        "phone": "+7 921 123-45-67",
        "message": "Запишите на маникюр в субботу",
        "captcha_token": DEV_TOKEN,
    }
    base.update(overrides)
    return base


# --- happy path -----------------------------------------------------------


async def test_lead_persisted_encrypted(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
    fernet: MultiFernet,
) -> None:
    resp = await client.post("/api/leads", json=_payload(published_site.id))
    assert resp.status_code == 202, resp.text

    body = resp.json()
    assert body["ok"] is True
    lead_id = body["data"]["lead_id"]

    rows = (await db_session.execute(select(Lead))).scalars().all()
    assert len(rows) == 1
    row = rows[0]
    assert str(row.id) == lead_id
    assert row.site_id == published_site.id

    # The BYTEA columns are ciphertext — no cleartext leak.
    assert isinstance(row.name_enc, bytes | bytearray)
    assert "Анна".encode() not in bytes(row.name_enc)
    assert b"921" not in bytes(row.phone_enc)
    # Roundtrip with the same Fernet recovers the plaintext.
    assert decrypt(bytes(row.name_enc), fernet=fernet) == "Анна Иванова"
    assert decrypt(bytes(row.phone_enc), fernet=fernet) == "+7 921 123-45-67"
    assert row.message_enc is not None
    assert decrypt(bytes(row.message_enc), fernet=fernet) == "Запишите на маникюр в субботу"


async def test_lead_without_message_skips_message_enc(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post(
        "/api/leads",
        json=_payload(published_site.id, message=None),
    )
    assert resp.status_code == 202
    row = (await db_session.execute(select(Lead))).scalar_one()
    assert row.message_enc is None


# --- security gates -------------------------------------------------------


async def test_honeypot_silently_succeeds_no_db_write(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    """Bots that fill the hidden field get a 202 + no DB row."""
    resp = await client.post(
        "/api/leads",
        json=_payload(published_site.id, honeypot="i am a bot"),
    )
    assert resp.status_code == 202
    rows = (await db_session.execute(select(Lead))).scalars().all()
    assert rows == []


async def test_invalid_captcha_rejected(
    app: FastAPI,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    app.dependency_overrides[get_captcha_verifier] = lambda: _RejectingCaptcha()
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        resp = await c.post("/api/leads", json=_payload(published_site.id))
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_captcha"
    rows = (await db_session.execute(select(Lead))).scalars().all()
    assert rows == []


async def test_lead_on_unknown_site_returns_404(
    client: httpx.AsyncClient,
) -> None:
    import uuid

    resp = await client.post("/api/leads", json=_payload(uuid.uuid4()))
    assert resp.status_code == 404


async def test_lead_on_unpublished_site_returns_400(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    user = User(contact_type="email", contact_value="x@y.test")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="draft",
        source_type="ymaps",
        status="review",
    )
    db_session.add(site)
    await db_session.commit()

    resp = await client.post("/api/leads", json=_payload(site.id))
    assert resp.status_code == 400
    assert resp.json()["error"] == "site_not_published"


async def test_extra_fields_rejected(
    client: httpx.AsyncClient,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    payload = _payload(published_site.id)
    payload["evil_marker"] = "hi"
    resp = await client.post("/api/leads", json=payload)
    assert resp.status_code == 422


async def test_pydantic_field_caps_enforced(
    client: httpx.AsyncClient,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    """Phone field has min_length=4; ``1`` should 422 instead of
    reaching the service."""
    resp = await client.post(
        "/api/leads",
        json=_payload(published_site.id, phone="1"),
    )
    assert resp.status_code == 422


# --- owner notification (T5.4) -------------------------------------------


async def test_owner_notified_with_masked_pii(
    client: httpx.AsyncClient,
    app: FastAPI,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    """On a successful lead, the site owner gets a notification with
    name/phone masked. The dispatcher never sees the cleartext that's
    in the DB ciphertext, but does see masked text in the message
    body (so the owner can recognise the lead in their inbox)."""
    resp = await client.post("/api/leads", json=_payload(published_site.id))
    assert resp.status_code == 202

    dispatcher = app.state.test_dispatcher
    assert len(dispatcher.user_sends) == 1
    channel, recipient, title, body = dispatcher.user_sends[0]
    assert channel == "email"  # seeded site owner uses email contact
    assert recipient == "owner@example.com"
    assert "Новая заявка" in title
    # Full PII MUST NOT land in the dispatcher payload
    assert "+7 921 123-45-67" not in body
    assert "Иванова" not in body  # last name fully hidden
    # Masked variants MUST be there for the owner to recognise the lead
    assert "Анна И." in body
    assert "45-67" in body  # last 4 digits exposed by mask_phone
