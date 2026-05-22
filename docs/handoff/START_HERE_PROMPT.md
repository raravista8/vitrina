# Стартовый промпт для Claude Code

> Скопируй всё, что ниже строки `---`, в первое сообщение в Claude Code.
> Перед этим убедись, что папка `design_handoff_samosite/` лежит в корне твоего репо.

---

Я переношу UI-обновления проекта «Самосайт» (`samosite.online`) в продакшен. Полный handoff-пакет лежит в `design_handoff_samosite/` в корне репо. Прежде чем что-либо делать, прочитай его целиком в правильном порядке.

## Шаг 1 — прочитай контекст

Открой и прочитай **в этом порядке**:

1. `design_handoff_samosite/README.md` — карта пакета, приоритет источников, acceptance criteria.
2. `design_handoff_samosite/TOKENS.md` — все дизайн-токены (цвета oklch, шрифты, радиусы, тени).
3. `design_handoff_samosite/SCREEN_INDEX.md` — карта 19 экранов: канон → прод-файл.
4. `design_handoff_samosite/VISUAL_COVERAGE.md` — трекер pixel-coverage. Сейчас 1 / 122 — это главный gap.
5. `design_handoff_samosite/PIXEL_PERFECT_SETUP.md` — Playwright+pixelmatch инфраструктура с готовым кодом.
6. `design_handoff_samosite/BASELINES_PLAN.md` — Tier 1/2/3 план закрытия gap, ~16 дней.
7. `design_handoff_samosite/specs/04_typography.md` — обязательные русские типографские правила (применяются ВСЕГДА).
8. `design_handoff_samosite/specs/03_session_v2.1.3.md` — последние правки копирайта/тарифа (перекрывают всё ниже).
9. `design_handoff_samosite/specs/01_landing_v2.1.md` — финальный лендинг + клиентский ЛК.
10. `design_handoff_samosite/specs/02_customer_v2.1.md` — booking-page customer-сайтов.
11. `design_handoff_samosite/specs/05_admin_screens.md` — детальные ТЗ для pixel-аудита admin 10–19.
12. `design_handoff_samosite/specs/06_public_screens_2_9.md` — детальные ТЗ для pixel-аудита public 2–9.
13. `design_handoff_samosite/specs/00_CLAUDE_CODE_TZ_base.md` — базовый ТЗ (разделы 1/3 перекрыты 01/02).

**Правило приоритета при конфликтах:**
typography (04) → session (03) → landing (01) / customer (02) → base (00) → канон в `canon/*.jsx` (источник истины по пикселям).

## Шаг 2 — изучи канон

Файлы в `design_handoff_samosite/canon/` — это **визуальные референсы** на React+Babel-prototype (один HTML с JSX через `@babel/standalone`). Это **не production-код**.

Открой `canon/index.html` в браузере (любой статический сервер) — там все 19 экранов на одном canvas. Это и есть pixel-канон, который нужно повторить 1:1 в продакшене.

При расхождении ТЗ и канона по визуальным параметрам (цвет / отступ / размер шрифта) — **побеждает канон**. При расхождении по копирайту — побеждает `specs/03_session_v2.1.3.md`.

## Шаг 3 — стек и существующий код

Существующий прод-код лежит в `design_handoff_samosite/code/`. Стек зафиксирован:

- **Лендинг + admin:** Next.js 16 App Router · React 19 · TypeScript · Tailwind · shadcn/ui · lucide-react · recharts.
- **Customer-сайт (`*.samosite.online`):** FastAPI + Jinja2 + Tailwind CDN (НЕ Next.js).

Дизайн-токены из `TOKENS.md` примени через `tailwind.config.ts` (готовый блок есть в конце `TOKENS.md`). Шрифты подключаются через Google Fonts: Onest 400–800 + JetBrains Mono 400–500.

## Шаг 4 — план

После того как прочитаешь весь контекст:

1. Покажи мне **диффы**, которые ты собираешься сделать на верхнем уровне: какие файлы создашь, какие изменишь, в каком порядке. Без кода — только список.
2. Покажи план миграции брейкинг-имён (`Витрина → Самосайт`, домены, боты) — какие файлы трогаем.
3. Покажи план pixel-perfect verification согласно `PIXEL_PERFECT_SETUP.md` и `BASELINES_PLAN.md`:
   - Сначала снимаем 5 блокеров из `PIXEL_PERFECT_SETUP.md §11`.
   - Затем идём по тирам из `BASELINES_PLAN.md` (Tier 1 → 2a → 2b → 2c → 3 → 4).
   - После каждого тира — обновляем `VISUAL_COVERAGE.md` (🔴 → 🟡 → 🟢).
4. **Жди моего апрува** перед тем, как писать код.

## Шаг 5 — реализация (после апрува)

Один экран за раз. После каждого:

- Сравнение с каноном на 3 viewports через Playwright (diff ≤ 2%).
- Typography lint (правила из `specs/04_typography.md §9`).
- Acceptance чек-лист из соответствующего раздела `specs/*.md`.

**Важно:**
- НЕ копируй JSX из `canon/` дословно. Воспроизводи на shadcn/ui + Tailwind по токенам.
- НЕ переименовывай Самосайт обратно в Vitrina нигде.
- НЕ добавляй секций / контента, которых нет в каноне.
- НЕ меняй стек.

Начинай с шага 1. После прочтения дай короткий summary (10–15 пунктов) что понял, потом переходи к шагу 4.
