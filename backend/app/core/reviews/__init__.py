"""AI review curation — «Сам выбирает отзывы» (ADR-0010 / FR-100).

Public surface:

  - ``CurationInput``, ``CurationResult``, ``CuratedReview`` — data types
  - ``ReviewCurator`` (Protocol) — port for swappable adapters
  - ``curate`` — single entry, fall-through fallback if no LLM available
  - ``pii_filter`` — strict regex check against PII leak in output

Hexagonal: this package never imports from ``app.infrastructure``. Adapters
live in ``backend/app/infrastructure/yandex/gpt_review_curator.py``.
"""

from app.core.reviews.pii_filter import drop_reviews_with_pii
from app.core.reviews.service import (
    CuratedReview,
    CurationInput,
    CurationResult,
    ReviewCurator,
    curate,
)

__all__ = [
    "CuratedReview",
    "CurationInput",
    "CurationResult",
    "ReviewCurator",
    "curate",
    "drop_reviews_with_pii",
]
