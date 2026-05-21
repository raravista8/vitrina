"""PII filter — second-line defense against curator leaking PII.

Per ADR-0010 §«Edge cases» / FR-100e: even though the prompt explicitly
tells the LLM «no PII beyond first-name+last-initial», we don't trust it.
This filter strips reviews where:

- phone-number pattern matches (RU +7… / 8… / bare 10-digit)
- email pattern matches
- full-name pattern matches (Иван Иванович Иванов / 3-token cyrillic)
- postal address pattern matches (улица / проспект / переулок + house)

Reviews failing any check are dropped from the curated set. The caller
will either show fewer reviews than requested or fall back to fewer
top-picks; both outcomes are better than a leaked customer phone.

Tests: ``backend/tests/security/test_review_pii_filter.py``.
"""

from __future__ import annotations

import re
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.core.reviews.service import CuratedReview


# -- Phone --------------------------------------------------------------------
# RU phone in any common shape: +7 …, 8 …, (xxx) … —
# strict enough to not flag «8 лет опыта» as a phone (need 3 digits next).
# Separators are `*` not `?` because real phones are «8 (916) 555-12-34»
# which has TWO separators between «8» and «916».
_PHONE_RE = re.compile(
    r"""
    (?:\+7|\b8)              # leading +7 or word-bounded 8
    [\s\-()]{0,3}            # 0-3 separators (space, dash, paren)
    \d{3}                    # area code
    [\s\-()]{0,3}
    \d{2,3}[\s\-]?\d{2,4}    # rest of digits
    """,
    re.VERBOSE,
)

# Bare 10-digit fallback (e.g. «9167388689» pasted unformatted).
# Word-bounded to avoid false-positive on long random digit-strings.
_PHONE_BARE_10_RE = re.compile(r"\b\d{10}\b")


# -- Email --------------------------------------------------------------------
_EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")


# -- Full name (Cyrillic, 3 words) -------------------------------------------
# Иван Иванович Иванов / Анна Сергеевна Петрова — three capitalised
# cyrillic words in a row. The prompt allows «Анна П.» (initial),
# never the full triplet. Two-token cyrillic ("Анна Иванова") is
# also blocked — we want to leave only first names.
_FULL_NAME_RE = re.compile(r"\b[А-ЯЁ][а-яё]{2,}\s+[А-ЯЁ][а-яё]{2,}(?:\s+[А-ЯЁ][а-яё]{2,})?\b")


# -- Address ------------------------------------------------------------------
# «улица Ленина 5», «улице Ленина 5» (любой падеж), «проспект Мира, 7»,
# «переулок Глухой 3». Plus shorthands: ул., пр-кт, пер., наб., бульвар.
# Word-stems (ул\w+) handle inflections: улица/улицы/улицу/улице/улицей.
_ADDRESS_RE = re.compile(
    r"\b(?:улиц\w+|ул\.?|проспект\w*|пр-?кт\.?|пр\.?|переулк?\w*|пер\.?|"
    r"набережн\w+|наб\.?|бульвар\w*|б-р\.?)\s+"
    r"[А-ЯЁа-яё\-]+"  # street name
    r"\s*,?\s*\d+",  # building number
    re.IGNORECASE,
)


def contains_pii(text: str) -> bool:
    """Return True if `text` looks like it has PII the LLM should have stripped."""
    if _PHONE_RE.search(text):
        return True
    if _PHONE_BARE_10_RE.search(text):
        return True
    if _EMAIL_RE.search(text):
        return True
    if _FULL_NAME_RE.search(text):
        return True
    return bool(_ADDRESS_RE.search(text))


def drop_reviews_with_pii(reviews: list[CuratedReview]) -> list[CuratedReview]:
    """Filter out reviews whose `text` triggers any PII pattern.

    `author` field is allowed to be first-name + last-initial (e.g.
    «Анна П.») — that pattern is short enough that `_FULL_NAME_RE`
    won't catch it. The full-name check only runs against `text`,
    not `author`, since «author = «Мария Петровна Сидорова»» from
    Я.Карты IS a legit display name (rare but valid).
    """
    return [r for r in reviews if not contains_pii(r.text)]
