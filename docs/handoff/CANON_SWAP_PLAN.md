# Canon swap plan — risky / deferred screens

> **Status as of PRs #119–#124:** 9 landing visual sections + 2 demo
> pages (`/admin-demo`, `/customer-demo`) consume canon directly with
> drift = 0. **3 surfaces remain hand-rolled** because canon's variants
> are read-only / decorative and the surfaces have live behaviour we
> can't drop. This doc captures the path forward for each, with the
> hybrid pattern that any future swap needs to follow.

## TL;DR risk table

| Surface | Canon variant | Live behaviour | Risk if swapped naively | Status |
|---|---|---|---|---|
| `Hero` | `HeroBlock` | URL paste → debounced preview → CTA → SubmitModal → POST /api/submit-application | **Signup conversion = 0** | ⛔ deferred until canon 0.2.x interactive variant |
| Admin chrome (10 screens) | `AdminLogin`, `AdminDashboard`, `AppsList`, …, `Settings` | password+TOTP, real fetch, session cookies, CSRF | **Founder locked out of admin** | ⛔ deferred until canon 0.2.x |
| Intake (SubmitModal, PhotoDrawer, SourceDetectionBadge, LeadForm, FeedbackForm) | `SubmitModal`, `PhotoDrawer`, … | POST /api/submit-application, captcha, polling, multipart upload, lead Fernet encryption | **Signup + lead intake broken** | ⛔ deferred until canon 0.2.x |
| Customer-site Jinja → React-canon SSR | `CustomerSite` | rendered server-side per master into S3 at publish time | **Published customer-sites stop refreshing** | ⏸ feasible but ~3 days backend lift, not blocking |
| Phase 6 — Intake 3→2 steps + backend endpoint deletions | n/a (own-code) | live TG-source submissions still use 3-step + /api/tg-bot-personal-status polling | **TG submissions silently dropped** | 🟡 ~2 days + prepared downtime |

## Why canon-side variants are «read-only»

Every interactive screen in canon (Hero / SubmitModal / LeadForm /
AdminLogin etc.) ships as a **pure presentational React component**:
inputs are `<span>` placeholders, buttons are `<a href>` anchors,
state is module-local. This is **intentional** per the design team —
canon describes what the UI looks like, not what it does. Hooking
behaviour onto canon's DOM is the consumer's job.

For Landing sections that have no interactivity (Examples, Story,
Pricing, …) this is fine — prod just renders canon, done. For Hero
and the intake/admin surfaces, the consumer needs a **hybrid
pattern**.

## Hybrid pattern (what would work)

Three options, ranked by maintenance cost:

### Option A — Wait for canon 0.2.x interactive variants

Design team adds prop-based handlers (`HeroSection onSubmit={...}`,
`SubmitModal onApplicationCreated={...}`, `AdminLogin onSubmit={...}`).
We drop them in like the visual sections — drift = 0, behaviour ours.

**Cost:** zero on our side, ~1-2 weeks for design team to add and
re-release.
**Upside:** clean separation: canon = visual + props contract, we = behaviour.
**Recommended.**

### Option B — Local fork with cloneElement injection

Wrap canon's component, walk its JSX tree with React's `cloneElement`,
patch event handlers onto matched nodes. Tested for SubmitModal in a
spike — works but tightly couples to canon's internal DOM (any reshape
breaks the fork).

**Cost:** ~1 day per surface to write, ~½ day per surface per canon
refresh to re-validate.
**Upside:** unblocks today.
**Downside:** every canon refresh = manual re-audit. Drift returns
silently.
**Use only if 0.2.x doesn't land in 2 weeks.**

### Option C — Hand-roll Tailwind with canon-tokens

Re-implement the surface in Tailwind, using `@samosite/canon/tokens` +
`@samosite/canon/tailwind-preset` so values stay in lockstep. Gate
swap with pixel-diff vs canon component in CI (see
`CANON_PACKAGE_TZ.md §6` Scenario 2).

**Cost:** ~½ day per surface + pixel-diff baseline setup.
**Upside:** full control over behaviour, no canon dependency at
runtime.
**Downside:** transcription work returns. The whole reason for the
canon-package was to *eliminate* this.
**Avoid unless A and B both fail.**

## Per-surface plan

### Hero

Currently `landing/components/Hero.tsx` (custom Tailwind + Radix
Dialog modal trigger + Yandex SmartCaptcha).

**0.2.x ask:** `HeroSection` exports the same visual JSX as today's
`HeroBlock` but accepts:
- `value: string` (input value)
- `onChange: (v: string) => void`
- `onSubmit: (v: string) => void` (CTA click handler)
- `badge?: ReactNode` (the live preview badge slot below input)
- `freeMonth?: ReactNode` (the gift-pill slot)

**Acceptance:** Hero on prod becomes a 5-line wrapper:

```tsx
import { HeroSection } from '@samosite/canon/landing';
import { useHeroIntake } from './use-hero-intake'; // our hook

export function Hero() {
  const { value, setValue, openModal, sourceBadge, freeMonth } = useHeroIntake();
  return (
    <HeroSection
      value={value}
      onChange={setValue}
      onSubmit={openModal}
      badge={sourceBadge}
      freeMonth={freeMonth}
    />
  );
}
```

### Admin chrome

10 screens × roughly the same pattern: canon ships visual, we wrap.

**0.2.x ask:** Each admin screen accepts:
- `data: T` — typed prop with the data canon renders (apps list, leads,
  ...). Right now data is baked mock.
- `onAction: (id, action) => void` — single dispatcher for buttons
  (publish/reject/decrypt/etc.)

**Caveat:** admin login *also* needs to integrate with our
existing two-step (password → TOTP) state machine. Probably the
hardest of the 10. Recommend separating: ship `AdminDashboard`,
`AppsList`, `SitesList` etc. as 0.2.x first; defer `AdminLogin` to
0.3.x.

### Intake (`SubmitModal`, `PhotoDrawer`, `LeadForm`, `FeedbackForm`)

Most behaviour-heavy surface. SubmitModal alone has 3 steps × 4
channels × captcha state × polling lifecycle.

**0.2.x ask:** SubmitModal accepts:
- `onApplicationCreated: (id, contactType) => void`
- `e2eInitialStep?: Step` (we already added this on our side for
  visual tests — should standardise on canon side)
- `captchaToken?: string`
- `pollPersonalBotStatus: (appId) => Promise<{started: boolean}>`

PhotoDrawer:
- `onUploadProgress: (n) => void`
- `onComplete: (urls) => void`

LeadForm:
- `onSubmit: (lead) => Promise<{ok}>`

### Customer-site (Jinja → React-canon SSR)

Different shape — this isn't a runtime swap, it's a publish-pipeline
swap. Currently `core/publishing/render.py` does Jinja2 → HTML → S3
upload at `POST /admin/sites/<id>/publish`.

**Two implementation paths:**

1. **Add Node worker.** Run a tiny Node service that takes
   `{master_id, props}` → spawns `renderToString(<CustomerSite
   {...props}/>)` → returns HTML. FastAPI calls this Node service
   instead of Jinja. ~3 days incl. infra (Docker, healthcheck,
   compose config).
2. **In-process React rendering.** Use `react-dom-cli` or similar to
   `subprocess` a small render script. Slower (~200ms per render,
   acceptable since publish is once-per-edit not per-request) but no
   long-running service. ~2 days.

**0.2.x ask:** `CustomerSite` accepts the full data contract from
`render.py::render_site_context()` — service titles/prices,
gallery URLs, curated reviews, about-bullets, FAQ, etc. Currently it
only takes `scheme` + `plan` and bakes everything else.

**Risk:** the currently-published customer-sites (Jinja-rendered) need
re-publish to pick up the canon visual. Not auto-migrating until
master clicks «обновить сайт» on their own (no risk of breaking what's
live). Doable per-site as a soft launch.

### Phase 6 — Intake 3→2 steps + backend endpoint deletions

Independent of canon — pure UX simplification.

**What's pending:**
- Frontend: collapse `SubmitModal` from 3 steps (link → channel →
  bot-start) to 2 (link → channel; bot-start moves to post-submission
  email).
- Backend: delete unused endpoints
  `/api/tg-bot-personal-status`, `/api/submit-application/finalize-via-email`,
  `/api/tg-bot-status?app_id=...`.
- Delete `core/parsing/adapters/tg_bot_api.py` if only used for the
  private-channel flow (verify — also used for public channel parse).

**Pre-requisites:**
1. **Analytics check** — how many active TG-channel submissions in
   the last 7 days? If <5, low-risk window. If >20, prepared downtime
   needed.
2. **Email-onboarding flow** — replacement for the «click /start in
   `@SamositeBot`» step. Operator must send a one-shot welcome email
   after master gets approved.
3. **Endpoint deprecation header** — add `Deprecation: true`
   response header for 1 week before delete, so any external client
   sees warnings.

**Execution plan:**
- PR 1 (frontend): collapse SubmitModal to 2 steps, keep all backend
  endpoints alive. Ship behind feature flag.
- PR 2 (backend, +7 days): remove polling endpoint + finalize-via-email.
- PR 3 (canon): if 3-step UI is gone from prod, ask design to remove
  it from canon's `S3_SubmitModal` (currently exports a 3-step shell).

**Time:** ~2 days code + 1 week deprecation window + 1 day cleanup.

## What to monitor after any swap

- `/version` should always return our latest `git_sha` (caching
  catches first when stale)
- `POST /api/submit-application` 2xx rate (cliff = signup broken)
- `POST /api/admin/login` 2xx rate (cliff = founder locked out)
- Published customer-sites still render (sample 3 random sites
  weekly after Jinja→React swap)

## Tracking

Tasks lifted into the TZ-side roadmap. Reference:
- `docs/handoff/CANON_PACKAGE_TZ.md` §6 — 3-scenario consumption model
- `docs/handoff/SCREEN_INDEX.md` — per-screen prod ⇄ canon map
- `docs/handoff/VISUAL_COVERAGE.md` — live tracker of what's canon-import vs hand-rolled
- `CLAUDE.md` «Canon workflow» — rules for any future sessions
