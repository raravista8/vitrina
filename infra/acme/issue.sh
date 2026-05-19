#!/bin/sh
# Issue or renew the wildcard cert for *.vitrina.site via Selectel DNS-01.
#
# Run via `docker compose run --rm acme /scripts/issue.sh`.
# The cron daemon (`docker compose up -d acme`) calls `acme.sh --cron`
# automatically; this script is for the one-time bootstrap + manual
# rotations on key compromise.

set -eu

: "${SEL_TOKEN:?SEL_TOKEN required — set SELECTEL_DNS_API_TOKEN in .env}"
: "${ACME_EMAIL:?ACME_EMAIL required}"
: "${ACME_DOMAIN:?ACME_DOMAIN required}"
: "${ACME_DOMAIN_ROOT:?ACME_DOMAIN_ROOT required}"

# Register account once (idempotent).
acme.sh --register-account -m "$ACME_EMAIL" --server letsencrypt || true

acme.sh --issue \
    --dns dns_selectel \
    -d "$ACME_DOMAIN_ROOT" \
    -d "$ACME_DOMAIN" \
    --keylength "${ACME_KEYLENGTH:-ec-256}" \
    --server letsencrypt

# Install cert files where Caddy expects them. The shared volume mounts
# /certs in both this container and the caddy container.
mkdir -p /certs

acme.sh --install-cert \
    -d "$ACME_DOMAIN_ROOT" \
    --ecc \
    --cert-file       /certs/cert.pem \
    --key-file        /certs/key.pem \
    --fullchain-file  /certs/fullchain.pem \
    --reloadcmd       "echo cert installed; touch /certs/.reload-trigger"

echo "OK: wildcard cert issued and installed to /certs/"
