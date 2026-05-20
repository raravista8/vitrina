"""E9 acceptance smoke — walk through the full T9.1 happy path
end-to-end against testcontainers Postgres, then run an
adversarial cleanup (3 strikes → cancelled).

Different from the granular ``test_billing.py`` cases: this file
verifies the full state machine + DB + router stack in one go, the
way the founder would test against the ЮKassa sandbox before public
launch.
"""

from __future__ import annotations

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
from app.core.billing.ports import CreatedPayment, RecurringCharge
from app.infrastructure.postgres.models import (
    BillingEvent,
    Subscription,
    User,
)
from app.main import create_app

pytestmark = pytest.mark.integration


class _SmokeGateway:
    """Single-attempt fake — no per-test mutation, just records calls."""

    provider_name = "yookassa-smoke"

    def __init__(self) -> None:
        self.calls: list[dict[str, object]] = []

    def is_available(self) -> bool:
        return True

    async def create_payment(
        self,
        *,
        amount_kopeks: int,
        currency: str,
        return_url: str,
        description: str,
        idempotency_key: str,
        save_payment_method: bool = True,
        metadata: dict[str, str] | None = None,
    ) -> CreatedPayment:
        self.calls.append(
            {
                "kind": "create",
                "amount_kopeks": amount_kopeks,
                "metadata": metadata,
            }
        )
        return CreatedPayment(
            provider_payment_id="pay-smoke-1",
            confirmation_url="https://yookassa.ru/checkout/pay-smoke-1",
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
        self.calls.append({"kind": "recurring", "payment_method_id": payment_method_id})
        return RecurringCharge(provider_payment_id="r-smoke", status="succeeded")


@pytest_asyncio.fixture
async def app(db_session) -> AsyncIterator[tuple[FastAPI, _SmokeGateway]]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    gateway = _SmokeGateway()
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_payment_gateway] = lambda: gateway
    fastapi_app.dependency_overrides[application_rate_limiter] = lambda: None
    try:
        yield fastapi_app, gateway
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app) -> AsyncIterator[httpx.AsyncClient]:  # type: ignore[no-untyped-def]
    fastapi_app, _ = app
    transport = httpx.ASGITransport(app=fastapi_app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest_asyncio.fixture
async def user(db_session):  # type: ignore[no-untyped-def]
    u = User(contact_type="email", contact_value="founder@samosite.online")
    db_session.add(u)
    await db_session.commit()
    return u


async def test_full_pro_lifecycle_smoke(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    user,  # type: ignore[no-untyped-def]
) -> None:
    """End-to-end happy path:

    1. user requests checkout              → trial sub + ЮKassa payment
    2. ЮKassa fires payment.succeeded      → status=active, users.plan=pro
    3. one month later: renewal succeeds   → period extended, plan_until++
    4. user clicks "Cancel"                → status=cancelled,
                                              users.plan=cancelled,
                                              plan_until preserved
    """
    # 1) Checkout
    r = await client.post(
        "/api/billing/checkout",
        json={
            "contact": "founder@samosite.online",
            "return_url": "https://samosite.online/back",
        },
    )
    assert r.status_code == 200
    confirmation_url = r.json()["data"]["confirmation_url"]
    assert confirmation_url.startswith("https://yookassa.ru/checkout/")

    sub = (await db_session.execute(select(Subscription))).scalar_one()
    assert sub.status == "trial"
    await db_session.refresh(user)
    assert user.plan == "trial"
    assert user.plan_until is not None  # trial_ends_at

    # 2) First payment.succeeded — the FIRST webhook (no saved card yet).
    r = await client.post(
        "/api/billing/webhook",
        json={
            "event": "payment.succeeded",
            "object": {
                "id": "evt-smoke-1",
                "amount": {"value": "990.00", "currency": "RUB"},
                "payment_method": {"id": "pm-card-1"},
                "metadata": {"user_id": str(user.id)},
            },
        },
    )
    assert r.status_code == 200
    assert r.json()["data"]["new_status"] == "active"

    await db_session.refresh(sub)
    await db_session.refresh(user)
    assert sub.status == "active"
    assert sub.payment_method_id == "pm-card-1"
    assert sub.last_payment_at is not None
    assert sub.current_period_end is not None
    assert user.plan == "pro"
    assert user.plan_until == sub.current_period_end
    first_period_end = sub.current_period_end

    # 3) Monthly renewal — same payment_method_id (recurring path on
    #    ЮKassa side). Different provider_event_id so it doesn't
    #    collapse as a duplicate.
    r = await client.post(
        "/api/billing/webhook",
        json={
            "event": "payment.succeeded",
            "object": {
                "id": "evt-smoke-2",
                "amount": {"value": "990.00", "currency": "RUB"},
                "payment_method": {"id": "pm-card-1"},
                "metadata": {"user_id": str(user.id)},
            },
        },
    )
    assert r.status_code == 200
    await db_session.refresh(sub)
    await db_session.refresh(user)
    assert sub.status == "active"
    assert sub.current_period_end > first_period_end  # period rolled forward
    assert user.plan == "pro"
    assert user.plan_until == sub.current_period_end

    # 4) User clicks Cancel
    r = await client.post(
        "/api/billing/cancel",
        json={"contact": "founder@samosite.online", "reason": "saving_up"},
    )
    assert r.status_code == 200

    await db_session.refresh(sub)
    await db_session.refresh(user)
    assert sub.status == "cancelled"
    assert sub.cancel_reason == "saving_up"
    assert user.plan == "cancelled"
    # plan_until preserved: paid period continues to honour
    assert user.plan_until == sub.current_period_end

    # Audit trail: two payment events landed in billing_events
    events = (await db_session.execute(select(BillingEvent))).scalars().all()
    assert len([e for e in events if e.event_type == "payment.succeeded"]) == 2


async def test_three_strikes_smoke(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    user,  # type: ignore[no-untyped-def]
) -> None:
    """Adversarial: card expires, ЮKassa fires three payment.canceled
    events in a row. State machine collapses to cancelled with the
    canonical 'failed_charge_limit' reason."""
    await client.post(
        "/api/billing/checkout",
        json={"contact": "founder@samosite.online", "return_url": "https://x"},
    )
    # Activate first so the failures count against an active sub.
    await client.post(
        "/api/billing/webhook",
        json={
            "event": "payment.succeeded",
            "object": {
                "id": "evt-init",
                "amount": {"value": "990.00", "currency": "RUB"},
                "payment_method": {"id": "pm-1"},
                "metadata": {"user_id": str(user.id)},
            },
        },
    )

    for i in range(3):
        r = await client.post(
            "/api/billing/webhook",
            json={
                "event": "payment.canceled",
                "object": {
                    "id": f"evt-fail-{i}",
                    "amount": {"value": "990.00", "currency": "RUB"},
                    "payment_method": {"id": "pm-1"},
                    "metadata": {"user_id": str(user.id)},
                },
            },
        )
        assert r.status_code == 200

    sub = (await db_session.execute(select(Subscription))).scalar_one()
    assert sub.status == "cancelled"
    assert sub.cancel_reason == "failed_charge_limit"
    assert sub.failed_charge_count == 3
