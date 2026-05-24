# Создание customer subdomain — manual operator workflow

> Pre-launch fake-door. Каждую заявку оператор обрабатывает руками: смотрит
> в `/admin/apps/<id>`, верстает HTML сайт, кладёт его в Yandex Object
> Storage по конкретному префиксу — Caddy сам отдаст его на
> `<subdomain>.samosite.online`. Автоматизация (T2.3 + T2.6) — отдельная
> задача.

## Контекст инфры (как оно сейчас работает)

Per `infra/Caddyfile`:

```
*.samosite.online {
  @api path /api/*
  handle @api { reverse_proxy api:8000 }
  handle {
    @root path /
    rewrite @root /index.html
    # Префикс пути = leftmost subdomain (labels.2 of the host)
    rewrite * /{labels.2}{uri}
    reverse_proxy {$STATIC_ORIGIN_URL} {
      header_up Host {$STATIC_ORIGIN_HOST}
    }
  }
}
```

Что это значит:

- `studia-anna.samosite.online/` → Caddy rewrite-ит на
  `/studia-anna/index.html` → проксит на Object Storage origin
- `studia-anna.samosite.online/styles.css` → `/studia-anna/styles.css`
  → Object Storage
- TLS wildcard уже выписан (acme.sh sidecar в `infra/acme/`,
  `/etc/caddy/certs/`), DNS A-record `*.samosite.online → 135.106.137.30`
  работает (см. ASSUMPTION-A5 в PRD)

То есть **в правильное место положить HTML — и subdomain заработает.**

## Шаги для оператора

### 1. Выбрать subdomain

Convention: kebab-case транслит имени дела, ≤32 chars, без подчёркиваний.

| Имя дела (заявка) | Subdomain |
|---|---|
| Студия маникюра Анны | `studia-anna` |
| Барбершоп Brest | `brest-barber` |
| Психолог Лена Иванова | `lena-psy` |

Проверить что не занято:

```bash
ssh deploy@135.106.137.30 \
  'docker run --rm -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY \
    --env-file /opt/vitrina/.env amazon/aws-cli \
    s3 ls s3://samosite-sites/<subdomain>/ --endpoint-url https://storage.yandexcloud.net'
```

Пустой вывод = свободно.

### 2. Сгенерировать HTML

Варианты:

**(A) Использовать Jinja2-шаблон из репо.** Customer-site v2.1 шаблон
живёт в `sites-template/index.html.j2`. Рендер локально через мини-
скрипт (не входит пока в repo, но можно прогнать руками):

```python
from jinja2 import Environment, FileSystemLoader
env = Environment(loader=FileSystemLoader("sites-template"), autoescape=True)
ctx = {
  "brand_name": "Студия маникюра Анны",
  "city": "Петрозаводск",
  "customer_contact_type": "phone",
  "customer_contact_value": "+79215557788",
  "description": "Маникюр, педикюр, наращивание...",
  # + остальные поля per render.py
}
html = env.get_template("index.html.j2").render(**ctx)
open("/tmp/index.html", "w").write(html)
```

**(B) Сверстать руками.** Минимальный шаблон:

```html
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Студия маникюра Анны — Петрозаводск</title>
  ...
</head>
<body>
  <h1>Студия маникюра Анны</h1>
  <p>Маникюр, педикюр, наращивание · Петрозаводск</p>
  <a href="tel:+79215557788">Записаться: +7 (921) 555-77-88</a>
</body>
</html>
```

### 3. Положить HTML в Object Storage

```bash
ssh deploy@135.106.137.30
cd /opt/vitrina
source .env

# Положить index.html в bucket с префиксом <subdomain>/
aws s3 cp /tmp/index.html \
  s3://samosite-sites/<subdomain>/index.html \
  --endpoint-url https://storage.yandexcloud.net \
  --content-type "text/html; charset=utf-8"

# Если есть ассеты (CSS / IMG):
aws s3 cp /tmp/styles.css \
  s3://samosite-sites/<subdomain>/styles.css \
  --endpoint-url https://storage.yandexcloud.net \
  --content-type "text/css"

aws s3 sync /tmp/site-assets/ \
  s3://samosite-sites/<subdomain>/ \
  --endpoint-url https://storage.yandexcloud.net \
  --exclude "*.html"  # html already uploaded
```

Bucket policy: должен быть **public-read** (Caddy не подписывает запросы).
Если bucket private — Object Storage вернёт 403, Caddy отдаст 502. См.
`infra/scripts/bootstrap-vps.sh` где конфигурится bucket ACL.

### 4. Verify

```bash
# 1. /version-like check (объект существует)
curl -sI https://samosite.online/dummy-endpoint  # main domain — should 200/404 OK

# 2. Sub-domain rendered
curl -sI https://<subdomain>.samosite.online/
# Expect:
#   HTTP/2 200
#   content-type: text/html; charset=utf-8

# 3. Asset paths work
curl -sI https://<subdomain>.samosite.online/styles.css

# 4. Eyeball
open https://<subdomain>.samosite.online/
```

### 5. Записать в базу (optional, для трекинга)

```bash
ssh deploy@135.106.137.30
cd /opt/vitrina
docker compose exec postgres psql -U vitrina vitrina_prod -c \
  "INSERT INTO sites (id, user_id, subdomain, source_type, status, published_at, created_at)
   VALUES (gen_random_uuid(), '<user-uuid-from-applications.user_id>',
           '<subdomain>', 'photo', 'published', now(), now())"
```

Это даст видимость на `/admin/sites` и поможет потом мигрировать на
автоматический publish (T2.3).

## Troubleshooting

| Симптом | Причина | Решение |
|---|---|---|
| `curl https://<sub>.samosite.online/` → 502 | Object Storage 403 (private bucket) | `aws s3api put-object-acl --bucket samosite-sites --key <sub>/index.html --acl public-read` |
| `curl https://<sub>.samosite.online/` → 502 + Caddy logs `dial tcp: lookup storage.yandexcloud.net` | DNS внутри Caddy не резолвит upstream | `docker compose restart caddy` |
| SSL «certificate not yet valid» | Wildcard cert не выписался | `docker compose logs acme` — проверить acme.sh статус. Реcheck → `docker compose exec acme acme.sh --renew --domain *.samosite.online --force` |
| Subdomain резолвится в IP но Caddy не отвечает | DNS resolver кешировал старое | Подождать TTL (60s) или `dig @8.8.8.8 <sub>.samosite.online` |
| HTML отдаётся как `text/plain` | aws s3 cp без `--content-type` | Перезалить с `--content-type "text/html; charset=utf-8"` |

## Что НЕ делать

- **Не редактировать Caddyfile** ради нового subdomain — wildcard ловит всё
- **Не делать DNS A-records** под каждый subdomain — wildcard в Selectel DNS
  обрабатывает (`*.samosite.online → 135.106.137.30`)
- **Не класть файлы в `/opt/vitrina/sites/`** — это локальный диск VPS,
  Caddy в текущем конфиге **не** обслуживает оттуда (`*.samosite.online`
  идёт через `STATIC_ORIGIN_URL` = Object Storage)
- **Не использовать `_underscores`** в subdomain — некоторые DNS-resolvers
  не любят
- **Не давать customer-сайту** одинаковое имя с инфраструктурными
  hostname-ами (`api`, `admin`, `www`, `mail`, etc.) — могут конфликтовать
  с будущими Caddy блоками

## Когда автоматизируем

T2.3 (Site publishing flow) ⇒ admin кликает «Опубликовать» в
`/admin/apps/<id>` → backend рендерит HTML → льёт в Object Storage →
sites row пишется автоматически. Этот runbook становится legacy.

Сейчас этого нет — поэтому manual flow выше.

## Ссылки

- `infra/Caddyfile` — wildcard config
- `infra/acme/` — acme.sh sidecar (wildcard SSL via Selectel DNS API)
- `sites-template/index.html.j2` — customer-site v2.1 Jinja2 шаблон
- `infra/scripts/bootstrap-vps.sh` — Object Storage bucket setup
- `docs/PRD.md` — ASSUMPTION-A5 (wildcard SSL strategy)
- `docs/TASKS.md` — T2.3 (publishing automation roadmap)
