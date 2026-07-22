# Feedback #9 — backend work (ADR-0009 rev.2)

> **⚠ SUPERSEDED (июль 2026): Feedback v2.** Vote-first уходит —
> `docs/handoff/CANON_FEEDBACK_V2_TZ.md` описывает новую форму («Что
> останавливает?» + «Задать вопрос»). Бэкенд v2 УЖЕ live (PR #256):
>
> ```http
> POST /api/feedback/v2   (rate-limit, SmartCaptcha, extra='forbid')
> {
>   "mode": "blocker" | "question",
>   "trigger": "exit" | "scroll" | "button",
>   "reason": "<код консьерж-таблицы>",   // blocker: обязателен (слаг)
>   "note": "...",                         // blocker: опционально, ≤500
>   "question": "...",                     // question: обязателен, ≤2000
>   "contact_channel": "telegram"|"whatsapp"|"email",  // при контакте
>   "contact": "...",                      // blocker: опц., question: обяз.
>   "consent_given": true,                 // обязателен при контакте
>   "captcha_token": "..."
> }
> 202 {"ok": true, "data": {"feedback_id": "<uuid>"}}
> 400 {"error": "reason_required|invalid_reason|question_not_allowed|
>       question_required|reason_not_allowed|contact_required|
>       channel_required|invalid_contact_for_channel|consent_required|
>       invalid_captcha"}
> ```
>
> Хранение: те же строки `feedback` (миграция 0020: `trigger`/`reason`/
> `contact_channel`/`contact`; `type` += `blocker|question`). Founder-алерт —
> тот же dispatcher, тема «фидбек: {reason}» / «вопрос с сайта», контакт
> маской, blocker-с-контактом помечен как мини-лид. Админ-инбокс —
> `GET /admin/feedback` (v2 + legacy, фильтр по type).
> Enum причин: `FEEDBACK_V2_REASON_CODES` в `core/feedback/service.py` —
> сузить до кодов консьерж-таблицы, когда founder её пришлёт.
> `GET /api/feedback/tally` и votes-ветка ниже — ретайр после PR-C
> (переключения фронта); до него живут для текущей прод-модалки.

The feedback UI moved from a standalone `/feedback` page to a **vote-first modal**
(`code/FeedbackForm.tsx` → `FeedbackModal`). One submit now carries **N votes** plus
an optional contact. The backend needs the changes below.

## 1. New endpoint — `GET /api/feedback/tally`

Powers the `X/10` counters and the "за неделю" number. Cheap, cacheable.

```http
GET /api/feedback/tally
200 {
  "items":     { "vk": 9, "yclients": 8, "custom_domain": 9, ... },  // votes per option key
  "total_week": 340                                                   // votes in trailing 7d
}
```

- `items[key]` = distinct-contact (or distinct-IP for anonymous) vote count per option key.
- Cap UI at 10, but return the real number — frontend clamps.
- Cache 30–60s (Redis or edge). This is read on every modal open.
- SSR fallback: if the call fails, the modal uses baked-in `base` values (no error state).

## 2. Changed endpoint — `POST /api/feedback`

Was: one `{ type, contact, message, checkboxes }` row. **Now: a batch of votes.**

```jsonc
POST /api/feedback
{
  "votes": [
    { "kind": "source",  "key": "vk" },
    { "kind": "feature", "key": "custom_domain" }
  ],
  "own_source":  "Тинькофф-витрина" | null,   // free-text "+ свой вариант"
  "own_feature": null,
  "message":     "..." | null,                 // "+ комментарий"
  "name":        "Анна" | null,                // contact block (optional)
  "contact":     "@studia_anna" | null
}
→ 200 { "accepted": 2, "tally": { ...updated items... } }   // echo new tally for instant UI sync
```

### Persistence
- Insert **one `feedback_vote` row per item** in `votes[]` (so the inbox/aggregation
  still groups by option key). Keep the existing `feedback` row for `own_*`/`message`
  free-text + contact, linked by a `submission_id`.
- Suggested schema:
  - `feedback_submission(id, name, contact, message, ip_hash, created_at)`
  - `feedback_vote(id, submission_id, kind, option_key, created_at)`
- `own_source` / `own_feature` → store as votes with `option_key = null` + the raw
  text on the submission, OR as a pending `feedback` row of type `source_request`.

### De-dupe & abuse
- **De-dupe:** ignore a (contact|ip_hash, option_key) pair already voted in the last
  N days — return it as `accepted` anyway (idempotent; never show the user an error).
- **Per-IP cap:** ≤ ~20 votes / hour / IP (one submit of many options counts as many);
  excess → silently drop (FR-052 style), still `200`.
- **Honeypot / SmartCaptcha:** same policy as Lead form (#8).
- Strip/validate `contact` (email | phone | @handle) but **do not** hard-require it —
  contact is optional by design (vote-first).

## 3. Threshold automation (unchanged intent, new trigger point)
- When an `option_key` crosses **10 distinct votes**, fire the founder alert
  (TG notification) and mark it `in_progress` so it can surface in the #18 inbox.
- If a voter left a contact, queue them for the "мы добавили X" notification when
  that option ships.

## 4. Wiring / routing
- **Remove** the `/feedback` route/page — the modal mounts globally.
- Mount `<FeedbackModal tally={await getTally()} />` once in `app/layout.tsx`
  (it renders its own floating trigger; no extra button needed).
- The old `FeedbackFloatingButton` export now aliases `FeedbackModal` for
  back-compat — existing imports keep working but should migrate.
- shadcn deps used by the new UI: `dialog`, `progress` (add via `npx shadcn add
  dialog progress` if not present).

## 5. Admin inbox (#18) — minor
- `feedback_vote` rows roll up by `option_key` for the "X/10" view; the JSONB
  `checkboxes` shape from rev.1 is replaced by joined vote rows. Update the
  pretty-printer in `FeedbackInbox` accordingly.
