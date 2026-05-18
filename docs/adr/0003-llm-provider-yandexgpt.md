# ADR-0003: YandexGPT 5 Pro as sole LLM provider

Date: 2026-05-18
Status: Accepted

## Context

Vitrina отправляет в LLM:
- Текстовое содержимое карточек Y.Maps (название, описание, отзывы)
- Описания TG-каналов, тексты постов
- Bio Instagram-профилей из архивов
- Captions и категории фото

Эти данные содержат **персональные данные** (имена мастеров, телефоны, адреса) — даже после нашей обфускации (`[PHONE]`, `[NAME]`) остаётся достаточно контекста для идентификации.

Согласно ФЗ-152 ст. 18.5, обработка ПДн граждан РФ должна происходить на территории РФ. Передача данных в зарубежные LLM (OpenAI, Anthropic, Google) — **трансграничная передача** и требует либо (а) уведомления РКН с обоснованием, (б) согласия каждого субъекта ПДн на конкретное направление, либо (в) попадает под ст. 272.1 УК РФ (если без оснований) — до 8 лет лишения свободы [verify: точная редакция ст. 272.1 от 2024].

Альтернативы российские: YandexGPT, GigaChat (Сбер), Cotype (МТС/MWS), open-source модели на собственном железе.

## Decision

We will use **YandexGPT 5 Pro** (`yandexgpt/latest` model via Yandex Cloud Foundation Models API) [verify: текущее имя модели на дату запуска] as the **only** LLM provider for content generation in MVP.

- Передача данных строго через Yandex Cloud Foundation Models API
- Folder и API-ключ — на юр.лицо РФ (ИП founder)
- В коде запрещены любые импорты `openai`, `anthropic`, `google.generativeai` — enforced через `.importlinter`

## Alternatives considered

- **GigaChat (Сбер)** — rejected на старте, но возможен дублирующий провайдер позднее. API менее зрелый [verify], документация хуже. Резерв на случай деградации YandexGPT.
- **OpenAI GPT-4o через PII-обфускацию** — rejected. Даже с обфускацией остаётся идентификационная информация (адрес, категория услуги, фото-стиль). Юридически — трансграничная передача. Риск: ст. 272.1 УК РФ.
- **Self-hosted LLaMA 3.1 70B / Qwen 2.5 72B** — rejected для MVP. Требует GPU (A100 ~150k ₽/мес или арендованный slot 30-50k ₽/мес), оплата усложняет unit-экономику. Перевод на self-hosted — возможен на M6+ если стоимость YandexGPT станет узким местом.
- **Cotype (MWS Cloud GPT)** — [verify: SLA и доступность]. Резервируем на будущее.

## Consequences

**Positive:**
- ФЗ-152 compliance straight-forward, никаких трансграничных переводов
- Pricing предсказуемый, оплата с р/с ИП в РФ
- Latency низкая (RU-датацентры)

**Negative:**
- Vendor lock: если YandexGPT деградирует или меняет ToS, нужен миграционный план
- Качество YandexGPT в задачах генерации маркетингового контента вероятно ниже GPT-4o (требует более тщательного prompt engineering, тестов hallucination rate)
- Стоимость per-token может быть выше OpenAI [verify: tariffs Yandex Cloud Foundation Models on launch date]

**Neutral:**
- Все промпт-шаблоны на RU; портабельность к GigaChat/Cotype в случае миграции потребует ре-калибровки few-shot примеров

## Verification

```bash
# 1. Нет импортов запрещённых SDK:
grep -rE "import (openai|anthropic|google\.generativeai)" backend/ && echo FAIL || echo OK

# 2. import-linter правило:
cat backend/.importlinter | grep -A3 "name = no-foreign-llm"

# 3. CI fail на новых зависимостях:
grep -E "^openai|^anthropic|^google-generativeai" backend/poetry.lock && exit 1 || exit 0
```
