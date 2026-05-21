# syntax=docker/dockerfile:1.7
# Vitrina backend — single image, multiple entrypoints (api / parser / content / sync / bot).
# Per ADR-0002 the same codebase ships in every container; CMD is overridden in docker-compose.

# ---- Stage 1: build dependencies --------------------------------------------
FROM python:3.12-slim-bookworm AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    POETRY_VERSION=1.8.3 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true

# System packages required to build native deps (lxml, cryptography, pillow, python-magic, asyncpg).
# `ForceIPv4=true`: Docker's build network namespace prefers AAAA records when present, but the host
# (and a number of Debian mirrors) lack stable IPv6 routing — this strands `apt-get update` on long
# TCP timeouts. Forcing IPv4 makes the build deterministic across hosts. See
# docs/runbooks/troubleshooting-deploy.md §"Docker build apt timeouts".
RUN apt-get -o Acquire::ForceIPv4=true update \
    && apt-get -o Acquire::ForceIPv4=true install -y --no-install-recommends \
        build-essential \
        libffi-dev \
        libssl-dev \
        libxml2-dev \
        libxslt1-dev \
        libjpeg-dev \
        libpq-dev \
        libmagic1 \
        zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install "poetry==${POETRY_VERSION}"

WORKDIR /app

COPY backend/pyproject.toml backend/poetry.lock* ./
RUN poetry install --only main --no-root --no-ansi

# ---- Stage 2: runtime --------------------------------------------------------
FROM python:3.12-slim-bookworm AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:${PATH}"

# Runtime libs only (no -dev packages). IPv4 forced for the same reason as the builder stage.
RUN apt-get -o Acquire::ForceIPv4=true update \
    && apt-get -o Acquire::ForceIPv4=true install -y --no-install-recommends \
        libxml2 \
        libxslt1.1 \
        libjpeg62-turbo \
        libpq5 \
        libmagic1 \
        zlib1g \
        ca-certificates \
        tini \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system --gid 1000 vitrina \
    && useradd  --system --uid 1000 --gid vitrina --create-home vitrina

WORKDIR /app

COPY --from=builder /app/.venv /app/.venv
COPY --chown=vitrina:vitrina backend/app ./app
COPY --chown=vitrina:vitrina backend/alembic ./alembic
COPY --chown=vitrina:vitrina backend/alembic.ini ./alembic.ini
# Customer-site Jinja2 templates (T2.3 publisher renders these). The
# build context is the repo root (see infra/docker-compose.yml) so
# `sites-template/` is available next to `backend/`.
COPY --chown=vitrina:vitrina sites-template ./sites-template

USER vitrina
EXPOSE 8000

ENTRYPOINT ["/usr/bin/tini", "--"]
# Default CMD = api; overridden per service in docker-compose.yml
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
