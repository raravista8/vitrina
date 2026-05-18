# ADR-0008: Multi-channel contact — accept TG / MAX / email / phone, smart-detect, fallback chain

Date: 2026-05-18
Status: Accepted

## Context

В submit-modal (S1 step 4) юзер указывает контакт для получения уведомлений «сайт готов», «новый лид на вашем сайте», системных сообщений. Раннее проектирование предполагало два отдельных поля (email + TG-ник) — это **decision fatigue** и потери на самом узком месте воронки.

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

### Auto-detect rules (client-side AND server-side validation)

Порядок проверки (return first match):
1. **Telegram username**: `^@?[a-z0-9_]{5,32}$` → normalize to `@name`
2. **Telegram URL**: `t\.me/([a-z0-9_]+)` → extract username
3. **MAX**: `max\.ru/u/([a-z0-9_]+)` или другой канонический формат [verify]
4. **Phone**: `^\+?[0-9 ()\-]{10,15}$` → `phonenumbers` library, normalize to E.164
5. **Email**: `^[^@\s]+@[^@\s]+\.[a-z]{2,}$` → RFC-light
6. **Иначе**: error inline «Введите email, телефон, @имя в Telegram или MAX»

Server-side **повторяет** detect (never trust client) и rejects если mismatch.

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
- **OQ-8.3**: TG-bot не может инициировать DM без user `/start`. Как UX-решение для «сайт готов, мы напишем в TG» если юзер не нажал `/start`? Решение: в confirmation screen после submit — QR-код или deep-link `t.me/VitrinaBot?start=ack_<token>`, юзер нажимает один раз. Включить как часть T1.6.
- **OQ-8.4**: MAX bot — аналогичная проблема с `/start`? [verify]
- **OQ-8.5**: SMS-провайдер finalize: SMS.ru vs Yandex Cloud Notify — pricing per SMS, reliability, договор для ИП.
