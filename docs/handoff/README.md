# Handoff: Самосайт UI → Claude Code

> Полный пакет для переноса дизайна 19 экранов «Самосайт» (`samosite.online`) в продакшен-код. Самодостаточный — разработчику, который не был на этих сессиях, должно хватить только этой папки.

---

## 0. TL;DR — что делать первым

1. Положи всю эту папку в корень своего репозитория (или открой её в Claude Code как контекст).
2. Открой `START_HERE_PROMPT.md` — это **готовый стартовый промпт для Claude Code**. Скопируй его в первое сообщение чата.
3. Открой `canon/index.html` локально в браузере (любой статический сервер) — это **визуальный канон**. Его и нужно повторить 1:1 в продакшене.
4. Сначала читай `specs/` в порядке номеров. **Более свежие файлы перекрывают более старые** — это явно указано внутри.
5. Стек продакшена зафиксирован: **Next.js 16 App Router · React 19 · TypeScript · Tailwind · shadcn/ui · lucide-react · recharts**. Customer-сайт — **FastAPI + Jinja2 + Tailwind CDN** (НЕ Next.js).

---

## 1. О содержимом пакета

Файлы в `canon/` — это **дизайн-референсы, написанные на React+Babel-prototype-стиле** (JSX через `@babel/standalone` в одном HTML). Это **не production-код**. Задача — **воссоздать эти экраны в существующей продакшен-кодовой базе** (Next.js + shadcn/ui), а не копировать JSX дословно.

Фиделити: **High-fidelity (hifi).** Финальные цвета, типографика, отступы, копирайт. Воспроизводить **pixel-perfect** на 3 viewports: 1440, 768, 390.

```
design_handoff_samosite/
├── README.md                      ← вы здесь
├── START_HERE_PROMPT.md           ← скопируй в Claude Code как первое сообщение
├── TOKENS.md                      ← дизайн-токены в чистом виде (hex/oklch/px)
├── SCREEN_INDEX.md                ← карта 19 экранов: канон → прод-файл
├── specs/                         ← ТЗ, читать по порядку
│   ├── 00_CLAUDE_CODE_TZ_base.md       (v2 — базовый, частично перекрыт)
│   ├── 01_landing_v2.1.md              (финальный лендинг + клиентский ЛК)
│   ├── 02_customer_v2.1.md             (booking-page customer-сайтов)
│   ├── 03_session_v2.1.3.md            (последние правки копирайта/тарифа)
│   └── 04_typography.md                (русские типографские правила — обязательно)
├── canon/                         ← визуальный канон (JSX prototype)
│   ├── index.html                      ← открой это первым в браузере
│   ├── landing.html                    ← standalone лендинг
│   ├── client-admin-demo.html          ← интерактивная демка ЛК
│   ├── tokens.jsx                      ← дизайн-токены (source of truth)
│   ├── design-canvas.jsx               ← хост-канвас для всех экранов
│   ├── landing-samosite.jsx            ← #1 Landing
│   ├── screen-02-source.jsx            ← #2 Source detection
│   ├── screens-intake.jsx              ← #3-#6, #8, #9 (intake flow + feedback)
│   ├── screens-customer.jsx            ← #7 Customer site (booking-page)
│   ├── screens-client-admin-demo.jsx   ← #7b Клиентский ЛК
│   ├── screens-admin-core.jsx          ← #10-#13 (login, dashboard, apps)
│   ├── screens-admin-ops.jsx           ← #14-#19 (sites, leads, ops)
│   └── concepts.jsx                    ← ранние концепты (для контекста, не для копи)
└── code/                          ← существующий прод-код (отправная точка)
    ├── README.md
    ├── customer-site.html.j2
    ├── FeedbackForm.tsx · LeadForm.tsx · PhotoDrawer.tsx
    ├── SourceDetectionBadge.tsx · SubmitModal.tsx
    └── admin/                          ← все admin .tsx
```

---

## 2. Порядок чтения и приоритет источников

Когда документы расходятся, побеждает **более свежий**:

```
04_typography.md       (всегда применяется ко всему — кросс-катящий)
        ↓
03_session_v2.1.3.md   (последняя сессия, перебивает копирайт/тариф/CTA)
        ↓
01_landing_v2.1.md     (лендинг + клиентский ЛК /admin-demo)
02_customer_v2.1.md    (customer-сайты, Jinja2)
        ↓
00_CLAUDE_CODE_TZ_base.md  (базовый v2 — раздел 1 перекрыт 01, раздел 3 перекрыт 02)
        ↓
canon/*.jsx            (визуальный источник истины — пиксели, отступы, цвета)
```

**Если ТЗ и канон расходятся по цвету/отступу/размеру — побеждает канон.** Если ТЗ и канон расходятся по копирайту — побеждает `03_session_v2.1.3.md`.

---

## 3. Дизайн-система — кратко

Полный список значений — в `TOKENS.md` и `canon/tokens.jsx`.

- **Концепт:** «Тёплая бумага» (Concept A, канон).
- **Бренд:** Самосайт (кириллица). Домен: `samosite.online`. Логотип — кириллическая «С» Onest 800 на терракотовой плашке.
- **Цвета:** cream-background `oklch(0.972 0.012 80)` · warm-near-black `oklch(0.215 0.018 60)` · terracotta accent `oklch(0.605 0.155 35)`.
- **Шрифты:** `Onest` (sans, 400–800) · `JetBrains Mono` (mono, 400–500).
- **Радиусы:** 6 / 10 / 14 / 18 / pill (999).
- **Тени:** `card` и `pop` (тёплые, terracotta-based) — см. `TOKENS.md`.
- **Семантика:** success / info / warn / danger — все есть в токенах.

---

## 4. Карта 19 экранов

Полная карта с маппингом канон → прод-файл — в `SCREEN_INDEX.md`. Кратко:

| # | Экран | Канон (JSX) | Прод (TSX/J2) | Спека |
|---|---|---|---|---|
| 1 | Landing | `landing-samosite.jsx` | `code/landing/*.tsx` (создать) | `specs/01` |
| 2 | Source detection | `screen-02-source.jsx` | `code/SourceDetectionBadge.tsx` | `specs/00 §2` |
| 3 | Submit modal (3 шага) | `screens-intake.jsx` → `S3_SubmitModal` | `code/SubmitModal.tsx` | `specs/00 §2` |
| 5 | Confirmation | `screens-intake.jsx` → `S5_Confirmation` | (часть SubmitModal) | `specs/00 §2` |
| 6 | Photo drawer | `screens-intake.jsx` → `S6_PhotoDrawer` | `code/PhotoDrawer.tsx` | `specs/00 §2` |
| 7 | Customer site | `screens-customer.jsx` | `code/customer-site.html.j2` | `specs/02` |
| 7b | Клиентский ЛК (demo) | `screens-client-admin-demo.jsx` | `code/admin/...` (создать `/admin-demo`) | `specs/01 §12` |
| 8 | Lead form | `screens-intake.jsx` → `S8_LeadFormConfirm` | `code/LeadForm.tsx` | `specs/00 §6` |
| 9 | Feedback | `screens-intake.jsx` → `S9_FeedbackPage` | `code/FeedbackForm.tsx` | `specs/00 §7` |
| 10 | Admin login | `screens-admin-core.jsx` → `S10` | `code/admin/Login.tsx` | `specs/00 §3` |
| 11 | Dashboard | `screens-admin-core.jsx` → `S11` | `code/admin/Dashboard.tsx` | `specs/00 §3` |
| 12 | Apps list | `screens-admin-core.jsx` → `S12` | `code/admin/AppsList.tsx` | `specs/00 §3` |
| 13 | App detail | `screens-admin-core.jsx` → `S13` | `code/admin/AppDetail.tsx` | `specs/00 §3` |
| 14 | Sites list | `screens-admin-ops.jsx` → `S14` | `code/admin/SitesList.tsx` | `specs/00 §3` |
| 15 | Site detail | `screens-admin-ops.jsx` → `S15` | `code/admin/SiteDetail.tsx` | `specs/00 §3` |
| 16 | Leads | `screens-admin-ops.jsx` → `S16` | `code/admin/Leads.tsx` | `specs/00 §3` |
| 17 | Waitlist | `screens-admin-ops.jsx` → `S17` | `code/admin/Waitlist.tsx` | `specs/00 §3` |
| 18 | Feedback inbox | `screens-admin-ops.jsx` → `S18` | `code/admin/FeedbackInbox.tsx` | `specs/00 §3` |
| 19 | Settings | `screens-admin-ops.jsx` → `S19` | `code/admin/Settings.tsx` | `specs/00 §3` |

---

## 5. Контрактные изменения (брейкинг)

Find-and-replace по всему репо — внимательно, не в `node_modules`:

| было | стало |
|---|---|
| `Витрина` | `Самосайт` |
| `vitrina.site` | `samosite.online` |
| `*.vitrina.site` | `*.samosite.online` |
| `@VitrinaIntakeBot` | `@SamositeIntakeBot` (бот в TG-канал источника) |
| `@VitrinaBot` | `@SamositeBot` (личный бот юзера) |

⚠️ **Два разных бота**: `SamositeIntakeBot` юзер пускает админом в свой TG-канал-источник, `SamositeBot` юзер открывает у себя, чтобы получать уведомления о заявках. В новом флоу intake (шаг 3) — открываем именно `@SamositeBot`. Не путать.

---

## 6. Pixel-perfect verification (обязательный этап)

После реализации каждого экрана — визуальное сравнение с каноном:

```bash
npm install -D playwright pixelmatch pngjs
```

Screenshot per-viewport на 1440 / 768 / 390 vs эталоны из `canon/index.html`. Threshold 0.02 (2% diff per pixel). Детали — `specs/01_landing_v2.1.md §18` и `specs/03_session_v2.1.3.md §3`.

---

## 7. Acceptance criteria (короткий)

- [ ] Все 19 экранов воспроизведены 1:1 на 1440 / 768 / 390 (diff ≤ 2%).
- [ ] Тариф 990 ₽/мес везде, включая Stripe/ЮKassa.
- [ ] Все домены / имена ботов мигрированы.
- [ ] Wildcard SSL на `*.samosite.online` выдан, старый `*.vitrina.site` 301 на 30 дней.
- [ ] Lighthouse mobile ≥90 / ≥95 на лендинге и customer-сайтах.
- [ ] Все русские тексты прошли typography lint (см. `specs/04_typography.md §9`).
- [ ] `customer-site.html.j2` — booking-page структура (12 секций по `specs/02`).
- [ ] `/admin-demo` — рабочая интерактивная демка (см. `specs/01 §12`).
- [ ] CSP/HSTS заголовки, schema.org JSON-LD, sitemap.xml, robots.txt.

Полный чек-лист — в каждом из `specs/*.md` в конце.

---

## 8. Что **НЕ** делаем

- НЕ копируем JSX из `canon/` дословно в production. JSX — это **визуальный референс**, прод-код пишется на Next.js + shadcn/ui (или Jinja2 для customer-сайта).
- НЕ переименовываем Самосайт обратно в Vitrina, даже если в `00_CLAUDE_CODE_TZ_base.md` где-то всплыло старое имя.
- НЕ добавляем секции, которых нет в каноне (видео в Hero, чат-виджеты, баннеры скидок).
- НЕ меняем стек (Next.js → что-то ещё).

---

## 9. Если что-то не сходится

1. Сначала смотри **более свежую** спеку (см. порядок в §2).
2. Если спеки молчат — смотри `canon/*.jsx` как source of truth.
3. Если канон молчит — открой issue / спроси у заказчика. **Не выдумывай** копирайт, цены, флоу.
