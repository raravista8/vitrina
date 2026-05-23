"use client";

/**
 * Hero — canonical messaging per docs/COPY.md §2.
 *
 * **Design source.** Markup mirrors Claude Design's Concept A "Тёплая
 * бумага" canvas (see `~/Downloads/vitrina ui/concepts.jsx` :: ConceptA_Inner).
 * Inline-styled canvas → Tailwind classes; tokens live in
 * `tailwind.config.ts` (paper / ink / accent / line).
 *
 * Copy anchors (locked to COPY.md v2):
 *   - H1 "Сайт, который сам себя ведёт и приносит вам заявки" (без eyebrow)
 *   - Single input + one primary CTA — zero-friction Hero (PRD §4)
 *   - Microcopy "Первый месяц бесплатно — без карты при регистрации"
 *   - Below: two text links (📷 photo upload, 📨 closed TG export)
 *   - Benefits stack удалён из Hero в v2 — теперь живёт ниже как
 *     самостоятельная <BigFeatures /> секция
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

import { Gift, Link as LinkIcon, ShieldCheck, X } from "lucide-react";
import { HeroPlatformStrip } from "@samosite/canon/landing";

import { useDeferredValue, useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { reachGoal } from "@/lib/metrika";
import { type PreviewData, fetchPreview } from "@/lib/preview";
import { type SourceDetection, detectSource } from "@/lib/source-detect";
import { PhotoDrawer } from "./PhotoDrawer";
import { SAMOSITE_OPEN_SUBMIT } from "./SiteHeader";
import { SourceDetectionBadge } from "./SourceDetectionBadge";
import { SubmitModal, type SubmitModalStep } from "./SubmitModal";

// Placeholder — user batch 1 testing flagged that the original copy
// ("ссылка на соцсеть, Яндекс.Карты или сайт") truncated mid-word on
// 320–390 px iPhone viewports. We swap to a shorter string everywhere
// (avoids a hydration flicker we'd get from a window-width hook) and
// move the full source list into a separate microcopy line below.
const PLACEHOLDER = "ссылка на ваш профиль или сайт";
// v2.1.3 §1.1 — «Собрать мой Самосайт» переименован в «Сделать Самосайт».
// Глагол «сделать» проще, прямее и короче в mobile-CTA («Сделать →»).
const CTA_TEXT = "Сделать Самосайт";
// Microcopy under CTA — v2.1.3 §1.1 убрал «Карта не нужна» (повторяется
// 4× на разных секциях, выглядело тревожно — Pricing card теперь несёт
// этот pacification). Hero оставляет risk-reversal «Самосайт сам
// напомнит» как достаточный sigh of relief.
const MICROCOPY = "Первый месяц — бесплатно. Самосайт сам напомнит, если решите продолжить";
// One canonical, scannable list of what we accept today (UX batch 1
// "U2" — testers asked for an explicit list, not just placeholder
// hints). Lives directly under the input.
const SUPPORTED_SOURCES = "Поддерживаем: Telegram-канал · Яндекс.Карты · фото";

type PreviewState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ready"; data: PreviewData }
  | { phase: "fallback" };

export function Hero() {
  const inputId = useId();
  const [raw, setRaw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
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
  const modalSourceUrl = detection.kind === "mvp" ? detection.canonical : "";
  // When detection didn't settle on an MVP source, we land in the
  // SubmitModal with an empty `sourceUrl`. Picking "photo" as the
  // fallback type is deliberate: SubmitModal routes ONLY `telegram`
  // submissions to the bot-invite step (Step2TgBot), and that step
  // is meaningless without a real TG channel. "photo" skips the
  // bot step and goes straight to confirmation — which is the
  // right outcome for {unknown_url, not_url, empty} flows.
  const modalSourceType: "ymaps" | "telegram" | "photo" =
    detection.kind === "mvp" ? detection.type : "photo";

  function handlePrimaryCta() {
    // Я.Метрика goal — fires on every CTA click regardless of detection
    // state. This is the "intent to submit" event, before any modal /
    // photo-drawer opens. The backend success goal (`hero_submit_success`)
    // fires later from SubmitModal when API returns 200.
    reachGoal("hero_submit_attempt", {
      detection: detection.kind,
      // Discriminated union narrowing: `mvp` has `type`, `waitlist` has
      // `source` — flatten both into a single analytics field.
      ...(detection.kind === "mvp"
        ? { source: detection.type }
        : detection.kind === "waitlist"
          ? { source: detection.source }
          : {}),
    });
    if (detection.kind === "waitlist") {
      setPhotoOpen(true);
    } else {
      setModalOpen(true);
    }
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

  /* E2E-only state — initial step override for SubmitModal. Lets the
     intake spec mount the modal on step 2/3 directly via the
     `window.__open_submit_modal({step})` hook. Production never sets
     this (the hook is gated and `setE2EInitialStep` is a no-op without
     the env). */
  const [e2eInitialStep, setE2EInitialStep] = useState<SubmitModalStep | undefined>(undefined);

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

  /* Visual-regression debug hooks (Tier 2b-2 + per-step follow-up).
     Exposes:
       window.__open_submit_modal({ url?, type?, step? })
       window.__open_photo_drawer()
       window.__close_intake_modals()
     so `tests/visual/intake.spec.ts` can programmatically open the
     submit-flow + photo-drawer screens without typing a URL into the
     Hero input or clicking through the CTA. Gated by
     `NEXT_PUBLIC_E2E === '1'` so the hooks never exist in normal prod
     bundles. The env var is baked at build time. */
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_E2E !== "1" || typeof window === "undefined") return;
    type SubmitOpts = {
      url?: string;
      type?: "ymaps" | "telegram" | "photo";
      /* Forces SubmitModal to mount on this step instead of the
         default `{kind:"contact"}`. Used by intake.spec.ts to
         screenshot step 2 (tg_bot, needs an applicationId) and step 3
         (confirmation, needs a contactType). */
      step?: SubmitModalStep;
    };
    type WindowWithE2E = Window & {
      __open_submit_modal?: (opts?: SubmitOpts) => void;
      __open_photo_drawer?: () => void;
      __close_intake_modals?: () => void;
    };
    const w = window as WindowWithE2E;
    w.__open_submit_modal = (opts?: SubmitOpts) => {
      if (opts?.url !== undefined) setRaw(opts.url);
      setE2EInitialStep(opts?.step);
      setModalOpen(true);
    };
    w.__open_photo_drawer = () => setPhotoOpen(true);
    w.__close_intake_modals = () => {
      setModalOpen(false);
      setPhotoOpen(false);
      setE2EInitialStep(undefined);
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
            className="mt-5 text-balance text-[38px] font-bold leading-[1.08] tracking-tightest sm:mt-7 sm:text-[88px] sm:leading-[1.02]"
          >
            Сайт, который
            <br className="hidden sm:block" />
            {/* Phrase 1 — keeps the underline highlight. Comma lives
                INSIDE the span so it never starts a new line. */}
            <span className="relative inline-block whitespace-nowrap px-1 text-accent">
              сам себя соберёт,
              <span
                aria-hidden="true"
                className="absolute inset-x-1 bottom-1 -z-10 h-2 rounded-[3px] bg-accent-soft opacity-65 sm:bottom-2.5 sm:h-3.5"
              />
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block whitespace-nowrap text-accent">сам обновит</span>{" "}
            <span className="inline-block whitespace-nowrap text-accent">
              и сам приведёт клиентов
            </span>
          </h1>

          {/* Sub — v2.1.3 §1.1 redesign:
              • «за пару/две минуты» → «за 2 часа» (реальный SLA — мануальная
                модерация первых 20 сайтов; обещание «2 минуты» порождало
                разочарование). Везде в копи лендинга — единый timing.
              • Bold-акценты на «Самосайт на базе ИИ соберёт сайт за 2 часа»
                (раскрытие что под капотом — AI, не magic) и «делает всё сам»
                (повторение трёх «сам» рефреном на body level).
              • Финал «Вам остаётся только работать с клиентами» удалён —
                достаточно главного обещания. */}
          <p className="mt-4 max-w-full text-pretty text-[17px] leading-[1.45] text-ink-soft sm:mx-auto sm:mt-8 sm:max-w-[760px] sm:text-[20px]">
            Покажите ссылку — карты, Telegram или визитку.{" "}
            <b className="font-bold text-ink">Самосайт на базе ИИ соберёт сайт за 2 часа</b> и
            дальше <b className="font-bold text-ink">делает всё сам</b>: обновляет цены, ловит
            заявки, ведёт аналитику и публикует лучшие отзывы
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

          {/* Compact platform list — canon `<HeroPlatformStrip>` drop-in
              (canon 0.2.2, replaces our drifted hand-roll). Strip shows
              7 supported sources (Я.Карты / Telegram / Instagram / 2ГИС /
              Avito / Ваш старый сайт / Фото буклета или меню) with
              canon brand-icons + center-aligned chips on desktop,
              left-aligned on mobile. Canon ships a `mobile` bool prop;
              we render BOTH variants and CSS toggles via Tailwind sm:
              (same pattern as `ResponsiveCanonSection` on landing page).
              Drift vs canon = 0 by construction. */}
          <div className="hidden sm:block">
            <HeroPlatformStrip mobile={false} />
          </div>
          <div className="sm:hidden">
            <HeroPlatformStrip mobile={true} />
          </div>

          {/* Free-month плашка (v2.1.3 §1.3). Terracotta pill сразу под
              формой — главное risk-reversal сообщение. Gift-icon +
              «Первый месяц — бесплатно» (bold) + «далее 990 ₽/мес»
              (тоньше). Полностью заменяет старую MICROCOPY-строку:
              ShieldCheck-микрокопия была слабее визуально, юзеры её не
              замечали. */}
          <div className="mt-3 flex justify-start sm:mt-[22px] sm:justify-center">
            <div className="inline-flex max-w-full flex-nowrap items-center gap-3 rounded-full border-[1.5px] border-accent bg-white px-4 py-2.5 sm:px-[14px] sm:py-3">
              {/* Gift icon — circular terracotta bubble matching canon
                  HeroBlock (line 757). 36×36 desktop, 32×32 mobile. */}
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white sm:h-9 sm:w-9">
                <Gift aria-hidden className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} />
              </span>
              {/* Stacked text column — title bold + sub muted. Canon
                  HeroBlock lines 771-783. */}
              <div className="flex min-w-0 flex-col">
                <span className="text-[15px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[16px]">
                  Первый месяц — бесплатно
                </span>
                <span className="mt-0.5 text-[12.5px] leading-[1.3] text-ink-soft sm:text-[13.5px]">
                  далее <b className="font-semibold tabular-nums text-ink">990 ₽/мес</b>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero extras — UX-essential prod additions NOT in canon
            HeroBlock and therefore living OUTSIDE `data-section-body=
            "hero"` so they don't enter the visual-regression
            screenshot. Same `max-w-[1100px] mx-auto` centering as
            the canon body above — visually continuous, but excluded
            from pixel comparison.

            Why moved out (vs deleted): UX batch 1 testing kept each.
              • ShieldCheck microcopy — soft "сам напомнит" reassurance
                for risk-averse users.
              • SourceDetectionBadge — live API badge reacting to what
                was pasted (canon's static prototype has no notion).
              • Photo-drawer fallback — link to S4 photo upload flow
                for users without an online source (FR-093 / ADR-0009).
         */}
        <div className="relative z-[1] mx-auto max-w-[1100px] text-left sm:text-center">
          {/* Old MICROCOPY (ShieldCheck + «Первый месяц…») и
              SUPPORTED_SOURCES — заменены free-month плашкой + compact
              list выше. Reminder про «сам напомнит» — тонкая строка для
              risk-averse юзеров. */}
          <p className="mt-3 text-[12px] text-ink-faint sm:mt-4 sm:text-[13px]">
            <ShieldCheck
              aria-hidden
              className="mr-1 inline-block h-[12px] w-[12px] -translate-y-px"
            />
            {MICROCOPY}
          </p>

          <SourceDetectionBadge
            detection={detection}
            rawInput={raw}
            preview={preview}
            onOpenPhotoUpload={() => setPhotoOpen(true)}
          />

          {/* Fallback link — photo path. The «закрытый TG-канал»
              option moved to FAQ (PR-H) because it's a narrow scenario
              that confused mainstream visitors when shown next to the
              primary CTA. */}
          <div className="mt-5 flex flex-col items-start gap-2.5 text-sm sm:mt-7 sm:flex-row sm:justify-center sm:gap-6">
            <button
              type="button"
              onClick={() => setPhotoOpen(true)}
              className="inline-flex gap-2 text-left text-ink underline decoration-line decoration-1 underline-offset-4 hover:decoration-ink"
            >
              📷 Загрузить фото работ, скриншот профиля или визитку
            </button>
          </div>
        </div>

        {/* Benefits stack удалён в v2 — см. docs/COPY.md §2.2 + self-critique
            §11.2: на скриншотах он визуально конкурировал с input+CTA, глаз
            метался. Перенесено в отдельную <BigFeatures /> секцию ниже по
            странице с новым составом (4 новых карточки, включая «Сам
            выбирает отзывы»). */}
      </section>
      <SubmitModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        sourceUrl={modalSourceUrl}
        sourceType={modalSourceType}
        /* Production builds (no NEXT_PUBLIC_E2E) always pass undefined
           because `setE2EInitialStep` is only wired up in the gated
           useEffect above — prod state stays at the default value. */
        e2eInitialStep={e2eInitialStep}
      />
      <PhotoDrawer open={photoOpen} onOpenChange={setPhotoOpen} />
    </>
  );
}
