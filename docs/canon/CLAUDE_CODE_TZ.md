# ТЗ для Claude Code · перенос UI-обновлений «Самосайт» в продакшен (v2 — базовый)

> **Действует вместе с более свежими ревизиями:**
> - `CLAUDE_CODE_TZ_landing_v2.1.md` — финальная ревизия лендинга + клиентский ЛК + pixel-perfect tests (перекрывает раздел 1 этого тз)
> - `CLAUDE_CODE_TZ_customer_v2.1.md` — букинг-версия customer-сайтов (перекрывает раздел 3 этого тз)
> - `CLAUDE_CODE_TZ_typography.md` — русские типографские правила (обязательные)
>
> Дизайн-канон лежит в `index.html` + `*.jsx` в корне проекта.
> Прод-код — `/code` (Next.js 16 App Router · React 19 · TS · Tailwind · shadcn/ui · lucide-react · recharts) и `/code/customer-site.html.j2` (FastAPI + Jinja2).
> Эта задача — **поднять прод-код до состояния канона**.

---

## 0. Глобальное

### 0.1 Бренд и домены
| было | стало |
|---|---|
| Витрина | Самосайт |
| `vitrina.site` | `samosite.online` |
| `*.vitrina.site` (customer-сайты) | `*.samosite.online` |
| `@VitrinaIntakeBot` (бот, которого юзер пускает в свой **TG-канал-источник** админом) | `@SamositeIntakeBot` |
| `@VitrinaBot` (личный бот, в который юзер жмёт /start, чтобы получать **уведомления о заявках**) | `@SamositeBot` |

Сделать find-and-replace по всему проекту, **внимательно**:
- `code/**/*.tsx` · `code/customer-site.html.j2` · `code/README.md`
- любые .env / docker-compose / nginx /sentry-конфиги, где захардкожен домен
- ARCHITECTURE.md / PRD.md / COPY.md / ADR-*.md (это в `uploads/`, я уже **не** трогал — пройдись отдельно)
- Email-шаблоны, TG-сообщения от ботов, OG-tags, robots.txt, sitemap.xml

⚠️ **Не путать двух ботов.** Они выполняют разные функции, и UI теперь это разводит явно (шаг 3 онбординга = открыть `@SamositeBot`, экран #4 = добавить `@SamositeIntakeBot` админом в приватный канал).

### 0.2 Wildcard SSL
- Перевыпустить Let's Encrypt DNS-01 wildcard на `*.samosite.online`
- Старый `*.vitrina.site` оставить на 30 дней с 301 на новый поддомен

### 0.3 Логотип
Бренд-марка теперь — **жирная кириллическая «С» (Onest 800) на терракотовой плашке с радиусом 27%**.

CSS-эквивалент (см. `tokens.jsx` → функция `Logo`):

```css
.ss-logo {
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--s, 26px); height: var(--s, 26px);
  border-radius: calc(var(--s, 26px) * 0.27);
  background: oklch(0.605 0.155 35); /* terracotta */
  color: #fff;
  font-family: "Onest", system-ui, sans-serif;
  font-weight: 800;
  font-size: calc(var(--s, 26px) * 0.66);
  letter-spacing: -0.04em;
  line-height: 1;
  padding-bottom: calc(var(--s, 26px) * 0.04); /* optical centering */
}
```

Применить в `code/admin/AdminChrome.tsx`, `code/admin/Login.tsx`, `code/customer-site.html.j2` (футер «сделано на Самосайте» — там тоже мини-С), favicon, og-image, email-шаблонах, TG-уведомлениях ботов.

---

## 1. Landing (`samosite.online`)

Канон: `landing-samosite.jsx`. Полная структура:

1. **Nav** — лого `Самосайт` + (desktop) ссылки «Как это работает / Примеры / Помощь / Войти»; mobile — только «Войти».
2. **Hero** — H1 `Сайт, который сам себя ведёт и приносит вам заявки.` Терракотовая подсветка фразы «сам себя ведёт». БЕЗ старого eyebrow «САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ». Input «ссылка на ваш профиль или сайт» + кнопка `Собрать мой Самосайт →`. Под инпутом: `Первый месяц бесплатно — без карты при регистрации.`
3. **Examples** — 3 карточки с реальным фото + услуги/цены + кураторские отзывы + галерея. **На мобилке** — горизонтальная карусель `scroll-snap-type: x mandatory; scroll-snap-align: start; min-width: 86vw`. Подсказка `← ЛИСТАЙТЕ ВПРАВО →`.
4. **Story** — 6 шагов в зигзаг-раскладке. У каждого своя палитра (peach / butter / sky / sage / rose / lavender) + 2px чёрная рамка + 6px hard-shadow. Стикер «ШАГ N» rotate(-12deg). Между шагами волнистая пунктирная линия.
5. **Platforms** — два списка: «ДОСТУПНО СЕЙЧАС» (Яндекс.Карты, Telegram-канал, 2ГИС, Avito, свой сайт, фото визитки) и «СКОРО ПОДКЛЮЧИМ» (VK, Instagram, WhatsApp, YouTube).
6. **Big features** — 4 блока (см. ниже).
7. **Free-month CTA** — тёмный блок с подарочной иконкой.
8. **Footer** — лого + «© Самосайт · samosite.online · все данные хранятся в РФ».

### Big features (порядок и копирайт)

| Kicker | H3 | Body |
|---|---|---|
| САМ ОБНОВЛЯЕТСЯ | Каждую неделю — свежие посты, фото и цены | Сайт сам подтягивает новое из вашего Telegram-канала или Яндекс.Карт. А если выкатили новую услугу — пришлите фото в личный кабинет, сайт примет и обновится. |
| **САМ ВЫБИРАЕТ ОТЗЫВЫ** *(новый)* | На сайте — только лучшие отзывы. Без ваших усилий | ИИ читает все отзывы из источника, отсеивает «норм», «-», тройки и троллей. На сайт ставит 4–6 самых тёплых и убедительных. Обновляется каждую неделю — если появился ещё круче, заменит. |
| САМ ЛОВИТ ЗАЯВКИ | Заявки сразу в Telegram, MAX или почту | Кнопка «Записаться» на сайте, форма с защитой от ботов и уведомление вам в нужный мессенджер. Никакого CRM. |
| ВЫ — ХОЗЯИН | Можно поправить, поставить на паузу или удалить — за секунду | В личном кабинете видна аналитика посещений и заявок. Сайт принадлежит вам — в любой момент можете забрать или выключить. |

---

## 2. Application intake — **новый 3-шаговый флоу**

Канон: `screens-intake.jsx`. Заменяет старую модалку.

### Шаги

**Шаг 1 · Дайте ссылку**
- Один input для URL.
- Дебаунс 300мс → `GET /api/preview?url=...` → плашка под полем.
- Зелёная плашка `Распознали: <source>` живёт **ЗДЕСЬ**, не на шаге 2. С линком `не то?` который открывает popover со списком альтернативных платформ.
- Inline-список поддерживаемых: `Поддерживаем: Яндекс.Карты · Telegram-канал · 2ГИС · Avito · свой сайт. Полный список →`
- Линк-fallback: `Нет ничего онлайн? Загрузите фото визитки, буклета или работ →`

**Шаг 2 · Куда вам писать?**
- **Явный radio** на 4 канала: Telegram / Телефон / Email / MAX. **Никакого auto-detect.**
- Под radio — input под выбранный канал (с маской: `+7 ...` для phone, `you@example.ru` для email, `@your_handle` для tg/max).
- Чекбокс согласия на ОПД (по умолчанию **не** установлен, см. FR-003).
- Кнопка «Продолжить».

**Шаг 3 · Откройте бота на 1 минуту** *(только если channel === 'telegram')*
- Список из 3 пунктов: найти `@SamositeBot`, нажать «Старт», получить ссылку.
- Кнопка «Открыть» → `tg://resolve?domain=SamositeBot`.
- Polling `GET /api/tg-bot-personal-status?app_id=<id>` каждые 5с → `{ started: bool }`.
- **Всегда** виден fallback: `Нет Telegram или не получается? Получить ссылку на почту →` — POST на `/api/submit-application/finalize-via-email`, флоу завершается на email-канале.

Для **остальных каналов** (phone/email/max) шаг 3 — это сразу confirmation #5.

### Кнопка «Назад»

Появляется на шагах 2+, рендерится как pill-кнопка слева от индикатора прогресса. Не теряет ранее введённые данные.

### API-контракты

```
POST /api/submit-application
{
  source_url: string,
  source: 'yandex_maps'|'telegram'|'twogis'|'avito'|'website'
        | 'instagram'|'vk'|'whatsapp'|'youtube'|'unknown',
  source_override: bool,           // true если юзер кликнул «не то?»
  channel: 'telegram'|'phone'|'email'|'max',
  contact: string,                 // должен валидироваться против channel
  consent_v: ISO-8601 timestamp,
  captcha_token: string
}
→ 201 { app_id, status: 'pending' }
→ 400 если channel/contact mismatch (FR-002a)
→ 400 если consent_v отсутствует
→ 429 если >3/час с одного IP

GET /api/preview?url=<url>
→ 200 {
    source: 'yandex_maps'|... ,
    tier: 'ok'|'soon'|'unknown',
    counts: string|null,           // "нашли 47 постов и 12 фото" — для UI
    override_options: SourceId[]   // для popover «не то?»
  }
→ 408 при таймауте 3с — фронт деградирует до 'ok' без counts

GET /api/tg-bot-personal-status?app_id=<id>          # НОВЫЙ
→ 200 { started: bool }
  started=true как только юзер нажал /start на @SamositeBot

POST /api/submit-application/finalize-via-email      # НОВЫЙ
{ app_id, email }
→ 200 — fallback с TG на email-канал, не теряя данные шагов 1+2
```

### Source detection — новые tier=soon

Добавить в детектор `instagram`, `vk`, `whatsapp`, `youtube`. Регексы определять, но в ответе ставить `tier: 'soon'`. Фронт покажет синюю плашку «скоро» + захочет email для waitlist.

---

## 3. Customer-site template

Канон: `screens-customer.jsx`. Шаблон `code/customer-site.html.j2`.

### Что добавить

**Hero**
- Trust-row: `<N> лет опыта · <M>+ клиентов · <rating> ★`
- Подпись на hero-фото: `ИЗ ИСТОЧНИКА · <photos_count> ФОТО`

**Gallery**
- Заголовок + Mono-подпись `обновляется из источника еженедельно`
- 4-колоночный CSS-grid, первый тайл занимает 2×2 (`grid-column: span 2; grid-row: span 2`)
- Photos уже сейчас из источника — никаких новых API не надо

**НОВАЯ секция «Что говорят клиенты»**
- H2 + строка `4.9 из 5 · 38 отзывов на Яндекс.Картах`
- Mono справа: `★ ЛУЧШИЕ — выбрал ИИ · обновляется каждую неделю`
- Сетка 2×N карточек, у первых 1-2 — badge `★ ЛУЧШИЙ` в правом верхнем углу
- Поля каждой карточки: stars, text (в кавычках), author, date+source (`Я.Карты · 12 апр`)

**About**
- Список из 4 буллетов «✓ что включено» (стерильные материалы, гарантия покрытия, парковка, дети-friendly)

**Services**
- Каждая позиция: `<name> · <duration_mono>` ← left · `<price_mono>` ← right

**Footer**
- Только для plan=free: `Сделано на Самосайте →` (была «Витрине»)

### Реальные фото

В каноне используется Unsplash для демо. **В проде заменить на ваш CDN/Yandex Object Storage**: проходит через `/render` с подписью, проксирует исходники из IG/TG/Я.Карт, делает webp + размеры + cache headers.

---

## 4. **Новый бэкенд-модуль: AI-кураторство отзывов**

Используется в feature «САМ ВЫБИРАЕТ ОТЗЫВЫ» и в секции `customer-site/reviews`.

### Логика

1. Парсер вытаскивает **все** отзывы из источника (Я.Карты → reviews API; TG-канал → комментарии; Avito → отзывы продавцу).
2. Раз в неделю (cron) для каждого опубликованного сайта:
   - YandexGPT 5 Pro получает массив отзывов + бизнес-категорию.
   - Промпт: «Выбери 4–6 самых убедительных и тёплых отзывов для лендинга. Критерии: rating ≥ 4, длина ≥ 30 символов, нет жалоб, нет шаблонных «норм»/«ок», нет упоминаний конкурентов, нет персональных данных кроме имени, нет токсичности.»
   - Ответ: `{ curated_ids: [...], reasoning: string }` (reasoning для аудит-лога).
3. Сохранить в `site_reviews_curated` с `picked_at`, `model_version`, `reasoning`.
4. Перерендерить шаблон сайта.

### Edge cases

- Если в источнике <4 отзывов — показать все (без кураторской метки).
- Если ВСЕ отзывы ≤3 звезды — не показывать секцию вообще, добавить feedback alert фаундеру.
- Если LLM вернул мусор — fallback на топ-N по rating desc, без `★ ЛУЧШИЙ` бейджа.

### Контракт в шаблон

Jinja2 принимает:
```python
reviews_curated = [
  { id, author, text, rating, date_iso, source: 'yandex_maps'|'telegram'|...,
    is_top_pick: bool },
  ...
]
total_reviews_count: int
average_rating: float
review_source_name: str  # "Яндекс.Карты" — для строки "38 отзывов на ..."
```

---

## 5. Watermark customer-site (plan=free)

Текст футера: **Сделано на Самосайте →** (раньше было «на Витрине»). Линк ведёт на `samosite.online?ref=<subdomain>` для viral PLG-метрики.

---

## 6. Admin chrome

`code/admin/AdminChrome.tsx`, `code/admin/Login.tsx`:
- Бренд везде «Самосайт».
- Логотип — тот же терракотовый прямоугольник с «С» (а не текущий `<span className="bg-orange-700">` без буквы).
- Founder email: `founder@samosite.online`.

---

## 7. Что **не** трогать (UI canon уже соответствует)

- Скриниы #2 / #6 / #8 / #9 — структура та же, только rebrand. Уже сделал.
- Login flow, dashboard, leads, waitlist, feedback inbox — структурно идентичны. Только бренд-rename.

---

## 8. Деплой и миграции

1. БД-миграция: добавить таблицу `site_reviews_curated`.
2. Cron `weekly_curate_reviews` в очередь.
3. Старые поддомены `*.vitrina.site` → 301 на `*.samosite.online`.
4. Двойной DNS на месяц.
5. Старые email-уведомления и TG-сообщения от `@VitrinaBot` отправить one-time blast с информацией: «Витрина теперь Самосайт, всё работает как раньше, ваш сайт переехал на `<sub>.samosite.online`».
6. Обновить favicons, og-images, Я.Метрику счётчик (если меняется goal на новый домен).

---

## 9. Файлы канона (для сверки)

| Файл | Назначение |
|---|---|
| `tokens.jsx` | дизайн-токены + `<Logo>`, `<BrandMark>`, `BRAND` |
| `landing-samosite.jsx` | весь лендинг (hero + examples + story + platforms + big features + free month) |
| `screens-intake.jsx` | модалка заявки, 3 шага, бот-invite #4 |
| `screens-customer.jsx` | клиентский сайт #7 + лид-форма #8 + feedback #9 |
| `screens-admin-*.jsx` | админ-экраны #10-19 (rebrand only) |
| `index.html` | артборды (для дизайн-ревью) |

---

## 10. Готово к запуску — чек-лист

- [ ] Brand+domain+bots переименованы во всех .tsx / .j2 / .md / .env
- [ ] Wildcard SSL `*.samosite.online`
- [ ] DNS 301 со старого домена
- [ ] Лого `<С>` применён в админке, customer-site footer, favicon, og-image
- [ ] `POST /api/submit-application` принимает новые поля `channel`, `source`, `source_override`
- [ ] `GET /api/preview` отдаёт `tier`, `counts`, `override_options`
- [ ] `GET /api/tg-bot-personal-status` реализован
- [ ] `POST /api/submit-application/finalize-via-email` реализован
- [ ] Source detection знает 9 платформ (4 ok + 4 soon + unknown)
- [ ] Cron `weekly_curate_reviews` поднят
- [ ] Шаблон `customer-site.html.j2` принимает `reviews_curated`
- [ ] Watermark текст обновлён
- [ ] Tests: новый флоу 3-шага E2E, кнопка «Назад», fallback на email
