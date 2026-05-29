# Visual Coverage Tracker — Самосайт

> **Цель:** pixel-perfect 1:1 канона на 4 viewports (1440 / 768 / 390 / 375) для всех 19 экранов.
> 390 = iPhone 12-15 Pro standard (типичный современный iPhone).
> 375 = iPhone SE / mini / Reachability mode (минимальная безопасная ширина — если макет выживает здесь, выживает везде).
> **Сейчас:** canon 0.9.1 — landing-разметка не менялась с 0.8.0 (10 секций через canon, drift = 0); 0.9.1 переводит `S9_FeedbackModal` на **controlled API** (`open`/`onOpenChange`/`tally`/`onSubmit`/`submitting`/`error`/`embedded` + 5 TS-типов; zero-prop = canvas-mock). Раскатка завершена: PR1 (вендор 0.9.0) + PR3 (backend votes/tally + миграция 0012) + PR-A (вендор 0.9.1 controlled) + PR-B (консьюмер) — все merged. Feedback на проде = глобальная canon-модалка `<FeedbackModal>` (тонкий адаптер `tally`←GET / `onSubmit`→POST / `embedded={false}`, монтируется в `app/layout.tsx`, self-hide на `/admin*`+`/login`); `/feedback` ретайрнут (301→`/`), hand-rolled `FeedbackForm` удалён. **Landing (0.8.0, без изменений):** Examples → Cycle → Monday → BaseWork → Sources → Analytics → Ownership → Pricing → FAQ → FinalCta (Analytics над Ownership, в каноне). 0.8.0: `ExamplesSection` переписан как фикс-высотная (460px) **карусель превью** (`ExamplesCarousel`) + блок `HowItPicks` «Дизайн собирается из ваших материалов»; `PricingSection` = 5-тарифная `PricingMatrix` (490/990 модель убрана окончательно); `BaseWorkSection` (чистые редакционные карточки) и `OwnershipSection` (2×2 мини-контролы, перенесён под аналитику, без «Демо ЛК») переверстаны; у Я.Карт снят бейдж «ЧАЩЕ ВСЕГО»; хедер-навигация = Примеры · Цена · Помощь · Войти. **Vendoring-фикс:** upstream 0.8.0 preview→package конвертер протёк (leaked IIFE opener + self-ref `const PresetRenderer = PresetRenderer`) — 2 минимальных правки в `src/landing/index.tsx`, залогировано в CHANGELOG 0.8.0 + отправлено Claude Design. Консьюмерские хаки (`SiteHeader` href-override, `CanonCtaBindings` ownership-demo-removal → no-op, `/feedback` для «Не нашли свою») сверены с 0.8.0-разметкой — работают без изменений. Hand-rolled Hero синхронизирован с каноном 0.7.2 (абзацы 1/2, `<ChipStrip>` импортом) — копи Hero в 0.8.0 не менялась. Композиция `app/page.tsx` не менялась. Canvas mirror + baselines остались от 0.6.0 (smoke-only, не enforced). `/admin-demo` shipped (PR #122). `/customer-demo` shipped (PR #124). Hero (interactive), `*.samosite.online` customer sites, admin chrome, intake — остаются hand-rolled (см. `CANON_SWAP_PLAN.md` для пути forward).
> Обновляй этот файл при каждом изменении coverage — это единственный трекер прогресса.

Легенда: 🟢 pixel-audited (diff ≤ 2%) · 🔵 canon-import (drift=0 by construction) · 🟡 baseline есть, smoke-only · 🔴 нет baseline · ⚫ компонент не построен

---

## P0 Landing — canon 0.6.0 v3 narrative (11 blocks)

`landing/app/page.tsx::HomePage` renders 11 blocks in fixed order — block #1 (Hero) hand-rolled, blocks #2-#11 dropped in from `@samosite/canon/landing`.

| # | Section | Source | 1440 | 768 | 390 | 375 | Spec |
|---|---|---|---|---|---|---|---|
| L1 | Hero | hand-rolled `components/Hero.tsx` | 🟡 | 🟡 | 🟡 | 🟡 | `specs/01 §3` |
| L2 | Examples | canon `ExamplesSection` | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §5` |
| L3 | Cycle (NEW) | canon `CycleSection` | 🔵 | 🔵 | 🔵 | 🔵 | canon 0.6.0 §3 |
| L4 | Monday (NEW) | canon `MondaySection` | 🔵 | 🔵 | 🔵 | 🔵 | canon 0.6.0 §3 |
| L5 | BaseWork (NEW) | canon `BaseWorkSection` | 🔵 | 🔵 | 🔵 | 🔵 | canon 0.6.0 §3 |
| L6 | Sources (NEW) | canon `SourcesSection` | 🔵 | 🔵 | 🔵 | 🔵 | canon 0.6.0 §3 |
| L7 | Analytics | canon `AnalyticsSection` | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §9` |
| L8 | Ownership | canon `OwnershipSection` | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §9` |
| L9 | Pricing | canon `PricingSection` | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §10` |
| L10 | FAQ | canon `FaqSection` | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §11` |
| L11 | FinalCta (NEW) | canon `FinalCtaSection` | 🔵 | 🔵 | 🔵 | 🔵 | canon 0.6.0 §3 |

**Landing итого (v3 narrative):** 40 canon-import drift=0 (sections 2-11 × 4vp) + 4 smoke (Hero × 4vp) = **44 / 44 covered**.

**Что выпало из canon 0.5.x:**
- Story (6-step zigzag) — removed в canon 0.6.0, narrative заменён на Cycle + Monday + BaseWork
- Platforms (явные 2 списка) — заменён на Sources (новая копи под цикл «искра → дисциплина»)
- BigFeatures (8 «сам») — растворены в Cycle (фокус на «5 моментов цикла») + Monday («каждый понедельник Самосайт работает за вас»)
- FreeMonth → FinalCta — sister CTA в самом низу с переписанным сообщением и микрокопией под кнопку

Hero (L1) — рендерится через `landing/components/Hero.tsx` (наш hand-rolled, с интерактивным input + SubmitModal flow). Canon's `HeroBlock` ship'нут в `@samosite/canon/landing` но read-only — заменим когда canon добавит interactive variant (см. `CANON_SWAP_PLAN.md` §Hero для статуса).

**Note на 490 ₽:** Hero microcopy + FinalCta содержат строку «990 ₽/мес · для первой сотни 490 ₽ навсегда» из canon 0.6.0 — это frontend-only promise (cohort-discount messaging). Backend ЮKassa остаётся на 990 ₽ — cohort enforcement out of scope этой итерации. См. `CANON_SWAP_PLAN.md` §«490 vs 990».

---

## P0 Public intake (`screens-intake.jsx`, `screen-02-source.jsx`)

| # | Screen | 1440 | 768 | 390 | 375 | Spec |
|---|---|---|---|---|---|---|
| 2 | SourceDetectionBadge (9 состояний) | 🔴 | 🔴 | 🔴 | 🔴 | `specs/06 §1` |
| 3 | SubmitModal · шаг 1 | 🔴 | — | 🔴 | 🔴 | `specs/06 §2` |
| 3 | SubmitModal · шаг 2 | 🔴 | — | 🔴 | 🔴 | `specs/06 §2` |
| 3 | SubmitModal · шаг 3 | 🔴 | — | 🔴 | 🔴 | `specs/06 §2` |
| 4 | TG bot setup | 🔴 | — | 🔴 | 🔴 | `specs/06 §3` |
| 5 | Confirmation | 🔴 | — | 🔴 | 🔴 | `specs/06 §4` |
| 6 | PhotoDrawer · desktop | 🔴 | — | — | — | `specs/06 §5` |
| 6 | PhotoDrawer · mobile | — | — | 🔴 | 🔴 | `specs/06 §5` |
| 8 | LeadForm inline confirm | 🔴 | 🔴 | 🔴 | 🔴 | `specs/06 §6` |
| 9 | FeedbackModal (global, canon 0.9.1) | 🔵 | 🔵 | 🔵 | 🔵 | `specs/06 §7` |

**Public intake итого:** 0 / ~32 pixel-audited · 0 / 32 baseline · 8 / 8 spec.

---

## P0 Customer site (`screens-customer.jsx`)

| # | Section | 1440 | 768 | 390 | 375 | Spec |
|---|---|---|---|---|---|---|
| C1 | Sticky header | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §2` |
| C2 | Hero | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §3` |
| C3 | Social proof bar | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §4` |
| C4 | Services | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §5` |
| C5 | Process (4 шага) | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §6` |
| C6 | Gallery (masonry) | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §7` |
| C7 | Reviews | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §8` |
| C8 | About | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §9` |
| C9 | FAQ | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §10` |
| C10 | Booking + map | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §11` |
| C11 | Footer | 🔴 | 🔴 | 🔴 | 🔴 | `specs/02 §12` |
| C12 | Sticky mobile CTA | — | — | 🔴 | 🔴 | `specs/02 §13` |

× 3 палитры (cream / slate / sage) — но достаточно pixel-аудит на `cream`, остальные через unit-snapshot color-only.

**Customer итого:** 0 / 45 pixel-audited · 0 / 45 baseline · 12 / 12 spec.

---

## P0 Клиентский ЛК — `/admin-demo` (`screens-client-admin-demo.jsx`)

| # | Tab | 1440 | 768 | 390 | 375 | Spec |
|---|---|---|---|---|---|---|
| 7b.1 | Аналитика (default) | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §12` |
| 7b.2 | Сайт | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §12` |
| 7b.3 | Заявки | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §12` |
| 7b.4 | Отзывы | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §12` |
| 7b.5 | Услуги | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §12` |
| 7b.6 | Настройки | 🔵 | 🔵 | 🔵 | 🔵 | `specs/01 §12` |

🔵 `/admin-demo` shipped как drop-in `<ClientAdminDemo />` из `@samosite/canon/admin-demo` (PR #122). Drift=0 by construction для всех 6 табов × 4 viewports = 24 surfaces.

**Admin-demo итого:** **24 / 24 canon-import drift=0** · 6 / 6 spec · 1 / 1 prod-page.

---

## P0 Admin (`screens-admin-core.jsx`, `screens-admin-ops.jsx`)

| # | Screen | 1440 | 768 | 375 | Spec |
|---|---|---|---|---|---|
| 10 | Admin login · step 1 | 🔴 | 🔴 | 🔴 | `specs/05 §1` |
| 10 | Admin login · step 2 (TOTP) | 🔴 | 🔴 | 🔴 | `specs/05 §1` |
| 10 | Admin login · rate-limited | 🔴 | 🔴 | 🔴 | `specs/05 §1` |
| 11 | Dashboard | 🔴 | — | — | `specs/05 §2` |
| 12 | Applications list | 🔴 | — | — | `specs/05 §3` |
| 13 | Application detail | 🔴 | — | — | `specs/05 §4` |
| 14 | Sites list | 🔴 | — | — | `specs/05 §5` |
| 15 | Site detail | 🔴 | — | — | `specs/05 §6` |
| 16 | Leads | 🔴 | — | — | `specs/05 §7` |
| 16 | Leads · decrypt modal | 🔴 | — | — | `specs/05 §7` |
| 17 | Waitlist | 🔴 | — | — | `specs/05 §8` |
| 18 | Feedback inbox | 🔴 | — | — | `specs/05 §9` |
| 19 | Settings | 🔴 | — | — | `specs/05 §10` |

Admin — desktop-first (founder-side). Mobile (768/375) только для login (founder может зайти с телефона).

**Admin итого:** 0 / 19 pixel-audited · 0 / 19 baseline · 10 / 10 spec.

---

## Сводка

| Категория | Coverage | Note |
|---|---|---|
| Landing — Hero | 4 smoke (1440/768/390/375) | hand-rolled (interactive) — pixel-audit @ 1440 stale, regenerated в PR #153 как smoke до next canon interactive variant |
| Landing — sections 2-11 (v3) | **40 / 40 canon-import drift=0** | via `@samosite/canon/landing` (PR #152 canon 0.6.0); 10 sections × 4 viewports |
| Public intake (2–9) | 0 / 32 | hand-rolled, no baselines |
| Customer site (#7) | 0 / 45 | hand-rolled (sites-template Jinja), no baselines |
| Admin demo (#7b) | **24 / 24 canon-import drift=0** | `/admin-demo` shipped (PR #122), 4 viewports |
| Customer demo on landing (#7) | **34 / 34 canon-import drift=0** | `/customer-demo` shipped (PR #124), drop-in `<CustomerSite scheme={...} />` — covers 12 sections × ~3 viewports (palette via `?scheme=cream\|slate\|sage`). The deployed `*.samosite.online` Jinja sites remain hand-rolled until customer-SSR swap. |
| Admin (10–19) | 0 / 19 | hand-rolled, no baselines |
| **Итого** | **102 / 158 covered** | 98 of them via canon drift=0 |

---

## Что делать дальше

PR #119 закрыл Landing sections 2-10 одним махом (canon import = drift=0).
PR #122 закрыл `/admin-demo`. PR #124 закрыл `/customer-demo` (palette preview).
PR #152 + #153 закрыли canon 0.6.0 v3 narrative refresh (10 секций × 4 viewport = 40 surfaces).
Дальше — surfaces из `CANON_SWAP_PLAN.md`, все требуют canon 0.7.x interactive variants (props-based handlers per `CANON_SWAP_PLAN.md` §Hybrid pattern Option A):

1. **Hero → `@samosite/canon/landing::HeroSection`** — canon's HeroBlock остаётся read-only в 0.6.0. Swap unblocked когда canon ships interactive HeroSection (props: `value, onChange, onSubmit, badge, freeMonth`). 0.7.x cadence ~1-2 weeks per `CANON_SWAP_PLAN.md` §Hero.
2. **Customer site → `@samosite/canon/customer::CustomerSite`** — заменить Jinja `sites-template/index.html.j2` рендер на React-canon. Backend SSRs canon-React component, кладёт HTML в Yandex Object Storage. Cовместимость: canon-импорт = ровно canon. Hand-rolled drift = 0.
3. **Admin core → `@samosite/canon/admin-core`** — `AdminLogin`, `AdminDashboard`, `AppsList`, `AppDetail` в качестве drop-in для `landing/app/admin/*`. Founder-side UI, не критичен для конверсии.
4. **Admin ops → `@samosite/canon/admin-ops`** — `SitesList`, `SiteDetail`, `Leads`, `Waitlist`, `FeedbackInbox`, `Settings`. Same.
5. **Intake → `@samosite/canon/intake`** — `SubmitModal` уже частично swapped (PR #135+ — canon 0.3.0 controlled-API wrapper). `FeedbackModal` (#9) swapped на canon 0.9.1 controlled API (`<FeedbackModal>` adapter). Остаются `Confirmation`, `LeadForm`. Большинство interactive — компромисс через DOM-mutation pattern (см. `landing/components/SiteHeader.tsx` для шаблона).

Pipeline и команды для оставшихся (если решим всё-таки делать pixel-diff): в `PIXEL_PERFECT_SETUP.md`. Но честное замечание: если canon-import = drift=0, pixel-diff избыточен. Тесты остаются только как smoke (проверка что DOM селекторы резолвятся).
