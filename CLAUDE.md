# Project: Vitrina
AI-генератор сайтов для микробизнеса; источник → сайт за 2 минуты, auto-sync еженедельно, всё в РФ (ФЗ-152).

## Stack
Python 3.12 + FastAPI + SQLAlchemy 2.0 + Postgres 16 + Redis (RQ) + Jinja2 (sites). Next.js 14 + Tailwind (landing). Docker Compose on Selectel VPS. YandexGPT 5 Pro (only LLM).

## Commands
- `make install` — install poetry + npm deps
- `make dev` — docker compose up locally
- `make test` — pytest unit + integration + security subset
- `make test-full` — + e2e + full security suite
- `make lint` — ruff + eslint + mypy
- `make typecheck` — mypy strict
- `make security-check` — bandit + pip-audit + gitleaks
- `make migrate` — alembic upgrade head
- `make deploy` — push images + ssh + compose up

## Project structure
- `backend/app/api/` — FastAPI routers (thin)
- `backend/app/core/` — domain logic, hexagonal for parsing/content/auth/leads, NEVER imports from infrastructure/
- `backend/app/infrastructure/` — concrete adapters (postgres, redis, s3, ygpt clients)
- `backend/app/workers/` — RQ worker entrypoints
- `backend/app/bot/` — aiogram TG bot handlers
- `landing/` — Next.js
- `sites-template/` — Jinja2 templates for customer sites
- `infra/` — docker-compose, Caddyfile, deploy scripts

## Conventions (non-defaults)
- API responses: `{ "ok": true, "data": {...} }` OR `{ "ok": false, "error": "code", "request_id": "..." }`
- Domain functions return `Result[T, DomainError]`; exceptions raised only at api boundary
- All Pydantic schemas: `model_config = ConfigDict(extra='forbid')`
- Jinja2: `autoescape=True` global, `{{ x | safe }}` forbidden (lint rule)
- IDs: UUIDv4 for public-facing, BIGSERIAL only for high-volume internal (events)
- Timestamps: TIMESTAMPTZ in DB, UTC in app, MSK in UI

## Hard rules (NEVER violate)
- NEVER commit secrets, `.env`, or TOTP-seeds
- NEVER weaken auth/2FA "temporarily"
- NEVER add new runtime dependency without ADR
- NEVER import `openai`, `anthropic`, `google.generativeai`, `telethon`, `instaloader`, `instagram_private_api` — enforced by import-linter
- NEVER use raw SQL with f-strings; ORM or `text(":param")` only
- NEVER concatenate user input into shell, HTML, or LLM prompts; use subprocess args, autoescape, `<user_content>` tagging
- NEVER send PII to LLM without obfuscation (`[PHONE]`, `[EMAIL]`, `[NAME]`)
- ALWAYS run `make test && make typecheck && make security-check` before declaring task done
- ALWAYS read SECURITY.md before changes to `core/auth/`, `core/leads/`, `core/parsing/`, `core/content/`, `core/consent/`
- ALWAYS update tests in the same commit when modifying `core/{auth,leads,parsing/url_validator,content/output_validator}`

## Universal security block (include in every code-touching prompt)
> Security requirements (mandatory):
> 1. Pydantic for all input validation, `extra='forbid'`
> 2. Never concatenate user input into SQL/shell/HTML/LLM prompts; use ORM, subprocess args, template autoescape, `<user_content>` tagging
> 3. All secrets from env vars only, never in code or defaults
> 4. Treat all parser/LLM output as untrusted — sanitize before storage and rendering (bleach)
> 5. Rate-limit decorator on every public endpoint
> 6. Validate URLs against allowlist before fetching (SSRF protection)
> 7. Log without PII — mask phones/emails
> 8. If unsure about security implications, ASK before implementing
> If you violate any rule, explain why and ask for confirmation.

## Reference docs (read on demand)
- @docs/COPY.md — **canonical messaging** для landing/UI работ; tone-of-voice + anti-patterns. READ перед любыми изменениями в `landing/components/Hero.tsx`, `landing/content/`, customer site templates copy
- @docs/PRD.md — what we're building
- @docs/ARCHITECTURE.md — how it fits together
- @docs/SECURITY.md — threat model + ФЗ-152 controls (READ before auth/crypto/parser/leads changes)
- @docs/TASKS.md — current backlog with stable IDs
- @docs/adr/ — locked-in decisions; ADR-0004/0005 = IG/TG legal strategy; ADR-0008 = multi-channel contact
- @CONTRIBUTING.md — PR checklist
