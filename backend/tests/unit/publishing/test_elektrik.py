"""Unit tests for the elektrik-spb customer-site renderer.

Render the whole site once and assert structure, content-from-config (no
hard-coded copy beyond the design markup), SEO/JSON-LD, asset set, and the
form wiring (config globals + posts to /api/leads/elektrik).
"""

from __future__ import annotations

import json

import pytest

from app.core.publishing.elektrik import render_all, resolve_elektrik_dir

BASE_URL = "https://elektrik-spb.samosite.online"


@pytest.fixture(scope="module")
def site() -> dict[str, tuple[str | bytes, str]]:
    return render_all(base_dir=resolve_elektrik_dir(), base_url=BASE_URL, lastmod="2026-05-31")


@pytest.fixture(scope="module")
def config() -> dict:
    base_dir = resolve_elektrik_dir()
    return json.loads((base_dir / "content" / "site.json").read_text("utf-8"))


def _html(site, key: str) -> str:
    assert key in site, f"missing rendered file: {key}"
    content = site[key][0]
    return content if isinstance(content, str) else content.decode("utf-8")


def test_core_files_present(site):
    for key in ("index.html", "styles.css", "app.js", "hero.webp", "sitemap.xml", "robots.txt"):
        assert key in site
    assert site["index.html"][1].startswith("text/html")
    assert site["styles.css"][1].startswith("text/css")
    assert site["hero.webp"][1] == "image/webp"
    assert sum(1 for k in site if k.startswith("photos/")) == 9


def test_assets_are_bytes(site):
    assert isinstance(site["hero.webp"][0], bytes)
    for k, (content, _ct) in site.items():
        if k.endswith(".webp"):
            assert isinstance(content, bytes)


def test_sections_rendered(site, config):
    page = _html(site, "index.html")
    assert page.count('class="service-card"') == len(config["services"]["items"])
    assert page.count('class="service-ico"><svg') == len(config["services"]["items"])
    assert page.count('class="why-item"') == len(config["why"]["items"])
    assert page.count('class="review"') == len(config["reviews"]["items"])
    assert page.count('class="rt-row"') == len(config["reviews"]["dist"])
    assert page.count('class="step') >= len(config["how"]["steps"])


def test_content_from_config(site, config):
    page = _html(site, "index.html")
    # brand + a couple of config-driven strings appear (not hard-coded)
    assert config["brand_name"] in page
    assert config["services"]["items"][0]["title"] in page
    assert config["reviews"]["items"][0]["name"] in page
    assert config["phone"] in page


def test_seo(site):
    page = _html(site, "index.html")
    assert f'<link rel="canonical" href="{BASE_URL}/"' in page
    assert f'<meta property="og:url" content="{BASE_URL}/"' in page
    assert '"@type": "Electrician"' in page
    assert '"aggregateRating"' in page
    sm = _html(site, "sitemap.xml")
    assert f"<loc>{BASE_URL}/</loc>" in sm
    assert f"Sitemap: {BASE_URL}/sitemap.xml" in _html(site, "robots.txt")


def test_seo_keywords_geo_meta(site, config):
    page = _html(site, "index.html")
    # keywords meta carries every configured keyword
    assert '<meta name="keywords"' in page
    for kw in config["seo"]["keywords"][:3]:
        assert kw in page
    # geo meta + twitter image + og image alt
    assert '<meta name="geo.placename" content="Санкт-Петербург"' in page
    assert '<meta name="ICBM" content="59.9386, 30.3141"' in page
    assert '<meta name="twitter:image"' in page
    assert '<meta property="og:image:alt"' in page


def test_jsonld_rich(site):
    # parse the JSON-LD block (tojson escapes non-ASCII to \uXXXX — valid JSON,
    # so assert on the decoded object, not raw substrings)
    page = _html(site, "index.html")
    raw = page.split('application/ld+json">', 1)[1].split("</script>", 1)[0]
    ld = json.loads(raw)
    assert ld["@type"] == "Electrician"
    assert ld["priceRange"]
    assert ld["geo"]["@type"] == "GeoCoordinates"
    assert "avito.ru" in ld["sameAs"][0]
    assert ld["address"]["addressLocality"] == "Санкт-Петербург"
    assert {a["name"] for a in ld["areaServed"]} == {"Санкт-Петербург", "Ленинградская область"}
    offers = ld["hasOfferCatalog"]["itemListElement"]
    assert len(offers) == 6  # 6 services as priced Offers
    assert offers[0]["price"] == "3500"


def test_form_wiring(site, config):
    page = _html(site, "index.html")
    assert f'window.__SITE_ID = "{config["site_id"]}"' in page
    assert "window.__PHOTOS" in page
    assert 'name="company"' in page  # honeypot
    assert page.count("data-open-form") >= 5  # all CTAs open the modal
    # app.js posts to the real extended endpoint with a network-error fallback
    appjs = _html(site, "app.js")
    assert "/api/leads/elektrik" in appjs
    assert "form-net-error" in appjs


def test_made_on_samosite_badge(site):
    page = _html(site, "index.html")
    assert 'href="https://samosite.online"' in page
    assert "Сделано на Самосайт" in page


def test_no_safe_filter_in_template():
    import re

    base_dir = resolve_elektrik_dir()
    for tpl in base_dir.glob("*.j2"):
        assert not re.search(r"\|\s*safe\b", tpl.read_text("utf-8")), f"`| safe` in {tpl.name}"
