"use client";

/**
 * Hero — canonical messaging per docs/COPY.md §2.
 *
 * Anchors:
 *   - Category label "САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ"
 *   - H1 "Сайт, который сам себя ведёт и приносит вам заявки"
 *   - Single input + one primary CTA (no source-picker tabs — see PRD §4
 *     "Product principle: zero-friction Hero").
 *   - Microcopy under CTA: "Первый месяц бесплатно — без карты при регистрации"
 *   - Below: two text links (📷 photo upload, 📨 closed TG export).
 *
 * Behaviour:
 *   - URL paste is debounced ~150 ms then classified via `detectSource`.
 *   - MVP source (TG / Я.Карты): badge "✓ Telegram" / "✓ Яндекс.Карты"
 *     + CTA enabled. CTA action lands in T1.5 (submit modal); for T1.4
 *     it's a no-op placeholder that logs the intent.
 *   - Waitlist source: badge "ℹ <Source> скоро будет" + inline
 *     WaitlistCapture component (email field) + parallel CTA «или
 *     создайте из фото сейчас».
 *   - Unknown URL: open input asking the user to name the source.
 *   - Not-URL: hint pointing to the supported sources or photo upload.
 *
 * Anti-patterns per COPY.md §7 deliberately avoided:
 *   - No "AI-генератор" wording.
 *   - No Schema.org / sitemap jargon in user-facing copy.
 *   - No "за 2 минуты" as the main hook (it's a secondary detail at most).
 */

import { useDeferredValue, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { type SourceDetection, detectSource, waitlistSourceLabel } from "@/lib/source-detect";
import { WaitlistCapture } from "./WaitlistCapture";

const PLACEHOLDER = "ссылка на соцсеть, Яндекс.Карты или сайт";
const CTA_TEXT = "Собрать мою витрину →";
const MICROCOPY = "Первый месяц бесплатно — без карты при регистрации.";

export function Hero() {
  const inputId = useId();
  const [raw, setRaw] = useState("");
  // useDeferredValue gives us a debounce-by-priority for the classifier
  // without scheduling explicit timers. Classification is cheap (regex) so
  // running it on every keystroke is fine; the deferred value just keeps
  // the badge rendering off the input's critical path.
  const deferred = useDeferredValue(raw);
  const detection: SourceDetection = detectSource(deferred);

  const ctaEnabled = detection.kind === "mvp";

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-white px-6 pb-24 pt-20 sm:pt-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
          САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ
        </p>

        <h1
          id="hero-title"
          className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
        >
          Сайт, который{" "}
          <mark className="bg-yellow-200/70 px-1 text-neutral-900">сам себя ведёт</mark>
          <br />и приносит вам заявки.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg">
          Покажите ссылку на ваше дело — соцсеть, карты или визитку. ИИ соберёт сайт за пару минут и
          сам будет держать его актуальным. Вам ничего не нужно делать.
        </p>

        <form
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (!ctaEnabled) return;
            // T1.5 mounts the submit modal here. For T1.4 we surface the
            // intent so dev consoles in QA can see the classified source.
            console.info("hero_cta_clicked", detection);
          }}
        >
          <label className="sr-only" htmlFor={inputId}>
            ПОКАЖИТЕ ВАШЕ ДЕЛО
          </label>
          <input
            id={inputId}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder={PLACEHOLDER}
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            className={cn(
              "flex-1 rounded-xl border border-neutral-300 bg-white px-5 py-3",
              "text-base text-neutral-900 placeholder:text-neutral-400",
              "focus:outline-none focus:ring-2 focus:ring-neutral-900/70",
            )}
          />
          <button
            type="submit"
            disabled={!ctaEnabled}
            className={cn(
              "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium",
              ctaEnabled
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "cursor-not-allowed bg-neutral-200 text-neutral-500",
            )}
          >
            {CTA_TEXT}
          </button>
        </form>

        <p className="mt-3 text-sm italic text-neutral-500">{MICROCOPY}</p>

        <DetectionFeedback detection={detection} raw={raw} />

        <div className="mt-10 flex flex-col items-center gap-2 text-sm text-neutral-600 sm:flex-row sm:justify-center sm:gap-6">
          <a className="hover:text-neutral-900 hover:underline" href="#photo-upload">
            📷 Загрузить фото работ, скриншот профиля или визитку
          </a>
          <a className="hover:text-neutral-900 hover:underline" href="#tg-export">
            📨 Закрытый TG-канал — загрузить экспорт
          </a>
        </div>
      </div>
    </section>
  );
}

function DetectionFeedback({
  detection,
  raw,
}: {
  detection: SourceDetection;
  raw: string;
}): React.ReactElement | null {
  // Empty input → no feedback at all (clean Hero on first paint).
  if (raw.trim().length === 0) return null;

  if (detection.kind === "mvp") {
    const label = detection.type === "telegram" ? "Telegram" : "Яндекс.Карты";
    return (
      <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
        <span aria-hidden>✓</span>
        <span>{label}</span>
      </p>
    );
  }

  if (detection.kind === "waitlist") {
    return (
      <div className="mx-auto mt-6 max-w-xl text-left">
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span aria-hidden>ℹ️ </span>
          {waitlistSourceLabel(detection.source)} скоро будет — оставьте email, напишем когда
          добавим.
        </p>
        <WaitlistCapture sourceName={detection.source} sourceUrl={detection.canonical} />
        <p className="mt-3 text-center text-sm text-neutral-600">
          или{" "}
          <a className="font-medium text-neutral-900 underline" href="#photo-upload">
            создайте из фото сейчас →
          </a>
        </p>
      </div>
    );
  }

  if (detection.kind === "unknown_url") {
    return (
      <p className="mx-auto mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
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
    <p className="mx-auto mt-4 inline-flex max-w-xl items-start gap-2 rounded-lg bg-neutral-100 px-4 py-3 text-left text-sm text-neutral-700">
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
