# ADR-0002: Modular monolith with hexagonal core for high-risk modules

Date: 2026-05-18
Status: Accepted

## Context

Vitrina состоит из 6 явных bounded contexts: парсинг источников, LLM-генерация, публикация сайтов, лиды/PII, биллинг, админ-аналитика. Соблазн делать микросервисы есть (особенно parser-worker — он security-критичный и его хочется изолировать). Но:
- 1 разработчик
- 8 недель до запуска
- Bounded contexts ещё не стабильны — domain-модель будет меняться по результатам customer development

Литература: Sam Newman ("Monolith → Microservices"), DHH/Shopify Majestic Monolith, Vaughn Vernon (Implementing DDD). Все рекомендуют начинать с модульного монолита для команд <5 и greenfield-домена.

Одновременно, parser-worker и content-worker исполняют код против untrusted-content (HTML из YMaps, текст из TG-каналов, LLM-output). Эти контексты нужно изолировать на уровне сетевых границ Docker, даже внутри одной кодовой базы.

## Decision

We will build a **modular monolith** packaged as multiple Docker containers running the same Python codebase but with different entrypoints:

- `api` container — FastAPI process, обслуживает HTTP+admin, доступ к Postgres
- `parser-worker` container — RQ worker, обрабатывает `parse_queue`, **без доступа к Postgres**, общение с API только через Redis
- `content-worker` container — RQ worker для LLM-генерации, **без доступа к Postgres**, доступ к YandexGPT
- `sync-worker` container — cron+RQ-scheduler, имеет read-only доступ к Postgres (отдельный DB user)
- `tg-bot` container — aiogram, read-write к Postgres (ограниченные таблицы)

Внутри кодовой базы — **hexagonal architecture для модулей** `core/parsing`, `core/content`, `core/auth`, `core/leads`. Layered MVC для `users`, `feedback`, `admin` (тонкая бизнес-логика).

## Alternatives considered

- **Pure microservices** — rejected: 4-5 отдельных сервисов с независимыми deploy/CI/DB-migrations = 3-4 недели накладных, неоправданно для соло.
- **Single-process monolith** (всё в одном api container) — rejected: parser-worker компрометируется наиболее вероятно (untrusted content). Нужна сетевая изоляция от БД.
- **Plugin architecture (один процесс, разные модули загружаются как entry-points)** — rejected: не даёт сетевой изоляции parser от БД.
- **Pure hexagonal в всех модулях** — rejected: для CRUD-частей `users`/`feedback` ports+adapters — overengineering, замедляет разработку без выгоды.

## Consequences

**Positive:**
- Один репо, один CI-pipeline, один Alembic, одна команда `docker compose up`
- Сетевая изоляция parser-worker → даже RCE в Playwright не даёт доступа к БД
- Hexagonal в `core/` даёт быстрые unit-тесты (фейк-адаптеры) для самых рискованных модулей
- Лёгкая миграция в микросервисы: каждый core-модуль можно выделить в svc, когда придёт время

**Negative:**
- Дисциплина: легко случайно импортировать `infrastructure.postgres` из `core/parsing/` — нужен линтер (`import-linter`).
- Один Docker-образ для всех контейнеров → больше слоёв чем нужно для каждого, +50MB на образ.
- Деплоится атомарно — рестарт api рестартит и воркеры (если не управлять `docker compose up --no-deps`).

**Neutral:**
- Требует один CLAUDE.md, один CONTRIBUTING.md, одну ADR-папку.

## Verification

```bash
# 1. import-linter правила есть и проходят:
cat backend/.importlinter
cd backend && lint-imports

# 2. docker compose показывает 5 контейнеров с правильными сетями:
docker compose config | yq '.services | keys'
docker compose config | yq '.networks'

# 3. parser-worker не имеет доступа к Postgres:
docker compose exec parser-worker python -c "import psycopg2; psycopg2.connect('host=postgres user=app')"  # должно упасть на network unreachable

# 4. CI gate:
grep -E "from app.infrastructure.postgres" app/core/  # должно быть 0 совпадений
```
