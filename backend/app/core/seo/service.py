"""SEO submission service (T2.6).

Fires every available submitter in parallel with a per-engine timeout.
Returns the list of ``SubmissionResult`` for the publisher to write to
``sites.seo_submission_log``.

The orchestrator never raises — engine failures are recorded individually,
so a single broken adapter never blocks the publish flow (FR-033 stays
green from the user's perspective even if Google's API is down).
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass

from app.core.seo.ports import SeoEngine, SeoSubmitter, SubmissionResult
from app.utils.logging import get_logger

SUBMIT_BUDGET_SECONDS = 10.0


@dataclass(frozen=True, slots=True)
class SeoSubmissionReport:
    results: list[SubmissionResult]

    @property
    def succeeded_engines(self) -> list[SeoEngine]:
        return [r.engine for r in self.results if r.submitted]

    @property
    def all_succeeded(self) -> bool:
        return bool(self.results) and all(r.submitted for r in self.results)


class SeoSubmissionService:
    def __init__(self, submitters: dict[SeoEngine, SeoSubmitter]) -> None:
        self._submitters = submitters
        self._log = get_logger("core.seo.service")

    async def submit(self, site_url: str) -> SeoSubmissionReport:
        eligible = [s for s in self._submitters.values() if s.is_available()]
        if not eligible:
            self._log.warning("seo_no_eligible_engines")
            return SeoSubmissionReport(results=[])

        coros = [self._submit_one(s, site_url) for s in eligible]
        results = await asyncio.gather(*coros)
        report = SeoSubmissionReport(results=list(results))
        self._log.info(
            "seo_submission_complete",
            site_url=site_url,
            submitted=[r.engine.value for r in results if r.submitted],
            failed=[r.engine.value for r in results if not r.submitted],
        )
        return report

    async def _submit_one(self, submitter: SeoSubmitter, site_url: str) -> SubmissionResult:
        try:
            return await asyncio.wait_for(submitter.submit(site_url), timeout=SUBMIT_BUDGET_SECONDS)
        except TimeoutError:
            return SubmissionResult(engine=submitter.engine, submitted=False, reason="timeout")
        except Exception as exc:
            return SubmissionResult(
                engine=submitter.engine,
                submitted=False,
                reason=f"upstream_error:{exc.__class__.__name__}",
            )
