"""Static-site renderer for the *milreview* content site
(«Железнодорожный путеводитель», served at ``milreview.samosite.online``).

Unlike the LLM-driven booking-site pipeline (``render.py`` + ``service.py``),
milreview is a hand-built, multi-page **content** site. Its data lives as
committed JSON under ``sites-template/milreview/content/`` (extracted verbatim
from the design canon) and its layout as Jinja templates under
``sites-template/milreview/``. This module renders every page + the per-station
pages + sitemap/robots into a ``{key: (content, content_type)}`` dict that the
publish worker uploads to S3 under the ``milreview/`` key prefix — the same
static-origin + Caddy-wildcard path every customer site uses.

SEO is baked in: server-rendered chronicle/docs (crawlable, JS only filters the
DOM), one static file per station with a unique ``<title>``/description/canonical
+ JSON-LD ``Article``, a site-wide JSON-LD ``WebSite``, OG/Twitter tags, sitemap
listing every page, and robots.txt. There is **no watermark** (TZ §4.4).

Authored content is passed through a tight ``bleach`` allowlist before being
marked safe (``rich`` filter) — defence-in-depth + keeps templates free of
``| safe`` — and short Russian prepositions are glued to the next word with a
non-breaking space (``nbsp``/``rich``) per ``specs/04_typography.md``.
"""

from __future__ import annotations

import json
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import bleach
from jinja2 import Environment
from markupsafe import Markup

from app.core.publishing.render import make_environment

# ── content types for the uploader ──────────────────────────────────────────
_HTML = "text/html; charset=utf-8"
_XML = "application/xml; charset=utf-8"
_TXT = "text/plain; charset=utf-8"
_CSS = "text/css; charset=utf-8"

# ── typography: short words glued to the next word (specs/04_typography.md §2) ──
_SHORT_WORDS = (
    "в с к у о и а на за от до по из для что как или но же ли то не без со об ко во при"
).split()
_NBSP = " "
_NBSP_RE = re.compile(
    r"(?<![А-Яа-яЁёA-Za-z])(" + "|".join(_SHORT_WORDS) + r") (?=[А-Яа-яЁёA-Za-z«0-9])",
    re.IGNORECASE,
)

# ── rich-text sanitisation allowlist (authored inline markup) ────────────────
_ALLOWED_TAGS = {"a", "strong", "em", "br"}
_ALLOWED_ATTRS = {"a": ["href", "target", "rel"]}

# ``station.html?id=NNNN`` (canon link format) → ``station-NNNN.html`` (our flat
# per-station static files — distinct crawlable URLs).
_STATION_LINK_RE = re.compile(r"station\.html\?id=(\d+)")

# directory abbreviation → full kind label for stub station cards
_KIND_FULL = {
    "ст.": "Станция",
    "рзд.": "Разъезд",
    "о.п.": "Остановочный пункт",
    "б/п": "Блок-пост",
    "пл.": "Платформа",
    "п/п": "Путевой пост",
}

# news ``type`` → chronicle tag CSS class (canon ``tagClass()``)
_TAG_CLASS = {
    "doc": "t-doc",
    "move": "t-troops",
    "scheme": "t-card",
    "photo": "t-class",
    "signal": "t-study",
    "report": "t-event",
}

_CONTENT_FILES = ("site", "news", "docs", "directory", "stations", "signaling", "reports")


def resolve_milreview_dir(sites_template_dir: str | None = None) -> Path:
    """Locate ``sites-template/milreview/``, honouring ``SITES_TEMPLATE_DIR``.

    The repo and the Docker image place ``sites-template`` at *different* depths
    relative to the ``app`` package (monorepo: a sibling of ``backend/``; Docker:
    ``/app/sites-template`` next to the ``app`` package). So we try both candidate
    roots and return the one that actually contains ``milreview/`` — robust in
    both layouts without depending on an env var being set. (``app.main`` resolves
    ``sites-template`` via a fixed ``parents[2]`` that is only correct in the
    monorepo — kept here as the fallback for sensible error messages.)
    """
    if sites_template_dir:
        return Path(sites_template_dir) / "milreview"
    here = Path(__file__).resolve()
    candidates = (
        here.parents[4] / "sites-template",  # monorepo: repo root
        here.parents[3] / "sites-template",  # Docker: /app (the app-package parent)
    )
    for root in candidates:
        if (root / "milreview").is_dir():
            return root / "milreview"
    return candidates[0] / "milreview"


# ── Jinja filters ────────────────────────────────────────────────────────────


def _glue_nbsp(text: str) -> str:
    return _NBSP_RE.sub(r"\1" + _NBSP, text)


def _filter_nbsp(value: Any) -> str:
    """Glue short prepositions to the next word. For plain-text fields only."""
    return _glue_nbsp(str(value))


def _relink(value: str) -> str:
    return _STATION_LINK_RE.sub(r"station-\1.html", value)


def _filter_relink(value: Any) -> str:
    """Rewrite a plain ``station.html?id=N`` href to ``station-N.html``."""
    return _relink(str(value))


def _filter_rich(value: Any) -> Markup:
    """Sanitise authored inline HTML, rewrite station links, glue nbsp, mark safe.

    The bleach pass is defence-in-depth on our own content and keeps templates
    free of ``| safe``; the allowlist is ``<a>``/``<strong>``/``<em>``/``<br>``.
    """
    s = _relink(str(value))
    s = bleach.clean(s, tags=_ALLOWED_TAGS, attributes=_ALLOWED_ATTRS, strip=True)
    s = _glue_nbsp(s)
    # nosec B704 — `s` is bleach-sanitised (tight allowlist) immediately above,
    # so marking it safe is the sanctioned sanitise-then-render pattern, not an
    # XSS sink. _glue_nbsp only inserts U+00A0 into text, adds no markup.
    return Markup(s)  # nosec B704


def _filter_station_url(station_id: Any) -> str:
    return f"station-{station_id}.html"


def _make_env(base_dir: Path) -> Environment:
    env = make_environment(base_dir)
    env.filters["nbsp"] = _filter_nbsp
    env.filters["relink"] = _filter_relink
    env.filters["rich"] = _filter_rich
    env.filters["station_url"] = _filter_station_url
    return env


# ── content loading + derivations ────────────────────────────────────────────


def _load_content(base_dir: Path) -> dict[str, Any]:
    content_dir = base_dir / "content"
    out: dict[str, Any] = {}
    for name in _CONTENT_FILES:
        out[name] = json.loads((content_dir / f"{name}.json").read_text(encoding="utf-8"))
    return out


def _doc_sort_key(date_ddmmyyyy: str) -> str:
    day, month, year = date_ddmmyyyy.split(".")
    return f"{year}{month}{day}"


def _augment_news(news: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [{**n, "tag_class": _TAG_CLASS.get(n.get("type", ""), "")} for n in news]


def build_stations(
    directory: list[dict[str, Any]],
    stations_full: dict[str, Any],
) -> dict[str, dict[str, Any]]:
    """Merge the railmap directory with full station cards.

    Every directory entry yields a station page so all links resolve: entries
    with a full card (``stations.json``) render the rich layout; the rest get an
    honest stub (name/kind/road from the directory + "карточка готовится") — no
    fabricated specs, history or photos.
    """
    out: dict[str, dict[str, Any]] = {}

    def _normalise_full(sid: str, card: dict[str, Any]) -> dict[str, Any]:
        st = dict(card)
        st["slug"] = f"station-{sid}.html"
        st.setdefault("photos", ["", "", ""])
        st.setdefault("neighbors", [])
        st.setdefault("docs", [])
        st.setdefault("history", "")
        return st

    for group in directory:
        for name, kind_abbr, raw_id in group["items"]:
            sid = str(raw_id)
            if sid in out:
                continue
            card = stations_full.get(sid)
            if card:
                out[sid] = _normalise_full(sid, card)
                continue
            kind = _KIND_FULL.get(kind_abbr, kind_abbr)
            out[sid] = {
                "name": name,
                "kind": kind,
                "road": group["road"],
                "region": group["region"],
                "line": f"{kind} {group['road']} железной дороги. Подробная карточка готовится.",
                "spec": [["Дорога", group["road"]], ["Тип", kind]],
                "photos": ["", "", ""],
                "history": "",
                "neighbors": [],
                "docs": [],
                "slug": f"station-{sid}.html",
            }

    # full-only stations not present in the directory (e.g. the home featured 1469)
    for sid, card in stations_full.items():
        if sid not in out:
            out[sid] = _normalise_full(sid, card)

    return out


def _jsonld_website(site: dict[str, Any], base_url: str) -> dict[str, Any]:
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": site["title"],
        "url": f"{base_url}/",
        "inLanguage": "ru",
        "description": site["meta_description"],
    }


def _jsonld_article(st: dict[str, Any], site: dict[str, Any], base_url: str) -> dict[str, Any]:
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": f"{st['name']} — {site['title']}",
        "description": (
            f"{st['kind']} {st['name']} {st['road']} железной дороги: "
            "схема путевого развития, справка, фотографии и история."
        ),
        "inLanguage": "ru",
        "mainEntityOfPage": f"{base_url}/{st['slug']}",
        "isPartOf": {"@type": "WebSite", "name": site["title"], "url": f"{base_url}/"},
    }


def _sitemap_pages(
    base_url: str,
    stations: dict[str, dict[str, Any]],
    lastmod: str,
) -> list[dict[str, str]]:
    pages = [
        {"loc": f"{base_url}/", "lastmod": lastmod, "changefreq": "weekly", "priority": "1.0"},
        {
            "loc": f"{base_url}/railmap.html",
            "lastmod": lastmod,
            "changefreq": "weekly",
            "priority": "0.8",
        },
        {
            "loc": f"{base_url}/docs.html",
            "lastmod": lastmod,
            "changefreq": "weekly",
            "priority": "0.8",
        },
        {
            "loc": f"{base_url}/signaling.html",
            "lastmod": lastmod,
            "changefreq": "monthly",
            "priority": "0.6",
        },
        {
            "loc": f"{base_url}/reports.html",
            "lastmod": lastmod,
            "changefreq": "monthly",
            "priority": "0.6",
        },
    ]
    for st in stations.values():
        pages.append(
            {
                "loc": f"{base_url}/{st['slug']}",
                "lastmod": lastmod,
                "changefreq": "monthly",
                "priority": "0.5",
            }
        )
    return pages


def render_all(
    *,
    base_dir: Path | None = None,
    base_url: str,
    lastmod: str | None = None,
) -> dict[str, tuple[str, str]]:
    """Render the whole milreview site.

    Returns ``{key: (content, content_type)}`` where ``key`` is the S3 object key
    relative to the ``milreview/`` prefix (e.g. ``index.html``,
    ``station-1706.html``, ``sitemap.xml``, ``styles.css``).
    """
    base_dir = base_dir or resolve_milreview_dir()
    base_url = base_url.rstrip("/")
    lastmod = lastmod or datetime.now(UTC).date().isoformat()

    content = _load_content(base_dir)
    site = content["site"]
    env = _make_env(base_dir)

    common = {
        "site": site,
        "base_url": base_url,
        "jsonld_website": _jsonld_website(site, base_url),
    }

    news = _augment_news(content["news"])
    docs = sorted(content["docs"], key=lambda x: _doc_sort_key(x["d"]), reverse=True)
    directory = content["directory"]
    stations = build_stations(directory, content["stations"])

    out: dict[str, tuple[str, str]] = {}
    out["index.html"] = (env.get_template("index.html.j2").render(**common, news=news), _HTML)
    out["railmap.html"] = (
        env.get_template("railmap.html.j2").render(**common, directory=directory),
        _HTML,
    )
    out["docs.html"] = (env.get_template("docs.html.j2").render(**common, docs=docs), _HTML)
    out["signaling.html"] = (
        env.get_template("signaling.html.j2").render(**common, signaling=content["signaling"]),
        _HTML,
    )
    out["reports.html"] = (
        env.get_template("reports.html.j2").render(**common, reports=content["reports"]),
        _HTML,
    )

    station_tpl = env.get_template("station.html.j2")
    for st in stations.values():
        out[st["slug"]] = (
            station_tpl.render(
                **common,
                station=st,
                jsonld_article=_jsonld_article(st, site, base_url),
            ),
            _HTML,
        )

    pages = _sitemap_pages(base_url, stations, lastmod)
    out["sitemap.xml"] = (
        env.get_template("sitemap.xml.j2").render(**common, pages=pages, lastmod=lastmod),
        _XML,
    )
    out["robots.txt"] = (env.get_template("robots.txt.j2").render(**common), _TXT)
    out["styles.css"] = ((base_dir / "styles.css").read_text(encoding="utf-8"), _CSS)

    return out
