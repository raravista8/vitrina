# ТЗ — Feedback v2: «Что останавливает?» вместо голосовалок

> **Адресат:** команда Claude Design (canon).
> **Заказчик:** vitrina / Самосайт прод.
> **Контекст:** текущая vote-first модалка `S9_FeedbackModal` (canon 0.9.x —
> голосовалки «Хочу источник»/«Хочу фичу», пороги N/10, счётчик «за неделю»,
> прогресс-бары) под v5-воронку не работает: нам нужен не сбор хотелок, а
> **причина отказа** уходящего посетителя + личный канал вопросов. Дизайн-система —
> «Фарфор и лак» (canon 0.12.0: bone/ink/бордо, радиус 0, тени none).
> **Версия:** предлагаем canon 0.13.0, модуль `src/customer` (или новый
> `src/feedback` — на ваше усмотрение, экспорты ниже).

---

## 1. Что удаляется (полностью, без депрекейт-цикла)

- Голосовалки «Хочу источник» и «Хочу фичу», чекбоксы вариантов.
- Пороги N/10, прогресс-бары по пунктам, счётчик «голосов за неделю».
- Optimistic +1, «спящий» контакт-блок, вся vote-first механика.
- Пропсы `tally` / `FbTally` / `FbVote` / `votes[]` из публичного API.

`S9_FeedbackModal` и алиасы (`S9_FeedbackPage`, `FeedbackPage`) могут остаться
экспортами-алиасами на новую модалку ИЛИ уйти мажором — задокументировать в
CHANGELOG. Consumer-адаптер у нас один (`landing/components/FeedbackModal.tsx`),
переключение атомарное.

## 2. Два триггера — одна модалка, два режима

### Режим A · «Блокер» (exit-intent / глубокий скролл)

Консьюмер открывает модалку в режиме `mode="blocker"` когда посетитель
уходит, не кликнув ни один CTA (условия показа — §5, реализует консьюмер).

**Шаг A1 — вопрос:** заголовок «Что останавливает прямо сейчас?»
Одиночный выбор из **7 вариантов** (радио-карточки в стиле чипов интейка).
Тексты и коды — реестр §4, **enum причин = коды отказов консьерж-таблицы
founder'а, один в один** (менять формулировки нельзя).

**Шаг A2 — после выбора** (на том же экране, раскрытием вниз):
- опциональное текстовое поле, лейбл «Почему — одним предложением»
  (одна строка, ≤200 символов, не обязательное);
- блок-оффер: заголовок «Соберу черновик вашего сайта бесплатно — куда
  прислать?» + выбор канала **Telegram / WhatsApp / Email** (чипы, как в
  интейке v2) + поле контакта с плейсхолдером по каналу + кнопка
  «Прислать черновик»;
- вторичное действие: «Просто отправить ответ» (отправляет причину+заметку
  БЕЗ контакта — ответ ценен и без лида).

### Режим B · «Вопрос» (постоянная кнопка)

FAB (заменяет нынешний «Чего не хватает?») с текстом **«Задать вопрос»**.
Открывает ту же модалку в `mode="question"`: textarea вопроса + канал/контакт
(та же тройка) + кнопка «Отправить» + подпись под формой:
**«Читаю каждый ответ сам и отвечаю лично»** (курсивом/мелко, человеческим
тоном — это ключевая строка режима).

**Финал обоих режимов:** экран «Спасибо» (короткий, без конфетти): для A с
контактом — «Пришлю черновик в {канал}», для A без контакта — «Спасибо,
это правда помогает», для B — «Отвечу лично в {канал}».

## 3. Публичный API (controlled, паттерн 0.9.1/0.12.0)

Никаких fetch/Date.now/Math.random/localStorage внутри канона — состояние и
side-effects у консьюмера. Zero-prop = canvas-mock. TS-типы экспортировать.

```ts
type FbV2Mode = 'blocker' | 'question';
type FbV2Channel = 'telegram' | 'whatsapp' | 'email';
interface FbV2Reason { code: string; label: string }   // реестр §4

FeedbackV2Modal(props: {
  open: boolean;
  mode: FbV2Mode;
  onOpenChange: (open: boolean) => void;
  reasons?: FbV2Reason[];              // дефолт = REASONS из пакета
  // state (консьюмер владеет)
  reason?: string | null;              // код выбранной причины
  onReasonChange?: (code: string) => void;
  note?: string; onNoteChange?: (v: string) => void;
  question?: string; onQuestionChange?: (v: string) => void;
  channel?: FbV2Channel; onChannelChange?: (c: FbV2Channel) => void;
  contact?: string; onContactChange?: (v: string) => void;
  // submit
  onSubmit: (payload: FbV2Payload) => void;   // сеть — консьюмер
  submitting?: boolean; error?: boolean; submitted?: boolean;
  mobile?: boolean; embedded?: boolean;        // как в 0.9.1
}): JSX.Element

FeedbackV2Fab(props: { onClick: () => void }): JSX.Element   // «Задать вопрос»

interface FbV2Payload {
  mode: FbV2Mode;
  reason?: string; note?: string;      // mode=blocker
  question?: string;                   // mode=question
  channel?: FbV2Channel; contact?: string;   // опционально в blocker, обязательно в question
}

REASONS: FbV2Reason[]                  // 7 штук, реестр §4
```

## 4. Реестр копи (единственный источник строк)

Все строки — побайтово из этого реестра (nbsp после коротких предлогов,
без точек в заголовках, «ёлочки» — typography-правила `specs/04`).

| Ключ | Строка |
|---|---|
| blocker.title | Что останавливает прямо сейчас? |
| blocker.note.label | Почему — одним предложением |
| blocker.offer.title | Соберу черновик вашего сайта бесплатно — куда прислать? |
| blocker.cta | Прислать черновик |
| blocker.skip | Просто отправить ответ |
| question.fab | Задать вопрос |
| question.cta | Отправить |
| question.sign | Читаю каждый ответ сам и отвечаю лично |
| thanks.blocker.contact | Пришлю черновик в {channel} |
| thanks.blocker.plain | Спасибо, это правда помогает |
| thanks.question | Отвечу лично в {channel} |

**Причины (7) — ЗАПОЛНЯЕТ FOUNDER из консьерж-таблицы, коды 1:1:**

| # | code | label |
|---|---|---|
| 1 | `TODO` | TODO |
| 2 | `TODO` | TODO |
| 3 | `TODO` | TODO |
| 4 | `TODO` | TODO |
| 5 | `TODO` | TODO |
| 6 | `TODO` | TODO |
| 7 | `TODO` | TODO |

> ⚠ Без этой таблицы релиз не собирать: enum замораживается в Метрике,
> в БД и в консьерж-процессе одновременно — переименования потом дорогие.

## 5. Правила показа (справочно — реализует КОНСЬЮМЕР, не канон)

- Режим A: exit-intent (desktop, mouse к верхней кромке) ИЛИ скролл ≥60%
  страницы, И ни одного клика по CTA (`data-entry`), И интейк не открывался.
- Не чаще **1 раза на посетителя** (localStorage-флаг), не показывать на
  `/admin*`, `/login`, `/privacy`, `/offer`.
- Режим B: FAB всегда, кроме открытого интейка/модалок.
- Канон это НЕ реализует — только рендерит по `open`/`mode`.

## 6. data-* хуки (цели Метрики — менять только согласованно)

- корень модалки: `data-feedback-v2` + `data-fb-mode="blocker|question"`
- радио причины: `data-fb-reason="<code>"`
- чипы канала: `data-fb-channel="telegram|whatsapp|email"`
- CTA: `data-fb-cta="send-blocker|send-plain|send-question"`
- FAB: `data-fb-fab`

События шлёт консьюмер: `feedback_open {trigger}`, `feedback_reason {reason}`,
`feedback_contact_left {channel}`, `feedback_question_sent`.

## 7. Адаптив и поведение

- Desktop — центрированная модалка (ширина ~520), mobile — фуллскрин
  (паттерн интейка v2). 375 обязана выживать (длинные кириллические label).
- Радио-выбор причин: клавиатурная навигация, focus-trap, Esc = закрыть.
- `prefers-reduced-motion: reduce` — без анимаций раскрытия шага A2.
- Ремаунт-ловушку 0.9.5 не повторять: вложенные под-компоненты не
  объявлять внутри рендера как `<Component/>`.

## 8. Out of scope канона

Условия показа/localStorage · сеть и капча · Метрика-события · admin-вью ·
изменение других модулей (лендинг v5, интейк — byte-identical).

## 9. Acceptance

- [ ] Голосовалки/пороги/прогресс-бары отсутствуют в новой модалке.
- [ ] Оба режима из одного экспорта, controlled; zero-prop = canvas-mock.
- [ ] `REASONS` экспортом; label'ы = консьерж-таблица 1:1 (после заполнения §4).
- [ ] Копи побайтово из §4; «Читаю каждый ответ сам…» присутствует в режиме B.
- [ ] data-* хуки §6 на местах; никаких window.*/fetch внутри.
- [ ] «Фарфор и лак»: радиус 0, тени none, токены VT.
- [ ] 375 выживает; focus-trap; reduced-motion учтён.
- [ ] CHANGELOG: судьба S9_FeedbackModal-алиасов + migration-нота консьюмеру.

---

# Приложение · План доработок vitrina (не для Claude Design)

## Бэкенд (PR-B, можно ДО прихода канона — контракт заморожен)

**Эндпоинт:** `POST /api/feedback/v2` (rate-limit 5/час/IP, SmartCaptcha,
Pydantic `extra='forbid'`). Поля = `FbV2Payload` + `captcha_token` +
`consent_given` (контакт — PII). Валидация контакта по каналу —
`validate_channel_value` (telegram/whatsapp/email уже поддержаны).

**Миграция 0020** — расширение существующей таблицы `feedback`:
`kind ('blocker'|'question')`, `trigger ('exit'|'scroll'|'button')`,
`reason (varchar 32, CHECK по enum из §4)`, `contact_channel`, `contact`
(плейнтекст — notify-канал, политика как `applications.contact_value`;
маска в логах/письмах). Старые колонки (`type`, `checkboxes`) не трогаем —
исторические строки живут.

**Уведомления:** тот же `NotificationDispatcher.notify_founder`
(Telegram-нога + email `info@samosite.online`), `kind=feedback_received`.
Тема письма: «фидбек: {причина}» / «вопрос с сайта». В теле — пометка
источника `feedback`, режим, причина, заметка, контакт (маской), и для
blocker-с-контактом явная строка «оставил контакт на бесплатный черновик»
(это мини-лид — отвечать как заявке).

**Ретайр:** `GET /api/feedback/tally` и votes-ветка `POST /api/feedback` —
депрекейт после переключения консьюмера (PR-C), удаление отдельным PR.

**Тесты:** happy оба режима × причины, contact/channel mismatch → 400,
consent required, rate-limit, founder-notify содержит причину, маску.

## Фронт-консьюмер (PR-C, после vendor'а)

- `landing/components/FeedbackModal.tsx` → адаптер `FeedbackV2Modal`:
  стейт, показ-логика §5 (exit-intent + 60% скролл + localStorage cap 1),
  капча, POST, `ssTrack`-события (§6), FAB «Задать вопрос».
- Retire vote-адаптера; `feedback_submit`-цель затихает (не удалять).
- Метрика: завести 3 новые цели (`feedback_reason`, `feedback_contact_left`,
  `feedback_question_sent`) — `feedback_open` уже есть, получит параметр
  `trigger`. Обновить `docs/runbooks/yandex-metrika-goals.md`.

## Порядок

1. Founder заполняет таблицу причин §4 (коды консьерж-таблицы) — блокер.
2. ТЗ → Claude Design → зип canon 0.13.0.
3. PR-B (бэкенд) параллельно с дизайном.
4. Vendor + PR-C (консьюмер) → деплой → цели в Метрике → e2e обоих режимов.
