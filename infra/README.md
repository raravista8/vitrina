# infra/

Operational artefacts: docker-compose, Caddyfile, Postgres/Redis configs,
deploy scripts.

T0.1 leaves placeholders. T0.3 lands the real `docker-compose.yml` with
network isolation (`parser_net` ≠ `internal_net`) per ADR-0002 + SECURITY.md
T3.3/T5.4. T2.4 lands the production `Caddyfile` with wildcard SSL via
Selectel DNS-01.
