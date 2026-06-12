# Runbook: Я.Метрика goals (operator action)

> **TL;DR.** Frontend шлёт 24 goal-события через `window.ym(counter, 'reachGoal', '<name>')`
> (обновлено под canon 0.7.x landing — 11 блоков; +7 intake-goals в
> canon 0.11.0 instant-preview consumer).
> Чтобы Я.Метрика начала отображать конверсии в отчётах — каждый goal надо
> один раз создать в UI metrika.yandex.ru. Это **operator action** — Claude
> Code не имеет доступа к UI Я.Метрики, оператор должен сделать это сам.
>
> Время выполнения: ~10 минут (1 минута на goal).
> Когда делать: один раз, после того как PR с этим runbook'ом задеплоен в прод.
> Кто делает: founder с доступом к counter `109331571`.

---

## Список goals (как они есть в коде)

Источник правды — `landing/lib/metrika.ts :: MetrikaGoal type`.

**Воронка конверсии (P0):**
| # | Goal ID | Где fires | Что измеряем |
|---|---|---|---|
| 1 | `hero_paste` | `Hero.tsx` — `onPaste` на URL input | Earliest intent — вставил ссылку |
| 2 | `cta_click` | `SiteHeader.tsx` (header/Monday/Pricing/Final) + `Hero.tsx` (hero) | **Любой** клик «Собрать сайт за 2 часа». Параметр `source`: header \| hero \| monday \| pricing \| final |
| 3 | `hero_submit_attempt` | `Hero.tsx` — клик по CTA именно в Hero | Hero-намерение + `detection`/`mode` |
| 4 | `submit_modal_open` | `Hero.tsx` — модалка открылась (любой вход) | Открыл форму добавления сайта |
| 5 | `submit_photo_mode` | `Hero.tsx` + `SubmitModal.tsx` | Выбрал режим загрузки фото |
| 6 | `submit_contact_step` | `SubmitModal.tsx` — шаг «куда писать» | Дошёл до контактного шага |
| 7 | `hero_submit_success` | `SubmitModal.tsx` — backend 200 | **Главная конверсия** — заявка принята |

**Вовлечённость по секциям (P1, IntersectionObserver 33% / open):**
| # | Goal ID | Секция |
|---|---|---|
| 8 | `examples_view` | Examples (карусель примеров) |
| 9 | `cycle_view` | «Цикл 4 сам» |
| 10 | `monday_view` | «По понедельникам — три предложения» |
| 11 | `pricing_view` | тарифная матрица |
| 12 | `final_cta_view` | финальный блок-лестница |
| 13 | `faq_open` | раскрыт `<details>` в FAQ (параметр `question`) |

**Вторичные действия (P2):**
| # | Goal ID | Триггер |
|---|---|---|
| 14 | `examples_anchor_click` | «Сначала посмотреть примеры ↓» в Hero |
| 15 | `login_click` | «Войти» в шапке (→ /login) |
| 16 | `feedback_open` | вход в фидбек; параметр `source`: fab \| sources \| footer \| final |
| 17 | `analytics_demo_click` | «Посмотреть демо ЛК» под аналитикой (→ /admin-demo) |

**Instant-preview intake (P0, canon 0.11.0 rev.2 «ниша-демо»):**
воронка ниша → демо → источник → превью → заявка, все fires в
`SubmitModal.tsx` (`docs/handoff/CANON_INSTANT_PREVIEW_REV2_TZ.md §8`):
| # | Goal ID | Триггер |
|---|---|---|
| 18 | `intake_niche_pick` | выбрана ниша на шаге 0; параметр `niche`: id из NICHE_LIB \| free_text |
| 19 | `intake_demo_view` | показан пример сайта (шаг 0b) |
| 20 | `intake_demo_claim` | клик «Заменить на ваши данные» |
| 21 | `intake_source_search` | запущен поиск по названию (шаг «Источник») |
| 22 | `intake_candidate_pick` | выбран кандидат из выдачи Я.Карт |
| 23 | `intake_preview_view` | показан готовый черновик (превью) |
| 24 | `intake_draft_claim` | клик «Забрать сайт бесплатно» на превью |

Все 24 — **JavaScript event goals** (тип `Событие JavaScript`).
Передаём только goal ID (+ безопасные enum-параметры `source`/`detection`/
`mode`/`question`/`niche`); **никаких PII** в payload не уходит.

> **Удалены из кода** (canon 0.7.x — секций больше нет): `socialproof_view`
> (SocialProof убран в 0.6.0), `free_month_cta_click` (FreeMonth → FinalCta).
> Если эти цели уже были созданы в UI Я.Метрики — **не удаляйте** их
> (исторические данные сохранятся), они просто перестанут срабатывать.

---

## Пошагово — как создать в UI Я.Метрики

### 1. Открыть «Цели» в counter

1. https://metrika.yandex.ru/list — выбрать counter `109331571` («Самосайт»).
2. Левое меню → **Настройка** → **Цели**.
3. Кнопка **+ Добавить цель**.

### 2. Создать goal — template

Для каждого из 7 goals выше:

| Поле | Значение |
|---|---|
| **Тип цели** | `JavaScript-событие` |
| **Название** | См. колонку «Что измеряем» в таблице выше (читаемое, не ID) |
| **Идентификатор** | `<goal_id>` ровно как в коде (см. колонка «Goal ID») |
| **Ретроспектива** | По умолчанию (последние 90 дней) |

Сохранить. Повторить для всех 7.

**Пример заполнения для `hero_submit_success`:**

```
Тип: JavaScript-событие
Название: Hero — заявка принята backend
Идентификатор: hero_submit_success
```

### 3. Подтвердить срабатывание

После создания goal'а Я.Метрика сразу начнёт собирать его — но из-за
существующих сессий статистика может быть пустой. Что делать:

1. Открыть https://samosite.online/ в режиме incognito.
2. Открыть DevTools → Console.
3. Вставить URL в Hero input (`https://yandex.ru/maps/...`).
4. Кликнуть «Собрать сайт за 2 часа».
5. Опционально — заполнить контактный шаг модалки.
6. В Я.Метрике: **Отчёты → Стандартные → Конверсии**, фильтр на сегодня →
   через ~5 минут goal-конверсии появятся.

Альтернативно — Я.Метрика debug-режим:
```bash
# В URL добавить ?_ym_debug=1
https://samosite.online/?_ym_debug=1
```

Тогда `console.log` будет показывать «reachGoal: hero_paste» при каждом fire.

---

## Полезные отчёты в Я.Метрике

После того как goals соберут данные (~неделя реального трафика):

1. **Воронка** — Отчёты → Конверсии → Конверсии (drag-n-drop)
   - Шаги: `cta_click` → `submit_modal_open` → `submit_contact_step` →
     `hero_submit_success`
   - Плюс ранний сигнал `hero_paste` перед `cta_click`. Метрика
     «paste → submit» (цель M1 ≥30%). Разрез `cta_click` по параметру
     `source` — какая CTA-точка приводит больше всего открытий модалки.

2. **Scroll-depth** — Отчёты → Стандартные → Контент → Скроллинг + наши
   view-goals
   - Шаги: `examples_view` → `cycle_view` → `monday_view` →
     `pricing_view` → `final_cta_view`
   - Показывает где люди отпадают по длине страницы (особенно до/после цены)

3. **FAQ-aktivität** — Отчёты → Конверсии, goal=`faq_open`
   - Параметр `question` (data-faq-id) — какой вопрос чаще всего открывают
   - Если #6 «куда отправляется заявка» — топ-1, значит контакт-флоу
     непонятен

4. **CTA cohort** — Отчёты → Конверсии, фильтр `hero_submit_success`
   с параметром `channel` — какой канал лидирует (TG / phone / email / MAX)

---

## Tracking PII safety

В прицепляемом payload (3-й аргумент `ym(id, 'reachGoal', name, params)`)
**безопасные** значения:
- `channel: "telegram"|"phone"|"email"|"max"` — enum из ADR-0008
- `source: "telegram"|"yandex_maps"|"vk"|"instagram"|...` — enum из FR-005
- `detection: "mvp"|"waitlist"|"unknown_url"|"not_url"` — enum
- `question: "q1"|"q2"|...` — FAQ position index

**Запрещены в params:**
- URL содержимого input'а (может содержать `@username`, телефон в QR-коде, etc)
- Любые поля из модалки шага 2 (имя, телефон, email, telegram-handle)
- IP, user-agent (Я.Метрика сама собирает в стандартных полях)

См. также SECURITY.md §11 (logging PII redaction) и FR-021.

---

## Что НЕ делаем (на будущее, после baseline-данных)

- **Я.Метрика experiments / AB** — пока трафика недостаточно для A/B testing.
  Возвращаемся когда landing будет давать ≥100 уникальных за день.
- **Цели на customer-сайтах** (`*.samosite.online`) — другой counter, не
  смешиваем. См. отдельный runbook когда будет первый платящий мастер.
- **Server-side ecommerce events** — для будущей подписки ЮKassa. Когда
  T9.1 покатится, добавляем в `core/billing/service.py`.

---

## Verification что код реально шлёт events

Без захода в Я.Метрику UI можно проверить через DevTools:

```bash
# 1. Открыть samosite.online в Chrome
# 2. Open DevTools → Network → filter "mc.yandex"
# 3. Сделать paste в Hero input — должен появиться запрос вида:
#    GET https://mc.yandex.ru/watch/109331571/?wmode=...&ev=2&ar=...&goal-id=hero_paste
# 4. Аналогично для других goals
```

Если запросов нет — Я.Метрика snippet не загружен (проверь
`NEXT_PUBLIC_YANDEX_METRIKA_ID` env var) или adblocker блокирует.
