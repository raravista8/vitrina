# ЮKassa pricing update runbook — 299 ₽ → 990 ₽

> **One-time operator action** для синхронизации цены подписки в ЮKassa
> с новой landing-копией. Frontend уже показывает **990 ₽/мес** (PR #79,
> commit `c7f61cf`), но реальное списание ЮKassa берёт из своих
> product-settings — пока цена не обновлена в их UI, новый клиент увидит
> на landing 990, а на странице оплаты ЮKassa 299. Это блокер для launch.

## Контекст — почему 299 → 990

Pilot user-testing на 47 мастерах (январь-март 2026) показал что **990 ₽/мес**
воспринимается как «адекватная плата за инструмент, который сам приносит
заявки», тогда как 299 ₽/мес создавал ощущение «дешёвая поделка, наверное
плохо работает». См. v2.1.3 §1.1 + ASSUMPTION-A6 в `docs/PRD.md`.

Дополнительная мотивация — себестоимость одного активного сайта:

- LLM-генерация (YandexGPT первичный билд + еженедельная re-curation) ≈ 30 ₽/сайт/мес
- Cron weekly_analytics_digest + storage ≈ 15 ₽
- Yandex Object Storage + CDN bandwidth ≈ 10 ₽
- **Net unit cost ≈ 55 ₽/сайт/мес**

При цене 299 ₽ маржа была ~80%, после YooKassa-комиссии (3.5%) и налогов
(самозанятый 6%) — операционная маржа ~70%. При 990 ₽ — ~92%, что даёт
buffer на pen-test (P1, 30-50k ₽) и юриста (10-20k ₽) уже на 50 платящих
сайтах, а не на 200+ (см. §10 OQ-3 в `docs/PRD.md`).

## Когда выполнять

**Сейчас** — frontend на проде уже показывает 990 ₽ (см. `curl
-sk https://samosite.online/ | grep '>990<'`). Каждый час задержки в
обновлении ЮKassa создаёт риск конверсионного дисбаланса для нового клиента.

## Step-by-step — операторные действия

> Все шаги — в ЮKassa dashboard (`https://yookassa.ru/my/`). Аккаунт
> владельца (founder@samosite.online). 2FA обязателен.

### 1. Залогиниться в ЮKassa

```
1. Открыть https://yookassa.ru/my/
2. Email: founder@samosite.online
3. Password (из 1Password vault, item «ЮKassa founder account»)
4. 2FA-код из Authy
```

### 2. Найти текущий тариф

```
Меню (слева) → Магазины → vitrina (или «Самосайт» если переименован)
  → Подписки и автоплатежи → Тарифы
```

Должен быть один активный продукт «Pro» с amount = **29900 копеек** (= 299 ₽).

### 3. Открыть «Pro» → Редактировать

```
Клик на строку «Pro» → справа «Редактировать»
```

Откроется форма со следующими полями:

| Поле | Текущее | Новое |
|---|---|---|
| Название тарифа | `Pro` | `Pro` (не менять) |
| ID тарифа | `pro_monthly` или подобный | не менять |
| Цена (в копейках) | `29900` | **`99000`** |
| Валюта | `RUB` | `RUB` |
| Период | `monthly` | `monthly` |
| Активный | ✓ | ✓ |

### 4. Сохранить

```
Клик «Сохранить» внизу формы. ЮKassa попросит подтвердить TOTP-кодом —
вводим из Authy.
```

ЮKassa выдаст подтверждение «Тариф обновлён». При этом:

- **Существующие активные подписки** (если уже есть платящие клиенты) — продолжат
  списываться по СТАРОЙ цене 299 ₽. ЮKassa не пересчитывает цену для
  существующих подписок. Это **правильное поведение** — early adopters не
  должны платить больше из-за нашего ценового решения.
- **Новые подписки** (созданные после этого момента) — будут с amount 99000 копеек.

### 5. Smoke-проверка через test mode

> ⚠️ **Не делать на production-аккаунте!** Test mode у ЮKassa отдельный.

```
1. Переключиться на test-аккаунт (если есть отдельный) или использовать
   ЮKassa test-card 5555 5555 5555 4444 (через test API key).
2. Открыть https://samosite.online (incognito tab).
3. Завершить onboarding до момента «Готовим ваш сайт» (через intake-flow).
4. Дождаться письма от founder@samosite.online с link на admin
   (можно ускорить через manual publish в /founder/admin).
5. В личном кабинете клиента → Настройки → Подписка → «Подключить Pro».
6. На странице оплаты ЮKassa должна показать **«990,00 ₽»** (не 299).
7. Завершить тест-оплату.
8. В админке клиента проверить что `users.plan = 'pro'` и
   `users.plan_until = now() + 1 month`.
```

### 6. Verify через SQL (на VPS)

```bash
ssh deploy@135.106.137.30 \
  "docker compose --env-file /opt/vitrina/.env \
   -f /opt/vitrina/infra/docker-compose.yml \
   -f /opt/vitrina/infra/docker-compose.staging.yml \
   exec -T postgres psql -U vitrina_app -d vitrina_prod \
   -c \"SELECT id, contact_value, plan, plan_until FROM users \
        WHERE plan = 'pro' \
        ORDER BY plan_until DESC LIMIT 3;\""
```

Должны увидеть свежую запись с обновлённым `plan_until`.

### 7. Cleanup test data

```sql
-- На VPS, ТОЛЬКО для test-юзера созданного в шаге 5:
DELETE FROM users WHERE contact_value = '<test-email-from-step-5>';
```

## Что НЕ нужно делать

- ❌ **НЕ** трогать backend код. Цена не hardcoded в репо — backend читает её
  из ЮKassa API через webhook payload в `core/billing/service.py:48`.
- ❌ **НЕ** массово обновлять `users.plan_until` существующих клиентов — они
  должны платить по старой цене до конца текущего billing cycle, и потом
  при next_payment_attempt ЮKassa автоматически возьмёт новую цену.
- ❌ **НЕ** удалять старый тариф. Он остаётся active для grandfather-clients
  (создаются read-only).

## Rollback план

Если по какой-то причине нужно вернуть 299 ₽ (например, если конверсия после
обновления падает >40% на cohort нового тарифа):

```
1. Повторить шаги 1-2 выше.
2. На шаге 3 поменять amount обратно: 99000 → 29900.
3. Сохранить.
4. Откатить landing PR #79 через `git revert c7f61cf` + новый deploy.
5. Cleanup analytics: новая cohort (юзеры с new_plan_until после revert)
   помечается как «pricing experiment failed» — отдельная metric в
   `events.payload.pricing_experiment = 'reverted_2026-05'`.
```

## После выполнения

- [ ] Записать в `docs/legal/pricing-history.md` (создать если нет): дата,
      старая/новая цена, оператор (founder GitHub handle), TOTP-confirmation
      timestamp.
- [ ] Уведомить waitlist email-блок (если есть >0 подписчиков) о launch
      с новой ценой.
- [ ] Mark task #35 как `completed` в task list.

## Связанные документы

- `docs/PRD.md` ASSUMPTION-A6 — гипотеза 990 ₽/мес
- `docs/PRD.md` §10 OQ-3 — pen-test budget mapping
- `backend/app/core/billing/service.py` — где webhook обрабатывает amount
- `backend/app/infrastructure/yookassa/client.py` — клиент-обёртка
- v2.1.3 §1.1 + §2.1 в `CLAUDE_CODE_TZ_session_v2.1.3.md` (canon)
