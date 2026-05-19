# infra/

Local-dev and production-shaped Docker Compose for Vitrina.

## Files

| Path                          | What it is                                                                    |
|-------------------------------|-------------------------------------------------------------------------------|
| `docker-compose.yml`          | Production-shape stack: postgres, redis, api, parser/content/sync-workers, tg-bot, landing |
| `docker-compose.dev.yml`      | Local-dev overrides — port exposes, code bind-mounts, hot reload              |
| `postgres/init/`              | SQL run on first `docker volume create` (T1.1 fills with role setup)          |
| `redis/redis.conf`            | Redis 7 config (appendonly, LRU)                                              |
| `Caddyfile`                   | Production: TLS termination, wildcard cert via Let's Encrypt DNS-01 + Selectel DNS, reverse-proxy to landing/api/Object-Storage |
| `Caddyfile.dev`               | Dev: `tls internal` (local CA, no ACME), proxies `*.localhost` to landing+api |
| `caddy/Dockerfile`            | Custom Caddy build via xcaddy with `caddy-dns/selectel` (the upstream image lacks the Selectel plugin) |

## Topology (T0.3)

Two Docker networks enforce SECURITY.md §2 boundaries:

```
                ┌─────────── internal_net ─────────────┐
                │   api  ─┐                            │
                │         ├──▶ postgres (no host port) │
                │ sync-w ─┤                            │
                │ tg-bot ─┘                            │
                │                                     │
                │  redis ◀──────── queue ◀────────┐   │
                └─────────────────────────────────│───┘
                                                  │
                ┌─────────── parser_net ──────────│───┐
                │  parser-worker ─┐               │   │
                │                 ├─▶ redis (joined) │
                │  content-worker ┘                  │
                │                                     │
                │  ↳ outbound HTTPS to YandexGPT, YMaps, TG, etc.
                └─────────────────────────────────────┘
                                ✗ NO route to postgres
```

`parser-worker` and `content-worker` live on `parser_net` only. The
verification command below confirms they cannot reach postgres.

## Bring it up

```bash
# First time only — create .env (auto-done by `make dev`, edit secrets after)
cp .env.example .env

# Bring everything up
make dev

# Watch logs
make dev-logs

# Tear down
make dev-down
```

## Verify network isolation

`SECURITY.md T5.4` requires that parser-worker has no route to postgres.

```bash
make dev-verify-isolation
# Expected output: "OK: parser-worker is isolated from postgres"
```

Manual equivalent:

```bash
docker compose --env-file .env -f infra/docker-compose.yml exec -T parser-worker \
    python -c "import socket; socket.create_connection(('postgres', 5432), timeout=2)"
# Should fail with NameResolutionError / TimeoutError
```

## Verify services are alive

```bash
make dev-ps                                          # all containers running
curl http://localhost:8000/healthz                   # api → {"ok":true,...}
docker compose --env-file .env -f infra/docker-compose.yml exec postgres \
    pg_isready -U vitrina_app -d vitrina             # postgres → accepting connections
docker compose --env-file .env -f infra/docker-compose.yml exec redis redis-cli ping  # PONG
```

## TLS / wildcard cert (T2.4)

Production Caddy obtains a wildcard cert for `*.vitrina.site` via ACME
DNS-01 against the Selectel DNS API. The upstream `caddy:2-alpine` image
doesn't bundle that provider, so `infra/caddy/Dockerfile` rebuilds Caddy
via xcaddy with `github.com/caddy-dns/selectel`.

To deploy:

1. Issue a Selectel DNS API token (my.selectel.ru → IAM → API keys,
   scope `dns:zone:rw` for the `vitrina.site` zone).
2. Populate `.env`:
   ```
   ACME_EMAIL=founder@vitrina.site
   SELECTEL_DNS_API_TOKEN=<token>
   ```
3. `docker compose -f infra/docker-compose.yml up -d caddy`

Caddy auto-renews the cert ~30 days before expiry — no cron job needed.
Manual rotation: `docker compose exec caddy caddy reload`.

Smoke check after deploy:

```bash
curl -sI https://www.vitrina.site | head -2          # 200 from landing
curl -sI https://api.vitrina.site/healthz | head -2  # 200 from api
curl -vI https://probe.vitrina.site 2>&1 | grep "subject:"
#   ↑ subject CN must contain *.vitrina.site (wildcard delivered)
```

## What lands later

- **T8.1** adds `infra/scripts/backup-pg.sh` and cron for nightly gpg-encrypted pg_dumps.
