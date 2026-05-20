#!/usr/bin/env bash
# Vitrina / Самосайт — encrypted nightly Postgres backup.
#
# Per SECURITY.md §11 (Pre-launch checklist) and ARCHITECTURE.md §10
# ("backup of secrets" / cold-storage retention): pg_dump the live DB,
# gpg --symmetric with $BACKUP_PASSPHRASE (AES-256), drop into
# /opt/vitrina/backups/, prune anything older than 30 days, log to
# /var/log/vitrina/backup.log.
#
# Invoked from /etc/cron.d/vitrina-backup at 03:00 MSK. Designed to be
# safe under re-runs: each backup is timestamped, deletion is bounded
# by mtime > 30d, and pg_dump runs read-only.
#
# Re-key drill (annual, see SECURITY.md §5 rotation table):
#   1. Generate new BACKUP_PASSPHRASE, store in 1Password
#   2. For each existing db-*.sql.gpg in /opt/vitrina/backups/:
#        gpg --decrypt --passphrase "$OLD" db-X.sql.gpg \
#          | gpg --symmetric --cipher-algo AES256 --passphrase "$NEW" \
#                -o db-X.sql.gpg.new
#        mv db-X.sql.gpg.new db-X.sql.gpg
#   3. Update .env.secrets, restart any service that reads it
#
# Restore: see docs/runbooks/staging-deploy.md §"Restore from backup".

set -euo pipefail

REPO_DIR="${REPO_DIR:-/opt/vitrina}"
BACKUP_DIR="${BACKUP_DIR:-${REPO_DIR}/backups}"
LOG_FILE="${LOG_FILE:-/var/log/vitrina/backup.log}"
SECRETS_FILE="${SECRETS_FILE:-${REPO_DIR}/.env.secrets}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"

mkdir -p "$BACKUP_DIR" "$(dirname "$LOG_FILE")"

if [[ ! -f "$SECRETS_FILE" ]]; then
    echo "$(date -Iseconds) backup ERROR: $SECRETS_FILE missing" | tee -a "$LOG_FILE" >&2
    exit 1
fi

# Read secrets from a chmod-600 file rather than the process env — this
# makes accidental disclosure via `ps`/`/proc/<pid>/environ` impossible.
PG_PW=$(grep '^POSTGRES_PASSWORD=' "$SECRETS_FILE" | cut -d= -f2-)
BACKUP_PASS=$(grep '^BACKUP_PASSPHRASE=' "$SECRETS_FILE" | cut -d= -f2-)

if [[ -z "${PG_PW:-}" || -z "${BACKUP_PASS:-}" ]]; then
    echo "$(date -Iseconds) backup ERROR: POSTGRES_PASSWORD or BACKUP_PASSPHRASE not found in $SECRETS_FILE" \
        | tee -a "$LOG_FILE" >&2
    exit 1
fi

STAMP=$(date +%Y%m%d-%H%M)
OUT="${BACKUP_DIR}/db-${STAMP}.sql.gpg"

cd "$REPO_DIR"

# pg_dump as vitrina_migrator (the only role with full SELECT on every
# table including the audit log). PGPASSWORD is passed via env to the
# container — the host process and the docker CLI never see it on the
# command line.
PGPASSWORD="$PG_PW" docker compose \
        --env-file .env \
        -f infra/docker-compose.yml \
        -f infra/docker-compose.staging.yml \
        exec -T postgres \
    pg_dump -U vitrina_migrator -d vitrina \
    | gpg --batch --yes --symmetric --cipher-algo AES256 \
          --passphrase "$BACKUP_PASS" \
          -o "$OUT"

# Validate the output isn't an empty file before pruning old backups.
if [[ ! -s "$OUT" ]]; then
    echo "$(date -Iseconds) backup ERROR: $OUT is empty (pg_dump or gpg failed)" \
        | tee -a "$LOG_FILE" >&2
    rm -f "$OUT"
    exit 1
fi

# Prune anything older than retention horizon. Bounded by mtime + name
# pattern so an unrelated file in /opt/vitrina/backups can't be deleted.
find "$BACKUP_DIR" -name 'db-*.sql.gpg' -type f -mtime "+${RETENTION_DAYS}" -delete

SIZE=$(stat -c '%s' "$OUT" 2>/dev/null || echo 0)
echo "$(date -Iseconds) backup ok: $OUT (${SIZE} bytes)" | tee -a "$LOG_FILE"
