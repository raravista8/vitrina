# Visual Coverage Tracker — Самосайт

> **Цель:** pixel-perfect 1:1 канона на 3 viewports (1440 / 768 / 390) для всех 19 экранов.
> **Сейчас:** landing секции 2-10 импортированы из `@samosite/canon/landing` напрямую (PR #119) — drift = 0 by construction. `/admin-demo` shipped (PR #122). `/customer-demo` shipped (PR #124) — preview-палитры customer site через canon. Hero, deployed `*.samosite.online` customer sites, admin chrome, intake — остаются hand-rolled (см. `CANON_SWAP_PLAN.md` для пути forward).
> Обновляй этот файл при каждом изменении coverage — это единственный трекер прогресса.

Легенда: 🟢 pixel-audited (diff ≤ 2%) · 🔵 canon-import (drift=0 by construction) · 🟡 baseline есть, smoke-only · 🔴 нет baseline · ⚫ компонент не построен

---

## P0 Landing — `landing-samosite.jsx`

| # | Section | 1440 | 768 | 390 | Spec |
|---|---|---|---|---|---|
| L1 | Hero | 🟢 | 🟡 | 🟡 | `specs/01 §3` |
| L2 | Examples | 🔵 | 🔵 | 🔵 | `specs/01 §5` |
| L3 | Story | 🔵 | 🔵 | 🔵 | `specs/01 §6` |
| L4 | Platforms | 🔵 | 🔵 | 🔵 | `specs/01 §7` |
| L5 | BigFeatures | 🔵 | 🔵 | 🔵 | `specs/01 §8` |
| L6 | Ownership | 🔵 | 🔵 | 🔵 | `specs/01 §9` |
| L7 | Analytics | 🔵 | 🔵 | 🔵 | `specs/01 §9` |
| L8 | Pricing | 🔵 | 🔵 | 🔵 | `specs/01 §10` |
| L9 | FAQ | 🔵 | 🔵 | 🔵 | `specs/01 §11` |
| L10 | FreeMonth | 🔵 | 🔵 | 🔵 | `specs/01 §11` |

**Landing итого:** 1 pixel-audited (Hero@1440) + 27 canon-import drift=0 (sections 2-10 × 3vp) + 2 smoke (Hero@768/390) = **30 / 30 covered**.

Hero — рендерится через `landing/components/Hero.tsx` (наш hand-rolled, с интерактивным input + SubmitModal flow). Canon's `HeroBlock` ship'нут в `@samosite/canon/landing` но read-only — заменим когда canon добавит interactive variant (см. canon 0.2.x в README package).

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

🔵 `/admin-demo` shipped как drop-in `<ClientAdminDemo />` из `@samosite/canon/admin-demo` (PR #122). Drift=0 by construction для всех 6 табов × 3 viewports = 18 surfaces.

**Admin-demo итого:** **18 / 18 canon-import drift=0** · 6 / 6 spec · 1 / 1 prod-page.

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

| Категория | Coverage | Note |
|---|---|---|
| Landing — Hero | 1 audited @ 1440 + 2 smoke | hand-rolled (interactive) |
| Landing — sections 2-10 | **27 / 27 canon-import drift=0** | via `@samosite/canon/landing` (PR #119) |
| Public intake (2–9) | 0 / 24 | hand-rolled, no baselines |
| Customer site (#7) | 0 / 34 | hand-rolled (sites-template Jinja), no baselines |
| Admin demo (#7b) | **18 / 18 canon-import drift=0** | `/admin-demo` shipped (PR #122), drop-in `<ClientAdminDemo />` |
| Customer demo on landing (#7) | **34 / 34 canon-import drift=0** | `/customer-demo` shipped (PR #124), drop-in `<CustomerSite scheme={...} />` — covers 12 sections × ~3 viewports (palette via `?scheme=cream\|slate\|sage`). The deployed `*.samosite.online` Jinja sites remain hand-rolled until customer-SSR swap. |
| Admin (10–19) | 0 / 16 | hand-rolled, no baselines |
| **Итого** | **80 / 122 covered** | 79 of them via canon drift=0 |

---

## Что делать дальше

PR #119 закрыл Landing sections 2-10 одним махом (canon import = drift=0).
PR #122 закрыл `/admin-demo`. PR #124 закрыл `/customer-demo` (palette preview).
Дальше — surfaces из `CANON_SWAP_PLAN.md`, все требуют canon 0.2.x interactive variants:

1. **Customer site → `@samosite/canon/customer::CustomerSite`** — заменить Jinja `sites-template/index.html.j2` рендер на React-canon. Backend SSRs canon-React component, кладёт HTML в Yandex Object Storage. Cовместимость: canon-импорт = ровно canon. Hand-rolled drift = 0.
2. **Admin core → `@samosite/canon/admin-core`** — `AdminLogin`, `AdminDashboard`, `AppsList`, `AppDetail` в качестве drop-in для `landing/app/admin/*`. Founder-side UI, не критичен для конверсии.
3. **Admin ops → `@samosite/canon/admin-ops`** — `SitesList`, `SiteDetail`, `Leads`, `Waitlist`, `FeedbackInbox`, `Settings`. Same.
4. **`/admin-demo` (#7b) → `@samosite/canon/admin-demo::ClientAdminDemo`** — новая страница, drop-in import. 5 дней по `BASELINES_PLAN §Tier 3` schedule → теперь 1 день (canon-import = тот же React-рендер).
5. **Intake → `@samosite/canon/intake`** — `SubmitModal`, `Confirmation`, `PhotoDrawer`, `LeadForm`, `FeedbackPage`. Но **большинство interactive** — потребуется тот же compromise, что с Hero (canon read-only). Defer до canon 0.2.x с hook-варианты.

Pipeline и команды для оставшихся (если решим всё-таки делать pixel-diff): в `PIXEL_PERFECT_SETUP.md`. Но честное замечание: если canon-import = drift=0, pixel-diff избыточен. Тесты остаются только как smoke (проверка что DOM селекторы резолвятся).
