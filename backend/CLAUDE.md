# Backend (Python + FastAPI + SQLAlchemy + RQ)

> Reads root `CLAUDE.md` first. This file adds backend-specific rules.

## Stack

- Python 3.12 (pyenv, `.python-version`)
- Poetry 1.8.3
- FastAPI + Pydantic v2 + uvicorn
- SQLAlchemy 2.0 (async) + Alembic
- Postgres 16 + Redis 7 (RQ for jobs)
- aiogram (Telegram bot — two bots, see ADR-0011)
- YandexGPT 5 Pro (only LLM — `openai`, `anthropic`, `google.generativeai` BLOCKED by import-linter)

## Architecture: hexagonal for high-risk modules

`backend/app/core/{parsing,content,auth,leads,consent}/` — domain logic, **NEVER imports from `app/infrastructure/`**. Use protocols/abstractions (`ports.py`), inject concrete adapters at the api boundary.

Other domains (`core/sites`, `core/billing`) — modular but not strictly hexagonal.

**Import-linter enforces:**
- `core/` cannot import `infrastructure/`, `api/`, `workers/`
- Blocked LLM/scraping libs (openai, telethon, instaloader, instagram_private_api, google.generativeai) cannot be imported anywhere
- `app.bot.intake` (`@SamositeIntakeBot`) and `app.bot.user` (`@SamositeBot`) cannot import each other — see ADR-0011

## Commands

| Command (from repo root) | What it does |
|--------------------------|--------------|
| `cd backend && poetry run pytest` | All backend tests |
| `cd backend && poetry run pytest -m "not slow"` | Fast subset (< 60s) |
| `cd backend && poetry run mypy --strict app` | Type-check |
| `cd backend && poetry run ruff check .` | Lint |
| `make security-check` | bandit + pip-audit + gitleaks |
| `make migrate` | alembic upgrade head |
| `cd backend && poetry run alembic revision --autogenerate -m "<slug>"` | Generate migration |

## File placement (backend-specific)

| What | Where |
|------|-------|
| FastAPI router | `app/api/<domain>.py` — thin, delegates to core |
| Domain service | `app/core/<domain>/service.py` |
| Repository protocol | `app/core/<domain>/ports.py` |
| Repository adapter | `app/infrastructure/<adapter>.py` |
| Pydantic request/response | `app/core/<domain>/schemas.py` |
| RQ job | `app/workers/<job>.py` |
| Bot handler (intake) | `app/bot/intake/<handler>.py` — for `@SamositeIntakeBot` |
| Bot handler (user) | `app/bot/user/<handler>.py` — for `@SamositeBot` |
| Unit test | `tests/unit/<domain>/test_<thing>.py` |
| Integration test | `tests/integration/test_<flow>.py` (real Postgres via `pytest-postgresql`) |
| Security test | `tests/security/test_<concern>.py` |
| E2E test | `tests/e2e/test_<flow>.py` (mark `@pytest.mark.slow`) |

**Prefer editing existing files** over creating new ones. If a router file exceeds ~300 lines, split by sub-domain.

## Conventions

- Result type: `from app.core.result import Result, Ok, Err` — return `Result[T, DomainError]` from core; raise only at api boundary
- All Pydantic models: `model_config = ConfigDict(extra='forbid', frozen=True)`
- Async-first: all I/O is async (`asyncpg`, `httpx.AsyncClient`, aiogram). Sync only in CPU work inside `asyncio.to_thread`
- IDs: `uuid.uuid4()` for public; `BigInteger` autoincrement for high-volume internal (`events`, `audit_log`)
- Datetimes: stored `TIMESTAMPTZ`, app uses UTC `datetime`, UI converts to MSK at render
- Logging: structlog, JSON output, mask PII (`phone`, `email`, `name`) via processor

## Testing rules

- Every endpoint: test happy path + auth failure + validation failure (Pydantic 422)
- Every `core/<domain>/service.py` function: unit test with mocked ports
- Every protected-path change: integration test exercising the full flow
- Security tests required for: URL allowlist (SSRF), LLM output sanitization, PII masking in logs, rate limits
- Use `pytest-postgresql` fixture for integration; never share state between tests
- Mark slow tests with `@pytest.mark.slow` so default `pytest -m "not slow"` stays under 60s

## Hard rules (backend-specific, in addition to root)

- NEVER use raw SQL with f-strings — ORM or `text(":param")` with bound params
- NEVER concat user input into shell — `subprocess.run([...], shell=False)` with list args
- NEVER fetch URL without allowlist check (SSRF) — use `app.core.parsing.url_validator.validate_url`
- NEVER log PII raw — pass through `app.infrastructure.logging.processors.mask_pii`
- NEVER send raw user content to LLM — wrap in `<user_content>...</user_content>`, obfuscate PII first via `app.core.content.obfuscator`
- NEVER add runtime dep without ADR in `docs/adr/`
- NEVER confuse `@SamositeIntakeBot` (intake/parsing) and `@SamositeBot` (user notifications) — see ADR-0011
- ALWAYS add rate-limit decorator to public endpoints (`@rate_limit(...)` from `app.api.deps`)
- ALWAYS run pytest + mypy --strict + `make security-check` before declaring done
- ALWAYS update tests in same commit when modifying `core/{auth,leads,parsing/url_validator,content/output_validator}`

## Reference

- `docs/SECURITY.md` — threat model + FZ-152 controls
- `docs/ARCHITECTURE.md` — overall structure
- `docs/adr/0002-modular-monolith.md` — why this architecture
- `docs/adr/0011-two-bot-architecture.md` — @SamositeIntakeBot vs @SamositeBot
