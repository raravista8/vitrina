# `docs/canon/` — внешние ТЗ из Claude Design

Раздел для **внешних ТЗ-документов** — спецификаций которые pretened
to be «source of truth» для landing/customer-site/intake UI, но не
являются частью основного PRD/COPY workflow.

Эти файлы поступили из Claude Design sessions (ZIP-архив
`~/Desktop/самосайт финал.zip`) и описывают visual specs, copy
canon, structural changes между итерациями. В этом репо они хранятся
**как историческая reference** — каждая v2.1.3 правка которая была
implemented в production (PR'ы #79-#89) ссылается на конкретную
секцию из этих доков.

## Файлы

| Файл | Что описывает | Связанные PR'ы |
|---|---|---|
| `CLAUDE_CODE_TZ.md` | Базовая v2 итерация — бренд, intake flow, customer v2 | (legacy, superseded by v2.1) |
| `CLAUDE_CODE_TZ_landing_v2.1.md` | Финал лендинга (9 секций) + клиентский ЛК | #79-83 |
| `CLAUDE_CODE_TZ_customer_v2.1.md` | Customer-site как booking-page (10 секций, sticky header, masonry) | #86 (9a), #87 (9b), #88 (9c) |
| `CLAUDE_CODE_TZ_typography.md` | Русские типографские правила (nbsp, кавычки, тире) | #85 |
| `CLAUDE_CODE_TZ_session_v2.1.3.md` | Финал сессии — 36 changelog пунктов, backend tasks, 23 AC | **главный driver** PR'ов #79-89 |

## Когда использовать эти файлы

**Для context recovery:** если нужно понять «почему мы сделали X» —
ссылка на §N из соответствующего ТЗ часто живёт в commit message
или PR description.

**Для regression проверки:** при следующем landing/customer redesign
canon из v2.1.3 — baseline что было implemented. Если фича снова
ломается — сверить с § текста.

**НЕ использовать как:**
- Source of truth для современного copy — это `docs/COPY.md`
- Spec для product roadmap — это `docs/PRD.md` + `docs/TASKS.md`
- Single source для visual canon — это `tailwind.config.ts` +
  `landing/components/*` (живой код)

## Несоответствие между canon и production

Local-canon из этих TZ → production реализация **частично расходится**
в нескольких местах (в commit logs PR'ов есть explicit rationale).
Наиболее заметные:

- v2.1.3 §2.5 говорит удалить 3 backend endpoints (intake 3→2 шага).
  Не сделано — пользователь явно отложил как RISKY. См. `docs/TASKS.md`
  Phase 6.
- v2.1.3 §1.5 говорит порядок секций «Hero → Examples → Story →
  Platforms → BigFeatures → Pricing → FAQ → Free-month». Production
  добавил AnalyticsSection между BigFeatures и Pricing (PR #84) —
  не описано в TZ §1.5 но соответствует §2.2 Analytics spec.
- Customer-site v2.1 переход (PR #86-88) сделан через **atomic
  template rename** с legacy сохранением как `.legacy`. Spec этого
  не требует — это implementation detail для safe rollback.

## Связанные документы в репо

- `docs/PRD.md` — единственный source of truth для product features
- `docs/COPY.md` — canonical copy для landing/customer/intake
- `docs/TASKS.md` — что в backlog, что в работе, что готово
- `docs/runbooks/customer-site-v21-rewrite-plan.md` — план split-3-PR
  для Phase 9 implementation (история процесса)
