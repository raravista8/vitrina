# Contributing to Vitrina

## Branching model

Trunk-based development. Single long-lived branch `main` (=production-ready). Short-lived feature branches `feat/<topic>`, `fix/<topic>`, `chore/<topic>`. No `develop`, no `release-*`.

## Commit message convention

Conventional Commits (https://conventionalcommits.org):

```
feat(scope): add Yandex.Maps parser adapter
fix(auth): close session race condition in TOTP verify
chore(deps): bump fastapi to 0.115.6
docs(adr): add ADR-0008 for backup rotation
test(security): add 10 more SSRF payloads
```

Scopes: `auth`, `parser`, `content`, `leads`, `admin`, `landing`, `template`, `infra`, `deps`, `security`, `legal`, `bot`.

Breaking change: `feat(api)!: …` или `BREAKING CHANGE:` в body.

## Pull request template

```markdown
## Why
<one-paragraph motivation, link to T<ID> in TASKS.md>

## What
<bulleted list of changes>

## Security impact
[ ] No changes to auth/crypto/parsing/leads/consent — proceed normally
[ ] Touches sensitive area — link to SECURITY.md section reviewed: ___

## Verification
- [ ] `make test` green
- [ ] `make typecheck` green
- [ ] `make lint` green
- [ ] `make security-check` green
- [ ] Manual e2e (if UI changes): ___

## Rollback plan
<one-line>
```

## Code review checklist (founder reviews own AI-generated PR before merge)

- [ ] No `print()` left, no commented-out blocks
- [ ] No hardcoded secrets or test tokens
- [ ] Pydantic schemas have `extra='forbid'`
- [ ] All raw user input passes validation before reaching `core/`
- [ ] No new dependencies without ADR
- [ ] All exception handlers don't leak stack traces to user
- [ ] If file in `core/{auth,leads,parsing/url_validator,content/output_validator}` modified, tests also modified
- [ ] No `{{ x | safe }}` in Jinja2
- [ ] No `eval()`, `exec()`, `pickle.load(untrusted)`
- [ ] Migration has working downgrade
- [ ] CHANGELOG.md updated for user-visible changes

## Local development setup (≤10 commands)

```bash
# 1. Clone
git clone git@github.com:founder/vitrina.git && cd vitrina

# 2. Install Python toolchain
pyenv install 3.12.7 && pyenv local 3.12.7
pipx install poetry==1.8.3

# 3. Install Node toolchain (for landing only)
nvm install 20 && nvm use 20

# 4. Install deps
make install

# 5. Setup env
cp .env.example .env  # then edit secrets
op signin  # 1Password CLI

# 6. Start everything
make dev  # docker compose up -d

# 7. Run migrations
make migrate

# 8. Seed test admin
make seed-admin  # interactive: password + TOTP enrollment

# 9. Open landing
open http://localhost:3000

# 10. Open admin
open http://localhost:8000/admin
```

## Troubleshooting FAQ

**Q: `make dev` fails with port 5432 in use.**
A: `docker ps -a | grep postgres` — kill conflicting container.

**Q: Caddy can't get cert in staging.**
A: Staging uses self-signed; check `infra/Caddyfile.staging`.

**Q: `pytest` fails with "Fernet key required".**
A: `cp .env.example .env` and set `FERNET_KEY=$(python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")`.

**Q: TG-bot doesn't receive messages.**
A: Check `TG_BOT_TOKEN` valid; `curl https://api.telegram.org/bot$TOKEN/getMe`.

**Q: parser-worker can't connect to anything.**
A: Это by design — изоляция от internal_net. Worker общается только через Redis.

## Working with Claude Code

- See `CLAUDE.md` (project root) for AI-assistant context.
- Always include security block from SECURITY.md §«Universal Claude Code instruction» in prompts touching `core/auth`, `core/leads`, `core/parsing`, or `core/content`.
- Never accept a PR from Claude that adds a new runtime dependency без ADR.
- Never accept a PR that touches `core/leads/encryption.py` без модификации `tests/security/test_crypto_roundtrip.py`.
