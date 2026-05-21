# Vitrina — Product Requirements Document

> **TL;DR — что строим за 2-3 месяца**
> - **Публичный бренд:** **Самосайт** (домен `samosite.online`). Внутренний code-name в репо — `vitrina` (имена пакетов, env vars, Docker image tags не меняются).
> - **Сайт-канал заявок для микробизнеса**: Самосайт — это сайт, который ИИ собирает из источника (**Telegram-канал, Я.Карты или фото**) и сам обновляет раз в неделю, сам ловит заявки, сам отправляет в Яндекс и Google
> - ICP: мастера маникюра, барбершопы, психологи, фитнес-тренеры; поддомен `name.samosite.online`, всё в РФ (ФЗ-152)
> - Первый месяц free **без карты** → Pro 299 ₽/мес; viral PLG через watermark на Free; цель MVP — 3+ платящих юзера к концу 1-го месяца после запуска
> - **Canonical messaging**: см. [`docs/COPY.md`](./COPY.md) — обновления copy идут через COPY.md как single source of truth
> - **Расширенный фото-флоу**: юзер загружает фото **работ + скриншот шапки профиля (Instagram/любой соцсети) + визитку + буклет**. Vision-capable LLM извлекает контекст из каждого типа. Это закрывает Instagram-юзеров без обращения к серверам Meta — юзер фотографирует свой экран
> - **Дополнительные источники (VK, MAX-канал, прямой парсинг Instagram, 2GIS, Avito, WhatsApp Catalog, YouTube, Дзен, собственный сайт)** — через **waitlist в feedback-форме** (см. ADR-0009): фиксированный список чекбоксов + открытое поле «другое». Делаем когда конкретный источник наберёт ≥10 голосов

---

## 1. Problem (SCQ)

**Situation.** Микробизнес услуг (мастера маникюра, барберы, психологи) ведёт коммуникацию с клиентами в TG-каналах, на Я.Картах и в IG, но не имеет собственного сайта. Сайт нужен для SEO (приток клиентов из поиска), репутации (доверие выше, чем у одного IG), приёма заявок без посредников.

**Complication.** Существующие конструкторы (Tilda, Nethouse, WIX) требуют 4-20 часов работы руками: подбор шаблона, перенос фото, написание текстов, настройка SEO, регистрация в Я.Вебмастере. У ICP нет ни времени, ни навыков. Альтернатива — фрилансер за 15-50к ₽ + 2-4 недели ожидания + риск получить «недоделку».

**Question.** Можно ли сократить время «от идеи до работающего сайта в индексе Яндекса» с 4+ часов до 2 минут, при этом качество SEO выше, чем у Tilda «из коробки»?

**Answer (этот документ).** Да — за счёт (1) AI-генерации контента из существующих источников юзера; (2) одного жёсткого шаблона вместо «выбора из 200»; (3) встроенной SEO-разметки и авто-регистрации в Я.Вебмастере; (4) еженедельного auto-sync, который никто на рынке не делает.

---

## 2. Target users & JTBD

### Persona 1 — «Аня, мастер маникюра, 28 лет, Петрозаводск»
- **JTBD**: «Хочу, чтобы новые клиенты находили меня в Яндексе, а не только через сарафан, при этом не платить SMM-щику 15к/мес»
- **Current workaround**: профиль в Я.Картах + IG (доступ через VPN) + WhatsApp-рассылка постоянным клиентам
- **Pain**: «На Тильду села три раза, бросила — не понимаю, как настроить домен и где SEO». «IG заблокирован, реклама не работает, новые клиенты пропали»

### Persona 2 — «Сергей, владелец барбершопа на 3 кресла, Самара»
- **JTBD**: «Хочу один сайт на бизнес, который сам обновляется когда я выкладываю фото в TG-канал»
- **Current workaround**: TG-канал на 800 подписчиков + 2gis-карточка
- **Pain**: «Заказывал у студента-фрилансера, через год сайт умер — некому обновлять. Не хочу зависеть от человека»

### Persona 3 — «Марина, психолог в частной практике, Москва»
- **JTBD**: «Нужно лицо в интернете для доверия клиентов, без раскрытия слишком многого о себе»
- **Current workaround**: страница на B17, личный TG-канал
- **Pain**: «B17 завален всеми подряд, теряюсь. Свой сайт хочется, но я не айтишник»

---

## 3. Press-release (Amazon working-backwards)

> **Самосайт запускает сайты, которые сами себя ведут и приносят заявки мастерам микробизнеса**
>
> Москва, [дата запуска] — Сегодня запускается Самосайт (samosite.online) — сайт-канал заявок для частных мастеров и малых услуг, который собирается из того, что у мастера уже есть, и сам поддерживает себя актуальным. Юзер показывает ссылку на своё дело — Telegram-канал, ВКонтакте, Яндекс.Карты — или загружает фото визитки/работ; ИИ собирает сайт за пару минут на поддомене `имя.samosite.online`.
>
> Главное отличие от Tilda и Nethouse — три «сама»: сам обновляется раз в неделю из источника, сам ловит заявки через форму и Telegram-уведомления мастеру, сам отправляет сайт в Яндекс и Google чтобы клиенты находили мастера в поиске. От мастера не требуется ничего после первой минуты подключения.
>
> «Мастер маникюра в регионе теряет клиентов не потому что у него нет умений, а потому что его невозможно найти в Яндексе. Тильда даёт ему конструктор, мы даём результат — канал заявок, который работает сам», — говорит [Founder].
>
> Первый месяц бесплатно без карты при регистрации, далее Pro 299 ₽/мес с отменой в один клик. Все данные хранятся в РФ, сервис соответствует ФЗ-152.

---

## 4. User scenarios (v2)

> **Product principle (v2).** Главная страница `samosite.online` имеет **один input** для ссылки на источник и **3-шаговую модалку** (link → channel+contact → bot-start или confirmation). Source type определяется backend-вызовом `/api/preview` (≤300ms debounce, 3s upstream timeout). Fallback-пути (фото, TG-экспорт) — текстовые ссылки под input. См. COPY.md §3 для canonical UX.

> **9 платформ в детекторе** (FR-005):
> - `tier=ok` (MVP, парсер работает): `yandex_maps`, `telegram`, `twogis`, `avito`, `website`
> - `tier=soon` (waitlist, парсер пока нет): `vk`, `instagram`, `whatsapp`, `youtube`
> - `tier=unknown` (любая другая http(s) ссылка): open input «Какой это источник?»

### S1. Создание сайта из ссылки (любой `tier=ok` источник) — основной 3-шаговый флоу
1. Юзер открывает `samosite.online` — видит Hero (без eyebrow, без benefits stack) с одним input-полем и CTA «Собрать мой Самосайт»
2. Вставляет ссылку. Debounce 300ms → `GET /api/preview?url=...` → зелёная плашка `✓ Распознали: Telegram-канал — нашли 47 постов и 12 фото` под полем
3. (Опционально) если распознано не то — кликает «не то?» → popover со списком `override_options` → выбирает правильный → бейдж обновляется
4. Жмёт «Собрать мой Самосайт» → открывается **3-шаговая модалка**, шаг 1 уже завершён
5. **Шаг 2 — «Куда вам писать?»**: явный radio TG / Phone / Email / MAX, поле под выбранный канал с specific placeholder, checkbox согласия на ПДн (не предзаполнен). Submit → `POST /api/submit-application` с `{source_url, source, source_override, channel, contact, consent_v, captcha_token}`. 201 → `{app_id, status: 'pending'}`
6. **Шаг 3 (только если `channel=telegram`)** — «Откройте бота на 1 минуту»: deep-link `tg://resolve?domain=SamositeBot`, polling `GET /api/tg-bot-personal-status?app_id=<id>` каждые 5 сек. Когда `{started:true}` — confirmation screen. **Fallback всегда виден:** «Нет Telegram или не получается? Получить ссылку на почту →» → `POST /api/submit-application/finalize-via-email` `{app_id, email}`
7. **Для остальных каналов** (phone/email/max) шаг 3 пропускается — сразу confirmation: «Готовим ваш сайт, напишем на <маска>. Через 2–24 часа»
8. Бэкенд: парсер достаёт данные источника → LLM генерит контент → sanitization → founder в админке жмёт «Опубликовать»
9. Юзер получает уведомление в указанный канал со ссылкой `studia-anna.samosite.online`

**Кнопка «Назад»** появляется на шагах 2 и 3 как pill слева от прогресс-бара. Сохраняет введённые данные предыдущих шагов.

**Bot distinction (важно).** В шаге 3 — `@SamositeBot` (personal). В экране #4 для приватных TG-каналов (см. S2 ниже) — `@SamositeIntakeBot` (intake). Это разные боты с разными ролями. См. ADR-0011.

### S2. Telegram — variant с TG-источником

Если URL шага 1 = `t.me/<channel>` (`source=telegram`, `tier=ok`):
1. Шаги 1+2 как в S1
2. После шага 3 (юзер `/start`-нул `@SamositeBot`) и captcha — модалка показывает экран #4: «Канал приватный — пустите бота на 5 минут»
3. Юзер добавляет `@SamositeIntakeBot` админом своего канала, polling каждые 5 сек на admin-status
4. Когда бот стал админом → парсинг через Bot API → bot auto-leaves → confirmation screen
5. Если бот не может стать админом → fallback: парсинг публичного `t.me/s/<channel>` (Tier 2 ADR-0005)
6. Если канал приватный и owner не хочет пускать бота → ссылка «загрузить HTML-экспорт канала» (Tier 3)

### S3. Источник в waitlist (`tier=soon` — VK / Instagram / WhatsApp / YouTube)
1. Юзер вставил ссылку, `/api/preview` вернул `tier=soon, source=instagram`
2. Hero показывает inline warn-soft (амбер) панель: «⚠️ Instagram скоро будет — оставьте email, напишем когда добавим»
3. Параллельная CTA «или создайте из фото сейчас» → S4 с `photo_type=profile_screenshot`
4. Main CTA «Собрать мой Самосайт» — открывает PhotoDrawer (UX batch 1 fix, #54), а не модалку с stuck-source-type
5. Email submit → запись в `feedback` с `type=source_request, source_name=instagram`, для аналитики
6. Когда `source_name` набирает ≥10 голосов → founder приоритизирует ADR + спринт; всем waitlist'нувшимся уходит email

### S4. Фото — fallback flow (без изменений)
1. Под Hero — линк `📷 Загрузить фото работ, скриншот профиля или визитку →`
2. Click → PhotoDrawer выезжает снизу (mobile-first) / модалка (desktop)
3. Drag & drop 5–30 файлов (JPEG/PNG/WebP/HEIC, max 10MB/file, max 100MB total)
4. Per-файл authoclassify vision-LLM (`work` / `profile_screenshot` / `business_card` / `booklet`)
5. Форма: название бизнеса, категория (12 ICP), город, контакты + checkbox ОПД
6. LLM-pipeline по `photo_type` (без изменений vs v1)
7. Confirmation screen

**Этот флоу обслуживает IG/VK/WhatsApp/YouTube юзеров** через скриншоты — без обращения к серверам Meta/VK/Google.

### S5. Получение заявки на готовом customer-сайте (без изменений)
1. Конечный посетитель приходит на `studia-anna.samosite.online`, скроллит галерею, жмёт «Записаться»
2. Inline-форма: имя, телефон, сообщение опц.
3. Yandex SmartCaptcha + honeypot + rate limit
4. Шифрование `name/phone/message` через Fernet перед записью в `leads`
5. Аня получает TG-уведомление от **`@SamositeBot`** (не intake!) с маской `Анна П***, +7***1234` + ссылка
6. Magic-link auth → полные данные в admin

---

## 5. Functional requirements (EARS)

### Landing & Application Intake

- **FR-001** *(Ubiquitous)* The system shall expose a public landing page at `samosite.online` rendered server-side for SEO.
- **FR-002** *(Event-driven)* When a visitor submits the 3-step application flow (link → channel+contact → optional bot-start), the system shall persist the application, send a notification to the founder, and respond within 1s with a confirmation screen. See COPY.md §3 for the canonical UX.
- **FR-002a** *(Event-driven, v2)* The `POST /api/submit-application` endpoint shall require an explicit `channel` enum field (`telegram` / `phone` / `email` / `max`) AND a `contact` field. The system shall validate that `contact` matches the shape of `channel` (E.164 for phone, `@name` for telegram, `name@host` for email, MAX canonical for max). If `contact` ↔ `channel` mismatch — HTTP 400 `invalid_contact_for_channel`. See ADR-0008 v2.
- **FR-002b** *(Event-driven)* When the system needs to notify a user (site ready, lead arrived, system message), the system shall route via the user's `contact_type` with fallback chain: telegram → max → email → SMS. If primary channel delivery fails (e.g. TG user hasn't started conversation with `@SamositeBot`), the system shall try next channel if alternate contact exists.
- **FR-002c** *(Ubiquitous)* SMS notifications shall be sent ONLY after successful site publication (post manual review), not on initial application submission, to prevent SMS-cost abuse from spam.
- **FR-002d** *(Event-driven, new v2)* When step 3 of the 3-step flow is reached AND `channel=telegram`, the frontend shall poll `GET /api/tg-bot-personal-status?app_id=<id>` every 5 seconds with `application_id` from step 2. The endpoint shall return `{started: true}` once the user has invoked `/start` in `@SamositeBot`. Polling stops on 200+`started=true` or when the user dismisses the modal. Max polling window 5 minutes.
- **FR-002e** *(Event-driven, new v2)* The `POST /api/submit-application/finalize-via-email` endpoint shall accept `{app_id, email}` and convert a stuck `channel=telegram` application to `channel=email` without losing previously-entered link or other state. Used as the always-visible "Нет Telegram или не получается?" escape hatch on step 3.
- **FR-003** *(Unwanted)* If the application form is submitted without the PII consent checkbox checked, then the system shall reject the request with HTTP 400 and a human-readable error.
- **FR-004** *(State-driven)* While the rate limit for an IP exceeds 3 applications per hour, the system shall return HTTP 429 with a `Retry-After` header.
- **FR-005** *(Event-driven, v2)* When a URL is pasted into the Hero input, the system shall debounce ≤300ms and call `GET /api/preview?url=<encoded>`. Response: `{source, tier, counts, override_options}` where `source ∈ {yandex_maps, telegram, twogis, avito, website, vk, instagram, whatsapp, youtube, unknown}` (9 platforms), `tier ∈ {ok, soon, unknown}`, `counts` is a localised string for the badge or `null`, `override_options` is `SourceId[]` for the "не то?" popover.
- **FR-005a** *(Event-driven, v2)* `/api/preview` enforces a hard 3-second timeout per upstream call. On timeout OR upstream error, `tier=ok` sources degrade to a static badge without `counts`. `tier=soon` always returns immediately (no upstream call). The preview endpoint is rate-limited 10 req/min per IP to prevent reconnaissance.
- **FR-005b** *(Event-driven, new v2)* When `tier=ok` badge is shown, the user can click "не то?" → popover with `override_options`. Selecting an override re-submits the URL with `source_override=true` to `POST /api/submit-application` so the parser uses the user-chosen source even if it doesn't match the URL pattern.
- **FR-006** *(Unwanted)* If a pasted URL matches a `tier=soon` source pattern (VK, Instagram, WhatsApp-каталог, YouTube), the frontend shall show inline waitlist-capture (warn-soft amber panel + email field + auto-submit to `feedback type=source_request`) AND a parallel CTA «или создайте из фото сейчас» linking to S4. The main CTA opens PhotoDrawer (per UX batch 1 fix, #54).

### Source parsers

- **FR-010** *(Event-driven)* When a Yandex.Maps URL is submitted, the system shall validate it against the regex `^https?://(yandex\.[a-z]+|maps\.yandex\.[a-z]+)/.*` before any network call.
- **FR-011** *(Unwanted)* If a submitted URL resolves to a private IP range (RFC1918, link-local, loopback) after DNS resolution, then the parser worker shall reject the request and log a SSRF attempt.
- **FR-012** *(Event-driven)* When parsing a Telegram channel, the system shall first attempt TG Bot API; if the bot is not a member, the system shall fall back to requesting an HTML export from the user.
- **FR-013** *(Ubiquitous)* The system shall NOT process Instagram data in any form in MVP — no scraping, no archive uploads, no Graph API. Users coming from Instagram shall be redirected to the photo-upload flow (S4).
- **FR-014** *(Event-driven)* When a photo upload exceeds 30 files OR 10MB per file OR 100MB total, the system shall reject the upload with HTTP 413.
- **FR-015** *(Event-driven)* When a file is uploaded, the system shall verify its content type via magic bytes, not file extension; non-allowlisted types shall be rejected.

### Content generation (LLM)

- **FR-020** *(Ubiquitous)* The system shall send LLM prompts that wrap scraped/uploaded user content inside `<user_content>...</user_content>` tags, with a system prompt instruction to treat tag contents as data only.
- **FR-021** *(Ubiquitous)* The system shall obfuscate detected phone numbers, emails, and full names with placeholders (`[PHONE]`, `[EMAIL]`, `[NAME]`) before sending content to the LLM.
- **FR-022** *(Ubiquitous)* The system shall pass every LLM-generated string through `bleach.clean()` with a strict allowlist before storing it in `sites.generated_content`.
- **FR-023** *(State-driven)* While the monthly LLM token budget for the system is ≥80% consumed, the system shall queue new generation requests for manual review instead of auto-processing.
- **FR-024** *(Unwanted)* If the LLM response contains a URL or `javascript:` scheme not in the output allowlist, then the system shall flag the generation for manual review and not publish.

### Site publishing & hosting

- **FR-030** *(Event-driven)* When the founder clicks "Publish" in admin, the system shall render the site template, upload static files to S3, invalidate CDN cache, and notify the user via Telegram within 60s.
- **FR-031** *(Ubiquitous)* Every published site shall include a CSP header, HSTS header, Schema.org LocalBusiness JSON-LD, `sitemap.xml`, `robots.txt`, Open Graph tags, and Twitter Card tags.
- **FR-032** *(Ubiquitous)* Every published site shall achieve a Lighthouse score ≥90 for Performance, SEO, and Accessibility on mobile, verified in CI.
- **FR-033** *(Event-driven)* When a site is published, the system shall submit its URL to (a) Яндекс.Вебмастер API, (b) IndexNow (Yandex + Bing), and (c) Google Search Console API within 5 minutes — implementing the "sam находится в поиске" product promise.

### Auto-sync (P1, declared on landing, shipped after first 20 sites)

- **FR-040** *(State-driven)* While a site is in status `published` AND `last_synced_at < now() - 7 days`, the sync worker shall re-parse the source, compute a diff against `source_snapshot`, and re-publish only if the diff is non-empty.
- **FR-041** *(Unwanted)* If sync fails 3 consecutive times, then the system shall mark the site `sync_paused`, notify the user, and stop retrying.

### Leads collection (on customer sites) — **core product promise: «сам ловит заявки»**

- **FR-050** *(Ubiquitous)* The system shall encrypt lead fields `name`, `phone`, `message` with Fernet (AES-128-CBC + HMAC-SHA256) at write time, using a key from `FERNET_KEY` env var.
- **FR-050a** *(Ubiquitous)* Every published customer site shall ship with a working lead-intake form by default — no configuration step required by the master. Form fields: name (required), phone OR contact-method (required), message (optional).
- **FR-050b** *(Event-driven)* When a lead arrives, the system shall notify the site owner (master) via their chosen contact channel within 60 seconds with masked preview (`Анна П***, +7***1234`) and deep-link to decrypted view.
- **FR-051** *(Event-driven)* When a lead form is submitted, the system shall verify a Yandex SmartCaptcha token server-side before any DB write.
- **FR-052** *(State-driven)* While more than 3 leads have been submitted from the same IP within 1 hour, the system shall reject further submissions with HTTP 429.
- **FR-053** *(Ubiquitous)* The system shall mask PII in all logs (phone → `+7***1234`, email → `a***@gmail.com`).

### Auth & admin

- **FR-060** *(Ubiquitous)* The admin interface (`/admin`) shall require a strong password (≥16 chars, bcrypt cost=12) AND TOTP 2FA on every login.
- **FR-061** *(Unwanted)* If a login fails 5 times within 15 minutes from one IP, then the IP shall be blocked for 1 hour.
- **FR-062** *(Ubiquitous)* User-facing accounts shall use magic-link email auth or Yandex ID OAuth; passwords for end-users shall NOT be supported.

### Consent & PII handling (ФЗ-152)

- **FR-070** *(Event-driven)* When a user consents to PII processing, the system shall record a row in `consents` containing IP, timestamp, policy version, user-agent, and the exact consent text shown.
- **FR-071** *(Event-driven)* When a user requests data deletion via `/api/delete-my-data`, the system shall confirm via email link and complete deletion within 10 calendar days, logging the operation in an immutable audit trail.

### Billing (P1, after first paying-intent signals)

- **FR-080** *(State-driven)* While a user's `plan` is `trial` AND `plan_until > now()`, no charges shall be attempted.
- **FR-081** *(Event-driven)* When a user upgrades to Pro, the system shall create a ЮKassa recurring subscription with auto-renew opt-out available in one click.

### AI review curation (per ADR-0010, new v2) — core product promise: «сам выбирает отзывы»

- **FR-100** *(State-driven)* While a site's `status = published` AND `last_curated_at < now() - 7 days`, the `weekly_curate_reviews` cron worker shall re-fetch reviews from the source, call YandexGPT 5 Pro with the curation prompt, persist the result to `site_reviews_curated`, and re-render the customer-site template.
- **FR-100a** *(Ubiquitous)* The curation prompt shall include the canonical filter criteria from ADR-0010 (rating ≥ 4, length ≥ 30 chars, no template "norm/ok", no competitor mentions, no PII beyond first-name+first-letter-of-surname, no toxicity). Reviews wrapping in `<user_content>` tags per FR-020.
- **FR-100b** *(Unwanted)* If YandexGPT returns malformed JSON, contains URLs outside the allowlist, or fails 3 consecutive times with retry, the system shall fall back to `ORDER BY rating DESC, length(text) DESC LIMIT 6` from the source — same data, no `is_top_pick` badge.
- **FR-100c** *(Event-driven)* When all reviews in source have rating ≤ 3 (or there are zero reviews), the system shall not render the reviews section at all and shall enqueue a feedback alert to the founder (the site benefits from missing this section more than from showing weak ones).
- **FR-100d** *(Ubiquitous)* Every curation run shall log to `generation_audits` (audit table per FR-T4.5 / ADR-0006): `site_id, run_id, model_version, prompt_version, input_review_count, output_curated_ids, reasoning, tokens_in, tokens_out, latency_ms`. Retention 90 days.
- **FR-100e** *(Ubiquitous)* Output from the curator shall pass through `core/reviews/pii_filter.py` — hard regex check that no full surnames, phone numbers, addresses, or other PII slipped through (defensive, layered on top of the prompt instructions). Reviews failing PII-filter are dropped from the curated set.

### Feedback & waitlist (per ADR-0009)

- **FR-090** *(Event-driven)* When a user submits a feedback form, the system shall persist a row in `feedback` with `type` (`source_request` / `feature_request` / `bug` / `general`), `source_name` (if applicable), `email_or_contact`, `message`, `checkboxes` (JSONB), `created_at`. Founder receives TG-notification.
- **FR-091** *(Ubiquitous)* The feedback form shall provide a **fixed checkbox list** of waitlist items (VK, MAX-канал, Instagram-прямой-парсинг, 2GIS, Avito, WhatsApp Catalog, YouTube/Shorts, Дзен, парсинг своего сайта) **plus one open text field** «Другое (укажите)» so users can request unlisted sources/features.
- **FR-092** *(State-driven)* While `feedback` table contains ≥10 distinct user-submissions with the same `source_name` value, the founder admin dashboard shall highlight this source as «waitlist-triggered» on `/admin/waitlist` view.
- **FR-093** *(Event-driven)* When an Hero URL paste matches a waitlist-source pattern (VK, IG, 2GIS, etc), the frontend shall show inline waitlist-capture (email field + auto-submit to feedback with `type=source_request`) AND a parallel CTA «или создайте из фото сейчас» linking to S4.

---

## 6. Non-functional requirements

| Категория | Требование | Метод проверки |
|---|---|---|
| Performance — лендинг | TTFB <500ms p95, LCP <2.5s p75 (мобайл, 4G) | Lighthouse в CI; Я.Метрика веб-витал |
| Performance — клиентские сайты | LCP <2s p75 через CDN | Lighthouse в CI на каждый билд |
| Performance — API | p95 <300ms для не-парсерных эндпоинтов | structlog + Sentry performance |
| Scalability MVP | 100 сайтов × 100 посетителей/день = 10k RPS пик на CDN, 50 RPS на API | Нагрузочный тест `k6` перед публичным запуском |
| Availability | Uptime ≥99% (3-сутки downtime/месяц допустимо в MVP) | Uptime Robot или Better Stack, бесплатный план |
| Стоимость инфры | ≤5000 ₽/мес при 100 активных сайтах | Ручной аудит Selectel/YC ежемесячно |
| Стоимость LLM | ≤30 ₽ за генерацию одного сайта | Логирование tokens-in/out на каждый запрос |
| A11y | WCAG 2.1 AA на лендинге и клиентских сайтах | axe-core в CI |
| i18n | RU only в MVP, архитектура шаблонов готова к i18n (i18next-pattern в Jinja2 макросах) | Code review |
| Observability | Structured JSON logs, request_id corr, Sentry-капчур всех 5xx, TG-алерты на >5 ошибок/мин | Manual chaos test перед запуском |
| Compliance | ФЗ-152 (хранение в РФ, согласие, удаление), ФЗ-149, уведомление РКН поданo | См. SECURITY.md §11 + Pre-launch checklist |

---

## 7. Success metrics

### North-star metric
**Number of weekly-active published sites with traffic ≥10 unique visits.**
- Месяц 1 цель: 10 сайтов
- Месяц 3 цель: 50 сайтов
- Метод: events table aggregation + counter endpoint

### Leading indicators

| Metric | Target M1 | Target M3 | Measurement |
|---|---|---|---|
| Applications submitted/week | 50 | 200 | DB count `applications` |
| **Hero paste → submit conversion** | ≥30% | ≥45% | Я.Метрика goals: paste event → form_submit |
| Application → Published conversion | ≥40% | ≥60% | DB join `applications` × `sites.published_at` |
| Median time application→published | <24h | <2h (после автоматизации) | DB timestamps diff |
| **Leads per published site (week)** — proves «сам ловит заявки» | ≥0.5 (1 лид на 2 сайта/неделю) | ≥2 | DB `leads` count / `sites.published` count |
| **% sites indexed in Яндекс within 14 days** — proves «сам находится» | ≥60% | ≥85% | Manual sampling 10 sites + Яндекс.Вебмастер API |
| Free→Pro conversion (cohort) | — | ≥10% | DB `users.plan` transitions by signup_month cohort |
| Feedback form submissions/week | 5 | 20 | DB count `feedback` |

### AI-specific metrics (per Miqdad Jaffer AI-PRD)

| Metric | Target | Measurement |
|---|---|---|
| Generation success rate (no manual override needed) | ≥80% при первых 50 сайтах | Manual review log в админке |
| Hallucination rate (LLM выдала факт, которого нет в source) | <5% | Sampling 10% сайтов на manual review |
| Prompt injection detection rate | 100% known patterns | Test suite `tests/security/prompt_injection.py` |
| LLM latency p95 (single site generation) | <30s | structlog timing per request |
| Cost per generated site | <30 ₽ | YandexGPT billing × site count |

---

## 8. Out of scope (MVP)

- **MVP-источники строго**: только Telegram-канал, Яндекс.Карты, фото. Остальное в waitlist.
- **Прямой парсинг Instagram** — в waitlist. IG-юзеры обслуживаются через S4 (скриншоты профиля + фото работ). См. ADR-0004.
- **VK / ВКонтакте** — в waitlist. VK-юзеры обслуживаются через S4 (скриншоты страницы + фото работ).
- **MAX-канал как источник** (не путать с MAX как канал уведомлений в ADR-0008) — в waitlist.
- **2GIS, Avito, WhatsApp Catalog, YouTube/Shorts, Дзен, парсинг собственного сайта юзера** — в waitlist.
- **Ozon / Wildberries** (товарный e-commerce — другой product line; см. §10 OQ-8).
- Визуальный редактор сайта (никаких drag&drop блоков — это вся точка)
- Выбор шаблонов из библиотеки (один универсальный шаблон, 3 авто-цветовые схемы по доминантному цвету фото)
- Source picker как отдельный экран — single-input Hero вместо вкладок (см. §4 product principle)
- Мобильное приложение
- YCLIENTS / amoCRM интеграции (в backlog после клиентского сигнала через форму обратной связи)
- Блог-CMS для клиентских сайтов
- Мультиязычные сайты
- Telethon mass scraping (см. ADR-0005 — TG Bot API первым, Telethon только как фоллбэк с burner-аккаунтом)
- Платёжка в первый месяц после запуска (включается, когда 5+ юзеров досидели до конца триала)
- Pen-test от внешней команды до публичного запуска (P1, ~30-50k ₽, после первых 10 платящих)
- OCR через отдельный pipeline (Tesseract / Yandex Vision API) — пока полагаемся на vision YandexGPT 5 Pro [verify]; если качество <80% на скриншотах профилей IG — переходим на Yandex Vision в M2

---

## 9. Assumptions

- **ASSUMPTION-A1**: Founder работает соло, 2-3 месяца до публичного запуска, имеет VPS под OpenClaw и опыт с Docker/Python
- **ASSUMPTION-A2**: Бюджет на инфру ≤5000 ₽/мес при 100 сайтах; на юриста ≤10k ₽ единоразово; на pen-test ≤50k ₽ перед публичным запуском
- **ASSUMPTION-A3**: YandexGPT 5 Pro доступен и стабилен в РФ; квоты позволяют 100 сайтов × ~5 запросов/сайт = 500 запросов/мес в первый месяц [verify: квоты Yandex Cloud Foundation Models]
- **ASSUMPTION-A4**: Целевая аудитория готова дать ссылку на Я.Карты/TG и подождать 2-24 часа (не 2 минуты на MVP — мануальная модерация)
- **ASSUMPTION-A5**: Wildcard SSL для `*.samosite.online` решается через Let's Encrypt DNS-01 challenge с Cloudflare/Selectel DNS API [verify: Selectel DNS поддерживает API для acme.sh]
- **ASSUMPTION-A6**: 299 ₽/мес — приемлемая цена (v2.1, понижено с 990 после user-testing цены) для ICP. Гипотеза, проверяется на 5+ юзерах после триала
- **ASSUMPTION-A7**: VK как альтернатива IG источнику покроет ~30% аудитории, у которой нет архива IG, но есть VK-страница

## 10. Open questions

- **OQ-1**: Юридическая проверка политики конфиденциальности и оферты — нужен договор с юристом РФ-специализации на ФЗ-152. **Срок**: до старта формы заявок на лендинге.
- **OQ-2**: Уведомление РКН (pd.rkn.gov.ru) о начале обработки ПДн — кто заполняет, какая категория, на какой срок. Подача до публичного запуска. **Срок**: спринт 1.
- **OQ-3**: ЮKassa или СБП через Точку — какая комиссия и условия для самозанятого/ИП. Решение принимается перед спринтом подключения биллинга.
- **OQ-4**: Telethon-аккаунт — где взять SIM-карту для регистрации, чтобы не использовать личный номер. Виртуальный номер от sms-activate.org legal? [verify: ФЗ-126 о связи]
- **OQ-5**: Стратегия cold-start: TG-каналы для ICP-маркетинга, или Я.Директ, или контент-маркетинг через блог. Решение — после первого спринта.
- **OQ-6**: MAX Bot — публикация требует **верифицированного юр.лица РФ** через VK Business Suite [verify: точные требования к ИП vs ООО]. Если ИП-верификация недоступна или занимает >2 недель — MAX как notify-канал стартует позже (после регистрации), пока работаем без него. Сам код multi-channel notify готов, MAX-adapter включается feature-flag'ом.
- **OQ-7**: MAX deep-link формат для ввода контакта — `max.ru/u/<name>`, `max://contact?id=...` или что-то иное? [verify через dev.max.ru]
- **OQ-8**: Ozon / Wildberries / Avito (магазины) — это **другой product line** («сайт-витрина каталога товаров» vs текущий «сайт-канал заявок»). Решение: НЕ делаем в этом MVP; если waitlist накопит ≥10 голосов на Ozon ИЛИ WB ИЛИ Avito — пишем отдельный ADR-0010 «Catalog product line» с пересмотром PRD/templates/billing.
- **OQ-9**: Качество vision-capability YandexGPT 5 Pro [verify дата запуска и benchmark on RU-IG screenshots]. План: первые 5-10 сайтов из S4 с `photo_type=profile_screenshot` проверяем вручную. Если accuracy текстовой экстракции <80% — переключаемся на Yandex Vision API (отдельный сервис) в M2 без блокировки запуска MVP (юзер заполняет bio руками в форме).
- **OQ-10**: Waitlist-порог ≥10 голосов на источник — взят с потолка. Сверить с реальной conversion (10 голосов = ~50-100 потенциальных юзеров, что оправдает 1-2 недели разработки) после первого месяца данных.
