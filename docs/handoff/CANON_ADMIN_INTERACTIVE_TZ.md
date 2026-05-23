# ТЗ — `@samosite/canon` 0.2.0: interactive admin variants

> **Адресат:** Claude Design (design team, авторы canon-package).
> **Не новый npm.** Это extension существующего пакета `@samosite/canon` —
> добавить props/callbacks к уже экспортирующимся admin-компонентам так
> чтобы они стали drop-in для прода (как уже сработало для landing
> sections 2-10 и `<ClientAdminDemo />`).
>
> **TL;DR.** Текущие 10 admin экранов в canon — pure presentational:
> `<input>` рендерится как `<span>` placeholder, `<button>` — как `<a
> href>` anchor, данные забейканы внутри. Это специально (canon = visual
> spec, не код). Но это и блокирует drop-in на `landing/app/admin/*`:
> если founder не может ввести password и нажать «Войти» — он закрыт от
> бизнеса.
>
> Этот TZ просит **те же 10 компонентов** обернуть в новый props-контракт
> где: data приходит снаружи, события (input/click/submit) поднимаются
> через callbacks. Визуал не меняется. Версия пакета бампается до 0.2.0
> (semver-major — props стали обязательными).

---

## 0. Контекст и текущее состояние

После релизов 0.1.x и интеграции в прод (PR'ы #119-#124 в `raravista8/vitrina`):

- **Что заработало drop-in:** 9 секций лендинга + `<ClientAdminDemo />`
  (публичная демо ЛК) + `<CustomerSite scheme={...} />` для preview
  палитр. Drift = 0 by construction, design canvas → npm → prod, без
  пере-вёрстки. См. `docs/handoff/VISUAL_COVERAGE.md`.

- **Что не заработало drop-in:** Hero (input/CTA — кликабельные), весь
  настоящий `/admin/*` (auth/CRUD), Intake (POST + polling). См.
  `docs/handoff/CANON_SWAP_PLAN.md`.

Для всех «не drop-in» сёрфейсов canon уже **экспортирует визуальный
скелет** (`HeroBlock`, `AdminLogin`, `SubmitModal` etc.) — просто без
интерактивности. Этот TZ решает задачу для admin как наиболее
структурированной части (10 экранов с понятным data-contract'ом, в
отличие от Hero где state-machine завязана на нашу captcha + 9 source
adapters).

---

## 1. Скоуп

### 1.1. Что входит

10 founder-side admin компонентов из текущих entry-points:

**`@samosite/canon/admin-core`** (5 экранов + 2 утилиты):

- `AdminLogin` (alias of `S10_AdminLogin`)
- `AdminDashboard` (alias of `S11_Dashboard`)
- `AppsList` (alias of `S12_AppsList`)
- `AppDetail` (alias of `S13_AppDetail`)
- `AdminChrome` (layout — sidebar + topbar + main slot)
- `StatusPill` (статус-тег, переиспользуется в 4 экранах)
- `StatTile` (KPI-тайл с delta, переиспользуется в 2 экранах)

**`@samosite/canon/admin-ops`** (6 экранов):

- `SitesList` (S14)
- `SiteDetail` (S15)
- `Leads` (S16)
- `Waitlist` (S17)
- `FeedbackInbox` (S18)
- `Settings` (S19)

### 1.2. Что НЕ входит (явно out of scope)

- **`ClientAdminDemo`** (public `/admin-demo`) — уже работает drop-in,
  not touch
- **Любые backend-стороны** — auth, fetch, mutations, routing остаются
  у consumer'а (нас). Canon не должен подключаться к API или знать
  про fetch
- **State management внутри компонентов** — никаких useState для
  data/loading/error. Всё контролируется родителем через props
- **i18n** — UI strings остаются в каноне (RU), не выделяются в keys
- **Permissions / RBAC логика** — все компоненты предполагают что
  consumer уже залогинен и пускает их только для admin (наш
  `require_admin` middleware)
- **Dark mode** — не нужно
- **Animations / transitions сверх текущих** — не нужно (текущие
  hover/focus/pulse через `<CanonStyles />` достаточны)

---

## 2. Общие требования

### 2.1. «Controlled vs uncontrolled»

Все компоненты должны быть **fully controlled**: внешний родитель
держит state, передаёт через props, получает события через callbacks.

```tsx
// ❌ так нельзя (текущий canon):
function AdminLogin({ step = 1 }) {
  // step управляется только initial prop, нет setStep, нет onChange
  // нет input — рендерится span
  // нет onClick — рендерится <a href>
}

// ✅ так должно быть в 0.2.0:
function AdminLogin({
  step,                    // 1 | 2 — родитель контролирует
  onStepChange,            // (step) => void — для «Назад» с TOTP-экрана
  username, password, totp, backupCode,
  onUsernameChange, onPasswordChange, onTotpChange, onBackupCodeChange,
  mode,                    // 'totp' | 'backup' — какой код вводится на step 2
  onModeChange,            // (mode) => void
  onSubmitCredentials,     // (username, password) => void | Promise<void>
  onSubmitCode,            // (kind, code) => void | Promise<void>
  loading,                 // bool — disables submit + показывает spinner
  error,                   // string | null — отображается как inline error
  rateLimited,             // bool — overlay «попробуйте через X»
  rateLimitedRetryAfterSeconds, // number | null
})
```

### 2.2. TypeScript prop interfaces

Каждый компонент экспортирует `<Name>Props` interface рядом с самим
компонентом. Например:

```ts
// from '@samosite/canon/admin-core'
export interface AdminLoginProps { /* ... */ }
export interface AdminDashboardProps { /* ... */ }
export const AdminLogin: React.FC<AdminLoginProps>;
```

`strict: true` в `tsconfig.json` пакета — все props типизированы
(сейчас канон сам по себе `strict: false`, это можно сохранить для
internal кода, но **типы public API должны быть строгими**).

### 2.3. Loading / error / empty states

Каждый компонент с данными должен корректно рендериться в трёх
состояниях:

| Состояние | Что показывать |
|---|---|
| `loading=true` | Skeleton-rows / spinner — но **тот же layout** (без layout-shift) |
| `error !== null` | Inline error block в текущей канон-визуальной палитре `accent-soft` |
| `data is empty` (e.g. apps=[]) | Empty-state с микрокопией («Пока нет заявок») в том же layout-slot'е |

Канон сейчас не покрывает loading/empty — нужно дизайнерское решение
ддя этих состояний.

### 2.4. Accessibility

Inputs должны быть настоящими `<input>` с `aria-label` или
ассоциированным `<label>`. Buttons — настоящими `<button>` (не
`<a href>`). Focus-стиль уже задан в `<CanonStyles />` (1px terracotta
ring) — нужно убедиться что он применяется к новым кликабельным
элементам.

### 2.5. Back-compat для design canvas

Сейчас в дизайн-канвасе компоненты импортируются с zero props
(`<S11_Dashboard />`). Это должно продолжать работать как **read-only
демо-режим**: если ни один из data/callback props не передан, компонент
рендерится с baked mock data (как сейчас) — для canvas-режима.

```tsx
// canvas mode — рендерит mock-data (как сейчас в canon)
<AdminDashboard />

// prod mode — реальные данные снаружи
<AdminDashboard data={...} loading={...} onNavigate={...} />
```

Реализация: `data?: AdminDashboardData` — optional с default = baked mock.

Это сохраняет «design canvas как single source of truth для визуала»,
но позволяет drop-in в прод.

### 2.6. Versioning

- `package.json`: `"version": "0.2.0"`
- `CHANGELOG.md`: «**0.2.0 — admin interactive variants**» + полный
  список добавленных props per component
- Semver semantics: minor bump (0.1.x → 0.2.0) потому что добавление
  optional props — НЕ breaking. Если же делать обязательные props (что
  чище) — major bump до 1.0.0
- **Рекомендация:** 0.2.0 с optional props + back-compat zero-prop
  mode. Permits incremental migration

---

## 3. Per-component spec

### 3.1. `AdminLogin` (S10)

Скрин логина: 2 шага (password → TOTP/backup). Rate-limit overlay.

**Props interface:**

```ts
export type AdminLoginStep = 1 | 2;
export type AdminLoginMode = 'totp' | 'backup';
export type AdminLoginError =
  | null
  | 'invalid_credentials'
  | 'invalid_challenge'
  | 'invalid_code'
  | 'rate_limited'
  | 'network_error'
  | 'unknown_error';

export interface AdminLoginProps {
  step?: AdminLoginStep;
  onStepChange?: (step: AdminLoginStep) => void;

  // Step 1 fields
  username?: string;
  password?: string;
  onUsernameChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onSubmitCredentials?: (username: string, password: string) => void | Promise<void>;

  // Step 2 fields
  mode?: AdminLoginMode;
  onModeChange?: (mode: AdminLoginMode) => void;
  totp?: string;
  backupCode?: string;
  onTotpChange?: (value: string) => void;
  onBackupCodeChange?: (value: string) => void;
  onSubmitCode?: (kind: AdminLoginMode, code: string) => void | Promise<void>;

  // Status
  loading?: boolean;
  error?: AdminLoginError;
  rateLimited?: boolean;
  rateLimitedRetryAfterSeconds?: number | null;
}
```

**Backend reference (`backend/app/admin/routers/api.py`):**

- Step 1 → `POST /admin/api/login {username, password}` → `{ok: true,
  data: {challenge_id, expires_in}}` (challenge передаётся как state
  внутри родителя, в canon не нужен) или `401 {detail:
  "invalid_credentials"}`
- Step 2 TOTP → `POST /admin/api/login/totp {challenge_id, code}` → 200
  + Set-Cookie OR 401 `invalid_code` / `invalid_challenge`
- Step 2 backup → `POST /admin/api/login/backup {challenge_id, code}` →
  same shape
- Rate-limit: `429 Retry-After: <seconds>` (consumer считает retry и
  передаёт `rateLimitedRetryAfterSeconds`)

**Acceptance:**

- [x] Step 1: реальные `<input type="text">` для username, `<input
  type="password">` для password. `<button type="submit">` для CTA
- [x] Step 2: реальный input для 6-8 digit TOTP/backup code (с
  `inputMode="numeric"` где уместно)
- [x] Toggle между TOTP / backup mode (вкладка или sub-link)
- [x] Кнопка «Назад» на step 2 вызывает `onStepChange(1)`
- [x] При `loading=true` — submit disabled, spinner inline в кнопке
- [x] При `error='invalid_credentials'` — inline error под формой,
  поля сохраняются
- [x] При `rateLimited=true` — overlay/inline-banner с countdown из
  `rateLimitedRetryAfterSeconds`
- [x] Zero-prop вызов `<AdminLogin />` — рендерит mock step 1 как сейчас

---

### 3.2. `AdminDashboard` (S11)

KPI tiles + 14-day trend chart.

**Data shape (matches `GET /admin/api/dashboard` envelope):**

```ts
export interface AdminDashboardData {
  counters: {
    apps_total: number;
    apps_pending: number;
    sites_published: number;
    leads_total: number;
    feedback_total: number;
  };
  applications_series_14d: Array<{
    day: string;   // ISO date "2026-05-23"
    count: number;
  }>;
}
```

**Props:**

```ts
export type AdminDashboardSection =
  | 'dashboard' | 'apps' | 'sites' | 'leads'
  | 'waitlist' | 'feedback' | 'settings';

export interface AdminDashboardProps {
  data?: AdminDashboardData;
  loading?: boolean;
  error?: string | null;
  onNavigate?: (section: AdminDashboardSection) => void;
  onRefresh?: () => void;
}
```

**Acceptance:**

- [x] 5 KPI tiles (apps total / pending / sites published / leads /
  feedback) считываются из `data.counters`
- [x] Trend chart (sparkline или mini-bar) рисуется из
  `data.applications_series_14d`
- [x] При `data=undefined` — рендерит mock 14-day data как сейчас
- [x] Loading: skeleton tiles, без layout shift
- [x] Empty (counter=0): tile показывает «0» нормально, не «—»
- [x] Click на KPI tile → `onNavigate('apps' | 'sites' | ...)`

---

### 3.3. `AppsList` (S12)

Paginated table заявок с filter + search.

**Data shape (matches `GET /admin/api/apps`):**

```ts
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export type ContactType = 'telegram' | 'phone' | 'email' | 'max';
export type SourceType =
  | 'yandex_maps' | 'telegram' | 'twogis' | 'avito' | 'website'
  | 'vk' | 'instagram' | 'whatsapp' | 'youtube' | 'photos' | 'unknown';

export interface ApplicationRow {
  id: string;
  source_type: SourceType;
  source_url: string | null;
  contact_type: ContactType;
  contact_value_masked: string;  // "a***@gmail.com", "+7***1234", "@us***er"
  status: ApplicationStatus;
  rejection_reason: string | null;
  is_manual_review: boolean;
  user_id: string | null;
  created_at: string;            // ISO
}

export interface AppsListData {
  total: number;
  items: ApplicationRow[];
  limit: number;
  offset: number;
}
```

**Props:**

```ts
export interface AppsListProps {
  data?: AppsListData;
  loading?: boolean;
  error?: string | null;

  // Filters
  statusFilter?: ApplicationStatus | 'all';
  onStatusFilterChange?: (status: ApplicationStatus | 'all') => void;

  // Pagination
  onPageChange?: (offset: number, limit: number) => void;

  // Row interaction
  onRowClick?: (appId: string) => void;
}
```

**Acceptance:**

- [x] Status filter chips (`all | pending | approved | rejected`) —
  active highlights через `<StatusPill>`
- [x] Table rows кликабельны → `onRowClick(id)`
- [x] Pagination footer (Prev/Next + page indicator) из `total / limit
  / offset`
- [x] При `loading=true` — skeleton rows той же высоты что real rows
- [x] Empty: «Пока нет заявок» в центре table area
- [x] PII fields рендерятся **только masked** (canon никогда не видит
  raw plaintext)

---

### 3.4. `AppDetail` (S13)

Single-application drill-down: source snapshot + user + consent +
publish/reject actions.

**Data shape (matches `GET /admin/api/apps/{id}`):**

```ts
export interface UserRow {
  id: string;
  contact_type: ContactType;
  contact_value_masked: string;
  plan: 'trial' | 'pro' | 'free';
  plan_until: string | null;
}

export interface ConsentRow {
  id: string;
  policy_version: number;
  created_at: string;
}

export interface AppDetailData {
  application: ApplicationRow;
  user: UserRow | null;
  consent: ConsentRow | null;
}
```

**Props:**

```ts
export interface AppDetailProps {
  data?: AppDetailData;
  loading?: boolean;
  error?: string | null;

  // Actions
  onApprove?: (appId: string) => void | Promise<void>;
  onReject?: (appId: string, reason?: string) => void | Promise<void>;
  onBack?: () => void;

  // Action state
  actionLoading?: boolean;
  actionError?: string | null;
}
```

**Acceptance:**

- [x] Header section: source URL (clickable, `target="_blank"
  rel="noreferrer"`), contact (masked), created_at в локальной timezone
- [x] User panel: plan badge, contact-masked, plan_until
- [x] Consent panel: policy_version + created_at (если есть)
- [x] Action bar: «Одобрить» + «Отклонить» buttons
  - При `application.status = 'pending'` оба активны
  - Иначе оба disabled с подписью «Уже {approved|rejected}»
- [x] «Отклонить» открывает inline reason input (optional), submit →
  `onReject(id, reason)`
- [x] Loading / actionLoading — disable buttons, spinner

---

### 3.5. `SitesList` (S14)

Paginated table опубликованных сайтов с sync-статусом.

**Data shape (matches `GET /admin/api/sites`):**

```ts
export type SiteStatus =
  | 'draft' | 'generating' | 'pending_review' | 'published'
  | 'paused' | 'archived';

export interface SiteRow {
  id: string;
  user_id: string;
  subdomain: string;
  custom_domain: string | null;
  source_type: SourceType;
  source_url: string;
  status: SiteStatus;
  last_synced_at: string | null;
  published_at: string | null;
  created_at: string;
}

export interface SitesListData {
  total: number;
  items: SiteRow[];
  limit: number;
  offset: number;
}
```

**Props:**

```ts
export interface SitesListProps {
  data?: SitesListData;
  loading?: boolean;
  error?: string | null;

  statusFilter?: SiteStatus | 'all';
  onStatusFilterChange?: (status: SiteStatus | 'all') => void;

  onPageChange?: (offset: number, limit: number) => void;
  onRowClick?: (siteId: string) => void;
}
```

**Acceptance:** аналогично AppsList. Дополнительно — `<StatusPill>`
показывает 6 значений (draft/generating/pending_review/published/paused/archived)
с разными цветами per `StatusPill` mapping.

---

### 3.6. `SiteDetail` (S15)

Single-site view: preview iframe + actions (publish / pause sync /
archive).

**Data shape (matches `GET /admin/api/sites/{id}`):**

```ts
export interface SiteDetailData {
  site: SiteRow;
  leads_count: number;
}
```

**Props:**

```ts
export type SiteAction =
  | 'publish' | 'republish' | 'pause_sync' | 'resume_sync'
  | 'archive' | 'unarchive';

export interface SiteDetailProps {
  data?: SiteDetailData;
  loading?: boolean;
  error?: string | null;

  previewUrl?: string;   // полный URL для iframe (e.g. https://studia-anna.samosite.online)
  onAction?: (siteId: string, action: SiteAction) => void | Promise<void>;
  onBack?: () => void;
  actionLoading?: SiteAction | null;
}
```

**Acceptance:**

- [x] Preview pane — `<iframe src={previewUrl}>` с `sandbox` атрибутом
  (`allow-same-origin allow-scripts`) если previewUrl задан
- [x] Action toolbar — кнопки по 6 actions, disabled per текущий status
  (e.g. «Publish» только если status='pending_review')
- [x] Leads count badge — clickable → переход на Leads с filter site_id
- [x] Manage actions emit `onAction(id, action)` — родитель fetch'ит,
  обновляет data, передаёт обратно
- [x] При `actionLoading='publish'` — кнопка «Publish» показывает
  spinner, остальные disabled

---

### 3.7. `Leads` (S16)

PII-sensitive table лидов с masked-by-default view + bulk-decrypt
modal gated by fresh TOTP.

**Data shapes:**

```ts
// from GET /admin/api/leads
export interface LeadRowMasked {
  id: string;
  site_id: string;
  status: 'new' | 'read' | 'archived';
  ip_prefix: string | null;     // "85.140.0.0/16"
  created_at: string;
}

export interface LeadsListData {
  total: number;
  items: LeadRowMasked[];
  limit: number;
  offset: number;
}

// from POST /admin/api/leads/decrypt-bulk
export interface LeadRowDecrypted {
  id: string;
  site_id: string;
  name: string | null;
  phone: string | null;
  message: string | null;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}
```

**Props:**

```ts
export interface LeadsProps {
  data?: LeadsListData;
  loading?: boolean;
  error?: string | null;

  siteFilter?: string | null;   // site_id
  onSiteFilterChange?: (siteId: string | null) => void;
  onPageChange?: (offset: number, limit: number) => void;

  // Bulk decrypt modal
  selectedLeadIds?: string[];
  onSelectLead?: (leadId: string, selected: boolean) => void;
  onClearSelection?: () => void;
  onOpenDecryptModal?: () => void;

  decryptModalOpen?: boolean;
  decryptTotp?: string;
  onDecryptTotpChange?: (value: string) => void;
  onDecryptSubmit?: (leadIds: string[], totpCode: string) => void | Promise<void>;
  onDecryptCancel?: () => void;
  decryptedRows?: LeadRowDecrypted[] | null;  // null until submit, populated after
  decryptLoading?: boolean;
  decryptError?: string | null;
}
```

**Acceptance:**

- [x] List view — **никогда не показывает** name/phone/message в plaintext.
  Только id, site_id, ip_prefix, status, created_at
- [x] Multi-select checkbox per row, до 50 на batch (validated by parent)
- [x] «Расшифровать (N)» button — disabled пока `selectedLeadIds.length=0`,
  открывает modal
- [x] Modal: input «TOTP-код» (`inputMode="numeric"`, 6 digits) + кнопки
  «Расшифровать» / «Отмена»
- [x] При успехе — `decryptedRows` заполнен, modal превращается в read-view
  (показывает plaintext) с явной кнопкой «Закрыть» (после закрытия —
  decryptedRows reset to null родителем)
- [x] Inline warning: «Все расшифровки логируются в audit-log (admin_actions)»

**Security note для дизайнера:** plaintext рендерится в DOM **только**
в decrypt-modal-success view. Никаких других путей. См. SECURITY.md
§T4.3 / §A07 / §B7.

---

### 3.8. `Waitlist` (S17)

Aggregated source-request feedback. ≥10 votes → highlight + «готов».

**Data shape (matches `GET /admin/api/waitlist`):**

```ts
export interface WaitlistItem {
  source_name: string;  // "vk" | "instagram" | "whatsapp" | "youtube" | ...
  votes: number;
  first_seen: string;
  last_seen: string;
  ready: boolean;       // votes >= threshold
}

export interface WaitlistData {
  items: WaitlistItem[];
  threshold: number;    // обычно 10
}
```

**Props:**

```ts
export interface WaitlistProps {
  data?: WaitlistData;
  loading?: boolean;
  error?: string | null;

  // Action: mark a source as «in development» — needs backend hook in 0.3
  onMarkInDevelopment?: (sourceName: string) => void | Promise<void>;
}
```

**Acceptance:**

- [x] Sorted by `votes` desc (родитель передаёт уже sorted)
- [x] Каждый row: source-name icon + votes badge + first_seen relative
  («3 недели назад») + ready badge если `ready=true`
- [x] Empty state — «Пока нет запросов на новые источники»
- [x] Threshold line: визуальный divider между ≥10 и <10

---

### 3.9. `FeedbackInbox` (S18)

Paginated feedback list с filter по type + search.

**Data shape (matches `GET /admin/api/feedback`):**

```ts
export type FeedbackType =
  | 'source_request' | 'feature_request' | 'bug' | 'general';

export interface FeedbackRow {
  id: string;
  type: FeedbackType;
  source_name: string | null;
  email_or_contact_masked: string | null;
  message: string;
  checkboxes: Record<string, boolean> | null;
  created_at: string;
}

export interface FeedbackInboxData {
  total: number;
  items: FeedbackRow[];
  limit: number;
  offset: number;
}
```

**Props:**

```ts
export interface FeedbackInboxProps {
  data?: FeedbackInboxData;
  loading?: boolean;
  error?: string | null;

  typeFilter?: FeedbackType | 'all';
  onTypeFilterChange?: (type: FeedbackType | 'all') => void;

  searchQuery?: string;
  onSearchChange?: (q: string) => void;

  onPageChange?: (offset: number, limit: number) => void;
  onRowClick?: (feedbackId: string) => void;
}
```

**Acceptance:**

- [x] Type chips (`all | source_request | feature_request | bug | general`)
- [x] Search input с debounce (родитель управляет — canon просто
  emit'ит onChange)
- [x] Row preview: type-badge + message-truncate + source_name (если есть)
  + masked-email + relative date
- [x] Click row → `onRowClick(id)` (родитель откроет detail-view или
  expand inline)
- [x] Если `checkboxes` non-empty — collapsed expandable section

---

### 3.10. `Settings` (S19)

Read-only snapshot системы. Никаких secret-значений — только booleans
«configured / not configured».

**Data shape (matches `GET /admin/api/settings`):**

```ts
export interface SettingsData {
  environment: 'dev' | 'staging' | 'prod';
  log_level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';
  app_base_url: string;
  landing_base_url: string;
  sites_base_domain: string;
  feature_max_bot: boolean;
  feature_auto_sync: boolean;
  captcha_configured: boolean;
  tg_bot_configured: boolean;
  yandexgpt_configured: boolean;
  yookassa_configured: boolean;
  s3_configured: boolean;
  fernet_keys_configured: boolean;
}
```

**Props:**

```ts
export interface SettingsProps {
  data?: SettingsData;
  loading?: boolean;
  error?: string | null;

  // No mutations in 0.2 — read-only. Add in 0.3 if needed.
  onRefresh?: () => void;
}
```

**Acceptance:**

- [x] Sections: «Среда», «Базовые URL», «Feature flags», «Внешние сервисы»
- [x] Каждый bool-флаг — пара badge: green check «настроен» или amber
  warning «не настроен»
- [x] Никогда не рендерить raw URL/value секретов даже если они придут
  в data случайно (canon должен предполагать что они уже masked
  parent'ом)

---

### 3.11. `AdminChrome` (layout)

Wrapper для всех 9 экранов выше. Sidebar nav + topbar + main slot.

**Props:**

```ts
export type AdminChromeSection =
  | 'dashboard' | 'apps' | 'sites' | 'leads'
  | 'waitlist' | 'feedback' | 'settings';

export interface AdminUser {
  username: string;
  initials: string;
}

export interface AdminChromeProps {
  active: AdminChromeSection;
  user?: AdminUser;
  onNavigate?: (section: AdminChromeSection) => void;
  onLogout?: () => void | Promise<void>;

  // Misc
  badgeCounts?: Partial<Record<AdminChromeSection, number>>;  // e.g. {apps: 12, waitlist: 3}

  children: React.ReactNode;
}
```

**Acceptance:**

- [x] Sidebar nav — 7 ссылок, active highlight через `active` prop
- [x] Если `badgeCounts.apps=12` — рядом с «Заявки» badge «12»
- [x] Topbar: «Самосайт · Админка» лого + user-pill справа (initials +
  «Выйти»)
- [x] Click на nav item → `onNavigate(section)` (родитель делает
  Next.js routing)
- [x] Click «Выйти» → `onLogout()` (родитель clear'ит cookie через
  POST /admin/api/logout, redirect'ит)
- [x] Children rendered into `<main>` slot
- [x] Responsive: <768px — sidebar collapse to hamburger (как в текущем
  canon)

---

### 3.12. `StatusPill`, `StatTile` — keep API unchanged

Маленькие переиспользуемые. Уже хорошо типизированы:

```ts
export interface StatusPillProps {
  status: ApplicationStatus | SiteStatus | LeadRowMasked['status'];
  size?: 'sm' | 'md';
}

export interface StatTileProps {
  label: string;
  value: number | string;
  delta?: number;
  deltaSign?: '+' | '-' | null;
  sub?: string;
}
```

Расширить `StatusPill.status` так чтобы он принимал все 3 family-of-statuses
(applications / sites / leads) — желательно через discriminated union
если возможно, иначе просто union of string literals.

---

## 4. Что меняется в exports

`packages/canon/package.json` exports field — без изменений (entry
points те же `admin-core` / `admin-ops`).

`packages/canon/src/admin-core/index.tsx`:

```ts
// Add at top
export type {
  AdminLoginProps, AdminLoginStep, AdminLoginMode, AdminLoginError,
  AdminDashboardProps, AdminDashboardData, AdminDashboardSection,
  AppsListProps, AppsListData, ApplicationRow, ApplicationStatus,
  AppDetailProps, AppDetailData, UserRow, ConsentRow,
  AdminChromeProps, AdminChromeSection, AdminUser,
  StatusPillProps, StatTileProps,
  ContactType, SourceType,
};
```

Same for `admin-ops/index.tsx`:

```ts
export type {
  SitesListProps, SitesListData, SiteRow, SiteStatus,
  SiteDetailProps, SiteDetailData, SiteAction,
  LeadsProps, LeadsListData, LeadRowMasked, LeadRowDecrypted,
  WaitlistProps, WaitlistData, WaitlistItem,
  FeedbackInboxProps, FeedbackInboxData, FeedbackRow, FeedbackType,
  SettingsProps, SettingsData,
};
```

---

## 5. Что меняется в визуале (надеемся — ничего)

Pixel-perfect: ничего. Все props — orthogonal к визуалу. Если дизайнер
добавляет новые состояния (loading skeleton, empty state, error block)
— это **новые штрихи поверх существующего layout**, не перерисовка.

Реалистично — придётся дизайнить:

1. **Skeleton rows** для AppsList/SitesList/Leads/FeedbackInbox в
   loading state. Высота = высота real row, цвет = `accent-soft` или
   shimmer animation
2. **Empty state** для каждого list-screen — иллюстрация + микрокопия
   (e.g. «Пока нет заявок» / «Никто не записался»)
3. **Error block** — единый компонент для всех экранов, inline в main slot
4. **Disabled button** + **loading spinner** в submit-кнопках
5. **Decrypt modal** — overlay для Leads с TOTP input (сейчас в canon
   её нет вообще)
6. **Rate-limit overlay** для AdminLogin — countdown UI
7. **Confirm dialog** для destructive actions (archive site, reject app)
   — можно не делать в 0.2.0, родитель использует `window.confirm()`

---

## 6. Acceptance (всё или ничего)

Перед релизом 0.2.0:

- [ ] Все 12 компонентов (10 экранов + Chrome + 2 утилиты) принимают
      новые props per §3
- [ ] Zero-prop вызов каждого компонента работает = mock-mode (как
      сейчас) — для дизайн-канваса
- [ ] TypeScript: prop interfaces экспортируются, `strict` для public API
- [ ] CHANGELOG.md updated: «0.2.0 — admin interactive variants»
- [ ] `npm run build` без warnings; dist/ committed
- [ ] Loading / empty / error states задизайнены и реализованы
- [ ] AdminLogin decrypt-modal задизайнен и реализован
- [ ] Visual diff vs 0.1.x (для zero-prop calls) = 0
- [ ] No new runtime dependencies (только React 19 peer как сейчас)
- [ ] Storybook ИЛИ design-canvas demo с примером каждого
      компонента в `data + loading + error + empty` state'ах (4 storybook
      stories per component × 10 components = 40 stories)

---

## 7. Delivery process

1. Design team клонит `vitrina ui` (design project), реализует §3
   изменения в JSX-prototypes
2. Регенерируется npm пакет (`canon_pkg/` workflow per CANON_PACKAGE_TZ §3-4)
3. Отправляют zip с обновлённым `canon_pkg/` (точно как в 0.1.x → 0.2.0
   refresh)
4. Я (в vitrina-репо) делаю:
   ```bash
   # replace packages/canon/{src,dist,package.json,README,CHANGELOG} wholesale
   cd packages/canon && npm i && npm run build
   cd ../landing && npm install --install-links file:../packages/canon
   npm run build  # smoke
   ```
5. Per-screen PR в `raravista8/vitrina`:
   - PR-1: `AdminChrome` + `/admin/layout.tsx` (общий wrapper)
   - PR-2: `AdminLogin` + `/admin/login/page.tsx` (риск: ломает founder
     login если что-то не так — staging-first deploy)
   - PR-3 — PR-10: остальные 8 экранов, по одному
6. Каждый PR — pixel-diff vs canon component в CI (Playwright +
   pixelmatch, threshold 0.02) для гарантии что drift не вкрался
7. VPS deploy per existing playbook (см. `docs/runbooks/deploy.md`)

---

## 8. Risks / open questions

- **OQ-1:** Decrypt-modal — нужен ли отдельный экспортируемый
  `<LeadsDecryptModal>` компонент или это слот внутри `<Leads>`?
  **Рекомендация:** слот внутри, чтобы prop-контракт оставался у
  родительского компонента
- **OQ-2:** AdminChrome badge-counts — где живёт логика «когда показать
  badge на nav-item»? **Рекомендация:** родитель fetch'ит aggregate
  endpoint (нужно добавить в backend — `GET /admin/api/badges`) и
  передаёт через `badgeCounts` prop. Backend задача отдельная (не для
  canon)
- **OQ-3:** AdminLogin — нужна ли поддержка «remember me»? **Решение:**
  нет (cookie уже 4h TTL per SECURITY.md §A07, longer = security risk)
- **OQ-4:** SiteDetail iframe — sandbox attributes какие именно?
  **Рекомендация:** `sandbox="allow-same-origin allow-scripts
  allow-popups-to-escape-sandbox"` — родитель передаёт sandbox
  prop'ом, canon применяет дефолт если не задан
- **OQ-5:** Что если consumer хочет custom navigation (например
  React Router вместо Next.js)? **Решение:** AdminChrome принимает
  `onNavigate` callback + `active` prop — никакого hard-coded routing
  внутри. Это уже учтено

---

## 9. References

- `docs/handoff/CANON_PACKAGE_TZ.md` — оригинальный TZ для canon-package
  (Variant C, выпустил 0.1.0)
- `docs/handoff/CANON_SWAP_PLAN.md` — общий план миграции рискованных
  surfaces (admin chrome — Option A/B/C/D)
- `docs/handoff/SCREEN_INDEX.md` — map 19 экранов prod ⇄ canon
- `docs/handoff/VISUAL_COVERAGE.md` — live tracker coverage
- `backend/app/admin/routers/api.py` — реальные JSON endpoints (data
  shapes в §3 взяты отсюда)
- `landing/app/admin/**/*.tsx` — текущая hand-rolled prod-имплементация
  (что нужно заменить через canon 0.2.0 drop-in)
- `CLAUDE.md §Canon workflow` — refresh-процедура

---

## 10. Tracking

После релиза 0.2.0 и интеграции:

- `CANON_SWAP_PLAN.md` блок «Admin chrome (10 screens)» меняется со
  «⛔ deferred» на «✅ shipped via 0.2.0»
- `VISUAL_COVERAGE.md` — Admin section ⚪→🔵 (canon-import drift=0) для
  всех 10 экранов × 1-2 viewports
- `SCREEN_INDEX.md` — Prod path обновляется с «hand-rolled tsx» на
  «`@samosite/canon/admin-{core,ops}` drop-in»
