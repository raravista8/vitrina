# Project: Vitrina

AI website generator for micro-businesses; source → site in 2 minutes, weekly auto-sync, fully hosted in RF (FZ-152).

## Stack

Python 3.12 + FastAPI + SQLAlchemy 2.0 + Postgres 16 + Redis (RQ) + Jinja2 (sites). Next.js 16 (App Router) + Tailwind + `@samosite/canon` (UI source of truth, see "Canon workflow" below) — landing. Docker Compose on Selectel VPS. YandexGPT 5 Pro (only LLM).

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
- `make visual-test` — run Playwright pixel-diff against canon baselines
- `make visual-update` — refresh baselines (ONLY after explicit design sign-off)

## Project structure

- `backend/app/api/` — FastAPI routers (thin)
- `backend/app/core/` — domain logic, hexagonal for parsing/content/auth/leads, NEVER imports from infrastructure/
- `backend/app/infrastructure/` — concrete adapters (postgres, redis, s3, ygpt clients)
- `backend/app/workers/` — RQ worker entrypoints
- `backend/app/bot/` — aiogram TG bot handlers
- `landing/` — Next.js
- `packages/canon/` — vendored `@samosite/canon` npm package (UI source of truth from Claude Design — see "Canon workflow" below)
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
- WHEN replacing a hand-rolled section with a canon import: always run the migration protocol (see "UI implementation protocol" below). Never leave orphan imports.
- WHEN canon doesn't export the component you need (Hero, Footer, modals): DO NOT transcribe by hand. STOP and ask, or log it as a known gap in CHANGELOG.
- AFTER any UI change, before declaring done: pixel-diff is mandatory. `make visual-test` must pass, or deviations must be explicitly documented in the PR.

## UI implementation protocol (read before any landing/admin/customer-site work)

**Task size**: one screen = one task = one PR. "Migrate the landing" is 13 tasks, not one. If a request sounds like "do all of X", STOP and ask to break it down into a screen list from `SCREEN_INDEX.md`.

**Three anchors per UI task** (don't start without all three):

1. **Source**: which canon entry is imported (`@samosite/canon/<entry>`) or which `canon/*.jsx` file serves as visual reference
2. **Destination**: which prod file is edited, which component is replaced, which line range
3. **Acceptance**: what must match (selectors, padding, sizes) + pixel-diff threshold

**Migration protocol** (when replacing hand-rolled with canon import):

1. Grep all usages of the old component across the repo
2. Swap the import to the canon entry
3. Mark the old file `@deprecated` (JSDoc comment at top); DO NOT delete it
4. Verify: `pnpm dev` → open the route → confirm the new component is in the DOM via `data-section` / `data-screen`
5. If the old file is no longer imported anywhere active, note it in the PR description — deletion is a separate task

**Definition of done for UI tasks** (ALL items required):

- [ ] Build clean, `make lint` and `make typecheck` green
- [ ] Pixel-diff against canon ≤ threshold (`make visual-test` passes)
- [ ] New component visible on the prod route (verified via Playwright screenshot)
- [ ] If migration: old component is `@deprecated` and not imported from active routes
- [ ] `VISUAL_COVERAGE.md` updated (🟢/🟡/🔴 for affected cells)

**STOP and ask if**:

- Canon doesn't export the needed component (see "Still hand-rolled" list above — Hero, Footer, SubmitModal, etc.)
- Spec and canon JSX contradict each other
- Canon has a state/variant the spec doesn't mention (or vice versa)
- A design token is needed that isn't in `@samosite/canon/tokens`
- It's unclear whether the task replaces an existing component or adds a new one

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

## Visual verification tools

Playwright MCP is registered as `playwright` (see `.mcp.json`). If not yet installed: `claude mcp add playwright npx @playwright/mcp@latest`.

**Use it to:**

- Screenshot a prod route and compare against canon before declaring a UI task done
- Verify a new component actually rendered to the DOM after migration (`data-section`, `data-screen` attributes)
- Reproduce UI bug reports (instead of guessing from descriptions)
- Sanity-check responsive breakpoints (1440 desktop, 768 tablet, 375 mobile)

**Don't use it for:**

- Auto-fixing UI — verification and diff reporting only
- Full E2E runs — that's `make test-full`
- Bypassing `make visual-test` — the Playwright MCP is for interactive verification, `visual-regression.yml` is the source of truth in CI

## Reference docs

### Always loaded (read at session start)

- @docs/handoff/SCREEN_INDEX.md — map of 19 canonical screens (canon JSX ⇄ prod TSX)
- @docs/handoff/VISUAL_COVERAGE.md — live tracker: which screens are canon-import (drift=0), which still hand-rolled
- @packages/canon/CHANGELOG.md — known gaps and recent canon releases

### Read on trigger (load when working in matching area)

- @docs/COPY.md — **canonical messaging** for landing/UI work; tone-of-voice + anti-patterns. TRIGGER: any changes to `landing/components/Hero.tsx`, `landing/content/`, customer site templates copy
- @docs/SECURITY.md — threat model + FZ-152 controls. TRIGGER: changes to `core/auth/`, `core/leads/`, `core/parsing/`, `core/content/`, `core/consent/`
- @docs/handoff/CANON_PACKAGE_TZ.md — TZ that produced `@samosite/canon` (Variant C spec, exports, versioning, integration scenarios). TRIGGER: any canon refresh or new entry request
- @docs/handoff/specs/01_landing.md — TRIGGER: landing work
- @docs/handoff/specs/02_customer.md — TRIGGER: customer site templates
- @docs/handoff/specs/03_session.md — TRIGGER: session/intake flow
- @docs/handoff/specs/04_typography.md — TRIGGER: typography or font-related work
- @docs/handoff/specs/05_admin.md — TRIGGER: admin panel work
- @docs/handoff/specs/06_public_screens.md — TRIGGER: source badge, submit modal, photo drawer, lead, feedback
- @docs/adr/ — locked-in decisions. TRIGGER: architectural decisions or when conflicting with current approach. Key ADRs: 0004/0005 = IG/TG legal strategy; 0008 = multi-channel contact (v2: explicit radio, not auto-detect); 0010 = AI review curation; 0011 = two-bot architecture (@SamositeIntakeBot for source parsing vs @SamositeBot for user notifications — NEVER confuse the two)

### Context only (don't load unless explicitly needed)

- @docs/PRD.md — what we're building
- @docs/ARCHITECTURE.md — how it fits together
- @docs/TASKS.md — current backlog with stable IDs
- @CONTRIBUTING.md — PR checklist
- @packages/canon/README.md — consumer docs for the canon package (entry points, fonts, Tailwind preset)
