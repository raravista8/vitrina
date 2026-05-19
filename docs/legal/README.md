# docs/legal/

Workspace for юридические артефакты, которые НЕ являются кодом, но нужны для пре-лонч чек-листа (SECURITY.md §10):

| Файл | Назначение | Триггер появления |
|---|---|---|
| `lawyer-review.md` | Меморандум юриста-консультанта об одобрении политики + оферты + конструкции «оператор vs обработчик» | Подписание договора с юристом РФ-специализации |
| `rkn-notification-submitted-YYYY-MM-DD.pdf` | PDF-квитанция о подаче уведомления через `pd.rkn.gov.ru` | После §3 runbook'а в `docs/runbooks/rkn-notification-submission.md` |
| `data-processing-agreement-template.docx` | Шаблон договора Vitrina ↔ владелец сайта на обработку лидов конечных посетителей (мастер = оператор лидов посетителей, Vitrina = обработчик) | После юр-ревью OQ-S1 из SECURITY.md |
| `dpa-master-signed-YYYY-MM-DD.pdf` | Подписанный DPA с конкретным мастером | По мере регистраций |

## Что НЕ кладём сюда

- Доверенности / ЭЦП-файлы / приватные ключи — это в физический сейф + 1Password vault (SECURITY.md §5).
- Реестровые карточки субъектов — это `consents` + `applications` в Postgres, не файлы.
