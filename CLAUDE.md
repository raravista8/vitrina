# Project: Vitrina (code-name) / Самосайт (brand)

AI website generator for micro-businesses in RF. Source (Telegram channel, Yandex.Maps, photos) → site in 2 minutes. Weekly auto-sync. FZ-152 compliant.

This is the **root** `CLAUDE.md`. It applies to the whole repo. For area-specific rules, Claude Code also reads the nearest nested `CLAUDE.md` when working in that directory:

- `backend/CLAUDE.md` — Python / FastAPI / SQLAlchemy / RQ
- `landing/CLAUDE.md` — Next.js 16 / Tailwind / canon consumer / **pixel-perfect protocol**
- `packages/canon/CLAUDE.md` — vendored `@samosite/canon` package rules

---

## 0. Behavioral principles (read FIRST, applies to EVERY task)

These four principles override task-specific instinct. They exist to suppress the most common AI coding failure modes: silent assumptions, overengineering, scope creep, unverified completion.

### 0.1 Think before coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, STOP. Name what's confusing. Ask.

### 0.2 Simplicity first

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Self-check: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 0.3 Surgical changes

Touch only what you must. Clean up only your own mess.

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

Orphan rule: remove imports/variables/functions YOUR changes made unused. Don't remove pre-existing dead code unless asked.

Test: every changed line traces directly to the user's request.

### 0.4 Goal-driven execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"
- "Make UI match design" → "`npm run test:visual` passes with diff ≤ 2%"

For multi-step tasks, state a brief plan:

```
1. [step] → verify: [check]
2. [step] → verify: [check]
3. [step] → verify: [check]
```

**Working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, clarifying questions come BEFORE implementation rather than AFTER mistakes.

---

## 1. Stack overview

Python 3.12 + FastAPI + SQLAlchemy 2.0 + Postgres 16 + Redis (RQ) + Jinja2 (customer sites). Next.js 16 App Router + Tailwind + `@samosite/canon` (UI source of truth) — landing. Docker Compose on Selectel VPS. YandexGPT 5 Pro (only LLM).

Detailed rules: see `backend/CLAUDE.md` and `landing/CLAUDE.md`.

## 2. Commands (`make` targets)

| Target                | What it does                                           |
| --------------------- | ------------------------------------------------------ |
| `make install`        | poetry (backend) + npm install (landing)               |
| `make dev`            | docker compose up (full stack)                         |
| `make test`           | pytest + vitest (unit + integration + security subset) |
| `make test-full`      | adds e2e + slow markers                                |
| `make lint`           | ruff (backend) + eslint (landing)                      |
| `make typecheck`      | mypy --strict + tsc --noEmit                           |
| `make security-check` | bandit + pip-audit + npm audit + gitleaks              |
| `make migrate`        | alembic upgrade head                                   |

Visual regression lives in `landing/`:
| Command (run from `landing/`) | What it does |
|-------------------------------|--------------|
| `npm run test:visual` | Playwright pixel-diff against `tests/visual/baselines/` |
| `npm run test:visual:update` | Regenerate baselines via `infra/scripts/generate-canon-baselines.sh` |

Full UI protocol in `landing/CLAUDE.md`.

## 3. Project structure

```
backend/         FastAPI + workers + bot (Python 3.12, poetry)
  app/api/       FastAPI routers (thin)
  app/core/      domain logic, hexagonal — NEVER imports infrastructure/
  app/infrastructure/  concrete adapters (postgres, redis, s3, ygpt)
  app/workers/   RQ worker entrypoints
  app/bot/       aiogram TG bot handlers
landing/         Next.js 16 (App Router, Tailwind, React 19)
  app/           routes
  components/    landing-only hand-rolled components
  tests/visual/  Playwright pixel-diff suite + canon-source/ + baselines/
packages/canon/  vendored @samosite/canon (UI source of truth)
sites-template/  Jinja2 templates for customer sites
infra/           docker-compose, Caddyfile, deploy scripts
  scripts/       generate-canon-baselines.sh & co
docs/            PRD, ARCHITECTURE, SECURITY, ADRs, TASKS, COPY, handoff/
.claude/commands/  custom slash commands (e.g. /implement-screen)
```

## 4. File placement rules

When creating new files, follow these rules. **Prefer editing existing files over creating duplicates.**

| What                                       | Where                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| FastAPI router                             | `backend/app/api/<domain>.py`                                                |
| Domain logic                               | `backend/app/core/<domain>/`                                                 |
| DB / external service adapter              | `backend/app/infrastructure/<service>.py`                                    |
| Background job                             | `backend/app/workers/<job>.py`                                               |
| Pydantic schema                            | colocated with router or in `backend/app/core/<domain>/schemas.py`           |
| Alembic migration                          | `backend/alembic/versions/`                                                  |
| Backend test                               | `backend/tests/<unit\|integration\|security\|e2e>/test_<thing>.py`           |
| Landing page route                         | `landing/app/<route>/page.tsx`                                               |
| Landing component (canon import)           | use directly from `@samosite/canon/<entry>` — do not wrap unnecessarily      |
| Landing component (hand-rolled, justified) | `landing/components/<Name>.tsx` — only with reason (see `landing/CLAUDE.md`) |
| Visual spec                                | `landing/tests/visual/<screen>.spec.ts`                                      |
| Visual test util                           | `landing/tests/visual/utils/<thing>.ts`                                      |
| ADR                                        | `docs/adr/<NNNN>-<slug>.md` — required for new runtime deps                  |

**Don't:**

- Create new top-level directories without ADR.
- Duplicate code across `backend/` and `landing/` — share via API contracts.
- Add new components to `packages/canon/src/` — vendored, round-trip through Claude Design.

## 5. Protected paths (operational risk)

Changes here require **extra care** — read the referenced doc first, update tests in the same commit, surface uncertainty.

| Path                                 | Why protected                                            | Read first                         |
| ------------------------------------ | -------------------------------------------------------- | ---------------------------------- |
| `backend/app/core/auth/`             | Auth + 2FA + sessions                                    | `docs/SECURITY.md`                 |
| `backend/app/core/leads/`            | PII, FZ-152                                              | `docs/SECURITY.md` + ADR-0006      |
| `backend/app/core/parsing/`          | SSRF surface, untrusted input                            | `docs/SECURITY.md`                 |
| `backend/app/core/content/`          | LLM output sanitization                                  | `docs/SECURITY.md`                 |
| `backend/app/core/consent/`          | FZ-152 consent records                                   | `docs/SECURITY.md` + ADR-0007      |
| `packages/canon/src/`                | Vendored from Claude Design — do NOT edit directly       | `docs/handoff/CANON_PACKAGE_TZ.md` |
| `landing/tests/visual/baselines/`    | Pixel-perfect reference PNGs — only regenerate via canon | `landing/CLAUDE.md`                |
| `landing/tests/visual/canon-source/` | Canon prototype rendered for baselines                   | `landing/CLAUDE.md`                |
| `.github/workflows/`                 | CI/CD                                                    | ADR-0009                           |
| `infra/`                             | Deploy infrastructure                                    | `docs/ARCHITECTURE.md`             |

## 6. Conventions (non-defaults)

- API responses: `{ "ok": true, "data": {...} }` OR `{ "ok": false, "error": "code", "request_id": "..." }`
- Domain functions return `Result[T, DomainError]`; exceptions only at api boundary
- All Pydantic schemas: `model_config = ConfigDict(extra='forbid')`
- Jinja2: `autoescape=True` global, `{{ x | safe }}` forbidden (lint rule)
- IDs: UUIDv4 for public-facing, BIGSERIAL only for high-volume internal (events)
- Timestamps: TIMESTAMPTZ in DB, UTC in app, MSK in UI
- Brand: «Самосайт» in customer-facing copy. `vitrina` is code-name only (repo, package paths, env vars).

## 7. Hard rules (NEVER violate)

- NEVER commit secrets, `.env`, or TOTP-seeds
- NEVER weaken auth/2FA "temporarily"
- NEVER add new runtime dependency without ADR
- NEVER import `openai`, `anthropic`, `google.generativeai`, `telethon`, `instaloader`, `instagram_private_api` — enforced by import-linter
- NEVER use raw SQL with f-strings; ORM or `text(":param")` only
- NEVER concatenate user input into shell, HTML, or LLM prompts
- NEVER send PII to LLM without obfuscation (`[PHONE]`, `[EMAIL]`, `[NAME]`)
- NEVER edit `packages/canon/src/*` directly — vendored, round-trip through Claude Design
- NEVER transcribe canon JSX into hand-rolled Tailwind manually (see `landing/CLAUDE.md`)
- NEVER use "Latin transliteration" for the brand — «Самосайт» Cyrillic only in customer copy (legal, PRD §3)

## 8. Definition of Done

A task is NOT done until ALL apply:

### For any task

- [ ] Build clean
- [ ] `make lint` green
- [ ] `make typecheck` green
- [ ] `make test` green (relevant subset minimum; full suite for protected paths)
- [ ] If touching protected path: `make security-check` green + relevant doc re-read in same session
- [ ] Diff is surgical — every changed line traces to the request

### For backend tasks (additional)

- [ ] Tests updated in same commit when modifying `core/{auth,leads,parsing,content,consent}`
- [ ] Migration added if schema changed
- [ ] If new endpoint — rate-limit decorator + Pydantic validation + auth check

### For UI tasks (additional)

- [ ] `npm run test:visual` passes for affected screens (diff ≤ 2%)
- [ ] New component visible on prod route — verified via Playwright MCP screenshot
- [ ] If migration from hand-rolled → canon: old component `@deprecated`, no active imports
- [ ] `docs/handoff/VISUAL_COVERAGE.md` updated (🔵/🟢/🟡/🔴) for affected rows
- [ ] See `landing/CLAUDE.md` for full UI implementation protocol

## 9. Universal security block (include in every code-touching prompt for backend work)

> Security requirements (mandatory):
>
> 1. Pydantic for all input validation, `extra='forbid'`
> 2. Never concatenate user input into SQL/shell/HTML/LLM prompts; use ORM, subprocess args, template autoescape, `<user_content>` tagging
> 3. All secrets from env vars only, never in code or defaults
> 4. Treat all parser/LLM output as untrusted — sanitize before storage and rendering (bleach)
> 5. Rate-limit decorator on every public endpoint
> 6. Validate URLs against allowlist before fetching (SSRF protection)
> 7. Log without PII — mask phones/emails
> 8. If unsure about security implications, ASK before implementing
>
> If you violate any rule, explain why and ask for confirmation.

## 10. Reference docs

### Always loaded (read at session start)

- @docs/OPERATIONS.md — **how we ship & run prod**: deploy runbook, CI + flake handling, infra facts (Telegram blocked from the VPS), founder notifications, canon-vendoring checklist, local test setup. Read this before any deploy/CI/canon/infra work — it holds the operational knowledge that doesn't live anywhere else.
- @docs/handoff/SCREEN_INDEX.md — map of 19 canonical screens (canon JSX ⇄ prod TSX)
- @docs/handoff/VISUAL_COVERAGE.md — live tracker: canon-import vs hand-rolled, per-viewport status
- @packages/canon/CHANGELOG.md — known gaps and recent canon releases

### Read on trigger (load when working in matching area)

- @docs/COPY.md — TRIGGER: landing/UI copy, customer site templates, Hero/CTA copy
- @docs/SECURITY.md — TRIGGER: changes to `core/{auth,leads,parsing,content,consent}`
- @docs/handoff/CANON_PACKAGE_TZ.md — TRIGGER: any canon refresh or new entry request
- @docs/handoff/CANON_SWAP_PLAN.md — TRIGGER: planning a hand-rolled → canon migration
- @docs/handoff/specs/01_landing.md — TRIGGER: landing work
- @docs/handoff/specs/02_customer.md — TRIGGER: customer site templates
- @docs/handoff/specs/03_session.md — TRIGGER: session/intake flow
- @docs/handoff/specs/04_typography.md — TRIGGER: typography work
- @docs/handoff/specs/05_admin.md — TRIGGER: admin panel
- @docs/handoff/specs/06_public_screens.md — TRIGGER: source badge, submit modal, photo drawer, lead, feedback
- @docs/adr/ — TRIGGER: architectural decisions, conflicts with current approach. Key ADRs: 0004/0005 (IG/TG legal), 0008 (multi-channel contact v2), 0010 (AI review curation), 0011 (two-bot architecture — @SamositeIntakeBot vs @SamositeBot, NEVER confuse)

### Context only (don't load unless explicitly needed)

- @docs/PRD.md
- @docs/ARCHITECTURE.md
- @docs/TASKS.md
- @CONTRIBUTING.md
- @packages/canon/README.md
