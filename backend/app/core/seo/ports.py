"""SEO submission ports (T2.6).

Adapters fire the canonical "your URL just changed" pings to Yandex
Webmaster, IndexNow (covers Yandex + Bing in a single endpoint), and
Google Search Console. The orchestrator parallelises calls within a
budget and records each engine's outcome on ``sites.seo_submission_log``.

Per FR-033 the service runs within 5 minutes of publish; per CLAUDE.md
the engines themselves are pluggable adapters so we can add Cloudflare
Index or future-engine X without touching the publish flow.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import StrEnum
from typing import Protocol


class SeoEngine(StrEnum):
    yandex_webmaster = "yandex_webmaster"
    indexnow = "indexnow"
    google_search_console = "google_search_console"


@dataclass(frozen=True, slots=True)
class SubmissionResult:
    engine: SeoEngine
    submitted: bool
    reason: str | None = None
    upstream_status: int | None = None


class SeoSubmitter(Protocol):
    """One adapter per engine. The service iterates them in parallel."""

    engine: SeoEngine

    def is_available(self) -> bool: ...

    async def submit(self, site_url: str) -> SubmissionResult: ...
