# ADR-0005: Telegram parsing — Bot API first, Telethon fallback with burner account

Date: 2026-05-18
Status: Accepted

## Context

Telegram — второй по приоритету источник для Vitrina. Юзеры дают `@channel` своего публичного канала, мы парсим описание, аватар, последние 50-100 постов с фото и текстами.

**Доступные методы доступа к контенту канала:**

| Метод | Что даёт | Требования | Юридический статус | Технический риск |
|---|---|---|---|---|
| TG Bot API (`getChat`, `getChatHistory`) | Полный доступ к каналу, если бот добавлен админом или как member публичного | Юзер должен добавить бота в свой канал ИЛИ канал должен быть публичным; для истории — бот должен быть участником в момент публикации | Полностью легально, в рамках TG ToS | Низкий |
| TG `getChat` + `getUpdates` без membership | Только метаданные публичных каналов | Канал публичный | Легально | Низкий, но крайне ограниченные данные |
| Telethon / MTProto userbot | Полный доступ к публичной истории | Telegram-аккаунт с номером | Серая зона: TG ToS запрещает «массовый» userbot, но не сам факт юзербота для личных нужд. При commercial use — нарушение ToS, риск account ban | Средний (бан аккаунта), требует ротации |
| HTML export (Telegram Desktop → Export) | Полная история, медиа, тексты | Доступ к аккаунту-владельцу | Полностью легально (юзер экспортирует свои данные) | Низкий, но user-friction |
| `t.me/s/<channel>` web view | Публичные посты HTML | Канал публичный | Легально (public web content) | Низкий, но без media в полном разрешении |

**Бизнес-контекст:** TG — основной канал для большинства ICP в РФ 2026. Без удобного TG-flow продукт теряет 50%+ ICP. Просить юзера экспортировать вручную — friction.

## Decision

We will implement a **three-tier Telegram parsing strategy** in priority order:

### Tier 1 (default, P0): TG Bot API after adding bot to channel
- Юзер вводит `@channel`, нажимает «Подключить канал»
- Vitrina даёт инструкцию: «Добавьте бота `@VitrinaIntakeBot` в админы канала на 5 минут — мы возьмём данные и автоматически выйдем»
- Через deep link (`t.me/VitrinaIntakeBot?startchannel=<channel>&admin=post_messages`) запускается стандартный TG-flow присоединения
- Бот получает доступ через Bot API: `getChat`, `getChatMembersCount`, `getChatHistory`, скачивает media через `getFile`
- После завершения сбора — бот автоматически удаляет себя из админов

### Tier 2 (fallback for public channels, P1): t.me/s/<channel> web view + Bot API getChat
- Если юзер не может/не хочет добавить бота, и канал публичный
- Парсим `https://t.me/s/<channel>` (публичный web-view) через httpx + lxml
- Это публичный web-content, легальный к парсингу
- Получаем: описание канала, посты (текст+первое фото), аватар через Bot API `getChat`
- Лимит: показывает только последние 50-ish постов, media в превью-разрешении

### Tier 3 (manual fallback, P1): HTML export upload
- Юзер экспортирует чат через Telegram Desktop → Settings → Advanced → Export chat history → формат HTML с медиа
- Загружает ZIP/папку в Vitrina (как IG archive)
- Парсим HTML+media локально

### Tier 4 (NOT USED in MVP): Telethon
- Telethon как userbot **исключён из MVP**
- Причина: нарушение TG ToS при commercial use; account ban риски; нужен виртуальный номер с непрозрачной legality (см. OQ-2.4 в PRD)
- Может быть пересмотрено в M6+ если Bot API окажется недостаточным

## Alternatives considered

- **Telethon-first** — rejected: TG ToS violation + account ban риски + virtual SIM юр.вопросы; не масштабируется.
- **Bot API + Telethon hybrid с самого начала** — rejected: усложняет codebase, два пути для одной фичи, debt с первого дня.
- **Manual export only (Tier 3)** — rejected как primary: ICP friction слишком высокий, конверсия упадёт <30%.

## Consequences

**Positive:**
- Полностью соответствует TG ToS — нет account ban риска
- Bot API стабилен, документирован, rate-limit предсказуемый (30 req/sec per bot)
- Юзер контролирует доступ — соответствует ФЗ-152 принципу minimum необходимого

**Negative:**
- UX-step «добавить бота» — конверсия флоу будет ниже, чем «дать ссылку и забыть» (estimate 70-80% завершают). Mitigation: видео-гайд 20 сек, copy "5 секунд, мы автоматически выйдем"
- Tier 2 (web-view) даёт ограниченные данные — медиа в превью, не full-quality
- Каналы с join-by-request или приватные — только Tier 3 (manual export)

**Neutral:**
- Bot username `@VitrinaIntakeBot` нужно зарегистрировать заранее.

## Verification

```bash
# 1. Telethon отсутствует в зависимостях:
grep -E "^telethon" backend/poetry.lock && exit 1 || exit 0

# 2. Bot API token используется через Settings, не хардкод:
grep -rE "TG_BOT_TOKEN\s*=\s*['\"][0-9]" backend/  # должно быть 0

# 3. Парсер каналов имеет 3 tier:
ls backend/app/core/parsing/adapters/tg_*.py
# tg_bot_api.py, tg_webview.py, tg_html_export.py

# 4. Test: бот корректно auto-leaves после сбора:
pytest tests/integration/parsers/test_tg_bot_auto_leave.py
```

## Open questions

- **OQ-5.1**: Bot API лимит на скачивание файлов — 20 MB per file через `getFile` [verify]. Для каналов с видео > 20 MB нужен альтернативный путь.
- **OQ-5.2**: Поведение бота как admin — он будет виден подписчикам канала на 5 минут. Acceptable UX?
- **OQ-5.3**: Что делать с каналами, где бот не может быть admin (например, attachable bots disabled)? Fallback на Tier 3.
