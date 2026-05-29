# Canon swap plan — risky / deferred screens

> **Status as of PRs #152–#153 (canon 0.6.0 v3 refresh):** 10 landing
> visual sections + 2 demo pages (`/admin-demo`, `/customer-demo`)
> consume canon directly with drift = 0. **3 surfaces remain
> hand-rolled** because canon's variants are read-only / decorative and
> the surfaces have live behaviour we can't drop. Phase 6 (intake 3→2
> steps) shipped via canon 0.3.0 refresh — no longer a swap concern.
> This doc captures the path forward for each remaining surface, with
> the hybrid pattern that any future swap needs to follow.

## TL;DR risk table

| Surface | Canon variant | Live behaviour | Risk if swapped naively | Status |
|---|---|---|---|---|
| `Hero` | `HeroBlock` | URL paste → debounced preview → CTA → SubmitModal → POST /api/submit-application | **Signup conversion = 0** | ⛔ deferred until canon 0.7.x interactive variant (canon 0.6.0 still read-only) |
| `StickyHeader` | `StickyHeader` (canon 0.6.0) | Login link → `/login`, brand-mark → `/`, primary CTA opens SubmitModal | **Login + signup links break** | 🟢 mitigated via DOM-mutation pattern (`landing/components/SiteHeader.tsx::useEffect`) until canon restores `loginHref` / `homeHref` / `onMakeSiteClick` props |
| Admin chrome (10 screens) | `AdminLogin`, `AdminDashboard`, `AppsList`, …, `Settings` | password+TOTP, real fetch, session cookies, CSRF | **Founder locked out of admin** | ⛔ deferred until canon 0.7.x props-based variant |
| Intake (`SubmitModal`, `SourceDetectionBadge`, `LeadForm`, `FeedbackForm`) | `SubmitModal` (canon 0.3.0 controlled-API), … | POST /api/submit-application, captcha, polling, multipart upload, lead Fernet encryption | **Signup + lead intake broken** | 🟢 `SubmitModal` partially swapped via canon 0.3.0 controlled-API wrapper (PRs #135+). Remaining surfaces (`Confirmation`, `LeadForm`, `FeedbackPage`) — defer until canon ships interactive variants |
| Feedback modal (#9) | `S9_FeedbackModal` (canon 0.9.1 controlled) | vote-first modal: X/10 tally, sleeping contact, POST votes[] /api/feedback, captcha, 10-vote threshold | — | ✅ **resolved** — canon 0.9.1 shipped the controlled variant (`open`/`onOpenChange`/`tally`/`onSubmit`/`submitting`/`error`/`embedded`) per `CANON_FEEDBACK_INTERACTIVE_TZ.md`. Consumed via thin adapter `landing/components/FeedbackModal.tsx` mounted globally in `app/layout.tsx` (self-hides on `/admin*`+`/login`); backend votes/tally + migration 0012 live (PR3). `/feedback` page retired (301 → `/`), hand-rolled `FeedbackForm` deleted. |
| Customer-site Jinja → React-canon SSR | `CustomerSite` | rendered server-side per master into S3 at publish time | **Published customer-sites stop refreshing** | ⏸ feasible but ~3 days backend lift, not blocking |
| ~~Phase 6 — Intake 3→2 steps~~ | ~~n/a~~ | ~~live TG-source submissions still use 3-step + /api/tg-bot-personal-status polling~~ | — | ✅ resolved via canon 0.3.0 refresh — endpoints removed, flow restructured to link/photo branches |

## Pricing model — frontend 5-tier vs backend single-plan (canon 0.7.1)

> Supersedes the old «490 vs 990» note. Canon 0.7.1 dropped the
> single-plan «990 ₽ / для первой сотни 490 ₽ навсегда» model entirely
> and replaced it with a **5-tier `PricingMatrix`**.

Canon 0.7.1 landing now shows, consistently across Hero + `PricingMatrix`
+ `FinalCtaSection`:

| Plan | Price/mo |
|---|---|
| Старт | 0 ₽ (бесплатно навсегда) |
| Личный | 690 ₽ |
| Бизнес | 1 490 ₽ |
| Компания | 2 990 ₽ |
| Студия | 6 990 ₽ |

First month free on any paid plan, no card required. Vitrina's
hand-rolled `Hero.tsx` `CTA_MICROCOPY` is synced to this (PR vendoring
0.7.1).

**Backend reality:** ЮKassa is still configured single-plan at 99000
копеек (990 ₽) per `docs/runbooks/yookassa-pricing-update.md`. So the
**entire 5-tier model is frontend-only** — there is no backend that can
charge 690 / 1490 / 2990 / 6990, and no plan-selection flow. This is a
deliberate, documented gap: canon 0.7.1 ships landing copy + composition
only; per-plan billing is a backend task explicitly out of scope of the
canon release (CHANGELOG 0.7.1 §«Backend / data»).

**What this means operationally:**

- The landing advertises 4 paid tiers the billing system cannot yet
  enact. Until backend ships plan-aware ЮKassa products + a
  plan-selection step, any paid signup resolves to the single 990 ₽
  plan — founder reconciles manually.
- Treat the matrix as **marketing/positioning** until the backend epic
  lands. Do not wire the «Собрать сайт» CTA to a specific plan.

**Backend epic to close the gap (canon 0.7.1 §«Backend / data»):**

1. Per-site `preset: { themeId, familyId }` storage (varchar 32 each)
   + `PATCH /api/sites/{id}/preset`.
2. Plan-aware ЮKassa products (5 plans) + a plan field on `users`.
3. `/api/me/pricing` (or similar) returning the effective plan/price;
   then switch Hero microcopy + the matrix to server-rendered values
   instead of hard-coded canon strings.

**Preset persistence (also out of patch):** canon 0.7.1 introduces the
preset architecture (`@samosite/canon/presets`) but the consumer side
only renders the example carousel. Storing a customer's chosen preset
and re-rendering their `*.samosite.online` site through `PresetRenderer`
is the customer-SSR swap (see «Customer-site» surface above), unchanged
by 0.7.1.

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

### ✅ Phase 6 — Intake 3→2 steps (resolved via canon 0.3.0)

Done in canon 0.3.0 refresh (`packages/canon/CHANGELOG.md §0.3.0`). The
flow was restructured to two branches (link OR photo) instead of the
old 3-step (link → channel → bot-start). Endpoints
`/api/tg-bot-personal-status`, `/api/submit-application/finalize-via-email`,
`/api/applications/{id}/tg-bot-status` removed. Personal-bot
notification (`@SamositeBot /start`) deferred to post-approval email
flow per canon 0.3.0 «Breaking changes» section.

### StickyHeader href regression (canon 0.6.0)

Canon 0.6.0 **regressed** the prop interface — `loginHref`, `homeHref`,
`onMakeSiteClick` (all shipped in canon 0.4.0 + consumed in PR #140)
are gone. Canon 0.6.0 hard-codes:

  - brand-mark → `<a href="#hero">`  (we need `/`)
  - «Войти»    → `<a href="#login">` (we need `/login`)
  - primary CTA → `<a href="#hero">` (we need to open SubmitModal)

**Mitigation (in production now):** `landing/components/SiteHeader.tsx`
runs a `useEffect` after mount that walks `.ss-sticky-header` DOM,
overrides the broken hrefs, and binds a `click` delegation handler on
the primary CTA. A scoped `MutationObserver` re-applies the fix when
canon re-renders (mobile-toggle, hover, etc.). Same pattern as the
`SubmitModal` × close-button workaround (PR #146).

**Future swap:** when canon 0.7.x restores `loginHref` / `homeHref` /
`onMakeSiteClick` props, delete the `useEffect` block in
`SiteHeader.tsx` and pass props directly. Document this as the
deprecation trigger when watching canon CHANGELOG diffs.

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
