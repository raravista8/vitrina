"""Preview orchestrator (T1.4b).

A thin façade that routes the request to the right adapter and enforces
the FR-005a 3-second budget. Per CLAUDE.md, domain errors don't escape
as exceptions — the router consumes ``PreviewOutcome`` and translates to
HTTP.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass

from app.core.preview.ports import (
    PreviewAdapter,
    PreviewResult,
    PreviewSourceType,
)
from app.utils.logging import get_logger

PREVIEW_BUDGET_SECONDS = 3.0


@dataclass(frozen=True, slots=True)
class PreviewOutcome:
    """Result of one preview attempt. ``result`` is set on success;
    ``reason`` is set on failure with a stable code the router maps to
    HTTP status."""

    result: PreviewResult | None = None
    reason: str | None = None

    @property
    def succeeded(self) -> bool:
        return self.result is not None


class PreviewService:
    def __init__(self, adapters: dict[PreviewSourceType, PreviewAdapter]) -> None:
        self._adapters = adapters
        self._log = get_logger("core.preview.service")

    async def preview(self, source_type: PreviewSourceType, source_url: str) -> PreviewOutcome:
        adapter = self._adapters.get(source_type)
        if adapter is None or not adapter.is_available():
            self._log.info("preview_adapter_unavailable", source_type=source_type.value)
            return PreviewOutcome(reason="adapter_unavailable")

        try:
            result = await asyncio.wait_for(
                adapter.fetch(source_url), timeout=PREVIEW_BUDGET_SECONDS
            )
        except TimeoutError:
            self._log.info(
                "preview_timeout",
                source_type=source_type.value,
                budget=PREVIEW_BUDGET_SECONDS,
            )
            return PreviewOutcome(reason="timeout")
        except Exception as exc:
            self._log.warning(
                "preview_upstream_error",
                source_type=source_type.value,
                error=exc.__class__.__name__,
            )
            return PreviewOutcome(reason=f"upstream_error:{exc.__class__.__name__}")

        self._log.info(
            "preview_ok",
            source_type=source_type.value,
            has_counts=any(
                v is not None
                for v in (result.counts.posts, result.counts.photos, result.counts.reviews)
            ),
        )
        return PreviewOutcome(result=result)
