"""Subscription state machine (T9.1).

Pure-domain — no DB, no HTTP. Takes a current `(status, …)` plus an
event and returns the next state. Used by:

  - ``billing.service.create_initial_subscription`` to mint a row at
    user creation (status="trial", trial_ends_at=now+30d)
  - ``billing.service.apply_event`` when a webhook lands or the user
    clicks Cancel

Allowed transitions (everything else raises ``InvalidTransitionError``):

    trial      → active     (first payment.succeeded)
    trial      → cancelled  (user clicks Cancel)
    active     → past_due   (payment.canceled or charge_recurring error)
    active     → cancelled  (user clicks Cancel)
    past_due   → active     (retry succeeded)
    past_due   → cancelled  (3rd consecutive failure OR user clicks Cancel)
    active     → refunded   (founder manual refund)

Keeping this here (separate from the ORM-touching service) lets the
unit tests cover the matrix exhaustively without spinning up Postgres.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum

TRIAL_DAYS = 30
MAX_FAILED_CHARGES = 3


class SubscriptionStatus(StrEnum):
    trial = "trial"
    active = "active"
    past_due = "past_due"
    cancelled = "cancelled"
    refunded = "refunded"


class BillingEventKind(StrEnum):
    """The provider-agnostic event names the state machine knows
    about. The router maps provider-specific event types (e.g.
    ``payment.succeeded``) onto these values."""

    payment_succeeded = "payment_succeeded"
    payment_failed = "payment_failed"
    user_cancelled = "user_cancelled"
    refund_succeeded = "refund_succeeded"


class InvalidTransitionError(ValueError):
    """Raised when the event doesn't apply to the current status."""


@dataclass(frozen=True, slots=True)
class SubscriptionState:
    """Snapshot of mutable fields the state machine knows about. The
    service reads/writes the ORM row but passes/receives this dataclass
    so the machine itself stays free of SQLAlchemy."""

    status: SubscriptionStatus
    failed_charge_count: int = 0
    cancel_reason: str | None = None
    current_period_end: datetime | None = None
    cancelled_at: datetime | None = None


def initial_state(*, now: datetime) -> tuple[SubscriptionState, datetime]:
    """Return the (state, trial_ends_at) tuple for a brand-new row."""
    trial_ends = now + timedelta(days=TRIAL_DAYS)
    return SubscriptionState(status=SubscriptionStatus.trial), trial_ends


def apply_event(
    state: SubscriptionState,
    *,
    event: BillingEventKind,
    now: datetime,
    period_length_days: int = 30,
    reason: str | None = None,
) -> SubscriptionState:
    """Pure transition. Returns a NEW state — never mutates ``state``."""
    if event is BillingEventKind.payment_succeeded:
        if state.status in {
            SubscriptionStatus.trial,
            SubscriptionStatus.active,
            SubscriptionStatus.past_due,
        }:
            return SubscriptionState(
                status=SubscriptionStatus.active,
                failed_charge_count=0,
                cancel_reason=None,
                current_period_end=now + timedelta(days=period_length_days),
                cancelled_at=None,
            )
        raise InvalidTransitionError(f"payment_succeeded:{state.status.value}")

    if event is BillingEventKind.payment_failed:
        if state.status not in {
            SubscriptionStatus.trial,
            SubscriptionStatus.active,
            SubscriptionStatus.past_due,
        }:
            raise InvalidTransitionError(f"payment_failed:{state.status.value}")
        next_count = state.failed_charge_count + 1
        if next_count >= MAX_FAILED_CHARGES:
            return SubscriptionState(
                status=SubscriptionStatus.cancelled,
                failed_charge_count=next_count,
                cancel_reason="failed_charge_limit",
                current_period_end=state.current_period_end,
                cancelled_at=now,
            )
        return SubscriptionState(
            status=SubscriptionStatus.past_due,
            failed_charge_count=next_count,
            cancel_reason=state.cancel_reason,
            current_period_end=state.current_period_end,
            cancelled_at=None,
        )

    if event is BillingEventKind.user_cancelled:
        if state.status in {SubscriptionStatus.cancelled, SubscriptionStatus.refunded}:
            raise InvalidTransitionError(f"user_cancelled:{state.status.value}")
        return SubscriptionState(
            status=SubscriptionStatus.cancelled,
            failed_charge_count=state.failed_charge_count,
            cancel_reason=reason or "user_cancelled",
            current_period_end=state.current_period_end,
            cancelled_at=now,
        )

    if event is BillingEventKind.refund_succeeded:
        if state.status not in {SubscriptionStatus.active, SubscriptionStatus.cancelled}:
            raise InvalidTransitionError(f"refund_succeeded:{state.status.value}")
        return SubscriptionState(
            status=SubscriptionStatus.refunded,
            failed_charge_count=state.failed_charge_count,
            cancel_reason=reason or "refunded",
            current_period_end=state.current_period_end,
            cancelled_at=state.cancelled_at or now,
        )

    raise InvalidTransitionError(f"unknown_event:{event!r}")
