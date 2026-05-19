"""State-machine tests for the billing subscription lifecycle (T9.1).

Pure unit-tests — no DB, no HTTP. Cover every allowed transition and
the symmetric "this event in this state must raise" rejections, plus
the multi-event accumulators (3-strikes → cancelled)."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta

import pytest

from app.core.billing.state_machine import (
    MAX_FAILED_CHARGES,
    TRIAL_DAYS,
    BillingEventKind,
    InvalidTransitionError,
    SubscriptionState,
    SubscriptionStatus,
    apply_event,
    initial_state,
)

NOW = datetime(2026, 5, 19, 12, 0, tzinfo=UTC)


# --- creation -----------------------------------------------------------


@pytest.mark.unit
def test_initial_state_is_trial_with_30day_end() -> None:
    state, trial_ends = initial_state(now=NOW)
    assert state.status is SubscriptionStatus.trial
    assert state.failed_charge_count == 0
    assert trial_ends == NOW + timedelta(days=TRIAL_DAYS)


# --- trial → active ----------------------------------------------------


@pytest.mark.unit
def test_payment_success_promotes_trial_to_active() -> None:
    state = SubscriptionState(status=SubscriptionStatus.trial)
    next_state = apply_event(state, event=BillingEventKind.payment_succeeded, now=NOW)
    assert next_state.status is SubscriptionStatus.active
    assert next_state.current_period_end == NOW + timedelta(days=30)
    assert next_state.failed_charge_count == 0


# --- active renewal ----------------------------------------------------


@pytest.mark.unit
def test_active_renewal_extends_period() -> None:
    state = SubscriptionState(
        status=SubscriptionStatus.active,
        current_period_end=NOW,
    )
    next_state = apply_event(state, event=BillingEventKind.payment_succeeded, now=NOW)
    assert next_state.status is SubscriptionStatus.active
    assert next_state.current_period_end == NOW + timedelta(days=30)


# --- past_due path ------------------------------------------------------


@pytest.mark.unit
def test_payment_failure_from_active_goes_past_due() -> None:
    state = SubscriptionState(status=SubscriptionStatus.active)
    next_state = apply_event(state, event=BillingEventKind.payment_failed, now=NOW)
    assert next_state.status is SubscriptionStatus.past_due
    assert next_state.failed_charge_count == 1


@pytest.mark.unit
def test_payment_success_from_past_due_recovers_to_active() -> None:
    state = SubscriptionState(
        status=SubscriptionStatus.past_due,
        failed_charge_count=1,
    )
    next_state = apply_event(state, event=BillingEventKind.payment_succeeded, now=NOW)
    assert next_state.status is SubscriptionStatus.active
    assert next_state.failed_charge_count == 0  # counter resets


@pytest.mark.unit
def test_three_strikes_cancels_subscription() -> None:
    state = SubscriptionState(
        status=SubscriptionStatus.past_due,
        failed_charge_count=MAX_FAILED_CHARGES - 1,
    )
    next_state = apply_event(state, event=BillingEventKind.payment_failed, now=NOW)
    assert next_state.status is SubscriptionStatus.cancelled
    assert next_state.failed_charge_count == MAX_FAILED_CHARGES
    assert next_state.cancel_reason == "failed_charge_limit"


# --- user cancel --------------------------------------------------------


@pytest.mark.unit
def test_user_cancel_from_trial() -> None:
    state = SubscriptionState(status=SubscriptionStatus.trial)
    next_state = apply_event(
        state, event=BillingEventKind.user_cancelled, now=NOW, reason="changed_mind"
    )
    assert next_state.status is SubscriptionStatus.cancelled
    assert next_state.cancel_reason == "changed_mind"
    assert next_state.cancelled_at == NOW


@pytest.mark.unit
def test_user_cancel_from_active() -> None:
    state = SubscriptionState(status=SubscriptionStatus.active)
    next_state = apply_event(state, event=BillingEventKind.user_cancelled, now=NOW)
    assert next_state.status is SubscriptionStatus.cancelled
    assert next_state.cancel_reason == "user_cancelled"


@pytest.mark.unit
def test_user_cancel_from_cancelled_raises() -> None:
    state = SubscriptionState(status=SubscriptionStatus.cancelled)
    with pytest.raises(InvalidTransitionError):
        apply_event(state, event=BillingEventKind.user_cancelled, now=NOW)


# --- refund -------------------------------------------------------------


@pytest.mark.unit
def test_refund_from_active() -> None:
    state = SubscriptionState(status=SubscriptionStatus.active)
    next_state = apply_event(state, event=BillingEventKind.refund_succeeded, now=NOW)
    assert next_state.status is SubscriptionStatus.refunded


@pytest.mark.unit
def test_refund_from_trial_raises() -> None:
    state = SubscriptionState(status=SubscriptionStatus.trial)
    with pytest.raises(InvalidTransitionError):
        apply_event(state, event=BillingEventKind.refund_succeeded, now=NOW)


# --- impossible transitions --------------------------------------------


@pytest.mark.unit
@pytest.mark.parametrize(
    "starting",
    [SubscriptionStatus.cancelled, SubscriptionStatus.refunded],
)
def test_payment_events_rejected_from_terminal_states(
    starting: SubscriptionStatus,
) -> None:
    state = SubscriptionState(status=starting)
    with pytest.raises(InvalidTransitionError):
        apply_event(state, event=BillingEventKind.payment_succeeded, now=NOW)
    with pytest.raises(InvalidTransitionError):
        apply_event(state, event=BillingEventKind.payment_failed, now=NOW)


# --- non-mutating contract ---------------------------------------------


@pytest.mark.unit
def test_apply_event_does_not_mutate_input() -> None:
    state = SubscriptionState(status=SubscriptionStatus.active)
    snapshot = (state.status, state.failed_charge_count, state.cancel_reason)
    apply_event(state, event=BillingEventKind.payment_failed, now=NOW)
    assert (state.status, state.failed_charge_count, state.cancel_reason) == snapshot
