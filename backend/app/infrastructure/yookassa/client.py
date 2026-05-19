"""ЮKassa HTTP client (T9.1).

Thin async wrapper around the ЮKassa Payments API. We DON'T use the
official ``yookassa`` SDK — CLAUDE.md forbids new runtime dependencies
without an ADR, and the surface we need is small: two POSTs.

Endpoint: ``https://api.yookassa.ru/v3/payments``
Auth: HTTP Basic with ``shop_id:secret_key``
Idempotency: ``Idempotence-Key`` header on every POST; the service
constructs UUIDs and persists them in ``billing_events`` so retries
collapse into one provider row.

When credentials are absent the client's ``is_available()`` returns
False — the service then refuses checkout requests with a clean
4xx instead of crashing. Keeps ``make dev`` and unit tests working
without a real ЮKassa account.
"""

from __future__ import annotations

from typing import Any

import httpx

from app.core.billing.ports import (
    CreatedPayment,
    PaymentGatewayDisabledError,
    PaymentGatewayError,
    RecurringCharge,
)
from app.utils.logging import get_logger

PAYMENTS_URL = "https://api.yookassa.ru/v3/payments"


class YookassaClient:
    provider_name = "yookassa"

    def __init__(
        self,
        *,
        shop_id: str | None,
        secret_key: str | None,
        api_base_url: str = PAYMENTS_URL,
        timeout_seconds: float = 10.0,
    ) -> None:
        self._shop_id = shop_id
        self._secret_key = secret_key
        self._url = api_base_url
        self._timeout = timeout_seconds
        self._log = get_logger("infrastructure.yookassa.client")

    def is_available(self) -> bool:
        return bool(self._shop_id) and bool(self._secret_key)

    # ---- public payments ----------------------------------------------

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
        """POST ``/v3/payments`` for the user's first charge (or one-off
        renewal where we don't have a saved card). Returns the
        confirmation URL the user is redirected to."""
        self._require_credentials()
        body: dict[str, Any] = {
            "amount": _to_decimal(amount_kopeks, currency),
            "capture": True,
            "save_payment_method": save_payment_method,
            "description": description,
            "confirmation": {
                "type": "redirect",
                "return_url": return_url,
            },
        }
        payload = await self._post(body, idempotency_key=idempotency_key)
        confirmation = payload.get("confirmation") if isinstance(payload, dict) else None
        confirmation_url = (
            confirmation.get("confirmation_url") if isinstance(confirmation, dict) else None
        )
        return CreatedPayment(
            provider_payment_id=str(payload.get("id", "")),
            confirmation_url=confirmation_url,
            status=str(payload.get("status", "")),
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
        """POST ``/v3/payments`` with a saved ``payment_method_id`` for
        a monthly auto-renewal. ЮKassa returns the new payment in
        ``succeeded`` (or transient) state immediately when the card
        clears."""
        self._require_credentials()
        body: dict[str, Any] = {
            "amount": _to_decimal(amount_kopeks, currency),
            "capture": True,
            "payment_method_id": payment_method_id,
            "description": description,
        }
        payload = await self._post(body, idempotency_key=idempotency_key)
        return RecurringCharge(
            provider_payment_id=str(payload.get("id", "")),
            status=str(payload.get("status", "")),
        )

    # ---- internals ----------------------------------------------------

    def _require_credentials(self) -> None:
        if not self.is_available():
            raise PaymentGatewayDisabledError("yookassa_credentials_missing")

    async def _post(self, body: dict[str, Any], *, idempotency_key: str) -> dict[str, Any]:
        if not self._shop_id or not self._secret_key:  # pragma: no cover — guarded above
            raise PaymentGatewayDisabledError("yookassa_credentials_missing")
        headers = {"Idempotence-Key": idempotency_key}
        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                resp = await client.post(
                    self._url,
                    json=body,
                    auth=(self._shop_id, self._secret_key),
                    headers=headers,
                )
        except httpx.HTTPError as exc:
            raise PaymentGatewayError(
                f"yookassa_transport_failed:{exc.__class__.__name__}"
            ) from exc

        if resp.status_code >= 500:
            raise PaymentGatewayError(f"yookassa_http_{resp.status_code}")
        if resp.status_code >= 400:
            raise PaymentGatewayError(f"yookassa_client_error:{resp.status_code}:{resp.text[:200]}")

        try:
            data = resp.json()
        except ValueError as exc:
            raise PaymentGatewayError("yookassa_response_not_json") from exc
        if not isinstance(data, dict):
            raise PaymentGatewayError("yookassa_response_not_dict")
        return data


def _to_decimal(amount_kopeks: int, currency: str) -> dict[str, str]:
    """ЮKassa requires amounts in `decimal-as-string` form like
    ``{"value": "990.00", "currency": "RUB"}``. We do the math here
    so the rest of the codebase deals in integer kopeks."""
    rubles, kopeks = divmod(amount_kopeks, 100)
    return {"value": f"{rubles}.{kopeks:02d}", "currency": currency}
