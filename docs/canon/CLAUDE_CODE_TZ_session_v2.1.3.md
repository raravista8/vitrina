# ТЗ для Claude Code · v2.1.3 — финал сессии

> **Контекст:** канон в `*.jsx` файлах корня проекта.
> Прод-код — `/code` (Next.js 16 App Router · React 19 · TS · Tailwind · shadcn/ui · lucide-react · recharts) и `/code/customer-site.html.j2` (FastAPI + Jinja2).
> Эта задача — поднять прод-код до состояния канона после финальной сессии правок.
>
> **Связанные документы:**
> - `CLAUDE_CODE_TZ.md` — базовая v2 итерация (бренд, intake, customer v2)
> - `CLAUDE_CODE_TZ_customer_v2.1.md` — customer-сайт как booking-page
> - `CLAUDE_CODE_TZ_landing_v2.1.md` — финал лендинга и клиентский ЛК
> - `CLAUDE_CODE_TZ_typography.md` — русские типографские правила
> - `CLAUDE_CODE_TZ_session_v2.1.3.md` — **этот** файл, ченджлог последней сессии

---

## 1. ЧЕНДЖЛОГ — что изменилось в этой сессии

### 1.1 Копирайт и кнопки

- **CTA повсюду:** «Собрать мой Самосайт» → «Сделать Самосайт». «Собрать сайт» → «Сделать сайт». «Собрать →» (mobile-короткий) → «Сделать →».
- **Тайминг сборки:** «за пару минут / две минуты» → **«за 2 часа»** во всех текстах (Hero, BigFeatures #01, Dojim).
- **Hero подзаголовок** укорочен и с акцентами в `<b>`:
  > Покажите ссылку — карты, Telegram или визитку. **Самосайт на базе ИИ соберёт сайт за 2 часа** и дальше **делает всё сам**: обновляет цены, ловит заявки, ведёт аналитику и публикует лучшие отзывы
- **«Карта не нужна» удалена везде** — Hero badge, Pricing микрокопия, Dojim last-mile.
- **«и кураторской подборкой лучших отзывов»** → «и лучшими отзывами» (Examples sub).
- **«Фото визитки или буклета»** → «Фото буклета или меню» — landing + customer + intake.
- **«Avito-профиль»** → «Avito».
- **«Свой сайт»** → «Ваш старый сайт» (Platforms) и «ваш сайт» (intake sub).
- **Confirmation sub:** «Свяжемся с вами и пришлём ссылку в течение 2 часов» (вместо длинной фразы про ручную модерацию).
- **Footer/dojim para:** «Через неделю — первые заявки в Telegram» (короткая версия).
- **Floating «Что не хватает?»** → «Чего не хватает?».
- **Pricing H2** «Один тариф — без сюрпризов», sub переписан.

### 1.2 Структурные удаления

- **`RfContextSection`** (про блокировки Telegram/Instagram) — удалена.
- **`SocialProofSection`** (47 / 1 284 / 4.9★ + 4 testimonials) — удалена.
- **`StorySectionV2_Standalone`** артборд — удалён (компонент не существовал, ломал canvas).
- **Intake шаг 3 (TG bot /start)** — удалён, флоу теперь **2 шага**: Ссылка → Куда писать.
- **Приватный TG-канал поток (S4_TGBotInvite)** — артборд `s4` убран с canvas, экспорт удалён из `window`.
- **TG confirmation с QR** (`s5-tg` артборд + `{isTg && ...}` блок в S5_Confirmation) — удалён.
- **«★ ЛУЧШИЕ — ВЫБРАЛ ИИ» в превью** — удалено.
- **Pill-eyebrow `✦ 8 «САМ» В ОДНОМ ПРОДУКТЕ`** в BigFeatures — удалён.
- **Last-mile assurances** «Удалить за секунду · Данные хранятся в РФ» в Dojim — удалены.
- **«← ЛИСТАЙТЕ ВПРАВО →»** на mobile в Examples — удалено.
- **Watermark «СДЕЛАНО НА САМОСАЙТЕ»** в превью SiteCard на лендинге — удалён (остаётся в реальном customer-сайте).
- **Микрокопия «интерактивная демка · откроется в новой вкладке»** под кнопкой демо ЛК — удалена.
- **«Полный список →»** ссылка в intake — удалена, теперь список платформ выводится inline в подсказке.

### 1.3 Структурные добавления

- **Compact platform list** под Hero input: pill `ИЗ ЧЕГО МЫ МОЖЕМ СДЕЛАТЬ ВАМ САЙТ` + 7 inline-chips со всеми активными платформами (брендовые цвета + название).
- **AnalyticsSection** между BigFeatures и Ownership:
  - 4 stat-card с sparkline-ами (Посещений / Заявок / Конверсия / Оценка)
  - Большой SVG-chart «Трафик за 30 дней» с area + bars
  - Source breakdown (Я.Карты 45% / Telegram 28% / Прямые 15% / 2ГИС 8% / Google 4%)
  - Delivery note: «Кратко и регулярно — {BRAND.name} пришлёт сводку аналитики куда скажете: в Telegram, MAX или на почту»
- **Логотипы в превью клиентских сайтов** (`SiteCard`): 24×24 буква на брендовом цвете в sticky header.
- **Free-month plашка под Hero input:** terracotta-pill с gift-icon 36×36 + «Первый месяц — бесплатно» + «далее **990 ₽/мес**».
- **Pricing card**: free-month chip с галочкой на верху + «потом 990 ₽ / месяц» (заменили старую плашку).
- **Instagram source flow** в intake: SourceBadge для `'ok-instagram'` показывает «Распознали: Instagram — нужен скриншот профиля и фото работ» + Btn «Загрузить →».
- **Hover-эффекты** на главной — мягкие 1px lift + лёгкая тень:
  - `.ss-card-lift` — SiteCard / FeatureCard / PlatformCard
  - `.ss-story-card` — StoryStepColorful
  - `.ss-pricing-card` — PricingSection card
  - Transition 0.18–0.2s ease-out.

### 1.4 Изменения данных и компонентов

- **Phone numbers в превью клиентских сайтов** — теперь все `+7 (111) 111-11-11` (фиктивные).
- **SiteCard sticky header** показывает полный номер с `+7`, **dual-CTA** заменён на icon-only phone button (svg icon, без обрезающегося текста).
- **PLATFORMS_OK** (7 активных): yandex / telegram / **instagram** (NEW) / 2gis / avito / site (rename: «Ваш старый сайт») / card («Фото буклета или меню»).
- **PLATFORMS_SOON** (3): vk / ozon / youtube. WhatsApp удалён.
- **Брендовые логотипы платформ** в SVG:
  - **Yandex Maps**: красный пин-капля (#FC3F1D) с белым кружком внутри (стандартный map-pin glyph).
  - **2GIS**: зелёный rounded-square (#19BB4F) с белой «2».
  - **Avito**: голубой rounded-square (#0AF) с оранжевым кругом (#FF9C00) и белой «A».
- **WAITLIST_SOURCES** в S9 feedback: VK / Ozon / YouTube / Дзен / MAX (убраны instagram, 2gis, avito, whatsapp, own_site как активные/устаревшие).
- **S15_SiteDetail iframe preview**: вместо абстрактных gradient-плиток — компактный preview с лого + hero + услугами + thumbnails.

### 1.5 Структура лендинга (финал)

```
0. Sticky header                ─ «Сделать сайт →» + «Войти»
1. Hero                          ─ H1 три «сам», input+CTA, compact platforms list, free-month badge
2. Examples                      ─ 3 превью SiteCard с лого, caption «Собран из X» сверху, единый CTA снизу
3. Story                         ─ 6 шагов зигзаг
4. PlatformsSection              ─ bento, Я.Карты featured
5. BigFeaturesSection            ─ 8 «сам» с декоративными цифрами 01–08
6. OwnershipSection              ─ ControlPanelMock + CTA «Посмотреть демо ЛК»
7. AnalyticsSection (NEW)        ─ 4 stat-cards + chart + sources + delivery note
8. PricingSection                ─ 990 ₽/мес с free-month chip
9. FaqSection                    ─ 10 Q&A
10. FreeMonthSection (Dojim)     ─ финальный CTA «Дайте Самосайту собрать себя»
Footer
```

### 1.6 Структура intake (финал)

**2 шага** (раньше было 3):

1. **Шаг 1 — Дайте ссылку.** «Что у вас уже есть онлайн — Яндекс.Карты, Telegram-канал, 2ГИС или ваш сайт» (без точки). Под input — inline-список 7 активных платформ. SourceBadge: для Instagram особый блок «нужен скриншот профиля + фото работ» с кнопкой «Загрузить →».
2. **Шаг 2 — Куда вам писать?** Radio на 4 канала (Telegram / Phone / Email / MAX) + поле под выбранный + ОПД-чекбокс.

Confirmation → S5_Confirmation: «Готовим ваш сайт. Свяжемся с вами и пришлём ссылку в течение 2 часов». Без QR/start-bot блока.

### 1.7 Структура customer-site (без изменений)

См. `CLAUDE_CODE_TZ_customer_v2.1.md`. Изменился только текст «фото буклета или меню» в copy.

---

## 2. БЭКЕНД — что доделать

### 2.1 Pricing

- **Обновить тариф в Stripe/ЮKassa** с 29900 → **99000 копеек** (990 ₽).
- В админке клиента (`/admin → Настройки → Подписка`) показывать 990 ₽/мес и дату следующего списания.

### 2.2 Аналитика для клиентского ЛК

**Новый эндпойнт:** `GET /api/admin/analytics?range=30d`
```ts
→ {
  stats: {
    visits:       { total: 2847, delta_pct: 18, sparkline: number[] },
    leads:        { total: 78,   delta_pct: 34, sparkline: number[] },
    conversion:   { value: '2.7%', delta_pp: 0.4, sparkline: number[] },
    rating:       { value: 4.9,  delta: 0.1, sparkline: number[] }
  },
  traffic: { days: 30, visits: number[], leads: number[] },
  sources: [{ name, share, color }]
}
```

**Cron-задача** `weekly_analytics_digest`:
- Раз в неделю в 09:00 по Москве собирать сводку по каждому опубликованному сайту
- Отправлять в канал, выбранный мастером (TG / MAX / email)
- Формат: «За неделю — 421 посещение (+18%), 14 заявок, лучший день — четверг»
- См. также секцию AnalyticsSection на лендинге для UX-референса

**Новые таблицы:**
```sql
CREATE TABLE site_analytics (
  site_id     uuid,
  date        date,
  visits      int,
  unique_visitors int,
  leads       int,
  source_breakdown jsonb,
  PRIMARY KEY (site_id, date)
);

CREATE TABLE site_analytics_digest_log (
  site_id     uuid,
  sent_at     timestamptz,
  channel     text,  -- 'telegram' | 'max' | 'email'
  PRIMARY KEY (site_id, sent_at)
);
```

### 2.3 Instagram intake

- Distance detector: если URL содержит `instagram.com/`, возвращать `source: 'instagram', tier: 'ok-instagram', counts: null`.
- На фронте показывается UI с кнопкой «Загрузить → скриншот профиля + фото работ» (открывает S6_PhotoDrawer).
- На бэке: применять существующий photo-flow поверх Instagram-формы — обязательно screenshot шапки профиля + 5+ work photos.
- Не парсить Instagram автоматически (правовые риски).

### 2.4 Удаление phone-номеров

- Все фиктивные `+7 (111) 111-11-11` в JSX-каноне — это **демонстрационные** данные.
- В прод-коде клиентского ЛК (`/admin/leads`) — реальные номера из БД с маской `+7 ▦▦▦ ▦▦▦-▦▦-▦▦` до клика «Расшифровать» (Fernet AES, см. ADR-securitytodo).

### 2.5 Удаление intake step 3 (TG bot /start)

- Эндпойнт `GET /api/tg-bot-personal-status` **удалить**.
- Эндпойнт `POST /api/submit-application/finalize-via-email` **удалить**.
- В `POST /api/submit-application` валидация: если `channel === 'telegram'` — просто принять `@handle`, не требовать `/start`.
- Уведомления о заявках в Telegram теперь отправляются через **обычный TG-бот** (мастер должен один раз нажать /start вручную в инструкции после регистрации — отдельный onboarding email/SMS).

### 2.6 Удаление private TG channel flow

- Эндпойнт `GET /api/tg-bot-status?app_id=` (status приватного канала) **удалить**.
- Сценарий «добавить @SamositeIntakeBot в приватный канал» **отменён** — пользователи с приватным каналом теперь должны использовать photo-upload fallback («Загрузите фото визитки/буклета/работ →»).
- Соответствующие сообщения email-шаблонов / TG-уведомлений — удалить.

### 2.7 Удаление feedback /api/feedback Mono

- Внешний контракт `POST /api/feedback` остаётся без изменений
- Только убрана техническая Mono-плашка «POST /api/feedback» из UI — для пользователя это просто кнопка «Отправить»

### 2.8 Login

- Линк «Войти» в sticky header лендинга ведёт на `/login` (клиентская админка владельца сайта). **Не** на founder admin (`/founder/`).
- Должен быть отдельный flow логина для клиентов (magic-link / password).

---

## 3. ТЕСТЫ — что проверить

### 3.1 Pixel-perfect (обязательно)

Per-секция на 3 viewport'ах (1440 / 768 / 390):

**Hero:**
- [ ] H1 «три сам» не обрезается на 360px (`white-space: normal` на mobile)
- [ ] Подзаголовок с **болдом** на «Самосайт на базе ИИ соберёт сайт за 2 часа» и «делает всё сам»
- [ ] Free-month plашка одним блоком, gift-icon 36×36 terracotta-fill
- [ ] Compact platform list — 7 chips с брендовыми лого

**Examples:**
- [ ] Caption «Собран из X» НАД карточкой
- [ ] **Логотипы в sticky header** превью — 24×24 буква на брендовом цвете
- [ ] Все 3 карточки одинаковой высоты (gridAutoRows: 1fr + flex stretch)
- [ ] Финальный CTA на дне каждой карточки (margin-top: auto)
- [ ] Phone `+7 (111) 111-11-11` в sticky header — полностью виден, не обрезается
- [ ] Phone-button с правой стороны от «Записаться» — icon-only (svg)
- [ ] **НЕТ** «★ ЛУЧШИЕ — ВЫБРАЛ ИИ»
- [ ] **НЕТ** watermark «СДЕЛАНО НА САМОСАЙТЕ» под final-CTA
- [ ] Единый CTA «Сделать себе такой Самосайт →» под всеми 3 (без микрокопии)
- [ ] На mobile **нет** надписи «← ЛИСТАЙТЕ ВПРАВО →»

**Story:**
- [ ] H2: «От вас — одно действие, всё остальное Самосайт сделает сам» (без точки)
- [ ] 6 шагов zig-zag, hover lift на каждом

**Platforms:**
- [ ] **Я.Карты**: красный пин-капля (#FC3F1D) с белым кругом — НЕ буква «Я»
- [ ] **2ГИС**: зелёный rounded-square (#19BB4F) с белой «2»
- [ ] **Avito**: голубой rounded-square (#0AF) с оранжевым кругом и «A»
- [ ] **Instagram** в активных, pull = «скриншот профиля»
- [ ] **Ozon** в waitlist, WhatsApp **отсутствует**
- [ ] **«Ваш старый сайт»** (не «Свой сайт»)
- [ ] «Фото буклета или меню» (не «визитки»)

**BigFeatures:**
- [ ] **НЕТ** pill-eyebrow `✦ 8 «САМ» В ОДНОМ ПРОДУКТЕ`
- [ ] H2 «Восемь «сам» — поэтому он Самосайт» (без точек)
- [ ] 8 карточек с **видимыми** декоративными цифрами 01–08 (96px Mono 800, opacity **0.22** на `tint.fg`)
- [ ] Card #01: «Сам соберётся» / «Дайте ссылку — соберётся за **две минуты**» — wait, надо проверить переписали ли на «2 часа» или нет (нужно посмотреть оригинал)
- [ ] H3 28px weight **800**, subtitle 15.5px weight **700**

**Ownership:**
- [ ] H2: «Восемь «сам» — но кнопка всегда у вас» (без точки)
- [ ] CTA «Посмотреть демо ЛК ↗» → `/admin-demo`
- [ ] ControlPanelMock — phones `+7 999 111-11-11` / `+7 999 222-22-22` / `@example_user`

**AnalyticsSection (NEW):**
- [ ] 4 stat-card с sparkline-ами (terracotta для visits, blue для leads, orange для conversion, gold для rating)
- [ ] Большой SVG-chart с gridlines + area-plot для visits + столбиками для leads
- [ ] Source breakdown stacked-bar с правильными цветами (#FFCC00 Я.К, #229ED9 TG, accent Прямые, #19BB4F 2ГИС, oklch red Google)
- [ ] Delivery note в accentSoft pill: «Кратко и регулярно — Самосайт пришлёт сводку аналитики куда скажете»

**Pricing:**
- [ ] H2 «Один тариф — без сюрпризов»
- [ ] Free-month chip с галочкой над ценой
- [ ] Цена «потом **990 ₽** / месяц»
- [ ] Микрокопия под CTA «Первый месяц бесплатно» (без «карта не нужна»)

**FAQ:**
- [ ] `<details>` нативные, первый `open`

**Dojim:**
- [ ] Para: «Через неделю — первые заявки в Telegram» (короткая)
- [ ] **НЕТ** «Удалить за секунду · Данные хранятся в РФ»

**Sticky header:**
- [ ] Desktop: 4 anchor-links + «Войти» + «Сделать сайт →»
- [ ] Mobile: «Войти» + «Сделать →» (обе видны)
- [ ] «Войти» ведёт на `/login` (не founder)

**Hovers:**
- [ ] SiteCard / PlatformCard / FeatureCard / StoryStep / PricingCard — мягкий 1px lift с тенью
- [ ] Transition 0.18–0.2s
- [ ] Никаких изменений цвета границы

### 3.2 Функциональные тесты

**Intake flow (2 шага):**
- [ ] Шаг 1: input → distance → SourceBadge (yandex/telegram/ok-instagram/etc.)
- [ ] Instagram URL → особый блок «нужен скриншот профиля и фото работ»
- [ ] **Нет** шага 3 (бот /start) — после шага 2 сразу confirmation #5
- [ ] **Нет** S4 потока (приватный канал)
- [ ] Confirmation: «Свяжемся в течение 2 часов», **нет** QR

**Admin demo:**
- [ ] 6 табов (Analytics / Site / Leads / Reviews / Services / Settings)
- [ ] Sidebar 240px sticky
- [ ] Site tab: live-preview обновляется на keypress
- [ ] Leads tab: «Записать» / «Отказ» меняют статус
- [ ] Reviews tab: toggle меняет opacity + dashed border
- [ ] Settings tab: Подписка 990 ₽/мес, 3 toggles уведомлений

**Feedback form (S9):**
- [ ] Порядок секций: Name+Contact → Source+Feature → Message
- [ ] Email/phone/@telegram **без красной звёздочки**
- [ ] **Нет** Mono-плашки «POST /api/feedback»
- [ ] WAITLIST_SOURCES: только VK / Ozon / YouTube / Дзен / MAX
- [ ] Кнопка «Отправить» — small

**Floating button:**
- [ ] «Чего не хватает?» (не «Что не хватает?»)
- [ ] Ведёт на /feedback

### 3.3 Типографика

См. `CLAUDE_CODE_TZ_typography.md`:
- [ ] Нет точек в конце H1/H2/sub/body параграфов из 1 предложения
- [ ] Nbsp после «в, с, к, у, о, и, а, на, за, от, до, по, из, для, что, как, или, но, же, ли, то, не, без»
- [ ] Тире `—` для пауз, дефис `-` для составных
- [ ] Кавычки «…» основные, прямые ASCII запрещены
- [ ] Цена `990 ₽` через nbsp в sans-serif, regular space в Mono

### 3.4 Performance/SEO

- [ ] Lighthouse mobile: Performance ≥90, SEO ≥95, Accessibility ≥95
- [ ] CLS = 0 (все `<img>` имеют width/height)
- [ ] LCP <2s (hero photo preload)
- [ ] Нет console errors
- [ ] `/admin-demo` — может быть тяжелее (recharts), допустимо

### 3.5 Cross-browser

- [ ] Chrome / Safari / Firefox: hover effects работают
- [ ] iOS Safari: `tel:` ссылки открывают звонилку
- [ ] Android Chrome: то же
- [ ] FAQ `<details>` открывается без JS

### 3.6 Visual regression (рекомендуется)

```bash
# Playwright per-viewport screenshot diffs
npm install -D playwright pixelmatch pngjs

# Screenshots vs canonical (из design canvas) на 5 viewport'ах
# Threshold 0.02 (2%)
```

---

## 4. Файлы для обновления

| Канон (JSX) | Прод (TSX/J2) |
|---|---|
| `landing-samosite.jsx` | `code/app/(marketing)/page.tsx` или split |
| `screens-customer.jsx` | `code/customer-site.html.j2` |
| `screens-intake.jsx` | `code/components/intake/SubmitModal.tsx` |
| `screens-client-admin-demo.jsx` | `code/app/admin/page.tsx` + `code/app/admin-demo/page.tsx` |
| `screens-admin-ops.jsx` | `code/app/founder/sites/[id]/page.tsx` (S15) |

**Удалить из прода:**
- `code/api/tg-bot-status.ts` (приватный канал)
- `code/api/tg-bot-personal-status.ts` (бот /start)
- `code/api/submit-application/finalize-via-email.ts`
- `code/components/intake/Step3TgBot.tsx`
- `code/components/intake/TGBotInvite.tsx`

**Добавить в прод:**
- `code/api/admin/analytics.ts` — основной endpoint
- `code/jobs/weekly_analytics_digest.ts` — cron
- `code/components/landing/AnalyticsSection.tsx` — секция аналитики на лендинге
- `code/db/migrations/<n>_site_analytics.sql`

---

## 5. Acceptance criteria

- [ ] Тариф 990 ₽/мес везде (включая Stripe/ЮKassa)
- [ ] CTA «Сделать Самосайт» / «Сделать сайт» / «Сделать» везде (нет «Собрать»)
- [ ] Hero подзаголовок с **`<b>`** на «Самосайт на базе ИИ…» и «делает всё сам»
- [ ] «за 2 часа» вместо «за пару минут / две минуты»
- [ ] **НЕТ** в коде: RfContextSection, SocialProofSection, S4_TGBotInvite, S3_Step3_TgBot, isTg-блок в S5
- [ ] Intake 2 шага, не 3
- [ ] Instagram active в Platforms и в SourceBadge (с photo-upload flow)
- [ ] AnalyticsSection между BigFeatures/Ownership
- [ ] OwnershipSection **над** AnalyticsSection
- [ ] Брендовые логотипы Я.Карты / 2ГИС / Avito — пин/2/A (не голые буквы)
- [ ] Pricing card: free-month chip + «потом 990 ₽»
- [ ] Hover-effects на cards: 1px lift, 0.18–0.2s transition
- [ ] Feedback form: Name+Contact → Source+Feature → Message
- [ ] «Чего не хватает?» (не «Что не хватает?»)
- [ ] WAITLIST_SOURCES: только VK / Ozon / YouTube / Дзен / MAX
- [ ] Compact platform list под Hero input
- [ ] **Все pixel-perfect чек-боксы** из §3.1 пройдены
- [ ] **Все функциональные тесты** из §3.2 пройдены
- [ ] **Типографика** из §3.3 соблюдена
- [ ] Lighthouse ≥90 Performance / ≥95 SEO/Accessibility/BestPractices
- [ ] CLS = 0, нет console errors
- [ ] Backend tasks из §2 выполнены

---

## 6. Self-critique log (v2.1.3)

- **Патч 28.** SocialProofSection удалена полностью — для пилота на 47 мастеров с reviews-генерацией ИИ создавало путаницу «продаём ли мы Самосайт или отзывы».
- **Патч 29.** Брендовые лого Я.Карт / 2ГИС / Avito — буквы «Я»/«2»/«A» в моно были спутаны с дженериками. Заменили на узнаваемые SVG.
- **Патч 30.** Intake шаг 3 (бот /start) убран — слишком сложный шаг конверсии для MVP. Сейчас уведомления настраиваются onboarding-имейлом после регистрации.
- **Патч 31.** Приватный TG-канал поток отменён — fallback на photo-upload проще и без правовых рисков.
- **Патч 32.** AnalyticsSection добавлен на лендинге — показываем ровно тот UI, который мастер увидит в ЛК. Сильный аргумент для конверсии «вижу что получу».
- **Патч 33.** «Карта не нужна» убрано — повторялась 4 раза на разных секциях, выглядело тревожно. Один раз в Hero badge достаточно.
- **Патч 34.** Compact platform list под Hero — закрыл UX-проблему «дайте ссылку, но мы ещё не сказали из чего».
- **Патч 35.** Все логотипы клиентских сайтов в превью + sticky header — впечатление реальности готового сайта, не дженерика.
- **Патч 36.** Hover-эффекты на cards — 1px lift даёт ощущение «живой» страницы, но без обещания клика.
