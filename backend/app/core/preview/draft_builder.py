"""Instant-preview draft builder — async, in-process, time-budgeted.

``POST /api/preview/draft`` spawns one asyncio task per draft (the same
pragmatic in-api-process pattern as the T1.4b light preview — NOT the
parser-worker/RQ path; the latency budget is ≤30–40 s and the result is
ephemeral). The task walks the poll stages (``fetching → photos →
reviews → styling``) writing ``DraftState`` to Redis after each
transition, so ``GET /api/preview/draft/{id}`` shows live progress.

Per-source reality (no Playwright, no LLM in the synchronous path —
ТЗ rev.1 §6):

  - ``yandex_maps``  — Geosearch metadata (name/category/rating);
    photos & review bodies are NOT exposed by the API → sparse draft.
  - ``telegram``     — public ``t.me/s/<channel>`` web view via the
    existing T3.5 adapter: title + up to 9 post photos.
  - ``website``      — og:title / og:image / description of the page.
  - ``twogis``/``avito`` — best-effort og-tag fetch; these hosts often
    block bots → honest ``failed`` when no name comes back.

SECURITY: every outbound fetch of a user-supplied URL goes through
``core/parsing/url_validator`` (scheme + IP-literal + DNS private-range
checks). Geosearch calls hit OUR api host with the user URL as a text
parameter — no direct fetch of the user URL, so no SSRF surface there.
"""

from __future__ import annotations

import asyncio
import re
import uuid
from html.parser import HTMLParser
from typing import Protocol
from urllib.parse import urlparse

from app.core.parsing.adapters.telegram_webview import TelegramWebViewAdapter
from app.core.parsing.ports import ParsingError
from app.core.parsing.url_validator import validate_source_url
from app.core.preview.draft import (
    MAX_CATEGORY_LEN,
    MAX_NAME_LEN,
    MAX_SERVICE_TITLE_LEN,
    BuildStage,
    CandidatePayload,
    CandidateStore,
    DraftBuildError,
    DraftCounts,
    DraftServiceItem,
    DraftSourceType,
    DraftState,
    DraftStatus,
    DraftStore,
    PreviewDraft,
    clean_photo_urls,
    clean_text,
    pick_theme,
)
from app.core.preview.search import GeosearchGateway, parse_rating
from app.utils.logging import get_logger

TOTAL_BUILD_BUDGET_SECONDS = 30.0
PER_FETCH_TIMEOUT_SECONDS = 5.0

# Any-domain allowlist for the generic website path: the regex layer
# only rejects IP literals / bad schemes; the real SSRF gate is the
# DNS-resolution private-range check inside validate_source_url.
ANY_DOMAIN_ALLOWLIST: tuple[str, ...] = (r".+",)

_TG_HOST_RE = re.compile(r"^(?:www\.)?(?:t|telegram)\.me$")
_YMAPS_HOST_RE = re.compile(r"^(?:www\.)?(?:maps\.)?yandex\.[a-z.]+$")
_TWOGIS_HOST_RE = re.compile(r"^(?:www\.)?2gis\.[a-z.]+$")
_AVITO_HOST_RE = re.compile(r"^(?:www\.|m\.)?avito\.ru$")


class HtmlFetcher(Protocol):
    """Plain text-over-HTTP gateway (same shape as the T3.5 adapter's
    ``HttpGateway``). The concrete httpx implementation lives in
    ``app.infrastructure.http_fetch`` and enforces the 2 MB read cap +
    no-redirect policy."""

    async def get_text(self, *, url: str, timeout: float) -> str: ...  # noqa: ASYNC109


def detect_draft_source(url: str) -> DraftSourceType:
    """URL → one of the 5 frozen ``PreviewDraft.source`` values.
    ``website`` is the catch-all for any other http(s) URL."""
    host = (urlparse(url).hostname or "").lower()
    if _TG_HOST_RE.match(host):
        return DraftSourceType.telegram
    if _YMAPS_HOST_RE.match(host):
        return DraftSourceType.yandex_maps
    if _TWOGIS_HOST_RE.match(host):
        return DraftSourceType.twogis
    if _AVITO_HOST_RE.match(host):
        return DraftSourceType.avito
    return DraftSourceType.website


class DraftFetchers:
    """Per-source draft assembly. Pure orchestration over injected
    gateways — instantiated once in the lifespan with the concrete
    Geosearch client + httpx fetcher."""

    def __init__(
        self,
        *,
        geosearch: GeosearchGateway,
        html_fetcher: HtmlFetcher,
        allow_url_resolution: bool = True,
    ) -> None:
        self._geosearch = geosearch
        self._html_fetcher = html_fetcher
        self._allow_resolution = allow_url_resolution

    async def from_candidate(self, payload: CandidatePayload) -> PreviewDraft:
        """Candidate path — everything we need was captured at search
        time; zero upstream calls. Always sparse (Geosearch exposes no
        photo URLs / review bodies)."""
        theme_id, family_id = pick_theme(payload.category)
        return PreviewDraft(
            source=DraftSourceType.yandex_maps,
            name=payload.name,
            category=payload.category,
            district=None,
            rating=payload.rating,
            photos=[],
            reviews=[],
            services=_services_from_category(payload.category),
            theme_id=theme_id,
            family_id=family_id,
        )

    async def from_url(self, url: str) -> PreviewDraft:
        source = detect_draft_source(url)
        if source is DraftSourceType.yandex_maps:
            return await self._from_ymaps_url(url)
        if source is DraftSourceType.telegram:
            return await self._from_telegram_url(url)
        # website / twogis / avito → og-tag scrape of the page itself.
        return await self._from_og_page(url, source)

    # --- per-source --------------------------------------------------------

    async def _from_ymaps_url(self, url: str) -> PreviewDraft:
        """Geosearch accepts the Я.Карты URL as its ``text`` param — we
        never fetch the user URL directly (no SSRF surface)."""
        if not self._geosearch.is_available():
            raise DraftBuildError("geosearch_not_configured")
        try:
            feature = await asyncio.wait_for(
                self._geosearch.fetch_business_payload(url),
                timeout=PER_FETCH_TIMEOUT_SECONDS,
            )
        except TimeoutError as exc:
            raise DraftBuildError("geosearch_timeout") from exc
        except Exception as exc:
            raise DraftBuildError(f"geosearch_error:{exc.__class__.__name__}") from exc
        if feature is None:
            raise DraftBuildError("ymaps_no_match")

        properties = feature.get("properties")
        properties = properties if isinstance(properties, dict) else {}
        company = properties.get("CompanyMetaData")
        company = company if isinstance(company, dict) else {}

        name = clean_text(company.get("name"), limit=MAX_NAME_LEN)
        if name is None:
            raise DraftBuildError("ymaps_no_name")

        category: str | None = None
        categories = company.get("Categories")
        if isinstance(categories, list) and categories and isinstance(categories[0], dict):
            category = clean_text(categories[0].get("name"), limit=MAX_CATEGORY_LEN)

        theme_id, family_id = pick_theme(category)
        return PreviewDraft(
            source=DraftSourceType.yandex_maps,
            name=name,
            category=category,
            district=None,  # Geosearch has no district granularity without extra calls
            rating=parse_rating(company.get("ratings")),
            photos=[],  # photo URLs are not exposed by the Geosearch API
            reviews=[],  # review bodies are not exposed by the Geosearch API
            services=_services_from_category(category),
            theme_id=theme_id,
            family_id=family_id,
        )

    async def _from_telegram_url(self, url: str) -> PreviewDraft:
        """Public ``t.me/s/<channel>`` web view via the existing T3.5
        adapter (it runs the SSRF gate against the t.me allowlist)."""
        adapter = TelegramWebViewAdapter(
            self._html_fetcher, allow_url_resolution=self._allow_resolution
        )
        try:
            snapshot = await asyncio.wait_for(adapter.parse(url), timeout=PER_FETCH_TIMEOUT_SECONDS)
        except TimeoutError as exc:
            raise DraftBuildError("telegram_timeout") from exc
        except ParsingError as exc:
            raise DraftBuildError(f"telegram_error:{exc.__class__.__name__}") from exc

        name = clean_text(snapshot.title, limit=MAX_NAME_LEN)
        if name is None:
            raise DraftBuildError("telegram_no_title")

        photos = clean_photo_urls([p.url for p in snapshot.photos if p.url])
        theme_id, family_id = pick_theme(None)
        return PreviewDraft(
            source=DraftSourceType.telegram,
            name=name,
            category=None,  # a channel doesn't declare a niche
            district=None,
            rating=None,
            photos=photos,
            reviews=[],
            services=[],
            theme_id=theme_id,
            family_id=family_id,
        )

    async def _from_og_page(self, url: str, source: DraftSourceType) -> PreviewDraft:
        """Generic og-tag scrape — SSRF-gated, redirect-free, ≤2 MB."""
        try:
            validate_source_url(
                url,
                domain_allowlist=ANY_DOMAIN_ALLOWLIST,
                allow_resolution=self._allow_resolution,
            )
        except ParsingError as exc:
            raise DraftBuildError(f"url_blocked:{exc.__class__.__name__}") from exc

        try:
            html = await asyncio.wait_for(
                self._html_fetcher.get_text(url=url, timeout=PER_FETCH_TIMEOUT_SECONDS),
                timeout=PER_FETCH_TIMEOUT_SECONDS + 1.0,
            )
        except TimeoutError as exc:
            raise DraftBuildError("page_timeout") from exc
        except Exception as exc:
            raise DraftBuildError(f"page_fetch_error:{exc.__class__.__name__}") from exc

        og = _scan_og_tags(html)
        name = clean_text(og.title, limit=MAX_NAME_LEN)
        if name is None:
            # twogis/avito routinely bot-block; degrade honestly.
            raise DraftBuildError("page_no_title")

        photos = clean_photo_urls([og.image] if og.image else [])
        theme_id, family_id = pick_theme(og.description)
        return PreviewDraft(
            source=source,
            name=name,
            category=None,
            district=None,
            rating=None,
            photos=photos,
            reviews=[],
            services=[],
            theme_id=theme_id,
            family_id=family_id,
        )


def _services_from_category(category: str | None) -> list[DraftServiceItem]:
    """Geosearch sometimes carries only the category — surface it as a
    single price-less service line so the sparse preview's price block
    isn't empty («цену уточним при полной сборке» on the frontend)."""
    title = clean_text(category, limit=MAX_SERVICE_TITLE_LEN)
    if title is None:
        return []
    return [DraftServiceItem(title=title, price=None)]


# --- og-tag scanner (stdlib only, same approach as the T3.5 adapter) ---------


class _OgResult:
    title: str | None = None
    description: str | None = None
    image: str | None = None


class _OgScanner(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.og_title: str | None = None
        self.og_description: str | None = None
        self.og_image: str | None = None
        self.dom_title: str | None = None
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "title":
            self._in_title = True
            return
        if tag != "meta":
            return
        attrs_dict = {k: v for k, v in attrs if v is not None}
        prop = (attrs_dict.get("property") or attrs_dict.get("name") or "").lower()
        content = attrs_dict.get("content")
        if not content:
            return
        if prop == "og:title" and not self.og_title:
            self.og_title = content
        elif prop in {"og:description", "description"} and not self.og_description:
            self.og_description = content
        elif prop == "og:image" and not self.og_image:
            self.og_image = content

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title and not self.dom_title:
            stripped = data.strip()
            if stripped:
                self.dom_title = stripped


def _scan_og_tags(html: str) -> _OgResult:
    scanner = _OgScanner()
    scanner.feed(html)
    scanner.close()
    result = _OgResult()
    result.title = scanner.og_title or scanner.dom_title
    result.description = scanner.og_description
    result.image = scanner.og_image
    return result


# --- service: task orchestration over the store -------------------------------


class PreviewDraftService:
    """Owns draft lifecycle: mint id → seed ``building/fetching`` state →
    spawn the build task → expose poll reads. Holds strong references to
    in-flight tasks so they aren't garbage-collected mid-build."""

    def __init__(
        self,
        *,
        store: DraftStore,
        candidates: CandidateStore,
        fetchers: DraftFetchers,
        total_budget_seconds: float = TOTAL_BUILD_BUDGET_SECONDS,
    ) -> None:
        self._store = store
        self._candidates = candidates
        self._fetchers = fetchers
        self._budget = total_budget_seconds
        self._tasks: set[asyncio.Task[None]] = set()
        self._log = get_logger("core.preview.draft_builder")

    async def start_from_url(self, url: str) -> str:
        return await self._start(url=url, candidate=None)

    async def start_from_candidate(self, candidate_id: str) -> str | None:
        """``None`` when the candidate id is unknown or expired."""
        payload = await self._candidates.load(candidate_id)
        if payload is None:
            return None
        return await self._start(url=None, candidate=payload)

    async def get_state(self, draft_id: str) -> DraftState | None:
        return await self._store.load(draft_id)

    # --- internals -----------------------------------------------------------

    async def _start(self, *, url: str | None, candidate: CandidatePayload | None) -> str:
        draft_id = str(uuid.uuid4())
        await self._store.save(
            draft_id,
            DraftState(
                status=DraftStatus.building,
                stage=BuildStage.fetching,
                counts=DraftCounts(),
            ),
        )
        task = asyncio.create_task(self._build(draft_id, url=url, candidate=candidate))
        self._tasks.add(task)
        task.add_done_callback(self._tasks.discard)
        return draft_id

    async def _build(
        self, draft_id: str, *, url: str | None, candidate: CandidatePayload | None
    ) -> None:
        try:
            if candidate is not None:
                draft = await asyncio.wait_for(
                    self._fetchers.from_candidate(candidate), timeout=self._budget
                )
            elif url is not None:
                draft = await asyncio.wait_for(self._fetchers.from_url(url), timeout=self._budget)
            else:  # pragma: no cover — guarded by the router's XOR validation
                raise DraftBuildError("no_source")
        except DraftBuildError as exc:
            self._log.info("preview_draft_failed", draft_id=draft_id, reason=str(exc))
            await self._save_failed(draft_id)
            return
        except Exception as exc:
            # No URL / no PII in the log line — error class only.
            self._log.warning(
                "preview_draft_crashed", draft_id=draft_id, error=exc.__class__.__name__
            )
            await self._save_failed(draft_id)
            return

        # Fetchers already cap photos at 9 and reviews at 4.
        counts = DraftCounts(photos=len(draft.photos), reviews=len(draft.reviews))
        # Real stage transitions — written back-to-back because the fetch
        # is one-shot per source; no artificial delays (anti-«AI-театр»).
        for stage in (BuildStage.photos, BuildStage.reviews, BuildStage.styling):
            await self._store.save(
                draft_id,
                DraftState(status=DraftStatus.building, stage=stage, counts=counts),
            )
        await self._store.save(
            draft_id,
            DraftState(
                status=DraftStatus.ready,
                stage=BuildStage.styling,
                counts=counts,
                draft=draft,
            ),
        )
        self._log.info(
            "preview_draft_ready",
            draft_id=draft_id,
            source=draft.source.value,
            photos=counts.photos,
            reviews=counts.reviews,
        )

    async def _save_failed(self, draft_id: str) -> None:
        await self._store.save(
            draft_id,
            DraftState(
                status=DraftStatus.failed,
                stage=BuildStage.fetching,
                counts=DraftCounts(),
            ),
        )
