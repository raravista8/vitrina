# Runbook: Я.Метрика goals (operator action)

> **TL;DR.** Frontend уже шлёт 7 goal-событий через `window.ym(counter, 'reachGoal', '<name>')`.
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

| # | Goal ID | Тип | Где fires | Что измеряем |
|---|---|---|---|---|
| 1 | `hero_paste` | JS event | `Hero.tsx` — `onPaste` на URL input | Юзер вообще что-то вставил — earliest intent signal |
| 2 | `hero_submit_attempt` | JS event | `Hero.tsx` — клик по «Собрать мой Самосайт» | Намерение отправить заявку (pre-API) |
| 3 | `hero_submit_success` | JS event | `SubmitModal.tsx` — backend ответил 202 | **Главная конверсия** — заявка принята |
| 4 | `socialproof_view` | JS event | `SocialProof.tsx` — IntersectionObserver 25% | Доскролил до социальных пруфов |
| 5 | `pricing_view` | JS event | `Pricing.tsx` — IntersectionObserver 25% | Доскролил до цены |
| 6 | `faq_open` | JS event | `FAQ.tsx` — open `<details>` | Активно ищет ответы на возражения |
| 7 | `free_month_cta_click` | JS event | `FreeMonthCTA.tsx` — клик по финальному CTA | Дожим сработал — другая воронка vs Hero CTA |

Все 7 — **JavaScript event goals** (тип `Событие JavaScript`).
Передаём только goal ID; **никаких PII** в payload не уходит. У некоторых
goals есть analytics-dimensions (channel, source, FAQ question ID) — они
безопасные строки из enum'ов, не user-data.

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
4. Кликнуть «Собрать мой Самосайт».
5. Опционально — заполнить шаг 2 модалки.
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
   - Шаги: `hero_paste` → `hero_submit_attempt` → `hero_submit_success`
   - Метрика «paste → submit» из аудита раздела 2.4 (цель M1 ≥30%)

2. **Scroll-depth** — Отчёты → Стандартные → Контент → Скроллинг + наши
   view-goals
   - Шаги: `landing visit` → `socialproof_view` → `pricing_view`
   - Показывает где люди отпадают перед ценой

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
