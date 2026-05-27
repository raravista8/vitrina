"use client";

/**
 * Hero — canonical messaging per docs/COPY.md §2.
 *
 * **Design source.** Markup mirrors Claude Design's Concept A "Тёплая
 * бумага" canvas (see `~/Downloads/vitrina ui/concepts.jsx` :: ConceptA_Inner).
 * Inline-styled canvas → Tailwind classes; tokens live in
 * `tailwind.config.ts` (paper / ink / accent / line).
 *
 * Copy anchors (locked to canon 0.6.0 / packages/canon/docs/COPY.md):
 *   - H1 «Соберём за 2 часа сайт, который ловит заявки. Дальше он
 *     сам становится лучше каждую неделю.» (two accent phrases:
 *     «2 часа» + «сам становится лучше»)
 *   - Two sub-paragraphs (sources list + 2-hour timeline + monday
 *     recommendations foreshadow)
 *   - CTA «Собрать сайт за 2 часа» + microcopy «990 ₽/мес · для
 *     первой сотни 490 ₽ навсегда · первый месяц бесплатно, карту
 *     привязывать не надо» (mono, прямо под кнопкой)
 *   - Secondary link «Сначала посмотреть примеры ↓» (anchor to
 *     #examples — Hero CTA skipper)
 *   - Photo-link companion (prod-only — canon 0.6.0 merges photo
 *     into the single input via placeholder hint)
 *
 * Behaviour — owned by this component (NOT in the design canvas):
 *   - URL paste is debounced via `useDeferredValue` then classified.
 *   - MVP source (TG / Я.Карты): green badge + CTA enabled. Submit
 *     opens the T1.5 SubmitModal pre-filled with `sourceUrl`/`sourceType`.
 *   - Waitlist source: amber inline panel with WaitlistCapture + a
 *     parallel "create from photo" CTA per FR-093.
 *   - Unknown URL / not-URL: hint pointing the user at supported sources.
 *
 * Anti-patterns avoided (COPY.md §7):
 *   - No "AI-генератор" wording.
 *   - No Schema.org / sitemap jargon in user-facing copy.
 *   - No "за 2 минуты" as the main hook.
 *
 * Brand: "Самосайт" everywhere — Cyrillic, no Latin transliteration
 * (legal requirement, see PRD §3). Code-name `vitrina` in the repo
 * (package paths, env vars) is engineering-only; customer copy uses
 * the public brand strictly.
 */

import { Link as LinkIcon, Paperclip, X } from "lucide-react";

import { useDeferredValue, useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { reachGoal } from "@/lib/metrika";
import { type PreviewData, fetchPreview } from "@/lib/preview";
import { type SourceDetection, detectSource } from "@/lib/source-detect";
import { SAMOSITE_OPEN_SUBMIT } from "./SiteHeader";
import { SourceDetectionBadge } from "./SourceDetectionBadge";
import { SubmitModal, type SubmitMode } from "./SubmitModal";

// canon 0.6.0 Hero copy (packages/canon/src/landing/index.tsx §HeroBlock).
// Placeholder hints at BOTH paths supported in one input — keep parity
// with canon's input pill copy.
const PLACEHOLDER = "Вставьте ссылку или загрузите фото";
// canon 0.6.0 CTA — «Собрать сайт» → «Собрать сайт за 2 часа». Adds
// the SLA into the button label itself; same CTA copy appears in 4 more
// places on the page (Cycle, Monday, Pricing, FinalCta).
const CTA_TEXT = "Собрать сайт за 2 часа";
// canon 0.6.0 microcopy under CTA — combines pricing + free-month promise.
// «490 ₽ навсегда» is a frontend-only promise per TZ §5 (backend still on
// 990 via ЮKassa). «карту привязывать не надо» replaces «без карты».
const CTA_MICROCOPY =
  "990 ₽/мес · для первой сотни 490 ₽ навсегда · первый месяц бесплатно, карту привязывать не надо";

type PreviewState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ready"; data: PreviewData }
  | { phase: "fallback" };

export function Hero() {
  const inputId = useId();
  const [raw, setRaw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<SubmitMode>("link");
  const [preview, setPreview] = useState<PreviewState>({ phase: "idle" });

  // useDeferredValue gives us debounce-by-priority for the classifier
  // without scheduling explicit timers. Classification is cheap (regex)
  // so running on every keystroke is fine; the deferred value just
  // keeps the badge render off the input's critical path.
  const deferred = useDeferredValue(raw);
  const detection: SourceDetection = detectSource(deferred);

  // CTA is ALWAYS clickable — never wait for the user to type something
  // (Hero contract: see __tests__/Hero.test.tsx "stays clickable…").
  // The action it dispatches depends on classification:
  //   - mvp        → SubmitModal pre-filled with canonical URL + type
  //   - waitlist   → PhotoDrawer (symmetric with the inline "создайте
  //                  из фото сейчас" CTA in WaitlistPanel; user batch 1
  //                  flagged that the main CTA opened a modal with a
  //                  bogus "Telegram-канал" badge — Hero used to fall
  //                  back to `sourceType="telegram"` for everything
  //                  non-MVP, including IG/VK paste).
  //   - unknown    → SubmitModal with empty source (user proceeds by
  //                  contact only; ops follows up)
  //   - not_url    → SubmitModal with empty source (same path)
  // The inline waitlist email-capture below the form covers the
  // "notify me when this source ships" intent separately.
  // canon 0.3.0: «link OR photo, never both». Hero CTA always opens the
  // modal in `link` mode (with the typed URL prefilled). The photo-link
  // companion under CTA opens it in `photo` mode (empty URL). User can
  // also switch mid-flow via the Step-1 mode-switcher inside the modal.
  const modalUrl = detection.kind === "mvp" ? detection.canonical : raw;

  function handlePrimaryCta() {
    // Я.Метрика goal — fires on every CTA click regardless of detection
    // state. This is the "intent to submit" event.
    reachGoal("hero_submit_attempt", {
      mode: "link",
      detection: detection.kind,
      ...(detection.kind === "mvp"
        ? { source: detection.type }
        : detection.kind === "waitlist"
          ? { source: detection.source }
          : {}),
    });
    setModalMode("link");
    setModalOpen(true);
  }

  function handlePhotoCta() {
    reachGoal("hero_submit_attempt", { mode: "photo" });
    setModalMode("photo");
    setModalOpen(true);
  }

  // T1.4b live preview: fire when classifier settles on an MVP source.
  // Effect re-runs on canonical change → previous in-flight call aborts.
  const canonical = detection.kind === "mvp" ? detection.canonical : "";
  const previewType: "telegram" | "ymaps" | null = detection.kind === "mvp" ? detection.type : null;
  // The async fetch+setState pattern is the React-recommended way to
  // fire a request on prop change and reflect its outcome — but
  // experimental `react-hooks/set-state-in-effect` still flags it.
  // Disabling for this single block; outside this effect the rule stays
  // active.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (previewType === null || canonical === "") {
      setPreview({ phase: "idle" });
      return;
    }
    setPreview({ phase: "loading" });
    const controller = new AbortController();
    void (async () => {
      const data = await fetchPreview(previewType, canonical, controller.signal);
      if (controller.signal.aborted) return;
      setPreview(data !== null ? { phase: "ready", data } : { phase: "fallback" });
    })();
    return () => controller.abort();
  }, [previewType, canonical]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* Cross-component "open SubmitModal" trigger.
     Listens for the DOM custom event `samosite:open-submit` that
     <SiteHeader /> dispatches when its «Сделать сайт» CTA is clicked.
     Using a window event (instead of lifting state up to a context
     provider) keeps app/page.tsx as a pure server component — Hero
     is the only thing in this tree that needs to be client-rendered.
     Hook is mounted unconditionally; in tests where SiteHeader isn't
     rendered (RTL component-level tests) the listener simply never
     fires. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOpenSubmit = () => setModalOpen(true);
    window.addEventListener(SAMOSITE_OPEN_SUBMIT, onOpenSubmit);
    return () => window.removeEventListener(SAMOSITE_OPEN_SUBMIT, onOpenSubmit);
  }, []);

  /* Visual-regression debug hooks (Tier 2b-2 + canon 0.3.0 rewrite).
     Exposes:
       window.__open_submit_modal({ url?, mode? })
       window.__open_photo_drawer()              — alias for mode='photo'
       window.__close_intake_modals()
     Gated by NEXT_PUBLIC_E2E === '1'.

     canon 0.3.0: removed `step` param — initial step is derived from
     mode + url presence. */
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_E2E !== "1" || typeof window === "undefined") return;
    type SubmitOpts = {
      url?: string;
      mode?: SubmitMode;
    };
    type WindowWithE2E = Window & {
      __open_submit_modal?: (opts?: SubmitOpts) => void;
      __open_photo_drawer?: () => void;
      __close_intake_modals?: () => void;
    };
    const w = window as WindowWithE2E;
    w.__open_submit_modal = (opts?: SubmitOpts) => {
      if (opts?.url !== undefined) setRaw(opts.url);
      setModalMode(opts?.mode ?? "link");
      setModalOpen(true);
    };
    w.__open_photo_drawer = () => {
      setModalMode("photo");
      setModalOpen(true);
    };
    w.__close_intake_modals = () => {
      setModalOpen(false);
    };
    return () => {
      delete w.__open_submit_modal;
      delete w.__open_photo_drawer;
      delete w.__close_intake_modals;
    };
  }, []);

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-paper px-5 pb-16 pt-7 sm:px-16 sm:pb-24 sm:pt-9"
      >
        {/* Soft abstract gradient blobs — décor only (Concept A spec,
            see concepts.jsx ConceptA_Inner lines 38-53). No master
            photos per copy-anti-patterns rule. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[120px] -top-[100px] -z-10 h-[380px] w-[380px] rounded-full opacity-85 sm:-right-[180px] sm:-top-[160px] sm:h-[720px] sm:w-[720px]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.92 0.045 40) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[100px] bottom-[100px] -z-10 h-[280px] w-[280px] rounded-full opacity-70 sm:-left-[120px] sm:bottom-[60px] sm:h-[480px] sm:w-[480px]"
          style={{
            background: "radial-gradient(circle, oklch(0.94 0.020 90) 0%, transparent 70%)",
          }}
        />

        {/* Top nav now lives in <SiteHeader /> (canon 0.2.3 <StickyHeader>) —
            mounted in app/page.tsx BEFORE this Hero. SiteHeader dispatches
            a custom DOM event when its «Сделать сайт» CTA is clicked; the
            useEffect below listens for it and opens the SubmitModal. This
            removes drift between hand-rolled nav and canon (was diverging
            on alignment + label) and unblocks loginHref=/admin/login. */}

        {/* Hero body */}
        {/* Eyebrow «САЙТ ДЛЯ ЗАЯВОК…» удалён в v2 — см. docs/COPY.md §2.2
            и self-critique §11.1: тестер «бросает в глаза, перегружает H1».
            Чище без него. */}

        {/* `data-section-body="hero"` — anchor for the visual-regression
            spec (`landing/tests/visual/landing.spec.ts`). Canon's
            `HeroBlock` exports only this inner constrained block; the
            outer section + nav are siblings in canon `SamosaytLanding`.
            Matching the selector keeps prod and baseline measuring the
            same DOM subtree (1100 × ~738 px on desktop). */}
        <div
          data-section-body="hero"
          className="relative z-[1] mx-auto mt-8 max-w-[1100px] text-left sm:mt-16 sm:text-center"
        >
          {/* H1 — three «сам» pattern. Each terracotta phrase carries
              the brand promise; the first one keeps the underline
              highlight as the visual anchor. Punctuation tweaks
              (PR fix-hero-h1-punctuation):
                - Commas glued to preceding word via U+00A0 (NBSP) so
                  they can never start a new line — fixes the «висящая
                  запятая» бar on narrow viewports.
                - Trailing period removed (user feedback) — punchier
                  H1, matches the «команда не лектор» tone.
                - Each «сам …» wrapped in non-breaking inline-block so
                  the phrase wraps as a unit, not mid-«сам».
              The whole H1 lives inside `text-balance` (Tailwind) so
              the browser balances line widths automatically across
              desktop & mobile. */}
          {/* H1 sizes per `canon/landing-samosite.jsx::HeroBlock` line
              650 — desktop 88 px / mobile 38 px, leading 1.02 / 1.08.
              Prod had been at 72 / 36 (Phase pre-A scale); bumping to
              canon values is what closes the visual gap that the user
              flagged in «дизайн на проде сильно отличается от этого». */}
          <h1
            id="hero-title"
            // Per canon 0.2.7: mobile font-size is clamp(28px, 8.6vw, 38px)
            // not a flat 38px — fluid scaling so «и сам приведёт клиентов»
            // wraps inside the ~350px content area on iPhone-class screens
            // (Safari iOS measured ~360px at flat 38px, overflowing the
            // viewport). overflow-wrap + word-break + max-width are defensive
            // floors so any future content edit can't reintroduce overflow.
            // Tailwind can't express clamp() cleanly → inline style on mobile.
            style={{
              fontSize: "clamp(28px, 8.6vw, 38px)",
              overflowWrap: "break-word",
              wordBreak: "normal",
              maxWidth: "100%",
            }}
            className="mt-5 text-balance font-bold leading-[1.08] tracking-tightest sm:mt-7 sm:!text-[76px] sm:leading-[1.04]"
          >
            {/* canon 0.6.0 H1 — «Соберём за 2 часа сайт, который ловит
                заявки. Дальше он сам становится лучше каждую неделю»
                Two terracotta accents: «2 часа» (with underline highlight
                on desktop) + «сам становится лучше». Trailing period
                stripped per `docs/handoff/specs/04_typography.md §1`
                (no period at end of headings) — canon's runtime
                typography pass strips it from canon-rendered H1/H2 too,
                this hand-rolled Hero needs to match by hand. */}
            Соберём за{" "}
            <span className="relative whitespace-nowrap text-accent">
              2 часа
              <span
                aria-hidden="true"
                className="absolute inset-x-1 bottom-1 -z-10 hidden h-3.5 rounded-[3px] bg-accent-soft opacity-70 sm:bottom-1.5 sm:block"
              />
            </span>{" "}
            сайт, который ловит заявки.
            <br className="hidden sm:block" /> Дальше он{" "}
            <span className="text-accent">сам становится лучше</span> каждую неделю
          </h1>

          {/* Sub — canon 0.6.0 splits the old single paragraph into TWO:
              (1) «Покажите Самосайту, где вы сейчас ведёте свои дела…»
                  — lists the 5 source families inline so the user sees
                  the promise scoped to their situation.
              (2) «Через 2 часа сайт принимает заявки. Дальше работает
                  сам…» — sets the timeline + introduces the «monday
                  recommendations» killer-feature foreshadowed below. */}
          <p className="mt-4 max-w-full text-pretty text-[16.5px] leading-[1.5] text-ink-soft sm:mx-auto sm:mt-7 sm:max-w-[860px] sm:text-[20px]">
            Покажите Самосайту, где вы сейчас ведёте свои дела: Яндекс.Карты, Telegram, 2ГИС, Avito
            или Instagram. Если ничего этого нет — просто сфотографируйте меню или буклет
          </p>
          <p className="mt-2.5 max-w-full text-pretty text-[16.5px] leading-[1.5] text-ink-soft sm:mx-auto sm:mt-3 sm:max-w-[860px] sm:text-[20px]">
            Через <b className="font-bold text-ink">2 часа сайт принимает заявки</b>. Дальше
            работает сам: обновляет, по понедельникам подсказывает, что поправить ради новых заявок
          </p>

          {/* Input + CTA — single pill on desktop, stacked card on mobile */}
          <form
            className={cn(
              "mt-6 flex flex-col items-stretch gap-2.5 rounded-[14px] border border-line bg-white p-2.5 shadow-card sm:mx-auto sm:mt-9 sm:max-w-[680px] sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2",
            )}
            onSubmit={(event) => {
              event.preventDefault();
              handlePrimaryCta();
            }}
          >
            <label className="sr-only" htmlFor={inputId}>
              ПОКАЖИТЕ ВАШЕ ДЕЛО
            </label>
            <div className="flex flex-1 items-center gap-2.5 px-3.5 py-3 sm:px-[18px] sm:py-0">
              <LinkIcon aria-hidden strokeWidth={1.8} className="h-5 w-5 shrink-0 text-ink-faint" />
              {/* Shorter placeholder that fits a 320 px iPhone viewport;
                  the longer "ссылка на соцсеть, Яндекс.Карты или сайт"
                  truncated mid-word during user testing. The supported-
                  source microcopy under the form covers the detail. */}
              <input
                id={inputId}
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder={PLACEHOLDER}
                value={raw}
                onChange={(event) => setRaw(event.target.value)}
                onPaste={() => {
                  // Я.Метрика goal — fires on first paste event regardless
                  // of what was pasted (URL / text / mess). Tracks
                  // «пользователь вообще что-то вставил в Hero», early
                  // proxy of intent before classification settles.
                  // No PII sent — Yandex doesn't get the pasted content.
                  reachGoal("hero_paste");
                }}
                className="min-w-0 flex-1 bg-transparent text-[16px] text-ink placeholder:text-ink-faint focus:outline-none sm:text-[17px]"
              />
              {/* Clear (×) — only when there's something to clear.
                  User batch 1 flagged the lack of an obvious way to
                  reset after pasting an unsupported URL. Keyboard
                  focus moves back to the input so the user can retry
                  immediately. */}
              {raw.length > 0 ? (
                <button
                  type="button"
                  aria-label="Очистить"
                  onClick={() => {
                    setRaw("");
                    document.getElementById(inputId)?.focus();
                  }}
                  className="-mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-faint hover:bg-paper-soft hover:text-ink"
                >
                  <X aria-hidden className="h-4 w-4" strokeWidth={2} />
                </button>
              ) : null}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-accent px-5 py-3.5 text-[16px] font-semibold text-white hover:bg-accent-hover sm:rounded-full sm:px-6 sm:py-3.5"
            >
              {CTA_TEXT}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </button>
          </form>

          {/* canon 0.5.0 §1.7 microcopy — mono, tight tracking, sits
              directly under the CTA pill. Three deltas the visitor must
              know BEFORE clicking «Собрать сайт»: no card, free month,
              SLA. Replaces the old shield-icon reassurance line which
              testers said «выглядит как disclaimer, не вижу». */}
          <div className="mt-2.5 text-left font-mono text-[11.5px] leading-tight tracking-[0.04em] text-ink-soft sm:mt-3 sm:text-center sm:text-[12px]">
            {CTA_MICROCOPY}
          </div>

          {/* Photo-link companion — canon 0.5.0 has this INSIDE its
              HeroBlock (line 793-810), so it must be inside
              `data-section-body="hero"` for the visual-regression
              screenshot to match the canon baseline (was outside in
              v2.1.3, missed when canon 0.3.0 moved it inside — caught
              by hero-1440 height-shortfall on PR #142). The
              SourceDetectionBadge stays outside (prod-only API
              widget, no canon equivalent). */}
          <div className="mt-3 flex justify-start text-sm sm:mt-[14px] sm:justify-center">
            <button
              type="button"
              onClick={handlePhotoCta}
              className="inline-flex items-center gap-2 text-accent underline decoration-accent-soft decoration-[1.5px] underline-offset-4 hover:decoration-accent"
            >
              <Paperclip aria-hidden className="h-3.5 w-3.5" strokeWidth={1.9} />
              Нет ссылки? Загрузите фото буклета, меню или работ
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* «Сначала посмотреть примеры ↓» — canon 0.6.0 secondary
              link under the microcopy. Skips Hero CTA, scrolls to the
              Examples section. */}
          <div className="mt-3 flex justify-start text-sm sm:mt-4 sm:justify-center">
            <a
              href="#examples"
              className="inline-flex items-center gap-1.5 text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
            >
              Сначала посмотреть примеры
              <span aria-hidden>↓</span>
            </a>
          </div>

          {/* HeroPlatformStrip + free-month pill removed in canon 0.6.0:
              the platform chip-strip is now the standalone <SourcesSection>
              right below in the page composition, and the free-month
              promise lives inside CTA_MICROCOPY above («первый месяц
              бесплатно, карту привязывать не надо»). Keeping any of
              the old blocks here would double up the messaging. */}
        </div>

        {/* Hero extras — prod-only additions NOT in canon HeroBlock,
            living OUTSIDE `data-section-body="hero"` so they don't
            enter the visual-regression screenshot. Same
            `max-w-[1100px] mx-auto` centering as the canon body above
            — visually continuous, but excluded from pixel comparison.

            Currently only SourceDetectionBadge — a live API widget
            (POST /api/preview) reacting to what was pasted. Canon's
            static prototype has no notion of debounced classification.

            Note: the photo-link companion moved INSIDE the section as
            of canon 0.5.0 (canon put it inside HeroBlock — see line
            793-810 of packages/canon/src/landing/index.tsx).
         */}
        <div className="relative z-[1] mx-auto max-w-[1100px] text-left sm:text-center">
          <SourceDetectionBadge
            detection={detection}
            rawInput={raw}
            preview={preview}
            onOpenPhotoUpload={handlePhotoCta}
          />
        </div>

        {/* Benefits stack removed in v2 — see docs/COPY.md §2.2 self-critique. */}
      </section>
      <SubmitModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialMode={modalMode}
        initialUrl={modalMode === "link" ? modalUrl : ""}
      />
    </>
  );
}
