#!/usr/bin/env python3
"""Render `sites-template/index.html.j2` with deterministic fixture data
into `landing/tests/visual/__fixtures__/customer-site/index.html`, plus
copy `components/booking.css` next to it as `static/booking.css` (the
template references `/static/booking.css`).

Why standalone:
  Customer-sites are normally rendered by FastAPI + Jinja2 inside the
  backend `core/publishing/render.py` pipeline, against real DB-backed
  `site` rows. For visual regression we need:
    1. Deterministic content (no timestamps, no random review picks).
    2. Self-contained HTML servable from disk via `python -m http.server`
       so Playwright can `page.goto('http://localhost:PORT/customer-site/')`.
    3. No DB / Redis / auth dependency in CI.

  This script renders ONE customer-site HTML with the fixture defined
  below, dropping it under `landing/tests/visual/__fixtures__/` (gitignored
  output dir — see `.gitignore`). The visual spec
  `landing/tests/visual/customer.spec.ts` serves that dir on a local
  port and screenshots each `[data-section="..."]`.

  Re-run:
    python infra/scripts/render-customer-fixture.py
  Or as part of generating baselines:
    bash infra/scripts/generate-customer-baselines-linux.sh

  Output structure:
    landing/tests/visual/__fixtures__/customer-site/
      index.html              ← rendered Jinja
      static/booking.css      ← copy of sites-template/components/booking.css

  Photos referenced in the fixture point to placeholder URLs hosted on
  `placehold.co` — they DON'T network-fetch at render time (only the
  browser does), and the spec's stabilizer skips waiting for them past
  500 ms so missing photos don't make the test hang. Production
  customer-sites will use Yandex Object Storage URLs.
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path
from typing import Any

try:
    from jinja2 import Environment, FileSystemLoader, select_autoescape
except ImportError:
    print(
        "jinja2 not installed. Install with:\n"
        "  pip install jinja2\n"
        "or run inside the backend poetry env.",
        file=sys.stderr,
    )
    sys.exit(1)


REPO_ROOT = Path(__file__).resolve().parents[2]
TEMPLATE_DIR = REPO_ROOT / "sites-template"
OUTPUT_DIR = REPO_ROOT / "landing" / "tests" / "visual" / "__fixtures__" / "customer-site"


def fixture() -> dict[str, Any]:
    """Deterministic fixture data covering all spec contracts in
    `docs/handoff/specs/02_customer_v2.1.md`. Numbers and copy chosen to
    look realistic but be fully invented (no real masters)."""
    return {
        "site": {
            "name": "Студия Анны",
            "category": "Маникюр",
            "city": "Москва",
            "phone": "+7 999 111-11-11",
            "phone_e164": "+79991111111",
            "address": "Москва, Тверская 12",
            "geo": {"lat": 55.7558, "lon": 37.6173},
            "rating": 4.9,
            "reviews_count": 38,
            "review_source": "Яндекс.Картах",
            "hero": {
                "h1": "Маникюр в Москве — без шеллака",
                "sub": "Натуральное покрытие, гарантия две недели, парковка во дворе",
                "photo_url": "https://placehold.co/1200x600/c4946f/ffffff?text=Hero+photo",
                "caption": "ИЗ ИСТОЧНИКА · 12 ФОТО",
            },
            "years_experience": 8,
            "clients_served": 1200,
            "social_badges": [
                {"platform": "Яндекс.Карты", "rating": 4.9, "count": 38},
                {"platform": "2ГИС", "rating": 4.8, "count": 22},
                {"platform": "Telegram", "rating": 5.0, "count": 480},
            ],
        },
        "services": [
            {
                "name": "Маникюр классический",
                "desc": "Гигиеническая обработка, форма, базовое покрытие",
                "duration": "60 мин",
                "price": "1 500 ₽",
            },
            {
                "name": "Маникюр с покрытием",
                "desc": "Гель-лак однотонный, любая фирма-производитель",
                "duration": "90 мин",
                "price": "2 200 ₽",
                "price_hint": "от",
            },
            {
                "name": "Дизайн ногтей",
                "desc": "Френч, омбре, втирка, стемпинг",
                "duration": "+30 мин",
                "price": "+500 ₽",
            },
            {
                "name": "Снятие покрытия",
                "desc": "Любой материал, без вреда натуральной пластине",
                "duration": "20 мин",
                "price": "500 ₽",
            },
            {
                "name": "Парафинотерапия рук",
                "desc": "Уход за кожей, увлажнение, расслабление",
                "duration": "30 мин",
                "price": "800 ₽",
            },
        ],
        "services_last_updated": "12 апреля",
        "process": [
            {"icon": "phone", "title": "Записываетесь", "body": "Звонок или форма ниже — выбираем удобное время"},
            {"icon": "calendar", "title": "Подтверждаем", "body": "Перезваниваем в течение часа, согласовываем дату"},
            {"icon": "scissors", "title": "Приходите", "body": "Москва, Тверская 12, парковка во дворе"},
            {"icon": "smile", "title": "Получаете результат", "body": "Гарантия две недели, бонус — следующий визит со скидкой"},
        ],
        "gallery": [
            {"url": f"https://placehold.co/400x400/{c}/ffffff?text=Work+{i + 1}", "alt": f"Работа {i + 1}"}
            for i, c in enumerate(
                [
                    "c4946f", "8a6c4e", "d4a574", "6e5340",
                    "b8845a", "9f7553", "ac8769", "7a5c43",
                    "c19c7a", "8e7156",
                ]
            )
        ],
        "reviews_curated": [
            {
                "author": "Мария К.",
                "rating": 5,
                "text": "Анна — мастер от Бога. Уже год хожу только сюда, ничего лишнего, всё чётко",
                "date_iso": "2026-04-12",
                "source": "Яндекс.Карты",
                "is_top_pick": True,
            },
            {
                "author": "Елена П.",
                "rating": 5,
                "text": "Записалась первый раз — осталась навсегда. Идеальная форма, аккуратное покрытие",
                "date_iso": "2026-03-28",
                "source": "Яндекс.Карты",
                "is_top_pick": False,
            },
            {
                "author": "Ольга С.",
                "rating": 4,
                "text": "Хороший мастер, всё понравилось. Парковка во дворе — большой плюс",
                "date_iso": "2026-03-15",
                "source": "2ГИС",
                "is_top_pick": False,
            },
            {
                "author": "Юлия В.",
                "rating": 5,
                "text": "Лучший маникюр в Москве. Серьёзно. Уже подруг привожу",
                "date_iso": "2026-02-20",
                "source": "Яндекс.Карты",
                "is_top_pick": True,
            },
            {
                "author": "Татьяна М.",
                "rating": 5,
                "text": "Очень аккуратно, без боли, идеальные ногти на две недели",
                "date_iso": "2026-02-10",
                "source": "Яндекс.Карты",
                "is_top_pick": False,
            },
            {
                "author": "Кристина А.",
                "rating": 5,
                "text": "Прекрасный сервис, чисто, уютно, мастер внимательный к деталям",
                "date_iso": "2026-01-25",
                "source": "Telegram",
                "is_top_pick": False,
            },
        ],
        "about": {
            "photo_url": "https://placehold.co/320x400/c4946f/ffffff?text=Master+photo",
            "bio": "Восемь лет работаю с гелевым покрытием, регулярно учусь у топовых мастеров России и Кореи.",
            "creds": [
                "Сертификат BeautySchool, 2018",
                "Курс «Архитектура ногтей», Москва, 2021",
                "Преподаватель студии Beauty Academy",
            ],
            "guarantees": [
                "Стерильные одноразовые материалы",
                "Гарантия на покрытие — 14 дней",
                "Бесплатная коррекция при сколе",
            ],
        },
        "faq": [
            {"question": "Сколько держится гель-лак?", "answer": "От двух недель в среднем, многое зависит от ваших ногтей"},
            {"question": "Можно ли с детьми?", "answer": "Да, есть зона ожидания с мультиками"},
            {"question": "Принимаете карты?", "answer": "Да, любые карты + СБП + наличные"},
            {"question": "Парковка есть?", "answer": "Бесплатная во дворе, въезд с Тверской"},
            {"question": "Что делать, если опаздываю?", "answer": "Позвоните — обычно держим до 15 минут"},
            {"question": "Можно подарочный сертификат?", "answer": "Да, оформляется на любую сумму"},
            {"question": "Работаете в выходные?", "answer": "Да, без выходных, с 10:00 до 21:00"},
            {"question": "Принимаете без записи?", "answer": "Редко получается, лучше записаться заранее"},
        ],
        "contact_url": "/api/leads",
        # Synthetic placeholder — Yandex SmartCaptcha client keys are public
        # by design (they're embedded in the page <script>); this string is
        # never validated by the captcha service in our test fixture.
        "captcha_client_key": "test-captcha-key",  # pragma: allowlist secret
        "site_subdomain": "studia-anna",
        "site_url": "https://studia-anna.samosite.online/",
        "site_locale": "ru-RU",
        "year": 2026,
    }


def render() -> None:
    """Render template + copy CSS asset into OUTPUT_DIR."""
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        autoescape=select_autoescape(["html", "j2"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )
    tmpl = env.get_template("index.html.j2")
    html = tmpl.render(**fixture())

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "index.html").write_text(html, encoding="utf-8")

    # The template links `/static/booking.css` (absolute path). Copy the
    # CSS asset into OUTPUT_DIR/static/ so a `python -m http.server` from
    # OUTPUT_DIR serves it correctly.
    static_dir = OUTPUT_DIR / "static"
    static_dir.mkdir(exist_ok=True)
    shutil.copy2(TEMPLATE_DIR / "components" / "booking.css", static_dir / "booking.css")

    print(f"Rendered customer-site fixture → {OUTPUT_DIR}/index.html")
    print(f"  + copied booking.css → {static_dir}/booking.css")


if __name__ == "__main__":
    render()
