"""Unit tests for ParserService dispatcher (T3.1)."""

from __future__ import annotations

from dataclasses import replace

import pytest

from app.core.parsing.ports import (
    AdapterDisabled,
    ContactRef,
    ParsingError,
    SourceSnapshot,
    SourceType,
    UpstreamUnavailable,
)
from app.core.parsing.service import ParserService, snapshot_to_json


class _StubParser:
    def __init__(
        self,
        source_type: SourceType,
        *,
        available: bool = True,
        snapshot: SourceSnapshot | None = None,
        raise_exc: Exception | None = None,
    ) -> None:
        self.source_type = source_type
        self._available = available
        self._snapshot = snapshot
        self._raise = raise_exc

    def is_available(self) -> bool:
        return self._available

    async def parse(self, source_ref: str) -> SourceSnapshot:
        if self._raise is not None:
            raise self._raise
        assert self._snapshot is not None
        return replace(self._snapshot, source_ref=source_ref)


@pytest.fixture
def ymaps_snapshot() -> SourceSnapshot:
    return SourceSnapshot(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/1",
        title="Anna",
        description="Petrozavodsk nail studio",
        contacts=[ContactRef(kind="phone", value="+7 921 123-45-67")],
    )


@pytest.mark.unit
async def test_dispatches_to_registered_adapter(
    ymaps_snapshot: SourceSnapshot,
) -> None:
    svc = ParserService(
        parsers={SourceType.ymaps: _StubParser(SourceType.ymaps, snapshot=ymaps_snapshot)}
    )
    result = await svc.parse(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/1",
    )
    assert result.title == "Anna"
    assert result.extracted_at is not None  # stamped by service


@pytest.mark.unit
async def test_missing_adapter_raises_adapter_disabled() -> None:
    svc = ParserService(parsers={})
    with pytest.raises(AdapterDisabled, match="no_adapter_for:ymaps"):
        await svc.parse(source_type=SourceType.ymaps, source_ref="x")


@pytest.mark.unit
async def test_unavailable_adapter_raises_adapter_disabled(
    ymaps_snapshot: SourceSnapshot,
) -> None:
    svc = ParserService(
        parsers={
            SourceType.ymaps: _StubParser(
                SourceType.ymaps, available=False, snapshot=ymaps_snapshot
            )
        }
    )
    with pytest.raises(AdapterDisabled, match="adapter_disabled:ymaps"):
        await svc.parse(source_type=SourceType.ymaps, source_ref="x")


@pytest.mark.unit
async def test_domain_errors_propagate_unchanged() -> None:
    svc = ParserService(
        parsers={
            SourceType.ymaps: _StubParser(
                SourceType.ymaps, raise_exc=UpstreamUnavailable("timeout")
            )
        }
    )
    with pytest.raises(UpstreamUnavailable, match="timeout"):
        await svc.parse(source_type=SourceType.ymaps, source_ref="x")


@pytest.mark.unit
async def test_domain_subclass_still_caught_as_parsing_error() -> None:
    """Any ParsingError subclass should bubble through unwrapped, not
    get re-wrapped into UpstreamUnavailable."""

    class CustomError(ParsingError):
        pass

    svc = ParserService(
        parsers={SourceType.ymaps: _StubParser(SourceType.ymaps, raise_exc=CustomError("x"))}
    )
    with pytest.raises(CustomError):
        await svc.parse(source_type=SourceType.ymaps, source_ref="x")


@pytest.mark.unit
async def test_snapshot_runs_through_sanitizer(
    ymaps_snapshot: SourceSnapshot,
) -> None:
    """End-to-end: HTML injected by the stub adapter is stripped by
    the service before the caller sees it."""
    poisoned = replace(ymaps_snapshot, title="<script>alert(1)</script>Anna")
    svc = ParserService(
        parsers={SourceType.ymaps: _StubParser(SourceType.ymaps, snapshot=poisoned)}
    )
    result = await svc.parse(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/1",
    )
    assert "<" not in (result.title or "")


@pytest.mark.unit
def test_snapshot_to_json_round_trip(ymaps_snapshot: SourceSnapshot) -> None:
    payload = snapshot_to_json(ymaps_snapshot)
    assert payload["source_type"] == "ymaps"
    assert payload["contacts"] == [{"kind": "phone", "value": "+7 921 123-45-67"}]
    assert payload["extracted_at"] is None  # stub didn't stamp
