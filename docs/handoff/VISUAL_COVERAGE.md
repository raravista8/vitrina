# Visual Coverage Tracker — Самосайт

> **Цель:** pixel-perfect 1:1 канона на 3 viewports (1440 / 768 / 390) для всех 19 экранов.
> **Сейчас:** 1 из 57 (экран × viewport) = **1.75% pixel-сверено**, остальное либо smoke-only, либо нет baseline.
> Обновляй этот файл при каждом изменении coverage — это единственный трекер прогресса.

Легенда: 🟢 pixel-audited (diff ≤ 2%) · 🟡 baseline есть, smoke-only · 🔴 нет baseline · ⚫ компонент не построен

---

## P0 Landing — `landing-samosite.jsx`

| # | Section | 1440 | 768 | 390 | Spec |
|---|---|---|---|---|---|
| L1 | Hero | 🟢 | 🟡 | 🟡 | `specs/01 §3` |
| L2 | Examples | 🟡 | 🟡 | 🟡 | `specs/01 §5` |
| L3 | Story | 🟡 | 🟡 | 🟡 | `specs/01 §6` |
| L4 | Platforms | 🟡 | 🟡 | 🟡 | `specs/01 §7` |
| L5 | BigFeatures | 🟡 | 🟡 | 🟡 | `specs/01 §8` |
| L6 | Ownership | 🟡 | 🟡 | 🟡 | `specs/01 §9` |
| L7 | Analytics | 🟡 | 🟡 | 🟡 | `specs/01 §9` |
| L8 | Pricing | 🟡 | 🟡 | 🟡 | `specs/01 §10` |
| L9 | FAQ | 🟡 | 🟡 | 🟡 | `specs/01 §11` |
| L10 | FreeMonth | 🟡 | 🟡 | 🟡 | `specs/01 §11` |

**Landing итого:** 1 / 30 pixel-audited · 30 / 30 baseline · 10 / 10 spec.

---

## P0 Public intake (`screens-intake.jsx`, `screen-02-source.jsx`)

| # | Screen | 1440 | 768 | 390 | Spec |
|---|---|---|---|---|---|
| 2 | SourceDetectionBadge (9 состояний) | 🔴 | 🔴 | 🔴 | `specs/06 §1` |
| 3 | SubmitModal · шаг 1 | 🔴 | — | 🔴 | `specs/06 §2` |
| 3 | SubmitModal · шаг 2 | 🔴 | — | 🔴 | `specs/06 §2` |
| 3 | SubmitModal · шаг 3 | 🔴 | — | 🔴 | `specs/06 §2` |
| 4 | TG bot setup | 🔴 | — | 🔴 | `specs/06 §3` |
| 5 | Confirmation | 🔴 | — | 🔴 | `specs/06 §4` |
| 6 | PhotoDrawer · desktop | 🔴 | — | — | `specs/06 §5` |
| 6 | PhotoDrawer · mobile | — | — | 🔴 | `specs/06 §5` |
| 8 | LeadForm inline confirm | 🔴 | 🔴 | 🔴 | `specs/06 §6` |
| 9 | FeedbackPage `/feedback` | 🔴 | 🔴 | 🔴 | `specs/06 §7` |

**Public intake итого:** 0 / ~24 pixel-audited · 0 / 24 baseline · 8 / 8 spec.

---

## P0 Customer site (`screens-customer.jsx`)

| # | Section | 1440 | 768 | 390 | Spec |
|---|---|---|---|---|---|
| C1 | Sticky header | 🔴 | 🔴 | 🔴 | `specs/02 §2` |
| C2 | Hero | 🔴 | 🔴 | 🔴 | `specs/02 §3` |
| C3 | Social proof bar | 🔴 | 🔴 | 🔴 | `specs/02 §4` |
| C4 | Services | 🔴 | 🔴 | 🔴 | `specs/02 §5` |
| C5 | Process (4 шага) | 🔴 | 🔴 | 🔴 | `specs/02 §6` |
| C6 | Gallery (masonry) | 🔴 | 🔴 | 🔴 | `specs/02 §7` |
| C7 | Reviews | 🔴 | 🔴 | 🔴 | `specs/02 §8` |
| C8 | About | 🔴 | 🔴 | 🔴 | `specs/02 §9` |
| C9 | FAQ | 🔴 | 🔴 | 🔴 | `specs/02 §10` |
| C10 | Booking + map | 🔴 | 🔴 | 🔴 | `specs/02 §11` |
| C11 | Footer | 🔴 | 🔴 | 🔴 | `specs/02 §12` |
| C12 | Sticky mobile CTA | — | — | 🔴 | `specs/02 §13` |

× 3 палитры (cream / slate / sage) — но достаточно pixel-аудит на `cream`, остальные через unit-snapshot color-only.

**Customer итого:** 0 / 34 pixel-audited · 0 / 34 baseline · 12 / 12 spec.

---

## P0 Клиентский ЛК — `/admin-demo` (`screens-client-admin-demo.jsx`)

| # | Tab | 1440 | 768 | 390 | Spec |
|---|---|---|---|---|---|
| 7b.1 | Аналитика (default) | 🔴 | 🔴 | 🔴 | `specs/01 §12` |
| 7b.2 | Сайт | 🔴 | 🔴 | 🔴 | `specs/01 §12` |
| 7b.3 | Заявки | 🔴 | 🔴 | 🔴 | `specs/01 §12` |
| 7b.4 | Отзывы | 🔴 | 🔴 | 🔴 | `specs/01 §12` |
| 7b.5 | Услуги | 🔴 | 🔴 | 🔴 | `specs/01 §12` |
| 7b.6 | Настройки | 🔴 | 🔴 | 🔴 | `specs/01 §12` |

⚫ Сама страница `/admin-demo` ещё не построена в продакшене.

**Admin-demo итого:** 0 / 18 pixel-audited · 0 / 18 baseline · 6 / 6 spec · 0 / 6 prod-pages.

---

## P0 Admin (`screens-admin-core.jsx`, `screens-admin-ops.jsx`)

| # | Screen | 1440 | 768 | Spec |
|---|---|---|---|---|
| 10 | Admin login · step 1 | 🔴 | 🔴 | `specs/05 §1` |
| 10 | Admin login · step 2 (TOTP) | 🔴 | 🔴 | `specs/05 §1` |
| 10 | Admin login · rate-limited | 🔴 | 🔴 | `specs/05 §1` |
| 11 | Dashboard | 🔴 | — | `specs/05 §2` |
| 12 | Applications list | 🔴 | — | `specs/05 §3` |
| 13 | Application detail | 🔴 | — | `specs/05 §4` |
| 14 | Sites list | 🔴 | — | `specs/05 §5` |
| 15 | Site detail | 🔴 | — | `specs/05 §6` |
| 16 | Leads | 🔴 | — | `specs/05 §7` |
| 16 | Leads · decrypt modal | 🔴 | — | `specs/05 §7` |
| 17 | Waitlist | 🔴 | — | `specs/05 §8` |
| 18 | Feedback inbox | 🔴 | — | `specs/05 §9` |
| 19 | Settings | 🔴 | — | `specs/05 §10` |

Admin — desktop-first (founder-side). Mobile только для login (founder может зайти с телефона).

**Admin итого:** 0 / 16 pixel-audited · 0 / 16 baseline · 10 / 10 spec.

---

## Сводка

| Категория | Pixel-сверено | Baseline есть | Spec есть | Прод-страница есть |
|---|---|---|---|---|
| Landing | 1 / 30 | 30 / 30 | 10 / 10 | 10 / 10 |
| Public intake (2–9) | 0 / 24 | 0 / 24 | 8 / 8 | 8 / 8 |
| Customer site (#7) | 0 / 34 | 0 / 34 | 12 / 12 | 12 / 12 (старая v2) |
| Admin demo (#7b) | 0 / 18 | 0 / 18 | 6 / 6 | **0 / 6** |
| Admin (10–19) | 0 / 16 | 0 / 16 | 10 / 10 | 10 / 10 |
| **Итого** | **1 / 122 (0.8 %)** | **30 / 122 (25 %)** | **46 / 46 (100 %)** | **40 / 46 (87 %)** |

---

## Что делать

См. `BASELINES_PLAN.md` — конкретный roadmap по тирам. Кратко:

- **Tier 1** (1–2 дня): включить pixel-assert для 27 landing-секций × viewport, у которых уже есть baselines.
- **Tier 2** (3–5 дней): сгенерировать baselines для customer-site, intake, admin из `canon/index.html`.
- **Tier 3** (5–7 дней): построить `/admin-demo` и сверить.

Pipeline и команды — в `PIXEL_PERFECT_SETUP.md`.
