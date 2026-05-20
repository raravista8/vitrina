"use client";

/**
 * Source-detection badge (Screen #2) — sits below the Hero input,
 * shows what the classifier + live preview think of the pasted URL.
 *
 * Extracted from Hero's inline DetectionFeedback so the component
 * tree stays flat enough to A/B individual states without touching
 * the rest of the hero. Logic identical: receives the deferred
 * classifier output + live-preview state, renders one of 9 visuals.
 *
 * States:
 *
 *   1. idle              — empty input, render nothing (caller filters)
 *   2. mvp / loading     — paper-soft pill, ⏳ "проверяем <Source>…"
 *   3. mvp / ready+counts — success-soft pill, ✓ + counts text
 *   4. mvp / fallback    — success-soft pill without counts (preview
 *                          timed out)
 *   5. waitlist          — info-soft panel + WaitlistCapture (email)
 *                          + parallel "create from photo" CTA
 *   6. unknown_url       — warn-soft panel with open input "what's
 *                          this source?"
 *   7. not_url           — neutral paper-soft hint
 *
 * Design source: concepts.jsx (#2 design canvas, 9-state grid). The
 * grid groups TG/YMaps/✓ as the "mvp" cluster, IG/VK/MAX/2GIS/Avito/
 * WA/YT/Дзен as "waitlist" — same `waitlistSourceLabel` map.
 */

import { useState } from "react";

import { type PreviewData } from "@/lib/preview";
import { type SourceDetection, waitlistSourceLabel } from "@/lib/source-detect";
import { WaitlistCapture } from "./WaitlistCapture";

export type PreviewPhase =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ready"; data: PreviewData }
  | { phase: "fallback" };

interface Props {
  detection: SourceDetection;
  rawInput: string;
  preview: PreviewPhase;
  /**
   * Optional handler for the "create from photo" CTA shown in the
   * waitlist and not-URL states. When provided, the CTA opens the
   * PhotoDrawer in Hero; when omitted (e.g. unit tests rendering the
   * badge in isolation) we fall back to an `<a href="#photo-upload">`
   * anchor so the markup stays accessible.
   */
  onOpenPhotoUpload?: () => void;
}

export function SourceDetectionBadge({ detection, rawInput, preview, onOpenPhotoUpload }: Props) {
  // Empty input → render nothing (clean Hero on first paint).
  if (rawInput.trim().length === 0) return null;

  if (detection.kind === "mvp") {
    return <MvpBadge type={detection.type} preview={preview} />;
  }
  if (detection.kind === "waitlist") {
    return (
      <WaitlistPanel
        source={detection.source}
        canonical={detection.canonical}
        onOpenPhotoUpload={onOpenPhotoUpload}
      />
    );
  }
  if (detection.kind === "unknown_url") {
    return <UnknownUrlPanel url={detection.url} />;
  }
  return <NotUrlHint onOpenPhotoUpload={onOpenPhotoUpload} />;
}

// -----------------------------------------------------------------------------
// State 2-4 — MVP source
// -----------------------------------------------------------------------------

function MvpBadge({ type, preview }: { type: "telegram" | "ymaps"; preview: PreviewPhase }) {
  const label = type === "telegram" ? "Telegram" : "Яндекс.Карты";

  if (preview.phase === "loading") {
    return (
      <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-paper-soft px-3 py-1 text-sm font-medium text-ink-soft">
        <span aria-hidden>⏳</span>
        <span>проверяем {label}…</span>
      </p>
    );
  }

  // Either ready (with counts) or fallback (✓ without counts).
  const countsText = preview.phase === "ready" ? formatCounts(preview.data) : null;
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

function formatCounts(data: PreviewData): string | null {
  const parts: string[] = [];
  if (data.counts.posts !== null) parts.push(`${data.counts.posts} постов`);
  if (data.counts.photos !== null) parts.push(`${data.counts.photos} фото`);
  if (data.counts.reviews !== null) parts.push(`${data.counts.reviews} отзывов`);
  return parts.length > 0 ? `нашли ${parts.join(" и ")}` : null;
}

// -----------------------------------------------------------------------------
// State 5 — Waitlist source
// -----------------------------------------------------------------------------

function WaitlistPanel({
  source,
  canonical,
  onOpenPhotoUpload,
}: {
  source: ReturnType<typeof labelGetter>;
  canonical: string;
  onOpenPhotoUpload?: () => void;
}) {
  return (
    <div className="mx-auto mt-6 max-w-xl text-left">
      {/* User batch 2 (B6): testers read the previous info-soft (blue)
          tint as "all clear, proceed" because blue conveys neutral
          info. Amber/warn-soft signals "this isn't yet supported" more
          honestly without alarming people the way a red error block
          would. Icon swapped to ⚠️ for the same reason. */}
      <p className="rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">
        <span aria-hidden>⚠️ </span>
        {waitlistSourceLabel(source)} скоро будет — оставьте email, напишем когда добавим.
      </p>
      <WaitlistCapture sourceName={source} sourceUrl={canonical} />
      <p className="mt-3 text-center text-sm text-ink-soft">
        или{" "}
        {onOpenPhotoUpload ? (
          <button
            type="button"
            onClick={onOpenPhotoUpload}
            className="font-medium text-ink underline"
          >
            создайте из фото сейчас →
          </button>
        ) : (
          <a className="font-medium text-ink underline" href="#photo-upload">
            создайте из фото сейчас →
          </a>
        )}
      </p>
    </div>
  );
}

// Helper alias for the props type.
type WaitlistSourceName = Parameters<typeof waitlistSourceLabel>[0];
function labelGetter(_: WaitlistSourceName) {
  return _ as WaitlistSourceName;
}

// -----------------------------------------------------------------------------
// State 6 — Unknown URL (open input to name the source)
// -----------------------------------------------------------------------------

function UnknownUrlPanel({ url }: { url: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);

  async function submit() {
    if (!name.trim() || pending) return;
    setPending(true);
    try {
      // Anti-pattern guard per CLAUDE.md: never block the user on
      // an upstream failure. We always show "thanks" — the actual
      // feedback write happens best-effort.
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "source_request",
          source_name: name.trim().toLowerCase(),
          source_url: url,
          checkboxes: {},
          consent_given: true,
          captcha_token: "DEV_TOKEN",
        }),
      });
    } catch {
      // Silent — see comment above.
    } finally {
      setSubmitted(true);
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <p className="mx-auto mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg bg-success-soft px-4 py-3 text-left text-sm text-success">
        <span aria-hidden>✓</span>
        <span>Спасибо — записали. Напишем когда добавим этот источник.</span>
      </p>
    );
  }

  return (
    <div className="mx-auto mt-4 max-w-xl rounded-lg bg-warn-soft px-4 py-3 text-left text-sm text-warn">
      <p>
        <span aria-hidden>⚠️ </span>
        Не узнали источник. Какой это? Напишите название — мы добавим его в список.
      </p>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="например, OK или Tumblr"
          className="focus:ring-warn/40 flex-1 rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          disabled={!name.trim() || pending}
          className="rounded-md bg-warn px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "…" : "Отправить"}
        </button>
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// State 7 — Not-URL hint
// -----------------------------------------------------------------------------

function NotUrlHint({ onOpenPhotoUpload }: { onOpenPhotoUpload?: () => void }) {
  return (
    <p className="mx-auto mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg bg-paper-soft px-4 py-3 text-left text-sm text-ink-soft">
      <span aria-hidden>⚠️</span>
      <span>
        Введите ссылку на Telegram-канал, Яндекс.Карты или{" "}
        {onOpenPhotoUpload ? (
          <button type="button" onClick={onOpenPhotoUpload} className="font-medium underline">
            загрузите фото
          </button>
        ) : (
          <a className="font-medium underline" href="#photo-upload">
            загрузите фото
          </a>
        )}
        .
      </span>
    </p>
  );
}
