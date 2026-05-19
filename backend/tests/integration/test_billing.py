"""End-to-end tests for /api/billing/* (T9.1).

Covers:

  - POST /checkout creates a trial subscription + returns confirmation URL
  - Duplicate checkout while active → 409
  - Cancel marks subscription cancelled (idempotent)
  - Webhook payment.succeeded promotes trial → active
  - Webhook idempotency: same event id processed once
  - Webhook IP allowlist + signature gates
  - Lookup of non-existent user returns 404 (anti-enumeration)
"""

from __future__ import annotations

import hashlib
import hmac
import json
from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import (
    application_rate_limiter,
    get_payment_gateway,
    get_session,
)
from app.config import get_settings
from app.core.billing.ports import (
    CreatedPayment,
    PaymentGatewayError,
    RecurringCharge,
)
from app.infrastructure.postgres.models import (
    BillingEvent,
    Subscription,
    User,
)
from app.main import create_app

pytestmark = pytest.mark.integration


# --- fake gateway --------------------------------------------------------


class _FakeGateway:
    provider_name = "yookassa-fake"

    def __init__(
        self,
        *,
        available: bool = True,
        confirmation_url: str = "https://yookassa.ru/checkout/pay_999",
        raise_on_create: Exception | None = None,
    ) -> None:
        self._available = available
        self._confirmation_url = confirmation_url
        self._raise = raise_on_create
        self.create_calls: list[dict[str, object]] = []
        self.charge_calls: list[dict[str, object]] = []

    def is_available(self) -> bool:
        return self._available

    async def create_payment(
        self,
        *,
        amount_kopeks: int,
        currency: str,
        return_url: str,
        description: str,
        idempotency_key: str,
        save_payment_method: bool = True,
    ) -> CreatedPayment:
        self.create_calls.append(
            {
                "amount_kopeks": amount_kopeks,
                "currency": currency,
                "return_url": return_url,
                "description": description,
                "idempotency_key": idempotency_key,
                "save_payment_method": save_payment_method,
            }
        )
        if self._raise is not None:
            raise self._raise
        return CreatedPayment(
            provider_payment_id="pay_999",
            confirmation_url=self._confirmation_url,
            status="pending",
        )

    async def charge_recurring(
        self,
        *,
        amount_kopeks: int,
        currency: str,
        payment_method_id: str,
        description: str,
        idempotency_key: str,
    ) -> RecurringCharge:
        self.charge_calls.append({"payment_method_id": payment_method_id})
        return RecurringCharge(provider_payment_id="r-1", status="succeeded")


# --- fixtures ------------------------------------------------------------


@pytest_asyncio.fixture
async def app_with_gateway(db_session) -> AsyncIterator[tuple[FastAPI, _FakeGateway]]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    gateway = _FakeGateway()
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_payment_gateway] = lambda: gateway
    # Disable rate-limit on checkout/cancel routes (re-uses the
    # applications budget which is 3/h/IP — we POST multiple times).
    fastapi_app.dependency_overrides[application_rate_limiter] = lambda: None

    try:
        yield fastapi_app, gateway
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app_with_gateway) -> AsyncIterator[httpx.AsyncClient]:  # type: ignore[no-untyped-def]
    app, _ = app_with_gateway
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest_asyncio.fixture
async def seeded_user(db_session):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="anna@example.com")
    db_session.add(user)
    await db_session.commit()
    return user


# --- checkout ------------------------------------------------------------


async def test_checkout_creates_trial_and_returns_confirmation_url(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
    app_with_gateway,  # type: ignore[no-untyped-def]
) -> None:
    _, gateway = app_with_gateway
    resp = await client.post(
        "/api/billing/checkout",
        json={
            "contact": "anna@example.com",
            "return_url": "https://vitrina.site/billing/done",
        },
    )
    assert resp.status_code == 200, resp.text
    payload = resp.json()["data"]
    assert payload["confirmation_url"].startswith("https://yookassa.ru/checkout/")

    subs = (await db_session.execute(select(Subscription))).scalars().all()
    assert len(subs) == 1
    assert subs[0].user_id == seeded_user.id
    assert subs[0].status == "trial"
    assert subs[0].amount_kopeks == 99_000

    assert len(gateway.create_calls) == 1
    assert gateway.create_calls[0]["return_url"] == "https://vitrina.site/billing/done"


async def test_checkout_for_unknown_contact_returns_404(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/billing/checkout",
        json={"contact": "ghost@nowhere.test", "return_url": "https://x"},
    )
    assert resp.status_code == 404


async def test_checkout_with_invalid_contact_returns_404(client: httpx.AsyncClient) -> None:
    """Anti-enumeration: even bad contacts get the same 404 as
    missing accounts."""
    resp = await client.post(
        "/api/billing/checkout",
        json={"contact": "not a contact!", "return_url": "https://x"},
    )
    assert resp.status_code == 404


async def test_checkout_for_active_user_returns_409(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    # Pre-seed an active subscription
    from datetime import UTC, datetime, timedelta

    sub = Subscription(
        user_id=seeded_user.id,
        status="active",
        trial_ends_at=datetime.now(UTC) - timedelta(days=10),
        current_period_end=datetime.now(UTC) + timedelta(days=20),
    )
    db_session.add(sub)
    await db_session.commit()

    resp = await client.post(
        "/api/billing/checkout",
        json={"contact": "anna@example.com", "return_url": "https://x"},
    )
    assert resp.status_code == 409
    assert resp.json()["error"] == "already_active"


async def test_checkout_with_unavailable_gateway_returns_503(
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    fastapi_app = create_app()
    gateway = _FakeGateway(available=False)

    async def _override_session():
        yield db_session

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_payment_gateway] = lambda: gateway
    fastapi_app.dependency_overrides[application_rate_limiter] = lambda: None

    transport = httpx.ASGITransport(app=fastapi_app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post(
            "/api/billing/checkout",
            json={"contact": "anna@example.com", "return_url": "https://x"},
        )
    assert resp.status_code == 503


async def test_checkout_gateway_failure_returns_409(
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    fastapi_app = create_app()
    gateway = _FakeGateway(raise_on_create=PaymentGatewayError("upstream_bad"))

    async def _override_session():
        yield db_session

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_payment_gateway] = lambda: gateway
    fastapi_app.dependency_overrides[application_rate_limiter] = lambda: None

    transport = httpx.ASGITransport(app=fastapi_app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post(
            "/api/billing/checkout",
            json={"contact": "anna@example.com", "return_url": "https://x"},
        )
    assert resp.status_code == 409
    assert "gateway_failed" in resp.json()["error"]


# --- cancel --------------------------------------------------------------


async def test_cancel_marks_subscription_cancelled(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    # Bootstrap a trial subscription first.
    await client.post(
        "/api/billing/checkout",
        json={"contact": "anna@example.com", "return_url": "https://x"},
    )

    resp = await client.post(
        "/api/billing/cancel",
        json={"contact": "anna@example.com", "reason": "no_longer_needed"},
    )
    assert resp.status_code == 200, resp.text
    body = resp.json()["data"]
    assert body["status"] == "cancelled"

    sub = (await db_session.execute(select(Subscription))).scalar_one()
    assert sub.cancel_reason == "no_longer_needed"
    assert sub.cancelled_at is not None


async def test_cancel_is_idempotent(
    client: httpx.AsyncClient,
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    await client.post(
        "/api/billing/checkout",
        json={"contact": "anna@example.com", "return_url": "https://x"},
    )
    r1 = await client.post("/api/billing/cancel", json={"contact": "anna@example.com"})
    r2 = await client.post("/api/billing/cancel", json={"contact": "anna@example.com"})
    assert r1.status_code == 200
    assert r2.status_code == 200
    assert r2.json()["data"]["status"] == "cancelled"


async def test_cancel_no_subscription_returns_409(
    client: httpx.AsyncClient,
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post("/api/billing/cancel", json={"contact": "anna@example.com"})
    assert resp.status_code == 409
    assert resp.json()["error"] == "no_subscription"


# --- webhook -------------------------------------------------------------


async def test_webhook_payment_succeeded_promotes_to_active(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    await client.post(
        "/api/billing/checkout",
        json={"contact": "anna@example.com", "return_url": "https://x"},
    )
    sub = (await db_session.execute(select(Subscription))).scalar_one()

    event_payload = {
        "event": "payment.succeeded",
        "object": {
            "id": "evt-1",
            "amount": {"value": "990.00", "currency": "RUB"},
            "payment_method": {"id": "pm-saved-1"},
            "metadata": {"user_id": str(seeded_user.id)},
        },
    }
    resp = await client.post("/api/billing/webhook", json=event_payload)
    assert resp.status_code == 200, resp.text
    body = resp.json()["data"]
    assert body["handled"] is True
    assert body["new_status"] == "active"

    await db_session.refresh(sub)
    assert sub.status == "active"
    assert sub.payment_method_id == "pm-saved-1"
    assert sub.last_payment_at is not None


async def test_webhook_duplicate_event_idempotent(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    await client.post(
        "/api/billing/checkout",
        json={"contact": "anna@example.com", "return_url": "https://x"},
    )
    payload = {
        "event": "payment.succeeded",
        "object": {
            "id": "evt-dup-1",
            "amount": {"value": "990.00", "currency": "RUB"},
            "payment_method": {"id": "pm-1"},
            "metadata": {"user_id": str(seeded_user.id)},
        },
    }
    first = await client.post("/api/billing/webhook", json=payload)
    second = await client.post("/api/billing/webhook", json=payload)
    assert first.status_code == 200
    assert second.status_code == 200
    assert second.json()["data"]["duplicate"] is True

    # Only one BillingEvent row landed.
    events = (await db_session.execute(select(BillingEvent))).scalars().all()
    assert len(events) == 1


async def test_webhook_unknown_event_type_acknowledged(
    client: httpx.AsyncClient,
    seeded_user,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post(
        "/api/billing/webhook",
        json={"event": "some.unknown.event", "object": {"id": "x"}},
    )
    assert resp.status_code == 200
    assert resp.json()["data"]["handled"] is False


async def test_webhook_ip_not_in_allowlist_rejected(
    client: httpx.AsyncClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        get_settings(),
        "yookassa_webhook_ip_allowlist",
        "185.71.76.0/27",
    )
    # httpx ASGI test client doesn't carry a real source IP; we simulate
    # via X-Forwarded-For (the dependencies module reads it via
    # `get_client_ip`).
    resp = await client.post(
        "/api/billing/webhook",
        json={"event": "payment.succeeded", "object": {"id": "x"}},
        headers={"X-Forwarded-For": "1.2.3.4"},
    )
    assert resp.status_code == 403


async def test_webhook_signature_required_when_secret_set(
    client: httpx.AsyncClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        get_settings(),
        "yookassa_webhook_secret",
        "shared-secret-1",  # pragma: allowlist secret
    )
    raw_body = json.dumps({"event": "payment.succeeded", "object": {"id": "y"}})
    # No signature header → reject
    resp_unsigned = await client.post("/api/billing/webhook", content=raw_body.encode("utf-8"))
    assert resp_unsigned.status_code == 403

    expected = hmac.new(
        b"shared-secret-1",
        raw_body.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    resp_signed = await client.post(
        "/api/billing/webhook",
        content=raw_body.encode("utf-8"),
        headers={"Content-Signature": expected},
    )
    assert resp_signed.status_code == 200
