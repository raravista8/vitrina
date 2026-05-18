## Why
<!-- One-paragraph motivation. Link to T<ID> in docs/TASKS.md. -->

Closes T<...>

## What
<!-- Bulleted list of changes. -->

-
-

## Security impact
<!-- Mandatory check; either confirm no-touch or link the SECURITY.md section reviewed. -->

- [ ] No changes to `core/auth`, `core/leads`, `core/parsing`, `core/content`, `core/consent` — proceed normally
- [ ] Touches sensitive area — SECURITY.md section reviewed: ___

## Verification

- [ ] `make test` green
- [ ] `make typecheck` green
- [ ] `make lint` green
- [ ] `make security-check` green
- [ ] Manual e2e (if UI changes): ___
- [ ] New runtime dependency? If yes, ADR opened: ___ (else N/A)

## Rollback plan
<!-- One line. E.g. "revert this commit + `make migrate-down` if T1.x". -->
