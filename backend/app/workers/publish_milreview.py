"""Build + publish the *milreview* content site to static hosting.

milreview is a hand-built content site (not an LLM-generated booking page), so
it has its own one-shot publish path instead of going through the admin
``/sites/{id}/publish`` flow. This CLI renders every page via
``app.core.publishing.milreview.render_all`` and uploads them to the S3 origin
under the ``milreview/`` key prefix — exactly where Caddy's ``*.samosite.online``
wildcard looks for ``milreview.samosite.online/*``.

Run inside the api container (it has the S3 credentials + template files):

    # dry-run to a local dir (no credentials needed) — eyeball the output:
    python -m app.workers.publish_milreview --out /tmp/milreview-dist

    # publish to S3 (Yandex Object Storage) under milreview/:
    python -m app.workers.publish_milreview

``--base-url`` overrides the canonical/OG/sitemap host (default derived from
``SITES_BASE_DOMAIN`` → ``https://milreview.samosite.online``).
"""

from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from app.config import get_settings
from app.core.publishing.milreview import render_all, resolve_milreview_dir
from app.utils.logging import get_logger

# S3 key prefix == the subdomain Caddy strips when proxying the wildcard.
SUBDOMAIN = "milreview"


def _default_base_url() -> str:
    settings = get_settings()
    return f"https://{SUBDOMAIN}.{settings.sites_base_domain}"


def _write_local(out_dir: Path, files: dict[str, tuple[str, str]]) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    for key, (content, _ct) in files.items():
        dest = out_dir / key
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")


async def _upload_s3(files: dict[str, tuple[str, str]]) -> list[str]:
    from app.infrastructure.s3.uploader import S3StaticUploader

    settings = get_settings()
    if not (settings.s3_bucket and settings.s3_access_key and settings.s3_secret_key):
        raise SystemExit(
            "S3 is not configured (S3_BUCKET / S3_ACCESS_KEY / S3_SECRET_KEY). "
            "Use --out <dir> for a local dry-run."
        )
    uploader = S3StaticUploader(
        bucket=settings.s3_bucket,
        access_key=settings.s3_access_key,
        secret_key=settings.s3_secret_key,
        endpoint_url=settings.s3_endpoint_url,
        region=settings.s3_region,
        cdn_base_url=settings.cdn_base_url,
    )
    keys: list[str] = []
    for name, (content, content_type) in files.items():
        key = f"{SUBDOMAIN}/{name}"
        await uploader.upload_text(key=key, content=content, content_type=content_type)
        keys.append(key)
    await uploader.invalidate(keys=keys)
    return keys


def main() -> None:
    parser = argparse.ArgumentParser(description="Build + publish the milreview content site.")
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Write rendered files to this directory instead of uploading to S3 (dry-run).",
    )
    parser.add_argument(
        "--base-url",
        default=None,
        help="Canonical/OG/sitemap host. Default: https://milreview.<SITES_BASE_DOMAIN>.",
    )
    args = parser.parse_args()

    log = get_logger("workers.publish_milreview")
    base_url = args.base_url or _default_base_url()
    files = render_all(
        base_dir=resolve_milreview_dir(get_settings().sites_template_dir), base_url=base_url
    )

    if args.out is not None:
        _write_local(args.out, files)
        log.info("milreview_rendered_local", out=str(args.out), files=len(files), base_url=base_url)
        print(f"Wrote {len(files)} files to {args.out}")
        return

    keys = asyncio.run(_upload_s3(files))
    log.info("milreview_published", files=len(keys), base_url=base_url)
    print(f"Published {len(keys)} objects under {SUBDOMAIN}/ ({base_url})")


if __name__ == "__main__":
    main()
