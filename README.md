# Vitrina

AI-сайт-канал заявок для микробизнеса в РФ. Источник (Telegram-канал,
Яндекс.Карты, фото) → сайт за 2 минуты; auto-sync еженедельно. Подробности
в [`docs/PRD.md`](./docs/PRD.md).

## Layout

```
backend/         FastAPI + workers + bot (Python 3.12, poetry)
landing/         Next.js 14 (App Router, Tailwind)
sites-template/  Jinja2 templates for customer sites
infra/           docker-compose, Caddyfile, deploy scripts
docs/            PRD, ARCHITECTURE, SECURITY, ADRs, TASKS, COPY
```

Architecture: modular monolith with hexagonal core for high-risk modules
(parsing / content / auth / leads). See
[`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) and
[`docs/adr/0002-modular-monolith.md`](./docs/adr/0002-modular-monolith.md).

## Local dev (≤10 commands)

```bash
# 1. Python toolchain
pyenv install -s 3.12.7 && pyenv local 3.12.7
pipx install poetry==1.8.3

# 2. Node toolchain (landing)
nvm use 20

# 3. Install dependencies
make install

# 4. Bootstrap env
cp .env.example .env   # then fill required secrets

# 5. Bring up the stack
make dev

# 6. Migrations
make migrate

# 7. Run tests
make test
```

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full workflow (branching,
commits, PR template, troubleshooting).

## Make targets

| Target                 | What it does                              |
|------------------------|-------------------------------------------|
| `make install`         | poetry install (backend) + npm install (landing) |
| `make dev`             | docker compose up (full stack)            |
| `make test`            | pytest (unit+integration+security) + vitest |
| `make test-full`       | adds e2e + slow markers                   |
| `make lint`            | ruff (backend) + eslint (landing)         |
| `make typecheck`       | mypy --strict + tsc --noEmit              |
| `make security-check`  | bandit + pip-audit + npm audit + gitleaks |
| `make migrate`         | alembic upgrade head                      |

## Specification

Read in order before writing code:

1. [`CLAUDE.md`](./CLAUDE.md) — operational context, hard rules
2. [`docs/PRD.md`](./docs/PRD.md) — what we're building
3. [`docs/COPY.md`](./docs/COPY.md) — canonical messaging for landing
4. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — how it fits together
5. [`docs/SECURITY.md`](./docs/SECURITY.md) — threat model + ФЗ-152 controls (read before touching auth/crypto/parser/leads)
6. [`docs/adr/`](./docs/adr/) — locked-in decisions (0001–0009)
7. [`docs/TASKS.md`](./docs/TASKS.md) — backlog with stable IDs (E0 → E9)
