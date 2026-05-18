# Vitrina — Specification Package

> Полный набор артефактов, готовый к передаче в Claude Code session.

## Файлы

### Root
- [`CLAUDE.md`](./CLAUDE.md) — operational context для Claude Code (≤80 строк)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — branching, commits, PR checklist

### Docs
- [`docs/COPY.md`](./docs/COPY.md) — **Canonical messaging** (CVP, hero copy, tone-of-voice, anti-patterns). Single source of truth для всего copy на лендинге и UI
- [`docs/PRD.md`](./docs/PRD.md) — Product Requirements (EARS notation, SCQ, personas, success metrics)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — C4 диаграммы, stack table, modular monolith + hexagonal core
- [`docs/SECURITY.md`](./docs/SECURITY.md) — STRIDE per boundary, OWASP Top 10:2025 mapping, ФЗ-152/ФЗ-420 compliance, DPIA
- [`docs/TASKS.md`](./docs/TASKS.md) — 30+ задач с stable IDs, EARS acceptance criteria, dependencies
- [`docs/TESTING.md`](./docs/TESTING.md) — пирамида тестов, security test suite
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Docker Compose, backup/restore, runbooks

### ADR (Architecture Decision Records)
- [`docs/adr/0001-stack-selection.md`](./docs/adr/0001-stack-selection.md) — Python+FastAPI+Postgres
- [`docs/adr/0002-modular-monolith.md`](./docs/adr/0002-modular-monolith.md) — Modular monolith + hexagonal core
- [`docs/adr/0003-llm-provider-yandexgpt.md`](./docs/adr/0003-llm-provider-yandexgpt.md) — YandexGPT 5 Pro only
- [`docs/adr/0004-instagram-legal-strategy.md`](./docs/adr/0004-instagram-legal-strategy.md) — IG out of scope, redirect to photo-upload / waitlist
- [`docs/adr/0005-telegram-parsing-strategy.md`](./docs/adr/0005-telegram-parsing-strategy.md) — Bot API → web-view → HTML export
- [`docs/adr/0006-pii-encryption.md`](./docs/adr/0006-pii-encryption.md) — Fernet с миграцией на KMS в M3+
- [`docs/adr/0007-auth-model.md`](./docs/adr/0007-auth-model.md) — Magic link/Yandex ID для юзеров, password+TOTP для admin
- [`docs/adr/0008-multi-channel-contact-strategy.md`](./docs/adr/0008-multi-channel-contact-strategy.md) — Single contact input, 4 типа (TG/MAX/email/phone)
- [`docs/adr/0009-source-waitlist.md`](./docs/adr/0009-source-waitlist.md) — **MVP source list = TG+YMaps+Фото; остальные через feedback-waitlist ≥10 голосов**

## Порядок чтения для Claude Code

1. `CLAUDE.md` — context
2. `docs/PRD.md` — что строим
3. `docs/ARCHITECTURE.md` — как устроено
4. `docs/SECURITY.md` — ключевой документ, читать перед любым кодом
5. `docs/adr/0001..0007` — locked decisions
6. `docs/TASKS.md` — backlog, идти по эпикам E0 → E9

## Hand-off prompt

```
Я даю тебе спецификацию проекта Vitrina — AI-генератор сайтов для микробизнеса в РФ. Все артефакты в `docs/` и `CLAUDE.md`.

ОБЯЗАТЕЛЬНО прочитать в таком порядке перед первым кодом:
1. CLAUDE.md
2. docs/PRD.md
3. docs/ARCHITECTURE.md
4. docs/SECURITY.md — KEY DOCUMENT
5. docs/adr/0001-0007
6. docs/TASKS.md

ПРАВИЛА:
- Работаем по TASKS.md в порядке Epic E0 → E1 → ... → E9
- Один таск = один PR; формат — см. CONTRIBUTING.md
- ВСЕГДА включай Universal security block (CLAUDE.md) при работе с core/auth, core/leads, core/parsing, core/content, core/consent
- НИКОГДА не добавляй runtime-зависимости без новой ADR
- НИКОГДА не используй openai/anthropic/google.generativeai/telethon/instaloader — enforced import-linter
- При сомнениях по security — спрашивай, не угадывай
- Таск считается done только после `make test && make typecheck && make security-check` зелёного

ПЕРВЫЙ ТАСК: T0.1 — Initialize monorepo structure. Не начинай с кода — сначала покажи:
(a) tree planned-структуру репо,
(b) содержимое pyproject.toml (только [tool.poetry.dependencies] и [tool.poetry.group.dev.dependencies]),
(c) список dev-tools для pre-commit (T0.2),
(d) вопросы по dev-стеку до начала кода.

Жду план, без файлов; я подтверждаю — начинаешь T0.1.
```
