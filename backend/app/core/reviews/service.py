"""Review curation port + service entrypoint.

Architectural note: this file owns the *contract*. The concrete LLM
adapter lives in ``app/infrastructure/yandex/gpt_review_curator.py``;
the fallback (top-N by rating, no LLM) lives below and is used when no
adapter is wired or when the adapter signals failure.

Edge-case behaviour comes straight from ADR-0010 §«Edge cases»:

| Condition | Behaviour |
|---|---|
| < 4 reviews in source | Return all, no `is_top_pick` flag |
| All reviews ≤ 3★ | Return empty; caller renders nothing + feedback alert |
| LLM returns garbage / fails | Fallback to top-N by rating (no `is_top_pick`) |
| Output contains PII (caught by `pii_filter`) | Drop that review from curated set |
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Protocol

from app.core.reviews.pii_filter import drop_reviews_with_pii

_log = logging.getLogger(__name__)

# ----------------------------------------------------------------------------
# Data types
# ----------------------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class CuratedReview:
    """One curated review with `is_top_pick` flag for «★ ЛУЧШИЙ» badge."""

    id: str
    """Source-specific ID (Я.Карты uuid / TG msg-id / 2GIS path id — opaque)."""
    author: str
    text: str
    rating: int
    """1–5 star rating."""
    date_iso: str
    """When the review was posted at the source — ISO 8601 date."""
    is_top_pick: bool
    """True if LLM placed it in the top tier; rendered as ★ badge."""


@dataclass(frozen=True, slots=True)
class CurationInput:
    """Everything the curator needs to make its picks."""

    reviews: list[CuratedReview]
    """Raw reviews from the source-snapshot, not yet curated."""
    category: str
    """Business category, e.g. «маникюр», «барбершоп». Influences which
    reviews feel «warm + convincing» — a barbershop wants stories about
    the cut + atmosphere, a clinic wants stories about reassurance."""


@dataclass(frozen=True, slots=True)
class CurationResult:
    """Output of one curation pass."""

    reviews: list[CuratedReview]
    """0–6 curated reviews. Empty when all reviews are ≤3★ — caller
    should hide the section AND alert the founder (FR-100c)."""
    reasoning: str = ""
    """LLM's one-line explanation for the audit log; empty when fallback."""
    model_version: str = "fallback"
    """`fallback` when no LLM ran; else e.g. `yandexgpt-5-pro-2026-04`."""
    prompt_version: str = "v1"
    """Bumps when `prompts/curate.j2` template changes — for A/B analysis."""
    audit: dict[str, object] = field(default_factory=dict)
    """Tokens, latency, reject reasons, raw response — for
    `site_reviews_curated.audit_payload`."""


# ----------------------------------------------------------------------------
# Port (Protocol — runtime-checkable adapter contract)
# ----------------------------------------------------------------------------


class ReviewCurator(Protocol):
    """Adapter contract. Concrete implementations:

    - ``YandexGPTCurator`` (production) — actual LLM call
    - ``StaticTopNCurator`` (fallback, in-process) — used when no API key
    - test fakes — for `tests/unit/test_review_curator.py`
    """

    def is_available(self) -> bool:
        """True if this curator can make real LLM calls (keys present, etc)."""
        ...

    async def curate(self, input: CurationInput) -> CurationResult:
        """Pick 4-6 best reviews. Must respect ADR-0010 §«Edge cases»."""
        ...


# ----------------------------------------------------------------------------
# Single entrypoint — used by the cron worker
# ----------------------------------------------------------------------------


MIN_REVIEWS_FOR_CURATION = 4
"""If source has fewer reviews than this, we just show them all
without curator marking (FR-100b-style edge case)."""

MIN_RATING_FOR_DISPLAY = 4
"""Reviews at this rating or above survive the basic floor filter.
Anything lower never makes it to the LLM (saves tokens AND avoids
LLM choosing to display 3-star "норм" type reviews against ADR-0010
guidance)."""

TOP_N_FALLBACK = 6
"""When LLM unavailable or fails, fall back to top-N by rating."""


async def curate(
    input: CurationInput,
    *,
    curator: ReviewCurator | None = None,
) -> CurationResult:
    """Curate reviews for one published site.

    Returns a `CurationResult` always — never raises. Edge cases per
    ADR-0010 §«Edge cases» are handled inline; callers should always
    render whatever this returns.

    `curator` defaults to None — in that mode we go straight to the
    fallback. Production wiring at the worker layer injects
    `YandexGPTCurator(api_key=settings.yandex_gpt_api_key)`.
    """

    # Edge case 1: source has < MIN_REVIEWS — show all, no top-pick flag.
    if len(input.reviews) < MIN_REVIEWS_FOR_CURATION:
        return CurationResult(
            reviews=[_strip_top_pick(r) for r in input.reviews],
            reasoning="below_min_threshold_no_curation",
        )

    # Pre-filter: reviews below MIN_RATING never reach the LLM.
    decent = [r for r in input.reviews if r.rating >= MIN_RATING_FOR_DISPLAY]

    # Edge case 2: ALL reviews ≤ 3★ → hide section + feedback alert.
    if not decent:
        return CurationResult(
            reviews=[],
            reasoning="all_reviews_below_4_stars__alert_founder",
        )

    # Try the LLM first (if wired), then fall back if it returns nothing
    # or signals unavailable.
    if curator is not None and curator.is_available():
        try:
            result = await curator.curate(
                CurationInput(reviews=decent, category=input.category),
            )
            # Strip anything that the LLM might have hallucinated + PII-leaked.
            cleaned = drop_reviews_with_pii(result.reviews)
            if cleaned:
                return CurationResult(
                    reviews=cleaned,
                    reasoning=result.reasoning,
                    model_version=result.model_version,
                    prompt_version=result.prompt_version,
                    audit=result.audit,
                )
            # LLM picked some but all dropped by PII filter → fall through.
        except Exception:
            # Defensive — never crash the cron because YGPT was flaky.
            # Logged for the audit trail, but not re-raised: the curator
            # is best-effort and the fallback below produces a usable result.
            _log.exception("review_curator_failed_falling_back_to_top_n")

    # Fallback: top-N by (rating DESC, text-length DESC). No is_top_pick badge
    # because we don't have LLM reasoning to back the choice.
    sorted_reviews = sorted(
        decent,
        key=lambda r: (-r.rating, -len(r.text)),
    )[:TOP_N_FALLBACK]
    return CurationResult(
        reviews=[_strip_top_pick(r) for r in sorted_reviews],
        reasoning="fallback_top_n_by_rating",
    )


def _strip_top_pick(r: CuratedReview) -> CuratedReview:
    """Force `is_top_pick=False` on a review — used in fallback paths
    where we don't have LLM justification for the badge."""
    return CuratedReview(
        id=r.id,
        author=r.author,
        text=r.text,
        rating=r.rating,
        date_iso=r.date_iso,
        is_top_pick=False,
    )
