# infra/

Local-dev and production-shaped Docker Compose for Vitrina.

## Files

| Path                          | What it is                                                                    |
|-------------------------------|-------------------------------------------------------------------------------|
| `docker-compose.yml`          | Production-shape stack: postgres, redis, api, parser/content/sync-workers, tg-bot, landing |
| `docker-compose.dev.yml`      | Local-dev overrides — port exposes, code bind-mounts, hot reload              |
| `postgres/init/`              | SQL run on first `docker volume create` (T1.1 fills with role setup)          |
| `redis/redis.conf`            | Redis 7 config (appendonly, LRU)                                              |
| `Caddyfile` / `Caddyfile.dev` | Placeholder. T2.4 wires production wildcard SSL via Selectel DNS-01           |

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

## What lands later

- **T1.1** populates `postgres/init/` with DB roles (`vitrina_app`, `vitrina_readonly`, `vitrina_audit_writer`) per SECURITY.md T4.2.
- **T2.4** replaces both `Caddyfile`s with the real wildcard-SSL config and routes traffic via UNIX socket to api (mitigates threat T2.1).
- **T8.1** adds `infra/scripts/backup-pg.sh` and cron for nightly gpg-encrypted pg_dumps.
