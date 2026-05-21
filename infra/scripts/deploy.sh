#!/usr/bin/env bash
# Vitrina / Самосайт — production deployment script.
#
# Idempotent, single-host VPS deploy. Pulls latest main, rebuilds
# anything stale, runs migrations, brings the stack up, smoke-tests
# the externally-visible health endpoint, and rolls back to the prior
# image set if smokes fail.
#
# Usage:
#   sudo -u deploy /opt/vitrina/infra/scripts/deploy.sh --staging
#   sudo -u deploy /opt/vitrina/infra/scripts/deploy.sh --production
#
#   # Skip the rebuild step (just re-apply compose state):
#   ... --staging --no-build
#
#   # Skip the git pull (deploy whatever HEAD currently points at):
#   ... --staging --no-pull
#
# `--staging` and `--production` currently resolve to the same overlay
# (infra/docker-compose.staging.yml) — the flag is required as an
# explicit acknowledgement that this is a real-host run, and reserved
# so that a future `--production` can drop the wildcard `tls internal`
# fallback once the DNS-01 cert is in place.
#
# Exit codes:
#   0  success
#   1  pre-flight failed (missing tools / files)
#   2  git pull conflict (operator must reconcile)
#   3  build failed
#   4  migration failed (rolled back)
#   5  health probe failed (rolled back)
#
# Logs to /var/log/vitrina/deploy-YYYYMMDD.log AND stderr — both at full
# verbosity. The log is what you grep when an alert fires; stderr is
# what the operator watches during the run.

set -euo pipefail

# ---- defaults ---------------------------------------------------------------

REPO_DIR="${REPO_DIR:-/opt/vitrina}"
LOG_DIR="${LOG_DIR:-/var/log/vitrina}"
ENVIRONMENT=""
DO_PULL=1
DO_BUILD=1
HEALTH_URL="${HEALTH_URL:-https://samosite.online/healthz}"
HEALTH_TIMEOUT_SECS="${HEALTH_TIMEOUT_SECS:-90}"
HEALTH_INTERVAL_SECS=3

# ---- argparse ---------------------------------------------------------------

usage() {
    sed -n 's/^# \{0,1\}//p' "$0" | head -40
    exit 1
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --staging)      ENVIRONMENT=staging ;;
        --production)   ENVIRONMENT=production ;;
        --no-pull)      DO_PULL=0 ;;
        --no-build)     DO_BUILD=0 ;;
        -h|--help)      usage ;;
        *)              echo "deploy.sh: unknown argument: $1" >&2; usage ;;
    esac
    shift
done

if [[ -z "$ENVIRONMENT" ]]; then
    echo "deploy.sh: must pass --staging or --production" >&2
    usage
fi

# ---- logging ----------------------------------------------------------------

mkdir -p "$LOG_DIR"
LOG_FILE="${LOG_DIR}/deploy-$(date +%Y%m%d).log"
exec > >(tee -a "$LOG_FILE") 2>&1

log()   { echo "[$(date -Iseconds)] $*"; }
fatal() { log "FATAL: $*"; exit "${2:-1}"; }

log "=== deploy.sh start: env=$ENVIRONMENT pull=$DO_PULL build=$DO_BUILD ==="
log "repo=$REPO_DIR  log=$LOG_FILE  health=$HEALTH_URL"

# ---- pre-flight -------------------------------------------------------------

cd "$REPO_DIR" || fatal "REPO_DIR=$REPO_DIR does not exist"

[[ -f .env ]]            || fatal ".env missing in $REPO_DIR (see infra/scripts/bootstrap-vps.sh)"
[[ -f .env.secrets ]]    || fatal ".env.secrets missing in $REPO_DIR (chmod 600)"
[[ -d infra ]]           || fatal "infra/ missing — wrong REPO_DIR?"

command -v docker     >/dev/null || fatal "docker CLI not on PATH"
docker compose version >/dev/null 2>&1 || fatal "docker compose plugin missing"
command -v curl       >/dev/null || fatal "curl not on PATH"

COMPOSE=(docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.staging.yml)

# ---- record rollback target -------------------------------------------------

# Tag the image set currently in use, in case we need to undo a bad deploy.
ROLLBACK_SHA="$(git rev-parse HEAD)"
log "rollback target: $ROLLBACK_SHA"

# ---- pull -------------------------------------------------------------------

if [[ "$DO_PULL" == "1" ]]; then
    log "git fetch + pull"
    git fetch origin main --quiet
    BEFORE="$(git rev-parse HEAD)"
    if ! git pull --ff-only origin main; then
        fatal "git pull --ff-only failed (uncommitted changes or non-ff)" 2
    fi
    AFTER="$(git rev-parse HEAD)"
    if [[ "$BEFORE" == "$AFTER" ]]; then
        log "already at latest main ($AFTER)"
    else
        log "pulled $BEFORE -> $AFTER"
    fi
else
    log "skipping git pull (--no-pull)"
fi

# ---- build ------------------------------------------------------------------

# Build-version stamps for landing — `<meta x-build-version>` and
# `GET /version`. Resolved here (not at npm-build time inside container)
# because:
#   • git is available on host, not inside the build container.
#   • Same value must propagate to BOTH BUILD_VERSION (file Dockerfile ARG)
#     AND any future BUILD_TIME consumers.
# Compose interpolates ${BUILD_VERSION} / ${BUILD_TIME} from this shell
# scope into `landing.build.args` (see docker-compose.yml).
export BUILD_VERSION
BUILD_VERSION="$(git rev-parse --short HEAD)"
export BUILD_TIME
BUILD_TIME="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
log "build stamp: BUILD_VERSION=$BUILD_VERSION BUILD_TIME=$BUILD_TIME"

if [[ "$DO_BUILD" == "1" ]]; then
    log "docker compose build (parallel, BuildKit)"
    DOCKER_BUILDKIT=1 "${COMPOSE[@]}" build --pull \
        || fatal "build failed" 3
else
    log "skipping build (--no-build)"
fi

# ---- bring stack up + migrate ------------------------------------------------

log "docker compose up -d (zero-downtime where possible)"
# Postgres first so migrations have a target; then everything else.
"${COMPOSE[@]}" up -d postgres redis
# Wait for postgres healthcheck before running migrations.
for i in $(seq 1 30); do
    if "${COMPOSE[@]}" ps postgres --format json 2>/dev/null \
        | grep -q '"Health":"healthy"'; then
        log "postgres healthy"
        break
    fi
    sleep 2
    if [[ "$i" == "30" ]]; then
        fatal "postgres did not reach healthy state within 60s" 4
    fi
done

log "alembic upgrade head"
if ! "${COMPOSE[@]}" run --rm api alembic upgrade head; then
    log "migration failed — rolling back to $ROLLBACK_SHA"
    git checkout -q "$ROLLBACK_SHA"
    DOCKER_BUILDKIT=1 "${COMPOSE[@]}" build --pull || true
    "${COMPOSE[@]}" up -d
    fatal "alembic upgrade head failed" 4
fi

log "starting application services"
"${COMPOSE[@]}" up -d

# ---- smoke / health probe ---------------------------------------------------

log "smoke probe: $HEALTH_URL (timeout=${HEALTH_TIMEOUT_SECS}s)"
DEADLINE=$(( $(date +%s) + HEALTH_TIMEOUT_SECS ))
HEALTH_OK=0
while [[ "$(date +%s)" -lt "$DEADLINE" ]]; do
    if curl --fail --silent --max-time 5 --output /dev/null "$HEALTH_URL"; then
        HEALTH_OK=1
        log "smoke probe OK"
        break
    fi
    sleep "$HEALTH_INTERVAL_SECS"
done

if [[ "$HEALTH_OK" != "1" ]]; then
    log "smoke probe FAILED — rolling back to $ROLLBACK_SHA"
    "${COMPOSE[@]}" logs --tail=80 api caddy | tail -120
    git checkout -q "$ROLLBACK_SHA"
    DOCKER_BUILDKIT=1 "${COMPOSE[@]}" build --pull || true
    "${COMPOSE[@]}" up -d
    fatal "health probe failed after deploy" 5
fi

# ---- post-deploy bookkeeping ------------------------------------------------

# Snapshot of the running stack — handy if you need to diff what changed.
SNAPSHOT="${REPO_DIR}/state-snapshot-$(date +%Y%m%d-%H%M).json"
"${COMPOSE[@]}" ps --format json > "$SNAPSHOT" || true
log "state snapshot: $SNAPSHOT"

NEW_SHA="$(git rev-parse HEAD)"
log "=== deploy.sh OK: $ROLLBACK_SHA -> $NEW_SHA ==="
