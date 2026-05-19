"use client";

/**
 * Hero — canonical messaging per docs/COPY.md §2.
 *
 * **Design source.** Markup mirrors Claude Design's Concept A "Тёплая
 * бумага" canvas (see `~/Downloads/vitrina ui/concepts.jsx` :: ConceptA_Inner).
 * Inline-styled canvas → Tailwind classes; tokens live in
 * `tailwind.config.ts` (paper / ink / accent / line).
 *
 * Copy anchors (locked to COPY.md):
 *   - Category eyebrow "САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ"
 *   - H1 "Сайт, который сам себя ведёт и приносит вам заявки"
 *   - Single input + one primary CTA — zero-friction Hero (PRD §4)
 *   - Microcopy "Первый месяц бесплатно — без карты при регистрации"
 *   - Below: two text links (📷 photo upload, 📨 closed TG export)
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
 * Brand: "Витрина" everywhere — Cyrillic, no Latin transliteration
 * (legal requirement, see PRD §3).
 */

import { Link as LinkIcon, ShieldCheck } from "lucide-react";
import { useDeferredValue, useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { type PreviewData, fetchPreview, formatCounts } from "@/lib/preview";
import { type SourceDetection, detectSource, waitlistSourceLabel } from "@/lib/source-detect";
import { SubmitModal } from "./SubmitModal";
import { WaitlistCapture } from "./WaitlistCapture";

const PLACEHOLDER = "ссылка на соцсеть, Яндекс.Карты или сайт";
const CTA_TEXT = "Собрать мою витрину";
const MICROCOPY = "Первый месяц бесплатно — без карты при регистрации.";

type PreviewState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ready"; data: PreviewData }
  | { phase: "fallback" };

export function Hero() {
  const inputId = useId();
  const [raw, setRaw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState<PreviewState>({ phase: "idle" });

  // useDeferredValue gives us debounce-by-priority for the classifier
  // without scheduling explicit timers. Classification is cheap (regex)
  // so running on every keystroke is fine; the deferred value just
  // keeps the badge render off the input's critical path.
  const deferred = useDeferredValue(raw);
  const detection: SourceDetection = detectSource(deferred);

  const ctaEnabled = detection.kind === "mvp";
  // Snapshot at the moment the modal opens so it stays stable even if
  // the user edits the Hero input behind the (open) dialog.
  const modalSourceUrl = detection.kind === "mvp" ? detection.canonical : "";
  const modalSourceType: "ymaps" | "telegram" =
    detection.kind === "mvp" ? detection.type : "telegram";

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

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-paper px-5 pb-16 pt-7 sm:px-16 sm:pb-24 sm:pt-9"
      >
        {/* Top nav — concept A spec. Login button is a quiet outlined
            pill on desktop, becomes a primary-tone pill on mobile (where
            the menu line is collapsed). */}
        <nav className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight sm:text-xl">
            <span className="inline-block h-[22px] w-[22px] rounded-[7px] bg-accent sm:h-[26px] sm:w-[26px]" />
            Витрина
          </div>
          <div className="hidden items-center gap-7 text-sm text-ink-soft sm:flex">
            <a className="hover:text-ink" href="#how-it-works">
              Как это работает
            </a>
            <a className="hover:text-ink" href="#pricing">
              Тарифы
            </a>
            <a className="hover:text-ink" href="/feedback">
              Помощь
            </a>
            <a
              className="rounded-full border border-line bg-white px-3.5 py-1.5 font-semibold text-ink hover:border-ink-faint"
              href="/admin/login"
            >
              Войти
            </a>
          </div>
          <a
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-ink sm:hidden"
            href="/admin/login"
          >
            Войти
          </a>
        </nav>

        {/* Hero body */}
        <div className="relative z-[1] mx-auto mt-8 max-w-[1100px] text-left sm:mt-16 sm:text-center">
          {/* Category eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ
          </div>

          {/* H1 */}
          <h1
            id="hero-title"
            className="mt-5 text-balance text-[42px] font-bold leading-[1.04] tracking-tightest sm:mt-7 sm:text-[88px]"
          >
            Сайт, который <br className="hidden sm:inline" />
            <span className="relative inline-block px-1 text-accent">
              сам себя ведёт
              <span
                aria-hidden="true"
                className="absolute inset-x-1 bottom-1 -z-10 h-2 rounded-[3px] bg-accent-soft opacity-65 sm:bottom-2.5 sm:h-3.5"
              />
            </span>
            <span className="hidden sm:inline">
              <br />и приносит вам заявки.
            </span>
            <span className="sm:hidden"> и приносит вам заявки.</span>
          </h1>

          {/* Sub */}
          <p className="mt-4 max-w-full text-balance text-[17px] leading-[1.45] text-ink-soft sm:mx-auto sm:mt-7 sm:max-w-[720px] sm:text-[20px]">
            Покажите ссылку на ваше дело — соцсеть, карты или визитку. ИИ соберёт сайт за пару минут
            и сам будет держать его актуальным. Вам ничего не нужно делать.
          </p>

          {/* Input + CTA — single pill on desktop, stacked card on mobile */}
          <form
            className={cn(
              "mt-6 flex flex-col items-stretch gap-2.5 rounded-[14px] border border-line bg-white p-2.5 shadow-card sm:mx-auto sm:mt-9 sm:max-w-[680px] sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2",
            )}
            onSubmit={(event) => {
              event.preventDefault();
              if (!ctaEnabled) return;
              setModalOpen(true);
            }}
          >
            <label className="sr-only" htmlFor={inputId}>
              ПОКАЖИТЕ ВАШЕ ДЕЛО
            </label>
            <div className="flex flex-1 items-center gap-2.5 px-3.5 py-3 sm:px-[18px] sm:py-0">
              <LinkIcon aria-hidden strokeWidth={1.8} className="h-5 w-5 shrink-0 text-ink-faint" />
              <input
                id={inputId}
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder={PLACEHOLDER}
                value={raw}
                onChange={(event) => setRaw(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[16px] text-ink placeholder:text-ink-faint focus:outline-none sm:text-[17px]"
              />
            </div>
            <button
              type="submit"
              disabled={!ctaEnabled}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-5 py-3.5 text-[16px] font-semibold sm:rounded-full sm:px-6 sm:py-3.5",
                ctaEnabled
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "cursor-not-allowed bg-ink-muted text-white/80",
              )}
            >
              {CTA_TEXT}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </button>
          </form>

          {/* Microcopy with checkmark */}
          <div className="mt-3.5 flex items-center justify-start gap-1.5 text-[13px] text-ink-faint sm:justify-center">
            <ShieldCheck aria-hidden className="h-[14px] w-[14px]" />
            {MICROCOPY}
          </div>

          <DetectionFeedback detection={detection} raw={raw} preview={preview} />

          {/* Fallback links */}
          <div className="mt-5 flex flex-col items-start gap-2.5 text-sm sm:mt-7 sm:flex-row sm:justify-center sm:gap-6">
            <a
              className="inline-flex gap-2 text-ink underline decoration-line decoration-1 underline-offset-4 hover:decoration-ink"
              href="#photo-upload"
            >
              📷 Загрузить фото работ, скриншот профиля или визитку
            </a>
            <a
              className="inline-flex gap-2 text-ink underline decoration-line decoration-1 underline-offset-4 hover:decoration-ink"
              href="#tg-export"
            >
              📨 Закрытый TG-канал — загрузить экспорт
            </a>
          </div>
        </div>

        {/* Benefits stack — 4 cards from COPY.md §2. Lives inside Hero
            section per Concept A composition (4-col on desktop, single
            column on mobile). */}
        <div className="relative z-[1] mx-auto mt-9 grid max-w-[1280px] grid-cols-1 gap-3.5 sm:mt-[72px] sm:grid-cols-4 sm:gap-5">
          {[
            ["🔄", "Сам обновляется", "раз в неделю забирает новые фото и отзывы из источника"],
            ["📨", "Сам ловит заявки", "форма, кнопка записи и уведомления в Telegram из коробки"],
            [
              "🔎",
              "Сам находится в поиске",
              "подбирает ключевые слова и отправляет сайт в Яндекс и Google. Клиенты находят вас сами.",
            ],
            [
              "🎁",
              "Первый месяц бесплатно",
              "попробуйте на своём деле, не продлевайте если не зайдёт",
            ],
          ].map(([emoji, title, body]) => (
            <div key={title} className="rounded-[14px] border border-line bg-white p-4 sm:p-[18px]">
              <div className="mb-2 text-[22px]">{emoji}</div>
              <div className="mb-1 text-[15px] font-semibold text-ink">{title}</div>
              <div className="text-[13.5px] leading-[1.5] text-ink-soft">{body}</div>
            </div>
          ))}
        </div>
      </section>
      <SubmitModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        sourceUrl={modalSourceUrl}
        sourceType={modalSourceType}
      />
    </>
  );
}

/**
 * Source-detection feedback strip — same five states as before
 * (loading / mvp-ready / waitlist / unknown-url / not-url) but
 * restyled in Concept A semantic colours (success / info / warn /
 * neutral) instead of the previous neutral / amber palette.
 */
function DetectionFeedback({
  detection,
  raw,
  preview,
}: {
  detection: SourceDetection;
  raw: string;
  preview: PreviewState;
}): React.ReactElement | null {
  // Empty input → no feedback at all (clean Hero on first paint).
  if (raw.trim().length === 0) return null;

  if (detection.kind === "mvp") {
    const label = detection.type === "telegram" ? "Telegram" : "Яндекс.Карты";

    if (preview.phase === "loading") {
      return (
        <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-paper-soft px-3 py-1 text-sm font-medium text-ink-soft">
          <span aria-hidden>⏳</span>
          <span>проверяем {label}…</span>
        </p>
      );
    }

    const countsText = preview.phase === "ready" ? formatCounts(preview.data.counts) : null;
    return (
      <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-sm font-medium text-success">
        <span aria-hidden>✓</span>
        <span>
          {label}
          {countsText ? ` — ${countsText}` : ""}
        </span>
      </p>
    );
  }

  if (detection.kind === "waitlist") {
    return (
      <div className="mx-auto mt-6 max-w-xl text-left">
        <p className="rounded-lg bg-info-soft px-4 py-3 text-sm text-info">
          <span aria-hidden>ℹ️ </span>
          {waitlistSourceLabel(detection.source)} скоро будет — оставьте email, напишем когда
          добавим.
        </p>
        <WaitlistCapture sourceName={detection.source} sourceUrl={detection.canonical} />
        <p className="mt-3 text-center text-sm text-ink-soft">
          или{" "}
          <a className="font-medium text-ink underline" href="#photo-upload">
            создайте из фото сейчас →
          </a>
        </p>
      </div>
    );
  }

  if (detection.kind === "unknown_url") {
    return (
      <p className="mx-auto mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg bg-warn-soft px-4 py-3 text-left text-sm text-warn">
        <span aria-hidden>⚠️</span>
        <span>
          Не узнали источник. Напишите в форме обратной связи — какой это источник? Мы добавим его в
          список.
        </span>
      </p>
    );
  }

  // not_url
  return (
    <p className="mx-auto mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg bg-paper-soft px-4 py-3 text-left text-sm text-ink-soft">
      <span aria-hidden>⚠️</span>
      <span>
        Введите ссылку на Telegram-канал, Яндекс.Карты или{" "}
        <a className="font-medium underline" href="#photo-upload">
          загрузите фото
        </a>
        .
      </span>
    </p>
  );
}
