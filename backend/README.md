# Vitrina backend

FastAPI + SQLAlchemy 2.0 + Postgres + Redis (RQ). Modular monolith per [ADR-0002](../docs/adr/0002-modular-monolith.md).

## Quickstart (host-side, no Docker)

```bash
# Python 3.12.7 (pyenv)
pyenv install -s 3.12.7 && pyenv local 3.12.7

# Poetry
pipx install poetry==1.8.3

# Install deps
poetry install --with dev

# Run dev server (requires Postgres + Redis available)
poetry run uvicorn app.main:app --reload --port 8000
```

For the full stack (Postgres, Redis, all workers, bot, Caddy) use `make dev` from repo root.

## Layout

See `app/` package — hexagonal core in `app/core/`, concrete adapters in `app/infrastructure/`. The `core/` package never imports from `infrastructure/` or `api/`; the `import-linter` config (`../.importlinter`) enforces this.

## Commands

| Make target          | What it does                                |
|----------------------|---------------------------------------------|
| `make test-backend`  | pytest (excluding e2e/slow markers)         |
| `make lint-backend`  | ruff check + ruff format --check            |
| `make typecheck-backend` | mypy --strict on `app/`                 |
| `make security-backend`  | bandit + pip-audit                      |
| `make migrate`       | alembic upgrade head                        |
| `make makemigration` | alembic revision --autogenerate             |

## Migrations

Alembic uses the sync `psycopg` driver (`ALEMBIC_DATABASE_URL` in `.env`); the app runtime uses async `asyncpg` (`DATABASE_URL`). Both URLs point at the same database — the split exists because SQLAlchemy 2.0 + Alembic want a sync engine for migrations.
