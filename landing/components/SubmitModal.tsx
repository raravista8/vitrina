"use client";

/**
 * SubmitModal — canon intake flow (link OR photo) + instant-preview
 * (canon 0.11.0 rev.2 «ниша-демо» — `docs/handoff/CANON_INSTANT_PREVIEW_REV2_TZ.md`).
 *
 * Classic branches (unchanged, canon 0.3.0):
 *
 *   link  : Step 1 (URL + mode-switcher)
 *           → Step 2 (contact + consent + captcha)
 *           → Step 3 (final confirm inline)
 *
 *   photo : Step 1 (photos + mode-switcher)
 *           → Step 2 (description + city + customer_contact + opt. text_files)
 *           → Step 3 (contact + consent + captcha)
 *           → Step 4 (final confirm inline)
 *
 * Instant-preview entry (rev.2) — ONLY when opened empty-handed
 * (`initialMode='link'` + blank `initialUrl`; a Hero URL keeps the
 * classic link flow above bit-for-bit):
 *
 *   Шаг 0 «Ниша» (entry.step='niche', client-side, no network)
 *   → Шаг 0b «Пример» (entry.step='demo' — demoDraftFor fixture, 0 s)
 *   → Шаг 1 «Источник» (entry.step='source' — search via
 *     GET /api/preview/search, link paste, or photo branch)
 *   → Сборка-морф / Превью (canon `preview` prop fed from
 *     POST /api/preview/draft + ~1.5 s poll; baseDraft = the demo
 *     draft so canon renders the морф «пример → черновик»)
 *   → Контакт → Готово (rev.1 steps 3/4)
 *
 * Graceful degradation: the preview backend may not be deployed —
 * search 404/невалидный envelope → canon's «Карты не отвечают» state
 * with the «Вставить ссылку» escape; draft POST failure → canon's
 * failed state → contact step (rev.1 fallback). Шаги 0/0b are pure
 * client-side and work regardless.
 *
 * Theme rule (ТЗ rev.2 §2): `activeTheme` lives here from шага 0b;
 * a swatch tap sets `userThemeTouched` — on draft ready the user's
 * choice wins, otherwise the modal adopts `draft.theme_id`.
 *
 * Renders canon's `<SubmitModal>` from `@samosite/canon/intake` as the
 * step view; this file owns state, branching, and the backend wiring
 * (POST /api/submit-application for link mode, multipart
 * /api/submit-application/photo for photo mode).
 *
 * Mode switcher visible on Step 1 in both branches — user can change
 * mind without closing. Per-branch state is preserved when switching
 * (the link `url` survives a switch to photo and back).
 */

import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import {
  SubmitModal as CanonSubmitModal,
  GENERIC_THEME_OPTIONS,
  demoDraftFor,
} from "@samosite/canon/intake";
import type {
  BuildCounts,
  BuildPollResponse,
  BuildStage,
  PreviewDraft,
  PreviewSource,
  SourceCandidate,
  SourceSearchError,
} from "@samosite/canon/intake";
import { getTheme } from "@samosite/canon/presets";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { reachGoal } from "@/lib/metrika";
import { type DraftRequestBody, createDraft, pollDraft, searchSource } from "@/lib/preview-api";
import { type SourceDetection, detectSource } from "@/lib/source-detect";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Map our `detectSource()` output to canon's `SOURCE_LIB` key (see
 * packages/canon/src/intake/index.tsx §SOURCE_LIB).
 *
 * Canon's `<LinkInput loading={!!url && !source}>` shows a green
 * spinner whenever url is set but source is null. To avoid an
 * infinite-spinner state, this function returns a non-null value for
 * EVERY non-empty input — empty input is handled separately by the
 * caller (returns `null` directly to suppress the badge).
 *
 *   - mvp/ymaps             → 'yandex_maps'  → ✓ Распознали: Яндекс.Карты
 *   - mvp/telegram          → 'telegram'     → ✓ Распознали: Telegram-канал
 *   - waitlist (vk/wa/yt)   → source key     → ⚠️  скоро поддержим
 *   - unknown_url / not_url → 'unknown'      → ⚠️  Не узнали источник
 */
function detectionToCanonSource(d: SourceDetection): string {
  switch (d.kind) {
    case "mvp":
      return d.type === "ymaps" ? "yandex_maps" : d.type;
    case "waitlist":
      return d.source;
    case "unknown_url":
    case "not_url":
      return "unknown";
  }
}

/** Debounce window before the URL is classified — fast enough to feel
 * live, slow enough that typing «https://t.m» doesn't briefly flash
 * «Не узнали источник» before the user finishes «https://t.me/...». */
const URL_DEBOUNCE_MS = 300;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type SubmitMode = "link" | "photo";

export interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Mode to open on. Hero "Сделать сайт" → 'link'; "или загрузите фото" → 'photo'. */
  initialMode?: SubmitMode;
  /** Pre-filled URL when opened from Hero with a non-empty input. */
  initialUrl?: string;
}

type Step = 1 | 2 | 3 | 4;

// ---------------------------------------------------------------------------
// Instant-preview flow types (rev.2)
// ---------------------------------------------------------------------------

/** rev.2 entry steps shown BEFORE the classic link/photo steps. `null` = classic flow. */
type EntryPhase = "niche" | "demo" | "source" | null;

/** What the user picked on шаге 0 — feeds `demoDraftFor()`. */
interface DemoSelection {
  nicheId: string | null;
  freeText: string;
}

/**
 * UI-side build status — superset of the backend poll status: `timeout`
 * is set by OUR >40 s timer (the backend never sends it, per canon
 * 0.10.0 CHANGELOG).
 */
interface PreviewUiState {
  status: "building" | "ready" | "failed" | "timeout";
  stage: BuildStage;
  counts: BuildCounts;
  draftSkeleton?: Partial<PreviewDraft>;
  draft?: PreviewDraft;
  source: PreviewSource;
}

interface DraftRun {
  body: DraftRequestBody;
  startedAt: number;
}

const DRAFT_POLL_INTERVAL_MS = 1500;
/** > 40 s building → canon's timeout state (ТЗ rev.1; the build keeps going async). */
const DRAFT_TIMEOUT_MS = 40_000;
/** Hard stop for the poll loop — past this we stay in `timeout` without new requests. */
const DRAFT_POLL_MAX_MS = 90_000;

/** Map our Hero classifier onto canon's `PreviewSource` for the build-step copy. */
function urlPreviewSource(url: string): PreviewSource {
  const d = detectSource(url);
  if (d.kind === "mvp") return d.type === "ymaps" ? "yandex_maps" : "telegram";
  return "website";
}

/** Human label for the «СТИЛЬ» summary row; falls back to the raw id. */
function themeLabelFor(themeId: string): string {
  try {
    return getTheme(themeId).label;
  } catch {
    return themeId;
  }
}

// ---------------------------------------------------------------------------
// Backend wiring helpers
// ---------------------------------------------------------------------------

interface SubmitOk {
  ok: true;
  application_id: string;
  contact_type: string;
}
interface SubmitFail {
  ok: false;
  code: string;
}
type SubmitResult = SubmitOk | SubmitFail;

async function submitLink(body: {
  url: string;
  source_type: string;
  channel: string;
  contact: string;
  consent: boolean;
  captcha_token: string;
}): Promise<SubmitResult> {
  const res = await fetch("/api/submit-application", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      mode: "link",
      source_url: body.url || undefined,
      source_type: body.source_type,
      channel: body.channel,
      contact: body.contact,
      consent_given: body.consent,
      captcha_token: body.captcha_token,
    }),
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, code: j?.error ?? `http_${res.status}` };
  }
  const j = (await res.json()) as { data: { application_id: string; contact_type: string } };
  return { ok: true, application_id: j.data.application_id, contact_type: j.data.contact_type };
}

async function submitPhoto(body: {
  files: File[];
  description: string;
  city: string;
  customer_contact_type: string;
  customer_contact_value: string;
  text_files: File[];
  channel: string;
  contact: string;
  consent: boolean;
  captcha_token: string;
}): Promise<SubmitResult> {
  const fd = new FormData();
  body.files.forEach((f) => fd.append("files", f));
  body.text_files.forEach((f) => fd.append("text_files", f));
  fd.append("contact", body.contact);
  fd.append("channel", body.channel);
  fd.append("consent_given", String(body.consent));
  fd.append("captcha_token", body.captcha_token);
  fd.append("description", body.description);
  fd.append("city", body.city);
  fd.append("customer_contact_type", body.customer_contact_type);
  fd.append("customer_contact_value", body.customer_contact_value);
  const res = await fetch("/api/submit-application/photo", {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, code: j?.error ?? `http_${res.status}` };
  }
  const j = (await res.json()) as { data: { application_id: string; contact_type: string } };
  return { ok: true, application_id: j.data.application_id, contact_type: j.data.contact_type };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SubmitModal({
  open,
  onOpenChange,
  initialMode = "link",
  initialUrl = "",
}: SubmitModalProps) {
  const [mode, setMode] = useState<SubmitMode>(initialMode);
  const [step, setStep] = useState<Step>(1);

  // Link branch state
  const [url, setUrl] = useState(initialUrl);

  // Photo branch state — preserved per-branch (canon CHANGELOG §1.9: «stale
  // URL при mode-switch сохраняется»).
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerContactType, setCustomerContactType] = useState<"phone" | "telegram">("phone");
  const [textFiles, setTextFiles] = useState<File[]>([]);

  // Shared contact step (used by both branches)
  const [channel, setChannel] = useState<"telegram" | "phone" | "email" | "max">("telegram");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(true);

  // Submit lifecycle
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inline validation messages shown when the user clicks
  // «Продолжить» with required fields empty. Separate from the
  // backend `error` so the two can coexist (e.g. validation on
  // step 1, network error on submit). Cleared automatically when
  // the relevant state changes — see effect below.
  const [validationError, setValidationError] = useState<string | null>(null);

  // ── Instant-preview flow state (rev.2) ──────────────────────────────
  // Canon renders the entry steps fullscreen-flat on mobile (single
  // column, pinned panel) — the breakpoint matches canon's own 720-ish
  // modal threshold via the shared lib hook.
  const isMobile = useIsMobile();
  const [entryPhase, setEntryPhase] = useState<EntryPhase>(null);
  const [nicheFreeText, setNicheFreeText] = useState("");
  const [demoSelection, setDemoSelection] = useState<DemoSelection | null>(null);
  // Theme state lives from шага 0b and is carried through the morph into
  // the preview + the «СТИЛЬ» summary row (ТЗ rev.2 §2). The touched flag
  // is a ref — only the draft-ready rule reads it, never the render.
  const [activeTheme, setActiveTheme] = useState<string | undefined>(undefined);
  const userThemeTouchedRef = useRef(false);
  // Шаг 1 «Источник» — search state (вход A) + mode switch to link (B).
  const [sourceMode, setSourceMode] = useState<"search" | "link">("search");
  const [sourceQuery, setSourceQuery] = useState("");
  const [sourceCity, setSourceCity] = useState("");
  const [searching, setSearching] = useState(false);
  const [candidates, setCandidates] = useState<SourceCandidate[] | null>(null);
  const [searchError, setSearchError] = useState<SourceSearchError>("none");
  const [retryAfter, setRetryAfter] = useState(59);
  // Draft build lifecycle — `draftRun` arms the poll effect below;
  // `previewState` is what the canon `preview` prop renders from.
  const [previewState, setPreviewState] = useState<PreviewUiState | null>(null);
  const [draftRun, setDraftRun] = useState<DraftRun | null>(null);
  const [contactNotice, setContactNotice] = useState<"preview_failed" | "preview_timeout" | null>(
    null,
  );
  const draftIdRef = useRef<string | null>(null);
  const previewViewedRef = useRef(false);

  // Demo draft derived from the niche pick / free text — pure client-side
  // fixture lookup (NICHE_DEMO_DRAFTS), zero network.
  const demo = useMemo(
    () => (demoSelection ? demoDraftFor(demoSelection.nicheId, demoSelection.freeText) : null),
    [demoSelection],
  );
  const demoThemeOptions = demo?.niche ? demo.niche.theme_options : GENERIC_THEME_OPTIONS;

  /** `true` once the link branch carries a live preview — canon switches
   * to the 4-step previewFlow routing (building/preview at step 2). */
  const previewActive = mode === "link" && previewState !== null;

  // Preview-step swatches: the niche options, plus the backend-picked
  // theme if it isn't among them (the active swatch must always render).
  const previewThemeOptions = useMemo(() => {
    const draftTheme = previewState?.draft?.theme_id;
    if (draftTheme && !demoThemeOptions.includes(draftTheme)) {
      return [draftTheme, ...demoThemeOptions].slice(0, 3);
    }
    return demoThemeOptions;
  }, [demoThemeOptions, previewState?.draft?.theme_id]);

  // ── Я.Метрика funnel goals ──────────────────────────────────────────
  // `submit_photo_mode` — user is in the photo branch (initial open in
  // photo OR switched via the Step-1 mode-switcher). Guarded so the
  // link branch never fires it.
  useEffect(() => {
    if (mode === "photo") reachGoal("submit_photo_mode");
  }, [mode]);
  // `submit_contact_step` — reached the «куда писать» step (link → step 2,
  // photo → step 3, preview flow → step 3). Fires on each arrival («how
  // many got this far»). The preview-failed branch renders the contact
  // form WITHOUT advancing the step (canon keeps step=2) — counted too.
  useEffect(() => {
    const contactStep = mode === "photo" || previewActive ? 3 : 2;
    const onFailedContact = previewActive && step === 2 && previewState?.status === "failed";
    if (step === contactStep || onFailedContact) reachGoal("submit_contact_step");
  }, [step, mode, previewActive, previewState?.status]);

  // ── Instant-preview funnel goals (rev.2, ТЗ §8) ─────────────────────
  // `intake_demo_view` — пример показан (each arrival at шаг 0b).
  useEffect(() => {
    if (entryPhase === "demo") reachGoal("intake_demo_view");
  }, [entryPhase]);
  // `intake_preview_view` — готовый черновик показан (once per draft run;
  // the ref resets in beginDraft). Guarded on step 2 so a draft that
  // turns ready AFTER the user skipped to contact doesn't count a view.
  useEffect(() => {
    if (
      previewActive &&
      step === 2 &&
      previewState?.status === "ready" &&
      !previewViewedRef.current
    ) {
      previewViewedRef.current = true;
      reachGoal("intake_preview_view");
    }
  }, [previewActive, step, previewState?.status]);

  // Debounced URL — drives canon's source badge. While the user is
  // actively typing, debouncedUrl lags the live `url` state by
  // URL_DEBOUNCE_MS; canon's `<LinkInput loading={!!url && !source}>`
  // sees an `!source` for that window because the previous-stable
  // classification doesn't match the new typed text → shows the green
  // spinner briefly (intended UX: «still classifying, give us a sec»).
  // After 300 ms of inactivity the source resolves to one of:
  //   ✓ mvp (yandex_maps/telegram)         → green «Распознали» pill
  //   ⚠️  waitlist (vk/whatsapp/youtube)    → blue «скоро поддержим»
  //   ⚠️  unknown_url / not_url             → orange «Не узнали источник»
  // The detectionToCanonSource() helper never returns null for
  // non-empty input — that's how we prevent the «spinner forever» bug
  // reported after canon 0.5.0.
  const [debouncedUrl, setDebouncedUrl] = useState(url);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedUrl(url), URL_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [url]);
  const canonSource = useMemo<string | null>(() => {
    if (debouncedUrl.trim().length === 0) return null;
    return detectionToCanonSource(detectSource(debouncedUrl));
  }, [debouncedUrl]);

  // ── Instant-preview: rate-limit countdown (source step) ─────────────
  // Canon renders «Поиск снова доступен через 0:NN» from
  // `retryAfterSeconds` — the live tick is the consumer's job (ТЗ §6).
  // At 0 the search unlocks (back to state 3 `source-idle`).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (searchError !== "ratelimited") return;
    if (retryAfter <= 0) {
      setSearchError("none");
      return;
    }
    const t = setTimeout(() => setRetryAfter((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [searchError, retryAfter]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ── Instant-preview: draft build + poll lifecycle ────────────────────
  // Armed by `draftRun` (set in beginDraft). POST /api/preview/draft,
  // then GET /api/preview/draft/{id} every ~1.5 s. UI timeline:
  //   building → (40 s) timeout → … keeps polling until DRAFT_POLL_MAX_MS
  //   (the backend build continues async — if `ready` lands while the
  //   user is still on step 2, the preview swaps in; ТЗ rev.1).
  // Any transport / envelope failure → `failed` → canon renders the
  // contact step with notice='preview_failed' (graceful degradation for
  // a not-yet-deployed backend).
  useEffect(() => {
    if (!open || !draftRun) return;
    const run = draftRun;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function fail() {
      if (cancelled) return;
      setPreviewState((prev) => (prev ? { ...prev, status: "failed" } : prev));
    }

    function applyTick(data: BuildPollResponse) {
      if (cancelled) return;
      if (data.status === "ready" && data.draft) {
        const draft = data.draft;
        // Theme rule (ТЗ rev.2 §2): user's swatch choice wins; otherwise
        // adopt the backend-picked theme (the source knows the niche best).
        if (!userThemeTouchedRef.current) setActiveTheme(draft.theme_id);
        setPreviewState((prev) =>
          prev ? { ...prev, status: "ready", stage: data.stage, counts: data.counts, draft } : prev,
        );
        return;
      }
      if (data.status === "failed") {
        fail();
        return;
      }
      const elapsed = Date.now() - run.startedAt;
      setPreviewState((prev) =>
        prev
          ? {
              ...prev,
              status: elapsed > DRAFT_TIMEOUT_MS ? "timeout" : "building",
              stage: data.stage,
              counts: data.counts,
              draftSkeleton: data.draft ?? prev.draftSkeleton,
            }
          : prev,
      );
      if (elapsed < DRAFT_POLL_MAX_MS) {
        timer = setTimeout(() => void poll(), DRAFT_POLL_INTERVAL_MS);
      }
    }

    async function poll() {
      const draftId = draftIdRef.current;
      if (cancelled || !draftId) return;
      const res = await pollDraft(draftId);
      if (cancelled) return;
      if (!res.ok) {
        fail();
        return;
      }
      applyTick(res.data);
    }

    void (async () => {
      const created = await createDraft(run.body);
      if (cancelled) return;
      if (!created.ok || !created.data.draft_id) {
        fail();
        return;
      }
      draftIdRef.current = created.data.draft_id;
      await poll();
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [open, draftRun]);

  // Closing the modal cancels any in-flight build — a fresh open starts
  // clean (the reset effect below) without a stale draftRun re-arming
  // the poll effect for one render.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (open) return;
    setDraftRun(null);
    setPreviewState(null);
    draftIdRef.current = null;
  }, [open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ── Instant-preview: entry handlers (шаги 0 / 0b / 1) ───────────────

  function enterDemo(selection: DemoSelection, goalNiche: string) {
    reachGoal("intake_niche_pick", { niche: goalNiche });
    const { draft } = demoDraftFor(selection.nicheId, selection.freeText);
    setDemoSelection(selection);
    userThemeTouchedRef.current = false;
    setActiveTheme(draft.theme_id);
    setEntryPhase("demo");
  }

  function handleNichePick(nicheId: string) {
    enterDemo({ nicheId, freeText: "" }, nicheId);
  }

  function handleShowExample(text: string) {
    // Free text matches the synonym dictionary when possible; otherwise
    // canon falls back to the generic editorial demo with the entered
    // word as the category label.
    const { niche } = demoDraftFor(null, text);
    enterDemo({ nicheId: niche?.id ?? null, freeText: text }, niche?.id ?? "free_text");
  }

  function handleThemeChange(themeId: string) {
    userThemeTouchedRef.current = true;
    setActiveTheme(themeId);
  }

  function handleClaimDemo() {
    reachGoal("intake_demo_claim");
    setEntryPhase("source");
  }

  async function handleSearch() {
    if (!sourceQuery.trim() || searching) return;
    reachGoal("intake_source_search");
    setSearching(true);
    setCandidates(null);
    setSearchError("none");
    const res = await searchSource(sourceQuery.trim(), sourceCity.trim());
    setSearching(false);
    if (res.ok) {
      if (res.data.candidates.length === 0) {
        setSearchError("empty");
        return;
      }
      setCandidates(res.data.candidates.slice(0, 3));
      return;
    }
    if (res.error === "ratelimited") {
      setSearchError("ratelimited");
      // Canon renders the countdown as «0:NN» — clamp to its one-minute
      // display window (the search re-enables when our tick reaches 0).
      setRetryAfter(Math.min(res.retryAfterSeconds ?? 60, 59));
      return;
    }
    setSearchError("network");
  }

  function handleNotMine() {
    // «Здесь нет моего дела» / «Искать ещё раз» — back to idle, query kept.
    setCandidates(null);
    setSearchError("none");
  }

  function handlePickCandidate(candidateId: string) {
    reachGoal("intake_candidate_pick");
    // Candidates come exclusively from Я.Карты Geosearch (ТЗ rev.2 §7).
    beginDraft({ candidate_id: candidateId }, "yandex_maps");
  }

  function handlePhotoBranch() {
    // Вход C «Соберём из фото» — exits the entry flow into the classic
    // photo branch (unchanged by rev.2).
    setEntryPhase(null);
    setMode("photo");
    setStep(1);
    setValidationError(null);
  }

  function beginDraft(body: DraftRequestBody, source: PreviewSource) {
    previewViewedRef.current = false;
    draftIdRef.current = null;
    setEntryPhase(null);
    setStep(2);
    setContactNotice(null);
    setPreviewState({
      status: "building",
      stage: "fetching",
      counts: { photos: 0, reviews: 0 },
      source,
    });
    setDraftRun({ body, startedAt: Date.now() });
  }

  // Hidden file-input refs. Canon's PhotoDropZone / TextFilesDropZone
  // render «Выбрать файлы» as a presentational <button onClick={onPick}>
  // — the click handler receives no arguments. The consumer (this file)
  // is expected to own the actual file picker. We mount a hidden
  // <input type="file" multiple> per branch and trigger .click() from
  // the canon callbacks; the input's onChange feeds File[] back into
  // state.
  const photoInputRef = useRef<HTMLInputElement>(null);
  const textFileInputRef = useRef<HTMLInputElement>(null);

  function openPhotoPicker() {
    // Reset value first so picking the same file twice still fires
    // onChange — by default `<input type=file>` doesn't re-emit
    // change for identical selections.
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
      photoInputRef.current.click();
    }
  }

  function openTextFilePicker() {
    if (textFileInputRef.current) {
      textFileInputRef.current.value = "";
      textFileInputRef.current.click();
    }
  }

  function handlePhotoInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length === 0) return;
    setFiles((prev) => [...prev, ...picked]);
    setValidationError(null);
  }

  function handleTextFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length === 0) return;
    setTextFiles((prev) => [...prev, ...picked]);
  }

  // Canon's PHOTO_LIMITS.minFiles=5 (packages/canon/src/intake/index.tsx
  // §275) renders a «Загрузите ещё N — нужно минимум 5» warn pill below
  // the threshold. Our actual minimum is 1 (user: «пусть будет хоть
  // одно»). This effect hides that warn pill via text-content match —
  // canon ships no classes / data-attrs, and the warn pill shares its
  // background colour (`VT.warnSoft`) with the SourceBadge unknown
  // tier so a CSS selector by inline-style would over-match.
  //
  // Button opacity is forced separately via the CSS rule
  // `.ss-submit-modal-host button[data-ss-cta] { opacity: 1 !important }`
  // in globals.css — CSS with !important survives canon's re-renders,
  // which kept overwriting an earlier JS approach.
  useEffect(() => {
    if (!open || mode !== "photo" || step !== 1) return;
    const host = document.querySelector(".ss-submit-modal-host");
    if (!host) return;
    for (const el of host.querySelectorAll("div")) {
      if (el.textContent?.trimStart().startsWith("Загрузите ещё ")) {
        (el as HTMLElement).style.display = files.length >= 1 ? "none" : "";
      }
    }
  }, [open, mode, step, files.length]);

  // Reset to initial state every time the modal re-opens. setState in
  // effect is the React-recommended pattern for "reset on prop change"
  // when the prop is `open` (not a derivable state).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!open) return;
    setMode(initialMode);
    setUrl(initialUrl);
    setStep(initialUrl && initialMode === "link" ? 2 : 1);
    setFiles([]);
    setDescription("");
    setCity("");
    setCustomerContact("");
    setCustomerContactType("phone");
    setTextFiles([]);
    setChannel("telegram");
    setContact("");
    setConsent(true);
    setSubmitting(false);
    setError(null);
    setValidationError(null);
    // Instant-preview entry (rev.2): EMPTY-HANDED open (link mode, blank
    // URL) starts at шаге 0 «Ниша». A Hero URL — even an unrecognised
    // one — keeps the classic link flow exactly as before.
    setEntryPhase(initialMode === "link" && initialUrl.trim().length === 0 ? "niche" : null);
    setNicheFreeText("");
    setDemoSelection(null);
    setActiveTheme(undefined);
    userThemeTouchedRef.current = false;
    previewViewedRef.current = false;
    draftIdRef.current = null;
    setSourceMode("search");
    setSourceQuery("");
    setSourceCity("");
    setSearching(false);
    setCandidates(null);
    setSearchError("none");
    setRetryAfter(59);
    setPreviewState(null);
    setDraftRun(null);
    setContactNotice(null);
  }, [open, initialMode, initialUrl]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function handleBack() {
    // rev.2 entry navigation: источник → пример (0b). Шаг 0b's own back
    // («Другая ниша») goes through entry.onOtherNiche, not here.
    if (entryPhase === "source") {
      setEntryPhase("demo");
      return;
    }
    if (previewActive && step === 2) {
      // «Изменить источник» (preview/building) / «Другая ссылка» (failed):
      // cancel the build and return to шагу 1 «Источник».
      setDraftRun(null);
      setPreviewState(null);
      setContactNotice(null);
      draftIdRef.current = null;
      setEntryPhase("source");
      return;
    }
    if (previewActive && step === 3) {
      // Контакт → назад к превью.
      setStep(2);
      return;
    }
    if (step === 1) return;
    setStep((step - 1) as Step);
  }

  function handleContinue() {
    // rev.2: вход B «ссылка» on шаге 1 — canon wires «Собрать черновик»
    // to onBuild={onContinue}; start the draft build from the pasted URL.
    if (entryPhase === "source") {
      const trimmed = url.trim();
      if (trimmed.length === 0) return;
      beginDraft({ url: trimmed }, urlPreviewSource(trimmed));
      return;
    }
    if (previewActive && step === 2) {
      // From the preview surface: ready → «Забрать сайт бесплатно»;
      // timeout → «Оставить контакт» (canon onSkipToContact).
      if (previewState?.status === "ready") reachGoal("intake_draft_claim");
      if (previewState?.status === "timeout") setContactNotice("preview_timeout");
      setStep(3);
      return;
    }
    setStep((step + 1) as Step);
  }

  function handleClose() {
    onOpenChange(false);
  }

  async function handleSubmit() {
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    // CAPTCHA: dev mode passes "DEV_TOKEN", prod hooks up Yandex SmartCaptcha
    // (out of scope for this PR — wired in lib/captcha.ts when SmartCaptcha
    // is initialised; fall back to DEV_TOKEN otherwise).
    type WindowWithCaptcha = Window & { __getCaptchaToken?: () => Promise<string> };
    const captchaToken =
      typeof window !== "undefined" && (window as WindowWithCaptcha).__getCaptchaToken
        ? await (window as WindowWithCaptcha).__getCaptchaToken!()
        : "DEV_TOKEN";

    let result: SubmitResult;
    if (mode === "link") {
      // Re-classify on submit (not initialDetection from Hero) — the
      // user may have edited the URL inside the modal. Anything that isn't
      // a recognised MVP source (Telegram / Я.Карты) is a pasted link to
      // some other site → `website` (captured for manual review). Was
      // `photo`, which mislabeled pure link-pastes as photo uploads.
      //
      // Candidate path (rev.2): the draft was built from a Я.Карты
      // Geosearch candidate — there is no URL at all, so classify as
      // `ymaps` (the only catalog the search covers, ТЗ rev.2 §7).
      const liveDetection = detectSource(url);
      let sourceType: string = liveDetection.kind === "mvp" ? liveDetection.type : "website";
      if (url.trim().length === 0 && draftRun && "candidate_id" in draftRun.body) {
        sourceType = "ymaps";
      }
      // TODO(preview-backend): draft_id + theme_id are NOT sent — the
      // backend `SubmitApplicationLinkRequest` schema is frozen with
      // `extra='forbid'` (backend/app/api/schemas/applications.py) and has
      // no such fields yet. When the preview backend lands, extend the
      // schema (draft_id: UUID | None, theme_id: str | None) and attach
      // `draftIdRef.current` + `activeTheme` here so the full build reuses
      // the draft and keeps the user-chosen style.
      result = await submitLink({
        url,
        source_type: sourceType,
        channel,
        contact,
        consent,
        captcha_token: captchaToken,
      });
    } else {
      result = await submitPhoto({
        files,
        description,
        city,
        customer_contact_type: customerContactType,
        customer_contact_value: customerContact,
        text_files: textFiles,
        channel,
        contact,
        consent,
        captcha_token: captchaToken,
      });
    }

    setSubmitting(false);
    if (!result.ok) {
      setError(translateError(result.code));
      return;
    }

    reachGoal("hero_submit_success", { mode });
    // Advance to final step — in the previewFlow the confirm is step 4
    // (Источник · Превью · Контакт · Готово).
    setStep((mode === "photo" || previewActive ? 4 : 3) as Step);
  }

  const summary = {
    url,
    fileCount: files.length,
    description,
    city,
    customerContact,
    textFileCount: textFiles.length,
    channel,
    contact,
    // «СТИЛЬ» row on the final confirm — preview flow only (canon hides
    // the row when themeLabel is undefined).
    themeLabel: previewActive && activeTheme ? themeLabelFor(activeTheme) : undefined,
  };

  // ── canon `entry` prop (rev.2 шаги 0 / 0b / 1) ──────────────────────
  const entryProp =
    entryPhase === null
      ? null
      : entryPhase === "niche"
        ? {
            step: "niche" as const,
            freeText: nicheFreeText,
            onFreeTextChange: setNicheFreeText,
            onPick: handleNichePick,
            onShowExample: handleShowExample,
            mobile: isMobile,
          }
        : entryPhase === "demo"
          ? {
              step: "demo" as const,
              demoDraft: demo?.draft,
              nicheLabel: demo?.nicheLabel,
              themeOptions: demoThemeOptions,
              activeTheme,
              onThemeChange: handleThemeChange,
              onClaimDemo: handleClaimDemo,
              onOtherNiche: () => setEntryPhase("niche"),
              mobile: isMobile,
            }
          : {
              step: "source" as const,
              sourceMode,
              query: sourceQuery,
              city: sourceCity,
              onQueryChange: setSourceQuery,
              onCityChange: setSourceCity,
              searching,
              candidates,
              searchError,
              retryAfterSeconds: retryAfter,
              onSearch: () => void handleSearch(),
              onPickCandidate: handlePickCandidate,
              onNotMine: handleNotMine,
              onSwitchMode: setSourceMode,
              onPhotoBranch: handlePhotoBranch,
              mobile: isMobile,
            };

  // ── canon `preview` prop (0.10.0 + rev.2 морф) ──────────────────────
  // baseDraft = the demo example the user just saw, re-themed to their
  // active swatch so the morph chassis doesn't jump back to the niche
  // default (canon renders the morph with baseDraft.theme_id).
  const baseDraftForMorph = demo
    ? { ...demo.draft, theme_id: activeTheme ?? demo.draft.theme_id }
    : undefined;
  const previewProp =
    previewActive && previewState
      ? {
          status: previewState.status,
          stage: previewState.stage,
          counts: previewState.counts,
          draftSkeleton: previewState.draftSkeleton,
          draft: previewState.draft,
          baseDraft: baseDraftForMorph,
          source: previewState.source,
          themeOptions: previewThemeOptions,
          activeTheme,
          onThemeChange: handleThemeChange,
          mobile: isMobile,
        }
      : null;

  // The rev.2 surfaces (entry steps, building morph, preview) are wide
  // canon cards (640–1040 px) — widen the Radix host for them; canon's
  // inner card self-sizes and centres. The classic steps keep the
  // original 540 px clamp so the old flow stays pixel-identical.
  const showsEntry = entryPhase !== null;
  const showsPreviewSurface = previewActive && step === 2 && previewState?.status !== "failed";
  const wideHost = showsEntry || showsPreviewSurface;
  // On mobile canon renders these steps as a fullscreen-flat sheet whose
  // own background is neutralised by the `.ss-submit-modal-host >
  // div:first-of-type` override in globals.css — give the host the same
  // paper surface (`bg-paper` === canon VT.bg) so content stays readable.
  const mobileCanonShell = isMobile && wideHost;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Backdrop — inline style instead of `bg-ink/N` Tailwind
            class because our `ink` token is defined as a plain
            oklch() string (no `<alpha-value>` placeholder), so
            Tailwind silently drops the `/N` opacity modifier and
            no rule ends up in the generated CSS. Inline style
            bypasses the JIT entirely.
            65% opacity gives the modal card enough separation from
            the page (user: «модалка сливается с контентом»).
            Adding `<alpha-value>` to tailwind.config.ts would fix
            this for all classes but risks visual diffs across the
            other 100+ `bg-ink` callsites — out of scope for this
            hot-fix. */}
        <DialogOverlay
          className="fixed inset-0 z-[60] backdrop-blur-sm"
          style={{ backgroundColor: "oklch(0.215 0.018 60 / 0.65)" }}
        />
        <DialogContent
          aria-describedby={undefined}
          /* Positioning + sizing only — visual chrome (background,
             rounded corners, shadow) lives on canon's inner card so
             we don't double-layer. The «ss-submit-modal-host» class
             scopes the CSS override that neutralises canon's outer
             ModalShell backdrop (the `rgba(0,0,0,0.32)` layer that
             canon ships for standalone use).

             Width: canon's steps use `ModalShell width={540|560}` —
             clamping DialogContent at 540 means the wider 560-step
             card gets its own `maxWidth: '100%'` to shrink to 540,
             eliminating the left/right gap that previously rendered
             as a translucent gray ring. See globals.css. */
          className={cn(
            "ss-submit-modal-host fixed left-1/2 top-1/2 z-[70] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto outline-none focus:outline-none sm:max-h-[90vh]",
            wideHost ? "max-h-[92vh] max-w-[1080px]" : "max-w-[540px]",
            mobileCanonShell && "rounded-2xl bg-paper",
          )}
          /* Event delegation for canon-shipped buttons that need to
             be wired up on the consumer side:
             1. × close: canon's <ModalShell> renders <button
                aria-label="Закрыть"> with no onClick — call
                onOpenChange(false).
             2. «Продолжить» on step 1: canon's CSS shows the button
                as always pressable (PR #149), but the click is still
                gated. We surface inline validation messages instead
                of canon's silent no-op:
                  • link mode, empty URL    → «Заполните ссылку»
                  • photo mode, 0 files     → «Выберите фото»
                  • photo mode, 1..4 files  → manually call
                    handleContinue() (canon gates at ≥5).
             Radix's own ESC + overlay-click paths still work for close. */
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest('button[aria-label="Закрыть"]')) {
              onOpenChange(false);
              return;
            }
            const btn = target.closest("button");
            if (!btn || !btn.textContent?.trim().startsWith("Продолжить")) return;
            if (entryPhase !== null) return; // rev.2 entry steps ship no «Продолжить»
            if (step === 1 && mode === "link" && url.trim().length === 0) {
              setValidationError("Заполните ссылку");
              return;
            }
            if (step === 1 && mode === "photo" && files.length === 0) {
              setValidationError("Выберите фото");
              return;
            }
            if (mode === "photo" && step === 1 && files.length >= 1 && files.length < 5) {
              // Canon gates at ≥5; advance manually for 1..4.
              handleContinue();
            }
          }}
        >
          {/* Hidden file inputs — opened from canon PhotoDropZone /
              TextFilesDropZone «Выбрать файлы» buttons via the refs
              above. accept= matches canon's published limits
              (intake §PHOTO_LIMITS / TextFilesDropZone). */}
          <input
            ref={photoInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handlePhotoInputChange}
          />
          <input
            ref={textFileInputRef}
            type="file"
            multiple
            accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/rtf,.pdf,.docx,.txt,.rtf"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleTextFileInputChange}
          />
          <CanonSubmitModal
            mode={mode}
            step={step}
            url={url}
            source={canonSource}
            counts={null}
            onUrlChange={(v: string) => {
              setUrl(v);
              if (validationError) setValidationError(null);
            }}
            onCorrect={() => {
              /* override popover — handled by SourceDetectionBadge in Hero */
            }}
            files={files}
            // Canon calls onPick() with no args — consumer triggers
            // the hidden <input type=file> below.
            onPickPhoto={openPhotoPicker}
            onRemovePhoto={(index: number) => setFiles(files.filter((_, i) => i !== index))}
            onModeChange={(m: SubmitMode) => {
              setMode(m);
              setStep(1);
              setValidationError(null);
            }}
            description={description}
            city={city}
            customerContact={customerContact}
            customerContactType={customerContactType}
            textFiles={textFiles}
            onDescriptionChange={setDescription}
            onCityChange={setCity}
            onCustomerContactChange={setCustomerContact}
            onCustomerContactTypeChange={setCustomerContactType}
            // Same pattern as onPickPhoto — canon dispatches a click,
            // hidden input below actually opens the OS file picker.
            onPickTextFile={openTextFilePicker}
            onRemoveTextFile={(index: number) =>
              setTextFiles(textFiles.filter((_, i) => i !== index))
            }
            channel={channel}
            contact={contact}
            consent={consent}
            onChannelChange={(c: typeof channel) => setChannel(c)}
            onContactChange={setContact}
            onConsentChange={setConsent}
            onBack={handleBack}
            onContinue={handleContinue}
            onSubmit={handleSubmit}
            onClose={handleClose}
            summary={summary}
            // rev.2 instant-preview surfaces — both are opt-in additive
            // props; null keeps canon's 0.3.0 routing byte-for-byte.
            entry={entryProp}
            preview={previewProp}
            contactNotice={contactNotice}
          />
          {validationError && (
            <div
              role="alert"
              className="text-warn-ink mx-6 mb-4 rounded-lg bg-warn-soft px-4 py-3 text-sm"
            >
              {validationError}
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="text-danger-ink mx-6 mb-4 rounded-lg bg-danger-soft px-4 py-3 text-sm"
            >
              {error}
            </div>
          )}
          {submitting && (
            <div className="bg-paper/70 absolute inset-0 z-10 flex items-center justify-center">
              <div className="rounded-full bg-white px-6 py-3 text-sm text-ink shadow-lg">
                Отправляем заявку…
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function translateError(code: string): string {
  switch (code) {
    case "invalid_captcha":
      return "Не прошли captcha — попробуйте обновить страницу.";
    case "consent_required":
      return "Нужно согласие на обработку персональных данных.";
    case "invalid_contact":
      return "Не распознали формат контакта. Проверьте, что вы ввели корректный email, телефон или @username.";
    case "invalid_contact_for_channel":
      return "Контакт не подходит под выбранный канал. Проверьте формат.";
    case "description_too_short":
      return "Опишите дело подробнее — нужно хотя бы пара предложений.";
    case "city_required":
      return "Укажите город.";
    case "invalid_customer_contact_type":
      return "Выберите телефон или Telegram для контакта на сайте.";
    case "customer_contact_required":
      return "Введите телефон или Telegram, по которому клиенты будут связываться с вами.";
    case "too_few_files":
      return "Нужно загрузить минимум 5 фото.";
    case "file_too_large":
      return "Один из файлов слишком большой. Лимит — 15 МБ на файл.";
    case "batch_too_large":
      return "Общий размер файлов превышает 200 МБ.";
    case "bad_magic_bytes":
      return "Один из файлов не похож на изображение / документ. Проверьте формат.";
    case "too_many_files":
      return "Слишком много текстовых файлов — максимум 10.";
    case "photo_batch_rejected":
      return "Пачка фото не прошла проверку.";
    default:
      return `Что-то пошло не так (${code}). Попробуйте ещё раз через минуту.`;
  }
}
