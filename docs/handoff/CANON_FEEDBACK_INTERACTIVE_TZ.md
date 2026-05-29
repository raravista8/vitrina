# ТЗ — interactive `S9_FeedbackModal` (canon ≥ 0.9.x)

> **Адресат:** Claude Design (авторы канона).
> **Заказчик:** vitrina / Самосайт прод.
> **Контекст:** canon 0.9.0 перевёл feedback #9 на vote-first модалку. Но
> отгруженный `S9_FeedbackModal` — **presentational canvas-артборд**, его
> нельзя смонтировать как реальную модалку на проде. Нужен **interactive
> вариант с props** — ровно по тому же паттерну, как canon 0.3.0 разблокировал
> `SubmitModal` (controlled API) и 0.2.x — admin-экраны.

---

## 1. Почему текущий `S9_FeedbackModal` нельзя дропнуть на прод

`src/customer/index.tsx` → `function S9_FeedbackModal({ mobile })`:

1. **`open` = `useState(true)`** — модалка открыта при маунте; floating-кнопка
   показывается только при `!open`. Консьюмер не может смонтировать её
   «закрытой с плавающей кнопкой» без хаков (state внутренний, ресет только
   через remount).
2. **`FauxPage`** — всегда рендерит блюр-макет фейковой страницы за модалкой.
   Это canvas-приём (артборд). На реальной странице это перекрывает настоящий
   контент фейковым скелетоном.
3. **`position: absolute; inset: 0`** внутри контейнера `position: relative;
   width:100%; minHeight:100%` — оверлей привязан к контейнеру, а не к
   вьюпорту. Для глобальной модалки нужен `position: fixed`.
4. **Нет props** `open` / `onOpenChange` / `tally` / `onSubmit` /
   `submitting` / `error`. Голоса живут во внутреннем `useState`; сабмит =
   `setSubmitted(true)`, **сетевого вызова нет**.
5. **Саб-примитивы не экспортируются** (`FBVoteRow`, `FBVoteSection`,
   `FBField`, `FBReveal`) — нельзя пересобрать модалку из кусков на стороне
   консьюмера.
6. `tally`-проп, упомянутый в `docs/FEEDBACK_BACKEND.md`
   (`<FeedbackModal tally={await getTally()} />`), **в коде отсутствует** —
   док и компонент противоречат друг другу.

Воспроизводить vote-first вёрстку руками — нарушение hard-rule
«NEVER transcribe canon JSX» (`landing/CLAUDE.md`). Token-hand-roll —
последнее средство по `CANON_SWAP_PLAN.md` (Option C, «avoid unless A and B
fail»). Поэтому — просим interactive-вариант.

---

## 2. Требуемый контракт (controlled API)

Сохранить визуал 0.9.0 без изменений; добавить props. Zero-prop вызов
(`<S9_FeedbackModal />`) обязан остаться mock-режимом для canvas
(back-compat, как у admin-экранов 0.2.x).

```ts
type FbKind = 'source' | 'feature';
type FbVote = { kind: FbKind; key: string };

interface FbTally {
  items: Record<string, number>; // option_key → голосов (реальное число; UI клампит до 10)
  total_week: number;            // «за неделю» в шапке
}

interface FbSubmitPayload {
  votes: FbVote[];                 // отмеченные пункты
  own_source: string | null;      // «+ свой вариант» (источник)
  own_feature: string | null;     // «+ свой вариант» (фича)
  message: string | null;         // «+ комментарий»
  name: string | null;            // контакт-блок (опционально)
  contact: string | null;         // email | phone | @handle (опционально)
}

interface S9_FeedbackModalProps {
  mobile?: boolean;               // как сейчас

  // — открытие/закрытие (controlled; uncontrolled fallback для canvas) —
  open?: boolean;                 // если задан — controlled
  onOpenChange?: (open: boolean) => void;
  // floating-триггер остаётся внутри; при controlled-режиме его клик
  // зовёт onOpenChange(true), а не трогает внутренний state.

  // — данные —
  tally?: FbTally;                // из GET /api/feedback/tally; при отсутствии
                                  // — текущие baked base-значения (canvas).

  // — сабмит —
  onSubmit?: (payload: FbSubmitPayload) => void | Promise<void>;
  submitting?: boolean;           // спиннер в кнопке «Отправить N голосов»
  error?: string | null;         // инлайн-ошибка (необяз.)
  // thank-you экран показывается после резолва onSubmit (или при submitted=true
  // в uncontrolled режиме — как сейчас).

  // — реальный маунт vs артборд —
  embedded?: boolean;             // default false.
  //   embedded=false (прод): НЕТ FauxPage; оверлей position: fixed; inset:0;
  //                          высокий z-index — глобальная модалка над страницей.
  //   embedded=true  (canvas): текущее поведение — FauxPage + position:absolute.
}
```

### Поведенческие требования

- **`embedded=false`** — никакого FauxPage; за модалкой реальная страница
  консьюмера (он сам решает, блюрить ли). Оверлей фиксирован к вьюпорту.
- **`open` controlled** — консьюмер открывает модалку из своей floating-кнопки
  **и** из других точек (Footer-ссылка, «Не нашли свою?» в Sources). Внутренняя
  floating-кнопка по-прежнему рендерится, но в controlled-режиме делегирует
  открытие через `onOpenChange`.
- **`tally`** инъектируется — `X/10` бары и «за неделю» берут числа из него;
  при тике пункта по-прежнему `+1` на глазах (оптимистично поверх tally).
- **`onSubmit`** получает весь payload; captcha/honeypot консьюмер навешивает
  сам **вокруг** `onSubmit` (как у Lead form #8) — каноном captcha не трогаем.
- **Селекторы** `[data-feedback-modal]` / `[data-floating-feedback-btn]` —
  сохранить (на них завязан e2e/DOM-binding на стороне vitrina).

---

## 3. Acceptance

- [ ] `<S9_FeedbackModal />` без props = текущий canvas-режим (артборд, FauxPage,
      open=true) — pixel-identical 0.9.0.
- [ ] `embedded=false` не рендерит FauxPage и фиксирован к вьюпорту.
- [ ] `open` / `onOpenChange` управляют модалкой; внутренняя floating-кнопка
      работает в обоих режимах.
- [ ] `tally` управляет `X/10` + «за неделю»; оптимистичный `+1` при тике.
- [ ] `onSubmit(payload)` отдаёт `votes[] + own_* + message + name + contact`;
      `submitting` крутит спиннер; thank-you после резолва.
- [ ] Экспорт `S9_FeedbackModal` (+ алиасы `S9_FeedbackPage` / `FeedbackPage`)
      — без изменений путей.
- [ ] TypeScript prop-интерфейсы экспортированы (`S9_FeedbackModalProps`,
      `FbTally`, `FbVote`, `FbSubmitPayload`, `FbKind`).
- [ ] CHANGELOG обновлён.

## 4. Прецеденты в каноне (тот же паттерн)

- **canon 0.3.0** — `SubmitModal` переведён на полный controlled API
  (`mode`/`step`/`on*Change`/`onSubmit`). Это разблокировало drop-in на vitrina.
- **canon 0.2.x** — все admin-экраны: `data?` + `loading?` + `error?` +
  callbacks, zero-prop = mock. `_embed?: false` escape-hatch на chrome-wrapped
  экранах — прямой аналог запрашиваемого здесь `embedded`.

## 5. Что НЕ нужно

- Менять визуал/копи 0.9.0 (только props + `embedded`-ветка без FauxPage).
- Captcha/anti-abuse в каноне (это backend + консьюмер).
- Сетевые вызовы внутри компонента (всё через `onSubmit` / `tally`).
