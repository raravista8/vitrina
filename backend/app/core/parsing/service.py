"""Parser dispatcher service (T3.1).

A thin composition layer: maps ``SourceType`` to a concrete
``SourceParser`` and runs the request inside a try/except so the
worker's per-job error handling never sees a raw exception that didn't
carry domain semantics.

Why this exists separately from the worker entry-point: it lets the
admin router (T2.3-style manual flow) trigger a parse synchronously
during the early MVP, before the RQ-worker is wired end-to-end. Same
code path runs in both contexts.
"""

from __future__ import annotations

from dataclasses import asdict
from datetime import UTC, datetime
from typing import Any

from app.core.parsing.ports import (
    AdapterDisabled,
    ParsingError,
    SourceParser,
    SourceSnapshot,
    SourceType,
    UpstreamUnavailable,
)
from app.core.parsing.sanitizer import SnapshotTooLarge, sanitize_snapshot
from app.utils.logging import get_logger


class ParserService:
    """Routes a parse request to the right adapter, sanitises the
    result, and returns it. Never raises non-domain exceptions —
    everything bubbles up as a ``ParsingError`` subclass."""

    def __init__(self, parsers: dict[SourceType, SourceParser]) -> None:
        self._parsers = parsers
        self._log = get_logger("core.parsing.service")

    async def parse(self, *, source_type: SourceType, source_ref: str) -> SourceSnapshot:
        parser = self._parsers.get(source_type)
        if parser is None:
            raise AdapterDisabled(f"no_adapter_for:{source_type.value}")
        if not parser.is_available():
            raise AdapterDisabled(f"adapter_disabled:{source_type.value}")

        try:
            raw = await parser.parse(source_ref)
        except ParsingError:
            raise
        except Exception as exc:  # pragma: no cover — kept as a safety net
            raise UpstreamUnavailable(f"adapter_crashed:{exc.__class__.__name__}") from exc

        # Stamp the extraction time here, not in the adapter — keeps
        # adapters from having to import datetime.UTC.
        with_timestamp = raw if raw.extracted_at else _stamp(raw)

        try:
            sanitized = sanitize_snapshot(with_timestamp)
        except SnapshotTooLarge as exc:
            self._log.warning(
                "snapshot_too_large",
                source_type=source_type.value,
                source_ref=source_ref,
                reason=str(exc),
            )
            raise UpstreamUnavailable(f"snapshot_too_large:{exc}") from exc

        self._log.info(
            "snapshot_parsed",
            source_type=source_type.value,
            source_ref=source_ref,
            photos=len(sanitized.photos),
            reviews=len(sanitized.reviews),
            services=len(sanitized.services),
        )
        return sanitized


def _stamp(snapshot: SourceSnapshot) -> SourceSnapshot:
    """Attach the current UTC timestamp without touching the rest."""
    from dataclasses import replace

    return replace(snapshot, extracted_at=datetime.now(UTC))


def snapshot_to_json(snapshot: SourceSnapshot) -> dict[str, Any]:
    """Convert to a JSON-safe dict for ``sites.source_snapshot``.

    Lives here (not on the dataclass) because the dataclass module
    can't depend on JSON shape decisions — the persistence shape is a
    boundary concern.
    """
    return {
        "source_type": snapshot.source_type.value,
        "source_ref": snapshot.source_ref,
        "title": snapshot.title,
        "description": snapshot.description,
        "contacts": [asdict(c) for c in snapshot.contacts],
        "photos": [asdict(p) for p in snapshot.photos],
        "reviews": [asdict(r) for r in snapshot.reviews],
        "services": [asdict(s) for s in snapshot.services],
        "metadata": snapshot.metadata,
        "extracted_at": (snapshot.extracted_at.isoformat() if snapshot.extracted_at else None),
    }
