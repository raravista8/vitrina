"""Application configuration.

Pydantic Settings, fail-fast: the process refuses to start if a required
secret is missing in production. See `docs/ARCHITECTURE.md` §11.

T0.1 covers the minimum surface needed for `app.main` to import. Subsequent
tasks expand this with per-domain config blocks (auth, leads, parsers, etc).
"""

from __future__ import annotations

from enum import StrEnum
from functools import lru_cache
from typing import Self

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Environment(StrEnum):
    development = "development"
    staging = "staging"
    production = "production"


class LogLevel(StrEnum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ---- Core --------------------------------------------------------------
    environment: Environment = Environment.development
    debug: bool = True
    log_level: LogLevel = LogLevel.INFO
    app_base_url: str = "http://localhost:8000"
    landing_base_url: str = "http://localhost:3000"
    sites_base_domain: str = "vitrina.site"

    # ---- Datastores --------------------------------------------------------
    # Defaults assume a local Postgres with peer/trust auth (no password) —
    # suitable for `poetry run uvicorn` on the host without docker-compose.
    # docker-compose and prod override DATABASE_URL / ALEMBIC_DATABASE_URL
    # via env vars with the full Basic-Auth form (see .env.example).
    database_url: str = "postgresql+asyncpg://localhost/vitrina"
    alembic_database_url: str = "postgresql+psycopg://localhost/vitrina"
    redis_url: str = "redis://redis:6379/0"

    # ---- Sentry ------------------------------------------------------------
    sentry_dsn: str | None = None
    sentry_environment: str = "development"
    sentry_traces_sample_rate: float = Field(default=0.1, ge=0.0, le=1.0)

    # ---- Yandex SmartCaptcha (T1.5) ----------------------------------------
    # The client_key is exposed to the browser via NEXT_PUBLIC_* on the
    # landing side; here we keep only the server_key. Empty in dev — the
    # verifier accepts the literal "DEV_TOKEN" then. Required in prod;
    # `build_captcha_verifier` refuses to start without it.
    yandex_smartcaptcha_server_key: str | None = None

    # ---- Notifications (T1.6) ----------------------------------------------
    # Founder's own TG chat — destination for admin alerts. When empty the
    # NotificationDispatcher.notify_founder() logs a warning and no-ops.
    tg_bot_token: str | None = None
    tg_admin_chat_id: str | None = None

    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from: str = "noreply@vitrina.site"

    # ---- Yandex Geosearch (T1.4b preview adapter) --------------------------
    yandex_geosearch_api_key: str | None = None

    # ---- SEO submitters (T2.6) ---------------------------------------------
    yandex_webmaster_api_key: str | None = None
    indexnow_site_key: str | None = None
    gsc_service_account_json: str | None = None  # path to JSON keyfile

    # ---- Static publishing (T2.3) ------------------------------------------
    # Yandex Object Storage credentials. When the bucket is unset the
    # publisher uses an in-memory uploader so `make dev` works without
    # cloud credentials — the rendered HTML is held in app memory and
    # served only to the admin preview (production deploys configure all
    # four envs).
    s3_bucket: str | None = None
    s3_access_key: str | None = None
    s3_secret_key: str | None = None
    s3_endpoint_url: str = "https://storage.yandexcloud.net"
    s3_region: str = "ru-central1"
    cdn_base_url: str = "https://vitrina.site"
    # Filesystem location of the Jinja2 customer-site templates. Default
    # path is the repo-root sibling of ``backend/``; the Dockerfile copies
    # ``sites-template/`` next to ``app/`` so the same code resolves the
    # right path in production as long as SITES_TEMPLATE_DIR is unset.
    sites_template_dir: str | None = None

    # ---- Rate limits -------------------------------------------------------
    rate_limit_applications_per_ip_per_hour: int = 3
    rate_limit_leads_per_ip_per_hour: int = 3
    rate_limit_leads_per_ip_per_day: int = 10
    rate_limit_preview_per_ip_per_min: int = 10
    rate_limit_admin_login_per_ip_per_15min: int = 5

    # ---- Admin auth (T2.1) -------------------------------------------------
    # Signs the session cookie. Generate with `python -c "import secrets;
    # print(secrets.token_urlsafe(32))"`. Required in production — the
    # validator below refuses to start without it.
    session_secret_key: str = "dev-only-not-secure"  # noqa: S105 # pragma: allowlist secret

    # ---- Feature flags -----------------------------------------------------
    feature_max_bot: bool = False
    feature_auto_sync: bool = False

    @model_validator(mode="after")
    def _validate_production(self) -> Self:
        if self.environment is Environment.production:
            if self.debug:
                raise ValueError("DEBUG must be false in production")
            if self.log_level is LogLevel.DEBUG:
                raise ValueError("LOG_LEVEL=DEBUG is forbidden in production")
            if self.session_secret_key == "dev-only-not-secure":  # noqa: S105 # pragma: allowlist secret
                raise ValueError("SESSION_SECRET_KEY must be set in production")
        return self


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Singleton accessor. Tests can clear via `get_settings.cache_clear()`."""
    return Settings()
