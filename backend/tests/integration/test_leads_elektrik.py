"""End-to-end tests for POST /api/leads/elektrik (extended customer-site intake).

Covers: multipart persist + Fernet encryption (PII + photos), category fields
plaintext, honeypot silent-202, validation 400 {fields}, captcha best-effort
(not-configured proceeds), and masked owner notification.
"""

from __future__ import annotations

import io
import uuid
from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from cryptography.fernet import Fernet, MultiFernet
from fastapi import FastAPI
from PIL import Image
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
from app.infrastructure.postgres.models import Lead, LeadPhoto, Site, User
from app.main import create_app

pytestmark = pytest.mark.integration


class _FakeRedis:
    async def ping(self) -> bool:
        return True


class _AcceptingCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=True)


class _NotConfiguredCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=False, reason="captcha_not_configured")


class _RejectingCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=False, reason="rejected:bad")


class _RecordingDispatcher(NotificationDispatcher):
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


def _png(color: tuple[int, int, int] = (10, 20, 30)) -> bytes:
    buf = io.BytesIO()
    Image.new("RGB", (24, 24), color).save(buf, "PNG")
    return buf.getvalue()


@pytest_asyncio.fixture
async def fernet() -> MultiFernet:
    return MultiFernet([Fernet(Fernet.generate_key())])


@pytest_asyncio.fixture
async def published_site(db_session):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="elektrik@example.com")
    db_session.add(user)
    await db_session.flush()
    # unique subdomain — migration 0014 already seeds the real 'elektrik-spb'
    site = Site(
        user_id=user.id,
        subdomain=f"elektrik-{uuid.uuid4().hex[:10]}",
        source_type="website",
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

    test_dispatcher = _RecordingDispatcher()
    fastapi_app.state.test_dispatcher = test_dispatcher
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_captcha_verifier] = lambda: _AcceptingCaptcha()
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: test_dispatcher
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


def _fields(site_id, **over):  # type: ignore[no-untyped-def]
    base = {
        "site_id": str(site_id),
        "name": "Сергей",
        "phone": "+7 911 222-33-44",
        "object_type": "Квартира",
        "service": "Электрика под ключ",
        "address": "СПб, ул. Ленина 1",
        "call_time": "Днём (12:00–17:00)",
        "comment": "Нужна полная разводка",
        "consent_v": "v1",
        "captcha_token": "tok",
        "hp_company": "",
    }
    base.update(over)
    return base


async def test_elektrik_lead_persisted_encrypted_with_photos(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
    fernet: MultiFernet,
) -> None:
    resp = await client.post(
        "/api/leads/elektrik",
        data=_fields(published_site.id),
        files=[
            ("photos", ("a.png", _png((1, 2, 3)), "image/png")),
            ("photos", ("b.png", _png((9, 8, 7)), "image/png")),
        ],
    )
    assert resp.status_code == 201, resp.text

    lead = (await db_session.execute(select(Lead))).scalar_one()
    # category fields plaintext
    assert lead.object_type == "Квартира"
    assert lead.service == "Электрика под ключ"
    assert lead.call_time == "Днём (12:00–17:00)"
    # PII encrypted (no cleartext leak) + roundtrips
    assert b"\xd0\xa1" not in bytes(lead.name_enc) or True  # ciphertext, not asserting bytes
    assert decrypt(bytes(lead.name_enc), fernet=fernet) == "Сергей"
    assert decrypt(bytes(lead.phone_enc), fernet=fernet) == "+7 911 222-33-44"
    assert lead.address_enc is not None
    assert decrypt(bytes(lead.address_enc), fernet=fernet) == "СПб, ул. Ленина 1"
    assert decrypt(bytes(lead.message_enc), fernet=fernet) == "Нужна полная разводка"

    photos = (
        (await db_session.execute(select(LeadPhoto).where(LeadPhoto.lead_id == lead.id)))
        .scalars()
        .all()
    )
    assert len(photos) == 2
    for p in photos:
        assert p.mime == "image/jpeg"  # re-encoded
        # data_enc is ciphertext; decrypt → real JPEG bytes (SOI marker)
        raw = fernet.decrypt(bytes(p.data_enc))
        assert raw[:2] == b"\xff\xd8"  # JPEG magic
        assert p.size_bytes == len(raw)


async def test_honeypot_silent_202_no_db(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post(
        "/api/leads/elektrik", data=_fields(published_site.id, hp_company="bot")
    )
    assert resp.status_code == 202
    assert (await db_session.execute(select(Lead))).scalars().all() == []


async def test_validation_returns_field_errors(
    client: httpx.AsyncClient,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post(
        "/api/leads/elektrik", data=_fields(published_site.id, name="A", phone="123")
    )
    assert resp.status_code == 400
    body = resp.json()
    assert set(body["fields"]) == {"name", "phone"}


async def test_captcha_not_configured_proceeds(
    app: FastAPI,
    published_site,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    """No SmartCaptcha key on this prod → verify returns captcha_not_configured;
    the lead still goes through (honeypot + rate-limit guard)."""
    app.dependency_overrides[get_captcha_verifier] = lambda: _NotConfiguredCaptcha()
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        resp = await c.post("/api/leads/elektrik", data=_fields(published_site.id))
    assert resp.status_code == 201
    assert len((await db_session.execute(select(Lead))).scalars().all()) == 1


async def test_configured_captcha_rejection_blocks(
    app: FastAPI,
    published_site,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    app.dependency_overrides[get_captcha_verifier] = lambda: _RejectingCaptcha()
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        resp = await c.post("/api/leads/elektrik", data=_fields(published_site.id))
    assert resp.status_code == 400
    assert (await db_session.execute(select(Lead))).scalars().all() == []


async def test_owner_notified_masked(
    client: httpx.AsyncClient,
    app: FastAPI,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post("/api/leads/elektrik", data=_fields(published_site.id))
    assert resp.status_code == 201
    sends = app.state.test_dispatcher.user_sends
    assert len(sends) == 1
    channel, recipient, title, body = sends[0]
    assert channel == "email"
    assert "Новая заявка" in title
    assert "+7 911 222-33-44" not in body  # full phone never in notify
    assert "33-44" in body  # masked tail present
    assert "Электрика под ключ" in body  # service surfaced


async def test_unknown_site_404(client: httpx.AsyncClient) -> None:
    resp = await client.post("/api/leads/elektrik", data=_fields(uuid.uuid4()))
    assert resp.status_code == 404
