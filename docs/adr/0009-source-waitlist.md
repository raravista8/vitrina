# ADR-0009: Source prioritization via feedback waitlist; MVP = TG + Я.Карты + Фото only

Date: 2026-05-18
Status: Accepted

## Context

Изначальный план содержал 4-5 источников парсинга (TG, Я.Карты, VK, IG, Фото). После применения ADR-0004 (IG removed) и анализа solo-разработческой нагрузки — каждый источник = 5-7 дней разработки + maintenance + edge cases в перспективе. Делать 4 источника сразу = откладывать запуск на 4-6 недель.

Альтернативный подход: **3 источника в MVP + waitlist для остальных через feedback-форму**. Этот ADR фиксирует:
1. Минимальный набор источников
2. Механизм waitlist-приоритизации
3. Триггер для добавления нового источника

### Что было рассмотрено

- **5 источников сразу (TG, Я.Карты, VK, IG, Фото)** — отвергнуто: 5-6 недель чистой разработки парсеров до публичного запуска
- **2 источника (TG + Фото)** — отвергнуто: теряем локационный микробизнес (салоны, барбершопы), который сильно представлен на Я.Картах
- **1 источник (Я.Карты) + waitlist** — отвергнуто: TG-юзеры не дождутся, потеряем самый mainstream-канал
- **3 источника (TG + Я.Карты + Фото) + waitlist** — **выбрано**

## Decision

### MVP source list (frozen)

| Источник | Type | Status |
|---|---|---|
| Telegram-канал | URL | P0, ship MVP |
| Яндекс.Карты | URL | P0, ship MVP |
| Фото (работ + скриншоты + визитка + буклет) | Upload | P0, ship MVP — обслуживает IG/VK-юзеров через скриншоты |

### Waitlist (managed via feedback-form per FR-090..093)

Fixed checkbox list + open text field:

| Источник | Чекбокс | Реализуем когда |
|---|---|---|
| ВКонтакте (страница/группа) | ☐ | ≥10 голосов |
| Прямой парсинг Instagram | ☐ | ≥10 голосов **И** появится legal-clear путь (Meta delistment / IG Graph API approval / прецедент) |
| MAX-канал (как источник) | ☐ | ≥10 голосов **И** MAX Bot API стабилизирован для канал-парсинга [verify] |
| 2GIS-карточка | ☐ | ≥10 голосов |
| Avito-профиль | ☐ | ≥10 голосов |
| WhatsApp Business Catalog | ☐ | ≥10 голосов |
| YouTube/Shorts канал | ☐ | ≥10 голосов |
| Дзен / Дзен Бизнес | ☐ | ≥10 голосов |
| Парсинг собственного сайта юзера | ☐ | ≥10 голосов |
| Другое (open text field) | text | Если кластер ≥5 одинаковых ответов в open-text → промоутим до чекбокса |

**Ozon / Wildberries** в waitlist **не включены** — это другой product line (catalog/товары), а не услуги/JTBD текущего MVP. Если запросы появятся в open-text — отдельный ADR-0010 на pivoting/parallel-product (см. PRD OQ-8).

### Waitlist trigger mechanics

- Каждый раз когда юзер вставляет на Hero ссылку waitlist-источника → frontend показывает inline waitlist-capture (email field + auto-submit) + **параллельную** CTA «или сделайте скриншоты и создайте сейчас → S4»
- Submit в waitlist пишет в `feedback` с `type=source_request`, `source_name=<canonical>`, `email_or_contact`, `source_url_raw=<original>`, `referrer=hero_paste|feedback_form`
- Admin dashboard `/admin/waitlist` агрегирует: `source_name × count(distinct contact) × first_seen`
- Когда `count ≥ 10` для конкретного `source_name` → автоматический алерт founder'у в TG: «Waitlist X достиг 10. Решение: писать ADR или ждать?»
- Solid trigger ≥10 уникальных контактов, не submission'ов (один и тот же юзер не должен накручивать)

### Why threshold = 10

- ~10 голосов в waitlist ≈ 50-100 потенциальных юзеров (10% от тех кто хочет инструмент в open-source feedback channels) — оправдывает 5-7 дней разработки
- Калибровка по результатам первого месяца (см. OQ-10 в PRD)
- Меньше 10 — не делаем; ждём более сильного сигнала

### Screenshot strategy для IG/VK-юзеров (текущий путь)

Юзер вставивший `instagram.com/profile` или `vk.com/group` ссылку видит:

```
ℹ️ Instagram скоро будет. Пока — самый быстрый путь:
1. Сделайте скриншот вашего профиля (шапка с bio)
2. Сохраните 10-20 ваших лучших фото
3. Загрузите всё сюда → [Создать из фото]

или [Оставить email — напишем когда добавим Instagram]
```

Этот pathway:
- **Юридически чистый**: юзер фотографирует свой экран = собственная фотография
- **Технически работает в MVP** через расширенный S4 (`photo_type=profile_screenshot`)
- **Параллельно собирает waitlist-сигнал** для приоритизации
- **Конверсия ~50%** ожидается (vs <5% у архив-флоу) — юзер не ждёт 48ч у Meta, не качает ZIP

## Alternatives considered

- **Запустить с 5 источниками сразу** — rejected: +4-6 недель до публичного запуска, риск не дойти до PMF из-за iceberg-эффекта
- **Запустить с 1 источником** — rejected: Я.Карты only ≠ ICP coverage; TG only теряет локационных мастеров
- **Запустить с 3, добавлять без waitlist (по интуиции founder'a)** — rejected: data-driven приоритизация дешевле чем guessing; чекбокс — самый дешёвый proof-of-demand
- **Сразу VK добавить** — rejected: VK без IG теряет основную мотивацию (был «primary alternative для IG»); waitlist даст реальный сигнал, нужен ли VK сам по себе как source

## Consequences

**Positive:**
- **-5-7 дней разработки** (VK adapter удалён из MVP; T3.7 → REMOVED tombstone)
- **Data-driven roadmap**: следующий источник выбираем по голосам, а не по интуиции
- **Каждый waitlist-голос = email-захват** для будущего marketing reachout, когда фича появится
- **Screenshot-path** даёт IG/VK-юзерам способ получить сайт **сейчас**, не дожидаясь парсинга — это сильный proof point
- **Простой Hero copy**: «соцсеть, карты, фото» — universal, не врёт

**Negative:**
- Юзер из VK/IG может уйти расстроенным если photo-path кажется ему complex
- Threshold ≥10 может оказаться завышенным / заниженным — calibration risk
- Waitlist накопитель требует UI в admin dashboard (T7.0) — небольшая extra work

**Neutral:**
- Если waitlist по VK быстро достигнет 10 — VK всё равно реализуем в M2 как первый post-MVP источник. Это просто отсрочка, не отказ.

## Risks accepted

- Конкурент может анонсировать «парсим VK + Instagram + Ozon одной командой» — потенциальная conversion-leakage. Acceptable: их MVP вероятно тоньше, мы за то же время делаем core promise сильнее
- ICP-сегмент «VK-only мастер» теоретически теряем. Acceptable: гипотеза, что VK-only сегмент маленький в нашем ICP (мастера красоты, психологи, фитнес-тренеры) — проверяется через waitlist count

## Verification

```bash
# 1. MVP-источники строго ограничены:
ls backend/app/core/parsing/adapters/
# Должно быть только: ymaps.py, tg_*.py, photos.py
# НЕТ: vk.py, ig_*.py

# 2. import-linter блокирует возврат VK/IG в core/parsing:
cat backend/.importlinter | grep -A3 "name = mvp-source-list"

# 3. Hero auto-detect содержит waitlist-redirect для VK/IG/2GIS/etc:
grep -E "waitlist|source_request" landing/lib/source-detect.ts

# 4. Feedback form содержит все waitlist-чекбоксы + open field:
grep -c "source_request" landing/components/FeedbackForm.tsx  # >= 9 чекбоксов
grep "Другое" landing/components/FeedbackForm.tsx

# 5. Admin /admin/waitlist exists:
test -f backend/app/admin/routers/waitlist.py

# 6. Photo adapter handles 4 photo_types:
grep -E "work|profile_screenshot|business_card|booklet" backend/app/core/parsing/adapters/photos.py
```

## Open questions

- **OQ-9.1**: Чекбоксы в feedback-form — сейчас отдельный список от исходного ТЗ §6 (там были feature-чекбоксы: YCLIENTS, amoCRM, custom domain, watermark, мультиязычный, online-оплата, блог, статистика). Объединить в одну форму с двумя секциями («Хочу источник X» / «Хочу фичу Y») ИЛИ две отдельные формы? Решение: **одна форма, две секции** — снижает UI-сложность.
- **OQ-9.2**: Что считается «голосом» — `feedback.email` distinct OR `feedback.id` count? Решение: distinct contact (email или phone или TG), не дубли с того же контакта.
- **OQ-9.3**: Когда waitlist достиг 10 и фича сделана — как уведомляем waitlist'нувшихся? Email blast OR TG personal message? Решение: email blast если контакт=email, TG/SMS если контакт другой; через notification dispatcher (ADR-0008).
