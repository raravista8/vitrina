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
        "site_url": "https://test-master.vitrina.site",
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
    assert "<loc>https://test-master.vitrina.site</loc>" in xml
    assert "<lastmod>2026-05-19</lastmod>" in xml


@pytest.mark.unit
def test_robots_points_at_sitemap(env: Environment, payload: dict) -> None:
    txt = env.get_template("robots.txt.j2").render(**payload)
    assert "Sitemap: https://test-master.vitrina.site/sitemap.xml" in txt
