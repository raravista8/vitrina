# OPERATIONS — how we actually ship & run Самосайт

> **Why this file exists.** Claude Code sessions are stateless across sessions —
> a fresh session knows only what's committed in files (the `CLAUDE.md`
> hierarchy + always-loaded docs), NOT what a previous session learned live.
> This file captures the durable operational knowledge so every session
> bootstraps the same way. **Keep it current**: when you discover an infra
> fact, a deploy gotcha, or a workflow step the hard way — write it here.

---

## 1. Prod coordinates

| Thing | Value |
|---|---|
| Public domain | `samosite.online` (customer sites: `*.samosite.online`) |
| VPS (SSH) | `ssh deploy@135.106.137.30` |
| Repo on VPS | `/opt/vitrina` (deploys are `git pull` + `docker compose` there) |
| Compose invocation | `docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.staging.yml` |
| Services | `api`, `landing`, `postgres`, `redis` (+ workers/bot) |
| Postgres (psql ops) | container `postgres`, `psql -U vitrina_migrator -d vitrina` (app user is `vitrina_app`) |
| Build stamp | `GET https://samosite.online/version` → `{git_sha, built_at, tag}` — **reflects the LANDING bundle only** |

Secrets live ONLY in `/opt/vitrina/.env` on the VPS — never in git.

---

## 2. Deploy runbook

Trunk-based: merge PR → `main` → deploy the changed service(s) on the VPS.

```bash
ssh deploy@135.106.137.30
cd /opt/vitrina && git pull --ff-only origin main
C="docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.staging.yml"
```

**Backend change** (api / workers / bot share the `infra-api` image):
```bash
$C build api && $C up -d --no-deps api
```

**Landing change** — needs build-args so `/version` is correct:
```bash
SHA=$(git rev-parse --short HEAD); TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)
$C build --build-arg BUILD_VERSION=$SHA --build-arg BUILD_TIME=$TS landing
$C up -d --no-deps landing
```

### Hard rules / gotchas

- **NEVER `docker compose build --pull` the whole stack.** The `acme.sh`
  upstream image is broken and a full `--pull` fails. Build only the changed
  service, without `--pull` (base images are already cached on the VPS).
- **`--no-deps`** so recreating one service doesn't restart postgres/redis.
- **Landing builds are slow (~1–6 min)** → run detached and poll the log
  (foreground SSH can time out):
  ```bash
  LOG=/tmp/deploy-XXX.log
  nohup bash -c 'set -e; cd /opt/vitrina; … build … ; … up -d … ; echo DEPLOY_EXIT=$?' > $LOG 2>&1 &
  # then poll remotely until the DEPLOY_EXIT= marker appears:
  for i in $(seq 1 90); do grep -q DEPLOY_EXIT= "$LOG" && break; sleep 5; done; tail -6 "$LOG"
  ```

### Verify a deploy

- **Landing:** `curl -sk https://samosite.online/version` → `git_sha` matches the
  merged commit. (`/version` is landing-only — a backend deploy does NOT change it.)
- **Backend:** `$C ps api` shows `healthy`; to confirm code/config:
  `$C exec -T api python -c "from app.config import get_settings as g; print(g().<field>)"`.

---

## 3. CI (GitHub Actions) — 13 checks

Backend — `ruff + import-linter`, `mypy --strict`, `pytest`, `bandit`, `pip-audit`.
Landing — `eslint`, `tsc --noEmit`, `vitest`, `npm audit (high+)`, `visual regression`.
Infra — `docker compose config`. Plus `gitleaks` (secret scan) and the `claude review` (security) gate.

- Watch a PR: `gh pr checks <N> --watch --interval 25`.
- **`landing / visual regression` flakes** on `page.goto(BASE, {waitUntil:"networkidle"})`
  (30s timeout, a different test each time — it's a navigation race, not a real
  pixel diff: ~91/92 pass). Fix: `gh run rerun <run-id> --failed`. (A stability
  fix to the visual suite is in flight; if it still flakes, rerun.)
- `backend / pytest` can flake on `testcontainers/ryuk` image pull (Docker Hub
  5xx) → same `gh run rerun <run-id> --failed`.
- Merge: `gh pr merge <N> --squash --delete-branch`.

---

## 4. Infra facts (learned the hard way)

- **Telegram API is BLOCKED from the prod VPS.** `api.telegram.org` TCP-connect
  times out on both IPv4 and IPv6 (RF/Selectel). A Telegram bot CANNOT deliver
  from this server without an external proxy/relay outside RF. General outbound
  is fine — `ya.ru`, `storage.yandexcloud.net`, `smtp.yandex.ru:465` are all
  reachable. ⇒ founder alerts go via **email (Yandex SMTP)** or a proxy, not
  direct Telegram.
- **YandexGPT** — reachable (we use it). **Object Storage write path is NOT set
  up** on prod: the api has no `S3_*` creds, so the booking-site publish flow
  (render→S3) and the `*.samosite.online`→S3 origin are inert — no customer site
  is actually served from storage today. (The `vitrina-prod` bucket is named as
  the origin in `infra/Caddyfile`, but nothing can write to it.)
- **Active edge config is `infra/Caddyfile.staging`, NOT `infra/Caddyfile`.** The
  prod stack runs with `-f docker-compose.staging.yml`, which **remounts**
  `./Caddyfile.staging:/etc/caddy/Caddyfile:ro` (overriding the base compose's
  `./Caddyfile`). So edge changes must go in `Caddyfile.staging` (apex + milreview
  use Let's Encrypt tls-alpn-01; the self-signed `*.samosite.online { tls internal }`
  "not yet published" 404 placeholder was **removed** — its wildcard cert won a
  certmagic startup race and shadowed milreview's public cert, and no other
  subdomains are live; the real wildcard cert lands with `SELECTEL_DNS_API_TOKEN` +
  DNS-01). `infra/Caddyfile` is the canonical/future
  config (volume wildcard cert + Object Storage origin) — keep both in sync.
  Caddyfile is **bind-mounted**, so after `git pull` apply with:
  `$C exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile`
  (atomic — bad config keeps the previous one; no caddy rebuild needed).
- **milreview content site** (`milreview.samosite.online`) is served by the **api**
  (app-server origin, no S3): a dedicated `Caddyfile.staging` host block proxies
  it to api:8000, which renders + serves the static pages by Host. Single
  hostname → real LE cert via tls-alpn-01. See `docs/runbooks/publish-milreview.md`.
- **Pricing** is frontend-only (canon 5-tier matrix); ЮKassa is still single-plan
  990 ₽. See `docs/handoff/CANON_SWAP_PLAN.md` §Pricing.
- **Instant-preview backend** (`GET /api/preview/search` + `POST /api/preview/draft`,
  CANON_INSTANT_PREVIEW_REV2_TZ §7) needs `YANDEX_GEOSEARCH_API_KEY` in
  `/opt/vitrina/.env` (same key as the T1.4b hero badge). Key unset → search
  answers `502 search_not_configured` (graceful, no crash) and ymaps-URL drafts
  fail; telegram/website drafts work without it. Draft/candidate state lives in
  Redis (`preview_draft:*` 15 min TTL, `preview_candidate:*` 30 min TTL).

---

## 5. Founder notifications

- `NotificationDispatcher.notify_founder` (composed in `backend/app/main.py`) fans
  out to **Telegram** (`TG_BOT_TOKEN` + `TG_ADMIN_CHAT_ID`) and **email**
  (`FOUNDER_EMAIL` + `SMTP_*`). Each leg is best-effort; missing creds → skipped.
- Alerts fire on **new application** (`POST /api/submit-application`) and **new
  feedback** (`POST /api/feedback` votes — per submission, plus a louder
  `🔥 10 голосов` threshold ping).
- **Prod config today:** **email IS live via Yandex 360** — `SMTP_HOST=smtp.yandex.ru`,
  `SMTP_PORT=465` (SSL), `SMTP_USER`/`SMTP_FROM=info@samosite.online`,
  `SMTP_PASSWORD`=Yandex app-password all set in `/opt/vitrina/.env`; a real
  test send (`info@`→`info@`) returned `SEND_OK`. `FOUNDER_EMAIL=raravista@gmail.com`
  (where alerts land — change to `info@` if you want them in the new mailbox).
  `TG_*` still NOT set (Telegram needs a proxy — see §4), so the TG leg skips.
- **How email was turned on** (Yandex 360, `samosite.online` mailbox) — for
  reference / a second mailbox. The
  `SmtpClient` auto-selects implicit TLS when `SMTP_PORT=465` (Yandex's
  canonical SMTPS endpoint — plain `SMTP`+STARTTLS does NOT work there; 587
  stays STARTTLS). Set in `/opt/vitrina/.env`, then recreate api:
  ```
  SMTP_HOST=smtp.yandex.ru
  SMTP_PORT=465
  SMTP_USER=info@samosite.online
  SMTP_PASSWORD=<Yandex app-password>     # Yandex ID → Пароли приложений → «Почта» (NOT the login password; 2FA mailboxes require it)
  SMTP_FROM=Самосайт <info@samosite.online>   # From MUST equal SMTP_USER — Yandex rejects a mismatched sender
  FOUNDER_EMAIL=info@samosite.online          # optional: where founder alerts land (currently raravista@gmail.com)
  ```
  Verify: `$C exec -T api python -c "from app.config import get_settings as g; print(g().smtp_host, g().smtp_port)"`
  + send a real test (new application/feedback) and confirm receipt. DKIM/SPF
  are configured on the Yandex side, so deliverability is good.
- Email subject per-event via `NotificationMessage.metadata["email_subject"]`.

---

## 6. Admin auth

- `/admin` login is **password-only on prod** via `ADMIN_2FA_REQUIRED=false`
  (default in code is `true` = secure). Reversible: set `true` + recreate api →
  2-step TOTP returns, no migration. TOTP secret + backup codes stay in the DB.
  See `docs/SECURITY.md §11`.

---

## 7. Canon vendoring (the most frequent task)

Canon (`@samosite/canon`) is vendored at `packages/canon/`. Claude Design ships
new versions as a zip (`canon X.Y.Z.zip` → `export/canon-X.Y.Z-pkg/`). Procedure:

1. **Verify the diff is real — DON'T trust the version label.** Diff the zip's
   `src/` against the vendored `src/` (`0.9.1` once shipped OLD code under a NEW
   label). Read the zip's CHANGELOG to know what *should* have changed, then
   confirm it actually did.
2. `cp` the changed `src/*` files into `packages/canon/src/`.
3. Bump `packages/canon/package.json` `version` + `description`.
4. Prepend the new CHANGELOG section to `packages/canon/CHANGELOG.md` + add a
   `### Vitrina-side (this vendoring PR)` footer noting what we did + drift.
5. Rebuild dist: `cd packages/canon && npm run build` (`tsup` keeps the local
   `dts: false` carry-forward; dist is COMMITTED). esbuild escapes Cyrillic to
   `\uXXXX` — grep ASCII markers to verify.
6. Cache-bust install into landing:
   ```bash
   cd landing && rm -rf node_modules/@samosite/canon && npm cache clean --force \
     && npm install --install-links file:../packages/canon --force
   ```
   (`--install-links` is mandatory — Turbopack can't follow `file:` symlinks.)
   Verify the installed `dist` carries the new markers.
7. **Reconcile consumer hacks** if canon changed markup/selectors — the DOM-mutation
   wrappers key off canon's classes/hrefs:
   - `landing/components/SiteHeader.tsx` (login/home/CTA hrefs — keys off
     `a[href="#login"]`, `.ss-sticky-header`),
   - `landing/components/FeedbackModal.tsx` (canon `S9_FeedbackModal` adapter),
   - `landing/components/admin/DashboardPendingPanel.tsx` (hides canon's mock
     pending card by the `ТОП-5 PENDING` label, persistent observer).
8. Bump version strings in trackers: `docs/handoff/VISUAL_COVERAGE.md` (the
   «Сейчас:» header), `docs/handoff/SCREEN_INDEX.md`, `landing/CLAUDE.md`.
9. `npm run build` (landing) + `vitest` + `tsc` + `eslint` → PR → CI → merge →
   deploy landing.

**NEVER edit `packages/canon/src/*` by hand** except authorized converter
repairs (round-trip real changes through Claude Design). **NEVER transcribe
canon JSX into hand-rolled Tailwind** — import it or file a gap.

---

## 8. Local dev & tests

- Frontend gates (from `landing/`): `npx tsc --noEmit`, `npx eslint .`,
  `npx prettier --check .`, `npx vitest run`, `npm run build`.
- Backend gates (from `backend/`): `poetry run ruff check .`,
  `poetry run ruff format --check .`, `poetry run mypy --strict app`,
  `poetry run lint-imports`, `poetry run bandit -r app -ll`.
- **Backend integration tests need Docker** (testcontainers). Local Docker is
  **colima**:
  ```bash
  export DOCKER_HOST=unix:///Users/pavelshumilin/.colima/default/docker.sock
  export TESTCONTAINERS_RYUK_DISABLED=true
  colima status || colima start
  cd backend && poetry run pytest tests/integration -k "<filter>" -p no:cacheprovider -q
  ```
  Without Docker, integration tests SKIP (not fail).

---

## 9. PR hygiene (this repo)

- Branch off `main` (`feat/…`, `fix/…`, `chore/…`); never commit to `main` directly.
- Conventional Commits; pre-commit hooks run the full lint/type/secret suite.
- Commit-message footer: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- PR body footer: `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- Commit `packages/canon/dist/` (gitignore has an exception; pre-commit skips it
  for whitespace normalization).
