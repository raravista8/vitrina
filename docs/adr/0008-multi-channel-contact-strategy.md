# ADR-0008: Multi-channel contact — accept TG / MAX / email / phone, **explicit radio**, fallback chain

Date: 2026-05-18 · **Revised 2026-05-21 (v2)**
Status: Accepted

> **v2 revision (2026-05-21).** Подход к выбору канала на шаге 2 онбординга
> переработан: **explicit radio picker для канала вместо auto-detect**. См.
> COPY.md §3.2 и self-critique §11.8.
>
> Auto-detect (как client-side, так и server-side `core/contact/auto_detect.py`)
> сохраняется как валидатор «введённое значение соответствует выбранному каналу?»
> — это **гарантия консистентности**, но больше не способ выбора канала.
>
> Что изменилось функционально:
> - На шаге 2 онбординга юзер сначала выбирает radio (TG / Phone / Email / MAX),
>   потом вводит значение. Поле под выбранный канал даёт placeholder и валидацию.
> - Если юзер ввёл `9167...` в radio=email — inline-ошибка «Это не email. Выбрать
>   канал Телефон?» с кнопкой переключения.
> - Backend контракт `POST /api/submit-application` теперь требует `channel`
>   полем + `contact` полем; 400 если они не совпадают (FR-002a v2).
>
> Что НЕ изменилось:
> - Список 4 каналов: TG / Phone / Email / MAX.
> - Нормализация (E.164 для phone, `@name` для TG, `max://...` для MAX).
> - Fallback chain в `core/notify/dispatcher.py` (telegram → max → email → SMS).
> - Шифрование PII (Fernet для phone/email, plain для TG-handle).
> - Per-channel-restrictions (SMS только post-publish — FR-002c).

## Context

В submit-modal (S1 step 4) юзер указывает контакт для получения уведомлений «сайт готов», «новый лид на вашем сайте», системных сообщений. Раннее проектирование предполагало два отдельных поля (email + TG-ник) — это **decision fatigue** и потери на самом узком месте воронки.

**v1 approach (auto-detect):** одно текстовое поле «Email, телефон, @telegram или MAX»; regex угадывает тип. Поймали жалобу на user-testing'е (2026-05-21): юзеры «машинально» вводили email потому что он первый в подсказке, не понимая что система accept-ит и другие каналы. Auto-detect делал контракт неявным.

**v2 approach (explicit radio):** юзер сначала **выбирает** канал явно (4 radio-кнопки), потом вводит значение. Контракт явный, поле под канал даёт specific placeholder и validation message. Auto-detect остаётся как safety-net «введённое соответствует выбранному?», но больше не управляет flow.

**Constraints:**
- ICP широкий: мастера маникюра 25-50 лет, регионы РФ + Москва/СПб. Не у всех есть TG-username (hidden или вообще не настроен)
- Все данные в РФ (ФЗ-152) → нельзя использовать Twilio/SendGrid/etc
- MAX набирает массу: 107M зарегистрированных, 77M DAU (март 2026), 156-ФЗ дал статус «национального мессенджера»
- TG потенциально под риском блокировки в РФ → strategic hedge нужен
- Founder = ИП, бюджет инфры ≤5000 ₽/мес, бюджет SMS ограничен

**Каналы оценены:**

| Канал | Pros | Cons | Стоимость |
|---|---|---|---|
| Telegram | Native в нашей экосистеме (TG-бот уже есть для парсинга и notify founder); high TG-аудитория в ICP | Не у всех ICP настроен `@username`; user must `/start` нашего бота перед получением DM | 0 |
| MAX | Растущая аудитория (gov-pushed, школы, госуслуги); ФЗ-156 «национальный мессенджер»; hedge от TG-blocking | Bot API менее зрелый; **публикация бота требует верифицированного юр.лица РФ через VK Business Suite** [verify ИП vs ООО requirement]; community libraries без VK одобрения (`maxapi-python`, `pymax`) — рискованно для prod; нет mature aiogram-equivalent | 0 |
| Email | Universal | Юзер забудет проверить; SMTP в РФ требует Yandex Mail/Selectel Postbox setup | ~0 (within free tier of email provider) |
| Phone (SMS) | Universal, SMS все читают | Стоимость per-SMS; spam vector если на submit; провайдер требует договор | ~2.5 ₽/SMS (SMS.ru) [verify] |

## Decision

Submit-modal содержит **одно поле контакта** + чекбокс согласия. Frontend regex-auto-detects тип, backend нормализует и сохраняет.

### Data model

`users` table:
- `contact_type` ENUM (`email`, `phone`, `telegram`, `max`)
- `contact_value` TEXT (normalized: phone in E.164, telegram as `@name`, MAX as canonical identifier)
- `contact_value_alt` TEXT NULL (optional fallback — заполняется если юзер позже добавляет второй контакт; в MVP можно не заполнять)
- `contact_verified_at` TIMESTAMPTZ NULL (для magic-link flow)

**Контактные значения шифруются Fernet, кроме `telegram` username** (публичный по природе). Phone и email — PII под ФЗ-152, шифруем.

### v2 — Explicit channel selection (canonical UX)

На шаге 2 онбординга юзер сначала выбирает radio (TG / Phone / Email / MAX), потом
вводит значение. Поле адаптируется к выбранному каналу:

| Radio | Placeholder | Validator |
|---|---|---|
| `telegram` | `@your_handle` | `^@?[a-z][a-z0-9_]{4,31}$` → normalize `@name` |
| `phone` | `+7 ...` | `phonenumbers` library, RU default-region, normalize to E.164 |
| `email` | `you@example.ru` | `^[^@\s]+@[^@\s]+\.[a-z]{2,}$` (RFC-light) |
| `max` | `@your_max_handle` или `max.ru/u/...` | `max\.ru/(?:u/)?[a-z0-9_]{3,32}` или `max://contact?id=...` |

Сервер **повторяет** валидацию для выбранного канала (never trust client) и rejects
с `400 invalid_contact_for_channel` если mismatch. **Не пытается переинтерпретировать**
ввод под другой канал — фронт это сделает после показа inline-warning'а юзеру.

### Auto-detect as safety-net (compatibility + UX nudge, not flow control)

`core/contact/auto_detect.py` сохраняется как валидатор/нормализатор и для:

1. **Inline UX-nudge** на фронте: если юзер выбрал `email` но ввёл `9167388689` —
   показать «Это похоже на телефон. Переключить канал на Телефон?» с кнопкой
   `setChannel('phone')`. Не пытаемся угадать молча — решение явное.
2. **Backfill / migration** существующих заявок (collected при v1) — определяем
   тип сейчас, прокидываем в `channel` поле.
3. **Bot DM normalisation**: когда юзер пишет нам в `@SamositeBot`, мы получаем
   `from.username` и нормализуем как telegram-канал автоматически (это технический
   intake, не UI).

Order check (return first match — same as v1):
1. Email — `@` highly disambiguating
2. MAX URL / deep-link
3. Telegram URL
4. Phone (shape + digit count + phonenumbers parse + is_valid_number)
5. Telegram handle (bare or `@`-prefixed)

Если ничего не подходит → `None`, не подсказываем переключиться (нет валидного
target-канала).

### What's removed

- ❌ Progressive phone autoformat в Submit modal `contact` поле (был фикс B5 #56).
  С radio-выбором phone-поле уже знает что это phone — нормализация на blur через
  `phonenumbers` достаточно (или прогрессивно — но это decision на уровне D-PR,
  не блокер).
- ❌ Combined placeholder «Email, телефон, @telegram или MAX». Каждое поле имеет
  свой specific placeholder под выбранный канал.

### Notification dispatcher

`core/notify/dispatcher.py` принимает `(user, message, priority)` и роутит:

**Priority chain (если несколько каналов настроены, что в MVP редко — но архитектурно готовы):**
1. `telegram` (если есть, и user написал `/start` нашему боту)
2. `max` (если есть и MAX-bot верифицирован)
3. `email` (если есть)
4. `phone` SMS (только для **post-publish** notifications, не для submit-acknowledgement)

**Single-channel в MVP:** юзер указал один контакт → шлём только в него; если delivery failed (TG /start не сделан) → fallback через email если есть, иначе — пишем в `failed_deliveries` для manual handling founder'ом.

### SMS safety rule

- **SMS отправляется ТОЛЬКО после `site.status = published`**, т.е. после ручной модерации founder'ом
- Это митигейшн против SMS-bombing атаки: спамер не может через captcha + rate-limit заслать достаточно заявок, чтобы сжечь SMS-бюджет
- Confirmation на submit-application — НЕ уходит SMS-ом, только в-app confirmation screen + TG/email если указаны

### MAX-bot rollout strategy

- **MVP без MAX в первый месяц.** ИП-верификация в VK Business Suite занимает ~1-2 недели + неясно одобрят ли ИП (vs только ООО) [verify]
- Код multi-channel dispatcher изначально пишется поддерживающим MAX, но MAX-adapter включается **feature-flag'ом** `FEATURE_MAX_BOT=false`
- Когда верификация пройдёт → flag flip → MAX доступен для выбора в submit-modal
- Если ИП-верификация невозможна → флаг остаётся false постоянно, пока founder не зарегистрирует ООО (за рамками MVP)

## Alternatives considered

- **Только email** — отвергнут: фрикшен «проверьте почту через 24ч» убивает магию «сайт готов сейчас»
- **Только TG-username** — отвергнут: не у всех ICP настроен `@username`; «как узнать свой ник» — лишний шаг для 35-50yo мастеров
- **Email + TG как два поля** (initial plan) — отвергнут: decision fatigue на самом узком месте воронки
- **TG + email + phone без MAX** — отвергнут: упускаем strategic hedge от TG-blocking; MAX-аудитория уже сопоставима с TG в РФ
- **MAX через official VK Workspace** — отвергнут: это enterprise B2B-продукт от 249₽/user/мес, нам нужен публичный consumer-канал

## Consequences

**Positive:**
- Один input в submit-modal — minimum decision fatigue
- Strategic hedge: если TG заблокируют, у нас есть MAX в RU и email/SMS как universal fallback
- ФЗ-152 ОК: все провайдеры в РФ (Yandex Mail, SMS.ru, Selectel Postbox, MAX, TG-через российские DNS)
- Dispatcher pattern: легко добавить VKontakte Messages API позже если потребуется

**Negative:**
- 4 канала notify = 4 интеграции для тестов и runbooks; больше maintenance чем одного TG
- MAX-bot verification — внешняя зависимость от VK Business Suite, может задержать рollout MAX-канала на 2-4 недели
- SMS-стоимость scales с подписавшимися — при 200 заявок/месяц ~500 ₽, при 2000 → 5000 ₽. Митигейшн: SMS только post-publish + опция отказаться от SMS-уведомлений в личном кабинете
- Шифрование `contact_value` (phone/email — Fernet) добавляет латентность на каждый dashboard view

**Neutral:**
- В MVP юзер указывает **один** контакт, `contact_value_alt` — placeholder для будущего «добавить второй способ связи» в личном кабинете

## Verification

```bash
# 1. ENUM в БД содержит 4 типа:
psql -c "SELECT enum_range(NULL::contact_type_enum)"
# Должно вернуть {email,phone,telegram,max}

# 2. Phone и email в БД зашифрованы (BYTEA), telegram и max — plaintext (TEXT):
psql -c "SELECT contact_type, pg_typeof(contact_value) FROM users LIMIT 1"

# 3. Auto-detect test suite — 30+ кейсов на каждый тип + edge cases:
pytest tests/unit/core/contact/test_auto_detect.py -v

# 4. Dispatcher не шлёт SMS на submit:
pytest tests/integration/notify/test_no_sms_pre_publish.py

# 5. MAX feature flag работает:
FEATURE_MAX_BOT=false pytest tests/integration/notify/test_max_disabled.py
FEATURE_MAX_BOT=true pytest tests/integration/notify/test_max_enabled.py

# 6. Запрещённые провайдеры отсутствуют:
grep -rE "twilio|sendgrid|postmark|mailgun" backend/poetry.lock && exit 1 || exit 0
```

## Open questions

- **OQ-8.1**: VK Business Suite — верифицирует ли ИП, или требует ООО? [verify по support VK]
- **OQ-8.2**: MAX deep-link для ввода контакта — `max.ru/u/<name>` или иной формат? [verify через dev.max.ru]
- **OQ-8.3**: TG-bot не может инициировать DM без user `/start`. Как UX-решение для «сайт готов, мы напишем в TG» если юзер не нажал `/start`? Решение: в confirmation screen после submit — QR-код или deep-link `t.me/SamositeBot?start=ack_<token>`, юзер нажимает один раз. Включить как часть T1.6.
- **OQ-8.4**: MAX bot — аналогичная проблема с `/start`? [verify]
- **OQ-8.5**: SMS-провайдер finalize: SMS.ru vs Yandex Cloud Notify — pricing per SMS, reliability, договор для ИП.
