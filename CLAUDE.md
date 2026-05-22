# Project: Vitrina
AI-генератор сайтов для микробизнеса; источник → сайт за 2 минуты, auto-sync еженедельно, всё в РФ (ФЗ-152).

## Stack
Python 3.12 + FastAPI + SQLAlchemy 2.0 + Postgres 16 + Redis (RQ) + Jinja2 (sites). Next.js 16 (App Router) + Tailwind + `@samosite/canon` (UI source of truth, see «Canon workflow» below) — landing. Docker Compose on Selectel VPS. YandexGPT 5 Pro (only LLM).

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
- `packages/canon/` — vendored `@samosite/canon` npm package (UI source of truth from Claude Design — see «Canon workflow» below)
- `sites-template/` — Jinja2 templates for customer sites
- `infra/` — docker-compose, Caddyfile, deploy scripts

## Canon workflow (UI source of truth)

`@samosite/canon` is vendored as a workspace `file:` dep under `packages/canon/`. **Canon = the design team's React source. Prod imports canon directly = drift is mathematically impossible.** Per `docs/handoff/CANON_PACKAGE_TZ.md` (Variant C).

**What lives in canon:**
- 19 screens (landing × 13 + intake × 6 + customer × 1 + admin × 10 + admin-demo × 1)
- 12 primitives (`SectionTitle`, `SectionSub`, `Btn`, `Mono`, `Logo`, `BrandMark`, icons, `FeatureCard`, etc.)
- Design tokens (`VT`, `BRAND`, flat `tokens` colors/fonts/shadows/radii)
- `<CanonStyles />` provider — hover-lift, focus rings, vt-pulse keyframes, smooth-scroll
- Tailwind preset (`@samosite/canon/tailwind-preset`)

**Currently consuming canon (drift = 0):**
- `landing/app/page.tsx` — 9 sections via `<ResponsiveCanonSection>` (Examples → FreeMonth)
- `landing/app/layout.tsx` — `<CanonStyles />` mounted in `<body>`
- `landing/app/admin-demo/page.tsx` — `<ClientAdminDemo />` drop-in

**Still hand-rolled (intentional):**
- `Hero` — canon's `HeroBlock` is read-only (input is placeholder, CTA is anchor). Replacing would break signup. Wait for canon 0.2.x interactive variant.
- `Footer` — canon doesn't export standalone (inlined in `<SamosaytLanding>`). Trivial extraction needed canon-side.
- `SubmitModal`, `PhotoDrawer`, `SourceDetectionBadge`, `FeedbackForm`, `ApplicationForm` — interactive, same compromise as Hero.

**Refresh procedure when Claude Design ships a new canon version:**
1. Replace `packages/canon/{src,README.md,CHANGELOG.md,package.json,…}` with the new package wholesale
2. `cd packages/canon && npm i && npm run build` (regenerates `dist/`)
3. `cd landing && npm install --install-links file:../packages/canon` (force-copy, not symlink — turbopack/Vite peer-dep symlink quirk)
4. `npm run build` from `landing/` to verify nothing broke
5. Commit (dist/ is committed; pre-commit hooks already exempt `packages/canon/dist/` from whitespace/EOF normalization)

**Hard rules around canon:**
- NEVER transcribe canon JSX into hand-rolled Tailwind manually. If a section needs to be on prod, import it from `@samosite/canon/<entry>`. If it doesn't exist in canon yet, file an issue with design before doing transcription.
- NEVER edit `packages/canon/src/*` directly. It's vendored — round-trip through Claude Design.
- NEVER drop `--install-links` from `npm ci` invocations (`landing/Dockerfile`, `.github/actions/setup-landing/action.yml`, `.github/workflows/visual-regression.yml`). Turbopack/Vite can't follow `file:` symlinks for peer-dep resolution.
- ALWAYS keep `transpilePackages: ['@samosite/canon']` in `landing/next.config.mjs` (defense-in-depth alongside `--install-links`).
- ALWAYS mount `<CanonStyles />` ONCE in `landing/app/layout.tsx`. Hover/focus/pulse don't fire without it.
- WHEN swapping a section back from canon to hand-rolled Tailwind (e.g. for Tailwind bundle size or A/B copy), gate the swap on a pixel-diff test against the canon component (see `docs/handoff/CANON_PACKAGE_TZ.md §6` Scenario 2).

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
- @docs/adr/ — locked-in decisions; ADR-0004/0005 = IG/TG legal strategy; ADR-0008 = multi-channel contact (v2: explicit radio, not auto-detect); ADR-0010 = AI review curation (NEW v2); ADR-0011 = two-bot architecture (@SamositeIntakeBot for source parsing vs @SamositeBot for user notifications — NEVER confuse the two)
- @CONTRIBUTING.md — PR checklist
- @docs/handoff/CANON_PACKAGE_TZ.md — TZ that produced `@samosite/canon` (Variant C spec, exports, versioning, integration scenarios)
- @docs/handoff/SCREEN_INDEX.md — map of 19 canonical screens (canon JSX ⇄ prod TSX)
- @docs/handoff/VISUAL_COVERAGE.md — live tracker: which screens are canon-import (drift=0), which still hand-rolled
- @docs/handoff/specs/ — per-area specs (01 landing, 02 customer, 03 session, 04 typography, 05 admin, 06 public screens 2-9). READ when implementing or reviewing UI-side feature
- @packages/canon/README.md — consumer docs for the canon package (entry points, fonts, Tailwind preset)
- @packages/canon/CHANGELOG.md — what's in each canon release, known gaps from CANON_PACKAGE_TZ acceptance
