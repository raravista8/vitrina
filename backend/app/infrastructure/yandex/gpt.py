"""YandexGPT Foundation Models adapter (T4.1, ADR-0003).

Thin async HTTP client around YandexGPT 5 Pro. Implements the
``LlmClient`` Protocol from ``app.core.content.ports`` so the content
service stays hexagonal-clean.

Endpoint: ``https://llm.api.cloud.yandex.net/foundationModels/v1/completion``
Docs: https://yandex.cloud/docs/foundation-models/api-ref/TextGeneration/completion

When ``YANDEXGPT_API_KEY`` is empty, ``is_available()`` returns False
and the service skips the LLM step (founder reviews snapshots
manually). This keeps `make dev` and the test suite functional
without YC credentials.
"""

from __future__ import annotations

from typing import Any

import httpx

from app.core.content.ports import (
    AdapterDisabledError,
    LlmCallError,
    LlmCallResult,
)
from app.utils.logging import get_logger

COMPLETION_URL = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
DEFAULT_MODEL_NAME = "yandexgpt"
DEFAULT_MODEL_VERSION = "rc"


class YandexGptClient:
    """Async client. Single ``complete()`` method that takes the
    system + user prompt strings and returns parsed text + token
    counts. JSON parsing of the LLM body lives one layer up (the
    output validator)."""

    def __init__(
        self,
        *,
        api_key: str | None,
        folder_id: str | None,
        model_name: str = DEFAULT_MODEL_NAME,
        model_version: str = DEFAULT_MODEL_VERSION,
        temperature: float = 0.3,
        timeout_seconds: float = 30.0,
    ) -> None:
        self._api_key = api_key
        self._folder_id = folder_id
        self.model_name = model_name
        self._model_version = model_version
        self._temperature = temperature
        self._timeout = timeout_seconds
        self._log = get_logger("infrastructure.yandex.gpt")

    def is_available(self) -> bool:
        return bool(self._api_key) and bool(self._folder_id)

    async def complete(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int,
    ) -> LlmCallResult:
        if not self.is_available():
            raise AdapterDisabledError("yandexgpt_unavailable")

        body = {
            "modelUri": f"gpt://{self._folder_id}/{self.model_name}/{self._model_version}",
            "completionOptions": {
                "stream": False,
                "temperature": self._temperature,
                "maxTokens": str(max_tokens),
            },
            "messages": [
                {"role": "system", "text": system_prompt},
                {"role": "user", "text": user_prompt},
            ],
        }
        headers = {
            "Authorization": f"Api-Key {self._api_key}",
            "Content-Type": "application/json",
            "x-folder-id": self._folder_id or "",
        }
        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                resp = await client.post(COMPLETION_URL, json=body, headers=headers)
        except httpx.HTTPError as exc:
            raise LlmCallError(f"yandexgpt_transport_failed:{exc.__class__.__name__}") from exc

        if resp.status_code >= 500:
            raise LlmCallError(f"yandexgpt_http_{resp.status_code}")
        if resp.status_code >= 400:
            # 4xx is usually a config bug (bad model URI / quota / auth);
            # surface as a non-retryable LlmCallError so the service
            # marks the generation for manual review.
            raise LlmCallError(f"yandexgpt_client_error:{resp.status_code}:{resp.text[:200]}")

        payload: Any
        try:
            payload = resp.json()
        except ValueError as exc:
            raise LlmCallError("yandexgpt_response_not_json") from exc

        text, tokens_in, tokens_out = _extract(payload)
        self._log.info(
            "yandexgpt_completion",
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            model_name=self.model_name,
        )
        return LlmCallResult(
            text=text,
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            model_name=self.model_name,
        )


def _extract(payload: Any) -> tuple[str, int, int]:
    """Pull the text + token counts out of the documented response shape.

      {"result": {"alternatives": [{"message": {"text": "..."}}],
                 "usage": {"inputTextTokens": "N", "completionTokens": "N"}}}

    All numeric fields come back as strings in the YC response; we
    coerce to ``int`` here so downstream cost-accounting code doesn't
    have to.
    """
    if not isinstance(payload, dict):
        raise LlmCallError("yandexgpt_response_not_dict")
    result = payload.get("result")
    if not isinstance(result, dict):
        raise LlmCallError("yandexgpt_no_result")
    alts = result.get("alternatives")
    if not isinstance(alts, list) or not alts:
        raise LlmCallError("yandexgpt_no_alternatives")
    msg = alts[0].get("message") if isinstance(alts[0], dict) else None
    if not isinstance(msg, dict):
        raise LlmCallError("yandexgpt_no_message")
    text = msg.get("text")
    if not isinstance(text, str):
        raise LlmCallError("yandexgpt_no_text")
    usage = result.get("usage") or {}
    tokens_in = _coerce_int(usage.get("inputTextTokens"))
    tokens_out = _coerce_int(usage.get("completionTokens"))
    return text, tokens_in, tokens_out


def _coerce_int(value: Any) -> int:
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.isdigit():
        return int(value)
    return 0
