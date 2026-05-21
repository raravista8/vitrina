# ADR-0010 — AI-кураторство отзывов

**Status:** Accepted  ·  **Date:** 2026-05-21  ·  **Supersedes:** —

## Context

В v1 customer-сайта блок отзывов рендерился as-is из источника — все отзывы которые
парсер вытащил, без выбора. На реальных Я.Карт-карточках это означало: 30+ отзывов
вида «норм», «—», «3» вперемешку с парой действительно тёплых. Лендинг такого мастера
выглядел слабее, чем мастер по факту работает.

В v2 COPY.md §2.6 («Big features» #2) обещание «На сайте — только лучшие отзывы.
Без ваших усилий» — это **дифференциатор продукта**, никто из конкурентов (Tilda,
Nethouse, WIX) такого не делает. Это и оправдывает «AI»-часть позиционирования
(до этого AI был только в сборке сайта, не в его поддержании).

Также мы НЕ хотим: давать мастеру панель «выбрать какие отзывы показывать» — это
противоречит CVP «не требует ни строчки текста от вас» и провоцирует subjective
cherry-picking (а это юридически чувствительно — РКН считает рекламные коммуникации
с отобранными отзывами «недостоверной информацией о потребительских свойствах»).

## Decision

Раз в неделю **YandexGPT 5 Pro** (per ADR-0003) для каждого опубликованного сайта
**самостоятельно** выбирает 4–6 отзывов из источника по следующим критериям и
сохраняет результат в новую таблицу `site_reviews_curated`.

### Промпт (template `core/reviews/prompts/curate.j2`)

```
Ты выбираешь отзывы для лендинга <category>-мастера <name>.

Критерии выбора:
1. rating ≥ 4
2. длина ≥ 30 символов
3. нет шаблонных «норм», «ок», «-», «3»
4. нет упоминаний конкурентов
5. нет токсичности и оскорблений
6. нет персональных данных кроме имени и first-letter фамилии
7. нет жалоб (отзыв должен продавать, не предостерегать)

Из массива ниже выбери 4–6 самых тёплых и убедительных. Если подходит < 4 — верни сколько есть.

<user_content>
[{id, author, rating, text, date}, ...]
</user_content>

Верни строго JSON:
{
  "curated_ids": [...],
  "reasoning": "одна строка — почему именно эти"
}
```

`<user_content>` тэги обязательны (FR-020 prompt injection guard). PII в `author`
обфусцируется в `[NAME]` перед отправкой, восстанавливается локально по `id`.

### Trigger

Cron `weekly_curate_reviews` (RQ scheduler) — каждый вторник 04:00 MSK. Для каждого
`sites.status='published'` сайта:

1. Парсер заново тянет отзывы из источника (использует существующий
   `core/parsing/adapters/<source>.py`).
2. `core/reviews/curator.py::curate(reviews, category)` вызывает YandexGPT.
3. Output идёт через `bleach.clean(allowed_tags=[])` (FR-022).
4. Запись в `site_reviews_curated`:
   - `site_id, picked_at, model_version, prompt_version, reasoning,
     curated_review_ids: int[], audit_payload: jsonb`
5. Re-render шаблона сайта.

### Edge cases

| Условие | Поведение |
|---|---|
| < 4 отзывов в источнике | Показать все, без `is_top_pick` badge |
| Все отзывы ≤ 3★ | Секцию вообще не рендерить + feedback alert founder'у |
| YandexGPT недоступен > 24h | Fallback: `ORDER BY rating DESC, length(text) DESC LIMIT 6`, без `is_top_pick` badge |
| YandexGPT вернул не-JSON / мусор | Тот же fallback + Sentry warning |
| YandexGPT вернул < 4 `curated_ids` | Показать сколько есть, дополнить fallback до 4 |
| Output содержит запрещённые токены (URL не из allowlist, `<script>`, persona-data > имя) | Reject + retry с тем же входом до 3 раз, потом fallback |

### Audit log

Per ADR-0006 / SECURITY.md A09 — каждый run cron'а логирует:
`site_id, run_id, input_reviews_count, output_curated_ids, reasoning, model_version,
tokens_in, tokens_out, latency_ms`. Retention 90 дней.

## Consequences

**+** Дифференциатор «Сам выбирает отзывы» становится реальным, не маркетинговым.
**+** Customer-сайты выглядят сильнее без участия мастера.
**+** Чистая отделимость: `core/reviews/` ports + adapters, легко выключить
      `FEATURE_REVIEW_CURATION_ENABLED=false`.

**-** Стоимость: ~30₽ за сайт за прогон × 100 сайтов × 4 раза в месяц = 12 000₽/мес
      на full-scale MVP. Bounded by `MONTHLY_LLM_BUDGET_RUB`; при достижении 80%
      cron приостанавливается (FR-023).
**-** Юридический риск: если LLM выберет отзыв с чужими PII (имя+фамилия+город) —
      это нарушение ФЗ-152. Mitigation: hard regex-filter после LLM, отдельная
      validate-функция `core/reviews/pii_filter.py`.
**-** Risk: LLM может «согласовать» подделанный отзыв (если в источнике сидит
      fake-review от самого мастера). Это вне области защиты — мы parsing'ом не
      проверяем authenticity, как и Я.Карты.

## Alternatives considered

| Alt | Why rejected |
|---|---|
| Human curation (founder выбирает) | Не масштабируется (>20 сайтов = full-time job); противоречит CVP «не требует от вас» |
| Top-N by rating | Слишком грубо — «★★★★★ норм» обгоняет «★★★★ Анна — настоящий профессионал, рекомендую друзьям…» |
| Per-master dashboard «выбрать какие показать» | Cherry-pick risk (РКН), противоречит CVP |
| No curation, all reviews | Текущее v1 поведение — слабые лендинги |
| Crowd-rated (юзеры голосуют) | Cold-start, не масштабируется |

## Implementation tasks (TASKS.md E13)

- T13.1 [P0] DB migration `site_reviews_curated`
- T13.2 [P0] `core/reviews/curator.py` + ports
- T13.3 [P0] `core/reviews/prompts/curate.j2` + version в env
- T13.4 [P0] `core/reviews/pii_filter.py` — post-LLM strict regex check
- T13.5 [P0] Cron `weekly_curate_reviews` в RQ scheduler
- T13.6 [P0] Update Jinja2 шаблона `sites-template/components/reviews.html.j2`
  чтобы рендерил `is_top_pick` badge
- T13.7 [P1] Admin view `/admin/sites/{id}/reviews-curation` — посмотреть последний
  reasoning + manual override
- T13.8 [P1] Feedback alert founder'у когда все отзывы ≤3★

## Related

- ADR-0003 — LLM provider YandexGPT
- ADR-0006 — PII encryption (audit log retention)
- COPY.md §2.6 — Big features #2 «САМ ВЫБИРАЕТ ОТЗЫВЫ»
- COPY.md §4.3 — Customer-site reviews section
- FR-020/-022/-024 — prompt injection / output sanitization / output validation
- FR-023 — LLM budget control
