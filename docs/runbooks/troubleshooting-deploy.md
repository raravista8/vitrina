# Troubleshooting deploy

> What broke during the first bring-up on `samosite.online` (2026-05-20)
> and what worked. Keep this updated as you hit new gotchas.

---

## 1. `docker compose build` — apt timeouts / DNS errors

**Symptom.** During `RUN apt-get update`, builds hang or fail with
`Could not connect to deb.debian.org` / `Cannot initiate the connection`.
`docker logs` for the build shows IPv6 routes being attempted.

**Root cause.** Docker's build network namespace inherited
`/etc/resolv.conf` that resolves to Selectel's IPv6-first resolver. The
VPS has IPv6 enabled on the LAN but no working upstream IPv6 routing,
so AAAA lookups succeed but TCP connect hangs.

**Fix.**

1. Add explicit IPv4 resolvers at the daemon level:

   ```json
   /* /etc/docker/daemon.json */
   {
     "log-driver": "json-file",
     "log-opts": {"max-size": "50m", "max-file": "3"},
     "default-address-pools": [
       {"base": "172.30.0.0/16", "size": 24},
       {"base": "172.31.0.0/16", "size": 24}
     ],
     "live-restore": true,
     "userland-proxy": false,
     "dns": ["1.1.1.1", "8.8.8.8"]
   }
   ```

   `sudo systemctl reload docker` (or `restart` if reload is rejected).

2. Force IPv4 at the apt layer inside the Dockerfile:

   ```dockerfile
   RUN apt-get -o Acquire::ForceIPv4=true update \
       && apt-get -o Acquire::ForceIPv4=true install -y --no-install-recommends ...
   ```

   This is already applied in `backend/Dockerfile`. Both stages need it
   (builder + runtime); the runtime stage was missed in an earlier
   attempt and the build silently failed on the second apt call.

**Verify.** `docker buildx build --network=host -f backend/Dockerfile -t test backend/` should finish without retries. If you see `apt` warning lines about "0% [Connecting to ...]" lingering for >10 s, the IPv4 force isn't taking effect.

---

## 2. Parallel `docker compose build` race

**Symptom.** `docker compose build` with the default parallel scheduler
hangs or fails for one of the worker images while others succeed. Often
the failing service is the third or fourth one to start its apt fetch.

**Root cause.** Multiple builds in the same daemon hit the same Debian
mirror in parallel; mirror occasionally throttles or returns a slow IPv6
address (see §1).

**Fix.** Once §1's IPv4 force is in place this becomes a non-issue, but
if you're chasing a build failure mid-rebrand, fall back to serial:

```bash
for svc in postgres-not-built api parser-worker content-worker sync-worker tg-bot landing caddy; do
    [[ "$svc" == "postgres-not-built" ]] && continue  # uses upstream image
    docker compose --env-file .env \
        -f infra/docker-compose.yml -f infra/docker-compose.staging.yml \
        build "$svc" || break
done
```

Or use `docker buildx build --network=host` directly per service if
compose's BuildKit handling itself is suspect — repo root must be the
context (backend Dockerfile does `COPY ./sites-template`).

---

## 3. Long-running `nohup ... &` dies when SSH disconnects

**Symptom.** Started a long build with `nohup docker compose build > log
2>&1 &`, disconnected SSH, came back later — build is gone, log is
truncated.

**Root cause.** Many shells (bash with `huponexit on`, or processes
that haven't detached from the controlling terminal) still receive
`SIGHUP` despite `nohup`. `disown` alone doesn't help if stdin is still
attached to the TTY.

**Fix.** Use `setsid` + redirect *all* fds away from the TTY:

```bash
setsid bash -c '
    cd /opt/vitrina &&
    docker compose --env-file .env \
        -f infra/docker-compose.yml -f infra/docker-compose.staging.yml \
        build api landing parser-worker content-worker sync-worker tg-bot
' < /dev/null > /tmp/build.log 2>&1 &
disown
```

Verify with `pgrep -af 'docker compose build'` — the PID should appear
under PID 1, not your shell.

For long deploy operations from a Claude Code session, prefer
`run_in_background` on the Bash tool over remote `nohup` — the harness
tracks the lifecycle and survives session breaks.

---

## 4. Caddy reports "unhealthy" while externally serving 200

**Symptom.** `docker compose ps` shows `caddy ... Up N min (unhealthy)`
but `curl https://samosite.online/healthz` returns 200 from outside.

**Root cause.** The base healthcheck probes `http://localhost/healthz`
from inside the container with BusyBox `wget`. Caddy 308-redirects HTTP
to HTTPS; BusyBox wget then opens a TLS connection with SNI=`localhost`,
for which no cert exists (Caddy only has `samosite.online` + the `tls
internal` wildcard). The handshake fails with `alert internal_error`.

**Attempted fixes that didn't work.**

- `wget --no-check-certificate` — overrides cert validation, but not
  SNI; server still rejects the handshake before any cert is sent.
- `wget --header='Host: samosite.online'` — sets HTTP `Host` header
  *after* TLS is up, so SNI is still `localhost`.
- BusyBox wget has no flag to override SNI. `curl --resolve` would
  work, but adding curl to the official Caddy image inflates it.

**Fix.** Disable the healthcheck in the staging overlay:

```yaml
services:
  caddy:
    healthcheck:
      disable: true
```

External readiness is proven by `curl https://samosite.online/healthz`
from outside — that's what `deploy.sh`'s post-deploy probe runs.

If you ever need internal readiness signalling (e.g. for an
orchestrator), bake `curl` into a custom Caddy image and probe with
`curl --resolve samosite.online:443:127.0.0.1 https://samosite.online/healthz`.

---

## 5. Repo pull rejects because `infra/scripts/bootstrap-vps.sh` is untracked

**Symptom.** During bring-up you `scp`'d `bootstrap-vps.sh` to the VPS,
then later `git pull` fails because the file is present locally but not
tracked, and an upstream PR added the canonical version.

**Fix.**

```bash
cd /opt/vitrina
rm infra/scripts/bootstrap-vps.sh   # ONLY because it's identical to upstream
git pull --ff-only origin main
# verify with diff: git show HEAD:infra/scripts/bootstrap-vps.sh > /tmp/upstream.sh
```

If the file genuinely differs (local mods), commit the local changes to
a branch first, or `git stash -u` and reconcile after pull.

---

## 6. Wildcard TLS shows `tls internal` self-signed cert in browser

**Symptom.** `https://test.samosite.online` shows "Not Secure" / "NET::ERR_CERT_AUTHORITY_INVALID".

**Status.** Expected until DNS-01 issuance is wired up. The apex
(`samosite.online`) and `www` use tls-alpn-01 on port 443 — works with
just inbound 443 open. The wildcard needs DNS-01 because Let's Encrypt
won't issue `*.foo.tld` via HTTP / TLS-ALPN challenges.

**Fix.**

1. Generate a Selectel DNS API token (Account → API → Create token).
2. Add to `/opt/vitrina/.env`:

   ```
   SELECTEL_DNS_API_TOKEN=...
   ACME_EMAIL=ops@samosite.online   # real monitored mailbox
   ACME_DOMAIN=*.samosite.online
   ACME_DOMAIN_ROOT=samosite.online
   ```

3. One-shot issue:

   ```bash
   docker compose --env-file .env \
       -f infra/docker-compose.yml -f infra/docker-compose.staging.yml \
       run --rm acme /scripts/issue.sh
   ```

4. Update `infra/Caddyfile.staging` wildcard host: replace `tls
   internal` with the volume cert path. See `infra/Caddyfile` for the
   reference block — it expects the cert at `/etc/caddy/certs/...`.

5. `docker compose ... up -d caddy`.

6. Verify externally: `curl -vI https://test.samosite.online 2>&1 |
   grep -i 'issuer:'` shows Let's Encrypt E-series issuer.

**Hazard.** Don't iterate on this without success — Let's Encrypt's
duplicate-cert rate limit is 5 per week. Each failed attempt counts.
Test against `acme-staging-v02.api.letsencrypt.org` first by setting
`ACME_SERVER=staging` in the sidecar env.

---

## 7. `git pull --ff-only` aborts with "uncommitted changes"

**Symptom.** Deploy fails at step 2 (`git pull --ff-only`).

**Diagnosis.**

```bash
cd /opt/vitrina
git status
# Modified: backend/Dockerfile        ← typically a local IPv4 patch
# Modified: infra/docker-compose.staging.yml
```

These shouldn't drift once the merged PR includes them. If they do:

```bash
git diff backend/Dockerfile    # confirm it's the IPv4 patch
git stash                       # park local changes
git pull --ff-only origin main
git stash pop                   # reconcile; usually `git checkout --
                                #   backend/Dockerfile` because upstream
                                #   now has the canonical fix
```

If `stash pop` conflicts, prefer upstream:

```bash
git checkout -- backend/Dockerfile
git stash drop                  # discard the conflicting patch
```

---

## 8. `alembic upgrade head` errors with "permission denied"

**Symptom.** Migration container exits with `psycopg.errors.InsufficientPrivilege`.

**Root cause.** `DATABASE_URL` in `.env` is using `vitrina_app` (DML-only),
not `vitrina_migrator`. The migrator role is the only one with DDL.

**Fix.** Migrations run with their own connection string:

```bash
# Confirm in .env:
grep -E '^(DATABASE_URL|ALEMBIC_DATABASE_URL)=' /opt/vitrina/.env
# ALEMBIC_DATABASE_URL=postgresql+asyncpg://vitrina_migrator:...@postgres/vitrina
# DATABASE_URL=postgresql+asyncpg://vitrina_app:...@postgres/vitrina
```

If `ALEMBIC_DATABASE_URL` is missing, the app falls back to
`DATABASE_URL` — which is correct for runtime but wrong for migrations.
Restore `ALEMBIC_DATABASE_URL` from `.env.secrets` (the migrator
password lives there) and retry.

---

## 9. Diagnostic command cheatsheet

```bash
# overall stack state
docker compose --env-file .env \
    -f infra/docker-compose.yml -f infra/docker-compose.staging.yml ps

# last 200 lines of a service
docker compose ... logs --tail=200 api

# postgres role audit
docker compose ... exec postgres psql -U vitrina_migrator -d vitrina \
    -c "SELECT rolname, rolsuper, rolcreatedb FROM pg_roles WHERE rolname LIKE 'vitrina_%';"

# verify worker isolation (per ARCHITECTURE.md §4)
docker compose ... exec parser-worker nc -w2 postgres 5432
# expect: connection refused / name does not resolve

# Caddy cert state
docker compose ... exec caddy cat /data/caddy/acme/acme-v02.api.letsencrypt.org-directory/*/*/samosite.online/*.json \
    | head -20
# OR look at last cert issuance event:
docker compose ... logs caddy 2>&1 | grep -i 'certificate obtained'

# DNS sanity (run from operator laptop, not VPS — VPS uses Selectel resolver)
dig +trace samosite.online
dig +short test.samosite.online   # any random subdomain should hit wildcard

# fail2ban + ufw
sudo fail2ban-client status sshd
sudo ufw status verbose
```

---

## 10. When to ask before destroying

- **Never** run `docker system prune -a` on the VPS unless you've taken
  a fresh backup AND verified the build cache is the only thing being
  evicted (active named volumes survive `prune`, but a typo can drop
  them).
- **Never** `docker volume rm vitrina_postgres_data` without an off-host
  backup confirmed restorable. The Phase-8 cron writes to the same
  host; lose the host, lose both.
- **Never** force-push to `main`. Roll forward with a revert commit.
- If `deploy.sh` rolls back to a SHA, treat the next deploy as a fresh
  problem — don't `--no-build` it.
