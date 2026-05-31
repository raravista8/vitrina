"""SEO keywords domain (client ЛК «Ключевые слова» — spec 03_keywords.md).

Two entities, never mixed:
- content keywords (4 groups: main/h2/text/blog) — read FROM the site's
  rendered pages, edited by the client, written BACK to the live page's
  ``<meta name="keywords">`` (the layout-neutral home — see §6 fallback);
- minus-words — read-only, generated per niche for Yandex.Direct, NEVER
  written into the site.

Pure functions on HTML strings + plain data — no infrastructure imports.
"""

from app.core.keywords.service import (
    GROUP_KEYS,
    apply_keywords_to_html,
    empty_groups,
    generate_minus_words,
    parse_keywords_from_html,
    sanitize_groups,
    source_rev,
)

__all__ = [
    "GROUP_KEYS",
    "apply_keywords_to_html",
    "empty_groups",
    "generate_minus_words",
    "parse_keywords_from_html",
    "sanitize_groups",
    "source_rev",
]
