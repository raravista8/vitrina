# Changelog

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
