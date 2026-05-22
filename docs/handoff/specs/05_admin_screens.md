# Admin screens 10–19 — детальные ТЗ для pixel-аудита

> Дополнение к `00_CLAUDE_CODE_TZ_base.md` §3 и §6. Базовый ТЗ говорит «admin структурно идентичен, только rebrand». Для pixel-аудита этого мало — нужны точные селекторы, фикстуры и измерения.
> Канон: `canon/screens-admin-core.jsx`, `canon/screens-admin-ops.jsx`.
> Viewport: **1440 desktop-only** (founder-side), кроме login (1440 + 768).

---

## Общая admin-оболочка (AdminChrome)

Все экраны 11–19 живут внутри одной оболочки:

- **Sidebar 240px** слева, `bg: white`, `border-right: 1px line`. Логотип «С» 32×32 + текст «Самосайт» сверху. Меню: Dashboard / Applications / Sites / Leads / Waitlist / Feedback / Settings. Активный пункт — `bg: accentSoft`, `color: accentInk`, левый бар 3px `accent`.
- **Topbar 64px**, `bg: white`, `border-bottom: 1px line`. Слева — page title (H2 24px). Справа — `<email> · Выйти`.
- **Content** — `bg: cream`, padding 32 (desktop).

**Селекторы:** `[data-admin-chrome]`, `[data-admin-nav-item][data-active]`, `[data-admin-content]`.

---

## 10 · Admin login (3 state)

**Канон:** `S10_AdminLogin(step=1|2, rateLimited)`.

### Step 1 — password
- Centered card 480 wide × auto, `shadow: card`, `radius: xl`.
- Логотип «С» 48×48 сверху по центру.
- H2: `Вход для команды Самосайта` (без точки).
- Input email + input password.
- Кнопка `Войти` — primary pill full-width.
- Linkback: `Забыли пароль?` под кнопкой, центр.

### Step 2 — TOTP
- Тот же card.
- H2: `Введите код из приложения`.
- 6 отдельных моно-инпутов 56×64, gap 8.
- Кнопка `Подтвердить` — primary full-width.
- Mono подпись: `Код обновится через 30 сек` — серый, под инпутами.

### Rate-limited
- Step 1, но кнопка disabled, под ней `danger`-баннер:
  `Слишком много попыток. Подождите 2 мин.` с обратным отсчётом.

**Селекторы:** `[data-page="admin-login"][data-step="1|2"]`, `[data-rate-limited]`, `[data-totp-input][data-index="0..5"]`.

**Viewport:** 1440 + 768 (founder может зайти с планшета/телефона).

---

## 11 · Dashboard

**Канон:** `S11_Dashboard`.

Layout: 3 ряда.

### Row 1 — KPI-карточки (4 шт в grid 4×1)
- Каждая карточка: 280 wide × 120 height, `bg: white`, `radius: lg`.
- Eyebrow mono 11px caps + большое число 36px + дельта (стрелка + %).
- Метрики: `Новых заявок (7д)` · `Опубликовано сайтов` · `Лидов всего` · `Avg time-to-publish (ч)`.

### Row 2 — Pending applications top-5
- Заголовок `Ждут модерации` + линк `Все →` справа.
- Table 5 строк × колонки: ID (mono) · Источник · Контакт · Получено (relative time) · Действие (кнопка `Открыть`).

### Row 3 — Trend chart
- Recharts LineChart, height 280, заголовок `Заявки за 7 дней`.
- Две линии: получено / опубликовано.
- Цвета — `accent` и `info`, не дефолтные recharts.

**Фикстуры:** см. `tests/visual/_fixtures/admin.ts` → `seedDashboard`. Под `E2E_SEED=1` API возвращает ровно те числа, что в каноне.

**Селекторы:** `[data-admin-page="dashboard"]`, `[data-kpi-card][data-metric="apps_7d"]`, `[data-pending-row][data-index="0..4"]`, `[data-trend-chart]`.

---

## 12 · Applications list

**Канон:** `S12_AppsList`.

- Topbar контента: search input + filter chips (`Все` / `Pending` / `Approved` / `Rejected` / `Redo`) + кнопка `Экспорт CSV`.
- Table:
  - Колонки: ID · Источник (иконка + url mono) · Контакт · Канал (chip) · Получено · Статус (badge) · Действие.
  - Row height 56, hover `bg: bgSoft`.
  - Pagination внизу: `1–50 из 247` слева, `← Пред 1 2 3 ... След →` справа.

**Фикстуры:** 50 строк seeded → детерминированный порядок.

**Селекторы:** `[data-admin-page="apps"]`, `[data-filter-chip][data-active]`, `[data-app-row][data-id]`.

---

## 13 · Application detail

**Канон:** `S13_AppDetail`.

Двухколоночный layout `1.4fr 1fr`:

### Левая колонка — Source snapshot + Generated content
- Карточка `Источник`: url, дата проверки, кнопка `Открыть →`, превью (фото + 2 строки описания).
- Карточка `Сгенерировано`: structured data — название, услуги, отзывы, фото — со счётчиками. Кнопка `Открыть в редакторе` внизу.

### Правая колонка — Action panel + Audit log
- Action panel: статус (badge), 3 кнопки (Publish / Reject / Redo), каждая с подтверждением.
- Audit log: timeline, события `created → preview_fetched → ai_generated → approved`, у каждого — actor, timestamp mono.

**Селекторы:** `[data-admin-page="app-detail"][data-app-id]`, `[data-action="publish|reject|redo"]`, `[data-audit-event][data-index]`.

---

## 14 · Sites list

**Канон:** `S14_SitesList`.

- Topbar: search + filter (`Все` / `Активные` / `Paused` / `Archived`).
- Table:
  - Колонки: Sub (mono `<n>.samosite.online`) · Бизнес · Plan (chip Free/Pro) · Sync статус (✓ зелёный / ⏸ серый / ⚠️ красный) · Лидов 7д · Действие (`Открыть`).
  - Row 56 high.

**Селекторы:** `[data-admin-page="sites"]`, `[data-site-row][data-sub]`.

---

## 15 · Site detail

**Канон:** `S15_SiteDetail`.

Двухколоночный `1fr 1fr`.

### Левая — iframe preview
- 100% width × 720 height, `iframe[src="<sub>.samosite.online"]`.
- Над iframe — toolbar: `<sub>.samosite.online` mono + кнопки `Re-publish` / `Pause sync` / `Archive`.

### Правая — Leads + Sync history
- Leads: последние 10, masked preview (`+7 *** ** 12`).
- Sync history: timeline, события `pulled · regenerated · pushed`.

**Селекторы:** `[data-admin-page="site-detail"][data-sub]`, `[data-site-preview-iframe]`, `[data-lead-row]`, `[data-sync-event]`.

---

## 16 · Leads (cross-site)

**Канон:** `S16_Leads(decryptModal?)`.

- Topbar: search + date-picker + кнопка `Bulk decrypt + export` (требует TOTP).
- Table:
  - Колонки: Сайт · Имя · Контакт (masked `+7 *** ** 12` mono) · Услуга · Получено · `Расшифровать`.
  - При клике `Расшифровать` — inline-replace masked → plain, лог в audit.

### Decrypt modal (bulk)
- При клике `Bulk decrypt + export` — модалка 480 wide:
  - H3: `Bulk-расшифровка лидов`.
  - Текст: `Будут расшифрованы X записей. Действие зафиксируется в audit log.`.
  - 6-знач TOTP input.
  - Кнопки `Отмена` / `Подтвердить`.

**Селекторы:** `[data-admin-page="leads"]`, `[data-lead-row][data-encrypted="true"]`, `[data-modal="bulk-decrypt"]`, `[data-totp-input]`.

---

## 17 · Waitlist aggregation

**Канон:** `S17_Waitlist`.

- Group by `source_name × distinct contact × first_seen`.
- Table:
  - Колонки: Платформа (chip + иконка) · Уникальных контактов · First seen · Last seen · Действие (`Notify when ready`).
  - Строки с count ≥ 10 — выделены `bg: warnSoft`, badge `≥ 10` справа.

**Селекторы:** `[data-admin-page="waitlist"]`, `[data-waitlist-row][data-platform]`, `[data-highlight="ge10"]`.

---

## 18 · Feedback inbox

**Канон:** `S18_FeedbackInbox`.

Двухколоночный `1fr 2fr`.

### Левая — list
- Filter по type chips (`platform-missing` / `feature` / `integration` / `other`).
- List items 80 high: type badge + 1 строка preview + дата mono.
- Active item — `bg: accentSoft`, левый бар 3px `accent`.

### Правая — detail
- Header: type badge + дата + контакт (если был).
- Body: JSONB checkbox-ответы — pretty-printed (✓ / ✗ + текст).
- Free-text textarea (read-only) внизу.

**Селекторы:** `[data-admin-page="feedback-inbox"]`, `[data-feedback-list-item][data-id]`, `[data-feedback-detail]`.

---

## 19 · Settings / system

**Канон:** `S19_Settings`.

3 секции (cards в column).

### Health checks
- Grid 3×2: каждая ячейка — name + статус (✓ / ⚠️ / ✗) + last-check timestamp mono.
- Сервисы: DB · Redis · Yandex GPT · TG bot · Yandex OS · Sentry.

### Last admin actions
- Last 20 строк, table: actor · action · target · timestamp mono.

### Secret rotation
- Table: secret_name · last_rotated · next_rotation · кнопка `Rotate now`.
- Если `now > next_rotation` — строка `bg: dangerSoft`.

**Селекторы:** `[data-admin-page="settings"]`, `[data-health-check][data-service]`, `[data-admin-action-row]`, `[data-secret-row][data-overdue]`.

---

## Общий чек-лист admin pixel-аудита

- [ ] `AdminChrome` использует логотип «С» (см. `TOKENS.md`), не `<span className="bg-orange-700">`.
- [ ] Все таблицы детерминированы под `E2E_SEED=1` — фикстуры в `tests/visual/_fixtures/admin.ts`.
- [ ] Recharts использует токены `accent` / `info`, не дефолтные цвета.
- [ ] Все `data-admin-page`, `data-action`, `data-modal` атрибуты расставлены в прод-коде.
- [ ] Decrypt-modal, audit-log timeline, TOTP-input — все имеют стабильные селекторы.
- [ ] Baselines сгенерированы из артбордов `s10-*` … `s19-*` на 1440 (+ 768 для `s10-*`).
- [ ] Pixel-diff ≤ 2% на всех экранах.
