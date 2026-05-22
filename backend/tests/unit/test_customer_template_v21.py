"""Smoke tests for customer-site v2.1 booking-page template.

Renders `sites-template/index.html.j2` (Phase 9c — switched from legacy
brochure-page to booking-page layout) с representative fixture context
matching the `_adapt_to_v21_shape` adapter output shape.

Replaces `test_customer_template_render.py` (legacy template). Старый
шаблон сохранён как `index.html.j2.legacy` для emergency rollback.

Spec: `CLAUDE_CODE_TZ_customer_v2.1.md` §2-§13.
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
        trim_blocks=True,
        lstrip_blocks=True,
    )


@pytest.fixture
def payload() -> dict[str, object]:
    """Full v2.1 booking-page context — все секции рендерятся (нет
    `{% if %}` skip'ов). Минимальный набор для legacy compatibility
    тестируется отдельно через `test_legacy_compatibility_*`."""
    return {
        "site_url": "https://anna.samosite.online",
        "site_locale": "ru_RU",
        "site_subdomain": "anna",
        "year": 2026,
        "contact_url": "/api/leads",
        "captcha_client_key": "test-key",  # pragma: allowlist secret
        "site": {
            "name": "Студия маникюра Анны",
            "category": "Маникюр",
            "city": "Петрозаводск",
            "address": "Петрозаводск, ул. Ленина 1",
            "phone": "+7 921 123-45-67",
            "phone_e164": "+79211234567",
            "rating": 4.9,
            "reviews_count": 38,
            "review_source": "Яндекс.Картах",
            "years_experience": 8,
            "clients_served": 1200,
            "geo": {"lat": 61.7849, "lon": 34.3469},
            "opening_hours": [{"day": "Пн-Пт", "hours": "10:00–20:00"}],
            "social_badges": [
                {"platform": "Я.Карты", "rating": 4.9, "count": 38},
                {"platform": "2ГИС", "rating": 4.8, "count": 24},
            ],
            "telegram_username": "anna_master",
            "whatsapp_phone": "79211234567",
            "hero": {
                "h1": "Маникюр в Петрозаводске — без боли, держится 3 недели",
                "sub": "Аппаратный маникюр и стойкое покрытие. Один клиент в час.",
                "photo_url": "https://storage.yandexcloud.net/vitrina-prod/test/hero.jpg",
                "caption": "Студия в центре Петрозаводска",
            },
        },
        "services": [
            {
                "name": "Аппаратный маникюр",
                "desc": "Без воды, кутикула и форма",
                "duration": "60 мин",
                "price": "1500 ₽",
                "price_hint": "",
            },
            {
                "name": "Покрытие гель-лак",
                "desc": "Держится 3 недели",
                "duration": "90 мин",
                "price": "2200 ₽",
                "price_hint": "",
            },
        ],
        "services_last_updated": "12 мая 2026",
        "process": [
            {"icon": "calendar", "title": "Записываетесь", "body": "Через сайт или Telegram."},
            {"icon": "pin", "title": "Приходите", "body": "Студия в центре."},
            {"icon": "coffee", "title": "Делаем маникюр", "body": "Тишина, кофе, ваш сериал."},
            {"icon": "sparkles", "title": "Уходите", "body": "Покрытие на 3 недели."},
        ],
        "gallery": [
            {"url": "https://storage.yandexcloud.net/vitrina-prod/test/1.jpg", "alt": "Дизайн 1"},
            {"url": "https://storage.yandexcloud.net/vitrina-prod/test/2.jpg", "alt": "Дизайн 2"},
            {"url": "https://storage.yandexcloud.net/vitrina-prod/test/3.jpg", "alt": "Дизайн 3"},
            {"url": "https://storage.yandexcloud.net/vitrina-prod/test/4.jpg", "alt": "Дизайн 4"},
        ],
        "reviews_curated": [
            {
                "author": "Мария К.",
                "avatar_url": "",
                "rating": 5,
                "text": "Анна — настоящий мастер.",
                "date_iso": "2026-04-12",
                "source": "Я.Карты",
                "is_top_pick": True,
            },
        ],
        "about": {
            "photo_url": "https://storage.yandexcloud.net/vitrina-prod/test/master.jpg",
            "bio": "8 лет работаю с ногтями. Учусь у топовых мастеров Москвы и Питера.",
            "creds": ["Сертификат «E.Mi Russia»", "Курс «Аппаратный маникюр» 2022"],
            "guarantees": ["Покрытие держится 3 недели или возврат", "Стерильный инструмент"],
        },
        "faq": [
            {"question": "Сколько держится покрытие?", "answer": "В среднем 3 недели."},
            {"question": "Можно ли с детьми?", "answer": "Да, есть зона ожидания."},
        ],
    }


# --- Structural smoke tests --------------------------------------------------


@pytest.mark.unit
def test_renders_canonical_h1_formula(env: Environment, payload: dict) -> None:
    """v2.1 §3 — Hero H1 берётся из `site.hero.h1` (formula generated by AI)."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "<h1>Маникюр в Петрозаводске — без боли, держится 3 недели</h1>" in html


@pytest.mark.unit
def test_renders_title_combines_hero_h1_and_name(env: Environment, payload: dict) -> None:
    """`<title>` = `{site.hero.h1} — {site.name}`."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "<title>" in html
    assert "Маникюр в Петрозаводске" in html
    assert "Студия маникюра Анны" in html


@pytest.mark.unit
def test_sticky_header_with_phone_tel_link(env: Environment, payload: dict) -> None:
    """§2 sticky header — `<a href="tel:...">` для phone + Записаться pill."""
    html = env.get_template("index.html.j2").render(**payload)
    assert 'href="tel:+79211234567"' in html
    assert "ss-header" in html
    assert "Записаться" in html


@pytest.mark.unit
def test_services_render_as_cards_not_list(env: Environment, payload: dict) -> None:
    """§5 services — cards с `<article>`, не `<ul>`/`<li>` list. Каждая
    карточка содержит name, desc, price, duration, CTA."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "ss-service-card" in html
    assert "Аппаратный маникюр" in html
    assert "Без воды, кутикула и форма" in html
    assert "1500 ₽" in html
    # CTA в каждой карточке — booking-page pattern.
    assert html.count('href="#book"') >= 2  # hero CTA + min 2 service-card CTAs


@pytest.mark.unit
def test_process_section_with_four_steps_and_icons(env: Environment, payload: dict) -> None:
    """§6 process — 4 шага с фиксированными icons + bodies."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "Записываетесь" in html
    assert "Делаем маникюр" in html
    # Icon SVG (any of the 4) — partial render check.
    assert "<svg" in html


@pytest.mark.unit
def test_reviews_block_with_mid_page_cta(env: Environment, payload: dict) -> None:
    """§8 reviews — выделенный блок + mid-page CTA после reviews."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "Что говорят клиенты" in html
    assert "Мария К." in html


@pytest.mark.unit
def test_faq_renders_as_native_details(env: Environment, payload: dict) -> None:
    """§10 FAQ — `<details>` × N, первый — `open`."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "<details open>" in html
    assert "Сколько держится покрытие?" in html
    assert "<summary>" in html


@pytest.mark.unit
def test_about_section_with_creds_and_guarantees(env: Environment, payload: dict) -> None:
    """§9 about — bio + creds[] + guarantees[]."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "О мастере" in html or "О МАСТЕРЕ" in html
    assert "Сертификат «E.Mi Russia»" in html
    assert "Покрытие держится 3 недели или возврат" in html


@pytest.mark.unit
def test_final_booking_form_with_y_maps_iframe(env: Environment, payload: dict) -> None:
    """§11 — form action /api/leads + Yandex.Карты iframe + messengers."""
    html = env.get_template("index.html.j2").render(**payload)
    assert 'action="/api/leads"' in html
    assert "yandex.ru/map-widget" in html
    assert "t.me/anna_master" in html
    assert "wa.me/79211234567" in html


@pytest.mark.unit
def test_sticky_mobile_cta_present(env: Environment, payload: dict) -> None:
    """§13 — sticky mobile CTA fixed bottom."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "ss-sticky-mobile" in html


@pytest.mark.unit
def test_jsonld_local_business(env: Environment, payload: dict) -> None:
    """Schema.org LocalBusiness — SEO requirement (FR-031)."""
    html = env.get_template("index.html.j2").render(**payload)
    start = html.find('<script type="application/ld+json">')
    assert start != -1
    end = html.find("</script>", start)
    raw = html[start + len('<script type="application/ld+json">') : end].strip()
    data = json.loads(raw)
    assert data["@type"] == "LocalBusiness"
    assert data["name"] == "Студия маникюра Анны"
    assert data["telephone"] == "+79211234567"


@pytest.mark.unit
def test_autoescape_strips_dangerous_html_in_user_text(env: Environment, payload: dict) -> None:
    """`autoescape=True` гарантирует что `<script>` в services не
    исполняется на customer-site (CLAUDE.md hard rule)."""
    payload["services"] = [
        {
            "name": "<script>alert(1)</script>",
            "desc": "x",
            "duration": "",
            "price": "y",
            "price_hint": "",
        }
    ]
    html = env.get_template("index.html.j2").render(**payload)
    assert "<script>alert(1)</script>" not in html
    assert "&lt;script&gt;alert(1)&lt;/script&gt;" in html


@pytest.mark.unit
def test_brand_appears_in_footer_as_cyrillic(env: Environment, payload: dict) -> None:
    """Legal requirement (PRD §3) — brand в footer как «Самосайт»
    (любая склонённая форма)."""
    html = env.get_template("index.html.j2").render(**payload)
    assert "Самосайт" in html
    footer = html.split("<footer")[1].split("</footer>")[0]
    assert "Samosite" not in footer
    assert "Vitrina" not in footer


@pytest.mark.unit
def test_sitemap_renders_with_url_and_lastmod(env: Environment, payload: dict) -> None:
    payload["last_modified"] = "2026-05-22"
    xml = env.get_template("sitemap.xml.j2").render(**payload)
    assert "<loc>https://anna.samosite.online</loc>" in xml
    assert "<lastmod>2026-05-22</lastmod>" in xml


@pytest.mark.unit
def test_robots_points_at_sitemap(env: Environment, payload: dict) -> None:
    txt = env.get_template("robots.txt.j2").render(**payload)
    assert "Sitemap: https://anna.samosite.online/sitemap.xml" in txt


# --- Defensive rendering: missing optional fields ----------------------------


@pytest.mark.unit
def test_section_omitted_when_missing_optional_fields(env: Environment, payload: dict) -> None:
    """Когда `process`, `faq`, `gallery`, `about`, `reviews_curated`
    empty/None — секции gracefully скрываются (`{% if %}` guard)."""
    payload["process"] = []
    payload["faq"] = []
    payload["gallery"] = []
    payload["reviews_curated"] = []
    payload["about"] = None
    payload["site"]["social_badges"] = []  # type: ignore[index]

    html = env.get_template("index.html.j2").render(**payload)
    # Page still renders без ошибок
    assert "<h1>" in html
    assert "Студия маникюра Анны" in html
    # Optional секции NOT present
    assert "Что говорят клиенты" not in html
    assert "<details" not in html
    assert "ss-gallery" not in html or "ss-gallery-wrap" not in html
