# Changelog

> **Known gaps (consumer-side workarounds active in vitrina):**
>
> - **`canon-gap-0903-dashboard-pending`** — `S11_Dashboard`'s
>   "QUICK · ТОП-5 PENDING" card hard-codes 5 mock rows (`#A-1842
>   studia-anna · 47 постов`, …) inline in JSX. It exposes **no prop**
>   for them and ignores `data` (only the KPI tiles + 14-day chart read
>   `data`), so prod always shows fake pending applications. Worked
>   around in `landing/components/admin/DashboardPendingPanel.tsx`
>   (hides the mock card, portals a real list from `GET
>   /admin/api/apps?status=pending` built from canon primitives).
>   **Fix wanted:** an interactive `S11_Dashboard` with a `pending`
>   prop (or `data.pending_preview: [{ id, source_type, label, ago }]`)
>   — same controlled pattern as the other admin screens (0.2.x).
>   Remove the consumer workaround once shipped.

## 0.9.4 — Переиздание landing-фиксов (коллизия версий 0.9.3) · 2026-05-29

> **PATCH.** Идентичен 0.9.3 по коду, но с уникальным номером версии. На прод под номером `0.9.3` уехал пакет БЕЗ landing-фиксов (StickyHeader/HeroBlock) — версию бампнули, а изменения `src/landing/index.tsx` в сборку не попали (признак: `description` в том пакете остался 0.9.2-шным). Из-за совпадения номера версии CI считал «изменений нет» и не пересобирал. 0.9.4 ломает коллизию — гарантированно подхватывается пайплайном.

### Что входит (то, что должно было приехать в 0.9.3)

**`StickyHeader`**
- Единый класс `ss-nav-link` для всех пунктов, включая «Войти» (класс `ss-login-link` удалён). Hover одинаковый: текст → `ink` + мягкая фоновая пилюля `bgSoft`, `border-radius: 999px`, паддинг `6px 12px`.
- Hover-правила с `!important` (`color`, `background`) — переживают инлайновые вычисленные стили, которые запекает экспортер артборда.

**`HeroBlock`**
- Второй абзац подзаголовка переведён на `text-wrap: balance` — убран висячий «новых заявок» на отдельной последней строке.

### Migration

```bash
npm i @samosite/canon@0.9.4
npm run build   # дальше обычный деплой
```

Drop-in. Никаких правок пропсов/импортов. **Важно:** убедись, что в `node_modules/@samosite/canon/package.json` после установки `version: 0.9.4` и `description` упоминает StickyHeader/HeroBlock — это маркер, что подхватился правильный пакет (именно его отсутствие выдало проблему в 0.9.3).

### Vitrina-side (this vendoring PR)

**Version-sync only — zero code/dist delta on our side.** The collision
0.9.4 fixes was on the canon team's *npm-publish* pipeline (their published
`0.9.3` tarball shipped without the landing fixes). We don't consume from
their registry — we vendor `src/` directly, and our 0.9.3 vendor (PR #178,
prod `/version` 541efe3) **already carried the real fixes**, verified at the
byte level: `ss-nav-link`=7 / `ss-login-link`=0 / `textWrap: 'balance'` /
`!important` hover, and confirmed live (served HTML has `ss-nav-link`×9,
zero `ss-login-link`).

Diffed all 17 `src/` files of the 0.9.4 tarball against our vendored
0.9.3 → **byte-identical**. So this PR only bumps `package.json`
0.9.3→0.9.4 + description + this CHANGELOG entry, to stay in lockstep with
the canon team's canonical version number. `dist` rebuilds byte-identical
(no src change), `tsup.config.ts` keeps the local `dts:false`. **No
redeploy needed** — the landing bundle prod already serves is unchanged.

---

## 0.9.3 — StickyHeader: единый hover + экспорт-устойчивость · HeroBlock: orphan-fix · 2026-05-29

> **PATCH.** Только `src/landing/index.tsx` (`StickyHeader` + `HeroBlock`). Публичные экспорты, типы, пропсы и разметка без изменений. Меняются CSS-ховеры навигации и `text-wrap` второго абзаца героя. Drop-in на прод.

### Зачем

Две проблемы в шапке:
1. **Разный hover у пунктов меню.** У «Примеры / Цена / Помощь» при наведении менялся только цвет, а у «Войти» — цвет **и** фон. Выглядело несогласованно.
2. **Hover не переживал экспорт артборда.** Экспорт canvas-артборда (`dcExport` → Download HTML/PNG) запекает вычисленные стили инлайном в каждый элемент. Инлайновый `color`/`background` по специфичности побеждает правило `.ss-nav-link:hover { … }` из `<style>`, поэтому в выгруженном файле наведение не работало.

### Что изменилось — `StickyHeader`

- **Единый класс `ss-nav-link` для всех пунктов**, включая «Войти». Класс `ss-login-link` удалён — «Войти» теперь использует тот же hover, что и остальные пункты (затемнение текста до `ink` + мягкая фоновая пилюля `bgSoft`, `border-radius: 999px`).
- **Hover-правила с `!important`** (`color` и `background`) — чтобы наведение перебивало инлайновые вычисленные стили, которые запекает экспортер. Теперь hover корректно работает и в живом превью, и в выгруженном HTML.
- Паддинг пунктов выровнен: `6px 12px` на всех (раньше у nav-ссылок было `6px 2px`, у «Войти» — `8px 16px`); inline-`padding` у «Войти» убран.

### Что изменилось — `HeroBlock`

- Второй абзац подзаголовка («Самосайт соберёт сайт…») переведён с `text-wrap: pretty` на **`text-wrap: balance`** — раньше фрагмент «новых заявок» висел сиротой на отдельной последней строке. Теперь строки выравниваются по длине, висячий хвост убран. Текст и стили не меняются.

### Визуальные дельты

Шапка — фоновая пилюля при наведении теперь появляется у всех пунктов одинаково. Геометрия ряда и высоты артбордов не меняются. Токены без изменений.

### Migration

```bash
npm i @samosite/canon@0.9.3
npm run build
```

Drop-in over 0.9.2. Никаких правок пропсов/импортов. Если где-то в форке встречается селектор `.ss-login-link` — он больше не используется в каноне (замените на `.ss-nav-link`).

### Vitrina-side (this vendoring PR)

`cp src/landing/index.tsx` + package.json 0.9.2→0.9.3 + dist rebuild
(landing + index chunks; presets is bundled into landing so its chunk is
re-emitted too). tsup keeps the local `dts: false` carry-forward.

**Consumer reconciliation (`landing/components/SiteHeader.tsx`).** Our
DOM-mutation wrapper repoints «Войти» → `/login` post-render. It keyed off
`a.ss-login-link`, which 0.9.3 **removed** (every nav item now shares
`.ss-nav-link`). Switched the selector to `a[href="#login"]` — a stable,
unique hook (only «Войти» uses `#login`, unchanged across 0.9.x) that
won't also grab Примеры/Цена/Помощь. The `.ss-sticky-header` host hook and
the `a[href="#hero"]` brand/CTA logic are untouched by 0.9.3 and keep
working. Landing markup, exports and props are otherwise unchanged — pure
canon-import, drift = 0.

---

## 0.9.2 — Examples previews → full multi-block sites · 2026-05-29

> **PATCH.** Only `src/presets/index.tsx`. Public exports, types and API
> unchanged (`PresetRenderer`, `MiniChrome`, `samplePresets`, the 5
> families). Internal preview composition changes + one fixture photo.
> Landing/prod pick it up automatically — `ExamplesSection` renders
> `MiniChrome` without an explicit `height`, so the new default applies on
> its own. **drift = 0 on our side** (pure canon-import; no consumer hardcodes
> `height={460}` and we don't import `@samosite/canon/presets` directly).

### `MiniChrome`

- Default `height` raised **460 → 720px**. The prop stays (override per-call),
  but every default consumer gets taller previews with no code change.

### 5 families (editorial / bento / display / split / stacked)

Each rewritten from a one-screen «hero» into a **full multi-block page**,
using already-existing-but-unused content slots (`stats`, `menu.items`,
`quote`): price lists with leader dots, stat strips, pull-quote reviews,
dark footer-CTAs. All families now lay out via `flex` with `flex: 1 1 auto`
on the photo block (photo takes the remaining height — sections fill 720px
with no gaps). `menu` access made null-safe (`mn?.items`).

### Fixtures

- `brows-sochi` (display family): swapped a portrait photo that cropped badly
  in the wide display strip for a studio-interior shot; caption
  «ламинирование» → «студия». `gallery` unchanged.

### Visual deltas (canvas baselines need regen)

Examples carousel cards grew ~260px taller (block 02). Desktop artboard
11 900 → 12 300px, mobile 15 200 → 15 600px. Tokens unchanged. Our landing
visual suite is smoke-only (not enforced), so no baseline regen blocks this.

### Vitrina-side (this vendoring PR)

`cp src/presets/index.tsx` + package.json 0.9.1→0.9.2 + dist rebuild (presets
+ landing + index chunks — presets is bundled into landing via the internal
`../presets` import). tsup keeps the local `dts: false`. No consumer change.

---

## 0.9.1 — Feedback #9 → controlled API · 2026-05-29

> **MINOR.** `S9_FeedbackModal` goes from a presentational canvas artboard
> to a **controlled component with props** — drop-in for prod (same pattern
> as `SubmitModal` 0.3.0 / admin 0.2.x). 0.9.0 visual/copy unchanged. A
> zero-prop call stays a canvas mock (back-compat). Closes the gap filed in
> `docs/handoff/CANON_FEEDBACK_INTERACTIVE_TZ.md` (canon-gap-0900-feedback).

### Feedback (#9) — `src/customer/index.tsx`

- **Controlled API.** New props: `open` / `onOpenChange` (controlled; else
  internal state), `tally` (`{ items, total_week }` from
  `GET /api/feedback/tally`), `onSubmit(payload)`, `submitting`, `error`,
  `embedded`. Signature is now `S9_FeedbackModal(props: S9_FeedbackModalProps)`.
- **`embedded` branch.** `false` (prod): **no FauxPage**, overlay
  `position: fixed` to the viewport, high z-index — a real global modal.
  `true` (canvas): FauxPage + `position: absolute` (the 0.9.0 artboard).
  Default is derived — canvas mode only on a zero-prop / uncontrolled mount,
  so `<S9_FeedbackModal />` stays pixel-identical.
- **`tally` injection.** `X/10` bars + «за неделю» read from
  `tally.items` / `tally.total_week`; the optimistic `+1` on tick is kept;
  falls back to baked `base` if `tally` is omitted.
- **`onSubmit`.** Receives `{ votes[], own_source, own_feature, message,
  name, contact }`; thank-you shows after it resolves; on reject the modal
  stays open, `error` renders inline, `submitting` spins the button. No
  network inside the component — captcha + POST live on the consumer.
- **Floating button** stays internal; in controlled mode its click
  delegates to `onOpenChange(true)`. Backdrop click closes.
- **TS types exported:** `S9_FeedbackModalProps`, `FbTally`, `FbVote`,
  `FbSubmitPayload`, `FbKind` (barrel `export * from './customer'`).
- **Unchanged:** export paths (`S9_FeedbackModal` + aliases
  `S9_FeedbackPage` / `FeedbackPage`), selectors `[data-feedback-modal]` /
  `[data-floating-feedback-btn]`, the 0.9.0 mobile layout.

### Re-cut note

The first 0.9.1 zip shipped 0.9.0 `src/customer/index.tsx` by accident (a
recursive 0.9.0→0.9.1 copy clobbered the fresh file in the archive only —
the working source was correct). Flagged by vitrina; this re-cut carries the
real controlled source. Verified on vendor: `grep -c onOpenChange
src/customer/index.tsx` > 0, the 5 types resolve, zero-prop still renders
the artboard.

### Vitrina-side (this vendoring PR)

`cp src/customer/index.tsx` + package.json 0.9.0→0.9.1 + dist rebuild
(customer + index-barrel chunks). tsup keeps the local `dts: false`
carry-forward. The consumer swap (mount globally + retire `/feedback`) is a
follow-up PR — the modal stays unconsumed here, so prod behaviour is
unchanged and drift = 0. No other module touched.

---

## 0.9.0 — Feedback #9 → vote-first modal · 2026-05-29

> **MINOR.** Over 0.8.0. Screen #9 (feedback) moves from a standalone
> `/feedback` page to a **modal over any page** (ADR-0009 rev.2). Behaviour
> and the `/api/feedback` contract change — see
> `docs/handoff/FEEDBACK_BACKEND.md`. Public landing exports
> (`SamosaytLandingV3`, all section components) are **unchanged**; only the
> `customer` module gains an export. This is the canon-vendor step (PR1 of
> a 3-PR rollout); the consumer-side modal swap + backend votes/tally land
> in follow-up PRs.

### Feedback (#9) — `src/customer/index.tsx`

- Was `S9_FeedbackPage` (standalone page: contact on top, then checkboxes)
  → now `S9_FeedbackModal` (modal). **New export `S9_FeedbackModal`** on the
  `@samosite/canon/customer` entry; `S9_FeedbackPage` and `FeedbackPage` are
  kept as **aliases that now resolve to the modal** (`const S9_FeedbackPage =
  S9_FeedbackModal`, `const FeedbackPage = S9_FeedbackModal`). There is no
  bare `FeedbackModal` export — use `S9_FeedbackModal`.
- **Vote-first / «foot in the door»:** the form opens straight into voting;
  the contact block is asleep (`opacity .5`, `pointer-events:none`) until at
  least one item is ticked, then «wakes up» with «напишем, когда добавим» +
  privacy promise.
- **Vote counters:** every item has a progress bar + `X/10`; ticking a box
  bumps +1 live; a running «за неделю» counter in the header.
- Lighter form: «+ свой вариант» / «+ комментарий» hidden behind links
  (progressive disclosure); duplicate subheading removed.
- Submit button counts votes («Отправить N голос/голоса/голосов») +
  thank-you screen.
- **Mobile:** `mobile` prop — fullscreen modal, single-column contact,
  full-width progress under each item, full-width button.
- **Selectors:** `[data-feedback-modal]`, `[data-floating-feedback-btn]`.

### Component shape (consumer note)

`S9_FeedbackModal({ mobile })` is **presentational — actually a canvas
artboard**, not a mountable component: `open` defaults to `true`, it renders a
blurred `FauxPage` mock behind itself, the overlay is `position:absolute`
(scoped to its container, not viewport-fixed), it has no
`open`/`tally`/`onSubmit` props, submit just sets local `submitted=true` (no
network), and the sub-primitives (`FBVoteRow`/`FBField`/…) aren't exported.
**It cannot be dropped onto a real page** (would show a fake skeleton behind a
scrim, open-on-load, submitting nothing).

> **KNOWN GAP (canon-gap-0900-feedback):** an **interactive variant** is
> requested — `open`/`onOpenChange`/`tally`/`onSubmit` props + an `embedded`
> flag that drops `FauxPage` and switches the overlay to `position:fixed`.
> Same pattern that unblocked `SubmitModal` (canon 0.3.0) and admin (0.2.x).
> Full prop contract + acceptance: **`docs/handoff/CANON_FEEDBACK_INTERACTIVE_TZ.md`**.
> Until it ships, vitrina prod keeps the hand-rolled `/feedback` page (PR2 is
> deferred); the backend votes/tally (PR3) is independent and proceeds now.

### Backend (out of package — `docs/handoff/FEEDBACK_BACKEND.md`)

New `GET /api/feedback/tally`, `POST /api/feedback` takes a `votes[]` batch,
`feedback_submission` + `feedback_vote` schema, dedupe/per-IP-cap, 10-vote
threshold → founder alert, admin-inbox rollup. Landing in PR3.

### Vitrina-side follow-through (this vendoring PR)

- `src/landing/index.tsx` — upstream 0.9.0 **absorbed the 0.8.0 converter
  fix** (the leaked IIFE opener + self-referential `const PresetRenderer =
  PresetRenderer;` are gone at source). Vendored as-is; functionally
  identical to our repaired 0.8.0 (only our `[vitrina]` repair comments are
  replaced by upstream's clean version — the built landing chunk is
  byte-identical). No consumer reconciliation needed.
- `tsup.config.ts` keeps the local `dts: false` carry-forward + the
  `src/presets/index.tsx` entry. Dist rebuilt (customer chunk changes;
  landing/presets chunks unchanged).
- No prod behaviour change in this PR — the modal export is **unconsumed**
  until PR2; landing renders the same 10 canon sections, drift = 0.

### No other module changed

`tokens` / `primitives` / `intake` / `admin-*` / `auth` / `source` /
`presets` are byte-identical to 0.8.0.

---

## 0.8.0 — Examples carousel + pricing matrix + block redesign · 2026-05-28

> **MINOR.** Over 0.7.2/0.7.3. Public landing exports unchanged
> (`SamosaytLandingV3`, `_Desktop`/`_Mobile`, all section components
> still resolve). Internal markup of several blocks changed, copy
> reworked, and the **pricing model** finalised (the 490/990 pre-launch
> card → a full 5-tier matrix). Pure canon-import on our side — every
> changed block (`ExamplesSection`, `PricingSection`, `BaseWorkSection`,
> `OwnershipSection`, `SourcesSection`, `StickyHeader`) is rendered via
> `ResponsiveCanonSection` / `SiteHeader` in `app/page.tsx`, so **drift =
> 0 by construction**. No hand-rolled reconciliation needed beyond the
> existing DOM-mutation wrappers (which keep working — see «Vitrina
> side» below).

### Examples (block 02) — redesign

- Client-site previews rewritten as **compact, fixed-height (460px)**
  expressive «heroes»; `MiniChrome` now takes a `height` prop. All 5
  families (editorial / bento / display / split / stacked) are distinct
  compositions filling the fixed height (no more «full-page» strips).
- `ExamplesSection` renders the previews in a **horizontal carousel**
  (`ExamplesCarousel`: arrows + dots + edge-fades, scroll-snap; 3 visible
  on desktop, 94%-width peek on mobile).
- New `HowItPicks` block «Дизайн собирается из ваших материалов» — 3
  extraction cards (photo → derived palette + niche font sample) + a strip
  of 4 mechanics. Centred title with an accent contrast phrase, 30/800.

### Pricing (block 09) — full matrix

- The single 490 ₽ pre-launch card is replaced by `PricingMatrix`: 5
  plans (Старт 0 / Личный 690 / Бизнес 1 490 / Компания 2 990 / Студия
  6 990 ₽), ~40 rows in 7 groups, price-band header, «Бизнес» highlight
  (`PLAN_HILITE`), zebra rows, per-column CTA, fair-use footnote.
- **Pricing reality unchanged:** still a FRONT-END model. ЮKassa stays
  single-plan 990 ₽ — see `docs/handoff/CANON_SWAP_PLAN.md` §«Pricing
  model».

### BaseWork (block 05) — restraint

- Cards re-laid-out: the blurred colour header + large «floating» numeral
  are gone → clean editorial cards (icon-tile + heading + body + footer
  metric over a hairline). Copy «Готов к поиску», «ботов в заявках»,
  «Месячный трафик» (carried from 0.7.3).

### Ownership («Вы — главный»)

- Moved **below Analytics** (order: …Sources → Analytics → Ownership →
  Pricing) — which is the order vitrina already shipped (#164), now baked
  into canon.
- The «Демо ЛК» link is removed from this block (kept only under
  Analytics) — which vitrina already enforced via `CanonCtaBindings`
  (now a no-op there).
- Re-laid-out into 2×2 cards with mini-controls (`OwnerDemo`: approve /
  edit / export / delete). Copy updated.

### Sources (block 06)

- «ЧАЩЕ ВСЕГО» badge removed from the Я.Карты featured card (accent
  border kept).

### Header + system

- Sticky-header nav: «Цикл 4 сам» + «Понедельник» dropped → **Примеры ·
  Цена · Помощь · Войти** + CTA. Side padding `clamp()` + `nowrap`. The
  structural hooks vitrina's `SiteHeader` DOM-mutation relies on
  (`.ss-sticky-header`, `.ss-login-link`, `a[href="#hero"]` with accent
  `primaryStyle`, `#login`) are all intact — login/home href overrides
  keep working.
- All blocks aligned to a single **1200px** column.
- Floating «Чего не хватает?» button (`FloatingFeedback`) returned — but
  it lives only in the `SamosaytLandingV3` composition, NOT the individual
  section components vitrina renders, so there is **no double button**
  (vitrina keeps its own `FeedbackFloatingButton`).

### Vitrina-side follow-through (this vendoring PR)

- **Converter-bug repair (2 edits in `src/landing/index.tsx`).** The
  upstream 0.8.0 preview→package conversion shipped two defects that
  broke the ESM build / SSR render; both fixed with minimal de-wrapping,
  no markup or logic change:
  1. A leaked IIFE opener (`if (!window.__ss_landing_v3a) {…(function
     ssLandingV3a() {`) + a bare (un-commented) banner line at the top of
     part A — removed / commented to balance braces so the module parses.
  2. A self-referential `const PresetRenderer = PresetRenderer;` inside
     `ExamplesSection` (the converter turned the preview's
     `window.PresetRenderer` into a bare `const` shadowing the top-level
     `import { PresetRenderer } from '../presets'`) — a TDZ that threw
     `Cannot access 'PresetRenderer' before initialization` at SSR.
     Removed; the JSX uses the imported `PresetRenderer`.
  **Flagged to Claude Design** for the next upstream conversion pass.
- No consumer code changed: `app/page.tsx` already renders Analytics
  before Ownership; `CanonCtaBindings` already removed the ownership demo
  link and rewrote the analytics one to `/admin-demo`; `SiteHeader`
  override + the `/feedback` wiring for «Не нашли свою? Напишите →» all
  reconcile against 0.8.0 markup unchanged.
- `tsup.config.ts` keeps the local `dts: false` carry-forward + the
  `src/presets/index.tsx` entry. Dist rebuilt (index + landing + presets
  chunks).

### No API/dep change

Token surface, package exports, and every other module (admin / intake /
customer / auth / source / primitives / tokens) are byte-identical to
0.7.3.

---

## 0.7.3 — BaseWorkSection copy + restrained visual · 2026-05-28

> **PATCH.** Only `src/landing/index.tsx` changed vs 0.7.2 — a single
> section (`BaseWorkSection`, block 6 «Базовая работа — тоже на нём»).
> Pure canon-import on our side (`app/page.tsx` renders it via
> `ResponsiveCanonSection id="base-work"`), so drift = 0 by construction
> — no hand-rolled reconciliation, no Hero/test changes.

### Copy

Subheading + all 4 cards reworded. Card «Попадает в поиск» renamed to
**«Готов к поиску»** with a new body (setup for Yandex + Google, sitemap,
price/hours markup; search engines pick it up themselves within a few
days). The other 3 cards got tightened wording.

### Visual — dialled back to canon restraint

Removed the «cartoonish» treatment from block 6:
- icon offset-shadow `3px 3px 0 0` (hard) → `0 1px 2px` (soft)
- 4 bright palettes (orange/yellow/green/purple) → 1 muted warm
- icon frame `2px solid pal.ink` → `1px solid line`
- icon stroke `2.6` → `2.2`, size 36 → 32, container 64 → 58
- metric `34px/800` → `28px/700`

### Vitrina side

`cp` of `src/landing/index.tsx` + package.json 0.7.2 → 0.7.3 + dist
rebuild (only landing+index chunks change). No consumer code touched —
BaseWork was already a drift-0 canon-import. tsup keeps local `dts:false`.

---

## 0.7.2 — Header responsive fix + ChipStrip export + Hero copy · 2026-05-28

> **MINOR / patch.** Only `src/landing/index.tsx` changed vs 0.7.1.
> Three things: a header responsive fix, the extraction of the Hero
> «СОБИРАЕМ ИЗ» chips into a standalone `ChipStrip` export, and a Hero
> абзац-2 copy fix. Ships with a full per-component `DESIGN_SPEC.md`
> (vendored into `docs/handoff/`).

### Header responsive fix

CTA «Собрать за 2 часа» was clipping in the ~720–1000 px band (desktop
mode still active by the `<720` threshold, but the logo + menu + CTA row
overflowed at the fixed 80 px side-padding). Fixed in `StickyHeader`:
- side padding `80` → `clamp(24px, 4vw, 80px)`
- menu gap `24` → `clamp(12px, 1.6vw, 24px)`, row `flexWrap: nowrap`,
  `minWidth: 0`
- all nav items + CTA get `whiteSpace: nowrap`; CTA gets `flex: 0 0 auto`

Threshold stays single-step (`<720`); a real intermediate breakpoint /
burger is still deferred.

### New export: `ChipStrip` (+ `SOURCE_ICONS`, `ChipStripItem`)

The Hero «СОБИРАЕМ ИЗ» source-chip strip was extracted from inline
HeroBlock code into a standalone export from `@samosite/canon/landing`,
**so consumers can mount it without transcribing canon JSX into
hand-rolled Tailwind** (the landing/CLAUDE.md rule). `HeroBlock` now
renders `<ChipStrip mobile={mobile} />` internally.

```tsx
import { ChipStrip, SOURCE_ICONS, type ChipStripItem } from '@samosite/canon/landing';
<ChipStrip mobile={false} />   // label «СОБИРАЕМ ИЗ» + source chips
```

Props: `mobile?`, `label?` (default «СОБИРАЕМ ИЗ», empty hides it),
`items?` (default `SOURCE_ICONS`), `align?`.

### Hero абзац 2 copy fix

Old абзац 2 «Через 2 часа сайт принимает заявки. Дальше работает сам…»
duplicated the H1 promise. Replaced with concrete value: «Самосайт
соберёт сайт со всеми услугами, ценами, отзывами и фото. Тексты напишет
сам. Когда придут первые посетители, начнёт подсказывать, что поправить
ради новых заявок» (no bold span).

### Vitrina-side follow-through (this vendoring PR)

The prod Hero is hand-rolled (canon's HeroBlock is non-interactive), so
the canon copy/structure changes were mirrored by hand into
`landing/components/Hero.tsx`:
- абзац 1 + абзац 2 synced to canon 0.7.2 wording (trailing period
  stripped — canon's runtime pass strips trailing dots from `<p>` too,
  so this matches the rendered canon output)
- removed the «Нет ссылки? Загрузите фото…» standalone link (canon
  DESIGN_SPEC §1 NB — not in canon; photo path stays via the input
  placeholder + SubmitModal mode-switcher + the SourceDetectionBadge
  waitlist branch)
- re-added the «СОБИРАЕМ ИЗ» strip via `<ChipStrip>` import (dual-render
  for sm: responsive parity) — no transcription
- `Hero.test.tsx` updated

### Docs

`DESIGN_SPEC.md` (per-component landing spec, source-of-truth values) +
its 7-point prod-conformance checklist vendored into
`docs/handoff/DESIGN_SPEC.md`.

### No API/dep change

Token surface, package exports (besides the additive `ChipStrip` named
export on the existing `./landing` entry), and all other modules are
unchanged. `tsup.config.ts` keeps the local `dts: false` carry-forward.

---

## 0.7.1 — Preset architecture + pricing matrix · 2026-05-28

> **MINOR.** Adds a new `@samosite/canon/presets` module and rewrites
> `ExamplesSection` + `PricingSection`. All existing landing exports
> (incl. the 11 section components vitrina composes) keep resolving —
> `<Landing />` / `<ExamplesSection />` consumers need no code change.
>
> Vendored into vitrina as a targeted update: only `src/index.ts`,
> `src/landing/index.tsx`, and the new `src/presets/index.tsx` changed
> vs 0.6.0 (admin / intake / customer / auth / source / primitives /
> tokens are byte-identical). `tsup.config.ts` keeps the local
> `dts: false` carry-forward (upstream ships `dts: true` but its build
> hits the same admin-* type errors — see «Known issues»).

### Product shift

«One engine, one design system, variable accent» → **«one engine, a
library of stylistics, AI picks per niche»**. The landing now sells a
preset library instead of a single tunable theme.

### New module `@samosite/canon/presets`

5 layout families (`editorial`, `bento`, `display`, `split`, `stacked`)
× 16 themes (incl. new `display-ink` — graphite + bone, thin Instrument
Serif, for fine-line tattoo studios). Public API: `PresetRenderer`,
`MiniChrome`, `getTheme`, `themes`, `samplePresets`, family components +
fixtures + types (`Preset`, `Theme`, `SlotContent`, `FamilyKey`,
`SpectrumKey`). Hookless / presentational — bundles into the landing
chunk via the `../presets` relative import, and is also exposed as the
`./presets` subpath export.

### `ExamplesSection` (rewritten)

- Carousel of 10 preset cards (was a 3-card grid). Dots-indicator
  ABOVE the carousel (cards are tall), tracks active slide by
  `scrollLeft`, tap-to-scroll. Mobile: card = 94% width, neighbour
  peeks under a 44 px right-fade.
- Below: `HowItPicks` block — 4 points on how the AI picks a style
  (palette from photos / fonts from tone / grid from content type /
  one-click swap).
- New sub: «Стилистик много — Самосайт подбирает её под нишу и контент…»
- Card order shuffled by contrast (dark themes on positions 2/4/6,
  маникюр first); card heights balanced by content, not cropping.

### `PricingSection` → `PricingMatrix`

Single price card replaced by a 5-plan matrix (Старт 0 ₽ / Личный
690 / Бизнес 1 490 / Компания 2 990 / Студия 6 990), 5 parameter
groups. Sticky first column + header on mobile, horizontal scroll
mobile-only (desktop fits in 990 px). «Популярный» highlight off
(`PLAN_HILITE = -1`). Section title: «Тариф под ваш масштаб».

### Pricing copy synced across all surfaces (0.7.1 fix over 0.7.0)

Hero, `PricingMatrix`, and `FinalCtaSection` now say the same thing:
**Старт бесплатно навсегда, платные от 690 ₽/мес, первый месяц на
платном бесплатно**. The 0.7.0 leftover «490 ₽ для первой сотни» in
FinalCta is removed (the bug flagged during vendoring). The single-plan
«990 ₽ / 490 навсегда» model is gone from the landing entirely.

### Vitrina-side follow-through (this vendoring PR)

- `landing/components/Hero.tsx` — `CTA_MICROCOPY` synced from
  «990 ₽/мес · 490 навсегда» to «Тариф "Старт" — бесплатно навсегда ·
  платные от 690 ₽/мес · первый месяц на платном бесплатно…» so the
  hand-rolled Hero stops contradicting the canon matrix below it.
- `Hero.test.tsx` — assertions updated to the new copy.

### Known issues (carried from upstream)

- DTS build fails on pre-existing `admin-core` / `admin-demo` type
  errors (not a 0.7.x regression — reproduces on 0.6.0). Vitrina builds
  JS-only (`dts: false`); landing types come from
  `landing/types/samosite-canon.d.ts` ambient shims.
- Example photos load from `images.unsplash.com/<id>` (18 refs). Fragile
  if an id 404s; prod should swap to an own media-CDN. Substitution
  points: `EX_U()` in `src/presets/index.tsx` + fixture `photoSrc` /
  `gallery` fields.

### Backend / data (NOT in this canon release — out of scope)

Per-site `preset: { themeId, familyId }` storage, `PATCH
/api/sites/{id}/preset`, SSR-passing the preset, and ML style-selection
are backend tasks. Likewise the 5-tier pricing is **frontend-only** —
ЮKassa is still single-plan 990 ₽. See `docs/handoff/CANON_SWAP_PLAN.md`
§«Pricing model» for the gap.

### Legacy

`EX_CoffeeSite` / `EX_AutoSite` / `EX_NailsSite` + `EX_*` helpers remain
in code but are unused by `ExamplesSection` (removed in 0.8.0). Vitrina
never imported them directly — no action needed.

---

## 0.6.0 — Landing rewrite v3 (BREAKING) · 2026-05-26

> **BREAKING.** Full structural rewrite of the landing. Old internal sections (`StorySection`, `PlatformsSection`, `BigFeaturesSection`, `FreeMonthSection`) are removed. The page composition behind `<SamosaytLanding>` is replaced — 11 blocks instead of 9, new narrative built around the **«цикл 4 сам»** loop and **«каждый понедельник — три предложения»** as the headline feature.
>
> Public top-level exports (`SamosaytLanding`, `SamosaytLanding_Desktop`, `SamosaytLanding_Mobile`, `StickyHeader`, `HeroBlock`, `ExamplesSection`, `OwnershipSection`, `AnalyticsSection`, `PricingSection`, `FaqSection`) still resolve and back-compat-render — but their internal markup and child sections changed. Anything that imports the removed inner exports will fail at type-check (intentional).

### Why

The 0.5.x landing told the story «соберётся из ссылки → дальше работает сам», which was right shape-wise but didn't hold under cold-read scrutiny:

1. **«Восемь сам»** read as a feature list, not as a story. The eight cards were a flat catalogue — owners couldn't tell which of the eight was the **point of the product** and which were table-stakes hygiene.
2. **«Дальше работает сам»** had no mechanism behind it. The site supposedly «обновляется», «отбирает отзывы», «попадает в поиск» — but how, and why does that grow over time? Nothing in the page made the asymmetry «one-time setup vs ongoing improvement» visible.
3. **No mention of weekly recommendations** — the killer feature that distinguishes Самосайт from a static AI sitebuilder. In 0.5.x it was tucked into FAQ.
4. **Pricing didn't reflect pre-launch reality.** «990 ₽/мес. первый месяц бесплатно» — generic. No urgency, no early-adopter ladder, no «we're launching, jump in now».

### What the new narrative does

Two anchors carry the page:

- **Block 3 · Цикл «4 сам»** — the page's narrative spine. Four nodes: **01 Собирает** (one-off setup) → **02 Обновляет** → **03 Наблюдает** → **04 Предлагает**, with a return arc from 04 back to 02 («и снова — каждую неделю»). 01 sits apart as the one-time step. Owners read this and finally get the **mechanism**: «один раз показали — дальше сайт сам становится лучше через цикл».
- **Block 4 · По понедельникам — три предложения** — the killer feature, hoisted from FAQ to its own block. Three example messenger-card-style notifications (автосервис / кофейня / клиника) with **concrete numbers** («312 человек зашли, 224 закрыли», «98 нажали, 4 заказали», «68% долистывают, 19% доходят»), each ending with an explicit suggestion and three buttons («Применить / Другой вариант / Не надо»). The line under the block hard-codes the trust contract: **«Никаких правок без вашего согласования»**.

Pricing reorients around the pre-launch ladder:

- **490 ₽ / месяц для первой сотни — навсегда**. Big number, tilted «МЫ ЗАПУСКАЕМСЯ» ribbon on the card.
- Reverts to 990 ₽ for everyone else.
- First month free, **без карты привязки** — distinct visual block inside the card, not microcopy under the CTA.

### 11 blocks (new structure)

| # | Block | Component | Role |
|---|---|---|---|
| 01 | Hero | `HeroBlock` | Главное обещание: 2 часа + цикл |
| 02 | Примеры сайтов | `ExamplesSection` | Снимает «получится стыдно» |
| 03 | Цикл «4 сам» | `CycleSection` *(new)* | **Смысловое сердце** |
| 04 | По понедельникам — 3 предложения | `MondaySection` *(new)* | **Главная новая фича** |
| 05 | Базовая работа | `BaseWorkSection` *(new)* | Остальные «сам» компактно |
| 06 | Источники + врезка про Я.Карты | `SourcesSection` *(new)* | Снимает «у меня нечего показать» |
| 07 | Вы — главный | `OwnershipSection` *(rewritten)* | Снимает страх «ИИ переделает за меня» |
| 08 | Аналитика | `AnalyticsSection` *(rewritten)* | Источник данных для понедельников |
| 09 | Цена + предзапуск-оффер | `PricingSection` *(rewritten)* | Финансовый аргумент + срочность |
| 10 | FAQ | `FaqSection` *(rewritten)* | Группа 1 «про рекомендации» + остальные |
| 11 | Финальный CTA | `FinalCtaSection` *(new)* | Лестница 2 часа → неделя → месяц |

5 CTA-points on the page: Hero · Monday (mid-page) · Ownership («Демо ЛК») · Pricing · Final.

### New exports

```tsx
import {
  // New top-level — these are the canonical names going forward
  SamosaytLandingV3,
  SamosaytLandingV3_Desktop,
  SamosaytLandingV3_Mobile,

  // New section components
  CycleSection,
  MondaySection,
  BaseWorkSection,
  SourcesSection,
  FinalCtaSection,
} from '@samosite/canon/landing';
```

### Removed exports (BREAKING)

| Removed | Why | Replacement |
|---|---|---|
| `StorySection` | 6-step «Как это работает» — folded into `CycleSection` (4 nodes, тighter) | `CycleSection` |
| `PlatformsSection` | Full-section platform catalogue — replaced by compact Hero chips + new `SourcesSection` card grid | `SourcesSection` |
| `BigFeaturesSection` (8 «сам») | Flat catalogue, no story. The cycle (4 сам) + `BaseWorkSection` (4 hygiene cards) carry the same content with narrative structure | `CycleSection` + `BaseWorkSection` |
| `FreeMonthSection` | Generic «Дайте Самосайту собрать себя» — replaced by ladder CTA «2 часа → неделя → месяц» | `FinalCtaSection` |
| `HeroPlatformStrip` | Was a dedicated standalone export for the platform chips under hero input. In v3, chips are inlined into `HeroBlock` and the rendered platforms changed | — *(use `SourcesSection` if you need a standalone source list)* |
| `SectionTitle`, `SectionSub` | Internal title primitives. v3 uses its own `H2` / `Sub` helpers, not exported | — *(write directly, see `HeroBlock` source)* |
| `FeatureGlyph` | Glyph variant set tied to old `BigFeaturesSection` | — *(no replacement, base-work cards bring their own SVGs)* |
| `StoryStepColorful`, `PlatformLogo`, `PlatformCard`, `FeatureCard`, `SiteCard` | Internal pieces of the removed sections | — |

### Back-compat aliases (still resolve)

```tsx
// These still resolve from @samosite/canon/landing — but they point at v3 now,
// so visual output is the new 11-block landing, not the 0.5.x 9-section one.
SamosaytLanding         // → SamosaytLandingV3
SamosaytLanding_Desktop // → SamosaytLandingV3_Desktop
SamosaytLanding_Mobile  // → SamosaytLandingV3_Mobile
Landing                 // → SamosaytLandingV3
ConceptA_Desktop        // → SamosaytLandingV3_Desktop
ConceptA_Mobile         // → SamosaytLandingV3_Mobile
HeroBlock               // → v3 HeroBlock (new copy, same shape)
HeroSection             // → HeroBlock
ExamplesSection         // → v3 ExamplesSection (3 demo cards, new copy)
OwnershipSection        // → v3 OwnershipSection (4 points, new copy)
AnalyticsSection        // → v3 AnalyticsSection (rewritten dashboard)
PricingSection          // → v3 PricingSection (490 ₽ tier)
FaqSection              // → v3 FaqSection (13 questions, grouped)
StickyHeader            // → v3 StickyHeader (new nav links)
```

### What's new in components (per-block)

#### `HeroBlock`
- **H1**: «Соберём за 2 часа сайт, который ловит заявки. Дальше он сам становится лучше каждую неделю» (с акцентом на «сам становится лучше»).
- **Sub**: новый текст, упоминающий **«по понедельникам подсказывает, что поправить»** — задаёт ожидание блока 04.
- **Placeholder**: «Вставьте ссылку: Я.Карты, Telegram, Avito…»
- **CTA**: «Собрать сайт за 2 часа →» — единая формулировка для всех 5 CTA-точек.
- **Microcopy**: двумя строками с акцентом на «первая сотня» — «Первый месяц бесплатно. Карту привязывать не надо.\nДля первой сотни — 490 ₽ в месяц навсегда».
- **Chips**: Я.Карты · Telegram-канал · Instagram · 2ГИС · Avito · ваш старый сайт · фото буклета или меню. (Раньше отдельный `HeroPlatformStrip` — теперь inline.)

#### `ExamplesSection` (rewritten)
- 3 demo-карточки (не «реальные сайты»): кофейня (из Telegram) · автосервис (из Я.Карт) · школа танцев (из старого сайта).
- Подпись каждой: `Собран из {src}`.
- Mobile — горизонтальная карусель с равной высотой карточек (`alignItems: stretch`).
- CTA внизу: «Собрать такой же из моей ссылки →».

#### `CycleSection` *(new)*
- **Desktop**: 4 узла в ряд (01-04), горизонтальный поток слева направо. Под 02-03-04 — пунктирная дуга возврата с подписью «и снова — каждую неделю». 01 стоит отдельно как разовая настройка.
- **Mobile**: вертикальный список с стрелками между узлами. Дуга возврата убрана — на мобиле это ломалось визуально.
- Карточки одинаковой высоты (`height: 100%`), каждая в своём цвете (paper-stack аesthetic — `5px 5px 0 0` shadow в цвет border).

#### `MondaySection` *(new — главная фича)*
- Eyebrow «ГЛАВНАЯ ФИЧА» (red accent).
- Заголовок «Каждый понедельник — три предложения, что улучшить».
- 3 карточки-уведомления в стиле мессенджер-чата: от «Самосайт · понедельник, 09:00». Каждая — со своим цветом (оранжевый / сине-фиолетовый / зелёный).
- Внутри каждой карточки: эyebrow-тег (ЦЕННОСТНОЕ ПРЕДЛОЖЕНИЕ / КОНТЕНТ / СТРУКТУРА) · case-label (автосервис / кофейня / клиника) · заголовок «проблемы» · 2-3 абзаца с конкретикой (живые цифры) · suggestion-блок · 3 кнопки.
- Подпись под блоком: **«Никаких правок без вашего согласования»**.
- CTA внизу: «Собрать сайт за 2 часа →».

#### `BaseWorkSection` *(new)*
- 4 карточки в grid 2×2 (desktop) / vertical (mobile).
- Каждая карточка визуально цветная (плашка-заголовок с большой метрикой + body): оранж (4 канала) / жёлтый (4–6 отзывов) / зелёный (Яндекс+Google) / фиолет (0 ботов).
- Иконка в обведённом квадрате с offset-shadow под цвет.

#### `SourcesSection` *(new)*
- Я.Карты — большая featured-карточка (col-span 2 на desktop).
- 6 остальных платформ — стандартные карточки.
- Справа — отдельная **врезка** «Зачем мне сайт, если у меня уже есть страница в Я.Картах?» — снимает главное возражение этого сегмента.
- Снизу — soon-strip «ВКонтакте · Ozon · YouTube».

#### `OwnershipSection` (rewritten)
- Заголовок: «Сайт ваш. Кнопка всегда у вас».
- 4 пункта контроля с явной отсылкой к рекомендациям («Не понравилась — отклоните»).
- CTA: «▶ Посмотреть демо личного кабинета ↗» → `client-admin-demo.html`.

#### `AnalyticsSection` (rewritten)
- Светлый мок-дашборда (был тёмным в первой итерации — заменён на светлый, чтобы соответствовать остальной admin/customer-палитре).
- Окно с traffic-light, URL-bar `app.samosite.online/analytics`, LIVE-индикатор.
- KPI (4): посетителей · просмотры услуг · **заявок 47** *(акцент)* · конверсия. **Цифры внутренне согласованы:** график по дням 5+6+8+7+9+7+5 = 47.
- «Откуда пришли» (5 источников включая «Другое») — сумма ровно **100%**.
- Топ-услуги с дельтами (+34% / +8% / +2% / −12%).
- Кнопка «Посмотреть демо личного кабинета ↗» под блоком.

#### `PricingSection` (rewritten)
- Tilted ribbon «**МЫ ЗАПУСКАЕМСЯ**» (rotate 8°) в углу карточки.
- Eyebrow внутри: «ПЕРВОЙ СОТНЕ — НАВСЕГДА».
- **490 ₽** в месяц (большая цифра 84-88px). Потом 990 ₽ для всех остальных.
- Отдельный блок «Первый месяц — вообще бесплатно. Карту привязывать не надо» — в accentSoft фоне с иконкой подарка.
- 7 bullets «ВХОДИТ ВСЁ» (см. `docs/COPY.md` §9).
- CTA + сноска «Оплату подключите потом».
- Под карточкой — аргумент про SMM-щика, переписан **без тире** (через двоеточие — это сознательная стилистическая правка).

#### `FaqSection` (rewritten)
- **13 вопросов**, разделены на 2 группы.
- **Группа 1 (3 вопроса)** — «ПРО ЕЖЕНЕДЕЛЬНЫЕ РЕКОМЕНДАЦИИ», выделена accent border. Первый раскрыт по умолчанию.
- **Группа 2 (10 вопросов)** — обычные. «Что НЕ умеет» — последний (13-й), как catharsis.

#### `FinalCtaSection` *(new)*
- Тёмная карточка с декоративными blob-радиалами в углах.
- 3-строчный заголовок: «Через 2 часа — сайт. Через неделю — первые предложения. Через месяц — сайт, который вы сами бы не догадались собрать».
- Лестница из 3 ступеней (ШАГ 1/2/3).
- CTA: «Собрать сайт за 2 часа →».
- Сноска: «Остались вопросы? Напишите нам →».

#### `StickyHeader` (new nav)
- Навигация (desktop): «Цикл 4 сам · Понедельник · Примеры · Цена · Помощь» (вместо старой «Как · Примеры · Цена · FAQ»).
- CTA: «Собрать за 2 часа» (mobile: «Собрать»).
- Brand mark wrap в `<a href={homeHref}>` (carry-over from 0.4.0).

### Runtime typography pass

`SamosaytLandingV3` mounts a one-shot effect that walks the rendered DOM and applies two rules:

1. **Short prepositions / conjunctions** (и, в, о, к, с, у, а, не, по, за, до, от, из) — pinned to the following word via `nbsp`. Stops them from dangling at the end of a line.
2. **Trailing dots** — stripped from `h1–h6`, `p`, `li`, `button`, `summary`, `blockquote` *unless* the text ends in ellipsis or `..`.

Both pass over both desktop and mobile root via `useRef` (the first attempt used `document.querySelector` and only caught the first root — fixed). Performance: single pass on mount, O(N) over text nodes inside `.ss-v3-root`.

### Visual deltas (canvas baselines need regeneration)

Every artboard under `#s1 · Landing v3` in `index.html` changed:

| Artboard | 0.5.0 height | 0.6.0 height |
|---|---|---|
| `s1-d` (Desktop 1440) | 10 300 px | **11 900 px** |
| `s1-m` (Mobile 390) | 13 000 px | **15 200 px** |

40+ pixel-diff baselines will need to be regenerated. Token surface unchanged — VT.* tokens are identical to 0.5.x.

### Migration

```bash
npm i @samosite/canon@0.6.0
# rebuild your app — top-level <SamosaytLanding /> still renders, but you'll see
# the new 11-block landing
npm run build
```

**If you've been composing sections individually** (vitrina/landing prod): you'll need to remove imports of the deleted components (`StorySection`, `PlatformsSection`, `BigFeaturesSection`, `FreeMonthSection`) and add the new ones (`CycleSection`, `MondaySection`, `BaseWorkSection`, `SourcesSection`, `FinalCtaSection`). See **`CLAUDE_CODE_TZ_landing_v0.6.0.md`** in the project root for the prod migration plan.

**If you've been using `<SamosaytLanding>` as a whole**: nothing to remove, but the entire visual diff is the new landing.

### Back-compat

- Top-level `<SamosaytLanding>` still resolves and renders. Same prop signature (`{ mobile?: boolean }`).
- Token surface (`VT`, `BRAND`) — zero changes.
- Primitives (`Btn`, `IconArrow`, `IconLink`, `BrandMark`) — zero changes.
- `intake/`, `customer/`, `admin-core/`, `admin-ops/`, `auth/`, `source/` — zero changes.
- Removed inner exports — gone, no `@deprecated` cycle.

### What this release does NOT do

- **SubmitModal copy** — unchanged. Will sync to v3 narrative in a follow-up (planned 0.6.x).
- **Customer-site** (`/code/customer-site.html.j2`) — unchanged.
- **Backend / schema** — zero changes. v3 is purely landing copy + composition.
- **`HeroPlatformStrip` standalone export** — removed. If you need the platform strip outside HeroBlock, copy the markup from `HeroBlock` source or wait for a follow-up.

---

# Changelog

## 0.5.0 — Copy rewrite per docs/COPY.md · 2026-05-24

Text-only release. **No visual or prop-signature changes.** All updates live inside `landing/index.tsx` and `intake/index.tsx`; the new canonical messaging doc is `docs/COPY.md` (single source of truth for landing + modal copy from now on).

### Why

Site copy had drifted from the new tone-of-voice in three measurable ways:

1. **Срок сборки рассказывался по-разному.** Hero обещал «2 часа», блок «Как это работает» — «за пару минут», блок «Вот какой сайт вы получите» — «через несколько минут». Все три приводились к **«за 2 часа»** как единому сроку.
2. **«Восемь сам» дублировали «Как это работает».** Старые 01 «Сам соберётся» и 04 «Сам поймает заявку» повторяли шаги 2 и 5. Заменены на дифференциаторы: 01 «Сам подберёт стиль», 03 «Сам напишет тексты», 07 «Сам себя улучшит». Старые «попадёт в поиск / мобильная / антиспам» свёрнуты в один 08 «Сам пройдёт техминимум».
3. **«Фото визитки» уехало с сайта** — никто не пользуется визитками 15 лет. Везде стало «фото буклета или меню».

Плюс точечно: новый CTA «**Собрать сайт**» вместо «Сделать Самосайт» (короче, императив); микрокопия под кнопкой `Без карты · Первый месяц бесплатно · Сайт через 2 часа`; H1 переписан в формулу «соберётся из вашей ссылки → дальше работает сам»; «Что НЕ умеет» поднят в FAQ на 4-е место; аргумент в pricing сменён с «час SMM-щика» на сравнение с подрядчиком (`30 000 ₽ + поддержка` vs `11 880 ₽/год`).

### Что поменялось — landing

| Секция | Что было | Что стало |
|---|---|---|
| Hero H1 | «сам себя соберёт, сам обновит и сам приведёт клиентов» | «Сайт, который **соберётся из вашей ссылки** — и дальше **работает сам**» |
| Hero subhead | «Покажите ссылку — карты, Telegram или визитку…» | «{BRAND.name} на базе ИИ **соберёт сайт за 2 часа** из того, что у вас уже есть — карточки на Я.Картах, Telegram-канала, профиля на Avito, фото буклета или меню…» |
| Hero input placeholder | «ссылка на ваш профиль или сайт» | «Вставьте ссылку: Яндекс.Карты, Telegram, Avito…» |
| Hero CTA | «Сделать {BRAND.name}» | **«Собрать сайт»** |
| Hero microcopy | — (no line) | **«Без карты · Первый месяц бесплатно · Сайт через 2 часа»** |
| Photo upload link | «или загрузите фото работ, буклета или меню» | «Нет ссылки? Загрузите фото буклета, меню или работ» |
| Hero strip label | «ИЗ ЧЕГО МЫ МОЖЕМ СДЕЛАТЬ ВАМ САЙТ» | **«ПОДДЕРЖИВАЕМ»** |
| Examples title | «Вот какой сайт вы получите через несколько минут» | **«Вот какой сайт вы получите сегодня же»** (убран конфликт с «2 часа») |
| Examples CTA | «Сделать себе такой Самосайт →» | **«Собрать такой же из моей ссылки →»** |
| Story step 2 title | «ИИ соберёт продающий сайт» | **«ИИ соберёт сайт за 2 часа»** (один срок везде) |
| Story step 2 body | «…За пару минут.» | «…подберёт цвета и шрифты под стилистику вашего дела, сложит всё в готовый сайт.» |
| Story step 3 body | `<ваш-сайт>.samosite.online` (угловые скобки) | `ваше-имя.samosite.online` (живой пример) |
| Story step 1 body | «фото визитки» | **«фото буклета»** |
| Platforms subhead | «Подойдёт любая ссылка, где про вас уже что-то написано или показано» | + **«…в интернете или на бумаге»** (фото буклета/меню не выглядят исключением) |
| PlatformCard `card` pull | «распознаем услуги · контакты» | **«распознаём услуги · контакты»** |
| BigFeatures (8 «сам») | 01 Сам соберётся / 04 Сам поймает (дублировали story) / 05 Сам посчитает / 06 Сам попадёт в поиск / 07 Сам подстроится под телефон | **01 Сам подберёт стиль / 02 Сам соберёт за 2 часа / 03 Сам напишет тексты / 04 Сам отберёт лучшие отзывы / 05 Сам обновится / 06 Сам поймает заявки / 07 Сам себя улучшит / 08 Сам пройдёт техминимум** |
| BigFeatures subhead | «…до недельной аналитики» | «…до недельного отчёта по конверсии» |
| Ownership title | «Восемь «сам» — но кнопка всегда у вас» | **«{BRAND.name} делает рутину — но кнопка всегда у вас»** (без числа — повтор с BigFeatures) |
| Analytics delivery note | «…пришлёт сводку аналитики, куда скажете…» | «…пришлёт сводку, куда скажете: в TG, MAX или на почту. Не нужно заходить в кабинет, чтобы знать, как идут дела» |
| Pricing bullets | 7 пунктов | **9 пунктов** под новые «сам» (стиль, тексты, улучшения) |
| Pricing CTA | «Сделать {BRAND.name}» | «Собрать {BRAND.name}» |
| Pricing value anchor | «Час работы SMM-щика стоит дороже…» | **«Стоимость подписки окупается с первой заявки. Сравните: вёрстка у подрядчика — от 30 000 ₽, поддержка — ещё столько же в год. {BRAND.name} — 11 880 ₽/год…»** |
| FAQ | 10 q · «Что НЕ умеет» — 10-й | **12 q** · «Что НЕ умеет» — **4-й** · добавлены два новых: «Что значит "сам подбирает стиль"?» и «Как Самосайт понимает, что улучшить на сайте?» |
| FAQ «Что НЕ умеет» body | 5 пунктов | **7 пунктов** (+ «не применяет улучшения автоматически», + «не гарантирует уникальность стиля на 100%») |
| FreeMonth title | «Дайте {BRAND.name}у собрать себя» | **«Покажите ссылку — получите сайт за 2 часа»** |
| FreeMonth bullets | «приём заявок в Telegram» / `ваш-сайт.…` | «приём заявок **в мессенджер**» / `ваше-имя.…` |
| FreeMonth CTA | «Сделать {BRAND.name}» | «Собрать {BRAND.name}» |
| StickyHeader CTA | «Сделать сайт» / «Сделать» | **«Собрать сайт» / «Собрать»** |

### Что поменялось — intake (SubmitModal)

| Поле | Было | Стало |
|---|---|---|
| Step 1 LINK title | «Ссылка на вашу страницу или профиль, из которой мы сделаем сайт» | **«Покажите ваше дело — соберём из этого сайт»** + sub «Вставьте ссылку — {BRAND.name} распознает источник…» |
| Step 1 PHOTO title | «Загрузите фото вашего дела» | **«Покажите ваше дело — соберём из этого сайт»** (один заголовок для link/photo) + sub «Загрузите работы, скриншоты профиля, фото буклета или меню…» (убрано «фото визитки») |
| Step 2 PHOTO sub | «Что нам нужно знать перед тем как начать?» | **«Пара строк, чтобы ИИ собрал сайт точнее»** |
| Customer-contact field label | «Контакты на сайте» | **«Контакт для клиентов на сайте»** (множ. → ед.; явно «для клиентов») |
| Step 3 contact sub | «Один основной контакт — туда придёт ссылка на готовый сайт и заявки клиентов» | **«Один контакт для вас — туда придёт ссылка на готовый сайт и заявки от клиентов»** |
| Email channel hint | «на ящик» | **«письмом»** |
| Channel field labels | «Номер телефона / Email / Логин в MAX» | **«Ваш номер для SMS / Ваш email / Ваш MAX (логин или номер)»** (унификация с «Ваш Telegram») |
| `SOURCE_LIB.instagram` label | «Instagram» | **«Instagram-профиль»** (симметрично «Avito-профиль») |
| `SOURCE_LIB.unknown` label | «не распознали» | **«не узнали источник»** (мягче — это мы не справились, а не вы ошиблись) |
| SourceBadge unknown msg | «Не распознали — проверьте ссылку. Или переключитесь на фото →» | **«Не узнали источник — проверьте ссылку или переключитесь на фото →»** |
| Confirm CTA | «Понятно» | **«Ок, жду →»** (эмоционально включает в ожидание) |
| Confirm «N файлов» | всегда «N файлов» | склонение: **«1 файл / 2 файла / 5 файлов»** (`pluralFiles()`) |

### Migration

```bash
npm i @samosite/canon@0.5.0
# rebuild your app — no API changes, no prop signatures changed
npm run build
```

Drop-in over 0.4.0. No prop, no export, no CSS-token changes. The only structural code-level addition is one new `FeatureGlyph` kind (`'pen'`) for the new «Сам напишет тексты» card and one helper fn (`pluralFiles`) in `intake/index.tsx` — both internal, not exported.

### For copy edits going forward

`docs/COPY.md` is now the single source of truth for landing + intake copy. Edits to landing / modal text should go to `COPY.md` first, then ripple into `src/landing/index.tsx` and `src/intake/index.tsx`. Tone-of-voice + the «сам» rules + the «what we don't say» list live there too.

### Back-compat

100 %. Visual diff is text-only — every rectangle, every shadow, every icon stays where it was.

---

## 0.4.0 — Customer login (S20) + StickyHeader `homeHref` · 2026-05-24

Additive minor release. Two changes, both back-compat-safe (zero visual diff for canvas / zero-prop callers):

### What's new

1. **`S20_CustomerLogin`** — full-page single-step login for the master (customer-site owner). Sister screen to `S10_AdminLogin` (founder/operator, 2-factor). Exposed as both `S20_CustomerLogin` and `CustomerLogin` from new `@samosite/canon/auth` entry.

   ```tsx
   import { CustomerLogin } from '@samosite/canon/auth';

   <CustomerLogin
     login={login}
     password={password}
     loading={loading}
     error={null}                  // | 'invalid_credentials' | 'rate_limited' | 'network_error' | 'unknown_error'
     retryAfterSeconds={null}      // required when error === 'rate_limited'
     onLoginChange={setLogin}
     onPasswordChange={setPassword}
     onSubmit={() => handleSubmit()}
     onCreateSiteClick={() => openSubmitModal()}  // optional bridge — consumer routes
   />
   ```

   Zero-prop call = mock-mode (canvas back-compat), `error=null`, local state.

   **Visual differentiation from S10** (per brief §8.3 — must read as a *different* flow so customers don't land on admin login by accident):
   - Subtle sage hairline (2px) at top of card — single visual signal that this is the customer area
   - Friendlier subhead: «Введите логин и пароль, которые мы прислали вам после создания Самосайта»
   - Bridge link below card: «Ещё нет Самосайта? Сделать →»
   - One logical step — no TOTP, no mode-switcher, no step counter
   - `autocomplete="username"` / `current-password` — browsers auto-save
   - Same tokens (terracotta primary CTA, Onest, cream surface) for brand consistency

   **4 canvas artboards** in `index.html` (per brief §2 acceptance criteria):
   - `s20-idle` — empty form, focus on «Логин»
   - `s20-loading` — both filled + spinner in CTA
   - `s20-invalid` — `invalid_credentials` inline error
   - `s20-rate` — `rate_limited` with live countdown «через N мин — осталось MM:SS»

   **Not in scope** (per brief §3, §9): magic-link, OAuth, password reset, signup, real `<ClientAdmin>` post-login destination (placeholder = `<ClientAdminDemo>` until 0.5.x).

2. **`<StickyHeader homeHref>`** — new optional prop, default `'#hero'`. Brand `<BrandMark>` now wraps in `<a href={homeHref}>` instead of the previously hardcoded `<a href="#hero">`. Same additive shape as `loginHref` from 0.2.3.

   ```tsx
   <StickyHeader
     loginHref="/login"      // 0.2.3 — points "Войти" at S20_CustomerLogin
     homeHref="/"            // 0.4.0 — points brand mark at canonical landing route
   />
   ```

   **Why:** without this, prod consumers (vitrina) have to patch click delegation on their side to override the in-page `#hero` anchor — see vitrina PR #138. Now it's a one-prop wiring.

### Back-compat

- All existing component signatures unchanged. Zero new required props.
- Zero-prop `<StickyHeader />` and canvas-mode usage render identically to 0.3.x.
- `loginHref` and `onMakeSiteClick` from 0.2.3 unchanged.

### Migration

```diff
- <StickyHeader loginHref="/admin-demo" />
+ <StickyHeader loginHref="/login" homeHref="/" />
```

Then mount `<CustomerLogin>` at `/login`:

```tsx
// landing/app/login/page.tsx
'use client';
import { CustomerLogin } from '@samosite/canon/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | 'invalid_credentials' | 'rate_limited' | 'network_error' | 'unknown_error'>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  async function handleSubmit() {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      if (res.ok) { router.push('/admin-demo'); return; }
      if (res.status === 429) {
        setError('rate_limited');
        setRetryAfter(parseInt(res.headers.get('Retry-After') || '263', 10));
      } else if (res.status === 401) setError('invalid_credentials');
      else setError('unknown_error');
    } catch { setError('network_error'); }
    finally { setLoading(false); }
  }

  return (
    <CustomerLogin
      login={login} password={password}
      loading={loading} error={error} retryAfterSeconds={retryAfter}
      onLoginChange={setLogin} onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onCreateSiteClick={() => router.push('/')}
    />
  );
}
```

### Open questions (answered)

- **Single entry vs separate** (brief §8.1): went with separate — new `@samosite/canon/auth` entry. Cleaner domain split: `auth/` will host both `S10_AdminLogin` (when moved out of admin-core) and `S20_CustomerLogin`. For 0.4.0 only `S20` lives there; S10 stays in `admin-core` for back-compat.
- **Bridge link shape** (brief §8.2): `onCreateSiteClick` callback prop. When supplied, renders as `<button>`; when omitted, falls back to `<a href="/">` for canvas/zero-prop.
- **Mobile layout** (brief §8.4): same chassis as S10 — full-page, centred card, 24px page padding.

---

## 0.3.0 — Intake flow rewrite (BREAKING) · 2026-05-24

> **BREAKING.** Hard cut-over. No `@deprecated` period — vitrina prod is pre-launch so consumers migrate at lockstep with the version bump. Bumped from `0.2.7 → 0.3.0` (skipping `0.2.8`).

### Why

Fake-door MVP: every application — link or photos — should be accepted and routed to manual handling. The old 3-step modal (link → contact → personal-bot onboarding) hard-coupled the funnel to Telegram automation that doesn't exist yet, special-cased Instagram with a screenshot-upload nag, and rendered Confirmation as a separate full-screen route. Three friction points the new flow removes.

### What changed at the funnel level

```
0.2.x:   Hero (link only) → Modal Step 1 (link) → Step 2 (contact) → Step 3 (open @SamositeBot) → /confirm route
              Photo path lived in a separate <PhotoDrawer> reached from "нет ничего онлайн" footer link.

0.3.0:   Hero (link input + "or upload photo" companion link, same plane)
           ├ link path  → Modal Step 1 (link, mode-switcher) → Step 2 (contact) → Step 3 (confirm inline)
           └ photo path → Modal Step 1 (photos, mode-switcher) → Step 2 (description + city +
                                                                          customer_contact + opt. text_files)
                                                              → Step 3 (contact) → Step 4 (confirm inline)
```

Hero & modal share the same source-selection plane. User picks ONE path — link OR photo, never both. Mode-switcher pill-tabs on Step 1 in both branches let the user change their mind without closing the modal; partial state per branch is the consumer's responsibility to preserve.

### Breaking changes

1. **`SubmitModal` — full controlled-API rewrite.**
   - New props: `mode` (`'link' | 'photo'`), `step` (1..4), `onModeChange`, `onStepChange`, `onBack`, `onContinue`, `onSubmit`, `onClose`.
   - Link branch state: `url`, `source`, `counts`, `onUrlChange`, `onCorrect`.
   - Photo branch state: `files`, `onPickPhoto`, `onRemovePhoto`, `description`, `city`, `customerContact`, `customerContactType` (`'phone' | 'telegram'`), `textFiles`, plus matching `on*Change` callbacks.
   - Contact step (shared): `channel`, `contact`, `consent`, plus matching `on*Change` callbacks.
   - Final step: `summary` (auto-derived from props if omitted).
   - Old prop names (`sourceUrl`, `contact` as positional) removed.
2. **`S5_Confirmation` — removed.** Confirmation is now `S3_FinalConfirm`, rendered as the final step inside `SubmitModal`. Re-export alias `Confirmation` points at the inline component for back-compat naming, but it expects the new summary-prop shape, not the old `contactType` prop.
3. **`S3_Step3_TgBot` — removed.** Personal-notification onboarding (`@SamositeBot` invite) deferred to post-approval email flow. **Note:** this is NOT the same as `@SamositeIntakeBot` (the private-channel parser bot) — that one was on a separate code path and is out of scope for 0.3.0.
4. **`S4_TGBotInvite` — removed.** Private TG-channel invite (`@SamositeIntakeBot` admin add) was a dead path on the canvas — no consumer was rendering it.
5. **`PhotoDrawer` — back-compat shim only.** Old `<S6_PhotoDrawer>` had its own contact form + business-name fields. The new flow integrates photo selection as Step 1 of `SubmitModal` and pushes business details to Step 2. The `PhotoDrawer` export now resolves to `S3_Step1_Photo` for callers that haven't migrated yet. Schedule for removal at 0.4.0.
6. **`SOURCE_LIB.instagram` — `ok-instagram` tier removed.** Instagram is now a regular `ok` source. `<SourceBadge source="instagram" />` no longer renders the "нужен скриншот профиля + фото работ" CTA. Consumers must drop any special-case rendering of an IG hint.
7. **`CaptchaNotice` — `· невидимо` suffix removed everywhere.** Renders as `🛡 Защищено Yandex SmartCaptcha` across both intake (modal) and customer-site (LeadForm + `customer-site.html.j2`). Localized assertions on `· невидимо` will fail; remove them.
8. **Photo limits softened.** Hard caps (`≤30 files`, `≤10 MB/file`, `≤100 MB total`) replaced with soft fake-door limits (`5..60 files`, `≤15 MB/file`, `≤200 MB total`). New named export `PHOTO_LIMITS` carries the numbers.
9. **Hero adds a photo-link companion** under the link-input pill. The link carries `data-open-submit-modal="photo"` — wire it to your modal-opener with `mode='photo'`. The Hero CTA itself still opens with `mode='link'` (or `mode='photo'` if it bubbles up from the photo-link click — your routing decision).

### New / changed exports

| Module | Added | Removed |
|---|---|---|
| `@samosite/canon/intake` | `S3_Step1_Link`, `S3_Step1_Photo`, `S3_Step2_PhotoDesc`, `S3_StepContact`, `S3_FinalConfirm`, `SOURCE_LIB`, `PHOTO_LIMITS` | `S3_Step2_Contact` (renamed to `S3_StepContact`), `S3_Step3_TgBot`, `S4_TGBotInvite`, `S5_Confirmation` (renamed to `S3_FinalConfirm`) |
| `@samosite/canon/landing` | photo-link in `HeroBlock` (no new export) | — |
| `@samosite/canon/source` | — | Instagram from `WAITLIST_KINDS` and `PHOTO_FALLBACK_KINDS` (in the hand-rolled `code/SourceDetectionBadge.tsx` mirror — only relevant if you copied that file) |

### For hand-rolled consumers (vitrina/landing)

Your `SubmitModal.tsx`, `Hero.tsx`, `PhotoDrawer.tsx`, and `SourceDetectionBadge.tsx` are hand-rolled per the prod-map in your brief §2 — canon changes don't reach them automatically. You need to mirror the new flow on your side.

**Frontend diff:**
- Delete `PhotoDrawer.tsx`. Its UI lives in `SubmitModal` Step 1 (`mode='photo'`) + Step 2 (description + city + customer_contact + text_files).
- Rewrite `Hero.tsx` to render the input pill + photo-link companion (same plane). Empty CTA opens modal with `mode='link'`; photo-link opens with `mode='photo'`.
- Rewrite `SubmitModal.tsx` against the new API contract above. Owns `mode`/`step`/per-step state. Mirror visual baselines from `screens-intake.jsx` artboards (16 states listed in §6.3 of your brief).
- `SourceDetectionBadge.tsx`: drop `instagram` from `WAITLIST_KINDS` and from any photo-fallback CTA branch.
- Visual regression baselines need regeneration — 40 PNG.

**Backend diff:**
- `POST /api/submit-application` schema migration:
  - Add `mode: 'link' | 'photo'`.
  - Under `mode='photo'`, require `description` (TEXT, ≥30 chars after trim), `city` (TEXT), `customer_contact` (TEXT), `customer_contact_type` (ENUM `'phone' | 'telegram'`).
  - Optional `text_files[]` — multipart attachments, PDF / DOCX / TXT / RTF, up to 10 files.
- Delete endpoints: `GET /api/tg-bot-personal-status`, `POST /api/submit-application/finalize-via-email`, `GET /api/tg-bot-status?app_id=…` (the personal-bot one — verify before deleting the private-channel variant).
- Magic-byte file validation for the new attachment types (FR-015 extension):
  - PDF: `%PDF-` (0x25 0x50 0x44 0x46 0x2D).
  - DOCX: ZIP signature `PK\x03\x04` + entry path starts with `word/`.
  - TXT / RTF: header check + UTF-8 / Windows-1251 / `{\rtf1` respectively.
- PDF hardening: strip embedded JS, form-field actions, OLE objects (FR-019 extension).
- LLM safety: wrap `description` + extracted text-file content inside `<user_content>` tags before sending to YandexGPT (existing FR-020 — applies to the new fields).

**Security / FZ-152 checklist for vitrina:**
- `customer_contact` is **public** (rendered on the customer site CTA) — distinct from `contact` (private, the notify channel). The consent checkbox text must cover both purposes. Re-review consent copy with counsel before launch.
- New attachment types add new threat surfaces — see magic-byte + PDF hardening above. Treat text-file content as untrusted user input in the LLM prompt.
- At-rest encryption for `text_files[]` if they're stored before LLM extraction (they may contain PII like price lists with phone numbers).

### What's NOT in this release

- Canon-import for `SubmitModal` into vitrina prod. Vitrina stays hand-rolled until 0.4.x with a proven feature-flag-driven migration plan.
- ADRs — that's your side, not canon's.
- Backend code changes — your migration.
- Changes to `landing` sections 2–10, `admin-*`, `customer`, `primitives`, `tokens`. Only `intake`, `source`, and the Hero block of `landing` are touched.

### Acceptance criteria (per your brief §7)

- [x] `S5_Confirmation`, `S3_Step3_TgBot`, `S4_TGBotInvite` removed from `export {}` in `intake/index.tsx`.
- [x] `SOURCE_LIB.instagram.tier === 'ok'` (no `ok-instagram`).
- [x] `CaptchaNotice` source has no `· невидимо` token.
- [x] `<SubmitModal>` accepts both `mode` values; step indicator scales 3-dot vs 4-dot.
- [x] Mode-switcher pill-tabs render on Step 1 in both branches.
- [x] Step 2 photo: `Продолжить` gated on `description.length >= 30 && city && customerContact`.
- [x] Final step shows the full summary (link or photo path, varying fields).
- [x] 16 visual baseline artboards present on `index.html` (`s3-*` IDs).
- [x] Canvas `index.html` — old sections `#5` (confirmation), `#6` (photo drawer) removed; no orphan references in active code.
- [x] CHANGELOG has explicit «For hand-rolled consumers» section with backend checklist (this section).

### Migration

```bash
npm i @samosite/canon@0.3.0
# rebuild your app
npm run build
```

No automatic codemod. The API contract change is too large to migrate mechanically — every consumer needs to read the new `<SubmitModal>` props and rewire its parent state. Expected migration time on vitrina/landing: ~6-8 h in one session (per your brief §10).

### Back-compat

None. This is a controlled rip-and-replace. If you're consuming `intake/`, you re-implement against the new API.

---

## 0.2.7 — Hero H1 mobile clip (still) + FreeMonth→footer gap (hotfix) · 2026-05-24

Hotfix on top of 0.2.6. Two prod-reported defects on samosite.online. **No API changes.** Drop-in over 0.2.6.

### What was broken on prod

1. **Hero H1 «и сам приведёт клиентов» was still clipping on iPhone-class viewports**, even after 0.2.6's switch from `inline-block` to `inline`. Reproduced from prod screenshot (iPhone 17 Pro Safari, samosite.online, 09:42): the last word renders as `...приведёт клиен` and «тов» sits off-canvas to the right. 0.2.6's inline-fix worked in Chrome dev-tools but Safari iOS was still treating the accent spans as atomic line-breaking units because of the `position: relative` on the first accent — it created a containing block that the layout engine then sized at `max-content`, pinning the whole phrase to one line.
2. **On desktop, the «Дайте Самосайту собрать себя» block (final `<FreeMonthSection>`) sat flush against the page footer.** Zero visible whitespace between the dark CTA block's bottom edge and the footer's top border. Reported on the full-width composed page (prod uses `<FreeMonthSection>` then renders its own footer immediately after, outside `<SamosaytLanding>`).

### Root cause

**Defect 1.** Two interacting issues:
   - The first accent span (`сам себя соберёт,`) carried `position: relative` so the desktop-only underline highlight had a containing block. On Safari iOS, `position: relative` on an `inline` element promotes it to an inline atomic-ish layout in some flow contexts — long enough phrases that nominally fit will still get measured at `max-content` and overflow.
   - At a flat `font-size: 38 px`, the longest accent phrase «и сам приведёт клиентов» measures ~360 CSS px on Safari iOS at the default font stack (letter-spacing `-0.035em` doesn't shrink it enough). iPhone-class viewports give the hero ~350 CSS px of content area after the 20-px section pad on each side of a 390-px viewport. The phrase didn't fit.

**Defect 2.** The `<FreeMonthSection>` `<section>` had `margin: '110px auto 0'` (top 110, bottom 0). Whatever rendered next — prod's footer, in this case — was expected to provide its own top margin. Prod's footer didn't. The `<SamosaytLanding>` composition put a `marginTop: 64` on its own slim footer, so canvas mode looked fine, but the prod page wires a different footer that sits flush.

### Fix

**Defect 1 — H1 mobile hardening.** Three reinforcing changes on the `<h1>` style object inside `<HeroBlock>` (mobile branch only — desktop unchanged):

```diff
- fontSize: mobile ? 38 : 88,
+ fontSize: mobile ? 'clamp(28px, 8.6vw, 38px)' : 88,
  lineHeight: mobile ? 1.08 : 1.02,
  fontWeight: 700,
  letterSpacing: '-0.035em',
  margin: 0,
  textWrap: mobile ? 'pretty' : 'balance',
+ overflowWrap: 'break-word',
+ wordBreak: 'normal',
+ maxWidth: '100%',
```

What each line buys:
- `clamp(28px, 8.6vw, 38px)` — at 390 CSS px viewport the font is `8.6vw = 33.54 px`; at 360 px it's `30.96 px`; at 320 px it's `27.52 px → 28 px floor`. Headline still reads at hero scale but is no longer pinned to 38 px on phones where it doesn't fit. Desktop branch unchanged at 88 px.
- `overflowWrap: 'break-word'` — defensive floor. Even if a future content edit introduces a longer single word (or an iOS update changes layout heuristics again), the word breaks inside the box rather than overflowing.
- `wordBreak: 'normal'` — explicit so the floor doesn't get inherited as `break-all` from a global stylesheet.
- `maxWidth: '100%'` — paranoia. Pins the h1's own box to its parent so it can never grow past the section's content area even under inline-atomic sizing.

The three accent `<span>`s and the `<br />` toggle are unchanged from 0.2.6.

**Defect 2 — explicit bottom margin on `<FreeMonthSection>`.**

```diff
  return (
    <section style={{
      ...sectionPad(mobile),
-     marginTop: mobile ? 64 : 110,
      position: 'relative', zIndex: 1,
      maxWidth: mobile ? '100%' : 1360,
-     margin: `${mobile ? 64 : 110}px auto 0`,
+     margin: `${mobile ? 64 : 110}px auto ${mobile ? 48 : 96}px`,
    }} id="cta">
```

The section now self-provides bottom air — 96 px desktop, 48 px mobile — so any composition that drops a footer (or anything else) right after `<FreeMonthSection />` gets visible separation without the consumer having to add it.

Inside `<SamosaytLanding>` the slim footer still keeps its `marginTop: mobile ? 40 : 64` — that stacks on top of the section's new 96 / 48, so the **canvas-mode** gap between the dark block and the slim footer grows from 64 → 160 px desktop, 40 → 88 px mobile. If that ends up too generous, the next minor can trim the footer's own marginTop, but in practice this just reads as a cleaner page bottom.

### Visual diff

| Element | 0.2.6 | 0.2.7 |
|---|---|---|
| Hero H1 mobile size | flat 38 px | `clamp(28, 8.6vw, 38)` — ~33 px @ iPhone 17 Pro |
| Hero H1 mobile «и сам приведёт клиентов» | clipped on right edge in Safari iOS | wraps cleanly inside content box |
| Hero H1 desktop | 88 px (unchanged) | 88 px (unchanged) |
| FreeMonthSection bottom margin | 0 | 96 desktop / 48 mobile |
| FreeMonthSection → prod footer gap | flush (0 px) | 96 px desktop / 48 mobile |
| FreeMonthSection → canvas slim footer gap | 64 px desktop / 40 mobile | 160 px desktop / 88 mobile |

### Migration

None. `npm i @samosite/canon@0.2.7` and rebuild.

### Back-compat

- All component signatures unchanged. Zero new props, zero removed props.
- Desktop hero is identical to 0.2.6.
- Mobile hero looks the same on standard iPhone-class viewports, just with the safety floor in place; on narrow Androids (≤360 CSS px) the headline is now visibly smaller, which is the fix.
- Canvas-mode `<SamosaytLanding>` page bottom is taller by ~96 px desktop / ~48 px mobile. If you've pinned pixel-diff baselines against 0.2.6, regenerate them.

---

## 0.2.6 — Section side-paddings + hero H1 overflow (mobile hotfix) · 2026-05-24

Hotfix. Two related mobile-only defects reported from prod on iPhone 17 Pro. **No API changes.** Drop-in over 0.2.5.

### What was broken on prod

Two symptoms, one root cause.

1. **Every section below the hero rendered flush against the viewport edges.** The «Что чаще всего спрашивают», «Один тариф — без сюрпризов», «Восемь "сам"», story steps, platforms list, examples carousel — all of them had their cards touching x=0 / x=W. Only the sticky header and the hero itself were padded.
2. **The hero H1 «и сам приведёт клиентов» overflowed the right edge** — the last word was cut off at the viewport boundary (`...и сам приведёт клиен` visible, the rest pushed off-canvas).

Reproduced verbatim from prod screenshots taken on iPhone 17 Pro Safari at samosite.online.

### Root cause

Same architectural mistake in two places.

**Symptom 1 (section paddings):** in 0.2.5 only `<SamosaytLanding>` applied horizontal padding — via an outer `<div paddingLeft={padX} paddingRight={padX}>` wrapper around all body sections. When prod composed sections individually outside `<SamosaytLanding>` (which it does — the app shell builds its own layout and imports `<HeroBlock />`, `<ExamplesSection />`, etc. directly from `@samosite/canon/landing`), the wrapper wasn't present and each section rendered full-bleed. This is the exact same class of bug as 0.2.4 fixed for `<StickyHeader>` — but 0.2.4 only fixed the header, not the rest.

**Symptom 2 (hero H1 overflow):** the accent phrases in the H1 («сам себя соберёт,», «сам обновит», «и сам приведёт клиентов») were `display: 'inline-block'` with `white-space: 'normal'`. inline-block makes each whole phrase an atomic line-breaking unit — the browser will try to fit the entire phrase on one line, and only wrap **the whole phrase** to the next line if it doesn't fit. Individual words inside an inline-block can wrap, but in practice with `text-wrap: balance` on the parent and only one phrase per inline-block, the browser sized each phrase at `max-content` and the longest one (~340px at 38px font + letter-spacing) didn't fit in a 350px content area on iPhone-class viewports.

### Fix

**Symptom 1 — every section/hero/footer is now self-padded.** Introduced one helper at module scope:

```tsx
function sectionPad(mobile) {
  const v = mobile ? 20 : 80;
  return { paddingLeft: v, paddingRight: v, boxSizing: 'border-box' };
}
```

Spread into every top-level element that used to depend on the parent wrapper:

- `<HeroBlock>` — outer wrapper now self-pads + applies the old wrapper's `paddingTop`
- `<ExamplesSection>`, `<StorySection>`, `<PlatformsSection>`, `<BigFeaturesSection>`, `<SocialProofSection>`, `<PricingSection>`, `<FaqSection>` — outer `<section>` self-pads
- `<OwnershipSection>`, `<AnalyticsSection>`, `<FreeMonthSection>` — outer `<section>` self-pads; their desktop `maxWidth` bumped from `1200` → `1360` to preserve the previous content width (the old `maxWidth: 1200` lived inside the 80-padded wrapper, so the effective content width was 1200; now with section padding on a 1200-bound element, content shrinks to 1040, so we widen by 2 × 80 = 160 to compensate)
- Footer inside `<SamosaytLanding>` — self-pads

Inside `<SamosaytLanding>` the outer `<div paddingLeft={padX} paddingRight={padX}>` wrapper around content is now removed. `<SamosaytLanding>`'s visual output is unchanged — sections produce the same layout because the padding moved into them.

**Symptom 2 — H1 spans use `display: inline` on mobile.** On mobile each accent phrase is now an inline span (not inline-block), so each word breaks independently and «и сам приведёт клиентов» wraps cleanly inside the 350px content area. The yellow underline highlight on «сам себя соберёт,» is desktop-only — inline has no containing block for the absolute child anyway. `textWrap` switches from `balance` to `pretty` on mobile (balance fought the new inline behaviour on narrow viewports).

### Visual diff

| Element | 0.2.5 (broken outside `<SamosaytLanding>`) | 0.2.6 |
|---|---|---|
| All non-header sections on mobile prod | content at x=0..W, no side gutter | content padded 20 each side |
| Hero H1 «и сам приведёт клиентов» on iPhone 17 Pro | last word cut off at right edge | wraps cleanly inside viewport |
| Desktop `<SamosaytLanding>` full composition | (unchanged) | identical to 0.2.5 |
| Desktop dark CTA block max-width | 1200 (inside 80px wrapper) | 1360 (with own 80px pad → effective 1200, same) |

### Migration

None. `npm i @samosite/canon@0.2.6` and rebuild.

If your prod app composes sections individually (which is exactly the case that motivated this fix), you can now drop any of the local horizontal-padding overrides you may have added as a workaround in 0.2.5 — the sections handle their own padding.

If your prod app uses `<SamosaytLanding>` as a whole, nothing changes visually.

### Back-compat

- All component signatures unchanged. Zero new props, zero removed props.
- `padX` prop on `<StickyHeader>` still works the same way (header was already self-padded in 0.2.4).
- Footer is still slim and lives inside `<SamosaytLanding>`. Section list and order in `<SamosaytLanding>` is unchanged.

---

## 0.2.5 — Hero→Examples spacing + removed duplicate free-month microcopy · 2026-05-24

Visual polish release. Two targeted copy/spacing fixes reported from prod review. No API changes. Drop-in over 0.2.4.

### 1. Reduced gap between Hero and Examples section

**File:** `src/landing/index.tsx` · `<ExamplesSection>` opening `<section>` tag.

```diff
- <section style={{ marginTop: mobile ? 60 : 96, position: 'relative', zIndex: 1 }}>
+ <section style={{ marginTop: mobile ? 32 : 48, position: 'relative', zIndex: 1 }}>
```

**Why:** prod review showed ~400px of whitespace between the Hero «Первый месяц — бесплатно» pill and the «Вот какой сайт вы получите...» heading. The Examples section is a direct continuation of the Hero promise («вот что вы получите») rather than a standalone section break, so it should sit closer.

**Impact:**
- Desktop: 96px → **48px** (–50%)
- Mobile: 60px → **32px** (–47%)

Other inter-section gaps (`StorySection`, `PlatformsSection`, etc.) are intentionally **unchanged** at 96–110px — they remain proper section breaks. Only this specific Hero→Examples seam was tightened.

### 2. Removed duplicate free-month microcopy from `<FreeMonthSection>`

**File:** `src/landing/index.tsx` · `<FreeMonthSection>` (final dark CTA block).

Removed the microcopy line that appeared under the main CTA on the dark block:

```diff
  <div style={{ marginTop: mobile ? 24 : 32, display: 'inline-flex' }}>
    <Btn iconRight={<IconArrow />} ...>Сделать {BRAND.name}</Btn>
  </div>

- {/* Microcopy */}
- <div style={{
-   marginTop: 12,
-   fontSize: mobile ? 13 : 14, color: 'oklch(0.82 0.014 60)', textWrap: 'pretty',
- }}>
-   Первый месяц — бесплатно. {BRAND.name} сам напомнит, когда подойдёт срок.
- </div>

  {/* Alt path */}
```

**Why:** the same «Первый месяц — бесплатно» promise is already communicated three other times on the page:
1. The Hero pill with gift icon and «далее 990 ₽/мес»
2. The Pricing card chip with check icon
3. The Pricing card bullet list

A fourth restating on the final dark CTA was redundant and added visual noise to a block that's supposed to be a clean, focused conversion moment.

**If prod has another «...напомнит, если решите продолжить» variant** rendered elsewhere on the page (e.g. as a `🛡` shield-icon line under the Hero pill) — that copy does not exist in canon. It's a prod-only override; remove it on the prod side or open an issue.

### Migration

None. `npm i @samosite/canon@0.2.5` and rebuild. Both changes are pure visual/copy diffs inside the existing `<Landing />` composition — no prop signatures changed, no exports added or removed.

### Visual diff summary

| Block | Before (0.2.4) | After (0.2.5) |
|---|---|---|
| Hero → Examples gap (desktop) | 96px | **48px** |
| Hero → Examples gap (mobile) | 60px | **32px** |
| FreeMonthSection microcopy under CTA | shown | **removed** |
| Other section gaps | 96–110px | unchanged |
| StickyHeader, all other components | — | unchanged |

---

## 0.2.4 — StickyHeader self-contained + nav hovers (hotfix) · 2026-05-24

Hotfix. `<StickyHeader>` no longer relies on parent padding to render correctly, and nav links now have hover states. **No API changes.** Drop-in over 0.2.3.

### Why

Prod-build report: when `<StickyHeader>` was rendered outside `<SamosaytLanding>` (i.e. on the real production page where the page shell does not match canvas padding), the bar lost its inner side paddings — the logo glued itself to the left edge of the viewport and «Сделать сайт» glued itself to the right. Reproduced verbatim from the screenshot reported in chat.

### Root cause

0.2.2/0.2.3 implemented full-bleed background by escaping the parent's `padX` with negative margins, then re-applying internal padding:

```tsx
// 0.2.3 (BROKEN outside SamosaytLanding)
marginLeft: -px, marginRight: -px,
paddingLeft: px, paddingRight: px,
```

This cancels out cleanly **only** when the parent has matching `padX` padding. Prod page shell doesn't — the negative margins pulled the bar off-canvas on both sides and content ended up flush against the viewport edges (0 → W).

### Fix

`<StickyHeader>` is now self-contained:

```tsx
// 0.2.4
width: '100%',
paddingLeft: px, paddingRight: px,
boxSizing: 'border-box',
```

No negative margins, no parent-padding dependency. Renders correctly in any wrapper — prod shell, canvas, Storybook, isolated test page.

`<SamosaytLanding>` was updated to match: the outer container no longer applies `padX` (the header now does it for itself); body content is wrapped in an inner `padX`-padded div. Visual output of `<Landing />` is identical to 0.2.3.

### Hovers

Added explicit hover states inside the header (previously the global `a[href="#hero"]:hover` rule only matched the CTA — the four nav anchors and «Войти» were inert):

- Nav links (`#how`, `#examples`, `#pricing`, `#faq`) — ink color darkens + accent underline slides in left→right
- «Войти» — ink color darkens + soft pill background (`VT.bgSoft`)
- Brand mark — subtle opacity fade; now also wrapped in `<a href="#hero">` so clicking it scrolls home

All hover styles are scoped to `.ss-sticky-header` — zero risk of bleeding into the rest of the landing.

### Back-compat

- Same props, same exports, same defaults. Drop-in over 0.2.3.
- `loginHref` and `onMakeSiteClick` from 0.2.3 unchanged.
- Visual diff inside `<Landing />`: none.
- Visual diff for standalone `<StickyHeader />` in non-padded shells: paddings now appear (this is the fix).

### Migration

None. `npm i @samosite/canon@0.2.4` and rebuild.

---

## 0.2.3 — StickyHeader props for prod-routing · 2026-05-23

Additive minor release. Two new optional props on `<StickyHeader>` so prod apps can wire it without dropping into custom forks. Zero visual diff in zero-prop / canvas mode.

### Why

0.2.2 extracted `<StickyHeader>` but two URLs stayed hardcoded:
- "Войти" → `https://samosite.online/login` (prod uses `/admin/login`)
- "Сделать сайт" → `<a href="#hero">` (prod wants to open the submission modal, not jump-anchor)

This blocked drop-in on prod — PR #132 deferred the integration. 0.2.3 fixes it.

### New props

```tsx
<StickyHeader
  mobile={false}
  padX={80}

  // NEW: override login target. Default = 'https://samosite.online/login' (canvas demo).
  loginHref="/admin/login"

  // NEW: when supplied, primary CTA renders as <button onClick={...}> instead of
  // <a href="#hero">. Use for opening your real submission modal.
  onMakeSiteClick={() => setSubmitModalOpen(true)}
/>
```

### Back-compat

Both props are optional. If you don't pass them:
- `loginHref` defaults to the canvas-demo URL (unchanged from 0.2.2)
- Primary CTA falls back to `<a href="#hero">` (unchanged from 0.2.2)

Meaning: existing zero-prop usage (`<StickyHeader />`, or inside `<Landing />` without explicit props) renders identically to 0.2.2. No regression.

### Implementation note

CTA element type changes: with `onMakeSiteClick` it's a `<button type="button">`, without it stays `<a>`. Visual is identical (same inline styles) but if you have CSS selectors like `a[href="#hero"]` — they'll stop matching when you start using `onMakeSiteClick`. Use a class or data-attr if you need a stable hook.

---

## 0.2.2 — StickyHeader extracted · 2026-05-23

Minor additive release. One new named export from `@samosite/canon/landing`. **Visual diff = 0** (same DOM, just relocated into its own function).

### What's new

- **`StickyHeader`** — sticky top nav bar (brand mark + nav links + login + primary CTA) that used to live inline inside `SamosaytLanding`. Now standalone:

```tsx
import { StickyHeader } from '@samosite/canon/landing';

<StickyHeader mobile={isMobile} padX={80} />
```

Props:
- `mobile?: boolean` — swaps the desktop link row for the compact mobile pill (default `false`)
- `padX?: number` — horizontal padding bleed for full-bleed bg under the blur. Default: `20` on mobile, `80` on desktop — same as `SamosaytLanding`.

Use case: any sub-page / marketing email preview that needs the same header as the main landing without rendering the whole landing. Also unblocks `/admin-demo` and other secondary pages from rolling their own nav.

### Carry-over from 0.2.1

- `HeroPlatformStrip` still exported (added in 0.2.1).
- Icon-cell normalization 20→22 still in effect.

---

## 0.2.1 — HeroPlatformStrip extracted · 2026-05-23

Minor additive release. One new named export, no breaking changes, no visual diff in zero-prop mode beyond a tiny icon-cell tweak (see below).

### What's new

- **`HeroPlatformStrip`** — new export from `@samosite/canon/landing`. The horizontal «IZ ЧЕГО МЫ МОЖЕМ СДЕЛАТЬ ВАМ САЙТ» chip-strip that used to live inline inside `HeroBlock` is now a standalone component. Same data (`PLATFORMS_OK`), same icons.

```tsx
import { HeroPlatformStrip } from '@samosite/canon/landing';

<HeroPlatformStrip mobile={false} />
```

Use case: rendering the platform strip outside hero (e.g., in a marketing email preview, a sub-page hero variant, or a Storybook story) without dragging in the full `<HeroBlock>` or `<Landing>` composition.

### Tiny visual change inside the strip

Icon cell normalized to fit the `YandexIcon` 22-px viewBox cleanly:

| Was (0.2.0) | Now (0.2.1) |
|---|---|
| `width: 20, height: 20` | `width: 22, height: 22` |
| `borderRadius: 6` | `borderRadius: 7` |
| `padding: '5px 11px 5px 5px'` | `padding: '4px 12px 4px 4px'` |
| no `overflow` | `overflow: hidden` |

Net visible delta: chip is ~1 px taller / 1 px wider per platform; YandexIcon no longer overflows. If you've pinned pixel-diff baselines against 0.2.0 hero, regenerate them.

---

## 0.2.0 — admin interactive variants (stable) · 2026-05-23

Second half of the interactive-admin refactor per [`CANON_ADMIN_INTERACTIVE_TZ`](../uploads/CANON_ADMIN_INTERACTIVE_TZ.md). All 6 admin-ops components are now fully controlled and drop-in for production. Combined with 0.2.0-alpha.1, this completes the 10-admin-screen contract.

### What's new (admin-ops)

All components follow the same controlled pattern as admin-core: `data?` (with mock fallback for canvas), `loading?`, `error?`, plus per-component callbacks. See `@samosite/canon/admin-ops/types.ts` for full prop interfaces — they've been ready since 0.2.0-alpha.1.

- **`SitesList`** (`S14_SitesList`) · ТЗ §3.5
  - Filter chips: `all | published | pending_review | paused | archived`
  - 6 columns: subdomain (+ custom_domain badge if set), source_type, source_url, status, last_synced_at, →
  - Skeleton rows, empty state, pagination
  - `onRowClick(siteId)`, `onStatusFilterChange`, `onPageChange(offset, limit)`
- **`SiteDetail`** (`S15_SiteDetail`) · ТЗ §3.6
  - `previewUrl` prop — renders real `<iframe sandbox="allow-same-origin allow-scripts allow-popups-to-escape-sandbox">`. Without it, canvas-mode shows static mini-preview.
  - 6 actions wired to `onAction(siteId, action)` with status-aware enable/disable matrix (see `actionEnabled()`)
  - `actionLoading: SiteAction | null` — spinner shown only on the in-flight button
  - Leads count panel with "Все лиды →" link emitting `onAction(id, 'view_leads')`
  - Source/sync info panel
- **`Leads`** (`S16_Leads`) · ТЗ §3.7 — PII-sensitive
  - **List view never shows plaintext.** Columns: id, site_id, ip_prefix, status, created_at. No name/phone/message column at all.
  - Multi-select checkboxes per row + select-all in header
  - "Расшифровать (N)" button — disabled until `selectedLeadIds.length > 0`
  - **NEW: Decrypt modal.** TOTP-gated overlay (real `<input inputMode="numeric" maxLength={6}>`), submits via `onDecryptSubmit(leadIds, totp)`. On success the modal flips to a read-view showing decrypted rows; "Закрыть" resets `decryptedRows` to `null` and plaintext leaves the DOM.
  - Both controlled (parent owns selection + modal state) and uncontrolled (canvas demo) modes
  - Inline audit warning: "Все расшифровки логируются в audit-log…"
- **`Waitlist`** (`S17_Waitlist`) · ТЗ §3.8
  - Renders `items` already sorted by parent (per ТЗ acceptance)
  - `data.threshold` (was hardcoded 10) drives the "≥ N · ПОРА" badge and the visual divider between ready/below-threshold groups
  - `onMarkInDevelopment(sourceName)` callback on "В разработку" button (was hardcoded "Уведомить waitlist")
  - Empty state when `items=[]`
- **`FeedbackInbox`** (`S18_FeedbackInbox`) · ТЗ §3.9
  - Type filter chips: `all | source_request | feature_request | bug | general` (из mock-hárd-coded в controlled)
  - Real `<input type="search">` — fires `onSearchChange(q)`, parent debounces
  - List rows are real `<button>` with `aria-selected` highlight
  - Detail panel auto-selects first item when `selectedId` not yet set; clicking a row updates internal `selectedId` + calls `onRowClick(id)` for parent
  - Empty state when inbox is empty
  - `checkboxes` JSONB is rendered as collapsible `<details>` block when present
  - Pagination shown only if `onPageChange` provided
- **`Settings`** (`S19_Settings`) · ТЗ §3.10
  - **Replaced** "Health checks / Secrets rotation / Admin actions" cards (which weren't in the TZ data shape) with the 4 sections from `SettingsData`:
    - Среда — environment badge (DEV/STAGING/PROD with semantic colour) + log_level
    - Базовые URL — app, landing, sites_base_domain (mono, never any secret values)
    - Feature flags — max_bot, auto_sync as `on/off` badges
    - Внешние сервисы — 6 services as paired "настроен / не настроен" badges
  - Canvas back-compat: zero-prop call renders the same 4 cards with mock data (the old Health/Secrets/AdminActions layout is gone — see migration note below)
  - **NEW design surface:** `<ConfiguredBadge on label>` — green check or amber warning
  - **NEW design surface:** `<KeyValueRow label>` — dashed-bottom row with right-aligned value
  - `onRefresh` button visible only when callback provided

### Shared surfaces (still in `@samosite/canon/admin-core`)

All re-exports (`SkeletonBlock`, `EmptyState`, `ErrorBlock`, `FilterChip`, `TrendChart`) are consumed by admin-ops via internal import — they're public API for your code too. `RateLimitCountdown` stays admin-core only (only used by `AdminLogin`).

### Migration notes

1. **`SitesList` columns changed.** Old canon: subdomain + contact + plan + status + last_sync + leads_7d. New: subdomain + source_type + source_url + status + last_synced_at. `contact` and `plan` live in `UserRow` (which `SitesList` doesn't have), `leads_7d` doesn't exist in `SiteRow` per ТЗ §3.5. If your old prod table relied on those columns, fetch them separately and render a custom column — or stick with 0.1.x for sites view until your schema catches up.
2. **`SitesList` 4-tile KPI strip removed.** The old canon had "Активных / Sync paused / Архивных / Лидов за 7д" tiles on top. Not in ТЗ data shape, dropped. Use `AdminDashboard` for KPIs.
3. **`SiteDetail` actions consolidated.** Old canon had "Архив / Pause sync / Re-publish" hardcoded. New uses status-aware 6-action matrix (publish, republish, pause_sync, resume_sync, archive, unarchive). Status → enabled actions:
   - `pending_review` → publish
   - `published` → republish + pause_sync + archive
   - `paused` → resume_sync + archive
   - `archived` → unarchive
4. **`Leads` table columns rewritten.** Old canon: site + name + contact + message + ts + decrypt-button. New: id + site_id + ip_prefix + status + ts. **Plaintext name/phone/message are intentionally absent** — they only appear in the decrypt-modal success view, never in the table. This is a security fix (see SECURITY.md §T4.3) and aligns with ТЗ §3.7. Stick with 0.1.x if you need the old leaky table for any reason — but really, don't.
5. **`Settings` page rewritten.** Old canon showed Health checks (DB/Redis/S3 ping latencies), Secrets rotation table, Admin actions log. Those are out of `SettingsData` per ТЗ §3.10 — they live in different endpoints. Build separate `<HealthChecks>` / `<SecretsRotation>` / `<AdminActions>` components if you still want them; they're not in canon 0.2.
6. **Decrypt modal is now in `Leads` itself.** No separate `<LeadsDecryptModal>` export — see ТЗ OQ-1 resolution.

### Acceptance status (per CANON_ADMIN_INTERACTIVE_TZ §6 — final)

- [x] All 12 components (10 screens + AdminChrome + 2 utilities) accept new props per §3
- [x] Zero-prop call of each = mock-mode (canvas back-compat preserved)
- [x] TypeScript prop interfaces exported for all 12; `admin-ops/types.ts` aligned with runtime
- [x] CHANGELOG updated
- [x] Loading / empty / error states designed and implemented across the board
- [x] AdminLogin rate-limit countdown
- [x] Leads decrypt modal with TOTP gate + success read-view
- [x] No new runtime dependencies (still React 19 peer only)
- [x] `_embed?: false` escape hatch on every chrome-wrapped screen so they can be rendered inside your own `<AdminChrome>`
- [ ] `npm run build` clean — verify on consumer side after refresh
- [ ] Storybook stories — out of scope (use canvas mode in `canon/index.html`)

---

## 0.2.0-alpha.1 — admin-core interactive variants · 2026-05-23

First alpha of the interactive-admin refactor per [`CANON_ADMIN_INTERACTIVE_TZ`](../uploads/CANON_ADMIN_INTERACTIVE_TZ.md). All 5 admin-core components are now fully controlled and drop-in for production — founder can actually log in, navigate, approve/reject. Admin-ops is types-only in this alpha.

### What's new

#### Interactive admin-core (ТЗ §3.1–3.4 + §3.11–3.12)

- **`AdminLogin`** (`S10_AdminLogin`)
  - Real `<input type="text">` / `<input type="password">` / `<input type="text" inputMode="numeric">` instead of `<span>` placeholders
  - 2-step controlled flow: step 1 (credentials) → step 2 (TOTP or backup code)
  - Mode toggle between TOTP and backup code on step 2
  - "← Назад" button on step 2 → `onStepChange(1)` (preserves entered data)
  - `loading`, `error`, `rateLimited`, `rateLimitedRetryAfterSeconds` props
  - Inline error block for all 6 error codes (`invalid_credentials`, `invalid_challenge`, `invalid_code`, `rate_limited`, `network_error`, `unknown_error`)
  - **NEW design surface:** `<RateLimitCountdown>` — live MM:SS countdown overlay
- **`AdminChrome`**
  - Real `<button>` nav items (not `<a>`) emitting `onNavigate(section)`
  - `user` prop (`{username, initials}`) — defaults to mock for canvas
  - `onLogout` callback wired to "выйти" link
  - `badgeCounts: Partial<Record<section, number>>` — replace hardcoded "12" badge
  - Legacy `active='dash'` aliased to `'dashboard'` for canvas back-compat
- **`AdminDashboard`** (`S11_Dashboard`)
  - 5 KPI tiles (was 4) per ТЗ data shape: `apps_total`, `apps_pending`, `sites_published`, `leads_total`, `feedback_total`
  - 14-day trend chart (was 7-day) — uses `data.applications_series_14d`
  - `loading` → skeleton tiles + skeleton chart (no layout shift)
  - `error` → `<ErrorBlock>` with `onRetry` wired to `onRefresh`
  - Click on KPI tile → `onNavigate(section)`
  - "все →" link on Pending widget → `onNavigate('apps')`
- **`AppsList`** (`S12_AppsList`)
  - `data` prop with full `{total, items, limit, offset}` envelope
  - `statusFilter` (`all|pending|approved|rejected`) + `onStatusFilterChange`
  - `onPageChange(offset, limit)` for pagination
  - `onRowClick(appId)` — rows are real `<tr>` with keyboard support
  - `loading` → 10 skeleton rows of same height (no layout shift)
  - Empty: `<EmptyState title="Пока нет заявок" hint="…" />`
  - **All PII rendered masked only** — no raw `phone`/`email` in this component ever
- **`AppDetail`** (`S13_AppDetail`)
  - `data: {application, user, consent}` envelope
  - `onApprove(id)` / `onReject(id, reason?)` / `onBack` callbacks
  - **Inline reject reason form** — opens on "Отклонить" click, textarea + cancel/confirm
  - Action bar conditionally enabled: only when `status === 'pending'`
  - **NEW panels:** User panel (plan badge + plan_until) and Consent panel (policy_version + created_at)
  - `actionLoading` / `actionError` for in-flight approve/reject
  - Source URL is now `<a href target="_blank" rel="noreferrer">`
  - Loading state replaces full view with skeletons

#### Shared design surfaces (NEW)

Re-exported from `@samosite/canon/admin-core` and reusable by admin-ops (or your own code):

- `<SkeletonBlock width height radius>` — shimmer block, animation defined in `<CanonStyles />`
- `<EmptyState title hint>` — centred placeholder for empty lists
- `<ErrorBlock title message onRetry>` — inline alert in `danger-soft` palette
- `<RateLimitCountdown retryAfterSeconds>` — self-managed MM:SS countdown timer

#### TypeScript

- `@samosite/canon/admin-core` exports prop interfaces for all 5 components + utilities (`AdminLoginProps`, `AdminLoginError`, `AdminLoginStep`, `AdminLoginMode`, `AdminDashboardProps`, `AdminDashboardData`, `AdminDashboardSection`, `AppsListProps`, `AppsListData`, `ApplicationRow`, `ApplicationStatus`, `AppDetailProps`, `AppDetailData`, `UserRow`, `ConsentRow`, `AdminChromeProps`, `AdminChromeSection`, `AdminUser`, `StatusPillProps`, `StatusPillStatus`, `StatTileProps`, `ContactType`, `SourceType`, `SkeletonBlockProps`, `EmptyStateProps`, `ErrorBlockProps`, `RateLimitCountdownProps`)
- `@samosite/canon/admin-ops` exports prop interfaces for all 6 future components (`SitesListProps`, `SiteDetailProps`, `LeadsProps`, `WaitlistProps`, `FeedbackInboxProps`, `SettingsProps` + all related data shapes). **Types only — runtime components still on 0.1.x presentational API in this alpha.** See "What's NOT in this alpha" below.

#### Other

- `styles.css` — added `@keyframes vt-shimmer` (used by `<SkeletonBlock>`)
- `<CanonStyles />` re-baked with shimmer keyframe

### Back-compat (ТЗ §2.5)

Zero-prop calls of every component still render the baked mock data exactly as in 0.1.x — the design canvas (`canon/index.html`) continues to work unchanged. No `npm` consumers should be affected unless they were depending on element types (`<a>` → `<button>` change in `AdminChrome` nav).

### What's NOT in this alpha (deferred to 0.2.0)

- `SitesList`, `SiteDetail`, `Leads` (+ decrypt modal), `Waitlist`, `FeedbackInbox`, `Settings` — runtime still presentational. Types shipped early so you can write code against the stable contract. Founder can still operate these surfaces via DB until 0.2.0 stable lands.
- Mobile collapse (hamburger) for `AdminChrome` — current sidebar still hides at <768px through CSS only; explicit hamburger UI is deferred.
- Confirm dialog for destructive actions — use `window.confirm()` until 0.3.

> ⚠️ Все admin-ops пункты выше **реализованы в 0.2.0** — см. сверху.

### Breaking changes (none expected)

- `AdminChrome` nav items changed from `<a>` to `<button>`. If your code styles them via `a[role="nav-item"]` or similar — switch to a class or data-attribute selector.
- `AdminDashboard` grid changed from 4 to 5 KPI tiles. If you wrapped it at fixed width <1180px, expect tighter tiles.
- Both above changes are visible in **zero-prop canvas mode too** — if you were pixel-diffing against 0.1.x screenshots, regenerate baselines from 0.2.0-alpha.1 first.

### Acceptance status (per CANON_ADMIN_INTERACTIVE_TZ §6)

- [x] AdminChrome, AdminLogin, AdminDashboard, AppsList, AppDetail accept new props per §3
- [x] Zero-prop call of each = mock-mode (canvas back-compat)
- [x] TypeScript prop interfaces exported for ALL 12 (admin-core impl + admin-ops types-only)
- [x] CHANGELOG.md updated
- [x] Loading / empty / error states designed and implemented (admin-core)
- [x] AdminLogin rate-limit countdown implemented
- [x] No new runtime dependencies (still React 19 peer only)
- [ ] Decrypt modal for Leads — deferred to 0.2.0
- [ ] admin-ops runtime — deferred to 0.2.0
- [ ] `npm run build` clean — to verify on consumer side after refresh
- [ ] Storybook stories — out of scope (use canvas mode in `canon/index.html`)

---

## 0.1.0 — initial release · 2026-05-23

First mechanically-converted release from the canon JSX prototypes in the `vitrina ui` design project. **All values come from canon files unchanged** — this is a transport-layer release, not a redesign.

### What works

- All 19 screens from `SCREEN_INDEX.md` are exported and importable
- Tokens (`VT`, `BRAND`, flat `tokens` per ТЗ §2.3)
- Primitives (`Eyebrow`, `Mono`, `Card`, `Btn`, `Input`, `Badge`, `Checkbox`, `Logo`, `BrandMark`, `IconArrow`, `IconLink`, `Spinner`)
- `<CanonStyles />` provider + standalone `styles.css` (ТЗ §2.4)
- Tailwind preset (`@samosite/canon/tailwind-preset`, ТЗ §2.5)
- TypeScript types (loose — `strict: false`, public API is best-effort typed)

### Known gaps vs ТЗ §2.1

- `StickyHeader` and `Footer` are inlined inside `SamosaytLanding`, not standalone exports. Use `<Landing />` (full composition) or extract them in a future minor.
- `S4_TGBotInvite` from the original canon is exported via `intake/` (not aliased to a TZ name — there was no clear target in §2.1 for it).
- Section-name aliases follow ТЗ §2.1: `HeroSection ⇔ HeroBlock`, `SubmitModal ⇔ S3_SubmitModal`, etc. Raw `S*_*` names also exported for back-compat.

### Conversion notes

- IIFE wrappers (`if (!window.__xxx) { … }`) stripped
- `window.VT` / destructured globals (`const { Btn, Card, … } = window`) stripped — replaced with proper ES imports
- `Object.assign(window, { … })` replaced with `export { … }`
- All `'use client'` directives added (Next.js 16 App Router)
- One stray `<window.BrandMark>` JSX reference in `intake` fixed to `<BrandMark>`
- One `const { useState, useMemo } = React` collision in `admin-demo` removed (we already destructure those from the `import`)
- Inline styles **preserved as-is** — this is the design specification, not legacy code
