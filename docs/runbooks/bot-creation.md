# Telegram bots — creation + initial setup

> **Action title.** Создать три Telegram-бота через `@BotFather` под
> бренд **Самосайт**, выписать токены, положить в 1Password и в
> `/opt/vitrina/.env.secrets` на staging VPS.

## Bot inventory

Все три username'а зарезервированы в коде / runbook'ах — поменять
их потом без перевыпуска токенов и перепрошивки `.env` нельзя, так
что создавать ровно с этими именами.

| Username | Назначение | Где упоминается |
|---|---|---|
| `@SamositeIntakeBot` | Parser intake — мастер временно делает бота админом своего TG-канала на 5 минут; бот тянет посты+медиа через Bot API и выходит. ADR-0005 (TG parsing strategy). | `backend/app/core/parsing/adapters/telegram_bot.py`, `landing/components/SubmitModal.tsx`, `docs/PRD.md` S2, `docs/TASKS.md` T3.4, `docs/adr/0005-telegram-parsing-strategy.md` |
| `@SamositeBot` | User-facing acknowledgement: после submit мастер с `contact_type=telegram` нажимает `/start` deep-link → бот сохраняет `users.contact_verified_at`, дальше может слать DM-уведомления (сайт готов / новый лид). T1.6d. | `landing/components/SubmitModal.tsx` confirmation screen, `docs/TASKS.md` T1.6d, `docs/adr/0008-multi-channel-contact-strategy.md` OQ-8.3 |
| `@SamositeOpsBot` | Operational alerts к founder'у — 5xx > 5/мин, > 10 failed admin logins/час, leads spam > 50/час, sync worker down > 1ч, disk > 80%. SECURITY.md §A09. | `docs/SECURITY.md` §7 Logging/Alerting + §10 Pre-launch checklist, `docs/DEPLOYMENT.md` Alerts row |

## Шаги создания (одна сессия в `@BotFather`)

1. Открыть [@BotFather](https://t.me/BotFather) с founder-аккаунта.
2. `/newbot` → name = `Самосайт — заявки`, username = `SamositeIntakeBot`.
   - **Если занято** — попросить чуть варианта: `samosite_intake_bot` (с подчёркиваниями). Обновить runbook + code refs (см. ниже про fallback).
   - Скопировать выданный токен → `TG_PARSER_BOT_TOKEN` в 1Password.
3. `/setdescription` для `@SamositeIntakeBot`:
   > Парсит ваш Telegram-канал для сборки сайта на samosite.online.
   > Сделайте бота админом канала на 5 минут — мы возьмём посты и
   > медиа, после чего бот сам выйдет. Бот не публикует, не пишет,
   > не упоминает; только читает.
4. `/setjoingroups` → **Disable**. Бот никогда не присоединяется к
   групповым чатам — только к каналам, и только как админ.
5. `/setprivacy` → **Disable**. Бот должен видеть все сообщения
   канала (privacy=enabled блокирует чтение).
6. `/setcommands` для `@SamositeIntakeBot`:
   ```
   help - Что я делаю
   ```
7. Повторить шаги 2-4 для `@SamositeBot`:
   - name = `Самосайт`
   - username = `SamositeBot`
   - токен → `TG_USER_BOT_TOKEN`
   - description: «Бот сайта samosite.online. Когда вы оставляете
     заявку через @-handle, нажмите Старт здесь — и я буду присылать
     вам ссылку на готовый сайт и уведомления о заявках клиентов.»
   - `/setjoingroups` — Disable
   - `/setprivacy` — Enable (читать только команды; не нужны все
     сообщения)
   - Команды:
     ```
     start - Подключить уведомления
     help - Что я делаю
     ```
8. Повторить для `@SamositeOpsBot`:
   - name = `Самосайт Ops`
   - username = `SamositeOpsBot`
   - токен → `TG_OPS_BOT_TOKEN`
   - description: «Внутренний alert-бот Самосайта (5xx, failed logins,
     sync failures). Только для founder.»
   - `/setjoingroups` — Enable (нужно отправлять в групповой чат
     `@SamositeOps`, если решим вывести алерты туда; по умолчанию —
     прямой DM founder'у).
   - `/setprivacy` — Disable (нужно реагировать на `/status`-команды
     внутри группы).

## После создания

1. **1Password.** Создать три записи `Vitrina TG bot — <username>`,
   в каждой:
   - `username`: например `SamositeIntakeBot`
   - `token`: HTTP API token из BotFather
   - `created_at`: дата
   - `notes`: что делает (скопировать из таблицы выше)

2. **На VPS** (`135.106.137.30`):
   ```bash
   ssh deploy@135.106.737.30
   sudo -u deploy vim /opt/vitrina/.env.secrets
   # добавить три строки:
   #   TG_PARSER_BOT_TOKEN=...
   #   TG_USER_BOT_TOKEN=...
   #   TG_OPS_BOT_TOKEN=...
   # сохранить, chmod 600 уже стоит
   ```

   Также обновить `/opt/vitrina/.env` (собирается из `.env.example` +
   `.env.secrets`):
   ```
   TG_BOT_TOKEN=${TG_USER_BOT_TOKEN}     # основной user-facing
   TG_ADMIN_CHAT_ID=<твой_TG_user_id>    # узнать через @userinfobot
   TG_PARSER_BOT_USERNAME=SamositeIntakeBot
   ```

3. **Founder /start.** Чтобы `@SamositeBot` мог тебе писать DM,
   зайди к боту и нажми «Старт» один раз. Без этого Telegram блокирует
   bot→user DM.

4. **Verify.** На VPS:
   ```bash
   docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml restart api tg-bot
   docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml logs tg-bot --tail=20 | grep -E '(bot ready|login|error)'
   ```

## Fallback если username занят

`@SamositeIntakeBot` / `@SamositeBot` / `@SamositeOpsBot` пока никто
не зарегистрировал — проверял через web.telegram.org перед заведением
бренда. Но если в момент создания BotFather скажет «занято»:

1. Использовать username с подчёркиваниями: `samosite_intake_bot` /
   `samosite_bot` / `samosite_ops_bot`. Telegram username case-
   insensitive, формат с подчёркиваниями выглядит ок.
2. Обновить refs в коде:
   ```bash
   cd /opt/vitrina  # или локально
   grep -rl 'SamositeIntakeBot\|SamositeBot\|SamositeOpsBot' \
     --exclude-dir=.git --exclude-dir=.venv --exclude-dir=node_modules \
     --exclude-dir=.next .
   # затем sed на каждом файле
   ```
3. Закоммитить в отдельной ветке `chore/rebrand-bot-username-fallback`
   с явным указанием почему изменили username.

## Хочу новый бот через год / при компрометации токена

1. Открыть `@BotFather`, `/revoke` → выбрать бот → подтвердить.
2. BotFather выдаст новый токен (username сохраняется).
3. Обновить 1Password + `/opt/vitrina/.env.secrets` на VPS.
4. `docker compose restart tg-bot` (без force-recreate — env-file
   подхватится при graceful restart).
5. Если узнаём об утечке постфактум: дополнительно вызвать
   `/setname` или `/setdescription` с уведомлением для пользователей,
   которые могли получить фишинговое сообщение от утёкшего токена.

## Связанные документы

- `docs/adr/0005-telegram-parsing-strategy.md` — три tier'а парсинга
  TG-каналов; `@SamositeIntakeBot` — Tier 1.
- `docs/adr/0008-multi-channel-contact-strategy.md` — `@SamositeBot`
  /start handshake (OQ-8.3).
- `docs/SECURITY.md` §A09 + §10 — алерты через `@SamositeOpsBot`.
- `docs/TASKS.md` T1.6, T1.6d, T3.4, T8.2 — где боты подключаются в
  code path.
