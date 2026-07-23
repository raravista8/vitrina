# Landing (Next.js 16 + Tailwind + @samosite/canon consumer)

> Reads root `CLAUDE.md` first. This file is the **authoritative source** for the pixel-perfect protocol and the canon-consumer rules.

## Stack

- Next.js 16 (App Router, Turbopack default)
- React 19 + TypeScript strict
- Tailwind 3.4 (extended via `@samosite/canon` styles)
- `@samosite/canon` — vendored UI source of truth (workspace `file:` dep at `../packages/canon/`)
- **Playwright 1.60 + pixelmatch 7 + pngjs 7** — pixel-diff stack already installed
- Vitest 4 — unit tests for hooks/utilities
- Radix primitives, react-hook-form + zod, lucide-react, recharts

## Canon = UI source of truth

**Prod imports canon directly = drift is mathematically impossible.** Per `docs/handoff/CANON_PACKAGE_TZ.md` (Variant C).

### Currently consuming canon (drift = 0)

Per `docs/handoff/VISUAL_COVERAGE.md` and `landing/app/page.tsx`:

- `landing/app/page.tsx` — 10 sections via `<ResponsiveCanonSection>` (canon 0.11.0 vendored — 0.10.0+0.11.0 are intake-only additive (instant-preview rev.1+rev.2 exports: S3_StepNiche/S3_StepSource/S3_StepBuilding/S3_StepPreview, NICHE_LIB, PreviewDraft; opt-in via SubmitModal `preview`/`entry` props, UNCONSUMED on prod — intake behaves as 0.9.5); landing sections still 0.9.5 v3 narrative — 0.9.5 fixes `S9_FeedbackModal` remount (Dialog/FauxPage/FloatingBtn invoked as functions, not mounted — was killing scroll/focus on every keystroke; API unchanged, drift=0). 0.9.4 was a version-sync re-issue of 0.9.3 (canon-team npm-collision fix); our 0.9.3 vendor already shipped the landing fixes. section markup unchanged since 0.8.0; 0.9.x touches only: customer `S9_FeedbackModal` (0.9.1 = controlled API: `open`/`onOpenChange`/`tally`/`onSubmit`/`embedded`; 0.9.5 = remount fix) + `src/presets` (0.9.2 = Examples previews grew 460→720px, multi-block — drift=0, auto-applied since `ExamplesSection` renders `MiniChrome` without an explicit `height`) + `StickyHeader`/`HeroBlock` (0.9.3 = nav hover unified, `.ss-login-link` **dropped** → all `.ss-nav-link` with `!important` for export-resilience; HeroBlock абзац-2 `text-wrap` pretty→balance — drift=0. Consumer `SiteHeader.tsx` repoints «Войти» by `a[href="#login"]`, not the removed class). Fixed order: Examples → Cycle → Monday → BaseWork → Sources → Analytics → Ownership → Pricing → FAQ → FinalCta — Analytics sits ABOVE Ownership, which canon 0.8.0 now bakes in too), each renders BOTH mobile and desktop variants, CSS media query picks one. canon 0.8.0: `ExamplesSection` is a fixed-height (460px) preview **carousel** (`ExamplesCarousel`) + the `HowItPicks` «Дизайн собирается из ваших материалов» block; `PricingSection` is the 5-tier `PricingMatrix`; `BaseWorkSection`/`OwnershipSection` re-laid-out (editorial cards / 2×2 mini-controls). The `@samosite/canon/presets` module (`PresetRenderer`, `MiniChrome` with `height` prop, 5 families × 16 themes) is bundled into the landing chunk via canon's internal `../presets` import — we don't import `@samosite/canon/presets` directly (no prod consumer yet)
- `landing/components/Hero.tsx` (hand-rolled) imports `ChipStrip` from `@samosite/canon/landing` (canon 0.7.2 standalone export) for the «СОБИРАЕМ ИЗ» source-chip strip — dual-rendered (sm: toggle) for responsive parity. This is the canon-sanctioned way to reuse a Hero sub-block without transcribing JSX. Hero copy (абзацы 1/2) is hand-mirrored to canon 0.7.2 HeroBlock; see `docs/handoff/DESIGN_SPEC.md` for the per-component spec + the 7-point prod-conformance checklist
- `landing/app/layout.tsx` — `<CanonStyles />` mounted in `<body>`; `<FeedbackModal />` mounted globally (self-hides on `/admin*` + `/login`)
- `landing/components/FeedbackModal.tsx` — adapter around canon `FeedbackV2Modal`+`FeedbackV2Fab` (canon 0.13.0 «Фидбек v2», vote-first S9 удалён): режим blocker (авто-триггер exit-intent/скролл-60%, 1 раз на посетителя, `ss_fb2_blocker_shown`) + режим question (FAB «Задать вопрос»); сабмит → `POST /api/feedback/v2` (+SmartCaptcha), Метрика `feedback_open{trigger}`/`feedback_reason`/`feedback_contact_left`/`feedback_question_sent`. Легаси-входы `samosite:open-feedback`/`data-ss-feedback` открывают режим question. `GET /api/feedback/tally` больше не зовётся (votes-бэк ретайрнут, июль 2026 — исторические таблицы 0012 read-only)
- `landing/app/admin-demo/page.tsx` — `<ClientAdminDemo />` drop-in (PR #122)
- `landing/app/customer-demo/page.tsx` — customer-site palette preview through canon (PR #124)

### Still hand-rolled (intentional, justified)

- **`Hero`** (`landing/components/Hero.tsx`) — canon's `HeroBlock` is read-only (input is `<span>` placeholder, CTA is `<a href="#hero">`). Replacing breaks the entire signup conversion funnel (paste URL → debounced live preview → SubmitModal wizard → POST `/api/submit-application`). Stays hand-rolled until canon ships interactive variant (canon 0.2.x).
- **`Footer`** (`landing/components/Footer.tsx`) — canon doesn't export standalone (inlined in `<SamosaytLanding>`). Already matches canon's slim footer pattern; canon-side extraction pending.
- **`SubmitModal`** — canon 0.3.0 controlled-API wrapper around `@samosite/canon/intake::SubmitModal`. Owns state (mode='link'|'photo', step 1-4) + backend wiring. Renders canon's step components for the actual UI.
- **`SourceDetectionBadge`**, **`ApplicationForm`** — interactive, same compromise as Hero.
- ~~`PhotoDrawer`~~ — deleted in 0.3.0; absorbed into `SubmitModal` mode='photo' (Step 1 photos + Step 2 description+files).

**Update these two lists in the same commit when migrating a component.**

---

## UI implementation protocol

### Task size

One screen = one task = one PR. "Migrate the landing" is 13 tasks, not one.

If a request sounds like "do all of X", STOP and ask to break it down into a screen list from `docs/handoff/SCREEN_INDEX.md`.

### Three anchors per UI task

Don't start without all three:

1. **Source** — which canon entry (`@samosite/canon/<entry>`) or which `canon-source/*.jsx` is the reference
2. **Destination** — which prod file, which component is replaced, which line range
3. **Acceptance** — pixel-diff baselines that must pass + selectors needed to scope screenshots

### Migration protocol (hand-rolled → canon import)

1. `grep -r` all usages of the old component across the repo
2. Swap the import to the canon entry
3. Mark the old file `@deprecated` (JSDoc at top); **do NOT delete** in the same PR
4. Verify on prod route: `npm run dev` → open route → confirm new component in DOM via `data-section` attribute
5. Add/keep `data-section="<id>"` wrapper so the visual spec can target it
6. Update `docs/handoff/VISUAL_COVERAGE.md`: move row from 🟡/🟢 (hand-rolled) to 🔵 (canon-import, drift=0 by construction)
7. Move the component name from "Still hand-rolled" → "Currently consuming canon" list above — **same commit**

### STOP and ask if

- Canon doesn't export the needed component (see "Still hand-rolled" list)
- Spec and canon JSX contradict each other
- Canon has a state/variant the spec doesn't mention (or vice versa)
- A design token needed isn't in `@samosite/canon/tokens`
- Unclear whether the task replaces an existing component or adds new
- Pixel-diff fails and the cause isn't obvious from `__diff/` PNG

---

## Pixel-perfect testing protocol

> **The infrastructure already exists.** Don't recreate it. This section documents how to USE it correctly.

### Where things live

```
landing/
├── playwright.config.ts                      # 4 chromium projects: 1440 / 768 / 390 / 375
├── tests/visual/
│   ├── landing.spec.ts                       # main landing visual spec
│   ├── utils/
│   │   ├── diff.ts                           # pixelmatch wrapper, 2% threshold, writes __diff/
│   │   ├── sections.ts                       # LANDING_SECTIONS array + baselinePath()
│   │   └── (no stabilize.ts yet — needed; see "Gap" below)
│   ├── canon-source/                         # canon JSX + _visual-host.html for baselines
│   ├── baselines/                            # *.png — COMMITTED reference images
│   └── __diff/                               # *.png — diff output on failure (gitignored)
└── ...

infra/scripts/
└── generate-canon-baselines.sh               # http-server + tsx → regenerates baselines/
```

### Commands (npm scripts already in `landing/package.json`)

| Command                      | What it does                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `npm run test:visual`        | Playwright pixel-diff suite against committed baselines                                   |
| `npm run test:visual:update` | Run `infra/scripts/generate-canon-baselines.sh` — regenerates baselines from canon-source |

**`npm run test:visual:update` overwrites committed PNGs.** Only run when canon has intentionally changed. The PNG churn in `git status` IS the diff to review.

### Rules

**Viewports (from `playwright.config.ts`):**

- `chromium-desktop-1440` — 1440 × 900 (desktop)
- `chromium-tablet-768` — 768 × 1024 (tablet)
- `chromium-mobile-390` — 390 × 844 (iPhone 12-15 Pro standard, typical modern iPhone)
- `chromium-mobile-375` — 375 × 812 (iPhone SE / mini / Reachability mode, narrow safety net)

Why two mobile widths: 390 reflects what most mobile visitors actually see. 375 is the **minimum safe width** — if the layout survives 375, it survives ≥ 375 everywhere. 375 catches long Russian button labels truncating, fixed-width canon cards refusing to wrap, hero H1 line-break splits going wrong.

Baseline filenames use width as suffix: `<section>-1440.png`, `<section>-768.png`, `<section>-390.png`, `<section>-375.png`. Project name convention is `chromium-<role>-<width>` — the spec's `viewportNameFromProject()` extracts the width directly, so adding a future viewport = add a project in `playwright.config.ts`, no spec edit needed.

**Threshold:** `pct ≤ 0.02` (2% pixel difference). Asserted by `utils/diff.ts`. Don't change this without an ADR — looser hides regressions, stricter trips on font antialiasing.

**Pixelmatch `threshold`:** 0.1 (per-pixel sensitivity, default in `utils/diff.ts`). Lower = stricter on antialiasing.

**No retries:** `retries: 0` in `playwright.config.ts`. A flake here is a real layout shift (font race, late image load), not noise to hide. If a test flakes, find the cause and fix stabilization.

**Animations:** suppressed via `--force-prefers-reduced-motion` in `launchOptions`. If you add a new animation, verify it respects `prefers-reduced-motion: reduce` or it will flake.

### Required prod-side instrumentation

Every section/screen renders inside a `data-section="<id>"` wrapper:

```tsx
<div data-section="examples">{/* canon component or hand-rolled markup */}</div>
```

For hand-rolled components like `Hero` and `Footer`, the `data-section` lives on the root element of the component itself (not a wrapper).

The `LANDING_SECTIONS` array in `tests/visual/utils/sections.ts` maps `id` → baseline file name. **Adding a new section requires** adding to this array + adding a baseline PNG.

### Workflow for "implement screen X"

```
1. Read docs/handoff/SCREEN_INDEX.md → find screen X row → get canon entry + prod path
2. Read docs/handoff/specs/<area>.md (per-area spec)
3. Read canon source (packages/canon/src/<screen>.jsx or canon-source/<screen>.jsx)
4. Plan the change (Step 2 of /implement-screen slash command)
5. Implement on prod route in landing/
6. Eyeball: npm run dev → open route → check
7. npm run test:visual -- -g "<screen-id>" (run just this screen across all 4 viewports)
8. If fails:
   a. Open landing/tests/visual/__diff/<screen-id>-<viewport>.png
   b. Identify cause (padding? font-weight? wrong token?)
   c. Fix IMPLEMENTATION (not the baseline)
   d. Go to step 7
9. If passes: update VISUAL_COVERAGE.md, open PR
```

### Why baselines fail interpretation

When pixel-diff fails, the root cause is usually one of:

| Symptom in `__diff/*.png`      | Likely cause                                            | Fix                                                                         |
| ------------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Solid red box around text      | Font not loaded → fallback used → metrics shifted       | Ensure self-hosted font loaded before screenshot (see Gap below)            |
| Diagonal stripes through cards | Hover-lift animation captured mid-transition            | Check `--force-prefers-reduced-motion` is applied and animations respect it |
| Whole-section offset by ~20px  | Layout shift from late image hydration                  | Wait for all `<img>` to decode before screenshot                            |
| Random text antialiasing diff  | Anti-aliasing variation (different DPR or font hinting) | Verify `deviceScaleFactor: 1`, fonts are self-hosted                        |
| Dimension mismatch error       | Section grew/shrank — structural regression             | Real bug — fix layout, don't regenerate baseline                            |

### Gap: `stabilize()` helper

`landing/tests/visual/utils/stabilize.ts` **does not exist yet** and should be added. Without it, every spec re-implements its own waits, and Hero @ 768/390 is stuck at 🟡 (smoke-only) because animation/font races aren't deterministic.

Minimum stabilize() must do:

1. Freeze `Date.now()` to a fixed timestamp (for any time-dependent UI)
2. Wait for `document.fonts.ready` (self-hosted Onest + JetBrains Mono must be loaded)
3. Wait for all `<img>` to finish decoding
4. CSS injection: `animation-duration: 0s`, `transition-duration: 0s`, `scroll-behavior: auto`
5. `await page.waitForLoadState('networkidle')` + 100ms settle

Add as `landing/tests/visual/utils/stabilize.ts`. Call from every spec before screenshot. Updating Hero @ 768/390 to 🟢 in `VISUAL_COVERAGE.md` requires this helper to ship first.

---

## Hard rules around canon (landing-specific, in addition to root)

- NEVER transcribe canon JSX into hand-rolled Tailwind. If a section needs to be on prod, import from `@samosite/canon/<entry>`. If it doesn't exist in canon yet, file an issue with Claude Design.
- NEVER drop `--install-links` from `npm ci` (`landing/Dockerfile`, `.github/actions/setup-landing/action.yml`, `.github/workflows/visual-regression.yml`). Turbopack/Vite can't follow `file:` symlinks for peer-dep resolution.
- ALWAYS keep `transpilePackages: ['@samosite/canon']` in `landing/next.config.mjs`.
- ALWAYS mount `<CanonStyles />` ONCE in `landing/app/layout.tsx`.
- WHEN swapping a canon section back to hand-rolled (e.g. bundle size, A/B copy): gate the swap on pixel-diff against the canon component (see `docs/handoff/CANON_PACKAGE_TZ.md §6` Scenario 2).
- WHEN replacing hand-rolled with canon import: run the migration protocol above. Never leave orphan imports.
- WHEN canon doesn't export needed component: DO NOT transcribe. STOP and ask, or log as known gap in `packages/canon/CHANGELOG.md`.
- AFTER any UI change: `npm run test:visual` must pass for affected screens, or deviations explicitly documented in PR.

## Canon refresh procedure (when Claude Design ships a new version)

Documented in `docs/handoff/CANON_PACKAGE_TZ.md`. Short version:

1. Replace `packages/canon/{src,README.md,CHANGELOG.md,package.json,…}` wholesale.
2. `cd packages/canon && npm i && npm run build` (regenerates `dist/`).
3. `cd landing && npm install --install-links file:../packages/canon` (force-copy, not symlink).
4. `npm run build` from `landing/` to verify nothing broke.
5. `npm run test:visual:update` to regenerate baselines from new canon.
6. **Manually review baseline PNG diff** in PR — confirm changes are intentional design updates, not regressions.
7. Commit (`dist/` is committed; pre-commit hooks exempt `packages/canon/dist/` from whitespace normalization).

## Definition of Done (UI-specific)

ALL must pass before declaring done:

- [ ] Build clean (`npm run build` succeeds)
- [ ] `npm run lint` green
- [ ] `npm run typecheck` green
- [ ] `npm run test:visual` passes for affected screens at all 4 viewports
- [ ] New component visible on prod route (Playwright MCP screenshot in PR)
- [ ] If migration: old component `@deprecated`, no active imports
- [ ] Component lists in this file updated (moved between "consuming" and "hand-rolled")
- [ ] `docs/handoff/VISUAL_COVERAGE.md` updated for affected rows

## Visual verification tools (Playwright MCP for interactive use)

If not installed: `claude mcp add playwright npx @playwright/mcp@latest`.

**Use during development for:**

- Open prod route, screenshot, eyeball vs canon before committing
- Verify new component rendered after migration (find `data-section` in DOM)
- Reproduce UI bug reports
- Sanity-check responsive breakpoints

**Don't use for:**

- Auto-fixing UI — verification only
- Bypassing `npm run test:visual` — MCP is interactive convenience, the npm script is the gate

## Reference

- `docs/handoff/SCREEN_INDEX.md` — 19 canonical screens (canon JSX ⇄ prod TSX)
- `docs/handoff/VISUAL_COVERAGE.md` — live tracker per-viewport
- `docs/handoff/CANON_PACKAGE_TZ.md` — canon package spec
- `docs/handoff/CANON_SWAP_PLAN.md` — migration roadmap
- `docs/handoff/specs/01_landing.md` … `06_public_screens.md` — per-area specs
- `packages/canon/CHANGELOG.md` — known gaps, recent canon releases
- `packages/canon/CLAUDE.md` — rules when working ON canon (not consuming it)
- `landing/playwright.config.ts` — viewport definitions, threshold, retry policy
- `landing/tests/visual/utils/diff.ts` — pixelmatch wrapper, threshold tuning
- `infra/scripts/generate-canon-baselines.sh` — baseline regeneration entrypoint
