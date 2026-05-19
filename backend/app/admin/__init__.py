"""FastAPI admin namespace.

Hosts the Jinja2 environment used by every admin route. The templates
live under ``app/admin/templates/`` and use auto-escaping unconditionally
(SECURITY.md A05; CLAUDE.md conventions — no `{{ x | safe }}` allowed).
"""

from __future__ import annotations

from pathlib import Path

from fastapi.templating import Jinja2Templates

_TEMPLATES_DIR = Path(__file__).parent / "templates"

admin_templates = Jinja2Templates(directory=str(_TEMPLATES_DIR))
# autoescape defaults to True for .html/.xml; explicit assertion below
# documents the invariant so a future tweak doesn't silently disable it.
assert admin_templates.env.autoescape, "admin templates must auto-escape"
