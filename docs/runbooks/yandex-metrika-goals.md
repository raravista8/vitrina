# Runbook: Я.Метрика goals (operator action)

> **TL;DR.** После релиза «Витрина v5 · Фарфор и лак» (июль 2026, canon 0.12.0)
> фронт шлёт **14 goal-событий** через `window.ym(counter, 'reachGoal', '<name>')`.
> Из них **4 уже заведены** под старый лендинг (`pricing_view`, `faq_open`,
> `feedback_open`, `feedback_submit`) — пережили редизайн с теми же именами.
> **10 новых надо создать** в UI metrika.yandex.ru (тип «JavaScript-событие»).
> Цели старого лендинга (21 шт.) больше не срабатывают — в UI их НЕ удалять
> (исторические данные), они просто затихнут.
>
> Время выполнения: ~10 минут (1 минута на goal).
> Кто делает: founder с доступом к counter `109331571`.
>
> **СТАТУС: выполнено 21.07.2026** — все 12 v5-целей заведены в UI (Claude
> через Chrome founder'а, тип «Целевое событие», оператор «Совпадает»).
> Попутно: `feedback_submit` в счётчике отсутствовала (заведена);
> старая `faq_open` (ID 563344753) была создана типом «url содержит» и
> никогда не срабатывала от reachGoal — заведена новая JS-версия
> (ID 587310954), старую можно удалить или оставить (данных в ней ноль).

---

## Актуальные goals (v5, июль 2026)

Источники правды в коде:

- `landing/lib/metrika.ts :: MetrikaGoal` + `ssTrack` — главная страница
- `landing/components/intake2/track.ts :: Intake2Goal` — интейк v2

### Создать в UI (10 новых)

**Главная (проводка `components/V5Landing.tsx`):**

| # | Goal ID | Триггер | Параметры |
|---|---|---|---|
| 1 | `story_view` | секция «История» во viewport (IntersectionObserver 0.4, по разу) | — |
| 2 | `reviews_view` | секция «Отзывы» во viewport | — |
| 3 | `form_open` | клик ЛЮБОГО CTA → открытие интейка | `entry`: hero \| header \| story \| final \| pricing-start\|lichnyj\|biznes \| example-<id>; `niche` (если из примера) |

**Интейк v2 (проводка `components/intake2/Intake2Flow.tsx`):**

| # | Goal ID | Триггер | Параметры |
|---|---|---|---|
| 4 | `demo_shown` | показан пример ниши (шаг «пример») | `niche`, `entry` |
| 5 | `niche_selected` | переключение ниши табом | `niche` |
| 6 | `source_path` | активирован путь источника | `path`: name \| screenshot \| link \| photo |
| 7 | `booking_platform_selected` | выбрана платформа записи | `platform`: dikidi \| yclients \| phone \| none |
| 8 | `contacts_shown` | показан шаг контактов | — |
| 9 | `submit` | клик «Отправить заявку» (попытка) | `channel`, `retry` |
| 10 | `submit_success` | **главная конверсия** — backend принял заявку (202) | `channel` |

### Уже существуют (пережили v5 с теми же именами — ничего делать не надо)

| Goal ID | Было (v3) | Стало (v5) |
|---|---|---|
| `pricing_view` | тарифная матрица во viewport | секция тарифов во viewport (`data-metric`) |
| `faq_open` | `<details>` в FAQ | аккордеон FAQ; параметр `question` = FaqItem.id |
| `feedback_open` | фидбек-модалка | без изменений (FAB «Чего не хватает?») |
| `feedback_submit` | голоса отправлены | без изменений |

### Больше НЕ срабатывают (v3-лендинг + instant-preview интейк ушли в v5)

`hero_paste`, `cta_click`, `hero_submit_attempt`, `submit_modal_open`,
`submit_photo_mode`, `submit_contact_step`, `hero_submit_success`,
`intake_niche_pick`, `intake_demo_view`, `intake_demo_claim`,
`intake_source_search`, `intake_candidate_pick`, `intake_preview_view`,
`intake_draft_claim`, `examples_view`, `cycle_view`, `monday_view`,
`final_cta_view`, `examples_anchor_click`, `login_click`,
`analytics_demo_click` (+ более ранние `socialproof_view`,
`free_month_cta_click`).

**НЕ удалять их в UI Я.Метрики** — исторические конверсии останутся в
отчётах; цели просто перестанут пополняться.

---

## Пошагово — как создать в UI Я.Метрики

1. https://metrika.yandex.ru/list → counter `109331571` («Самосайт»).
2. Левое меню → **Настройка** → **Цели** → **+ Добавить цель**.
3. Для каждой из 10 целей:

| Поле | Значение |
|---|---|
| **Тип цели** | `JavaScript-событие` |
| **Название** | Читаемое (см. колонку «Триггер») |
| **Идентификатор** | `<goal_id>` ровно как в коде |

**Пример для главной конверсии:**

```
Тип: JavaScript-событие
Название: Интейк v2 — заявка принята backend
Идентификатор: submit_success
```

---

## Подтвердить срабатывание

1. Открыть https://samosite.online/?_ym_debug=1 в incognito — консоль
   печатает каждый reachGoal.
2. Клик CTA «Собрать сайт за 2 часа» → в консоли `form_open {entry: "hero"}`.
3. Пройти интейк до контактов → `demo_shown`, `source_path`, `contacts_shown`.
4. Отчёты → Стандартные → Конверсии (фильтр «сегодня») — конверсии появятся
   через ~5 минут.

Все события дублируются в `window.dataLayer` — можно смотреть массив в
консоли без Метрики (`{event: "form_open", …}`). Либо DevTools → Network →
фильтр `mc.yandex` → запросы с `goal-id=<name>`.

---

## Полезные отчёты (v5-воронка)

1. **Воронка интейка**: `form_open` → `demo_shown` → `source_path` →
   `contacts_shown` → `submit` → `submit_success`.
   Разрез `form_open` по `entry` — какая CTA-точка приводит заявки;
   разрез `submit_success` по `channel` — какие каналы связи выбирают.
2. **Scroll-depth главной**: `story_view` → `reviews_view` → `pricing_view` +
   Отчёты → Контент → Скроллинг. Где отпадают до тарифов.
3. **FAQ**: `faq_open` по параметру `question` — какие вопросы реально
   волнуют (кандидаты в контент/офер).

---

## Tracking PII safety

В payload (3-й аргумент `ym(id, 'reachGoal', name, params)`) — только
безопасные enum'ы:
- `entry`, `niche`, `path`, `platform`, `question` — фиксированные словари UI
- `channel: "telegram"|"max"|"whatsapp"|"email"|"phone"` — enum интейка v2
- `retry: boolean`

**Запрещены в params:**
- содержимое любых input'ов (название дела, город, ссылки — могут нести PII)
- контакты (имя, телефон, email, telegram-handle)
- IP, user-agent (Я.Метрика собирает сама в стандартных полях)

См. SECURITY.md §11 (logging PII redaction) и FR-021.

---

## Что НЕ делаем (на будущее, после baseline-данных)

- **Я.Метрика experiments / AB** — пока трафика недостаточно. Возвращаемся
  когда landing даёт ≥100 уникальных в день.
- **Цели на customer-сайтах** (`*.samosite.online`) — другой counter, не
  смешиваем. Отдельный runbook когда будет первый платящий мастер.
- **Server-side ecommerce events** — для будущей подписки ЮKassa (T9.1) в
  `core/billing/service.py`.
