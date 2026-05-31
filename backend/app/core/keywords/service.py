"""Keyword parsing / application / minus-word generation (spec 03_keywords.md).

Source of truth for the 4 content groups is the site's rendered HTML; this
module reads them out of it and writes edits back into the ``<meta
name="keywords">`` tag (a layout-neutral location — rewriting the visible
Title/H1/H2 copy of a hand-built site would risk breaking it / overspam, which
§6 explicitly lets us avoid by using meta/незаметные места).
"""

from __future__ import annotations

import contextlib
import hashlib
import html as _html
import json
import re
from html.parser import HTMLParser

# Exactly 4 groups, fixed order — matches `KEYWORD_GROUPS` in the canon UI.
GROUP_KEYS: tuple[str, ...] = ("main", "h2", "text", "blog")

_MAX_PER_GROUP = 100
_MAX_LEN = 120
# Strong phrase separators inside a heading («A · B», «A — B», «A | B»).
_SEP_RE = re.compile(r"\s*[·|—–]\s*")
_WS_RE = re.compile(r"\s+")


def empty_groups() -> dict[str, list[str]]:
    return {k: [] for k in GROUP_KEYS}


def _norm(text: str) -> str:
    return _WS_RE.sub(" ", text).strip()


def _dedup(items: list[str]) -> list[str]:
    """Order-preserving, case-insensitive dedup."""
    seen: set[str] = set()
    out: list[str] = []
    for raw in items:
        phrase = _norm(raw)
        if not phrase or len(phrase) > _MAX_LEN:
            continue
        key = phrase.casefold()
        if key in seen:
            continue
        seen.add(key)
        out.append(phrase)
    return out


def _split_phrases(heading: str) -> list[str]:
    """A heading like «Электромонтаж под ключ в СПб — полный спектр» → its
    distinct phrase segments. Splits only on strong separators, not spaces."""
    return [p for p in (_norm(s) for s in _SEP_RE.split(heading)) if len(p) >= 3]


class _HtmlExtractor(HTMLParser):
    """Pulls <title>, all <h1>/<h2> text, and the keywords meta content."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self._capture: str | None = None  # 'title' | 'h1' | 'h2'
        self._buf: list[str] = []
        self.title = ""
        self.h1: list[str] = []
        self.h2: list[str] = []
        self.meta_keywords = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in ("title", "h1", "h2"):
            self._capture = tag
            self._buf = []
        elif tag == "meta":
            a = {k.lower(): (v or "") for k, v in attrs}
            if a.get("name", "").lower() == "keywords":
                self.meta_keywords = a.get("content", "")

    def handle_endtag(self, tag: str) -> None:
        if tag == self._capture:
            text = _norm("".join(self._buf))
            if tag == "title":
                self.title = text
            elif tag == "h1" and text:
                self.h1.append(text)
            elif tag == "h2" and text:
                self.h2.append(text)
            self._capture = None
            self._buf = []

    def handle_data(self, data: str) -> None:
        if self._capture is not None:
            self._buf.append(data)


def parse_keywords_from_html(html: str) -> dict[str, list[str]]:
    """Best-effort extraction of the 4 content groups from a rendered page.

    - ``main`` ← phrases from <title> + <h1>
    - ``h2``   ← phrases from every <h2>
    - ``text`` ← the ``<meta name="keywords">`` list (the page's target phrases)
    - ``blog`` ← empty (no blog/info pages on the static sites yet)
    """
    ex = _HtmlExtractor()
    with contextlib.suppress(Exception):  # malformed markup → keep what we parsed
        ex.feed(html)

    main: list[str] = []
    if ex.title:
        main += _split_phrases(ex.title)
    for h1 in ex.h1:
        main += _split_phrases(h1)

    h2: list[str] = []
    for h in ex.h2:
        h2 += _split_phrases(h)

    text = [s for s in (_norm(x) for x in ex.meta_keywords.split(",")) if s]

    return {
        "main": _dedup(main)[:_MAX_PER_GROUP],
        "h2": _dedup(h2)[:_MAX_PER_GROUP],
        "text": _dedup(text)[:_MAX_PER_GROUP],
        "blog": [],
    }


def sanitize_groups(groups: dict[str, object]) -> dict[str, list[str]]:
    """Coerce a client-supplied payload into the canonical 4-group shape:
    trim, drop empties / over-length, dedup, cap per group. Unknown keys
    dropped; missing keys → empty."""
    out = empty_groups()
    for key in GROUP_KEYS:
        value = groups.get(key, [])
        if not isinstance(value, list):
            continue
        out[key] = _dedup([str(v) for v in value])[:_MAX_PER_GROUP]
    return out


def source_rev(groups: dict[str, list[str]]) -> str:
    """Stable short revision of a group set — detects out-of-band content drift."""
    payload = json.dumps({k: groups.get(k, []) for k in GROUP_KEYS}, ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:12]


def _flatten(groups: dict[str, list[str]]) -> list[str]:
    """All groups → one deduped keyword list for the meta tag."""
    merged: list[str] = []
    for key in GROUP_KEYS:
        merged += groups.get(key, [])
    return _dedup(merged)


_META_KW_RE = re.compile(
    r'<meta\b[^>]*\bname\s*=\s*"keywords"[^>]*>',
    re.IGNORECASE,
)


def apply_keywords_to_html(html: str, groups: dict[str, list[str]]) -> str:
    """Write the keyword set into the page's ``<meta name="keywords">``.

    Layout-neutral: only the meta tag changes — visible Title/H1/H2 copy is
    untouched (rewriting a hand-built page risks breaking it / overspam; full
    visible-copy application is the customer-SSR pipeline's job). Replaces an
    existing keywords meta in place, or inserts one before </head>.
    """
    content = _html.escape(", ".join(_flatten(groups)), quote=True)
    tag = f'<meta name="keywords" content="{content}" />'
    if _META_KW_RE.search(html):
        return _META_KW_RE.sub(tag, html, count=1)
    # No keywords meta yet — inject just before </head> (case-insensitive).
    idx = html.lower().find("</head>")
    if idx == -1:
        return html
    return html[:idx] + "  " + tag + "\n" + html[idx:]


# ── minus-words (read-only, for Yandex.Direct — NEVER written to the site) ────

# Universal commercial/info-intent negatives — irrelevant clicks for a
# services business paying per click.
_BASE_MINUS: tuple[str, ...] = (
    "вакансии",
    "работа",
    "требуется",
    "зарплата",
    "резюме",
    "обучение",
    "курсы",
    "учебник",
    "своими руками",
    "самостоятельно",
    "скачать",
    "бесплатно",
    "форум",
    "видео",
    "профессия",
)

# Niche-specific negatives, keyed by `Site.settings['niche']`.
_NICHE_MINUS: dict[str, tuple[str, ...]] = {
    "electrician": (
        "схема",
        "чертёж",
        "разряд",
        "удостоверение",
        "допуск",
        "кабель купить",
        "автомат купить",
        "розетка купить",
        "щит купить",
        "ввгнг купить",
        "как стать электриком",
    ),
}


def generate_minus_words(niche: str | None) -> list[str]:
    """Per-site minus-word list: universal base + niche specifics. Deterministic."""
    words = list(_BASE_MINUS)
    words += list(_NICHE_MINUS.get((niche or "").strip().lower(), ()))
    return _dedup(words)
