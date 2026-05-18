# ADR-0004: Instagram out of scope for MVP — redirect to photo-upload flow

Date: 2026-05-18 (revised)
Status: Accepted (supersedes previous version that proposed user-uploaded archive flow)

## Context

Instagram изначально планировался как один из четырёх источников Vitrina. После анализа UX, юридического ландшафта и unit-economics — фича исключена из MVP полностью.

### Что было рассмотрено в предыдущей версии этого ADR

- Прямой scraping IG — отвергнут (Meta признана экстремистской в РФ, нарушение IG ToS, риск IP-банов)
- Instagram Graph API — отвергнут (требует Meta App Review, юр.лицо в дружественной юрисдикции)
- User-uploaded archive (ZIP, выгруженный через «Download Your Information») — **первоначально выбран**, но при ближайшем рассмотрении провалился по UX

### Почему archive-flow не работает на практике

| Проблема | Деталь |
|---|---|
| Задержка от Meta | 24-48 часов от запроса до готовности ZIP |
| VPN-зависимость | IG заблокирован в РФ → юзер должен знать как настроить VPN → отсекает 40-60% ICP |
| Размер архива | 5-50 GB у активных мастеров; наш upload limit 100 MB → юзер должен выбрать «только посты» в UI Meta, что не интуитивно |
| Фрагильность формата | Meta периодически переименовывает поля JSON; нужны fixtures за разные годы, тесты на 3+ архивах разных эпох; постоянная maintenance debt |
| Юр-маркер в UI | Каждое упоминание IG требует marker «Meta — экстремистская» по 38-ФЗ, что усложняет copy и эстетику лендинга |
| Ожидаемая конверсия флоу | <5% от тех, кто начнёт (по аналогии с GDPR data export flows) |

Решение: **drop entirely**. Юзер из IG получает sensibler альтернативу — загрузить фото руками (флоу S4), что занимает 60 секунд вместо 48 часов.

## Decision

We will exclude Instagram from MVP **in every form**:

1. **No scraping.** Запрещены импорты `instaloader`, `instagram_private_api`, `instagrapi` — enforced через `import-linter` (ADR-0002).
2. **No archive upload.** Не реализуем парсер ZIP-архивов Meta. Соответствующая задача T3.8 удалена из TASKS.md.
3. **No Graph API.** Не регистрируем Meta App, не создаём аккаунт в Meta Business Manager.
4. **Redirect at Hero level.** Если юзер вставляет `instagram.com/...` URL в Hero input, frontend показывает inline-сообщение:
   > «Instagram напрямую не парсим. Сохраните 10-20 ваших лучших фото из Instagram в галерею телефона и загрузите их сюда — сайт будет готов за 2 минуты.» [Загрузить фото →]
5. **Минимизировать упоминания IG в copy лендинга.** В Hero — не упоминается совсем. В FAQ — одно упоминание: «Как сделать сайт из Instagram? — Сохраните ваши фото и загрузите их через [📷 Просто фото]».
6. **Юр-маркер «Meta — экстремистская»** требуется только там, где IG явно упомянут в текстах сайта (FAQ-секция). На Hero, в Source detection error, в форме — НЕ требуется, так как мы не предлагаем работать с IG.

## Alternatives reconsidered

- **Archive upload (previous decision)** — отвергнут после анализа выше. См. контекст.
- **«Photo-only» как переименованный IG-flow** — отвергнуто как entry-point: создаёт ложное обещание «работаем с IG». Reality: мы работаем с фото, которые юзер может взять откуда угодно, в том числе из IG.
- **Drop IG mention completely** (даже не упоминать «загрузите фото из IG») — отвергнуто: разумно показать юзеру, который вставил `instagram.com/...`, как ему помочь. Это редирект, не promo IG.

## Consequences

**Positive:**
- **-5 дней разработки**: T3.8 (IG archive adapter) удалена; нет тестов на 3+ архивах разных лет
- **-1 артефакт maintenance debt**: формат ZIP Meta не отслеживаем
- **Меньше юр-сложности**: маркер «Meta — экстремистская» только в FAQ, не в основных flow
- **Выше конверсия**: юзер из IG идёт по флоу S4 (60 сек) вместо S3 (48 часов)
- **Чище лендинг**: copy не загромождён disclaimer'ами

**Negative:**
- Часть ICP, у кого «весь контент в IG», может почувствовать что продукт «не для них». Mitigation: copy на Hero подчёркивает «или просто загрузите фото» — это работает для тех, у кого нет источников.
- Bio Instagram-аккаунта мастера могло бы дать LLM хороший «голос бренда» материал. Реальность: bio типа «Маникюр в Самаре 🤍 запись в директ» не добавляет ценности генератору. Категория + город + фото — этого хватает.

**Neutral:**
- Возможный re-introduction архив-флоу в M6+ если будет явный сигнал от 5+ платящих юзеров с запросом. Тогда — новый ADR-0004-v3.

## Risks accepted

- Юзеры с раздутым Instagram-портфолио, которые **не хотят** руками выбрать 20 фото — потенциально теряем. Acceptable: cooler-headed выбор фото даёт **лучший** сайт (юзер сам отбирает лучшее).
- Конкуренты могут анонсировать «парсим Instagram прямо» — потенциальная conversion-leakage. Acceptable: их конкурентное преимущество хрупко (юр.риски + IG ToS).

## Verification

```bash
# 1. Запрещённые библиотеки отсутствуют:
grep -rE "^(instaloader|instagram[_-]private|instagrapi)" backend/poetry.lock && exit 1 || exit 0

# 2. Нет адаптера IG в core:
test ! -f backend/app/core/parsing/adapters/ig_archive.py

# 3. Нет ссылок на IG в Hero copy лендинга:
grep -i "instagram\|инстаграм" landing/components/Hero.tsx
# Должно быть 0 совпадений

# 4. Redirect при paste IG URL работает:
pytest landing/__tests__/hero.test.tsx -k "instagram_redirect"

# 5. FAQ упоминание есть и содержит legal marker:
grep -A2 "Instagram" landing/content/faq.mdx | grep -c "экстремистск"  # >= 1
```

## Open questions

- **OQ-4.1**: Если рекламируем продукт в TG-каналах для мастеров красоты, где аудитория в основном IG-driven, нужен ли явный «не для IG-only» disclaimer в рекламе? Решить при cold-start маркетинге.
- **OQ-4.2**: Будет ли в FAQ-копии нужен полный юр-маркер «Meta Platforms Inc., признанной в РФ экстремистской организацией» или достаточно короткой формы? Уточнить у юриста (входит в OQ-1 PRD).
