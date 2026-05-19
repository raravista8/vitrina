"""HTTP middleware + exception handlers for the FastAPI API.

Order of operations (outermost → innermost in `app.main.create_app`):
  1. RequestIDMiddleware     — binds `request_id` to contextvar + structlog
  2. SecurityHeadersMiddleware — adds CSP/HSTS/X-Frame/etc. to every response
  3. Route handlers
  4. register_exception_handlers — maps every error to the canonical envelope
"""

from app.api.middleware.error_handler import register_exception_handlers
from app.api.middleware.headers import HSTS_VALUE, SecurityHeadersMiddleware
from app.api.middleware.rate_limit import RateLimiter
from app.api.middleware.request_id import (
    REQUEST_ID_HEADER,
    RequestIDMiddleware,
    current_request_id,
)

__all__ = [
    "HSTS_VALUE",
    "REQUEST_ID_HEADER",
    "RateLimiter",
    "RequestIDMiddleware",
    "SecurityHeadersMiddleware",
    "current_request_id",
    "register_exception_handlers",
]
