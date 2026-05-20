# VPS bootstrap — Vitrina staging

> **TL;DR.** A fresh Ubuntu 24.04 LTS VPS becomes a Vitrina-ready host in
> ~3 minutes with `sudo ./infra/scripts/bootstrap-vps.sh`. Repo clone +
> secret generation + smoke test are documented below but not automated
> on purpose — they require operator decisions (which branch to clone,
> where to put the secrets, whether the host has S3/captcha/TG creds
> ready). The script ships everything else.

## Why this exists

`make dev` works against Docker locally but does nothing about the host.
On a fresh Selectel/Yandex VPS the founder needs:

- Linux hardening (timezone, swap, kernel updates, unattended security
  upgrades)
- Docker Engine + Compose v2
- Per-app directories with the right user/perms
- A clean handoff for the secret-generation step

The bootstrap script automates everything except the last point.

## Current staging host

| Field | Value |
|---|---|
| IP | `135.106.137.30` |
| OS | Ubuntu 24.04.4 LTS (`noble`), kernel `6.8.0-117-generic` |
| Login | `ssh deploy@135.106.137.30` (SSH key only) |
| Sudo | `deploy` is in `sudo` group, `NOPASSWD` is set |
| Timezone | `Europe/Moscow` |
| Swap | 4 GB `/swapfile`, swappiness=10, vfs_cache_pressure=50 |
| Firewall | UFW active — only 22/80/443 inbound |
| Brute-force | `fail2ban` active with `sshd` jail |
| Auto-updates | `unattended-upgrades` active |
| Docker | 29.5.1 (CE), Compose v5.1.3 |
| Repo | `/opt/vitrina/` (commit `6d6aad9` — last PR-I merge) |

## Running the script

### First time

```bash
ssh deploy@<host>
cd /opt/vitrina  # or wherever the repo is checked out
./infra/scripts/bootstrap-vps.sh
```

The script may reboot at the end if a kernel update is pending. SSH will
drop; reconnect after ~30–60s.

### Re-running

The script is idempotent. Every step prints `[ok]` (no change) or
`[changed]` (action taken). Safe to invoke from CI, cron, or after a
panicked recovery.

### Dry-run

`./infra/scripts/bootstrap-vps.sh --dry-run --no-reboot`

Shows everything it _would_ do without touching the host. Use this when
porting to a new VPS provider to see the action list first.

## What's NOT in the script (operator does these)

### 1. Clone the repo

The repo lives at `/opt/vitrina`. The directory already has
`data/postgres`, `data/redis`, `backups/` subdirectories created by
the script, so a plain `git clone https://github.com/raravista8/vitrina.git .`
fails with _"destination path '.' already exists and is not an empty
directory."_ Use this instead:

```bash
cd /opt/vitrina
git init -q
git remote add origin https://github.com/raravista8/vitrina.git
git fetch --depth=1 origin main
git checkout -B main FETCH_HEAD
```

### 2. Generate secrets

```bash
cd /opt/vitrina
python3 - <<'PYEOF'
import base64, os, secrets
print("FERNET_KEYS=" + base64.urlsafe_b64encode(os.urandom(32)).decode())
print("JOB_HMAC_KEY=" + secrets.token_urlsafe(32))
print("BACKUP_PASSPHRASE=" + secrets.token_urlsafe(32))
print("SESSION_SECRET_KEY=" + secrets.token_urlsafe(32))
print("POSTGRES_PASSWORD=" + secrets.token_urlsafe(24))
print("VITRINA_APP_PASSWORD=" + secrets.token_urlsafe(24))
print("VITRINA_READONLY_PASSWORD=" + secrets.token_urlsafe(24))
print("VITRINA_AUDIT_WRITER_PASSWORD=" + secrets.token_urlsafe(24))
PYEOF
```

Copy the output into `/opt/vitrina/.env.secrets` and `chmod 600` it.
The first three values (`FERNET_KEYS`, `JOB_HMAC_KEY`, `BACKUP_PASSPHRASE`)
also belong in 1Password — they're the recovery material for
ciphertext + audited job payloads + encrypted backups. Lose them and
historical leads become unreadable.

### 3. Assemble `/opt/vitrina/.env`

`.env.secrets` carries only the random material. Combine it with the
non-secret defaults from `.env.example` to build the final `.env` that
`docker compose` reads:

```bash
cd /opt/vitrina
# Bring the non-secret defaults in, then append the secrets at the end.
# Compose uses the LAST value wins on duplicate keys.
{ cat .env.example; cat .env.secrets; } > .env
chmod 600 .env
# Tweak environment-specific values (ENVIRONMENT, *_BASE_URL, etc.)
vim .env
```

For the staging host shipped today, `.env` already exists with sane
defaults (`ENVIRONMENT=staging`, URLs pointing at `staging.samosite.online`,
`DEBUG=false`, `UPLOADS_DIR=/var/lib/vitrina/uploads`). See the diff in
`/opt/vitrina/.env` versus `.env.example`.

### 4. Smoke test

```bash
cd /opt/vitrina
docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml up -d postgres redis
docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml ps
docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml exec postgres pg_isready -U vitrina_migrator -d vitrina
docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml exec redis redis-cli ping
docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.dev.yml down
```

This brings up only the infra layer (no app, no workers) — see
`/opt/vitrina/smoke-test-20260520.log` for the verified run.

### 5. Network-isolation check (SECURITY.md T5.4)

The compose file ships two Docker networks:

- `internal_net` — app, workers, postgres, redis
- `parser_net` — parser-worker, redis only (NO postgres)

T5.4 says: a compromised parser-worker must not be able to reach
postgres. Verify with:

```bash
docker compose up -d postgres redis
# Confirm postgres is NOT on parser_net:
docker network inspect infra_parser_net --format '{{range .Containers}}{{.Name}} {{end}}'
# Live DNS probe — should NXDOMAIN, because parser_net does not resolve
# the "postgres" container name:
docker run --rm --network infra_parser_net alpine:3.20 \
    sh -c 'timeout 3 nslookup postgres 127.0.0.11 2>&1 || echo "DNS_NOT_RESOLVED — isolation works"'
```

Logged from the 2026-05-20 staging run:

```
=== T5.4 isolation: parser_net DNS resolution test ===
** server can't find postgres: NXDOMAIN
DNS_NOT_RESOLVED_CORRECT_BEHAVIOR (exit 1)
```

## Recovery / DR

### If the VPS is rebuilt from scratch

1. `ssh deploy@<new-host>` (key from `~/.ssh/id_ed25519`)
2. `git clone https://github.com/raravista8/vitrina.git /tmp/vitrina-bootstrap`
3. `cd /tmp/vitrina-bootstrap && sudo ./infra/scripts/bootstrap-vps.sh`
4. Operator steps 1–3 above
5. Restore secrets from 1Password into `/opt/vitrina/.env.secrets`
6. Restore Postgres backup from Selectel cold storage:
   ```bash
   gpg --decrypt /opt/vitrina/backups/<latest>.sql.gpg | docker compose exec -T postgres psql -U vitrina_migrator -d vitrina
   ```
   (Backup passphrase: `BACKUP_PASSPHRASE` from 1Password)

### If SSH breaks during bootstrap

There's web-console fallback through the Selectel panel. The script
never touches `sshd_config` or UFW port 22 — the only way SSH can break
during a normal run is a network issue on Selectel's side, not the
script.

### If `bootstrap-vps.sh` errors midway

Re-run it. Every step is idempotent: completed steps log `[ok]` and
skip; the failing step retries. The `trap 'fail "interrupted at line
$LINENO"' ERR` clause produces a precise location for any unexpected
exit.

## What's pending for prod cutover

| Item | Owner | Notes |
|---|---|---|
| DNS records for `samosite.online` + `*.samosite.online` | founder | A → 135.106.137.30 |
| Selectel DNS API token | founder | Caddy's `acme` profile needs `SELECTEL_DNS_API_TOKEN` for DNS-01 challenge — generate in Selectel panel, store in 1Password, populate `.env` |
| `ACME_EMAIL` | founder | For Let's Encrypt account; populate `.env` |
| YandexGPT, Geosearch, SmartCaptcha keys | founder | Yandex Cloud console → put in `.env` |
| S3 bucket + access key | founder | Yandex Object Storage → `.env` |
| TG bot token + admin chat id | founder | BotFather → `.env`; `/start` the admin chat |
| ЮKassa shop_id + secret | founder | After РКН-уведомление + юр-аудит |
| RKN notification | founder | See `docs/runbooks/rkn-notification-submission.md` |
| Lawyer-reviewed privacy + offer | founder | Replace placeholders in `landing/content/` |
| First-time admin seed | founder | `docker compose exec api python -m app.cli.seed_admin` |

When all rows above are ticked, the host moves from staging-ready to
prod-ready and `make deploy` (T8.x) becomes the right path.
