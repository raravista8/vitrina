# Customer-site v2.1 booking-page rewrite — plan

> Phase 9 из v2.1.3 roadmap (`CLAUDE_CODE_TZ_session_v2.1.3.md` + полный
> spec в `CLAUDE_CODE_TZ_customer_v2.1.md`, 816 lines).
>
> **Split на 3 PR'а** по user request: «split 9a + 9b + 9c».

## Context — почему rewrite

**Было** (v2 / current `sites-template/index.html.j2`):
brochure-page (hero + gallery + reviews + about + services + lead-form +
footer = 7 секций, форма заявки в конце страницы как finale).

**Стало** (v2.1 booking-page pattern):
10 секций + sticky-header + sticky-mobile-CTA. CTA каждые 1-2 экрана.
Услуги — карточки (не список). Форма + карта + мессенджеры в финале.
Reviews — отдельный блок с аватарами + mid-page CTA.

Главная цель — увеличить conversion на customer-site через классический
booking-page паттерн: «I see what I'm buying → I see why I should trust →
I see how to book → I book.»

## Phase 9a (этот PR — WIP skeleton)

**Deliverable:** `sites-template/index.html.j2.v21` — staging file с
полной структурой 10 секций. Минимальный inline CSS, placeholder
content. Original `index.html.j2` **не трогается** — продолжает обслуживать
существующие customer-sites.

**Что внутри:**
- Sticky header (§2) — brand + nav + tel + «Записаться» pill
- Hero (§3) — 2-col grid (text + photo), formula H1, dual CTA
- Social proof bar (§4) — «нас выбрали N человек за X лет» + badges
- Services cards (§5) — grid 2-col, не list
- Process (§6) — 4 steps с иконками, dashed connectors (CSS Phase 9b)
- Gallery (§7) — masonry 4-col, первая плитка 2×2
- Reviews (§8) — 3-col grid с аватарами + mid-page CTA
- About / specialist (§9) — photo + bio + creds + гарантии
- FAQ (§10) — native `<details>` × 8
- Final booking (§11) — 2-col form + Yandex Maps iframe
- Footer (§12) — расширенный
- Sticky mobile CTA (§13)

**Что НЕ внутри (deferred):**
- Polished CSS (carousel fallback на mobile если <10 фото, hover micro-
  interactions, animation refinement) — Phase 9b
- Process icons SVG (calendar/pin/coffee/sparkles) — Phase 9b
- Avatar fallback styling — Phase 9b
- Backend AI prompt updates для нового data shape — Phase 9c
- Switchover активного template — Phase 9c

## Phase 9b — CSS refinement + polish ✅ DONE

**Файл:** `sites-template/components/booking.css` (926 lines).

- [x] Extract все inline `<style>` блоки из `index.html.j2.v21` →
  `<link rel="stylesheet" href="/static/booking.css">`.
- [x] Process icons partial — `sites-template/components/process-icons.html.j2`
  с macro `process_icon(kind)` для 4 SVG glyphs (calendar/pin/coffee/sparkles).
  Source: `screens-customer.jsx :: ProcessIcon`.
- [x] Process connectors — `.ss-process-step:not(:last-child)::after`
  с dashed `repeating-linear-gradient`, только desktop (`min-width:
  768px`), hidden mobile.
- [x] Gallery mobile fallback — `.ss-gallery--carousel` class
  применяется через Jinja `{% if gallery | length < 8 %}` — horizontal
  scroll-snap на mobile, masonry на desktop.
- [x] Reviews avatar — `border-radius: 50%`, fallback `.ss-avatar--initials`
  с accent-soft bg + первой буквой имени.
- [x] Service cards — `.ss-service-card--featured { grid-column: 1 / -1 }`
  для нечётного count (apply через Jinja loop.first + odd check).
- [x] Sticky mobile CTA — `padding-bottom: calc(10px + env(safe-area-inset-bottom))`
  для iPhone X+ home-indicator clearance + extra footer-bottom для
  no-overlap.
- [x] Hover micro-interactions — service-cards lift, gallery-image
  scale 1.02, btn-primary lift + shadow.
- [x] `prefers-reduced-motion: reduce` — global disable transitions/
  transforms.
- [x] Webfonts — Onest + JetBrains Mono via Google Fonts (same subset
  как landing/app/globals.css).
- [ ] Lighthouse ≥90 mobile — verification отложен до Phase 9c когда
  template станет active production (нужен real Y.Object Storage URL
  + real fixture, не staging file).

## Phase 9c — AI prompts + active switchover

**Файлы:**
- `backend/app/core/content/prompts/customer_site.j2` (update prompt
  для нового data shape: site.hero.h1 formula generation, process
  steps under category context, faq Q&A pairs)
- `backend/app/core/publishing/render.py` (extend context dict с новыми
  полями: site.years_experience, site.clients_served, site.social_badges,
  process[], faq[], about{creds, guarantees}, site.geo)
- `sites-template/index.html.j2` ← **rename** original to
  `index.html.j2.legacy`, rename `index.html.j2.v21` to `index.html.j2`
  — атомарный switchover.
- Fixture tests (`backend/tests/integration/test_publishing_v21.py`) —
  render template с realistic fixture context, assert structure.
- Manual Lighthouse run для verification ≥90 mobile.

**Risk:** existing customer-sites продолжат работать с legacy template
до момента re-publish (которое триггерится либо вручную через admin,
либо weekly_curate_reviews cron). Чтобы избежать accidentally breaking
существующие prerender'ы — switchover делать после re-render всех active
sites с новой шаблонной структурой.

## Verification per phase

**9a (этот PR):**
- [x] `sites-template/index.html.j2.v21` создан со всеми 10 секциями
- [x] Jinja2 syntax valid (parsed без ошибок)
- [ ] Inline CSS прошёл sanity check (no obvious bugs)
- [ ] Reviewer прошёл через каждую секцию vs spec §2-§13

**9b:**
- [ ] All inline styles extracted to `components/booking.css`
- [ ] 4 process icons rendered (SVG inline)
- [ ] Mobile gallery carousel fallback works
- [ ] Lighthouse ≥90 mobile на test fixture

**9c:**
- [ ] AI prompts generate valid data shape для всех 10 секций
- [ ] Active template switched (atomic rename)
- [ ] Re-publish of 3 existing customer-sites — visual diff approved
- [ ] No regression in customer-sites currently на проде
