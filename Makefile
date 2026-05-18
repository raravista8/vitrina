# Vitrina — orchestration entrypoints
# All commands documented in CLAUDE.md §Commands.
#
# Usage: `make <target>` from repo root.
# Targets that act on the backend run inside `backend/`; landing targets run inside `landing/`.

.DEFAULT_GOAL := help
SHELL := /bin/bash

BACKEND := backend
LANDING := landing

# ---- Setup -------------------------------------------------------------------

.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*?##/ {printf "  %-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: install-backend install-landing ## Install poetry + npm dependencies

.PHONY: install-backend
install-backend:
	cd $(BACKEND) && poetry install --with dev

.PHONY: install-landing
install-landing:
	cd $(LANDING) && npm install

.PHONY: hooks-install
hooks-install: ## Wire .pre-commit-config.yaml into .git/hooks (one-time per clone)
	cd $(BACKEND) && poetry run pre-commit install

.PHONY: hooks
hooks: ## Run every pre-commit hook against every tracked file
	cd $(BACKEND) && poetry run pre-commit run --all-files

.PHONY: hooks-update
hooks-update: ## Bump pre-commit hook revisions in .pre-commit-config.yaml
	cd $(BACKEND) && poetry run pre-commit autoupdate

# ---- Dev loop ----------------------------------------------------------------

DC := docker compose --env-file .env \
	-f infra/docker-compose.yml \
	-f infra/docker-compose.dev.yml

.PHONY: dev
dev: .env ## Bring up the local docker compose stack (postgres+redis+api+workers+bot+landing)
	$(DC) up -d --build

.PHONY: dev-down
dev-down:
	$(DC) down

.PHONY: dev-logs
dev-logs:
	$(DC) logs -f

.PHONY: dev-ps
dev-ps:
	$(DC) ps

.PHONY: dev-verify-isolation
dev-verify-isolation: ## Confirm parser-worker can NOT reach postgres (SECURITY.md T5.4)
	@echo "Expected: parser-worker fails to resolve/connect to postgres:5432"
	@! $(DC) exec -T parser-worker python -c "import socket; socket.create_connection(('postgres', 5432), timeout=2)" 2>&1 \
		|| (echo "FAIL: parser-worker reached postgres — network isolation broken"; exit 1)
	@echo "OK: parser-worker is isolated from postgres"

# Auto-create .env from .env.example so the first `make dev` doesn't fail
# on missing substitution variables. User MUST edit secrets before going to prod.
.env:
	@if [ ! -f .env ]; then \
		echo ">>> Creating .env from .env.example (edit secrets before production!)"; \
		cp .env.example .env; \
	fi

# ---- Quality gates -----------------------------------------------------------

.PHONY: lint
lint: lint-backend lint-landing ## ruff + mypy (backend) + eslint (landing)

.PHONY: lint-backend
lint-backend:
	cd $(BACKEND) && poetry run ruff check app tests
	cd $(BACKEND) && poetry run ruff format --check app tests
	cd $(BACKEND) && poetry run lint-imports

.PHONY: lint-landing
lint-landing:
	cd $(LANDING) && npm run lint

.PHONY: format
format: ## Apply formatters in-place (ruff format, prettier)
	cd $(BACKEND) && poetry run ruff format app tests
	cd $(BACKEND) && poetry run ruff check --fix app tests
	cd $(LANDING) && npx prettier --write .

.PHONY: typecheck
typecheck: typecheck-backend typecheck-landing ## mypy strict + tsc --noEmit

.PHONY: typecheck-backend
typecheck-backend:
	cd $(BACKEND) && poetry run mypy app

.PHONY: typecheck-landing
typecheck-landing:
	cd $(LANDING) && npm run typecheck

# ---- Tests -------------------------------------------------------------------

.PHONY: test
test: test-backend test-landing ## pytest unit+integration+security subset, vitest

.PHONY: test-backend
test-backend:
	cd $(BACKEND) && poetry run pytest -m "not e2e and not slow"

.PHONY: test-landing
test-landing:
	cd $(LANDING) && npm test

.PHONY: test-full
test-full: ## Full pytest (incl. e2e) + landing
	cd $(BACKEND) && poetry run pytest
	cd $(LANDING) && npm test

# ---- Security gates ----------------------------------------------------------

.PHONY: security-check
security-check: security-backend security-landing security-secrets ## bandit + pip-audit + npm audit + gitleaks

.PHONY: security-backend
security-backend:
	cd $(BACKEND) && poetry run bandit -r app -ll -c pyproject.toml
	cd $(BACKEND) && poetry run pip-audit --strict

.PHONY: security-landing
security-landing:
	cd $(LANDING) && npm audit --audit-level=high

.PHONY: security-secrets
security-secrets:
	@command -v gitleaks >/dev/null 2>&1 || { echo "gitleaks not installed: brew install gitleaks"; exit 1; }
	gitleaks detect --no-banner --redact --source .

# ---- Migrations --------------------------------------------------------------

.PHONY: migrate
migrate: ## Run alembic upgrade head
	cd $(BACKEND) && poetry run alembic upgrade head

.PHONY: migrate-down
migrate-down:
	cd $(BACKEND) && poetry run alembic downgrade -1

.PHONY: makemigration
makemigration:
	@read -p "Migration name: " name; \
	cd $(BACKEND) && poetry run alembic revision --autogenerate -m "$$name"

# ---- Deploy ------------------------------------------------------------------

.PHONY: deploy
deploy: ## Build, push, ssh, compose up on prod (not implemented in MVP scaffold)
	@echo "Deploy pipeline lives in infra/scripts/deploy.sh — implemented in T8.x"
	@exit 1

# ---- Housekeeping ------------------------------------------------------------

.PHONY: clean
clean:
	find . -type d -name "__pycache__" -prune -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -prune -exec rm -rf {} +
	find . -type d -name ".mypy_cache" -prune -exec rm -rf {} +
	find . -type d -name ".ruff_cache" -prune -exec rm -rf {} +
	find . -type d -name "node_modules" -prune -exec rm -rf {} +
	find . -type d -name ".next" -prune -exec rm -rf {} +
