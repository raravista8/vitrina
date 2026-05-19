"""Template rendering for customer sites (T2.3).

Pure functions: takes a context dict, returns rendered strings. No I/O,
no SQLAlchemy, no S3. The publisher orchestrator (``service.py``) wires
the I/O around this.

The Jinja2 environment is configured with ``autoescape=True`` globally
per CLAUDE.md hard rule — every variable rendered into HTML is escaped,
and ``{{ x | safe }}`` is forbidden by the template lint rule.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, select_autoescape


@dataclass(frozen=True, slots=True)
class RenderedSite:
    """The three files a published site consists of."""

    index_html: str
    sitemap_xml: str
    robots_txt: str

    def as_uploads(self) -> dict[str, tuple[str, str]]:
        """Return ``{key: (content, content_type)}`` for the uploader."""
        return {
            "index.html": (self.index_html, "text/html; charset=utf-8"),
            "sitemap.xml": (self.sitemap_xml, "application/xml; charset=utf-8"),
            "robots.txt": (self.robots_txt, "text/plain; charset=utf-8"),
        }


def make_environment(template_dir: Path) -> Environment:
    """Build a Jinja2 environment with autoescape ON for HTML/XML.

    Exposed for tests so they can render against the same env the
    publisher uses, removing autoescape surprises.
    """
    return Environment(
        loader=FileSystemLoader(str(template_dir)),
        autoescape=select_autoescape(default=True, default_for_string=True),
        trim_blocks=True,
        lstrip_blocks=True,
    )


def render_site(
    *,
    template_dir: Path,
    context: dict[str, Any],
) -> RenderedSite:
    """Render the three customer-site templates with ``context``.

    ``context`` must contain at least ``site_url`` (used by sitemap +
    robots). The caller is responsible for building the full context
    from the Site row + generated content — see ``service.build_context``.
    """
    env = make_environment(template_dir)

    # ``last_modified`` is used by sitemap.xml.j2. Defaulting here keeps
    # callers terse — they only override if they have a real value.
    sitemap_ctx = {"last_modified": _today_iso(), **context}

    return RenderedSite(
        index_html=env.get_template("index.html.j2").render(**context),
        sitemap_xml=env.get_template("sitemap.xml.j2").render(**sitemap_ctx),
        robots_txt=env.get_template("robots.txt.j2").render(**context),
    )


def _today_iso() -> str:
    return datetime.now(UTC).date().isoformat()
