"""Google Search Console URL Inspection / Indexing submitter (T2.6).

GSC needs a Google service-account JWT, which itself needs the
``google-auth`` library + a service-account JSON keyfile. Full
integration is a separate runtime dep + ADR; for T2.6 we ship the
adapter shape with a graceful "not configured" path so the publisher
flow stays complete. When ``GSC_SERVICE_ACCOUNT_JSON`` is set later,
the adapter will be filled in (or replaced with a sitemap-ping
fallback).
"""

from __future__ import annotations

from app.core.seo.ports import SeoEngine, SubmissionResult


class GoogleSearchConsoleSubmitter:
    engine = SeoEngine.google_search_console

    def __init__(self, *, service_account_json_path: str | None = None) -> None:
        self._json_path = service_account_json_path

    def is_available(self) -> bool:
        # T2.6 ships disabled by default. Enable once a service-account
        # keyfile lands + the JWT-signing path is wired (ADR required —
        # `google-auth` is a new runtime dep).
        return False

    async def submit(self, site_url: str) -> SubmissionResult:  # noqa: ARG002
        return SubmissionResult(
            engine=self.engine,
            submitted=False,
            reason="adapter_disabled_pending_adr",
        )
