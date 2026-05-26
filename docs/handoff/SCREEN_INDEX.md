# Карта 19 экранов: канон → прод

> Полная карта маппинга. Для каждого экрана: где смотреть pixel-канон, где править прод-код, какая спека отвечает.

---

## P0 — Public (1–9)

### #1 · Landing — `samosite.online`
- **Канон:** `@samosite/canon/landing` package — canon 0.6.0 v3 narrative (11 blocks). Source `packages/canon/src/landing/index.tsx`.
- **HTML preview:** `packages/canon/canon-source/landing.html` (dev canvas) · canvas mirror `landing/tests/visual/canon-source/landing-samosite.jsx`
- **Прод:** `landing/app/page.tsx` рендерит:
  - L1 Hero — hand-rolled `landing/components/Hero.tsx` (interactive)
  - L2-L11 — canon dropins: `ExamplesSection` · `CycleSection` (new) · `MondaySection` (new) · `BaseWorkSection` (new) · `SourcesSection` (new) · `OwnershipSection` · `AnalyticsSection` · `PricingSection` · `FaqSection` · `FinalCtaSection` (new)
- **Спека:** `specs/01_landing_v2.1.md` (legacy v2.1 layout) + `specs/03_session_v2.1.3.md` (v2.1.3 copy) + `packages/canon/CHANGELOG.md` 0.6.0 (v3 narrative)
- **Viewports:** 1440 / 768 / 390 / 375
- **Note:** canon 0.6.0 dropped `Story` / `Platforms` / `BigFeatures` / `FreeMonthSection`, added 5 new sections (`Cycle` / `Monday` / `BaseWork` / `Sources` / `FinalCta`). Old `specs/01` paragraphs referencing those старые секции — out-of-date; v3 narrative описан в `CHANGELOG.md` 0.6.0.

### #2 · Source detection states
- **Канон:** `canon/screen-02-source.jsx` (`S2_Desktop`, `S2_Mobile`) — 9 состояний бейджа
- **Прод:** `code/SourceDetectionBadge.tsx`
- **Спека:** `specs/00_CLAUDE_CODE_TZ_base.md §2` (FR-005, FR-005a, ADR-0009)
- **API:** `GET /api/preview?url=` → `{source, counts, status}`

### #3 · Submit modal — 3 шага (новый флоу)
- **Канон:** `canon/screens-intake.jsx` → `S3_SubmitModal` (step=1/2/3)
- **Прод:** `code/SubmitModal.tsx`
- **Спека:** `specs/00_CLAUDE_CODE_TZ_base.md §2`
- **Важно:** шаг 3 = **открыть** `@SamositeBot` (личный, для нотификаций), НЕ добавить в канал

### #4 · TG bot setup (добавление `@SamositeIntakeBot` в TG-канал)
- **Канон:** часть `screens-intake.jsx` (см. подсказки в `canon/index.html` секция s3)
- **Прод:** часть `SubmitModal.tsx`
- **Спека:** `specs/00 §2.5`

### #5 · Confirmation
- **Канон:** `canon/screens-intake.jsx` → `S5_Confirmation`
- **Прод:** компонент внутри `SubmitModal.tsx`
- **Спека:** `specs/00 §2.6`

### #6 · Photo drawer
- **Канон:** `canon/screens-intake.jsx` → `S6_PhotoDrawer` (variant='desktop'|'mobile')
- **Прод:** `code/PhotoDrawer.tsx`
- **Спека:** `specs/00 §2.7`
- **Limits:** ≤30 файлов, ≤10MB/файл, ≤100MB суммарно (FR-014), magic-bytes валидация (FR-015)

### #7 · Customer site — `*.samosite.online`
- **Канон:** `canon/screens-customer.jsx` (`S7_CustomerSite` scheme='cream'|'slate'|'sage')
- **Прод:** `code/customer-site.html.j2` (FastAPI + Jinja2 + Tailwind CDN — НЕ Next.js)
- **Спека:** `specs/02_customer_v2.1.md` (полная booking-page структура, 12 секций)
- **Plan:** free (с watermark «Сделано на Самосайте») / pro (без watermark)

### #7b · Клиентский ЛК — `/admin-demo`
- **Канон:** `canon/screens-client-admin-demo.jsx` (`ClientAdminDemo`)
- **HTML preview:** `canon/client-admin-demo.html` (интерактивная демка)
- **Прод:** новый роут `/admin-demo` в Next.js
- **Спека:** `specs/01_landing_v2.1.md §12`
- **6 табов:** Аналитика / Сайт / Заявки / Отзывы / Услуги / Настройки

### #8 · Lead form
- **Канон:** `canon/screens-intake.jsx` → `S8_LeadFormConfirm`
- **Прод:** `code/LeadForm.tsx`
- **Спека:** `specs/00 §6`
- **API:** `POST /api/leads`, rate-limit >3/час/IP → 429 (FR-052), SmartCaptcha + honeypot

### #9 · Feedback form — `/feedback`
- **Канон:** `canon/screens-intake.jsx` → `S9_FeedbackPage`
- **Прод:** `code/FeedbackForm.tsx`
- **Спека:** `specs/00 §7` (ADR-0009)

---

## P0 — Admin (10–19)

### #10 · Admin login
- **Канон:** `canon/screens-admin-core.jsx` → `S10_AdminLogin` (step=1|2, rateLimited)
- **Прод:** `code/admin/Login.tsx`
- **Спека:** `specs/00 §3.1`
- **Flow:** password → TOTP, rate-limit visible

### #11 · Admin dashboard
- **Канон:** `canon/screens-admin-core.jsx` → `S11_Dashboard`
- **Прод:** `code/admin/Dashboard.tsx`
- **Спека:** `specs/00 §3.2`
- **Charts:** recharts trend

### #12 · Applications list
- **Канон:** `canon/screens-admin-core.jsx` → `S12_AppsList`
- **Прод:** `code/admin/AppsList.tsx`
- **Спека:** `specs/00 §3.3` — table + filter + search + pagination 50/page

### #13 · Application detail
- **Канон:** `canon/screens-admin-core.jsx` → `S13_AppDetail`
- **Прод:** `code/admin/AppDetail.tsx`
- **Спека:** `specs/00 §3.4` — source snapshot, generated content, publish/reject/redo, audit log

### #14 · Sites list
- **Канон:** `canon/screens-admin-ops.jsx` → `S14_SitesList`
- **Прод:** `code/admin/SitesList.tsx`
- **Спека:** `specs/00 §3.5` — sync статус + leads 7д

### #15 · Site detail
- **Канон:** `canon/screens-admin-ops.jsx` → `S15_SiteDetail`
- **Прод:** `code/admin/SiteDetail.tsx`
- **Спека:** `specs/00 §3.6` — iframe preview, re-publish/pause sync/archive, leads + sync history

### #16 · Leads (cross-site)
- **Канон:** `canon/screens-admin-ops.jsx` → `S16_Leads` (decryptModal)
- **Прод:** `code/admin/Leads.tsx`
- **Спека:** `specs/00 §3.7`
- **Security:** Fernet AES masked preview, decrypt по клику + TOTP для bulk export

### #17 · Waitlist aggregation
- **Канон:** `canon/screens-admin-ops.jsx` → `S17_Waitlist`
- **Прод:** `code/admin/Waitlist.tsx`
- **Спека:** `specs/00 §3.8` — group by source_name × contact × first_seen, ≥10 → highlight + Notify

### #18 · Feedback inbox
- **Канон:** `canon/screens-admin-ops.jsx` → `S18_FeedbackInbox`
- **Прод:** `code/admin/FeedbackInbox.tsx`
- **Спека:** `specs/00 §3.9` — list + detail, filter по type, JSONB pretty-print

### #19 · Settings / system
- **Канон:** `canon/screens-admin-ops.jsx` → `S19_Settings`
- **Прод:** `code/admin/Settings.tsx`
- **Спека:** `specs/00 §3.10` — health checks, последние 20 admin_actions, rotation status секретов

---

## Как использовать карту

1. Берёшь следующий экран по списку.
2. Открываешь канон в `canon/index.html` (там все 19 на одном canvas).
3. Открываешь соответствующий `.jsx` рядом — там точные размеры/цвета/копи.
4. Открываешь спеку (`specs/...`) — там бизнес-правила, API-контракты, edge cases.
5. Реализуешь в прод-файле (`code/...`).
6. Прогоняешь pixel-perfect verification (Playwright + pixelmatch, threshold 0.02) на 1440/768/390.
7. Прогоняешь typography lint (см. `specs/04_typography.md §9`).
8. Чек-листы acceptance — в конце каждого `specs/*.md`.
