# Baselines Plan — как закрыть 99% gap

> Текущее покрытие: **1 / 122 экран×viewport pixel-сверено** (см. `VISUAL_COVERAGE.md`).
> Этот файл — конкретный план по тирам. Каждый тир = отдельный PR / спринт.

---

## Tier 1 · «Anlock landing» — 1–2 дня, без новых baselines

**Цель:** перевести 27 landing-секций × viewport из 🟡 smoke-only в 🟢 pixel-audited.

Baselines уже есть, spec уже есть. Нужно только убрать gate (`auditedViewports`) и починить мелкие регрессии.

```ts
// tests/visual/landing.spec.ts — было:
const auditedViewports = ['1440']; // только hero

// стало:
const auditedViewports = ['1440', '768', '390']; // все
```

**Шаги:**
1. Раскрыть `auditedViewports` по одной секции — 9 PR (каждый = одна секция × 3 vp).
2. На каждом PR ожидать 1–3 регрессии (~3–10% diff из-за outer-padding pass / шрифтовых reflow).
3. Чинить в проде, не в baseline. Если baseline неверный — regenerate из канона.

**Acceptance Tier 1:** все ячейки L1–L10 × {1440, 768, 390} = 🟢. Итого +29 pixel-audited.

---

## Tier 2a · Customer site (booking-page) — 3 дня

**Цель:** 12 секций × 3 viewports = 36 baselines + assertion-тесты.

**Подготовка:**
1. Запустить `canon/index.html` локально (`npx serve design_handoff_samosite/canon`).
2. Артборды `#dc-artboard-s7-cream/slate/sage` — для скриншотов брать только `cream` (palette-варианты покрываются unit-snapshot).
3. Дополнить `canon/screens-customer.jsx`: каждая секция получает уникальный `data-section="hero|services|gallery|..."` — нужен для селектора.
4. Сгенерировать baselines per-section (не per-page) — см. `PIXEL_PERFECT_SETUP.md §6`.

**Прод-маркеры:** в `code/customer-site.html.j2` расставить те же `data-section` на каждом `<section>`.

**Acceptance Tier 2a:** все C1–C12 × {1440, 768, 390} = 🟢. Итого +34 pixel-audited.

---

## Tier 2b · Intake flow + source badge — 2 дня

**Экранов:** 8 (SourceBadge 9-в-1 + SubmitModal × 3 шага + TG-bot + Confirmation + PhotoDrawer × 2 + LeadForm + Feedback).

**Особенность:** модалки — это **overlay**, не страница. Тесты должны:
1. Открыть страницу-хост (любая, главное чтобы модалка могла рендериться).
2. Программно вызвать `window.__open_submit_modal({ step: 2, channel: 'phone' })` — нужен debug-хук.
3. Дождаться backdrop с `data-modal="submit-step-2"`.
4. Скриншотить **только модалку**, не страницу.

`SourceDetectionBadge` — 9 состояний на одной странице demo-grid (`/dev/source-badge`). Хост-страница не нужна, можно тестировать как Storybook-isolation.

**Acceptance Tier 2b:** все intake-строки = 🟢. Итого +~24 pixel-audited.

---

## Tier 2c · Admin (founder-side) — 3 дня

**Экранов:** 10 (login 3 state + dashboard + apps × 2 + sites × 2 + leads × 2 + waitlist + feedback inbox + settings).

**Viewport:** только 1440 (admin desktop-only), кроме login (1440 + 768).

**Особенность:** admin требует **seed data**. Решение — фикстуры:
```ts
// tests/visual/_fixtures/admin.ts
export const seedDashboard = {
  pending_apps: [...], // ровно тот набор, что в каноне S11_Dashboard
  trend_7d: [12, 18, 15, 22, 28, 31, 29],
  ...
};
```

В прод-коде должен быть env-flag `E2E_SEED=1` → API возвращает фикстуры вместо БД. Иначе скриншот будет зависеть от случайного состояния и diff никогда не сойдётся.

**Acceptance Tier 2c:** все Admin-строки = 🟢. Итого +16 pixel-audited.

---

## Tier 3 · Клиентский ЛК `/admin-demo` — 5 дней (включает разработку)

**Сейчас:** прод-страницы **нет**. В каноне есть, в проде — ⚫.

**Шаги:**
1. Построить `/admin-demo` как Next.js-роут с 6 табами (sidebar + content).
2. Все данные mock (как в каноне) — без API.
3. Расставить `data-tab="analytics|site|leads|reviews|services|settings"`.
4. Расставить `data-section` внутри каждого таба.
5. Сгенерировать 18 baselines (6 табов × 3 viewport).
6. Tests кликают на каждую вкладку → ждут `data-tab-active="..."` → скриншотят.

**Acceptance Tier 3:** все 7b-строки = 🟢. Итого +18 pixel-audited.

---

## Tier 4 · Edge states (опционально) — 2 дня

Состояния, которые редко всплывают, но в каноне есть:

- SubmitModal: error на шаге 1 (URL невалидный), timeout на шаге 1, IG-«скоро» preview.
- PhotoDrawer: 30/30 files (max), >100MB error, HEIC placeholder.
- LeadForm: SmartCaptcha challenge, 429 rate-limit, honeypot triggered (silent).
- Leads decrypt-modal: TOTP-error, bulk-export confirmation.
- Source-badge: timeout fallback (static ✓ без чисел).

**Acceptance Tier 4:** ~12 дополнительных кейсов покрыты edge-snapshot.

---

## Сводка по срокам

| Тир | Срок | Экранов | Pixel-audited после |
|---|---|---|---|
| baseline | — | 1 | 1 / 122 (0.8 %) |
| Tier 1 (unlock landing) | 1–2 дня | +29 | 30 / 122 (24.6 %) |
| Tier 2a (customer) | 3 дня | +34 | 64 / 122 (52.5 %) |
| Tier 2b (intake) | 2 дня | +24 | 88 / 122 (72.1 %) |
| Tier 2c (admin) | 3 дня | +16 | 104 / 122 (85.2 %) |
| Tier 3 (admin-demo) | 5 дней | +18 | 122 / 122 (100 %) |
| Tier 4 (edges) | 2 дня | +12 edge | full coverage |

**Итого до 100 %:** ~16 рабочих дней (3 недели) одним разработчиком, или 1.5 недели в две руки (frontend + QA).

---

## Что блокирует быстрый запуск

1. **`data-section` / `data-screen` / `data-modal` атрибуты не расставлены** в прод-коде. Решается одним sweep-PR по всем компонентам — пол дня работы, разблокирует все тиры.
2. **Шрифты подгружаются с Google CDN.** На CI без интернета — fallback, diff ломается. Self-host в `public/fonts/` — час работы.
3. **`canon/design-canvas.jsx` не экспортирует `window.__dc_reset`.** Без сброса pan/zoom скриншот канвас-артборда зависит от состояния → нестабильность. Дописать 5 строк.
4. **Admin без seed-фикстур.** Каждый запуск тестов даст разный dashboard. Env-flag `E2E_SEED=1` нужен в прод-коде.
5. **`/admin-demo` не построен.** Tier 3 = новая разработка, не только тесты.

Эти 5 пунктов нужно сделать **до** старта тиров — иначе каждый тир упрётся в один и тот же блокер. См. чек-лист в `PIXEL_PERFECT_SETUP.md §11`.
