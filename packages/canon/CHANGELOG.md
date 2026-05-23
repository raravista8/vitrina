# Changelog

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
