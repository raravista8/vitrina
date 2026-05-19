# acme.sh sidecar for issuing + renewing the wildcard cert for
# *.vitrina.site via Selectel DNS-01.
#
# Why a sidecar instead of Caddy's built-in ACME: the caddy-dns/selectel
# Caddy plugin is broken against modern libdns (see infra/caddy/Dockerfile).
# acme.sh has a maintained Selectel provider (`dns_selectel`) so we run
# it out-of-process and hand Caddy the cert files via a shared volume.
#
# Operation:
#   - `docker compose run --rm acme issue`   — one-time bootstrap
#   - `docker compose up -d acme`             — renewal daemon; checks
#                                               every 24h, renews ≤30d
#                                               before expiry, signals
#                                               Caddy to reload

ARG ACME_SH_VERSION=v3.1.2

FROM neilpang/acme.sh:${ACME_SH_VERSION}

# Defaults overridable from infra/docker-compose.yml. The container
# entrypoint runs acme.sh; the renewal cron is provided by the upstream
# image.

ENV ACME_DOMAIN="*.vitrina.site" \
    ACME_DOMAIN_ROOT="vitrina.site" \
    ACME_KEYLENGTH="ec-256" \
    DEPLOY_PATH="/certs"

# `dns_selectel` is shipped in acme.sh main branch; reuses
# $SEL_TOKEN as the API token env var per acme.sh docs.
