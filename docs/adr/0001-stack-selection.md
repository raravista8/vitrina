# ADR-0001: Python + FastAPI + Postgres stack for MVP

Date: 2026-05-18
Status: Accepted

## Context

Vitrina — solo-built SaaS с парсингом разнородных источников (Y.Maps, TG, VK, archive uploads), LLM-генерацией контента, генерацией статических сайтов, дашбордом метрик и TG-ботом. Целевой запуск через 8 недель. Founder fluent in Python и JavaScript; имеет опыт с Docker, Postgres, FastAPI. Бюджет инфры ≤5000 ₽/мес на 100 сайтах.

Главные технические требования: (1) асинхронная работа с внешними API (парсинг и LLM-вызовы IO-bound), (2) безопасная работа с PII, (3) простота поддержки в одиночку, (4) экосистема библиотек под парсинг и LLM.

## Decision

We will build the backend in **Python 3.12 + FastAPI + SQLAlchemy 2.0 + Alembic + Redis (RQ) + PostgreSQL 16**, packaged with **Docker Compose** on a single Selectel VPS. Frontend landing in **Next.js 14 + Tailwind + shadcn/ui**. Customer sites rendered as static HTML+Tailwind via Jinja2 templates.

## Alternatives considered

- **Node.js + Next.js full-stack (TS)** — rejected: экосистема data-parsing+LLM+image processing беднее, чем в Python (`playwright-python` зрелее, чем JS-эквивалент для нашего use-case; `pillow` vs `sharp` — сопоставимо, но не выигрыш; SQLAlchemy 2.0 vs Prisma — SQLAlchemy сильнее с raw SQL escape hatch и JSONB).
- **Django + DRF** — rejected: тяжелее FastAPI, синхронная по умолчанию (async views — bolt-on), admin-UI «из коробки» — соблазн, но не решает наши security-задачи (2FA, audit log нужно всё равно писать).
- **Go + Chi + sqlc** — rejected: founder менее fluent, скорость кодинга в solo-режиме критичнее производительности рантайма.
- **Ruby on Rails 7** — rejected: founder менее fluent, парсинг-экосистема (Nokogiri+headless Chrome) слабее Python.
- **MongoDB вместо Postgres** — rejected: нет нужды в schema-less; JSONB в Postgres покрывает 100% наших dynamic-полей (`source_snapshot`, `generated_content`); транзакционность Postgres важна для PII-операций.
- **Microservices (parser-svc, content-svc, api-svc)** — rejected на старте; см. ADR-0002.

## Consequences

**Positive:**
- Один язык на бэкенд + парсинг + LLM + worker = меньше context switch
- FastAPI + Pydantic — единая валидация и автогенерация OpenAPI
- Огромная экосистема: `cryptography`, `bleach`, `phonenumbers`, `python-magic`, `pillow`, `playwright`, `aiogram`, `vk_api`, `telethon`
- Claude Code хорошо знает этот стек, меньше галлюцинаций

**Negative:**
- GIL ограничивает CPU-bound параллелизм — для нас не блокер (всё IO-bound), но image processing в pillow на > 100 фото может стать узким местом. Mitigation: пул процессов RQ.
- Размер Docker-образа Python больше Go.
- Async-Python в SQLAlchemy 2.0 имеет острые углы (event loop + connection pool) — добавить test coverage на N+1 и pool exhaustion.

**Neutral:**
- Next.js на лендинге — отдельный стек, отдельный CI-job. Acceptable trade-off для SEO.

## Verification

```bash
# Claude Code session can confirm:
grep -r "fastapi" backend/pyproject.toml
grep -r "sqlalchemy>=2" backend/pyproject.toml
ls backend/alembic/versions/
docker compose config | grep "python:3.12"
```

CI должен прогонять `python --version` == 3.12.x и блокировать merge при downgrade.
