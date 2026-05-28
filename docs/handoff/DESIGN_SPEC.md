# Samosite Landing — Design Spec (для экспорта на прод)

> Версия канона 0.7.2. Источник истины — `src/landing/index.tsx` + `src/tokens.ts`.
> Документ описывает каждый компонент: размеры, отступы, тени, ховеры, анимации, брейкпоинты.
> Цель — собрать прод один-в-один без догадок. Все значения извлечены из кода, не по памяти.

---

## 0. Глобальные основы

### Брейкпоинт
Один порог: `mobile = window.innerWidth < 720`. Всё ниже 720px — мобильная ветка, выше — десктоп. Резайз слушается, режим переключается на лету.
> ⚠️ Известное ограничение: между 720 и ~1000px десктоп-хедер тесноват. В 0.7.1 решено через `clamp()` на паддингах и `nowrap` (см. §11). Полноценного промежуточного брейкпоинта/бургера нет.

### Цветовые токены (`VT`, OKLCH)
| Токен | Значение | Назначение |
|---|---|---|
| `bg` | `oklch(0.972 0.012 80)` | основной фон страницы (тёплый кремовый) |
| `bgSoft` | `oklch(0.945 0.014 75)` | подложки, ховер-фон |
| `white` | `#ffffff` | карточки, поле ввода |
| `ink` | `oklch(0.215 0.018 60)` | основной текст |
| `inkSoft` | `oklch(0.42 0.020 60)` | вторичный текст |
| `inkFaint` | `oklch(0.56 0.020 60)` | подписи, мета |
| `inkMuted` | `oklch(0.68 0.016 60)` | самый тихий текст |
| `line` | `oklch(0.88 0.012 70)` | границы |
| `lineSoft` | `oklch(0.93 0.010 70)` | мягкие границы, разделители |
| `accent` | `oklch(0.605 0.155 35)` | терракота — кнопки, ссылки, акценты |
| `accentHover` | `oklch(0.54 0.16 35)` | ховер акцентных кнопок |
| `accentSoft` | `oklch(0.92 0.045 40)` | подложка акцента, хайлайт |
| `accentInk` | `oklch(0.42 0.14 35)` | текст на светлом акценте |
| `success` / `successSoft` | `oklch(0.58 0.13 145)` / `oklch(0.93 0.05 145)` | галочки в тарифах |
| `info`, `warn`, `danger` (+ soft) | см. tokens.ts | статусные |

### Радиусы (`VT.r`)
`sm: 6 · md: 10 · lg: 14 · xl: 18 · pill: 999`

### Тени (`VT.shadow`)
- `card`: `0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)`
- `pop`: `0 18px 40px -16px rgba(120,60,30,0.25)`

Все тени в проекте — тёплые (база `rgba(120,60,30,…)`), не нейтрально-серые.

### Шрифты
- sans: `Onest, system-ui, -apple-system, sans-serif` — весь UI
- mono: `'JetBrains Mono', ui-monospace, monospace` — eyebrow, мета, цифры, технические подписи

Карточки-примеры используют свои шрифты по теме (Fraunces, Instrument Serif, Inter Tight и т.д. — см. §8 и spec пресетов).

### Горизонтальные поля секции (`sectionPad`)
`paddingLeft/Right = mobile ? 20 : 80`, `boxSizing: border-box`.

### Примитивы текста
- **Eyebrow:** mono, `fontSize mobile 10.5 / desktop 11.5`, `letterSpacing 0.14em`, `padding 6px 12px`, `borderRadius 6`, фон `accentSoft` (или `bgSoft` для kind=neutral), точка-маркер 6×6 круг, gap 8.
- **H2:** `fontSize mobile 30 / desktop 52`, `lineHeight mobile 1.1 / desktop 1.05`, `fontWeight 700`, `letterSpacing -0.03em`, `margin 14px 0 0`, `textWrap balance`, по умолчанию центр.
- **Sub:** `fontSize mobile 16 / desktop 19`, `lineHeight 1.45`, цвет `inkSoft`, `margin 14px auto 0`, `maxWidth 720` (десктоп), `textWrap pretty`.

---

## 1. HERO (`HeroBlock`)

Контейнер: `sectionPad`, центрирован, `maxWidth desktop 1120`.

**H1:**
- `fontSize`: mobile `clamp(32px, 8.8vw, 44px)`, desktop `76`
- `lineHeight`: mobile 1.06 / desktop 1.04, `fontWeight 700`, `letterSpacing -0.035em`, `margin 0`, `textWrap balance`
- Текст: «Соберём за **2 часа** сайт, который ловит заявки. Дальше он **сам становится лучше** каждую неделю.»
- «2 часа» и «сам становится лучше» — цветом `accent`. Под «2 часа» (только десктоп) подложка-хайлайт: `position absolute, left 2, right 6, bottom 6, height 14, background accentSoft, opacity 0.7, zIndex -1, borderRadius 3`.

**Абзац 1** (`<p>`): `fontSize mobile 16.5 / desktop 20`, `lineHeight 1.5`, `color inkSoft`, `maxWidth 860`, `marginTop desktop 28 / mobile 20`.
> «Покажите Самосайту, где вы ведёте дела: Яндекс.Карты, Telegram, 2ГИС, Avito или Instagram. Если ничего нет, сфотографируйте меню или буклет.»

**Абзац 2** (`<p>`): те же стили, `marginTop 12/10`, `«2 часа сайт принимает заявки»` болдом `ink`.
> «Самосайт соберёт сайт со всеми услугами, ценами, отзывами и фото. Тексты напишет сам. Когда придут первые посетители, начнёт подсказывать, что поправить ради новых заявок.»

**Поле ввода (input pill):** контейнер `maxWidth 680`, `marginTop 22/36`, `display flex`, `gap 10`, `background white`, `border 1px solid line`, `borderRadius 999`, `padding` под pill. Плейсхолдер «Вставьте ссылку или загрузите фото» (`fontSize mobile 15 / desktop 16`, цвет `inkFaint`). Иконка-скрепка/ссылка слева.
**Кнопка в поле:** `background accent`, текст белый, «Собрать сайт за 2 часа →», `borderRadius 999`.

**Подпись-цена** (под полем): `marginTop 10/12`, mono, `fontSize mobile 11.5 / desktop 12.5`, `letterSpacing 0.03em`, цвет `inkSoft`.
> «Тариф «Старт» — бесплатно навсегда · платные **от 690 ₽/мес** · первый месяц на платном бесплатно, карту привязывать не надо» («от 690 ₽/мес» — болд `accent`).

**Ссылка «Сначала посмотреть примеры ↓»:** `marginTop 14/18`, `fontSize mobile 14 / desktop 15`, цвет `inkSoft`, подчёркивание `textUnderlineOffset 4`, цвет подчёркивания `line`.

**Блок «СОБИРАЕМ ИЗ»** вынесен в отдельный экспортируемый компонент `ChipStrip` (см. §1a). Hero подключает его как `<ChipStrip mobile={mobile} />`.

> **NB:** строки «Нет ссылки? Загрузите фото буклета, меню или работ →» в каноне НЕТ. Если она на проде — прод собран из другой версии. В 0.7.x её быть не должно.

**Фоновое пятно:** мягкий персиковый радиальный градиент справа-сверху (декоративный, за контентом).

---

## 1a. ChipStrip — переиспользуемый стрип источников

Экспортируемый компонент (`export function ChipStrip`) + тип `ChipStripItem` + набор `SOURCE_ICONS`. Вынесен из inline-кода Hero в 0.7.2, чтобы внешние страницы подключали его **без транскрипции canon-JSX** в hand-rolled-разметку (правило `landing/CLAUDE.md`).

**Импорт:**
```ts
import { ChipStrip, SOURCE_ICONS, type ChipStripItem } from '@samosite/canon/landing';
```

**Props:**
| prop | тип | дефолт | назначение |
|---|---|---|---|
| `mobile` | `boolean` | `false` | мобильная ветка (отступы/выравнивание) |
| `label` | `string` | `'СОБИРАЕМ ИЗ'` | подпись-капс над чипами; пустая строка скрывает |
| `items` | `ChipStripItem[]` | `SOURCE_ICONS` | список источников `{ id, name, icon }` |
| `align` | `'start' \| 'center'` | авто (`mobile?start:center`) | выравнивание |

**Стили (1:1 с прежним inline):**
- Контейнер: `marginTop mobile 22 / desktop 36`, `flex column`, `gap 10`, `alignItems` по `align`.
- Label: mono, `fontSize 11`, `letterSpacing 0.12em`, `color inkFaint`, `fontWeight 600`.
- Ряд чипов: `flex wrap`, `gap 8`, `justifyContent` по `align`.
- Чип: `inline-flex`, `align center`, `gap 8`, `padding 5px 14px 5px 5px`, `background white`, `border 1px solid line`, `borderRadius 999`, `fontSize 13`, `color ink`, `fontWeight 500`. Иконка источника 22×22.

**`SOURCE_ICONS`** — Яндекс.Карты, Telegram, 2ГИС, Avito, Instagram, старый сайт (каждый с inline-SVG-иконкой 22×22 в фирменных цветах площадки).

> Те же площадки дублируются в `SourcesSection` ниже Hero — это намеренно (разный контекст: Hero = «принимаем на вход», Sources = «что распознаём»). При переиспользовании ChipStrip вне Hero учитывайте это, чтобы не утроить.

---

## 2. STICKY HEADER (`StickyHeader`)

Контейнер: `position sticky, top 0, zIndex 10, width 100%`, `paddingTop/Bottom mobile 10 / desktop 14`, фон `oklch(0.972 0.012 80 / 0.92)` + `backdrop-filter blur(12px)`, `borderBottom 1px solid lineSoft`, `boxSizing border-box`.

**Боковые поля (0.7.1 фикс):** `paddingLeft/Right = mobile ? 20 : clamp(24px, 4vw, 80px)`.

Внутренний ряд: `flex, align center, justify space-between, gap 16`.

- **Лого** (`BrandMark`): размер `mobile 22 / desktop 26`, `fontSize 18 / 20`.
- **Десктоп-меню:** `flex, align center, gap clamp(12px, 1.6vw, 24px), fontSize 14, flexWrap nowrap`. Пункты (все `whiteSpace nowrap`): **Примеры** (`#examples`), **Цена** (`#pricing`), **Помощь** (`#faq`), **Войти** (`#login`, `padding 8px 16px`).
  - ❌ удалены пункты «Цикл 4 сам» (`#cycle`) и «Понедельник» (`#monday`).
- **CTA** (`#hero`): `background accent`, белый, `fontWeight 600`, `borderRadius 999`, `whiteSpace nowrap`, `flex 0 0 auto`. Десктоп: `padding 10px 20px, fontSize 14`, `boxShadow 0 6px 16px -8px rgba(120,60,30,0.4)`, лейбл «Собрать за 2 часа». Мобайл: `padding 8px 16px, fontSize 13.5`, лейбл «Собрать». Стрелка `→` после текста.

**Ховеры (CSS):**
- `.ss-nav-link`: цвет `inkSoft`, `padding 6px 2px`, `transition color .15s ease`; hover → `ink`.
- `.ss-login-link`: hover → цвет `ink`, фон `bgSoft`, `borderRadius 999`.

**Мобайл:** меню сворачивается (показывается лого + CTA «Собрать»). Бургер-меню отсутствует — пункты на мобиле не показываются в ряду.

---

## 3. EXAMPLES (`ExamplesSection` + `ExamplesCarousel`)

`marginTop mobile 56 / desktop 110`. Заголовок H2 «Вот как будет выглядеть ваш сайт» + Sub.

### Карусель (`ExamplesCarousel`)
- Скроллер: `overflow-x auto`, `scroll-snap-type x mandatory`, скрытый скроллбар, `scrollPaddingLeft mobile 16 / desktop 32`, `marginLeft/Right mobile -16 / desktop 0`.
- Трек: `flex`, `gap mobile 12 / desktop 24`, `padding mobile '0 56px 16px 16px' / desktop '0 32px 16px'`, `alignItems flex-start`.
- Карточка-обёртка: `flex mobile '0 0 94%' / desktop '0 0 calc((100% - 80px) / 3)'`, `scroll-snap-align start`.
- **Fade-маска краёв:** `mask-image linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)`. Ширина `--ss-fade-w = mobile 44px / desktop 64px`. Левый fade включается только когда `!atStart`, правый — когда `!atEnd` (значение схлопывается в `0px`). Transition `mask-image .25s ease`.

**Карточка превью** (`ss-card-lift` / inline):
- `borderRadius 12`, тёплая двухслойная тень покоя: `0 1px 2px rgba(40,28,18,0.03), 0 6px 16px -12px rgba(120,70,40,0.14), 0 2px 6px -6px rgba(40,28,18,0.05)`.
- **Hover (десктоп):** `transform translateY(-2px)`, тень углубляется до `0 1px 2px rgba(40,28,18,0.04), 0 10px 24px -14px rgba(120,70,40,0.20), 0 4px 10px -8px rgba(40,28,18,0.08)`. Transition `transform .22s cubic-bezier(0.22,0.61,0.36,1), box-shadow .22s ease`.
- Высота естественная (без обрезки). Tagline над карточкой: бизнес + город.

**MiniChrome** (рамка-браузер вокруг превью): `borderRadius 12`, `border 1px solid lineSoft`, `height 100%`, `alignSelf flex-start`, шапка с тремя точками (7×7, `#e3decf`) + адрес `host.samosite.online`.

### Стрелки (только десктоп)
- Круглые 56px, `position absolute, top 50%, translateY(-50%)`, выходят за края на `-28px`. SVG-стрелка внутри.
- **Hover:** `translateX(direction*2px) scale(1.05)`, transition `opacity .2s, transform .2s, box-shadow .2s`.
- **Disabled** (atStart/atEnd): `opacity 0, pointer-events none`.

### Точки-индикаторы (только мобайл)
- Расположены **НАД** каруселью, `marginBottom 14`, `flex center, gap 7`.
- Отслеживают активный слайд по `scrollLeft` (шаг = ширина первого ребёнка + 14, `activeIdx` клампится в `[0, childCount-1]`).
- Активная точка: ширина `20px` (пилюля), `background accent`. Неактивная: `7×7`, `background line`. `borderRadius 999`, `transition width .25s ease, background .25s ease`. Кликабельны: тап → `scrollTo(offsetLeft - 20, smooth)`.

### Порядок карточек (по контрасту)
Тёмные темы (`bento-noir`, `display-noir`, `display-ink`) на позициях 2/4/6, рядом всегда контраст. Текущий порядок: Маникюр(display-soft) · Автосервис(bento-noir) · Кофейня(editorial-warm) · Барбершоп(display-noir) · Пилатес(split-product) · Тату(display-ink) · Юр.практика(stacked-corporate) · Фотограф(split-teal) · Пекарня(stacked-cream) · Брови(display-bold).

---

## 4. HOW IT PICKS (`HowItPicks`)

`marginTop 0` (вплотную к карусели — единый логический блок). Заголовок «Самосайт собирает дизайн из ваших материалов, а не подставляет из шаблона» + подзаголовок.

4 карточки равной высоты (`grid, alignItems stretch`): демо прижато к низу через `marginTop auto`. Заголовки 19px, body 15px, чипы-номера 32px квадрат. Демо на белых tray-подложках (`min-height 56px`, рамка): свотчи 22×30, образцы шрифтов, мини-схемы сеток в `accentSoft`, кружки выбора 26px.

Тексты: 01 «Если стиль уже есть, повторит его» · 02 «Если стиля нет, соберёт сам» · 03 «Раскладку выберет под ваш контент» · 04 «Не понравилось — поменяете в один клик».

---

## 5. PRICING (`PricingSection` + `PricingMatrix`)

Заголовок H2 «Тариф под ваш масштаб» + подзаголовок про бесплатный старт.

### Матрица (`PricingMatrix`)
- Колонки: `firstCol = mobile 132 / desktop 240`, `planCol = mobile 96 / desktop 150` ×5. Итого desktop 990px (влезает в контейнер 1100).
- `cellPad = mobile '10px 8px' / desktop '12px 14px'`.
- Контейнер: `border 1px solid line`, `borderRadius 18`, `overflow hidden`, `background white`, тень `0 1px 0 rgba(0,0,0,0.02), 0 18px 48px -28px rgba(120,60,30,0.20)`.
- **Скролл:** mobile `overflow-x auto`; desktop `overflow visible` (без внутреннего скролла).
- **Sticky:** первая колонка строк (`position sticky, left 0, background white, zIndex 3`, на мобиле тень-разделитель `6px 0 8px -6px rgba(40,28,18,0.12)`); шапка (`sticky top 0, zIndex 2`); левая ячейка шапки `zIndex 4`.
- 5 планов: Старт / Личный / Бизнес / Компания / Студия. Цены 0 / 690 / 1490 / 2990 / 6990 ₽/мес.
- 5 групп: (цены) · Сайты и хостинг · ИИ-операции · Возможности · Поддержка. Заголовки групп: mono капс, `bgSoft`, `border-top/bottom 1px line`.
- Ячейки: `true` → галочка (круг 22×22, `successSoft`/`success`, SVG-чек); `false` → `—` (`inkFaint`); текст → центр, `tabular-nums`.
- **Подсветка «Популярный» отключена** (`PLAN_HILITE = -1`). Чтобы вернуть — индекс 0–4.
- Мобайл-подсказка снизу: «← таблица листается вбок →» (mono, `inkFaint`).

CTA под матрицей: кнопка «Собрать сайт за 2 часа» (центр) + курсивная подпись про бесплатный старт.

---

## 6. ОСТАЛЬНЫЕ СЕКЦИИ

- **`MondaySection`** — «По понедельникам — три предложения, как сделать сайт сильнее». Карточки-примеры (`MondayCard`) с действиями Применить / Другой вариант / Не надо.
- **`BaseWorkSection`** — «Базовая работа — тоже на нём». Карточки фич (`ss-card-lift`): hover `translateY(-1px)`, тень `0 10px 20px -14px rgba(120,60,30,0.18)`, transition `.2s ease-out`. Среди фич — счётчик «0 ботов в заявках».
- **`SourcesSection`** — «У вас уже всё есть для сайта». Чипы источников (Яндекс.Карты, Telegram, 2ГИС, Avito, ВКонтакте, старый сайт, фото меню/буклета) с подписями что распознаётся.
- **`OwnershipSection`** — «Самосайт делает рутину. Решения остаются за вами». Буллеты про контроль/экспорт/удаление. Экспорт: «пока аккаунт активен и ещё 10 дней после отказа».
- **`AnalyticsSection`** — H2 «Видите ровно то же, что и Самосайт».
- **`FaqSection`** (`FaqItem`) — нативный `<details>/<summary>`. Ховер summary: `background-color bgSoft`, transition `.15s ease`.
- **`FinalCtaSection`** — финальный CTA. Цена: «Тариф «Старт» — бесплатно навсегда. На платных первый месяц бесплатно, дальше от 690 ₽».

---

## 7. FOOTER (`Footer`)
Нижний колонтитул с навигацией и реквизитами. `sectionPad`, разделители `lineSoft`.

---

## 8. КАРТОЧКИ-ПРИМЕРЫ (модуль `presets`)

Отдельная спецификация — см. `src/presets/index.tsx`. Кратко: 5 семейств × 16 тем. Каждая карточка = (family, theme) + слоты контента. Высоты выровнены контентом (не обрезкой) до ~880–990px. Подробности палитр/сеток/шрифтов — в этом модуле, для рендера превью на лендинге менять не нужно.

---

## 9. Чек-лист соответствия прода канону

При раскатке проверить, что на проде:
1. Hero абзац 2 = «Самосайт соберёт сайт со всеми услугами…» (НЕ старый «Через 2 часа сайт в сети…»).
2. Цена везде «от 690 ₽», нигде нет «490 ₽ / 990 ₽ / первой сотни».
3. В хедере нет «Цикл 4 сам» и «Понедельник».
4. В hero НЕТ строки «Нет ссылки? Загрузите фото буклета…».
5. CTA-хедер не обрезается в диапазоне 720–1000px.
6. Карусель: точки над ней (мобайл), порядок карточек по контрасту, маникюр первый.
7. Тарифы: 5 планов, без подсветки «Популярный», десктоп без внутреннего скролла.

Если хоть один пункт не сходится — прод собран из устаревшего исходника, нужна пересборка из канона 0.7.2.
