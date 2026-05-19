"""Tests for the ЮKassa HTTP client (T9.1)."""

from __future__ import annotations

import base64
import json

import httpx
import pytest

from app.core.billing.ports import (
    PaymentGatewayDisabledError,
    PaymentGatewayError,
)
from app.infrastructure.yookassa.client import YookassaClient


def _patch_transport(monkeypatch: pytest.MonkeyPatch, transport: httpx.MockTransport) -> None:
    original = httpx.AsyncClient

    class _Patched(original):  # type: ignore[misc, valid-type]
        def __init__(self, *args, **kwargs):
            kwargs["transport"] = transport
            super().__init__(*args, **kwargs)

    monkeypatch.setattr(httpx, "AsyncClient", _Patched)


def _success_payment(*, payment_id: str = "pay_123") -> dict:
    return {
        "id": payment_id,
        "status": "pending",
        "amount": {"value": "990.00", "currency": "RUB"},
        "confirmation": {
            "type": "redirect",
            "confirmation_url": "https://yookassa.ru/checkout/pay_123",
        },
    }


# --- gating ---------------------------------------------------------------


@pytest.mark.unit
def test_unavailable_without_shop_id() -> None:
    assert YookassaClient(shop_id=None, secret_key="x").is_available() is False


@pytest.mark.unit
def test_unavailable_without_secret() -> None:
    assert YookassaClient(shop_id="x", secret_key=None).is_available() is False


@pytest.mark.unit
async def test_create_payment_raises_disabled_without_creds() -> None:
    client = YookassaClient(shop_id=None, secret_key=None)
    with pytest.raises(PaymentGatewayDisabledError):
        await client.create_payment(
            amount_kopeks=99000,
            currency="RUB",
            return_url="https://vitrina.site/back",
            description="Pro",
            idempotency_key="i-1",
        )


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
async def test_create_payment_sends_expected_body(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["body"] = json.loads(request.content)
        captured["headers"] = dict(request.headers)
        return httpx.Response(200, json=_success_payment())

    _patch_transport(monkeypatch, httpx.MockTransport(handler))
    client = YookassaClient(
        shop_id="shop-1",  # pragma: allowlist secret
        secret_key="secret-1",  # pragma: allowlist secret
    )
    result = await client.create_payment(
        amount_kopeks=99000,
        currency="RUB",
        return_url="https://vitrina.site/back",
        description="Vitrina Pro",
        idempotency_key="i-2",
    )

    assert result.provider_payment_id == "pay_123"
    assert result.confirmation_url == "https://yookassa.ru/checkout/pay_123"
    assert result.status == "pending"

    body = captured["body"]
    assert body["amount"] == {"value": "990.00", "currency": "RUB"}  # type: ignore[index]
    assert body["save_payment_method"] is True  # type: ignore[index]
    assert body["capture"] is True  # type: ignore[index]
    assert body["confirmation"]["return_url"] == "https://vitrina.site/back"  # type: ignore[index]

    headers = captured["headers"]
    assert headers["idempotence-key"] == "i-2"  # type: ignore[index]
    # HTTP Basic should encode shop_id:secret as base64
    auth = headers["authorization"]  # type: ignore[index]
    assert auth.startswith("Basic ")
    decoded = base64.b64decode(auth.split(" ", 1)[1]).decode()
    assert decoded == "shop-1:secret-1"


@pytest.mark.unit
async def test_charge_recurring_uses_payment_method_id(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    captured: dict[str, object] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["body"] = json.loads(request.content)
        return httpx.Response(200, json={"id": "pay_456", "status": "succeeded"})

    _patch_transport(monkeypatch, httpx.MockTransport(handler))
    client = YookassaClient(
        shop_id="s",  # pragma: allowlist secret
        secret_key="k",  # pragma: allowlist secret
    )
    result = await client.charge_recurring(
        amount_kopeks=99000,
        currency="RUB",
        payment_method_id="pm-saved-card",
        description="Pro monthly",
        idempotency_key="i-3",
    )
    assert result.provider_payment_id == "pay_456"
    assert result.status == "succeeded"
    body = captured["body"]
    assert body["payment_method_id"] == "pm-saved-card"  # type: ignore[index]
    assert "confirmation" not in body  # type: ignore[operator]


# --- amount conversion ---------------------------------------------------


@pytest.mark.unit
async def test_amount_with_fractional_kopeks(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["body"] = json.loads(request.content)
        return httpx.Response(200, json=_success_payment())

    _patch_transport(monkeypatch, httpx.MockTransport(handler))
    client = YookassaClient(
        shop_id="s",  # pragma: allowlist secret
        secret_key="k",  # pragma: allowlist secret
    )
    await client.create_payment(
        amount_kopeks=99050,  # 990 ₽ 50 коп
        currency="RUB",
        return_url="https://vitrina.site/back",
        description="X",
        idempotency_key="i-4",
    )
    assert captured["body"]["amount"]["value"] == "990.50"  # type: ignore[index]


# --- error mapping -------------------------------------------------------


@pytest.mark.unit
async def test_http_5xx_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    _patch_transport(
        monkeypatch,
        httpx.MockTransport(lambda _: httpx.Response(503, text="busy")),
    )
    client = YookassaClient(
        shop_id="s",  # pragma: allowlist secret
        secret_key="k",  # pragma: allowlist secret
    )
    with pytest.raises(PaymentGatewayError, match="yookassa_http_503"):
        await client.create_payment(
            amount_kopeks=1,
            currency="RUB",
            return_url="https://x",
            description="x",
            idempotency_key="i",
        )


@pytest.mark.unit
async def test_http_400_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    _patch_transport(
        monkeypatch,
        httpx.MockTransport(lambda _: httpx.Response(400, text="bad amount")),
    )
    client = YookassaClient(
        shop_id="s",  # pragma: allowlist secret
        secret_key="k",  # pragma: allowlist secret
    )
    with pytest.raises(PaymentGatewayError, match="yookassa_client_error:400"):
        await client.create_payment(
            amount_kopeks=1,
            currency="RUB",
            return_url="https://x",
            description="x",
            idempotency_key="i",
        )


@pytest.mark.unit
async def test_transport_error_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    def boom(_: httpx.Request) -> httpx.Response:
        raise httpx.ConnectError("nope")

    _patch_transport(monkeypatch, httpx.MockTransport(boom))
    client = YookassaClient(
        shop_id="s",  # pragma: allowlist secret
        secret_key="k",  # pragma: allowlist secret
    )
    with pytest.raises(PaymentGatewayError, match="yookassa_transport_failed"):
        await client.create_payment(
            amount_kopeks=1,
            currency="RUB",
            return_url="https://x",
            description="x",
            idempotency_key="i",
        )
