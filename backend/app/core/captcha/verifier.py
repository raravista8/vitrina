"""Yandex SmartCaptcha verifier (T1.5).

Server-side validation of the token the browser obtains from
``smartCaptcha.execute()``. The Yandex API is
``smartcaptcha.yandexcloud.net/validate?secret=<KEY>&token=<TOKEN>&ip=<IP>``
returning JSON with ``{"status": "ok"}`` on success.

Behaviour:
  - In **production** the verifier is mandatory: a missing
    ``YANDEX_SMARTCAPTCHA_SERVER_KEY`` is a misconfiguration and the
    factory raises at startup (fail-secure per SECURITY.md A10).
  - In **development** the verifier accepts the literal ``"DEV_TOKEN"``
    so QA can submit forms without provisioning a captcha. Any other
    token is sent to Yandex normally.

The class is intentionally small + plain so it can be passed through
FastAPI ``Depends()`` and replaced with a fake in tests.
"""

from __future__ import annotations

from dataclasses import dataclass

import httpx

from app.config import Environment, Settings

DEV_TOKEN = "DEV_TOKEN"  # noqa: S105 — public literal, not a credential
SMARTCAPTCHA_ENDPOINT = "https://smartcaptcha.yandexcloud.net/validate"


@dataclass(frozen=True, slots=True)
class CaptchaResult:
    is_valid: bool
    reason: str | None = None


class CaptchaVerifier:
    """Verifies SmartCaptcha tokens. Stateless (httpx client is created
    per call) so the same instance is safe to share across requests."""

    def __init__(self, *, server_key: str | None, dev_mode: bool, timeout_seconds: float = 3.0):
        self._server_key = server_key
        self._dev_mode = dev_mode
        self._timeout = timeout_seconds

    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        if not token:
            return CaptchaResult(is_valid=False, reason="empty_token")

        # Dev shortcut: development environments without a real client key
        # accept the literal DEV_TOKEN that the frontend stub emits.
        if self._dev_mode and token == DEV_TOKEN:
            return CaptchaResult(is_valid=True, reason="dev_bypass")

        if not self._server_key:
            # Production must always have a key. Caller treats this as a
            # 503 — we surface the cause for ops to find in logs.
            return CaptchaResult(is_valid=False, reason="captcha_not_configured")

        params: dict[str, str] = {"secret": self._server_key, "token": token}
        if ip:
            params["ip"] = ip

        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                response = await client.get(SMARTCAPTCHA_ENDPOINT, params=params)
        except httpx.HTTPError as exc:
            return CaptchaResult(is_valid=False, reason=f"upstream_error:{exc.__class__.__name__}")

        if response.status_code != 200:
            return CaptchaResult(is_valid=False, reason=f"upstream_status:{response.status_code}")

        payload = response.json()
        if isinstance(payload, dict) and payload.get("status") == "ok":
            return CaptchaResult(is_valid=True)
        return CaptchaResult(
            is_valid=False,
            reason=f"rejected:{payload.get('message') if isinstance(payload, dict) else 'unknown'}",
        )


def build_captcha_verifier(settings: Settings) -> CaptchaVerifier:
    """Composition-root factory. Reads settings; raises if a prod config
    is missing the server key (SECURITY.md A10 fail-secure)."""
    is_dev = settings.environment is not Environment.production
    server_key = settings.yandex_smartcaptcha_server_key

    if not is_dev and not server_key:
        raise RuntimeError(
            "YANDEX_SMARTCAPTCHA_SERVER_KEY is required in production; refuse to start without it.",
        )

    return CaptchaVerifier(server_key=server_key, dev_mode=is_dev)
