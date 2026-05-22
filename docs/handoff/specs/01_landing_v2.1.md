# ТЗ для Claude Code · Лендинг + клиентский ЛК · v2.1 финал

> **Контекст:** канон в JSX-файлах корня проекта. Прод-код — `/code` (Next.js 16 App Router · React 19 · TS · Tailwind · shadcn/ui · lucide-react · recharts) и `/code/customer-site.html.j2` (FastAPI + Jinja2).
> Эта задача — поднять прод-код до финального состояния канона после всех итераций дизайн-ревью.
>
> **Связанные документы:**
> - `CLAUDE_CODE_TZ.md` — базовая v2 итерация (бренд, intake, customer v2)
> - `CLAUDE_CODE_TZ_customer_v2.1.md` — customer-сайт как booking-page
> - `CLAUDE_CODE_TZ_landing_v2.1.md` (этот файл) — главный лендинг + клиентский ЛК + правила тестирования
> - `CLAUDE_CODE_TZ_typography.md` — типографские правила (русский nbsp, отсутствие точек, etc.)

---

## TL;DR — что в финале

**Hot-fixes последней сессии (v2.1.2):**

- **Тайминг сборки сайта изменён:** «за пару минут / за две минуты» → **«за 2 часа»** везде в копи (Hero подзаголовок, BigFeatures #01 «Сам соберётся», Dojim, Story и т.д.).
- **Hero подзаголовок укорочен с акцентами:** «Покажите ссылку — карты, Telegram или визитку. **Самосайт на базе ИИ соберёт сайт за 2 часа** и дальше **делает всё сам**: обновляет цены, ловит заявки, ведёт аналитику и публикует лучшие отзывы». Болд на двух ключевых фразах через `<b>` с `color: ink`.
- **«Карта не нужна» удалена везде** (Hero badge, Pricing микрокопия, Dojim last-mile).
- **Pricing card переработан:** сверху чек-pill с галочкой «Первый месяц — бесплатно», под ним строка «потом **990 ₽** / месяц».
- **Микрокопия «интерактивная демка · откроется в новой вкладке»** под кнопкой демо ЛК — удалена.
- **Orphan «и» в H1 Hero исправлен:** «сам обновит» + «и сам приведёт клиентов» теперь один nowrap inline-block (вместо отдельных span'ов с висящим «и»).
- **StorySectionV2_Standalone** — артборд удалён из `index.html` (компонент не существует, ломал render всей design canvas).

**Структурные изменения vs предыдущей итерации:**

1. **Тариф 990 ₽/мес.** Везде, где упоминается цена.
2. **SocialProofSection удалена** — секция «47 мастеров уже пользуются / 1 284 заявок собрано / 4.9★ + 4 testimonials» **больше не на странице**. Решение: социальное доказательство для пилотного продукта (47 мастеров) — спорный сигнал, отвлекает от продуктового обещания.
3. **RfContextSection удалена** (была про блокировки Telegram/Instagram).
4. **Section-eyebrows везде удалены**, кроме BigFeatures (✦ pill).
5. **Sticky header с primary CTA** + кнопка «Войти» → клиентская админка `/login`.
6. **Examples — переработан:** caption «Собран из X» **над** карточкой, **один общий CTA** под всеми тремя. Карточки выровнены в высоту через `gridAutoRows: 1fr` + `height: 100%`.
7. **Логотипы в превью** — 24×24 буква на брендовом цвете студии в sticky header SiteCard.
8. **Watermark «СДЕЛАНО НА САМОСАЙТЕ» убран** из превью лендинга (остаётся в реальном customer-сайте).
9. **Free-month plашка** — чистая 2-row плашка с гифт-иконкой, без вертикальных разделителей.
10. **Platforms:** Instagram в активных, pull = **только** «скриншот профиля»; Ozon в waitlist; WhatsApp убран; «Свой сайт» → «Ваш старый сайт».
11. **BigFeatures выразительнее:** pill-eyebrow `✦ 8 «САМ» В ОДНОМ ПРОДУКТЕ`, декоративная цифра 01–08 (96px Mono 800, цвет `tint.fg` opacity **0.22**), H3 28px weight 800.
12. **OwnershipSection** — dark-CTA «Посмотреть демо личного кабинета ↗» ведёт на `/admin-demo`.
13. **Новая страница `/admin-demo`** — полноценная интерактивная демка ЛК (6 табов).
14. **Фиктивные номера:** в ControlPanelMock и demo-ЛК только `+7 999 111-11-11` / `+7 999 222-22-22` / `@example_user`.
15. **Pricing — переписан:** H2 «Один тариф — без сюрпризов», sub: «Не надо выбирать пакеты, считать апселы и читать «звёздочки». 990 ₽ в месяц — и весь Самосайт в вашем распоряжении». Внутри карточки старая sub-line «Без матриц, апселов…» удалена (дублировала).
16. **Русские типографские правила** (см. §27) — nbsp после коротких предлогов/союзов; **без точек в конце** в H2/sub/body параграфов.

**Удалено в этой ревизии:**
- `RfContextSection` (про блокировки) — отвлекала.
- `SocialProofSection` (47/1284/4.9★ + testimonials) — отвлекала, цифры пилотные.
- Микрокопия под Examples CTA — дублировала Hero badge.
- Микрокопия под Hero free-month badge — лишний шум.

---

## 1. Структура главного лендинга (финал, 9 секций)

```
0. Sticky header                ─ sticky top, primary CTA «Собрать сайт →» + «Войти»
1. Hero                          ─ H1 три «сам», input+CTA, FREE-MONTH BADGE
2. Examples                      ─ 3 превью с captions сверху + лого, единый CTA снизу
3. Story                         ─ 6 шагов зигзаг
4. PlatformsSection              ─ bento, Instagram активна, Ozon в waitlist
5. BigFeaturesSection            ─ 8 «сам» + декоративные цифры 01–08
6. OwnershipSection              ─ ControlPanelMock + кнопка «Посмотреть демо ЛК»
7. PricingSection                ─ Один тариф 990 ₽/мес
8. FaqSection                    ─ 10 Q&A
9. FreeMonthSection (Dojim)      ─ финальный CTA
Footer
```

**Удалённые секции:** `RfContextSection`, `SocialProofSection`.

---

## 2. Sticky header

| Слот | Desktop | Mobile |
|---|---|---|
| Слева | `<Logo size=26>` + «Самосайт» | то же, поменьше |
| Центр | 4 anchor-ссылки: «Как это работает», «Примеры», «Цены», «Помощь» (`#how`, `#examples`, `#pricing`, `#faq`) | скрыты |
| Справа | «Войти» (ghost) + «Собрать сайт →» (primary terracotta) | «Войти» + «Собрать →» |

**Поведение:** `position: sticky; top: 0; z-index: 10; background: oklch(0.972 0.012 80 / 0.92); backdrop-filter: blur(12px);`.

**Линк «Войти»:** `href="https://samosite.online/login"` — **клиентская** админка.

---

## 3. Hero — три «сам»

**H1 формула:**
```
Сайт, который
сам себя соберёт,    ← terracotta + underline highlight
сам обновит и         ← terracotta
сам приведёт клиентов ← terracotta
```

- Desktop: 88px, line-height 1.02, `white-space: nowrap` на каждой «сам …».
- Mobile (≤640px): 38px, line-height 1.08, `white-space: normal`.
- **Без точки в конце.**

**Подзаголовок:**
> Покажите ссылку на ваше дело — карты, Telegram или визитку. Самосайт на базе ИИ соберётся за несколько минут и дальше будет всё делать сам: обновлять цены, ловить заявки, вести аналитику, отбирать и публиковать отзывы из ваших источников

(Точка в конце отсутствует — общее правило, см. §27.)

**Input + CTA pill:** «ссылка на ваш профиль или сайт» + `Собрать мой Самосайт →`.

---

## 4. Free-month badge

Чистая горизонтальная плашка под Input — иконка + двухстрочный текст.

```
┌────────────────────────────────────────┐
│ [🎁]  Первый месяц — бесплатно         │
│       далее 990 ₽/мес · карта не нужна │
└────────────────────────────────────────┘
```

**Стили:**
- Контейнер: `background: white; border: 1.5px solid var(--accent); border-radius: 999; padding: 12px 22px 12px 14px;` (desktop), `padding: 10px 16px 10px 12px;` (mobile)
- `display: inline-flex; align-items: center; gap: 12; flex-wrap: nowrap;`
- Гифт-иконка: `terracotta-circle 36×36` (32×32 mobile) с gift-SVG
- Строка 1: «Первый месяц — бесплатно» — 16px (15px mobile), weight 700, ink, letter-spacing -0.01em, line-height 1.1
- Строка 2: «далее **990 ₽/мес** · карта не нужна» — 13.5px (12.5px mobile), ink-soft

**Не дублируем информацию ни под badge, ни под CTA.**

---

## 5. Examples — финальная редакция

### 5.1 Header секции

```
H2: Вот какой сайт вы получите через несколько минут
Sub: Реальные сайты, которые Самосайт собрал из разных источников — с вашими фото, услугами и кураторской подборкой лучших отзывов
```

(Точка в конце sub удалена.)

### 5.2 Превью-карточка (SiteCard)

**Per-example data:**

| Example | rating | reviewCount | clientsCount | logo letter | logo bg |
|---|---|---|---|---|---|
| Студия Анны | 4.9 | 38 | 1 200+ | А | `oklch(0.55 0.13 30)` |
| Барбер Brest | 5.0 | 47 | 850+ | B | `oklch(0.32 0.04 250)` |
| Школа йоги Лотос | 4.8 | 14 | 320+ | Л | `oklch(0.45 0.11 145)` |

### 5.3 Логотип в sticky header превью

24×24 square с borderRadius 7, буква 800 fontSize 13 на брендовом цвете студии. Первый элемент в sticky header SiteCard (слева от имени).

### 5.4 Caption — **сверху** карточки

```
[●  Собран из Telegram-канала]    ← бренд-точка 8×8 + 16px bold ink
[preview SiteCard]
```

- Точка `width:8; height:8; border-radius:50%; background: var(--accent);`
- Текст 16px (14.5 mobile), weight 600, ink, letter-spacing -0.015em.

### 5.5 Выравнивание карточек в высоту

```css
.ss-examples-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;          /* ВАЖНО — стретч в высоту */
  gap: 24px;
  align-items: stretch;
}

.ss-examples-grid > * {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ss-examples-grid .ss-sitecard {
  flex: 1;                      /* SiteCard заполняет высоту */
  height: 100%;
  display: flex;
  flex-direction: column;
}
```

Иначе первая карточка станет выше (длинный H1 / больше текста в отзывах) — это уже проявилось в дизайн-ревью.

### 5.6 Единый CTA под всеми тремя карточками

```html
<div style="margin-top: 44px; text-align: center;">
  <a href="#hero" class="ss-cta-primary-lg">Сделать себе такой Самосайт →</a>
</div>
```

**Стили:**
- Padding 16px 32px (desktop) / 14px 24px (mobile)
- Background `var(--accent)`, white, weight 700, font-size 17/16
- Box-shadow `0 12px 28px -12px rgba(120,60,30,0.45)`

**Никакой микрокопии под CTA.**

### 5.7 Watermark «СДЕЛАНО НА САМОСАЙТЕ» — удалён из превью

Под final-CTA «Записаться онлайн →» в SiteCard на лендинге — удалена. **Остаётся** в реальном customer-сайте.

---

## 6. Story

**H2 (без точки в конце):**
> От вас — одно действие, всё остальное Самосайт сделает сам

Eyebrow `КАК ЭТО РАБОТАЕТ` — удалён. Структура 6 шагов-зигзаг не изменилась.

---

## 7. PlatformsSection

### 7.1 Active platforms (7 штук)

| id | name | bg | logo | pull |
|---|---|---|---|---|
| yandex | Яндекс.Карты (**featured**) | `#FFCC00` | `Я` (чёрный) | отзывы · услуги · цены · фото · режим работы |
| telegram | Telegram-канал | `#229ED9` | plane SVG | посты · фото работ · контакты |
| instagram | Instagram | gradient 135deg `#FEDA77→#F58529→#DD2A7B→#8134AF` | camera SVG | **скриншот профиля** (и только) |
| 2gis | 2ГИС | `#19BB4F` | `2` | услуги · отзывы · контакты |
| avito | Avito-профиль | `#97CF26` | `A` | услуги · цены · отзывы |
| site | **Ваш старый сайт** | `oklch(0.42 0.04 250)` | globe SVG | тексты · фото · услуги |
| card | Фото визитки или буклета | `oklch(0.78 0.07 70)` | card SVG | распознаем услуги · контакты |

**КРИТИЧНО:** Instagram pull = только «скриншот профиля».

### 7.2 Soon platforms (3 штуки)

| id | name | bg | logo |
|---|---|---|---|
| vk | VK-страница | `#0077FF` | `V` |
| ozon | Ozon-витрина | `#005BFF` | `O` |
| youtube | YouTube-канал | `#FF0033` | play SVG |

WhatsApp удалён.

### 7.3 Header

**H2:** «Что подойдёт для создания Самосайта»

**Sub:** «Подойдёт любая ссылка, где про вас уже что-то написано или показано» (без точки)

### 7.4 Layout

- Featured Я.Карты — full-width
- Row 2: 3 cards (Telegram, Instagram, 2ГИС)
- Row 3: 3 cards (Avito, Ваш старый сайт, Фото визитки)
- Отдельная коробка `СКОРО ПОДКЛЮЧИМ` с dashed border + 3 inline-pills

---

## 8. BigFeaturesSection — выразительная редакция

**Eyebrow с символом** ✦:

```html
<div class="ss-bf-eyebrow">
  <span>✦</span> 8 «САМ» В ОДНОМ ПРОДУКТЕ
</div>
```

Background `var(--accent-soft)`, color `var(--accent-ink)`, border-radius 999, padding 6px 14px, Mono 12px letter-spacing 0.08em weight 600.

**H2 (без точек):** «Восемь «сам» — поэтому он Самосайт»

**Sub:** «Самосайт — это не один трюк, а восемь вещей, которые он делает сам — от первого «давайте посмотрим» до недельной аналитики»

### 8.1 8 карточек

| Idx | H3 | Subtitle | Tint |
|---|---|---|---|
| 01 | Сам соберётся | Дайте ссылку — соберётся за две минуты | peach |
| 02 | Сам обновится | Каждую неделю — свежие посты, фото и цены | butter |
| 03 | Сам отберёт отзывы | На сайте — только лучшие | gold |
| 04 | Сам поймает заявку | В Telegram, MAX или почту | sky |
| 05 | Сам посчитает | Короткая сводка раз в неделю | sage |
| 06 | Сам попадёт в поиск | Клиенты найдут вас в Яндексе и Google | lavender |
| 07 | Сам подстроится под телефон | 80% клиентов зайдут с мобильного | rose |
| 08 | Сам защитится от спама | Только живые заявки — без ботов | green |

### 8.2 Структура карточки

```html
<article class="ss-feature-card" data-tint="sparkles">
  <span class="ss-feature-card__deco-num" aria-hidden="true">01</span>
  <div class="ss-feature-card__icon"><svg /></div>
  <h3>Сам соберётся</h3>
  <p class="ss-feature-card__subtitle">Дайте ссылку — соберётся за две минуты</p>
  <p class="ss-feature-card__body">Дайте ссылку на Яндекс.Карты...</p>
</article>
```

**Декоративный номер 01–08:**
- `position: absolute; top: -14; right: -4;`
- `font-family: var(--mono); font-size: 96px; font-weight: 800; letter-spacing: -0.06em;`
- **`color: var(--tint-fg); opacity: 0.22;`** (использует ярко-насыщенный цвет tint'а вместо бледного bg — иначе цифры почти невидимы)
- `z-index: 0; pointer-events: none; line-height: 1;`

**Остальные стили:**
- Card: padding 28 (22 mobile), border-radius 22, gap 14, height 100%, position relative, overflow hidden
- Icon: 64px (56 mobile), tint colors из FEATURE_TINTS
- H3: 28px (24 mobile), weight **800**, letter-spacing -0.032em, line-height 1.05
- Subtitle: 15.5px (14.5 mobile), weight **700**, color tint.fg
- Body: 14.5px (14 mobile), line-height 1.55, ink-soft, **без точки в конце**
- Grid: `repeat(4, 1fr)` desktop, `1fr` mobile, gap 18/14

### 8.3 FEATURE_TINTS

```js
const FEATURE_TINTS = {
  sparkles: { bg: 'oklch(0.93 0.05 40)',  fg: 'oklch(0.42 0.14 35)',  cardBg: white },
  refresh:  { bg: 'oklch(0.93 0.06 95)',  fg: 'oklch(0.42 0.12 80)',  cardBg: bgSoft },
  star:     { bg: 'oklch(0.93 0.05 60)',  fg: 'oklch(0.45 0.13 55)',  cardBg: white },
  inbox:    { bg: 'oklch(0.93 0.05 200)', fg: 'oklch(0.36 0.10 220)', cardBg: bgSoft },
  bar:      { bg: 'oklch(0.93 0.05 145)', fg: 'oklch(0.35 0.11 145)', cardBg: bgSoft },
  search:   { bg: 'oklch(0.92 0.05 285)', fg: 'oklch(0.38 0.11 285)', cardBg: white },
  phone:    { bg: 'oklch(0.92 0.05 25)',  fg: 'oklch(0.40 0.13 22)',  cardBg: white },
  shield:   { bg: 'oklch(0.92 0.06 145)', fg: 'oklch(0.35 0.11 145)', cardBg: bgSoft },
};
```

---

## 9. OwnershipSection — кнопка демо ЛК

**H2:** «Восемь «сам» — но кнопка всегда у вас» (без точки)

**Sub:** «Самосайт делает рутину, но решения — за вами. В личном кабинете видна аналитика и доступны все действия с сайтом»

### 9.1 4 bullets

1. **Полный контроль** — Правьте тексты, заменяйте фото, ставьте на паузу — в одно нажатие
2. **Сайт ваш** — Заберёте файлы или унесёте на другой домен — в любой момент
3. **Аналитика тоже** — Видите кто пришёл, откуда и сколько оставил заявок
4. **Удалить за секунду** — Передумали — нажали «удалить». Никаких звонков в поддержку

### 9.2 CTA «Посмотреть демо личного кабинета»

```html
<a href="/admin-demo" target="_blank" rel="noopener" class="ss-cta-dark">
  <span class="ss-play-circle">▶</span>
  Посмотреть демо личного кабинета
  <span>↗</span>
</a>
<div class="ss-cta-microcopy">интерактивная демка · откроется в новой вкладке</div>
```

**Стили:**
- Background `var(--ink)`, color white, weight 600, padding 14px 24px, border-radius 999
- ▶ — terracotta-circle 22×22 fontSize 13 white
- Box-shadow `0 14px 28px -14px rgba(0,0,0,0.4)`

### 9.3 ControlPanelMock — фиктивные номера

В таблице «Последние заявки» — только:

| name | contact | when |
|---|---|---|
| Анна П. | `+7 999 111-11-11` | сегодня · 14:32 · TG |
| Юлия В. | `@example_user` | сегодня · 12:18 · TG |
| Михаил С. | `+7 999 222-22-22` | вчера · телефон |

---

## 10. Pricing — Один тариф

**H2 (новая редакция, без eyebrow):**
> Один тариф — без сюрпризов

**Sub:**
> Не надо выбирать пакеты, считать апселы и читать «звёздочки». 990 ₽ в месяц — и весь Самосайт в вашем распоряжении

**Цена в карточке:** 990 ₽ (76px display, ink, weight 700, letter-spacing -0.04em).

**Внутри карточки** старая sub-line «Без матриц, апселов и «звёздочек». Один тариф — со всем, что умеет Самосайт» — **удалена**, дублирует section sub.

7 буллетов через «Сам…» — без изменений.

CTA: «Собрать мой Самосайт →»
Микрокопия: «Первый месяц бесплатно · Карта не нужна»

---

## 11. FAQ + FreeMonthCTA — без изменений

См. canon. Точки в конце ответов **разрешены** (это ответы на вопросы, не headlines).

---

## 12. Клиентский ЛК — Demo (`/admin-demo`)

Полноценная интерактивная страница-демо. Канон: `screens-client-admin-demo.jsx` + `client-admin-demo.html`.

### 12.1 Header (sticky)

| Слот | Содержимое |
|---|---|
| Слева | BrandMark + `ДЕМО · ЛИЧНЫЙ КАБИНЕТ` Mono pill |
| Центр-right | Status: `● studia-anna.samosite.online · опубликован` |
| Справа | «← Назад к лендингу» (ghost) + «Открыть сайт ↗» (primary) |

### 12.2 Layout

Sidebar 240px + main. Sidebar:
- Mono label «СТУДИЯ АННЫ»
- 6 кнопок-табов
- Mini help card

### 12.3 6 табов

| ID | Label | Icon | Содержимое |
|---|---|---|---|
| analytics | Аналитика (default) | bar | 4 stat-card sparkline + большой SVG-чарт + Source breakdown + сводка |
| site | Сайт | site | Live-превью + 4 editor blocks |
| leads | Заявки (badge `3`) | inbox | Filter chips + grid-table с 8 заявками |
| reviews | Отзывы | star | 8 карточек отзывов с toggle + ★ ТОП badge |
| services | Услуги | list | 5 строк услуг с inline-edit |
| settings | Настройки | gear | Подписка 990 ₽/мес + 3 toggles + Управление |

### 12.4 Аналитика — детально

**4 stat-card:**
- Посещения / 30 дней — `2 847` (+18% ↑)
- Уникальные — `1 932` (+22% ↑)
- Заявок — `78` (+34% ↑)
- Конверсия — `2.7%` (+0.4пп ↑)

**Big chart «Трафик за 30 дней»** — SVG, terracotta + blue, gridlines, X-labels Mono.

**Source breakdown** stacked bar:

| Источник | Share | Цвет |
|---|---|---|
| Яндекс.Карты | 45% | `#FFCC00` |
| Telegram | 28% | `#229ED9` |
| Прямые | 15% | accent |
| 2ГИС | 8% | `#19BB4F` |
| Google | 4% | `oklch(0.55 0.18 25)` |

### 12.5 API контракт

```
GET  /api/admin/analytics?range=30d
GET  /api/admin/site / PUT
GET  /api/admin/leads / PUT /api/admin/leads/:id
GET  /api/admin/reviews / PUT / POST .../recurate
CRUD /api/admin/services
PUT  /api/admin/settings
DELETE /api/admin/site
```

### 12.6 Реализация

| Файл | Что |
|---|---|
| `code/app/admin/page.tsx` | Layout + sidebar + tab routing |
| `code/app/admin/(tabs)/*` | 6 tab-страниц |
| `code/app/admin-demo/page.tsx` | Копия admin/page.tsx со статикой |

`/admin-demo` — публичная страница без auth.

---

## 13. Файлы канона vs прод-маппинг

| Канон (JSX) | Прод (TSX/J2) |
|---|---|
| `landing-samosite.jsx` | `code/app/(marketing)/page.tsx` |
| `screens-customer.jsx` | `code/customer-site.html.j2` |
| `screens-client-admin-demo.jsx` | `code/app/admin/page.tsx` + `/admin-demo/page.tsx` |
| `screens-intake.jsx` | `code/components/intake/SubmitModal.tsx` |
| `screens-admin-core.jsx` / `screens-admin-ops.jsx` | `code/app/founder/*` |

---

## 14. Глобальные правила

### 14.1 Тариф 990 ₽
Везде: Hero badge, Pricing card, Settings demo.

### 14.2 Логотип клиентского сайта
- 32×32 (sticky header customer-сайта), 24×24 (превью SiteCard на лендинге)
- borderRadius 7–9px
- background = брендовый цвет мастера (вычисляется backend'ом)
- Буква = first char of name, Onest 800, white

### 14.3 Бренд-токены
- accent: `oklch(0.605 0.155 35)` terracotta
- accentSoft: `oklch(0.92 0.045 40)`
- ink: `oklch(0.215 0.018 60)`
- bg: `oklch(0.972 0.012 80)`
- success: `oklch(0.58 0.13 145)`

---

## 15. Mobile responsive

1. **Hero H1** — `white-space: normal` на каждой «сам …», 38px line-height 1.08.
2. **Free-month badge** — `flex-wrap: nowrap`, одним блоком.
3. **Sticky header mobile** — «Войти» и «Собрать →» обе видны.
4. **Examples carousel** — `scroll-snap-type: x mandatory`, gridAutoRows: 1fr не применим (1 col).
5. **PlatformsSection** — `1fr`.
6. **BigFeatures** — `1fr`, декоративные цифры могут overflow hidden.
7. **OwnershipSection** — 2-col → stack.
8. **Free-month CTA (Dojim)** — full-width.

---

## 16. Performance / SEO

- **Lighthouse mobile ≥90** Performance, ≥95 SEO/Accessibility/BestPractices.
- **CLS = 0** — все `<img>` с width/height.
- **LCP <2s** — hero-photo `loading="eager"` + preload.
- **JSON-LD** на лендинге: `Organization` + `WebSite` + `FAQPage`.

---

## 17. Backend-задачи

1. Pricing: обновить тариф в Stripe/ЮKassa с 29900 → 99000 копеек
2. `/admin-demo` — статика, без API
3. `/login` — клиентская админка (existing flow)

---

## 18. PIXEL-PERFECT VERIFICATION — ОБЯЗАТЕЛЬНЫЙ ЭТАП

**КРИТИЧНО:** после реализации каждой секции — **полная визуальная проверка** на совпадение с JSX-каноном. Это не опциональный шаг, это **acceptance gate**.

### 18.1 Метод 1 — Side-by-side compare (обязательно)

1. Открыть JSX-канон в одном окне браузера (через `index.html` design canvas, секция #1).
2. Открыть прод-страницу `/` в соседнем окне (50% width каждое).
3. Прокрутить **одновременно**, секция за секцией.
4. Записать любое расхождение как баг (отдельные issues в трекере).

### 18.2 Метод 2 — DevTools measurements

Для каждой секции:
1. Inspect `<h1>`, `<h2>`, `<h3>` в каноне → записать computed font-size, line-height, weight, letter-spacing, color.
2. То же в проде. Сравнить байтово.
3. Spacing: padding, margin, gap.
4. Border-radius, box-shadow — точные значения.

Допустимый отклон: 0 пикселей.

### 18.3 Метод 3 — Visual regression tests (опционально, но рекомендуется)

```bash
# Playwright + pixelmatch
npm install -D playwright pixelmatch pngjs

# Screenshot per-viewport на 3 размерах: 1440, 768, 390
# Сравнение с эталонами из канона (один раз сгенерировать через design canvas)
# Threshold: 0.02 (2% diff per pixel)
```

Файлы тестов:
```
/code/tests/visual/
  landing-1440.spec.ts
  landing-768.spec.ts
  landing-390.spec.ts
  admin-demo-1440.spec.ts
  customer-site-1440.spec.ts
  ...etc
```

### 18.4 Per-viewport проверка (обязательно)

Каждую секцию проверить на:
- **1440** (desktop default)
- **1024** (laptop)
- **768** (tablet)
- **390** (mobile default)
- **360** (mobile minimum)

### 18.5 Чек-лист по секциям

#### Sticky header
- [ ] Sticky `top: 0`, `z-index: 10`, `backdrop-filter: blur(12px)`.
- [ ] Mobile: «Войти» + «Собрать →» обе видны.
- [ ] Линк «Войти» → `https://samosite.online/login`.

#### Hero
- [ ] H1 не обрезается на 360px viewport (каждая «сам …» wraps корректно).
- [ ] Highlight под «сам себя соберёт» — `accentSoft`, opacity 0.7, position absolute, z-index -1.
- [ ] Подзаголовок: «Самосайт **на базе ИИ**…», без точки в конце.
- [ ] Free-month badge — `flex-wrap: nowrap`, gift-icon 36×36, 2 строки текста.

#### Examples
- [ ] Caption «Собран из X» **над** карточкой, бренд-точка 8×8.
- [ ] SiteCard logo — 24×24 буква на брендовом цвете в sticky header превью.
- [ ] **Все три карточки одинаковой высоты** (gridAutoRows: 1fr + height: 100%).
- [ ] Per-example rating/reviewCount/clientsCount разные (4.9/38/1200+, 5.0/47/850+, 4.8/14/320+).
- [ ] **НЕТ** watermark «Сделано на Самосайте» под final-CTA в SiteCard.
- [ ] Единый CTA «Сделать себе такой Самосайт →» центрирован, **БЕЗ** микрокопии.

#### Story
- [ ] H2 «От вас — одно действие, всё остальное Самосайт сделает сам» (без точек).
- [ ] 6 шагов-зигзаг, dashed connectors.

#### Platforms
- [ ] Я.Карты `#FFCC00`, Instagram 4-color gradient 135deg.
- [ ] Instagram pull = **только** «скриншот профиля».
- [ ] WhatsApp отсутствует, Ozon present (`#005BFF`).
- [ ] «Ваш старый сайт» (не «Свой сайт»).

#### BigFeatures
- [ ] Pill-eyebrow ✦, accentSoft background, Mono 12px.
- [ ] **8 декоративных цифр 01–08** видны (color `tint.fg` opacity **0.22**, не 0.45 на bg!), 96px Mono 800.
- [ ] H3 28px weight **800** (не 700!), subtitle 15.5px weight 700.

#### Ownership
- [ ] H2 «Восемь «сам» — но кнопка всегда у вас» (без точки).
- [ ] Dark CTA «Посмотреть демо ЛК ↗» → `/admin-demo`.
- [ ] ControlPanelMock — phones `+7 999 111-11-11` / `+7 999 222-22-22` / `@example_user`.
- [ ] **НЕТ** реалистично-выглядящих номеров.

#### Pricing
- [ ] H2 «Один тариф — без сюрпризов».
- [ ] **990 ₽** 76px display, не 299 ₽.
- [ ] **НЕТ** дублирующего sub «Без матриц, апселов…» внутри карточки (только в section sub).

#### FAQ
- [ ] `<details>` нативные, без custom JS.
- [ ] Первый вопрос `open`.

#### Dojim (FreeMonthCTA)
- [ ] Тёмный фон, gift icon, 4 bullets, last-mile mono, alt-path.

#### Admin demo
- [ ] Sidebar 240px, 6 tabs.
- [ ] Badge `3` на «Заявки».
- [ ] Analytics chart рендерится без CLS.
- [ ] Site tab live-preview обновляется на keypress.
- [ ] Leads таблица: «Записать»/«×» меняют статус.
- [ ] Reviews toggle меняет opacity + dashed border.

#### Typography (см. §27)
- [ ] **Нет точек** в конце H2, sub-секций, body параграфов.
- [ ] **Nbsp после коротких предлогов/союзов** (в, с, у, и, а, на, за, от, до, по, из, для, к, о, не…).
- [ ] **Mono numbers** через regular space (`1 200+`).
- [ ] **Цена** `990 ₽` через `&nbsp;`.

### 18.6 Финальная приёмка

После прохождения всех чек-листов выше — **код-ревью с командой**:
1. Открыть JSX-канон + прод-страницу side-by-side.
2. Пройти секция за секцией на 3 viewports.
3. Каждое расхождение — фиксировать как баг.
4. Не мерджить, пока 100% чек-листа не зелёное.

---

## 19. Что **НЕ** делаем

- Видео в Hero
- A/B тесты (отдельно)
- Английская версия
- Push-уведомления / email-цепочки
- Реальный API для `/admin-demo`
- Sticky-mobile-bottom-CTA на лендинге

---

## 20. Acceptance criteria (полный)

- [ ] Тариф 990 ₽/мес везде
- [ ] Все Section-eyebrows удалены кроме BigFeatures (✦ pill)
- [ ] H1 на mobile не обрезается
- [ ] Free-month badge — flex-nowrap, 2 строки текста
- [ ] **SocialProofSection полностью удалена**
- [ ] **RfContextSection полностью удалена**
- [ ] Examples — caption над карточкой, лого, единый CTA, без watermark
- [ ] **Карточки Examples одинаковой высоты на всех viewport'ах**
- [ ] BigFeatures декоративные цифры **видимые** (opacity 0.22 на fg-цвете)
- [ ] Sticky header — на mobile «Войти» + «Собрать →»
- [ ] «Войти» → `/login`
- [ ] OwnershipSection — CTA «Посмотреть демо ЛК ↗» → `/admin-demo`
- [ ] ControlPanelMock — фиктивные номера
- [ ] `/admin-demo` — 6 табов работают
- [ ] **Типографские правила соблюдены** (§27): nbsp + без точек
- [ ] **Pixel-perfect verification пройдена** по §18.5 на 3 viewports
- [ ] Lighthouse: Performance ≥90, SEO ≥95, Accessibility ≥95
- [ ] CLS = 0, нет console errors

---

## 21. Self-critique log

- **Патч 9.** Hero подзаголовок: добавлены «на базе ИИ», «вести аналитику», «отбирать и публиковать отзывы».
- **Патч 10.** Все Section-eyebrows удалены.
- **Патч 11.** RfContextSection добавлена и **позже удалена**.
- **Патч 12.** Examples — caption перенесён над карточкой. Единая CTA внизу.
- **Патч 13.** Platforms — Instagram в активные, pull = только «скриншот профиля».
- **Патч 14.** ControlPanelMock — фиктивные phone numbers.
- **Патч 15.** Free-month → яркая plашка.
- **Патч 16.** Login link → `/login` (клиент).
- **Патч 17.** Новая страница `/admin-demo`.
- **Патч 18.** Pricing 299 → 990 ₽.
- **Патч 19.** SiteCard — логотипы 24×24 в sticky header.
- **Патч 20.** Watermark «СДЕЛАНО НА САМОСАЙТЕ» удалён из превью лендинга.
- **Патч 21.** Free-month badge перевёрстана: убран вертикальный разделитель, убрана микрокопия.
- **Патч 22.** BigFeatures выразительнее: pill-eyebrow ✦, декоративные цифры 01–08.
- **Патч 23.** Декоративные цифры — **opacity 0.22 на `tint.fg`** (не 0.45 на bg). Иначе невидимы на screenshots.
- **Патч 24.** SocialProofSection **удалена полностью** — отвлекала от продуктового обещания.
- **Патч 25.** Pricing H2 переписан: «Один тариф — без сюрпризов». Sub перенесён из карточки в section.
- **Патч 26.** Examples grid-auto-rows: 1fr + flex стретч — карточки выровнены в высоту.
- **Патч 27.** Русские типографские правила применены ко всем jsx-файлам (см. §27).

---

## 22. Связанные документы

- `COPY.md` — финальный копирайт
- `CLAUDE_CODE_TZ.md` — базовая v2
- `CLAUDE_CODE_TZ_customer_v2.1.md` — customer-сайт booking-page
- `CLAUDE_CODE_TZ_landing_v2.1.md` — этот файл, финал лендинга
- `CLAUDE_CODE_TZ_typography.md` — типографские правила

---

## 27. **РУССКИЕ ТИПОГРАФСКИЕ ПРАВИЛА** (обязательно)

Применяются ко всем текстам на лендинге и в admin-demo. Те же правила см. в `CLAUDE_CODE_TZ_typography.md`.

### 27.1 Без точек в конце

**ЗАПРЕЩЕНО** ставить точку в конце:
- H1 / H2 / H3 / H4 / H5 / H6
- Section subtitle (под H2)
- Body параграф, если он **не часть многопредложенного блока** (то есть если это одно ёмкое предложение — без точки)
- Caption / меток / мини-описаний (mono uppercase)
- CTA-кнопок и микрокопии под ними
- Bullet'ов в списках, **если** буллет — это самостоятельное предложение

**Можно ставить точку:**
- В FAQ-ответах (это полные предложения в диалоговой форме)
- В testimonial-цитатах (живая речь)
- В body параграфах из 2+ предложений — между ними точки нужны, в последнем — **по решению** (для лендинга — без)

### 27.2 Non-breaking space (`\u00A0`) после коротких слов

Не дать коротким предлогам/союзам «висеть» в конце строки. После каждого из этих слов **обязательно** ставить `\u00A0` (nbsp) перед следующим словом:

```
в, с, к, у, о, и, а
на, за, от, до, по, из, для, что, как, или, но, же, ли, то, не, без, со, об, ко, во, при
```

**Пример:**

```
ПЛОХО:  «Самосайт собирает сайт из
         того, что у вас уже есть»
        ────────^^^^^^^^^—       — «у» висит в конце

ХОРОШО: «Самосайт собирает сайт из
         того, что у\u00A0вас уже есть»
                  ────^^^^^^^^      — «у вас» вместе
```

### 27.3 Тире vs дефис

- `—` (em-dash, U+2014) — для смысловых пауз: «От вас — одно действие»
- `–` (en-dash, U+2013) — для диапазонов: «3–5 дней», «10:00–20:00»
- `-` (hyphen, ASCII) — только для составных слов: «бизнес-карточка», «1 200+»

### 27.4 Кавычки

«ёлочки» — основные. „лапки" — вложенные. **Никогда** прямые `"` / `'` в публичной копи.

### 27.5 Mono numbers

- Через regular space: `1 200+`, `1 284`, `990 ₽`
- НЕ `1&nbsp;200`, НЕ `1\u00A0200` — ломает Mono-семейство
- **Исключение:** в цене `990 ₽` — пробел между числом и ₽ можно сделать `&nbsp;` (визуально лучше)

### 27.6 Автоматизация

Все JSX-файлы канона уже прошли скриптовую обработку nbsp. Прод-код должен либо:

1. **Использовать оригинальные строки с уже встроенными nbsp** — копировать строки из JSX-канона побайтово
2. **Применить тот же скрипт** при build-time (можно использовать `unbreakable-russian` npm-пакет или собственный transform)
3. **Использовать CSS `text-wrap: balance` + `word-spacing`** — не покрывает все кейсы, не рекомендуется

### 27.7 Проверка

- В Chrome DevTools посмотреть на каждую строку — нет ли коротких предлогов в конце строки
- Если есть — добавить nbsp в исходник
- Особенно важно на mobile-viewports (короче строки → больше переносов)
