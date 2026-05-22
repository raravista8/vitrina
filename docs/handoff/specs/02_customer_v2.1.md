# ТЗ для Claude Code · Customer-сайт v2.1 — booking-page upgrade

> **Контекст:** канон клиентских сайтов в `screens-customer.jsx`, прод-шаблон `code/customer-site.html.j2` (FastAPI + Jinja2 + Tailwind CDN).
> Эта задача — **поднять `customer-site.html.j2` до новой структуры v2.1**, основанной на best-practices booking-страниц для частных мастеров.
> Предыдущая редакция (см. `CLAUDE_CODE_TZ.md §3`) — отменяется; ниже **полная замена** структуры customer-сайта.

---

## TL;DR — что изменилось

**Было** (v2): hero + gallery + reviews + about + services + lead-form + footer — **7 секций**, форма заявки в конце.

**Стало** (v2.1): **10 секций + sticky-header + sticky-mobile-CTA**, ориентированных на классический booking-page паттерн:

1. **Sticky header** с anchor-навигацией, телефоном (`tel:`) и кнопкой «Записаться»
2. **Hero** — формульный заголовок «<услуга> в <городе> — <главная выгода>», dual CTA, мини-trust pill
3. **Social proof bar** — «выбрали N человек за X лет» + бейджи Я.Карт / 2GIS / Telegram с рейтингами
4. **Services** — карточки (не список!) с описанием, длительностью, ценой и **CTA в каждой**
5. **Process** — 4 шага с иконками
6. **Gallery** — masonry 4-кол, 10 фото
7. **Reviews** — отдельный блок, 6 карточек с аватарами + mid-page CTA
8. **About / specialist** — фото мастера + bio + creds + гарантии
9. **FAQ** — 8 Q&A через native `<details>` (SEO rich-snippets)
10. **Final booking** — двухколоночный: форма (select-поля + мессенджеры) + карта + контактная карточка
11. **Footer** (расширенный) + **sticky mobile CTA** внизу экрана

**Принципы:**
- **CTA каждые 1–2 экрана прокрутки**: hero · social-proof · services-cards · reviews-mid · final-booking · sticky-mobile + sticky-header. Минимум 6 точек входа в форму.
- **Никакой формы посреди страницы** — только финальная. Все промежуточные CTA — anchor-jumps на `#book`.
- **`tel:` ссылки везде** где встречается номер, **`#book`** для записи, **`mailto:`** — нигде (мы не email-first).
- **Все номера в Mono-шрифте** (JetBrains Mono).

---

## 1. Анатомия customer-сайта v2.1

Структура шаблона `code/customer-site.html.j2` (порядок секций — фиксированный):

```
<header.sticky>            ─ см. §2
<section #hero>            ─ §3
<section .social-bar>      ─ §4
<section #services>        ─ §5
<section .process>         ─ §6
<section .gallery>         ─ §7
<section #reviews>         ─ §8
<section #about>           ─ §9
<section .faq>             ─ §10
<section #book>            ─ §11
<footer>                   ─ §12
<div.sticky-mobile-cta>    ─ §13 (только mobile)
```

Все секции выше first-fold или с явной anchor-навигацией должны иметь `scroll-margin-top: 80px` (чтобы sticky header не накрывал).

---

## 2. Sticky header

**HTML-структура:**
```html
<header class="ss-header">
  <div class="ss-header__brand">{{ site.name }}</div>
  <nav class="ss-header__nav">
    <a href="#services">Услуги</a>
    <a href="#reviews">Отзывы</a>
    <a href="#about">О мастере</a>
    <a href="#contact">Контакты</a>
  </nav>
  <div class="ss-header__cta">
    <a href="tel:{{ site.phone_e164 }}" class="ss-phone">
      <svg>...</svg>{{ site.phone }}
    </a>
    <a href="#book" class="ss-btn ss-btn--primary">Записаться</a>
  </div>
</header>
```

**CSS:**
- `position: sticky; top: 0; z-index: 5;`
- `background: rgba(255, 255, 255, 0.93); backdrop-filter: blur(10px);`
- `border-bottom: 1px solid var(--ss-line);`
- Высота: 56–60px.
- Mobile (≤640px): скрыть `<nav>`, скрыть `.ss-phone` (телефон в sticky-mobile-CTA внизу). Оставить только бренд + «Записаться».

**Jinja2-данные:**
```python
site.name           # "Студия Анны"
site.phone          # "+7 921 234-56-78" (для отображения)
site.phone_e164     # "+79212345678" (для tel:)
```

---

## 3. Hero

**Структура:** двухколоночный grid (1.1fr / 0.9fr). Mobile → stack, photo внизу.

**Левый колонок:**
1. **Eyebrow (mono uppercase, terracotta):** `{{ site.category | upper }} · {{ site.city | upper }}`
2. **H1 (формульный):** 52px desktop / 36px mobile, line-height 1.04, terracotta-подсветка на ключевой фразе. **Формула:**
   ```
   <услуга> в <городе> — <главная выгода>
   ```
   Примеры:
   - «Маникюр в Петрозаводске — без боли, держится 3 недели»
   - «Стрижка в Самаре — за час, как вы любите»
   - «Хатха-йога в Краснодаре — для тех, у кого болит спина»

   H1 **обязательно** генерируется AI'ем по шаблону из источника (см. §16 backend).
3. **Sub (17px, ink-soft):** 1–2 предложения с подробностями. «Аппаратный маникюр и стойкое покрытие. Один клиент в час — без спешки, в тишине, с кофе.»
4. **Mini-trust pill** (inline-flex, pill-radius, bgSoft):
   ```html
   <div class="ss-trust-pill">
     <span class="ss-stars">★★★★★</span>
     <b>4.9 ★</b>
     <span>· 38 отзывов на Яндекс.Картах</span>
   </div>
   ```
5. **Dual CTA:**
   - Primary: `<a href="#book">Записаться →</a>` — terracotta pill 14px×26px, shadow.
   - Secondary: `<a href="tel:...">📞 +7 921 234-56-78</a>` — outlined pill, тот же размер.

**Правый колонок:**
- Hero-фото 4:5 (portrait), `border-radius: 16px`, `border: 1px solid line`.
- Поверх — gradient overlay снизу `linear-gradient(to top, rgba(0,0,0,0.45), transparent 50%)`.
- Caption на фото (left:20, bottom:18, color:white):
  - Mono uppercase: `СТУДИЯ В ЦЕНТРЕ ПЕТРОЗАВОДСКА` (или другой short description)
  - Bold 15px: `{{ site.address }}`

**Jinja2-данные:**
```python
site.category        # "Маникюр"
site.city            # "Петрозаводск"
site.hero.h1         # "Маникюр в Петрозаводске — без боли, держится 3 недели"
site.hero.sub        # "Аппаратный маникюр и стойкое покрытие. ..."
site.hero.h1_highlight  # подстрока для terracotta-подсветки, опционально
site.hero.photo_url  # CDN URL, webp, w=1100
site.hero.caption    # "СТУДИЯ В ЦЕНТРЕ ПЕТРОЗАВОДСКА"
site.address         # "г. Петрозаводск, ул. Ленина, 12"
site.rating          # 4.9
site.reviews_count   # 38
site.review_source   # "Яндекс.Картах" (склонение для "отзывов на ...")
```

---

## 4. Social proof bar

Узкая полоса сразу под hero. Background — `bgAlt`, padding 20px×36px, flex с wrap.

**Левый блок (mono):**
```
НАС ВЫБРАЛИ  1 200+  ЧЕЛОВЕК ЗА 9 ЛЕТ
```
- «НАС ВЫБРАЛИ», «ЧЕЛОВЕК ЗА X ЛЕТ» — Mono, 12px, letter-spacing 0.1em, ink-soft.
- Число — sans, 20px, bold, ink.

**Правый блок** — 3 aggregator-бейджа:
```html
<div class="ss-aggregator-badge">
  <span class="ss-aggregator-badge__logo">Я.К</span>
  <div>
    <div class="ss-aggregator-badge__rating">4.9 ★ · Яндекс.Карты</div>
    <div class="ss-aggregator-badge__count">38 отзывов</div>
  </div>
</div>
```

Логотипы — 30×30 квадрат с скруглением 8px и моно-инициалами:
- `Я.К` — Яндекс.Карты
- `2Г` — 2GIS
- `TG` — Telegram

Если у мастера нет какого-то из источников — соответствующий бейдж не показываем (никаких placeholders).

**Jinja2-данные:**
```python
site.clients_count   # "1 200+"
site.years           # "9 лет"
site.aggregators = [
  { logo: "Я.К", name: "Яндекс.Карты", rating: "4.9", count: "38 отзывов" },
  { logo: "2Г", name: "2GIS",          rating: "5.0", count: "12 отзывов" },
  { logo: "TG", name: "Telegram",      rating: "★★★★★", count: "420 подписчиков" },
]
```

---

## 5. Services — карточки, не список

**КРИТИЧНО:** старая `<ul>` со строкой `<name> · <duration> · <price>` — **выбрасывается**. Новый формат — grid из карточек.

**Структура:**
```html
<section id="services">
  <header>
    <div class="ss-eyebrow">УСЛУГИ И ЦЕНЫ</div>
    <h2>Что я делаю</h2>
    <span class="ss-mono-meta">цены актуальны · обновлены 12 мая 2026</span>
  </header>
  <div class="ss-services-grid">
    {% for sv in services %}
    <article class="ss-service-card">
      <header>
        <h3>{{ sv.name }}</h3>
        <div class="ss-service-card__price">
          <div class="ss-mono ss-bold">{{ sv.price }}</div>
          {% if sv.price_hint %}<div class="ss-mono ss-faint">{{ sv.price_hint }}</div>{% endif %}
        </div>
      </header>
      <p class="ss-service-card__desc">{{ sv.desc }}</p>
      <footer>
        {% if sv.duration %}
          <span class="ss-mono"><svg-clock/> {{ sv.duration }}</span>
        {% endif %}
        <a href="#book" class="ss-btn ss-btn--soft">Записаться →</a>
      </footer>
    </article>
    {% endfor %}
  </div>
</section>
```

**CSS:**
- Grid: `repeat(2, 1fr)` desktop, `1fr` mobile, gap 14px.
- Карточка: `background: white; border: 1px solid line; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px`.
- `<h3>` — 19px, bold, letter-spacing -0.022em, line-height 1.2.
- `<div .price>` — цена 18px Mono bold, hint 11.5px Mono faint.
- `<p .desc>` — 14px, line-height 1.5, ink-soft. Должно быть **не более 2–3 предложений**.
- `<footer>` — `display: flex; gap: 12; margin-top: auto` (CTA выровнен по низу карточки независимо от высоты desc).
- `.ss-btn--soft` — accent-soft background, accent text, pill, padding 8px×14px, font-size 14, weight 600.
- **Если количество услуг нечётное** — первая карточка занимает full-width (`grid-column: 1 / -1`).

**Jinja2-данные:**
```python
services = [
  {
    name: "Аппаратный маникюр",
    desc: "Без воды, кутикула и форма — идеально",
    duration: "60 мин",
    price: "1 500 ₽",
    price_hint: ""   # опционально, например "за ноготь" для дизайна
  },
  ...
]
services_last_updated: ISO-8601  # для "обновлены 12 мая 2026"
```

---

## 6. Process — 4 шага с иконками

Тонкая секция между Services и Gallery, на `bgAlt`.

**Структура:**
```html
<section class="ss-process">
  <header class="ss-center">
    <div class="ss-eyebrow">КАК БУДЕТ</div>
    <h2>От записи до результата — четыре шага</h2>
  </header>
  <div class="ss-process-grid">
    {% for step in process %}
    <div class="ss-process-step">
      <div class="ss-process-icon">{{ icon(step.icon) }}</div>
      <div class="ss-mono ss-step-num">ШАГ {{ loop.index }}</div>
      <h3>{{ step.title }}</h3>
      <p>{{ step.body }}</p>
    </div>
    {% endfor %}
  </div>
</section>
```

**Иконки** — 52×52 rounded-square (radius 14), `bg: accentSoft; color: accent`. 4 фиксированных типа:
- `calendar` — для шага «Записываетесь»
- `pin` — для шага «Приходите»
- `coffee` — для шага «Делаем услугу»
- `sparkles` — для шага «Уходите красивыми / довольными»

SVG-исходники см. в `screens-customer.jsx` функция `ProcessIcon`.

**Connectors:** между иконками — горизонтальная пунктирная линия (только desktop). CSS: `position: absolute; top: 26; right: -16; width: 32; height: 2; background: repeating-linear-gradient(to right, line 0 4px, transparent 4px 8px)`. На mobile — скрыть.

**Process steps генерируются AI'ем** под категорию бизнеса (см. §16). Шаблонные примеры:
```python
process = [
  { icon: "calendar", title: "Записываетесь",     body: "Через сайт, Telegram или звонок — ответим в течение часа." },
  { icon: "pin",      title: "Приходите",         body: "Студия в центре <города>. Парковка во дворе." },
  { icon: "coffee",   title: "Делаем <услугу>",   body: "Тишина, кофе, ваш сериал на проекторе — без болтовни, если не хочется." },
  { icon: "sparkles", title: "Уходите красивыми", body: "Покрытие держится 3 недели или возврат. Записываем на следующий раз." },
]
```

---

## 7. Gallery — masonry

Сетка 4×N, первая плитка 2×2.

```css
.ss-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 170px;
  gap: 10px;
}
.ss-gallery > :first-child {
  grid-column: span 2;
  grid-row: span 2;
}
```

**Mobile (≤640px):** `grid-template-columns: repeat(2, 1fr)`, первая плитка `span 2 / span 2`.

**Минимум 10 фото.** Если у мастера <10 фото в источнике — повторяем галерею через flexbox carousel (mobile) или скрываем секцию (если <4).

**Caption справа сверху:** `обновляется из источника еженедельно` (Mono, faint).

**Изображения:** `loading="lazy"`, `width`/`height` обязательны (CLS), WebP + JPEG fallback через `<picture>`. Каждое — отдельный URL с CDN, размер `w=600`.

---

## 8. Reviews — выделенный блок с аватарами + mid-page CTA

**На `bgAlt` background**, scroll-margin-top: 80.

**Структура header:**
```html
<header class="ss-flex-between">
  <div>
    <div class="ss-eyebrow">ОТЗЫВЫ</div>
    <h2>Что говорят клиенты</h2>
    <div class="ss-reviews-meta">
      <span class="ss-stars">★★★★★</span>
      <b>4.9 из 5</b> · {{ reviews_count }} отзывов на {{ review_source }}
    </div>
  </div>
  <div class="ss-curation-badge">
    <span class="ss-accent">★</span> ЛУЧШИЕ — ВЫБРАЛ ИИ · ОБНОВЛЯЕТСЯ ЕЖЕНЕДЕЛЬНО
  </div>
</header>
```

**Сетка 3×N** карточек (Desktop), 1-col mobile. Минимум 6 карточек.

**Карточка:**
```html
<div class="ss-review-card">
  {% if r.is_top_pick %}
    <span class="ss-review-curated-badge">★ ЛУЧШИЙ</span>
  {% endif %}
  <header>
    <span class="ss-review-avatar ss-tone-{{ r.tone }}">{{ r.author[0] }}</span>
    <div>
      <div class="ss-review-author">{{ r.author }}</div>
      <div class="ss-mono ss-faint">{{ r.source }} · {{ r.date }}</div>
    </div>
  </header>
  <div class="ss-stars">{{ stars(r.rating) }}</div>
  <p>«{{ r.text }}»</p>
</div>
```

**Avatar** — круг 36px с **инициалом** + gradient `linear-gradient(140deg, c1, c2)`, цвета чередуются по 5 тонам (peach / rose / sage / slate / butter). См. функцию `ReviewAvatar` в каноне.

**Текст отзыва** — в кавычках-ёлочках «...», pretty-wrap, max 5 строк (если длиннее — обрезать через CSS `-webkit-line-clamp: 5`).

**Mid-page CTA** под reviews-grid (центрированный):
```html
<div class="ss-center">
  <a href="#book" class="ss-btn ss-btn--primary ss-btn--lg">
    Записаться к {{ site.short_name }} →
  </a>
  <div class="ss-mono ss-faint">ближайшее окно — {{ nearest_slot }}</div>
</div>
```

**`nearest_slot`** — опционально, если есть данные о слотах. Иначе — `"перезвоню в течение часа"`.

**Jinja2-данные** (используя AI-curation из существующего §4 в `CLAUDE_CODE_TZ.md`):
```python
reviews_curated = [
  {
    author: "Наталья К.",         # first_name + initial (PII rule)
    date: "12 апр",                # русская дата (короткая)
    source: "Я.Карты",             # короткая метка
    rating: 5,
    text: "...",
    is_top_pick: bool,             # для ★ ЛУЧШИЙ
    tone: "peach"|"rose"|"sage"|"slate"|"butter",  # детерминированно — hash(author)
  },
  ...
]
site.short_name      # "Анне" — для CTA «Записаться к Анне»; падеж — дательный
nearest_slot: str    # "четверг 14:00" или "в течение часа"
```

---

## 9. About / specialist

**Двухколоночный grid** `0.8fr 1.2fr`, gap 36, `align-items: flex-start`.

**Левый колонок** — фото мастера, 4:5 portrait, radius 16, border 1px.

**Правый колонок:**
1. Eyebrow `О МАСТЕРЕ`
2. H2: имя мастера, 36px (e.g. «Анна Петрова»)
3. Role 15px ink-soft: «Мастер ногтевого сервиса»
4. Bio 15.5px ink: 2–4 предложения, **без шаблонных «команды профессионалов»**
5. **Creds grid** — 2×N карточек на `bgAlt`:
   ```html
   <div class="ss-cred">
     <div class="ss-cred__title">Vivienne Sabo · 2017</div>
     <div class="ss-cred__body">базовый курс</div>
   </div>
   ```
   4 типичные карточки:
   - Курс/обучение
   - Доп. специализация
   - Сан-эпид заключение
   - Юр-статус (самозанятая / ИП / ООО)
6. H3 «Что входит» + список из 4 guarantees с галочками (accent-soft circle):
   - «Все материалы — стерильные, одноразовые»
   - «Покрытие держится 3 недели или возврат»
   - «Удобная парковка во дворе»
   - «Можно с детьми — есть зона ожидания»

**Jinja2-данные:**
```python
about = {
  master_name: "Анна Петрова",
  role: "Мастер ногтевого сервиса",
  bio: "Работаю с 2017 года, прошла обучение в Vivienne Sabo...",
  photo_url: "...",
  creds: [
    { title: "Vivienne Sabo · 2017", body: "базовый курс" },
    ...
  ],
}
guarantees = [
  "Все материалы — стерильные, одноразовые",
  ...
]
```

---

## 10. FAQ — 8 Q&A через native `<details>`

**Без JS.** Используем `<details>/<summary>` для SEO `FAQPage` rich-snippets.

**Структура:**
```html
<section class="ss-faq">
  <header class="ss-center">
    <div class="ss-eyebrow">ЧАСТЫЕ ВОПРОСЫ</div>
    <h2>Что обычно спрашивают</h2>
  </header>
  <div class="ss-faq-list">
    {% for item in faq %}
    <details {% if loop.first %}open{% endif %}>
      <summary>
        <span>{{ item.q }}</span>
        <span class="ss-faq__chevron">+</span>
      </summary>
      <div class="ss-faq__answer">{{ item.a }}</div>
    </details>
    {% endfor %}
  </div>
</section>
```

**CSS:**
- `<details>` — `background: white; border: 1px solid line; border-radius: 12; overflow: hidden;`
- Между ними — gap 8px (flex column).
- `<summary>::-webkit-details-marker { display: none; }` + наш кастомный `+` chevron (26×26 круг, accent на bgAlt).
- При `[open]` — поменять `+` на `–` (через CSS sibling-selector или `:open` если поддерживается).

**Источник вопросов:** 8 фиксированных тем под категорию бизнеса, **генерируются AI'ем при первой публикации**:
1. Гарантия / сроки результата
2. Что если не понравится результат
3. Можно ли отменить / перенести запись
4. Дети / спутники
5. Оплата (карта / СБП / наличные)
6. Гарантия на работу
7. Часы работы / выходные
8. Парковка / как добраться

AI читает источник + категорию + город и пишет ответы. Юзер видит их в личном кабинете и может править.

**SEO:** дополнительно в `<head>` нужен JSON-LD `FAQPage` schema (см. §17).

**Jinja2-данные:**
```python
faq = [
  { q: "Сколько на самом деле держится покрытие?", a: "Гель-лак держится 3 недели..." },
  ... (минимум 5, цель 8)
]
```

---

## 11. Final booking — форма + карта + мессенджеры

Заменяет старую секцию «Записаться». Двухколоночный grid `1.1fr 0.9fr`.

### 11.1 Левый колонок — форма

`background: white; border: 1px solid line; border-radius: 18; padding: 28;`

**Поля (4, в 2×2 grid):**
1. `<label>Как вас зовут</label> <input placeholder="Имя">`
2. `<label>Телефон или @telegram</label> <input placeholder="+7 ___ ___-__-__">`
3. `<label>Услуга</label> <select>` — список из `services` (см. §5)
4. `<label>Удобное время</label> <select>` — варианты: «сегодня, после 18:00» / «завтра, после 14:00» / «в эти выходные» / «другое».

**Под полями:**
- Honeypot: `<input type="text" name="company" tabIndex="-1" style="display:none">`
- Чекбокс ОПД (по умолчанию **не** установлен, обязательный)
- Кнопка submit — **full-width**, 15×24px, terracotta, font-size 16, bold: `Записаться →`
- Под кнопкой: `Mono 11px faint` → `Защищено Yandex SmartCaptcha · невидимо`

**Под формой — separator (border-top) + мессенджеры:**
```
Не любите формы? Напишите в мессенджер:
[ Telegram ]  [ WhatsApp ]  [ Позвонить ]
```
- Telegram: `https://t.me/<handle без @>`, синяя кнопка (#2AABEE-ish — `oklch(0.62 0.13 240)`)
- WhatsApp: `https://wa.me/<phone E.164 без +>`, зелёная (`oklch(0.62 0.14 145)`)
- Позвонить: `tel:<phone E.164>`, outlined.

Все три — 11×18px, font-size 14, weight 600.

### 11.2 Правый колонок — карта + контакты

**Карта** — Яндекс.Карты iframe или статичная карта (Static API), `aspect-ratio: 1/1`, radius 14, border 1px. Внутри карты — кастомный пин с подписью `{{ site.name }}` (через Я.Карт API маркер).

В каноне — SVG-заглушка с пином и подписью «Я.КАРТЫ · ИНТЕРАКТИВНАЯ» внизу. В проде — реальный embed.

**Контактная карточка** под картой:
```
ГДЕ И КОГДА   (mono eyebrow)
📍 {{ site.address }}
🕐 {{ site.hours }}    (например: "пн–сб · 10:00–20:00 · вс выходной")
```

**Jinja2-данные:**
```python
site.hours              # "пн–сб · 10:00–20:00 · вс выходной"
site.tg_handle          # "@studia_anna"
site.whatsapp_e164      # "79212345678" (без +)
site.coords             # { lat: 61.7849, lon: 34.3469 } для карты
site.time_slot_options  # ["сегодня, после 18:00", ...] или авто-генерация
```

### 11.3 Confirmation state

После успешного `POST /api/leads` — заменить **только содержимое формы** (не всю секцию):
```html
<div class="ss-lead-confirm">
  <span class="ss-icon-success">✓</span>
  <div>
    <div class="ss-lead-confirm__title">Заявка отправлена</div>
    <div class="ss-lead-confirm__sub">Перезвоню в течение часа. Можно закрыть страницу.</div>
  </div>
</div>
```

Карта и мессенджеры остаются — клиент может позвонить или написать пока ждёт.

---

## 12. Footer — расширенный

Не однострочный «© ...». Двухстрочный.

**Строка 1:** имя сайта (bold ink) + адрес + телефон (`tel:` link, mono) | справа: «Политика конфиденциальности» + «Реквизиты».

**Строка 2:** «© 2026 {{ site.name }}. {{ site.legal_entity }}.» | справа (только plan=free): «СДЕЛАНО НА **Самосайте** →» (Mono 11.5px, b в sans).

**`legal_entity`** — строка типа «ИП Петрова А. И., самозанятая.» / «ООО «Студия Анны»». Юзер вводит в личном кабинете.

---

## 13. Sticky mobile CTA

**Только mobile (≤640px).** Position: sticky; bottom: 0; z-index: 4.

```
[ОТ 1 500 ₽ · 60 МИН]              [📞]  [Записаться]
[Маникюр у Анны]
```

- Слева: блок с мини-инфой (Mono caption + bold title, 14px). Title — название сайта или категория + имя мастера в коротком падеже.
- Справа: иконка телефона (42×42 квадрат outline) + кнопка «Записаться» (terracotta, padding 12×20).
- `background: rgba(white, 0.96); backdrop-filter: blur(10px); border-top: 1px solid line; box-shadow: 0 -8px 24px -10px rgba(0,0,0,0.15);`

**Логика появления:** после прокрутки за hero (≥600px scrollTop). До этого — скрыт. На странице `#book` — скрыт (нет смысла дублировать).

---

## 14. Anchor navigation

Все CTA-ссылки на форму — `<a href="#book">`. ID секций:
- `#services` — секция услуг
- `#reviews` — отзывы
- `#about` — о мастере
- `#book` — финальная форма
- `#contact` — контактная карточка (на странице — внутри `#book` блока)

`scroll-behavior: smooth` на `<html>`. На каждой anchor-секции — `scroll-margin-top: 80px` (под sticky header).

---

## 15. Color schemes (без изменений vs предыдущей версии)

3 авто-схемы выбираются по dominant photo color: `cream` / `slate` / `sage`. См. функцию `SCHEMES` в `screens-customer.jsx`. Структура одинаковая — меняются только токены (`bg`, `accent`, `line`, etc).

Backend выбирает схему через k-means по доминантным цветам hero-фото:
- Тёплые / бежевые → `cream`
- Чёрно-белые / графитовые → `slate`
- Зелёные / древесные → `sage`

---

## 16. Backend-задачи — что генерит AI

Новые AI-вызовы (помимо уже существующего review-curation из `CLAUDE_CODE_TZ.md §4`):

### 16.1 Hero H1 generation
**Промпт:** «Сгенерируй заголовок для booking-страницы по формуле "<услуга> в <городе> — <главная выгода>". Услуга: <category>. Город: <city>. Что в источнике: <description>. Длина — до 60 символов. Без громких прилагательных ("лучший", "профессиональный"), без CAPS, без эмодзи.»

**Ответ:** `{ h1: str, highlight: str }` — `highlight` это подстрока внутри h1 для terracotta-подсветки.

### 16.2 Hero sub
1–2 предложения, конкретика без воды. Промпт: «Дай 1–2 предложения подзаголовка под H1 "<h1>". Опиши, ЧТО клиент получит, КАК это происходит. Без шаблонов. До 200 символов.»

### 16.3 Services descriptions
Для каждой услуги из источника — `desc` (1–2 предложения, описывает выгоду, не процесс) и `price_hint` (опционально, если цена «за единицу»).

### 16.4 Process steps
4 шага под категорию. Iconset фиксированный (см. §6). Промпт: «Опиши 4 шага клиентского пути для <category> в формате [icon, title, body]. Иконки: calendar, pin, coffee/любой релевантный, sparkles. Тон — спокойный, мастер говорит от первого лица.»

### 16.5 About bio
2–4 предложения о мастере. Парсится из шапки профиля / описания канала / Я.Карт. **Не выдумывать**: если нет данных — оставлять пустым, секция about рендерится без bio (только creds + guarantees).

### 16.6 Guarantees (4)
Под категорию. Промпт: «Что входит в услугу <category>? Дай 4 буллета — конкретные обещания, которые могут быть в реальной студии (стерильность, гарантии, удобства). Не общие "качество и сервис".»

### 16.7 FAQ (8)
По шаблону тем из §10. Промпт: «Сгенерируй FAQ для booking-страницы <category> в <city>. 8 вопросов по темам: гарантия результата, что если не понравится, отмена записи, дети, оплата, гарантия на работу, часы работы, парковка. Каждый ответ — 1–3 предложения, от первого лица мастера. Конкретика, не общие фразы.»

### 16.8 Nearest slot (опционально)
Если в источнике есть данные о расписании — `nearest_slot: "четверг 14:00"`. Если нет — `nearest_slot: "перезвоню в течение часа"`.

### 16.9 Хранение
Новая таблица `site_content_generated`:
```sql
CREATE TABLE site_content_generated (
  site_id            uuid PRIMARY KEY,
  hero_h1            text,
  hero_h1_highlight  text,
  hero_sub           text,
  process_steps      jsonb,    -- [{ icon, title, body }, ...]
  about_bio          text,
  guarantees         jsonb,    -- string[]
  faq                jsonb,    -- [{ q, a }, ...]
  generated_at       timestamptz,
  model_version      text,
  user_edited        bool DEFAULT false  -- если юзер правил, не перегенерируем
);
```

Cron `weekly_curate_reviews` (уже есть) — расширить: если `user_edited=false` и прошло >30 дней — re-generate всё разом по новому источнику.

---

## 17. SEO / metadata

### 17.1 Title / OG
```html
<title>{{ site.hero.h1 }} | {{ site.name }}</title>
<meta name="description" content="{{ site.hero.sub | striptags | truncate(160) }}">
<meta property="og:title" content="{{ site.hero.h1 }}">
<meta property="og:description" content="{{ site.hero.sub }}">
<meta property="og:image" content="{{ site.hero.photo_url }}">
<meta property="og:type" content="website">
```

### 17.2 Structured data

**LocalBusiness** (уже было):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{ site.name }}",
  "address": { "@type": "PostalAddress", "streetAddress": "...", "addressLocality": "{{ site.city }}" },
  "geo": { "@type": "GeoCoordinates", "latitude": ..., "longitude": ... },
  "telephone": "{{ site.phone_e164 }}",
  "openingHours": "Mo-Sa 10:00-20:00",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "38" }
}
```

**FAQPage** (NEW):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "{{ faq[0].q }}",
      "acceptedAnswer": { "@type": "Answer", "text": "{{ faq[0].a }}" } },
    ...
  ]
}
```

**Service** (NEW, опционально — для Я.Поиска по услугам):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Маникюр аппаратный",
  "provider": { "@type": "LocalBusiness", "name": "{{ site.name }}" },
  "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "RUB" }
}
```

---

## 18. Производительность

- **CLS = 0**: все `<img>` имеют `width`+`height`. Hero-photo `loading="eager"` + `fetchpriority="high"`, остальные `loading="lazy"`.
- **LCP <2s**: hero-фото — webp + preload в `<head>`.
- **No CLS from sticky header**: рендерим на сервере с правильной высотой, не подменяем после mount.
- **Total JS на странице <30KB** (только Tailwind + минимум для accordion-чекбоксов, если потребуется).
- Lighthouse: ≥90 на Performance/SEO/Accessibility, ≥95 на BestPractices.

---

## 19. Accessibility

- `<details>/<summary>` для FAQ — нативно accessible, никаких aria-expanded не надо.
- Все CTA — `<a>` с понятным текстом (не «Click here»). `aria-label` для иконочных кнопок (телефон в sticky-header).
- Контраст: ink (oklch 0.215) на bg (oklch 0.972) — WCAG AAA. accent (oklch 0.605 + 0.155 chroma) на bg — проверить AAA для текста ≥18px.
- Skip-link `<a href="#main">К содержанию</a>` в начале `<body>`.
- Focus-visible: на всех CTA — outline 2px accent + offset 2px.

---

## 20. Файлы, которые меняются

| Файл | Что |
|---|---|
| `code/customer-site.html.j2` | Полностью переписать по новой структуре §1–§13 |
| `code/customer-site.css` | Новые токены, sticky-header, services-grid, process-grid, faq-details, sticky-mobile-cta |
| `code/customer-site.js` (опц.) | Только sticky-mobile-CTA show/hide на scroll + smooth scroll polyfill для старых iOS |
| `code/services/site_content_ai.py` | Новый сервис: 8 AI-задач из §16 |
| `code/db/migrations/<n>_site_content_generated.sql` | Новая таблица §16.9 |
| `code/admin/SiteContentEditor.tsx` | UI для редактирования AI-сгенерированных полей (hero_h1, services desc, faq, etc) |
| `code/api/leads.py` | Добавить поля `service_id`, `time_slot` в POST /api/leads |
| `code/api/preview.py` | Без изменений |

---

## 21. Регрессионные риски

1. **Старые `*.vitrina.site` сайты** — после редеплоя получат новую структуру. Нужен флаг `template_version` на каждом сайте; v2 сайты остаются на старом шаблоне до автоматической миграции (re-publish при следующем weekly cron).
2. **Customer-сайты с очень малым контентом** (1-2 услуги, 0 отзывов) — части секций будут пустыми. Reglas:
   - Services <2 — скрыть Process (нечего показывать как «делаем», если услуга одна — Process всё равно полезен, но проверить)
   - Reviews <4 — показать все без curation badge, без mid-CTA
   - Reviews <1 — секцию **не** показывать (вместо неё — больший Gallery или CTA-блок)
   - No master photo → About с blob-плейсхолдером и нейтральным crop
3. **Длинные имена услуг** (>40 символов) — карточки в services могут расползтись. Truncate с `…` через CSS `-webkit-line-clamp: 2`.
4. **Длинные FAQ ответы** — без max-height (накручиваем — ОК).

---

## 22. Тест-чеклист (acceptance)

- [ ] Sticky header виден на всех viewports ≥360px, не дёргается при scroll
- [ ] `tel:` ссылки открывают звонилку на iOS/Android
- [ ] Anchor-jumps корректно учитывают `scroll-margin-top`
- [ ] Mobile carousel в gallery (если 4-col не помещается) — `scroll-snap` работает
- [ ] FAQ `<details>` открывается/закрывается без JS-ошибок
- [ ] Sticky-mobile-CTA появляется после прокрутки за hero, исчезает на `#book`
- [ ] Карта Я.Карт реально открывается интерактивная (не заглушка)
- [ ] Confirmation state после submit формы — без перерисовки страницы
- [ ] Honeypot отсеивает >0 спама в первые сутки после деплоя
- [ ] JSON-LD `LocalBusiness` + `FAQPage` валидируются в `https://search.google.com/test/rich-results`
- [ ] Lighthouse mobile: Performance ≥90, SEO ≥95, Accessibility ≥95
- [ ] CLS = 0 (Web Vitals)
- [ ] AI-генерация работает для 3 канон-кейсов: Студия Анны (Маникюр/Петрозаводск), Барбер Brest (Барбершоп/Самара), Школа йоги Лотос (Хатха-йога/Краснодар) — все 8 AI-задач должны вернуть валидные данные
- [ ] Watermark "Сделано на Самосайте →" — только plan=free
- [ ] Пустой источник (только фото визитки) — рендерится без падений, секции FAQ / Process / Reviews — пустые с осмысленным fallback

---

## 23. Что **НЕ** делаем в этой итерации

- Онлайн-оплата при бронировании
- Личный кабинет клиента (на customer-сайте — там просто страница, без auth)
- Календарь со свободными слотами (`time_slot` пока — текстовый select из 4 опций)
- Многоязычность (только русский)
- Push-уведомления / email-цепочки

Эти фичи живут в waitlist (см. `core/preview/` или `customer-feedback` бэклог).
