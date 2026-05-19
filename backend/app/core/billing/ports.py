"""Billing ports (T9.1).

The provider (ЮKassa) sits behind a ``PaymentGateway`` Protocol so
``core/billing`` stays free of HTTP / SDK imports. The infrastructure
client lives in ``app.infrastructure.yookassa.client``.

Two transport methods cover the MVP scope:

  - ``create_payment``  — when the user upgrades or finishes trial,
                          we POST a payment to ЮKassa and redirect
                          them to the ``confirmation_url`` for card
                          entry. ``save_payment_method=True`` tells
                          ЮKassa to give us a recurring token.

  - ``charge_recurring`` — for subsequent monthly renewals. Uses the
                          saved ``payment_method_id`` so the user
                          doesn't see the bank's 3DS page again.

The webhook path is one-way (provider → us); see the router for the
signature verification we do before passing the payload back into the
service layer.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class CreatedPayment:
    """Result of ``create_payment``. ``confirmation_url`` is the URL
    the user is redirected to for card entry; ``provider_payment_id``
    becomes the ЮKassa-side reference we receive back via webhook."""

    provider_payment_id: str
    confirmation_url: str | None
    status: str  # "pending" | "succeeded" | "canceled" | ...


@dataclass(frozen=True, slots=True)
class RecurringCharge:
    """Result of ``charge_recurring`` — synchronous for ЮKassa when a
    saved card is used; we still surface a status so the caller can
    update ``failed_charge_count``."""

    provider_payment_id: str
    status: str


class PaymentGatewayError(Exception):
    """Family of provider failures the service maps to domain errors."""


class PaymentGatewayDisabledError(PaymentGatewayError):
    """Adapter cannot run (missing credentials)."""


class PaymentGateway(Protocol):
    """The Protocol every billing adapter implements. ``YookassaClient``
    in ``app.infrastructure.yookassa.client`` is structurally compatible."""

    provider_name: str

    def is_available(self) -> bool: ...

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
    ) -> CreatedPayment: ...

    async def charge_recurring(
        self,
        *,
        amount_kopeks: int,
        currency: str,
        payment_method_id: str,
        description: str,
        idempotency_key: str,
    ) -> RecurringCharge: ...
