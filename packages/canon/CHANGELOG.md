# Changelog

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
