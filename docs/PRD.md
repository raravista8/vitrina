# Vitrina — Product Requirements Document

> **TL;DR — что строим за 2-3 месяца**
> - **Публичный бренд:** **Самосайт** (домен `samosite.online`). Внутренний code-name в репо — `vitrina` (имена пакетов, env vars, Docker image tags не меняются).
> - **Сайт-канал заявок для микробизнеса**: Самосайт — это сайт, который ИИ собирает из источника (**Telegram-канал, Я.Карты или фото**) и сам обновляет раз в неделю, сам ловит заявки, сам отправляет в Яндекс и Google
> - ICP: мастера маникюра, барбершопы, психологи, фитнес-тренеры; поддомен `name.vitrina.site`, всё в РФ (ФЗ-152)
> - Первый месяц free **без карты** → Pro 990 ₽/мес; viral PLG через watermark на Free; цель MVP — 3+ платящих юзера к концу 1-го месяца после запуска
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
> Первый месяц бесплатно без карты при регистрации, далее Pro 990 ₽/мес с отменой в один клик. Все данные хранятся в РФ, сервис соответствует ФЗ-152.

---

## 4. User scenarios

> **Product principle: zero-friction Hero.** Главная страница `vitrina.site` имеет **один input** для ссылки на источник. Без таб-навигации, без выбора «откуда», без отдельного «выберите источник» экрана. Source type определяется **client-side regex** мгновенно (<100ms) после paste. Fallback-пути (фото, TG-экспорт, VK) — текстовые ссылки под input, не вкладки.

> **Instagram, VK, MAX, 2GIS, Avito, WhatsApp Catalog, YouTube, Дзен, собственный сайт** — все в **waitlist через feedback-form** (см. ADR-0009). При попытке вставить ссылку с одного из этих ресурсов на Hero — юзер видит inline-сообщение «Этот источник скоро будет, оставьте email» (это и есть waitlist). **Параллельно** юзеру предлагается S4 (фото-флоу) который **принимает скриншоты** профилей соцсетей — это закрывает 80% IG/VK-потребности без обращения к серверам соответствующих платформ.

### S1. Создание сайта из ссылки (Telegram-канал / Яндекс.Карты) — основной флоу
1. Юзер открывает `vitrina.site` — видит Hero с одним input-полем и CTA «Создать сайт»
2. Вставляет ссылку (`yandex.ru/maps/...`, `t.me/channel`, `@channel`)
3. Client-side regex определяет источник за <100ms и показывает бейдж под полем: `✓ Яндекс.Карты` / `✓ Telegram`
4. Жмёт «Создать сайт» → открывается **modal step 2 с одним полем контакта** + чекбокс согласия на ПДн (не предзаполнен). Placeholder: «Email, телефон, @telegram или MAX». Frontend auto-detect определяет тип контакта по regex.
5. Submit → confirmation screen «Готовим ваш сайт, напишем когда будет готов через 2-24 часа» (MVP — ручная модерация фаундером)
6. Бэкенд: парсер достаёт данные источника → LLM генерит контент → sanitization → founder в админке жмёт «Опубликовать»
7. Юзер получает уведомление в указанный канал со ссылкой `studia-anna.vitrina.site`

**Contact auto-detect regex** (client-side, в порядке проверки):

| Pattern | Type | Validation |
|---|---|---|
| `^@?[a-z0-9_]{5,32}$` (only letters/digits/_) | Telegram username | min 5 chars per TG rules; normalize to `@name` |
| `t\.me/<name>` | Telegram | extract name, normalize |
| `max\.ru/[a-z0-9_]+` или `max://...` | MAX | extract identifier [verify: точный формат MAX deeplink] |
| `^\+?[0-9 ()\-]{10,15}$` | Phone | `phonenumbers` library server-side, normalize to E.164 |
| `^[^@\s]+@[^@\s]+\.[a-z]{2,}$` | Email | RFC-light |
| Иначе | Error inline: «Введите email, телефон, @имя в Telegram или MAX» |

**Auto-detect regex источника** (Hero input, отдельно от контакта):

| Pattern | Source / Action |
|---|---|
| `yandex\.[a-z]+/maps/` | ✓ Яндекс.Карты (MVP) |
| `t\.me/` или `^@[a-z0-9_]+$` | ✓ Telegram (MVP) |
| `instagram\.com/`, `instagr\.am/` | **Waitlist + photo CTA**: «Instagram скоро будет. Пока — сделайте скриншот вашего профиля + фото работ и загрузите → [Создать из фото]» |
| `vk\.com/`, `vkontakte\.ru/` | **Waitlist + photo CTA**: «ВКонтакте скоро. Пока — скриншот страницы + фото работ → [Создать из фото]» |
| `2gis\.ru/`, `avito\.ru/`, `ozon\.ru/`, `wildberries\.ru/`, `wa.me/`, `youtube\.com/`, `dzen\.ru/`, `wb\.ru/` | **Waitlist only**: «`<источник>` скоро будет, оставьте email» |
| Любая `http(s)://` ссылка не из списка | **Waitlist + open field**: «Не узнали источник. Какой это? [open input] — мы напишем когда добавим» |
| Не URL | Error: «Поддерживаем Telegram, Яндекс.Карты. Или [📷 загрузите фото]» |

### S2. Telegram — variant внутри S1 с бот-flow
1. Юзер вставил `t.me/channel` или `@channel` на Hero → S1 step 3-4
2. После submit в **той же модалке** появляется блок: «Чтобы взять посты канала — добавьте `@VitrinaIntakeBot` админом на 5 минут, мы автоматически выйдем»
3. Видео-гайд 20 сек + статус «жду пока добавите бота» с polling каждые 5 сек
4. Когда бот стал админом → парсинг через Bot API → confirmation screen
5. Если бот не может стать админом (`channels with attachable bots disabled`) → fallback на парсинг публичного `t.me/s/<channel>` (Tier 2 из ADR-0005)
6. Если канал приватный → **отдельный entry-point** под Hero: ссылка «📨 У меня закрытый канал — загрузить экспорт» → загрузка HTML-экспорта (Tier 3)

### S3. Источник в waitlist (VK / Instagram / 2GIS / другое) — захват email
1. Юзер вставил ссылку, которая auto-detect определил как «known but not MVP» (VK, IG, 2GIS, etc) OR любую другую ссылку из waitlist-белого списка
2. Hero показывает inline-сообщение: «`<источник>` скоро будет. Оставьте email — напишем когда будет готово»
3. Если источник = IG или VK → дополнительная CTA «Или сделайте скриншоты профиля + фото работ — сайт будет готов сейчас [Создать из фото]» → редирект на S4 с pre-selected `photo_type=profile_screenshot`
4. Email submit → запись в `feedback` с `type=source_request`, `source_name=<detected>`, `source_url_raw=<original>` для аналитики
5. Когда `source_name` набирает ≥10 голосов в feedback → founder приорит ADR + спринт реализации, всем waitlist'нувшимся уходит email-уведомление

### S4. Фото — fallback flow + способ обслужить IG/VK-юзеров через скриншоты
1. Под Hero — текстовая ссылка `📷 Нет ссылки? Загрузить фото — работы, скриншот профиля, визитка →`
2. Клик → drawer выезжает снизу (mobile-first) или модалка (desktop)
3. Drag & drop 5-30 файлов (JPEG/PNG/WebP/HEIC, max 10MB/file, max 100MB total)
4. **Для каждого файла** — авто-категория от vision-LLM ИЛИ юзер вручную выбирает из dropdown: `work` (работа/портфолио), `profile_screenshot` (шапка профиля соцсети), `business_card` (визитка), `booklet` (буклет/меню/прайс)
5. Форма: название бизнеса, категория (dropdown из 12 ICP — маникюр, барбер, тату-мастер, фитнес-тренер, психолог, фотограф, кондитер, кулинар, репетитор, мастер ресниц, бровист, прочее), город, контакты (телефон/TG/WhatsApp), email + чекбокс согласия на ПДн
6. LLM-pipeline обрабатывает каждый `photo_type` по-разному:
   - `work` → галерея работ + alt-теги
   - `profile_screenshot` → vision-LLM извлекает bio, имя, кол-во подписчиков/постов как social proof + услуги если перечислены
   - `business_card` → vision-LLM извлекает контакты, имя бренда
   - `booklet` → vision-LLM извлекает услуги, цены
   - Все типы → vision-LLM подтверждает соответствие категории, отбрасывает шум
7. Confirmation screen — далее как S1

**Этот флоу обслуживает IG- и VK-юзеров** без обращения к серверам Meta/VK: юзер фотографирует **свой собственный экран** = собственная фотография = легально полностью.

### S5. Получение заявки на готовом клиентском сайте
1. Конечный посетитель приходит на `studia-anna.vitrina.site`, скроллит галерею, жмёт «Записаться»
2. Открывается inline-форма (не отдельная страница): имя, телефон, сообщение опционально
3. Yandex SmartCaptcha invisible + honeypot + rate limit отсеивают ботов
4. Поля `name / phone / message` шифруются Fernet перед записью в `leads`
5. Аня (владелица сайта) получает TG-уведомление от бота Самосайта с маскированными данными (`Анна П***, +7***1234`) и ссылкой в личный кабинет для расшифровки
6. Аня тапает ссылку → попадает в свой кабинет → видит полные данные за magic-link auth

---

## 5. Functional requirements (EARS)

### Landing & Application Intake

- **FR-001** *(Ubiquitous)* The system shall expose a public landing page at `vitrina.site` rendered server-side for SEO.
- **FR-002** *(Event-driven)* When a visitor submits the application form, the system shall persist the application, send a notification to the founder, and respond within 1s with a confirmation page.
- **FR-002a** *(Event-driven)* When a contact value is entered in the application form, the system shall server-side detect contact type (email / phone / telegram / max) via the same regex used client-side, normalize the value, and persist both `contact_type` and `contact_value` on `users`.
- **FR-002b** *(Event-driven)* When the system needs to notify a user (site ready, lead arrived, system message), the system shall route via the user's `contact_type` with fallback chain: telegram → max → email → SMS. If primary channel delivery fails (e.g. TG user hasn't started conversation with our bot), the system shall try next channel if alternate contact exists.
- **FR-002c** *(Ubiquitous)* SMS notifications shall be sent ONLY after successful site publication (post manual review), not on initial application submission, to prevent SMS-cost abuse from spam.
- **FR-003** *(Unwanted)* If the application form is submitted without the PII consent checkbox checked, then the system shall reject the request with HTTP 400 and a human-readable error.
- **FR-004** *(State-driven)* While the rate limit for an IP exceeds 3 applications per hour, the system shall return HTTP 429 with a `Retry-After` header.
- **FR-005** *(Event-driven)* When a URL is pasted into the Hero input, the system shall auto-detect source type via client-side regex within 100ms and display a confirmation badge (`✓ Яндекс.Карты`, `✓ Telegram`, `✓ ВКонтакте`) or an error with fallback options (photo upload, TG export).
- **FR-005a** *(Event-driven)* After auto-detect succeeds, the system shall fetch a lightweight preview from the source within 3 seconds and display content counts in the badge (e.g. `✓ Telegram — нашли 47 постов и 12 фото`). If the preview request times out >3s OR fails, the system shall display the static badge without counts and proceed normally. Preview is **light** (single API call per source, no full parse).
- **FR-006** *(Unwanted)* If a pasted URL matches Instagram patterns (`instagram\.com/`, `instagr\.am/`), then the system shall display a redirect message proposing the photo-upload flow and shall NOT attempt to fetch the URL.

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
- **ASSUMPTION-A5**: Wildcard SSL для `*.vitrina.site` решается через Let's Encrypt DNS-01 challenge с Cloudflare/Selectel DNS API [verify: Selectel DNS поддерживает API для acme.sh]
- **ASSUMPTION-A6**: 990 ₽/мес — приемлемая цена для ICP. Гипотеза, проверяется на 5+ юзерах после триала
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
