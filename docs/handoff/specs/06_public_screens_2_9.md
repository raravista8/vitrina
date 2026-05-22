# Public screens 2–9 — детальные ТЗ для pixel-аудита

> Дополнение к `00_CLAUDE_CODE_TZ_base.md` §2. Здесь — экраны, которые нужны pixel-audited, с точными селекторами / измерениями для каждого.
> Канон: `canon/screens-intake.jsx`, `canon/screen-02-source.jsx`.

---

## 1 · SourceDetectionBadge — 9 состояний (#2)

**Канон:** `screen-02-source.jsx` → `S2_Desktop` / `S2_Mobile`.

**9 состояний бейджа** (под input на лендинге):

| State | Условие | Внешний вид | data-state |
|---|---|---|---|
| empty | input пустой | бейдж не рендерится | — |
| loading | debounce 300мс, ждём `/api/preview` | spinner + `проверяем источник…` | `loading` |
| ok-with-counts | tier=ok, есть `counts` | ✓ зелёный + `Распознали: <source> · <counts>` | `ok` |
| ok-no-counts | tier=ok, timeout 3с | ✓ зелёный + `Распознали: <source>` | `ok-fallback` |
| soon | tier=soon (IG/VK/WA/YT) | ℹ️ синий + `<source> — скоро. Добавим в waitlist` + email-поле | `soon` |
| unknown | tier=unknown | ⚠️ жёлтый + `Не узнали платформу. Покажите фото/буклет →` | `unknown` |
| error-private | private IP (FR-011) | ⚠️ жёлтый + `Похоже на локальный адрес. Дайте публичную ссылку` | `error-private` |
| error-network | network err | ⚠️ серый + `Не смогли проверить. Продолжим как есть` | `error-network` |
| override-popover | юзер кликнул «не то?» | popover со списком 4 альтернатив | `override-open` |

**Pixel-audit:** один артборд `#dc-artboard-s2-d` содержит все 9 состояний в grid 3×3. Прод-страница `/dev/source-badge` (за `E2E_SEED=1`) рендерит то же.

**Селекторы для теста:**
```ts
'[data-source-badge][data-state="loading"]'
'[data-source-badge][data-state="ok"]'
// ... и т.д.
```

**Acceptance:**
- [ ] Все 9 состояний различимы по цвету бейджа без зума.
- [ ] Spinner анимация подавлена в тестах (см. `stabilize()`).
- [ ] Popover «не то?» открывается по клику, имеет shadow `pop`, 4 варианта платформ.

---

## 2 · SubmitModal — 3 шага (#3)

**Канон:** `screens-intake.jsx` → `S3_SubmitModal(step, source, channel, contact, ...)`.

### Шаг 1 · «Дайте ссылку»

- Width desktop 840px / mobile 100vw - 32px.
- Heading: `Дайте ссылку на ваш профиль` (без точки).
- Input с auto-detect ниже (state из §1).
- Inline-список платформ: моноширинный, 13px, цвет `inkFaint`.
- Линк-fallback: `Нет ничего онлайн? Загрузите фото →`.
- Кнопка `Продолжить` справа внизу.

**Селекторы:** `[data-modal="submit"][data-step="1"]`, внутри `[data-source-badge]`.

### Шаг 2 · «Куда вам писать?»

- Heading: `Куда вам писать о готовности?`.
- Radio группа на 4 канала: Telegram / Телефон / Email / MAX.
  - Каждый radio: 56px высоты, иконка слева, label по центру, чекмарк справа при выборе.
  - Активный: `border: 2px solid accent`, `bg: accentSoft`.
- Input под выбранным каналом, с маской.
- Чекбокс ОПД — **не** установлен по умолчанию.
- Кнопки: `← Назад` (pill, secondary) слева, `Продолжить` (pill, primary) справа.

**Селекторы:** `[data-modal="submit"][data-step="2"]`, `[data-channel-radio][data-channel="telegram"]` и т.д.

### Шаг 3 · «Откройте бота на 1 минуту»

- Только если channel='telegram'. Для остальных — сразу confirmation #5.
- 3 пронумерованных пункта с моно-номерами 01/02/03.
- Кнопка `Открыть @SamositeBot` — primary pill, иконка TG слева.
- Под ней — fallback линк: `Нет Telegram? Получить ссылку на почту →`.
- Polling `/api/tg-bot-personal-status` каждые 5с — скрываем индикатор в тестах.

**Селекторы:** `[data-modal="submit"][data-step="3"]`, `[data-bot-fallback]`.

**Acceptance:**
- [ ] Кнопка «Назад» работает на шагах 2+, данные не теряются.
- [ ] Padding модалки одинаков на всех шагах (нет «прыжка» границы).
- [ ] Mobile: шаги — full-screen, не bottom-sheet.

---

## 3 · TG bot setup (#4)

**Канон:** части `screens-intake.jsx` (см. подсказки в `canon/index.html` секция s3-step3).

Отдельного компонента уже не выделяем — шаг 3 модалки (см. §2) выполняет эту роль. Старый экран «#4 добавления `@SamositeIntakeBot` в канал» — отдельный flow, который запускается **после** approve в админке, не в intake. Для pixel-аудита не обязателен в P0.

---

## 4 · Confirmation (#5)

**Канон:** `screens-intake.jsx` → `S5_Confirmation(contactType)`.

- Modal 840×560, центрировано.
- ✓ зелёный круг 64×64 сверху по центру.
- H2: `Заявка принята` (без точки).
- Body: `Соберём ваш сайт за 2–24 часа. Напишем когда готов на <channel>.` где `<channel>` зависит от contactType.
- Кнопка `Понятно` — primary pill, по центру.
- Mono подпись внизу: `app_id: <8-hex>` — серый.

**Селекторы:** `[data-modal="confirmation"]`, `[data-contact-type="email"]` и т.д.

---

## 5 · PhotoDrawer (#6)

**Канон:** `screens-intake.jsx` → `S6_PhotoDrawer(variant='desktop'|'mobile')`.

### Desktop variant
- Modal 620 wide × auto.
- Header: `Загрузите фото` + крест справа.
- Dropzone: 100% width, 200px height, dashed border `line`, hover → `accent`.
- Подсказка: `Перетащите файлы или нажмите. До 30 фото, до 10 МБ каждое.`.
- При наличии файлов — grid 4 cols × N rows, тайлы 128×128 с remove-крестом.
- Footer: счётчик `<n>/30` слева, кнопка `Отправить` справа.

### Mobile variant
- Bottom-sheet с radius `lg` сверху, full-width.
- Grag-handle 36×4 серый по центру сверху.
- Остальное идентично, grid 3 cols.

**Селекторы:** `[data-drawer="photo"][data-variant="desktop"]`, `[data-photo-tile][data-index="0"]`.

**Edge states (Tier 4):**
- 30/30 файлов — кнопка `+ ещё` disabled.
- >100MB суммарно — error-баннер `Слишком много фото. Уменьшите или загрузите по частям.`.
- HEIC файл — серый плейсхолдер с моно-именем, нет thumbnail.

---

## 6 · LeadForm (#8)

**Канон:** `screens-intake.jsx` → `S8_LeadFormConfirm`.

Inline-форма в секции «Записаться» customer-сайта.

- Сетка 1×N полей, по 1 в строке:
  - Имя (text)
  - Телефон (text + маска)
  - Услуга (select, заполняется из site.services)
  - Удобное время (textarea, 3 rows)
- Чекбокс ОПД.
- SmartCaptcha widget (Яндекс) — в тестах подменяется stub'ом.
- Кнопка `Записаться` — primary pill, full width на mobile.

**Confirmation inline (без редиректа):**
- Та же карточка, контент заменяется на:
  - ✓ зелёный + `Заявка отправлена`.
  - `<owner_name> ответит в течение <eta>. Спасибо!`.
  - Линк `Записать ещё одного →`.

**Селекторы:** `[data-form="lead"]`, `[data-form="lead"][data-state="success"]`.

**Edge states:**
- `429` rate-limit → error-баннер + кнопка disabled.
- Captcha fail → inline-error.
- Honeypot триггер → форма silently submitted, alert founder'у (UI идентичен success).

---

## 7 · FeedbackPage `/feedback` (#9)

**Канон:** `screens-intake.jsx` → `S9_FeedbackPage`.

Standalone-страница, не модалка.

- Layout: full-page cream bg, центрированный column 720px.
- H1: `Подскажите, чего не хватило?`.
- Subheading: 2 строки про то, что фаундер читает каждое сообщение лично.
- Группа checkbox-секций по типу feedback:
  - `платформа не поддерживается` → input для URL.
  - `интеграция` → textarea «какая платформа».
  - `функция` → textarea.
  - `что-то ещё` → textarea.
- Поле email (опционально).
- Кнопка `Отправить`.

**Плавающая кнопка `/feedback`** — справа внизу на каждой странице сайта (кроме `/feedback` самой).
- 56×56 круг, `accent` bg, иконка диалога, position fixed bottom: 24px right: 24px.

**Селекторы:** `[data-page="feedback"]`, `[data-feedback-type="platform-missing"]`, `[data-floating-feedback-btn]`.

---

## Чек-лист для pixel-аудита всех 8 экранов

- [ ] В прод-коде расставлены все `data-*` атрибуты из этого файла.
- [ ] Дебаг-хук `window.__open_submit_modal({step, channel})` доступен под `E2E_SEED=1`.
- [ ] `/dev/source-badge` рендерит все 9 состояний в grid.
- [ ] SmartCaptcha stub'ится под `E2E_SEED=1`.
- [ ] Polling `/api/tg-bot-personal-status` отключается под `E2E_SEED=1`.
- [ ] Baselines сгенерированы из соответствующих артбордов канона.
- [ ] Pixel-diff ≤ 2% на 1440 (desktop variants) и 390 (mobile variants).
