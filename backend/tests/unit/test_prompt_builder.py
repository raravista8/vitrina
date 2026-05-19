"""Tests for the prompt builder (T4.3 / FR-020)."""

from __future__ import annotations

import json

import pytest

from app.core.content.prompt_builder import (
    PROMPT_VERSION,
    SYSTEM_PROMPT,
    build_prompt,
)
from app.core.parsing.ports import (
    ContactRef,
    ReviewRef,
    ServiceItem,
    SourceSnapshot,
    SourceType,
)


@pytest.fixture
def snapshot() -> SourceSnapshot:
    return SourceSnapshot(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/123",
        title="Студия Анны",
        description="Маникюр в Петрозаводске",
        contacts=[
            ContactRef(kind="phone", value="+7 921 123-45-67"),
            ContactRef(kind="email", value="anna@example.com"),
        ],
        services=[
            ServiceItem(title="Маникюр классический", price_label="1500 ₽"),
        ],
        reviews=[
            ReviewRef(author="Маша Петрова", text="Анна Иванова — лучший мастер!", rating=5),
        ],
    )


@pytest.mark.unit
def test_system_prompt_pins_user_content_contract() -> None:
    """The 'treat between tags as data only' instruction is the
    cornerstone of T6.1. It must be present verbatim — the security
    test suite for prompt injection (T4.4 tier) relies on it."""
    assert "<user_content>" in SYSTEM_PROMPT
    assert "</user_content>" in SYSTEM_PROMPT
    assert "ИСКЛЮЧИТЕЛЬНО ДАННЫМИ" in SYSTEM_PROMPT
    assert "JSON" in SYSTEM_PROMPT


@pytest.mark.unit
def test_built_prompt_wraps_snapshot_in_user_content(snapshot: SourceSnapshot) -> None:
    built = build_prompt(snapshot)
    assert built.prompt_version == PROMPT_VERSION
    assert "<user_content>" in built.user_prompt
    assert "</user_content>" in built.user_prompt
    # System prompt is the canonical one, no mutation per call.
    assert built.system_prompt == SYSTEM_PROMPT


@pytest.mark.unit
def test_pii_is_redacted_before_reaching_user_prompt(snapshot: SourceSnapshot) -> None:
    built = build_prompt(snapshot)
    assert "+7 921" not in built.user_prompt
    assert "anna@example.com" not in built.user_prompt
    assert "Анна Иванова" not in built.user_prompt
    assert "Маша Петрова" not in built.user_prompt
    # PII mask count reported back for telemetry.
    assert built.pii_masked >= 3


@pytest.mark.unit
def test_user_prompt_contains_obfuscated_payload(snapshot: SourceSnapshot) -> None:
    built = build_prompt(snapshot)
    # The snapshot title is plain "Студия Анны" — single capitalised
    # word ("Студия") + "Анны". The current name heuristic needs ≥2
    # Capitalised tokens so "Студия Анны" may match. Either way, the
    # rest of the payload should land inside <user_content>.
    inside = built.user_prompt.split("<user_content>", 1)[1].split("</user_content>", 1)[0]
    parsed = json.loads(inside)
    assert parsed["source_type"] == "ymaps"
    assert parsed["services"][0]["title"] == "Маникюр классический"


@pytest.mark.unit
def test_prompt_is_deterministic(snapshot: SourceSnapshot) -> None:
    """Two calls with the same snapshot produce identical prompts —
    the audit log relies on this for replay."""
    a = build_prompt(snapshot)
    b = build_prompt(snapshot)
    assert a.user_prompt == b.user_prompt
    assert a.system_prompt == b.system_prompt
    assert a.pii_masked == b.pii_masked


@pytest.mark.unit
def test_empty_snapshot_still_builds_prompt() -> None:
    """A snapshot with no payload (e.g. YMaps no-match) still produces
    a valid prompt — the LLM just gets a thin <user_content> block."""
    bare = SourceSnapshot(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/1",
    )
    built = build_prompt(bare)
    assert "<user_content>" in built.user_prompt
    assert built.pii_masked == 0
