# ADR-0011 — Two-bot architecture: разведение intake-бота и personal-бота

**Status:** Accepted  ·  **Date:** 2026-05-21  ·  **Supersedes:** — (ADR-0005 still
governs the intake bot's parsing role)

## Context

В v1 у нас был один TG-бот `@VitrinaIntakeBot` (после ребренда `@SamositeIntakeBot`),
который совмещал две роли:

1. **Intake**: юзер пускает бота админом в **свой TG-канал-источник** на 5 минут,
   чтобы мы могли через Bot API парсить посты канала. См. ADR-0005 (Tier 1).
2. **Personal notifications**: тот же бот пишет юзеру личные сообщения с уведомлениями
   о новых заявках на его сайт (если `contact_type=telegram`).

Это создавало три проблемы:

**UX-путаница.** В UI на шаге 3 онбординга юзер видел сообщение «откройте бот
`@SamositeIntakeBot` и нажмите Старт». Параллельно на экране #4 (для приватных
TG-каналов) — «добавьте `@SamositeIntakeBot` как админа в канал». Юзер не понимал
почему один и тот же бот — то «личный для уведомлений», то «технический для парсинга».

**Legal-confusion.** Парсинг чужого контента (intake-бот в канал) и личная переписка
(personal notification) — **разные правовые отношения**:
- Intake = bot-as-service, юзер дал явное согласие на парсинг своего контента.
- Personal = direct messaging, регулируется отдельно (юзер `/start`-ит бота, тем
  самым давая согласие на DM).
Совмещение этих ролей в одном боте затрудняет audit trail и risk-assessment.

**Operational risk.** Если intake-бота сбанит RKN/Telegram за подозрение на массовый
парсинг (даже добровольный) — мы теряем И парсинг И канал уведомлений всем юзерам.

## Decision

С v2 у нас **два явно разведённых TG-бота**, зарегистрированных в BotFather как
отдельные сущности:

| Бот | Хэндл | Owner | Token env | Роль |
|---|---|---|---|---|
| **Intake** | `@SamositeIntakeBot` | founder | `TG_INTAKE_BOT_TOKEN` | Парсинг TG-канала-источника. Юзер делает бота админом своего канала на 5 минут. После `getChatHistory` бот автоматически выходит из админов. **Не пишет личных сообщений.** Никогда не появляется в DM с юзером. |
| **Personal** | `@SamositeBot` | founder | `TG_PERSONAL_BOT_TOKEN` | Личный бот юзера. Юзер `/start`-ит → мы пишем ему DM с уведомлениями о заявках, ссылками на сайт, биллингом. **Не имеет permissions парсить каналы.** Запускается только в DM. |

### Where each bot appears in UI

| UI экран | Бот | Действие юзера |
|---|---|---|
| Step 3 онбординга (channel=telegram) | `@SamositeBot` | `/start` — даёт согласие на DM-уведомления |
| Экран #4 «Канал приватный — пустите бота» | `@SamositeIntakeBot` | добавить админом в свой канал на 5 минут |
| Получение лида | `@SamositeBot` | DM юзеру с маскированными данными + ссылка на admin |
| Email-fallback экрана #4 | — | юзер выбирает «загрузить HTML-экспорт канала» — без ботов |

### Where each bot appears in backend

| Модуль | Бот | Token |
|---|---|---|
| `app/bot/intake.py` (parsing handlers, polling for admin-status webhook) | intake | `TG_INTAKE_BOT_TOKEN` |
| `app/bot/personal.py` (DM handlers, `/start`, lead notifications) | personal | `TG_PERSONAL_BOT_TOKEN` |
| `core/notify/channels/telegram.py` (отправка через telegram-channel из dispatcher) | personal | `TG_PERSONAL_BOT_TOKEN` |
| `core/parsing/adapters/tg_bot_api.py` (parsing TG channels) | intake | `TG_INTAKE_BOT_TOKEN` |

Они **никогда** не share-ят токен, и backend-модули `core/notify` и `core/parsing`
импортируют разные ports.

### Why two bots, not three or one

- **Не один (status quo v1):** см. context выше — UX / legal / operational risks.
- **Не три** (отдельный для ops alerts `@SamositeOpsBot`): да, есть уже — отдельная
  третья сущность для алертов founder'у. Это ortho к user-flow и здесь не обсуждается.
  Итог: на pre-launch фазе живут три бота — intake, personal, ops.
- **Не federated** (микро-боты per source): overkill для MVP — мы парсим только TG,
  больше площадок не требуют bot-presence.

## Migration plan

1. Зарегистрировать `@SamositeBot` в BotFather, получить токен → 1Password vault
   «Vitrina · TG bots».
2. Добавить `TG_PERSONAL_BOT_TOKEN` в `.env.example` + VPS `.env`.
3. Создать `app/bot/personal.py` с aiogram `Dispatcher` (отдельный от intake).
4. Прописать в `docker-compose.yml` два сервиса: `tg-bot-intake` и `tg-bot-personal`.
   Если на MVP стейдже хочется сэкономить — один процесс с двумя `Dispatcher`-ами в
   одном `tg-bot` сервисе (это compatible с aiogram 3.x).
5. `core/notify/channels/telegram.py` переключить на `TG_PERSONAL_BOT_TOKEN`.
6. `core/parsing/adapters/tg_bot_api.py` оставить на `TG_INTAKE_BOT_TOKEN`.
7. UI:
   - Шаг 3 онбординга — `@SamositeBot` (deep-link `tg://resolve?domain=SamositeBot`).
   - Экран #4 «канал приватный» — `@SamositeIntakeBot` (без deep-link, юзер
     добавляет вручную).
8. Backfill: существующие юзеры с `contact_type=telegram` — отправить им one-time
   blast от `@SamositeIntakeBot` (последняя коммуникация): «Самосайт переехал на
   `@SamositeBot` для уведомлений — нажмите Старт, чтобы продолжать получать
   заявки.». Старый бот через 30 дней — disable.

## Token rotation

- Per ADR-0006 §5 rotation cadence — оба токена 90-day rotation.
- При компрометации intake-токена: revoke в BotFather, реgenerate, deploy. Парсинг
  падает на 1 час, юзеры не теряют notifications (personal bot живёт независимо).
- При компрометации personal-токена: revoke + regenerate; intake продолжает парсинг
  но 1 час нет DM-уведомлений (юзеры получат backlog).

## Consequences

**+** Юзер видит понятную картину: один бот для «нам доступ к источнику», другой —
      «мы вам пишем». Никакого смешения.
**+** Legal/audit разделены: intake-bot активности логируются как «processor on
      master-owner's content», personal-bot — как «direct messaging».
**+** Если intake-бот забанен — personal продолжает работать, DM не падают.
**+** Можно по-разному ratelimit-ить: intake rate-limit жёстко (защита от abuse),
      personal limit мягко (юзеры могут много DM-ов получать в норме).

**-** Удвоенная инфраструктура: два BotFather-аккаунта, два webhook'а, два процесса
      (или одна процесс-tg-bot с двумя Dispatcher-ами).
**-** Удвоенный operational overhead: monitoring двух ботов, два token-rotation
      цикла.
**-** Backfill юзеров: one-time migration blast надо аккуратно (могут спутать
      «нас взломали» с легитимным анонсом).

## Open questions

- **OQ-11.1.** Один процесс с двумя Dispatcher-ами или два процесса? MVP: один.
  Production-scale: два (per-bot CPU/memory accounting).
- **OQ-11.2.** Backfill blast от intake-бота — нужно ли delay 7 дней, чтобы юзеры
  успели обновить inbox? `[verify with founder before flip]`
- **OQ-11.3.** Если у юзера conversation с intake-ботом существовал (юзер случайно
  написал ему /start) — это conversation надо мигрировать или ignore?

## Related

- ADR-0005 — Telegram parsing strategy (intake-bot's Tier 1 path)
- ADR-0008 — Multi-channel contact strategy (personal-bot is the TG-channel delivery)
- COPY.md §3.5 — Bot distinction в intake UI
- COPY.md §9 — Bot handles (наглядно)
- FR-002b, FR-002c — Notification routing (personal-bot)
- TASKS.md (новые) — T11.x в эпике E12 «Intake 3-step»
