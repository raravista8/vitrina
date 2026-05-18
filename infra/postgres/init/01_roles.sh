#!/usr/bin/env bash
# Vitrina — application DB roles, created once on first container boot.
#
# This file lives in /docker-entrypoint-initdb.d/ — Postgres' official
# image executes any *.sh file here AFTER initialising the cluster but
# BEFORE the server starts accepting external connections. Env vars from
# the container (POSTGRES_USER, POSTGRES_DB, VITRINA_*_PASSWORD) are
# available here; psql .sql files in the same directory don't get them.
#
# Roles per SECURITY.md T4.2:
#   - vitrina_app          (login, app runtime; granted DML on app tables
#                           by the alembic migration after CREATE TABLE)
#   - vitrina_readonly     (login, SELECT only — analytics / debugging)
#   - vitrina_audit_writer (login, INSERT only on admin_actions)
#
# The bootstrap user (POSTGRES_USER, defaults to "vitrina_migrator") is
# the superuser that Alembic runs as. The application never connects with
# that role.

set -euo pipefail

: "${VITRINA_APP_PASSWORD:?VITRINA_APP_PASSWORD must be set in .env}"
: "${VITRINA_READONLY_PASSWORD:?VITRINA_READONLY_PASSWORD must be set in .env}"
: "${VITRINA_AUDIT_WRITER_PASSWORD:?VITRINA_AUDIT_WRITER_PASSWORD must be set in .env}"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-SQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_app') THEN
            EXECUTE format('CREATE ROLE vitrina_app WITH LOGIN PASSWORD %L', '${VITRINA_APP_PASSWORD}');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_readonly') THEN
            EXECUTE format('CREATE ROLE vitrina_readonly WITH LOGIN PASSWORD %L', '${VITRINA_READONLY_PASSWORD}');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_audit_writer') THEN
            EXECUTE format('CREATE ROLE vitrina_audit_writer WITH LOGIN PASSWORD %L', '${VITRINA_AUDIT_WRITER_PASSWORD}');
        END IF;
    END
    \$\$;

    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO vitrina_app, vitrina_readonly, vitrina_audit_writer;
    GRANT USAGE ON SCHEMA public TO vitrina_app, vitrina_readonly, vitrina_audit_writer;
SQL

echo "infra/postgres/init/01_roles.sh: created vitrina_app / vitrina_readonly / vitrina_audit_writer"
