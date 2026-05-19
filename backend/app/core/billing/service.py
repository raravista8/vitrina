"""Billing service (T9.1).

ORM-touching layer per ARCHITECTURE.md §9 — ``core/billing`` is NOT
on the hexagonal-critical-path list so SQLAlchemy is allowed here.
Keeps the pure state machine separate (``state_machine.py``) so the
transition matrix can be unit-tested without a DB.

Responsibilities:

  1. ``ensure_subscription`` — create a ``trial`` row on first sight
     for a user. Idempotent: returns the existing row if present.
  2. ``start_checkout`` — kick off the upgrade flow. Calls ЮKassa
     ``create_payment`` and returns the confirmation URL. The webhook
     handler advances the state machine when the payment lands.
  3. ``record_webhook_event`` — persists the raw event in
     ``billing_events`` (idempotent on ``provider_event_id``) and
     advances the subscription state via the pure state machine.
  4. ``cancel_subscription`` — one-click cancel. Marks the row
     ``cancelled``; the user keeps Pro until ``current_period_end``
     (no refund — that's documented in the offer).
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.billing.ports import (
    CreatedPayment,
    PaymentGateway,
    PaymentGatewayDisabledError,
    PaymentGatewayError,
)
from app.core.billing.state_machine import (
    BillingEventKind,
    SubscriptionState,
    SubscriptionStatus,
    apply_event,
    initial_state,
)
from app.infrastructure.postgres.models import BillingEvent, Subscription, User
from app.utils.logging import get_logger

_log = get_logger("core.billing.service")

DEFAULT_AMOUNT_KOPEKS = 99_000  # 990 ₽
DEFAULT_CURRENCY = "RUB"
DEFAULT_PLAN_CODE = "pro"


# --- creation -------------------------------------------------------------


async def ensure_subscription(
    *,
    session: AsyncSession,
    user_id: uuid.UUID,
) -> Subscription:
    """Idempotent row creation. Race-safe via a unique index on
    ``user_id`` — concurrent callers each try to INSERT, one wins,
    the other catches the IntegrityError and re-reads.

    Used by the application-intake flow (T1.3) once a user gets
    materialised. Sub-second cost per call when the row already
    exists (single SELECT)."""
    existing = await _fetch_by_user(session, user_id)
    if existing is not None:
        return existing

    now = datetime.now(UTC)
    state, trial_ends = initial_state(now=now)
    row = Subscription(
        user_id=user_id,
        status=state.status.value,
        plan_code=DEFAULT_PLAN_CODE,
        amount_kopeks=DEFAULT_AMOUNT_KOPEKS,
        currency=DEFAULT_CURRENCY,
        trial_ends_at=trial_ends,
    )
    try:
        async with session.begin_nested():
            session.add(row)
    except IntegrityError:
        existing = await _fetch_by_user(session, user_id)
        if existing is not None:
            return existing
        raise

    # FR-080 mirror — ``users.plan`` gates the recurring-charge worker.
    await _sync_user_plan(session=session, sub=row, new_state=state)

    await session.commit()
    _log.info(
        "subscription_created",
        user_id=str(user_id),
        trial_ends_at=trial_ends.isoformat(),
    )
    return row


# --- checkout -------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class CheckoutResult:
    """Return value of ``start_checkout``. Frontend redirects the
    user to ``confirmation_url``."""

    confirmation_url: str
    provider_payment_id: str
    subscription_id: uuid.UUID


class BillingError(Exception):
    """Domain wrapper around upstream/state failures the router maps
    to 4xx/5xx."""


async def start_checkout(
    *,
    session: AsyncSession,
    gateway: PaymentGateway,
    user_id: uuid.UUID,
    return_url: str,
) -> CheckoutResult:
    """Mint (or reuse) the subscription, then create a ЮKassa payment.

    Refuses checkout if the subscription is already ``active`` —
    duplicate Pro upgrades aren't a thing in MVP. Refuses if the row
    is ``cancelled`` / ``refunded`` because resuming a cancelled sub
    needs a manual founder review (no auto-restore).
    """
    if not gateway.is_available():
        raise PaymentGatewayDisabledError("yookassa_unavailable")

    sub = await ensure_subscription(session=session, user_id=user_id)
    if sub.status == SubscriptionStatus.active.value:
        raise BillingError("already_active")
    if sub.status in {
        SubscriptionStatus.cancelled.value,
        SubscriptionStatus.refunded.value,
    }:
        raise BillingError(f"subscription_{sub.status}_no_resume")

    idempotency_key = str(uuid.uuid4())
    try:
        payment: CreatedPayment = await gateway.create_payment(
            amount_kopeks=sub.amount_kopeks,
            currency=sub.currency,
            return_url=return_url,
            description=f"Vitrina Pro — {sub.amount_kopeks // 100} ₽",
            idempotency_key=idempotency_key,
            save_payment_method=True,
            # ЮKassa echoes this back on every webhook tied to this
            # payment. Carrying both IDs lets the webhook handler find
            # the subscription on the FIRST charge — before any saved
            # card / payment_method_id exists.
            metadata={
                "user_id": str(user_id),
                "subscription_id": str(sub.id),
            },
        )
    except PaymentGatewayError as exc:
        raise BillingError(f"gateway_failed:{exc}") from exc

    if not payment.confirmation_url:
        raise BillingError("gateway_no_confirmation_url")

    return CheckoutResult(
        confirmation_url=payment.confirmation_url,
        provider_payment_id=payment.provider_payment_id,
        subscription_id=sub.id,
    )


# --- webhook ingestion ----------------------------------------------------


YOOKASSA_EVENT_MAP: dict[str, BillingEventKind] = {
    "payment.succeeded": BillingEventKind.payment_succeeded,
    "payment.canceled": BillingEventKind.payment_failed,
    "payment.waiting_for_capture": BillingEventKind.payment_succeeded,
    "refund.succeeded": BillingEventKind.refund_succeeded,
}


@dataclass(frozen=True, slots=True)
class WebhookOutcome:
    """What ``record_webhook_event`` returns. ``handled`` is False
    when the event is a duplicate or we don't recognise the type —
    the router 200s either way so ЮKassa stops retrying."""

    handled: bool
    duplicate: bool = False
    subscription_id: uuid.UUID | None = None
    new_status: SubscriptionStatus | None = None


async def record_webhook_event(
    *,
    session: AsyncSession,
    raw_payload: dict[str, Any],
) -> WebhookOutcome:
    """Persist the event + advance the state machine.

    Idempotency: ``provider_event_id`` is unique, so a duplicate POST
    raises IntegrityError → we report duplicate=True without erroring
    upstream. The state machine itself doesn't see duplicates.
    """
    event_type = str(raw_payload.get("event", ""))
    obj = raw_payload.get("object") if isinstance(raw_payload, dict) else None
    provider_event_id = str(obj.get("id", "")) if isinstance(obj, dict) else ""
    amount_kopeks = _amount_to_kopeks(obj) if isinstance(obj, dict) else None
    payment_method_id = _payment_method_id(obj) if isinstance(obj, dict) else None

    kind = YOOKASSA_EVENT_MAP.get(event_type)
    if kind is None:
        _log.info("billing_event_ignored", event_type=event_type)
        return WebhookOutcome(handled=False)

    # Locate the matching subscription via the payment_method_id we
    # saved on the first successful charge; fallback: search by the
    # raw payload's metadata.user_id (only present in MVP if the
    # router stamped it on create_payment). For now, the router does
    # NOT pass user_id metadata, so we rely on payment_method_id.
    sub = await _locate_subscription(session=session, payment_method_id=payment_method_id, obj=obj)

    event = BillingEvent(
        subscription_id=sub.id if sub else None,
        provider="yookassa",
        event_type=event_type,
        provider_event_id=provider_event_id or None,
        amount_kopeks=amount_kopeks,
        payload=raw_payload,
    )
    # SAVEPOINT-style nested transaction so the IntegrityError on a
    # duplicate ``provider_event_id`` rolls back ONLY this INSERT and
    # leaves the outer transaction intact (otherwise the duplicate
    # detection nukes the first event row in tests that share an
    # outer rollback).
    try:
        async with session.begin_nested():
            session.add(event)
    except IntegrityError:
        _log.info("billing_event_duplicate", provider_event_id=provider_event_id)
        return WebhookOutcome(handled=True, duplicate=True)

    if sub is None:
        # Event recorded but no matching subscription — the founder
        # reviews these manually. Common during testing when ЮKassa
        # sends events for one-off payments outside our flow.
        await session.commit()
        return WebhookOutcome(handled=True)

    now = datetime.now(UTC)
    state = _state_from_row(sub)
    new_state = apply_event(state, event=kind, now=now)

    sub.status = new_state.status.value
    sub.failed_charge_count = new_state.failed_charge_count
    sub.cancel_reason = new_state.cancel_reason
    sub.current_period_end = new_state.current_period_end
    sub.cancelled_at = new_state.cancelled_at
    if new_state.status is SubscriptionStatus.active:
        sub.last_payment_at = now
    if payment_method_id and not sub.payment_method_id:
        sub.payment_method_id = payment_method_id

    await _sync_user_plan(session=session, sub=sub, new_state=new_state)

    event.processed_at = now
    await session.commit()

    _log.info(
        "billing_event_applied",
        event_type=event_type,
        subscription_id=str(sub.id),
        new_status=new_state.status.value,
    )
    return WebhookOutcome(
        handled=True,
        subscription_id=sub.id,
        new_status=new_state.status,
    )


# --- user cancellation ----------------------------------------------------


async def cancel_subscription(
    *,
    session: AsyncSession,
    user_id: uuid.UUID,
    reason: str | None = None,
) -> Subscription:
    """One-click cancel. Marks ``cancelled``; the user retains Pro
    until ``current_period_end`` (offer §2). We do NOT call
    ЮKassa-side cancellation because there's no recurring schedule on
    their side — every renewal is a discrete charge.
    """
    sub = await _fetch_by_user(session, user_id)
    if sub is None:
        raise BillingError("no_subscription")
    if sub.status == SubscriptionStatus.cancelled.value:
        return sub  # idempotent

    state = _state_from_row(sub)
    now = datetime.now(UTC)
    new_state = apply_event(state, event=BillingEventKind.user_cancelled, now=now, reason=reason)
    sub.status = new_state.status.value
    sub.cancel_reason = new_state.cancel_reason
    sub.cancelled_at = new_state.cancelled_at

    await _sync_user_plan(session=session, sub=sub, new_state=new_state)

    await session.commit()
    _log.info(
        "subscription_cancelled",
        user_id=str(user_id),
        subscription_id=str(sub.id),
        reason=reason,
    )
    return sub


# --- helpers --------------------------------------------------------------


async def _sync_user_plan(
    *,
    session: AsyncSession,
    sub: Subscription,
    new_state: SubscriptionState,
) -> None:
    """Mirror the subscription state onto ``users.plan`` / ``plan_until``.

    The ``users.plan`` column is the cheap-to-read gate for FR-080
    (recurring-charge worker checks ``plan == 'trial' AND plan_until
    > now()`` before attempting any charge). Subscription state is
    authoritative; ``users.plan`` is a derived mirror kept consistent
    by every transition.

    Mapping:
      trial / active     → ``users.plan = 'pro'``, plan_until = period_end
      past_due           → ``users.plan = 'pro'``, plan_until = period_end
                           (Pro keeps working through the retry window)
      cancelled          → ``users.plan = 'cancelled'``, plan_until
                           unchanged (so the publish flow can still
                           gate on "until when did they pay")
      refunded           → ``users.plan = 'expired'``, plan_until = now

    The model already constrains ``users.plan`` to the four-value
    CHECK ``('trial','pro','expired','cancelled')`` — we never write
    anything outside that set.
    """
    user = (await session.execute(select(User).where(User.id == sub.user_id))).scalar_one_or_none()
    if user is None:  # subscription FK CASCADE makes this near-impossible
        return

    status = new_state.status
    if status in {SubscriptionStatus.trial, SubscriptionStatus.active, SubscriptionStatus.past_due}:
        user.plan = "pro" if status is not SubscriptionStatus.trial else "trial"
        user.plan_until = new_state.current_period_end or sub.trial_ends_at
    elif status is SubscriptionStatus.cancelled:
        user.plan = "cancelled"
        # Keep plan_until intact — user keeps Pro until period end
        # (offer §2). If the worker reads `plan='cancelled'` it still
        # honours plan_until.
    elif status is SubscriptionStatus.refunded:
        user.plan = "expired"
        user.plan_until = datetime.now(UTC)


async def _fetch_by_user(session: AsyncSession, user_id: uuid.UUID) -> Subscription | None:
    stmt = select(Subscription).where(Subscription.user_id == user_id)
    return (await session.execute(stmt)).scalar_one_or_none()


async def _locate_subscription(
    *,
    session: AsyncSession,
    payment_method_id: str | None,
    obj: dict[str, Any] | None,
) -> Subscription | None:
    if payment_method_id:
        stmt = select(Subscription).where(Subscription.payment_method_id == payment_method_id)
        sub = (await session.execute(stmt)).scalar_one_or_none()
        if sub:
            return sub
    if isinstance(obj, dict):
        metadata = obj.get("metadata")
        if isinstance(metadata, dict):
            user_id_raw = metadata.get("user_id")
            if isinstance(user_id_raw, str):
                try:
                    return await _fetch_by_user(session, uuid.UUID(user_id_raw))
                except ValueError:
                    return None
    return None


def _state_from_row(row: Subscription) -> SubscriptionState:
    return SubscriptionState(
        status=SubscriptionStatus(row.status),
        failed_charge_count=row.failed_charge_count,
        cancel_reason=row.cancel_reason,
        current_period_end=row.current_period_end,
        cancelled_at=row.cancelled_at,
    )


def _amount_to_kopeks(obj: dict[str, Any]) -> int | None:
    amount = obj.get("amount") if isinstance(obj, dict) else None
    if not isinstance(amount, dict):
        return None
    value = amount.get("value")
    if not isinstance(value, str):
        return None
    try:
        rubles, _, kopeks = value.partition(".")
        return int(rubles) * 100 + int((kopeks + "00")[:2])
    except (ValueError, TypeError):
        return None


def _payment_method_id(obj: dict[str, Any]) -> str | None:
    pm = obj.get("payment_method") if isinstance(obj, dict) else None
    if isinstance(pm, dict):
        pm_id = pm.get("id")
        if isinstance(pm_id, str):
            return pm_id
    return None
