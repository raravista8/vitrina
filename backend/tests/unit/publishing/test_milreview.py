"""Unit tests for the milreview static-site renderer.

Render the whole site once and assert structure, SEO, link rewriting,
no-watermark / no-military invariants, and the content store wiring.
"""

from __future__ import annotations

import json
import re

import pytest

from app.core.publishing.milreview import render_all, resolve_milreview_dir

BASE_URL = "https://milreview.samosite.online"


@pytest.fixture(scope="module")
def site() -> dict[str, tuple[str, str]]:
    base_dir = resolve_milreview_dir()
    return render_all(base_dir=base_dir, base_url=BASE_URL, lastmod="2026-05-30")


@pytest.fixture(scope="module")
def content() -> dict[str, object]:
    base_dir = resolve_milreview_dir()
    out: dict[str, object] = {}
    for name in ("news", "docs", "directory", "stations"):
        out[name] = json.loads((base_dir / "content" / f"{name}.json").read_text("utf-8"))
    return out


def _html(site: dict[str, tuple[str, str]], key: str) -> str:
    assert key in site, f"missing rendered file: {key}"
    return site[key][0]


# ── structure ────────────────────────────────────────────────────────────────


def test_core_pages_present(site):
    for key in ("index.html", "railmap.html", "docs.html", "signaling.html", "reports.html"):
        assert key in site
        assert site[key][1].startswith("text/html")
    assert site["sitemap.xml"][1].startswith("application/xml")
    assert site["robots.txt"][1].startswith("text/plain")
    assert site["styles.css"][1].startswith("text/css")


def test_every_directory_station_has_a_page(site, content):
    ids = {str(item[2]) for group in content["directory"] for item in group["items"]}
    # full-only station (home featured) also rendered
    ids.add("1469")
    for sid in ids:
        assert f"station-{sid}.html" in site, f"no page for station {sid}"


def test_full_station_card(site):
    page = _html(site, "station-1706.html")
    assert "Северобайкальск" in page
    assert "Байкало-Амурской магистрали" in page
    assert f'<link rel="canonical" href="{BASE_URL}/station-1706.html"' in page
    # JSON-LD Article present
    assert '"@type": "Article"' in page or '"@type":"Article"' in page
    assert "Тыя" in page  # neighbor rendered


def test_stub_station_card_is_honest(site):
    # Нижнеангарск (1711) is in the directory but has no full card → honest stub.
    page = _html(site, "station-1711.html")
    assert "Нижнеангарск" in page
    assert "Подробная карточка готовится" in page
    # no fabricated photos/history blocks beyond placeholders
    assert "Связанные документы" in page
    assert "документы не привязаны" in page


# ── SEO ──────────────────────────────────────────────────────────────────────


def test_jsonld_website_on_every_page(site):
    for key in ("index.html", "railmap.html", "docs.html", "signaling.html", "reports.html"):
        assert '"@type": "WebSite"' in _html(site, key)


def test_home_canonical_is_root(site):
    page = _html(site, "index.html")
    assert f'<link rel="canonical" href="{BASE_URL}/"' in page
    assert f'<meta property="og:url" content="{BASE_URL}/"' in page


def test_sitemap_lists_home_and_all_stations(site, content):
    sitemap = _html(site, "sitemap.xml")
    assert f"<loc>{BASE_URL}/</loc>" in sitemap
    assert "<priority>1.0</priority>" in sitemap
    for key in ("railmap.html", "docs.html", "signaling.html", "reports.html"):
        assert f"<loc>{BASE_URL}/{key}</loc>" in sitemap
    ids = {str(item[2]) for group in content["directory"] for item in group["items"]}
    for sid in ids:
        assert f"<loc>{BASE_URL}/station-{sid}.html</loc>" in sitemap


def test_robots_points_to_sitemap(site):
    robots = _html(site, "robots.txt")
    assert f"Sitemap: {BASE_URL}/sitemap.xml" in robots
    assert "Allow: /" in robots


def test_meta_description_per_page(site):
    assert 'name="description"' in _html(site, "index.html")
    assert "Карта железнодорожных линий" in _html(site, "railmap.html")


# ── link rewriting ─────────────────────────────────────────────────────────────


def test_station_links_rewritten_everywhere(site):
    for key in ("index.html", "railmap.html", "reports.html"):
        page = _html(site, key)
        assert "station.html?id=" not in page, f"un-rewritten station link in {key}"
    # the chronicle link to Алакуртти became station-1725.html
    assert "station-1725.html" in _html(site, "index.html")
    # the directory link
    assert "station-1706.html" in _html(site, "railmap.html")


# ── content store wiring ───────────────────────────────────────────────────────


def test_chronicle_server_rendered_with_count(site, content):
    page = _html(site, "index.html")
    n = len(content["news"])
    assert f"показано: {n} из {n}" in page
    assert "Алакуртти" in page  # a server-rendered row, crawlable
    assert 'class="chron-row' in page


def test_docs_sorted_desc(site):
    page = _html(site, "docs.html")
    newest = page.index("02.09.2025")
    oldest = page.index("14.02.1963")
    assert newest < oldest, "docs table should be newest-first"


def test_signaling_aspects_present(site):
    page = _html(site, "signaling.html")
    assert "Зелёный огонь" in page
    assert "Два жёлтых огня" in page


# ── invariants: no watermark, no «милитари» ────────────────────────────────────


def test_no_watermark(site):
    for key, (content_str, _ct) in site.items():
        if key.endswith(".html"):
            assert "Сделано на Самосайте" not in content_str, f"watermark leaked into {key}"


def test_no_military_seals(site):
    # docs.html canon shipped star/train seals — dropped per TZ §9.
    for key in ("index.html", "docs.html", "railmap.html"):
        page = _html(site, key)
        assert "seal--terra" not in page
        assert "seal--green" not in page


def test_login_link_present(site):
    page = _html(site, "index.html")
    assert 'href="https://samosite.online/login"' in page
    assert ">Войти<" in page


# ── typography ─────────────────────────────────────────────────────────────────


def test_nbsp_applied(site):
    # short prepositions glued with U+00A0 somewhere on the home page
    assert " " in _html(site, "index.html")


def test_no_raw_safe_filter_in_templates():
    base_dir = resolve_milreview_dir()
    for tpl in base_dir.glob("*.j2"):
        text = tpl.read_text("utf-8")
        assert not re.search(r"\|\s*safe\b", text), f"`| safe` found in {tpl.name}"
