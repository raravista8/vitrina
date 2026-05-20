"""Smoke test the sites-template render (T2.5).

Renders the canonical Jinja2 template against a representative payload
and asserts the structural invariants: H1 present, JSON-LD valid,
autoescape preserves HTML markers, no `{{ x | safe }}` slips, OG tags
present, lead form action points at /api/leads.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest
from jinja2 import Environment, FileSystemLoader, select_autoescape

TEMPLATE_DIR = Path(__file__).resolve().parents[3] / "sites-template"


@pytest.fixture
def env() -> Environment:
    return Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        autoescape=select_autoescape(default=True, default_for_string=True),
    )


@pytest.fixture
def payload() -> dict[str, object]:
    return {
        "site_url": "https://test-master.samosite.online",
        "site_title": "Студия маникюра Анны",
        "site_description": "Маникюр в Петрозаводске. Запись онлайн.",
        "site_locale": "ru_RU",
        "site_category": "beauty.nails",
        "site_color": "#0f172a",
        "site_logo_url": None,
        "site_hero_photo": "https://storage.yandexcloud.net/vitrina-prod/test/hero.jpg",
        "organization": {
            "name": "ИП Анна Иванова",
            "phone": "+7 921 123-45-67",
            "email": "anna@example.com",
            "address": "Петрозаводск, ул. Ленина 1",
            "geo": {"lat": 61.7849, "lon": 34.3469},
            "opening_hours": [
                {"day": "Mo,Tu,We,Th,Fr", "opens": "10:00", "closes": "20:00"},
            ],
        },
        "services": [
            {"title": "Маникюр классический", "description": "30 мин.", "price_label": "от 1500 ₽"},
        ],
        "gallery": [
            {"url": "https://storage.yandexcloud.net/vitrina-prod/test/1.jpg", "alt": "Дизайн 1"},
        ],
        "reviews": [
            {"author": "Маша", "rating": 5, "text": "Очень понравилось!"},
        ],
        "contact_url": "/api/leads",
        "captcha_client_key": "test-key",  # pragma: allowlist secret
        "year": 2026,
    }


@pytest.mark.unit
def test_renders_canonical_title_and_h1(env: Environment, payload: dict) -> None:
    html = env.get_template("index.html.j2").render(**payload)
    assert "<h1>" in html
    assert "Студия маникюра Анны" in html
    assert "<title>Студия маникюра Анны</title>" in html


@pytest.mark.unit
def test_renders_jsonld_locally_business_block(env: Environment, payload: dict) -> None:
    html = env.get_template("index.html.j2").render(**payload)
    start = html.find('<script type="application/ld+json">')
    assert start != -1
    end = html.find("</script>", start)
    raw = html[start + len('<script type="application/ld+json">') : end].strip()
    data = json.loads(raw)
    assert data["@type"] == "LocalBusiness"
    assert data["name"] == "ИП Анна Иванова"
    assert data["telephone"] == "+7 921 123-45-67"
    assert data["geo"]["latitude"] == pytest.approx(61.7849)


@pytest.mark.unit
def test_strips_dangerous_html_in_user_text(env: Environment, payload: dict) -> None:
    payload["services"] = [
        {"title": "<script>alert(1)</script>", "description": "x", "price_label": "y"},
    ]
    html = env.get_template("index.html.j2").render(**payload)
    assert "<script>alert(1)</script>" not in html
    assert "&lt;script&gt;alert(1)&lt;/script&gt;" in html


@pytest.mark.unit
def test_open_graph_and_twitter_tags(env: Environment, payload: dict) -> None:
    html = env.get_template("index.html.j2").render(**payload)
    assert 'property="og:title"' in html
    assert 'property="og:image"' in html  # only when site_hero_photo set
    assert 'name="twitter:card"' in html


@pytest.mark.unit
def test_lead_form_action_points_at_api_leads(env: Environment, payload: dict) -> None:
    html = env.get_template("index.html.j2").render(**payload)
    assert 'action="/api/leads"' in html


@pytest.mark.unit
def test_sitemap_renders_with_url_and_lastmod(env: Environment, payload: dict) -> None:
    payload["last_modified"] = "2026-05-19"
    xml = env.get_template("sitemap.xml.j2").render(**payload)
    assert "<loc>https://test-master.samosite.online</loc>" in xml
    assert "<lastmod>2026-05-19</lastmod>" in xml


@pytest.mark.unit
def test_robots_points_at_sitemap(env: Environment, payload: dict) -> None:
    txt = env.get_template("robots.txt.j2").render(**payload)
    assert "Sitemap: https://test-master.samosite.online/sitemap.xml" in txt


# --------------------------------------------------------------------------- #
# Concept A visual refresh (PR-C #7)
# --------------------------------------------------------------------------- #


@pytest.mark.unit
def test_default_scheme_renders_cream_palette(env: Environment, payload: dict) -> None:
    """Without `site_scheme`, the template falls back to the cream palette
    (the Concept A default that ships with the landing)."""
    payload.pop("site_scheme", None)
    html = env.get_template("index.html.j2").render(**payload)
    # Cream-scheme background OKLCH lightness — distinct from slate/sage.
    assert "oklch(0.972 0.012 80)" in html


@pytest.mark.unit
@pytest.mark.parametrize(
    ("scheme", "marker"),
    [
        ("slate", "oklch(0.96 0.005 250)"),
        ("sage", "oklch(0.97 0.008 145)"),
    ],
)
def test_alternate_schemes_swap_palette(
    env: Environment, payload: dict, scheme: str, marker: str
) -> None:
    """`site_scheme` flips the palette tokens — backgrounds, accents and
    soft tints. The publisher rotates these to avoid look-alike sites."""
    payload["site_scheme"] = scheme
    html = env.get_template("index.html.j2").render(**payload)
    assert marker in html


@pytest.mark.unit
def test_site_color_override_wins_over_scheme_accent(env: Environment, payload: dict) -> None:
    """A master-brand `site_color` (e.g. from LLM) takes precedence over
    the scheme's default accent. Critical so the brand survives the
    refresh."""
    payload["site_scheme"] = "slate"
    payload["site_color"] = "#FF0000"
    html = env.get_template("index.html.j2").render(**payload)
    # Override appears in the --accent declaration.
    assert "--accent: #FF0000" in html


@pytest.mark.unit
def test_brand_appears_in_footer_as_cyrillic(env: Environment, payload: dict) -> None:
    """Legal requirement (PRD §3): brand spelled in Cyrillic. The footer
    uses the prepositional case «Самосайте» («Сделано на Самосайте»),
    still cyrillic — Latin «Samosite» / «Vitrina» is forbidden in
    user-facing text."""
    html = env.get_template("index.html.j2").render(**payload)
    # Cyrillic root «Самосайт» covers nominative («Самосайт»),
    # genitive («Самосайта»), prepositional («Самосайте») — all
    # legal-acceptable spellings.
    assert "Самосайт" in html
    # The footer must never use Latin «Samosite» / «Vitrina» as the
    # brand name (engineering code-name `vitrina` shouldn't leak into
    # customer-facing output either).
    footer = html.split("<footer")[1].split("</footer>")[0]
    assert "Samosite" not in footer
    assert "Vitrina" not in footer
