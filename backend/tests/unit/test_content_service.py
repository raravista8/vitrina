"""Unit tests for the content generation orchestrator (T4.1)."""

from __future__ import annotations

import json

import pytest

from app.core.content.ports import LlmCallError, LlmCallResult
from app.core.content.service import generate_for_snapshot
from app.core.parsing.ports import ServiceItem, SourceSnapshot, SourceType


def _good_llm_text() -> str:
    return json.dumps(
        {
            "site_title": "Студия маникюра",
            "site_description": "Маникюр и педикюр.",
            "site_category": "beauty.nails",
            "site_color": "#0f172a",
            "site_hero_photo": "",
            "services": [
                {"title": "Маникюр", "description": "30 мин.", "price_label": "1500 ₽"},
            ],
            "gallery": [],
            "reviews": [],
        }
    )


class _FakeLlm:
    model_name = "fake-gpt"

    def __init__(
        self,
        *,
        text: str = "",
        available: bool = True,
        raise_exc: Exception | None = None,
    ) -> None:
        self._text = text
        self._available = available
        self._raise = raise_exc
        self.calls: list[tuple[str, str]] = []

    def is_available(self) -> bool:
        return self._available

    async def complete(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int,
    ) -> LlmCallResult:
        self.calls.append((system_prompt, user_prompt))
        if self._raise is not None:
            raise self._raise
        return LlmCallResult(
            text=self._text,
            tokens_in=120,
            tokens_out=240,
            model_name=self.model_name,
        )


@pytest.fixture
def snapshot() -> SourceSnapshot:
    return SourceSnapshot(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/1",
        title="Студия Анны",
        services=[ServiceItem(title="Маникюр")],
    )


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
async def test_success_path_returns_content_and_tokens(snapshot: SourceSnapshot) -> None:
    llm = _FakeLlm(text=_good_llm_text())
    outcome = await generate_for_snapshot(snapshot=snapshot, llm=llm)

    assert outcome.status == "success"
    assert outcome.content is not None
    assert outcome.content["site_title"] == "Студия маникюра"
    assert outcome.tokens_in == 120
    assert outcome.tokens_out == 240
    assert outcome.model_name == "fake-gpt"
    assert outcome.error_message is None


@pytest.mark.unit
async def test_user_content_wraps_snapshot(snapshot: SourceSnapshot) -> None:
    """End-to-end: the prompt the LLM sees contains the
    <user_content> envelope (T4.3 contract)."""
    llm = _FakeLlm(text=_good_llm_text())
    await generate_for_snapshot(snapshot=snapshot, llm=llm)
    _, user_prompt = llm.calls[0]
    assert "<user_content>" in user_prompt
    assert "</user_content>" in user_prompt


# --- failure modes --------------------------------------------------------


@pytest.mark.unit
async def test_unavailable_llm_returns_failed(snapshot: SourceSnapshot) -> None:
    llm = _FakeLlm(available=False)
    outcome = await generate_for_snapshot(snapshot=snapshot, llm=llm)
    assert outcome.status == "failed"
    assert outcome.error_message == "llm_unavailable"
    assert llm.calls == []


@pytest.mark.unit
async def test_llm_transport_failure_returns_failed(snapshot: SourceSnapshot) -> None:
    llm = _FakeLlm(raise_exc=LlmCallError("transport_down"))
    outcome = await generate_for_snapshot(snapshot=snapshot, llm=llm)
    assert outcome.status == "failed"
    assert "transport_down" in outcome.error_message  # type: ignore[operator]
    assert outcome.content is None


@pytest.mark.unit
async def test_garbage_response_returns_failed(snapshot: SourceSnapshot) -> None:
    llm = _FakeLlm(text="this is not json at all")
    outcome = await generate_for_snapshot(snapshot=snapshot, llm=llm)
    assert outcome.status == "failed"
    assert "output_rejected" in outcome.error_message  # type: ignore[operator]
    # We still record the raw text in the outcome for the audit row.
    assert outcome.response_text == "this is not json at all"


@pytest.mark.unit
async def test_off_allowlist_url_in_response_yields_flagged(snapshot: SourceSnapshot) -> None:
    """LLM smuggles an evil.com link → status=flagged, content kept
    for founder review."""
    poisoned = json.dumps(
        {
            "site_title": "Студия",
            "site_description": "Подробнее на https://evil.com/x",
            "site_category": "beauty",
            "site_color": "#000",
            "site_hero_photo": "",
            "services": [{"title": "X", "description": "", "price_label": ""}],
            "gallery": [],
            "reviews": [],
        }
    )
    llm = _FakeLlm(text=poisoned)
    outcome = await generate_for_snapshot(snapshot=snapshot, llm=llm)
    assert outcome.status == "flagged"
    assert outcome.content is not None
    assert any(f.startswith("url_off_allowlist:") for f in outcome.safety_flags)
    assert outcome.needs_review
