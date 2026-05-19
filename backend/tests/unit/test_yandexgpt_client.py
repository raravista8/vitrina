"""Unit tests for the YandexGPT HTTP client (T4.1)."""

from __future__ import annotations

import json

import httpx
import pytest

from app.core.content.ports import AdapterDisabledError, LlmCallError
from app.infrastructure.yandex.gpt import YandexGptClient


def _success_response(*, text: str = '{"site_title":"X"}') -> dict[str, object]:
    return {
        "result": {
            "alternatives": [{"message": {"role": "assistant", "text": text}}],
            "usage": {
                "inputTextTokens": "100",
                "completionTokens": "250",
                "totalTokens": "350",
            },
        }
    }


def _patch_transport(monkeypatch: pytest.MonkeyPatch, transport: httpx.MockTransport) -> None:
    original = httpx.AsyncClient

    class _Patched(original):  # type: ignore[misc, valid-type]
        def __init__(self, *args, **kwargs):
            kwargs["transport"] = transport
            super().__init__(*args, **kwargs)

    monkeypatch.setattr(httpx, "AsyncClient", _Patched)


# --- gating ---------------------------------------------------------------


@pytest.mark.unit
def test_unavailable_without_api_key() -> None:
    assert YandexGptClient(api_key=None, folder_id="f1").is_available() is False


@pytest.mark.unit
def test_unavailable_without_folder_id() -> None:
    assert YandexGptClient(api_key="k", folder_id=None).is_available() is False


@pytest.mark.unit
async def test_complete_raises_adapter_disabled_when_unavailable() -> None:
    client = YandexGptClient(api_key=None, folder_id=None)
    with pytest.raises(AdapterDisabledError):
        await client.complete(system_prompt="s", user_prompt="u", max_tokens=10)


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
async def test_complete_parses_response(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["body"] = json.loads(request.content)
        captured["headers"] = dict(request.headers)
        return httpx.Response(200, json=_success_response(text='{"site_title":"Анна"}'))

    _patch_transport(monkeypatch, httpx.MockTransport(handler))

    client = YandexGptClient(
        api_key="test-key",  # pragma: allowlist secret
        folder_id="folder-1",
        model_name="yandexgpt",
        model_version="rc",
    )
    result = await client.complete(system_prompt="sys", user_prompt="user", max_tokens=500)

    assert result.text == '{"site_title":"Анна"}'
    assert result.tokens_in == 100
    assert result.tokens_out == 250
    assert result.model_name == "yandexgpt"

    body = captured["body"]
    assert body["modelUri"] == "gpt://folder-1/yandexgpt/rc"  # type: ignore[index]
    headers = captured["headers"]
    assert headers["authorization"] == "Api-Key test-key"  # type: ignore[index]
    assert headers["x-folder-id"] == "folder-1"  # type: ignore[index]


# --- error mapping --------------------------------------------------------


@pytest.mark.unit
async def test_http_500_raises_llm_call_error(monkeypatch: pytest.MonkeyPatch) -> None:
    _patch_transport(
        monkeypatch,
        httpx.MockTransport(lambda _: httpx.Response(503, text="upstream busy")),
    )
    client = YandexGptClient(
        api_key="k",  # pragma: allowlist secret
        folder_id="f",
    )
    with pytest.raises(LlmCallError, match="yandexgpt_http_503"):
        await client.complete(system_prompt="s", user_prompt="u", max_tokens=10)


@pytest.mark.unit
async def test_http_400_raises_llm_call_error(monkeypatch: pytest.MonkeyPatch) -> None:
    _patch_transport(
        monkeypatch,
        httpx.MockTransport(lambda _: httpx.Response(400, text="bad model uri")),
    )
    client = YandexGptClient(
        api_key="k",  # pragma: allowlist secret
        folder_id="f",
    )
    with pytest.raises(LlmCallError, match="yandexgpt_client_error:400"):
        await client.complete(system_prompt="s", user_prompt="u", max_tokens=10)


@pytest.mark.unit
async def test_non_json_response_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    _patch_transport(
        monkeypatch,
        httpx.MockTransport(lambda _: httpx.Response(200, text="not json")),
    )
    client = YandexGptClient(
        api_key="k",  # pragma: allowlist secret
        folder_id="f",
    )
    with pytest.raises(LlmCallError, match="yandexgpt_response_not_json"):
        await client.complete(system_prompt="s", user_prompt="u", max_tokens=10)


@pytest.mark.unit
async def test_missing_result_block_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    _patch_transport(
        monkeypatch,
        httpx.MockTransport(lambda _: httpx.Response(200, json={"unexpected": "shape"})),
    )
    client = YandexGptClient(
        api_key="k",  # pragma: allowlist secret
        folder_id="f",
    )
    with pytest.raises(LlmCallError, match="yandexgpt_no_result"):
        await client.complete(system_prompt="s", user_prompt="u", max_tokens=10)


@pytest.mark.unit
async def test_transport_error_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    def boom(_: httpx.Request) -> httpx.Response:
        raise httpx.ConnectError("connection refused")

    _patch_transport(monkeypatch, httpx.MockTransport(boom))
    client = YandexGptClient(
        api_key="k",  # pragma: allowlist secret
        folder_id="f",
    )
    with pytest.raises(LlmCallError, match="yandexgpt_transport_failed"):
        await client.complete(system_prompt="s", user_prompt="u", max_tokens=10)
