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
_STATION_LINK_RE = re.compile(r"(?<!rail)station\.html\?id=(\d+)")

# Inline-prose link internalisation (nothing must link to a page on milreview.ru):
#   <a …(rail)station.html?id=N…>label</a> → station-N.html if hosted, else plain label
#   <a …railway.html?id=N…>label</a>       → line-N.html if hosted, else plain label
#   <a …href="https?://milreview.ru/…">…   → plain label (catch-all)
_A_STATION = re.compile(r"<a\b[^>]*?(?:rail)?station\.html\?id=(\d+)[^>]*>(.*?)</a>", re.S | re.I)
_A_RAILWAY = re.compile(r"<a\b[^>]*?railway\.html\?id=(\d+)[^>]*>(.*?)</a>", re.S | re.I)
_A_MILREVIEW = re.compile(
    r'<a\b[^>]*?href="https?://milreview\.ru/[^"]*"[^>]*>(.*?)</a>', re.S | re.I
)


def _internalize_links(
    html: str,
    valid_station_ids: frozenset[str],
    valid_line_ids: frozenset[str] = frozenset(),
) -> str:
    def _st(m: re.Match[str]) -> str:
        sid, label = m.group(1), m.group(2)
        return f'<a href="station-{sid}.html">{label}</a>' if sid in valid_station_ids else label

    def _ln(m: re.Match[str]) -> str:
        lid, label = m.group(1), m.group(2)
        return f'<a href="line-{lid}.html">{label}</a>' if lid in valid_line_ids else label

    html = _A_STATION.sub(_st, html)
    html = _A_RAILWAY.sub(_ln, html)
    return _A_MILREVIEW.sub(lambda m: m.group(1), html)


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

_CONTENT_FILES = (
    "site",
    "news",
    "docs",
    "doc_pages",
    "directory",
    "stations",
    "signaling",
    "reports",
    "report_pages",
    "archives",
    "lines",
    "isi",
)


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


def _filter_station_url(station_id: Any) -> str:
    return f"station-{station_id}.html"


def _make_env(
    base_dir: Path,
    valid_station_ids: frozenset[str] = frozenset(),
    valid_line_ids: frozenset[str] = frozenset(),
) -> Environment:
    env = make_environment(base_dir)

    def _filter_relink(value: Any) -> str:
        """Rewrite a plain ``station.html?id=N`` href to ``station-N.html``."""
        return _STATION_LINK_RE.sub(r"station-\1.html", str(value))

    def _filter_rich(value: Any) -> Markup:
        """Internalise links, sanitise authored inline HTML, glue nbsp, mark safe.

        ``_internalize_links`` first guarantees nothing points at a page on
        milreview.ru (station → ``station-N.html`` if hosted; line →
        ``line-N.html`` if hosted; otherwise plain text). The bleach pass is then
        defence-in-depth (allowlist ``<a>``/``<strong>``/``<em>``/``<br>``) and
        keeps templates free of ``| safe``.
        """
        s = _internalize_links(str(value), valid_station_ids, valid_line_ids)
        s = bleach.clean(s, tags=_ALLOWED_TAGS, attributes=_ALLOWED_ATTRS, strip=True)
        s = _glue_nbsp(s)
        # nosec B704 — `s` is bleach-sanitised (tight allowlist) immediately above,
        # so marking it safe is the sanctioned sanitise-then-render pattern, not an
        # XSS sink. _glue_nbsp only inserts U+00A0 into text, adds no markup.
        return Markup(s)  # nosec B704

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
        st.setdefault("photos", [])
        st.setdefault("scheme_imgs", [])
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
                "photos": [],
                "scheme_imgs": [],
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

    directory = content["directory"]
    stations = build_stations(directory, content["stations"])
    valid_station_ids = frozenset(stations.keys())
    lines: dict[str, Any] = content["lines"]
    isi: dict[str, Any] = content["isi"]
    valid_line_ids = frozenset(lines.keys())
    env = _make_env(base_dir, valid_station_ids, valid_line_ids)

    common = {
        "site": site,
        "base_url": base_url,
        "jsonld_website": _jsonld_website(site, base_url),
    }

    news = _augment_news(content["news"])
    docs = sorted(content["docs"], key=lambda x: _doc_sort_key(x["d"]), reverse=True)

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

    # per-document pages (real приказ/постановление full texts)
    doc_pages: dict[str, Any] = content["doc_pages"]
    docs_by_slug = {d["slug"]: d for d in docs}
    doc_tpl = env.get_template("doc.html.j2")
    for slug, page in doc_pages.items():
        row = docs_by_slug.get(slug, {})
        doc_ctx = {**row, **page, "slug": slug, "slug_path": f"doc-{slug}.html"}
        jsonld_doc = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": row.get("t") or row.get("num") or slug,
            "description": f"{row.get('org', '')} {row.get('num', '')} от {row.get('d', '')}".strip(),
            "inLanguage": "ru",
            "mainEntityOfPage": f"{base_url}/doc-{slug}.html",
            "isPartOf": {"@type": "WebSite", "name": site["title"], "url": f"{base_url}/"},
        }
        out[f"doc-{slug}.html"] = (
            doc_tpl.render(**common, doc=doc_ctx, jsonld_article=jsonld_doc),
            _HTML,
        )

    # news archive pages (one dated text chronicle per year — fully internal)
    archives: dict[str, Any] = content["archives"]
    archive_tpl = env.get_template("news-archive.html.j2")
    for year, arch in archives.items():
        out[f"news-{year}.html"] = (
            archive_tpl.render(**common, archive={**arch, "year": year}),
            _HTML,
        )

    # report (travelogue) pages — full text, hosted internally
    report_pages: dict[str, Any] = content["report_pages"]
    reports = content["reports"]
    road_of: dict[str, str] = {}
    fhref = reports["featured"].get("link_href", "")
    if fhref.startswith("report-"):
        road_of[fhref[len("report-") : -len(".html")]] = (
            reports["featured"].get("eyebrow", "").split("·")[-1].strip()
        )
    for e in reports["entries"]:
        h = e.get("href", "")
        if h.startswith("report-"):
            road_of[h[len("report-") : -len(".html")]] = e.get("road", "")
    report_tpl = env.get_template("report.html.j2")
    for slug, page in report_pages.items():
        rctx = {**page, "slug": slug, "road": road_of.get(slug, "")}
        jsonld_rep = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": page.get("title", slug),
            "inLanguage": "ru",
            "mainEntityOfPage": f"{base_url}/report-{slug}.html",
            "isPartOf": {"@type": "WebSite", "name": site["title"], "url": f"{base_url}/"},
        }
        out[f"report-{slug}.html"] = (
            report_tpl.render(**common, report=rctx, jsonld_article=jsonld_rep),
            _HTML,
        )

    # railway-line pages (line-N.html) — internal targets for railway.html?id=N links
    line_tpl = env.get_template("line.html.j2")
    for lid, page in lines.items():
        line_ctx = {**page, "id": lid}
        jsonld_line = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": page.get("title", lid),
            "inLanguage": "ru",
            "mainEntityOfPage": f"{base_url}/line-{lid}.html",
            "isPartOf": {"@type": "WebSite", "name": site["title"], "url": f"{base_url}/"},
        }
        out[f"line-{lid}.html"] = (
            line_tpl.render(**common, line=line_ctx, jsonld_article=jsonld_line),
            _HTML,
        )

    # ИСИ signalling pages (isi-N.html) — internal targets for the signaling cards
    isi_tpl = env.get_template("isi.html.j2")
    for n, page in isi.items():
        isi_ctx = {**page, "n": n}
        jsonld_isi = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": page.get("title", n),
            "inLanguage": "ru",
            "mainEntityOfPage": f"{base_url}/isi-{n}.html",
            "isPartOf": {"@type": "WebSite", "name": site["title"], "url": f"{base_url}/"},
        }
        out[f"isi-{n}.html"] = (
            isi_tpl.render(**common, isi=isi_ctx, jsonld_article=jsonld_isi),
            _HTML,
        )

    pages = _sitemap_pages(base_url, stations, lastmod)
    pages += [
        {
            "loc": f"{base_url}/line-{lid}.html",
            "lastmod": lastmod,
            "changefreq": "monthly",
            "priority": "0.5",
        }
        for lid in lines
    ]
    pages += [
        {
            "loc": f"{base_url}/isi-{n}.html",
            "lastmod": lastmod,
            "changefreq": "yearly",
            "priority": "0.4",
        }
        for n in isi
    ]
    pages += [
        {
            "loc": f"{base_url}/news-{y}.html",
            "lastmod": lastmod,
            "changefreq": "yearly",
            "priority": "0.3",
        }
        for y in archives
    ]
    pages += [
        {
            "loc": f"{base_url}/report-{s}.html",
            "lastmod": lastmod,
            "changefreq": "yearly",
            "priority": "0.4",
        }
        for s in report_pages
    ]
    pages += [
        {
            "loc": f"{base_url}/doc-{slug}.html",
            "lastmod": lastmod,
            "changefreq": "yearly",
            "priority": "0.4",
        }
        for slug in doc_pages
    ]
    out["sitemap.xml"] = (
        env.get_template("sitemap.xml.j2").render(**common, pages=pages, lastmod=lastmod),
        _XML,
    )
    out["robots.txt"] = (env.get_template("robots.txt.j2").render(**common), _TXT)
    out["styles.css"] = ((base_dir / "styles.css").read_text(encoding="utf-8"), _CSS)

    return out
