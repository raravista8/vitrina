# Vitrina Caddy image. Upstream `caddy:2-alpine` is sufficient — the
# wildcard cert is issued out-of-band by the `acme-sh` sidecar (see
# `infra/acme/`) and mounted into this container at /etc/caddy/certs/.
#
# Why not xcaddy + caddy-dns/selectel? The community `caddy-dns/selectel`
# plugin (via libdns/selectel@v1.0.0) hasn't been updated for the
# libdns 1.x Record API breaking change, so `xcaddy build --with
# github.com/caddy-dns/selectel` fails to compile against modern Caddy.
# Until that's patched upstream, we delegate ACME DNS-01 to acme.sh,
# which has a maintained Selectel DNS provider — see ARCHITECTURE.md
# OQ-A5 for the decision trail.

ARG CADDY_VERSION=2.10.0

FROM caddy:${CADDY_VERSION}-alpine

# No customisation needed — the base image entrypoint loads
# /etc/caddy/Caddyfile, and certs come from the shared volume.
