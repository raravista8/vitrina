"""Site publishing orchestrator (T2.3).

Single entry point for the founder-driven publish flow:

  1. Build the render context from snapshot + generated_content + settings
  2. Render index.html + sitemap.xml + robots.txt
  3. Upload all three to CDN-fronted storage
  4. Fire multi-engine SEO submission (T2.6)
  5. Notify the site owner via the multi-channel dispatcher (T1.6)
  6. Return a ``PublishResult`` the admin router records as audit log

This module is in ``core/`` and never imports SQLAlchemy / FastAPI /
boto3 — the admin router builds the ``PublishContext`` from the ORM
side and calls ``SitePublisher.publish`` with it.

Failure isolation: a broken SEO adapter or a missed Telegram delivery
must NOT roll back the publish. The site is live the moment the upload
succeeds; SEO + notification failures are recorded and surfaced in the
result for the admin UI.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from app.core.notify.dispatcher import NotificationDispatcher, UserContact
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.core.publishing.ports import StaticUploader
from app.core.publishing.render import RenderedSite, render_site
from app.core.seo.ports import SeoEngine
from app.core.seo.service import SeoSubmissionReport, SeoSubmissionService
from app.utils.logging import get_logger


@dataclass(frozen=True, slots=True)
class PublishContext:
    """Everything the publisher needs about a site. Built by the admin
    router from the Site + User ORM rows so this module stays pure-domain.
    """

    site_id: str
    subdomain: str
    site_url: str  # canonical https://<subdomain>.vitrina.site
    render_context: dict[str, Any]  # passes through to the Jinja2 template
    owner_contact: UserContact


@dataclass(frozen=True, slots=True)
class PublishResult:
    site_id: str
    site_url: str
    uploaded_keys: list[str]
    seo_report: SeoSubmissionReport
    notification_delivered: bool
    notification_reason: str | None = None
    rendered: RenderedSite | None = field(default=None, repr=False)

    @property
    def seo_log(self) -> dict[str, Any]:
        """Shape for ``sites.seo_submission_log`` JSONB column."""
        return {
            r.engine.value: {
                "submitted": r.submitted,
                "reason": r.reason,
                "upstream_status": r.upstream_status,
            }
            for r in self.seo_report.results
        }


class SitePublisher:
    """Composition root for the publish flow.

    Channels are injected so tests can pass fakes for uploader, SEO, and
    dispatcher independently. Lifespan wires the production triple.
    """

    def __init__(
        self,
        *,
        template_dir: Path,
        uploader: StaticUploader,
        seo: SeoSubmissionService,
        notifier: NotificationDispatcher,
    ) -> None:
        self._template_dir = template_dir
        self._uploader = uploader
        self._seo = seo
        self._notifier = notifier
        self._log = get_logger("core.publishing.service")

    async def publish(self, ctx: PublishContext) -> PublishResult:
        rendered = render_site(template_dir=self._template_dir, context=ctx.render_context)
        uploaded_keys = await self._upload_all(ctx.subdomain, rendered)

        self._log.info(
            "site_uploaded",
            site_id=ctx.site_id,
            site_url=ctx.site_url,
            keys=uploaded_keys,
        )

        seo_report = await self._seo.submit(ctx.site_url)
        self._log.info(
            "site_seo_submitted",
            site_id=ctx.site_id,
            engines=[e.value for e in _all_engines()],
            succeeded=[e.value for e in seo_report.succeeded_engines],
        )

        delivery = await self._notifier.notify_user(
            contact=ctx.owner_contact,
            kind=NotificationKind.site_published,
            message=NotificationMessage(
                title="Ваш сайт опубликован",
                body=f"Сайт готов: {ctx.site_url}",
                links=(("Открыть сайт", ctx.site_url),),
            ),
        )
        if not delivery.delivered:
            self._log.warning(
                "publish_notification_failed",
                site_id=ctx.site_id,
                channel=delivery.channel.value,
                reason=delivery.reason,
            )

        return PublishResult(
            site_id=ctx.site_id,
            site_url=ctx.site_url,
            uploaded_keys=uploaded_keys,
            seo_report=seo_report,
            notification_delivered=delivery.delivered,
            notification_reason=delivery.reason,
            rendered=rendered,
        )

    async def _upload_all(self, subdomain: str, rendered: RenderedSite) -> list[str]:
        uploaded: list[str] = []
        for filename, (content, content_type) in rendered.as_uploads().items():
            key = f"{subdomain}/{filename}"
            await self._uploader.upload_text(key=key, content=content, content_type=content_type)
            uploaded.append(key)
        await self._uploader.invalidate(keys=uploaded)
        return uploaded


def _all_engines() -> list[SeoEngine]:
    return list(SeoEngine)
