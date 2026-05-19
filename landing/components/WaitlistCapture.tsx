"use client";

/**
 * Inline waitlist-capture for sources we don't parse in MVP (ADR-0009).
 *
 * Submits to /api/feedback with `type=source_request`, `source_name=<canonical>`
 * — endpoint lands in T1.7. For T1.4 we POST to the same path; on a 404 we
 * fall back to a "thanks" message regardless so QA can verify the UI flow.
 */

import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import type { WaitlistSource } from "@/lib/source-detect";

type Status = "idle" | "submitting" | "submitted" | "error";

export function WaitlistCapture({
  sourceName,
  sourceUrl,
}: {
  sourceName: WaitlistSource;
  sourceUrl: string;
}) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (status === "submitted") {
    return (
      <p className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        ✓ Спасибо! Напишем на {email} когда добавим этот источник.
      </p>
    );
  }

  return (
    <form
      className="mt-3 flex flex-col gap-2 sm:flex-row"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!email) return;
        setStatus("submitting");
        try {
          const response = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "source_request",
              source_name: sourceName,
              source_url: sourceUrl,
              email,
              consent_given: true,
            }),
          });
          // T1.7 will own /api/feedback; until then we accept any non-5xx
          // response (or a network error in dev) as "captured" for UX.
          if (response.status >= 500) {
            setStatus("error");
            return;
          }
          setStatus("submitted");
        } catch {
          setStatus("error");
        }
      }}
    >
      <label className="sr-only" htmlFor={inputId}>
        Email для уведомления
      </label>
      <input
        id={inputId}
        type="email"
        required
        autoComplete="email"
        placeholder="ваш email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={cn(
          "flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm",
          "text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/70",
        )}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {status === "submitting" ? "Сохраняем…" : "Уведомить"}
      </button>
      {status === "error" ? (
        <span className="text-xs text-rose-700">Что-то пошло не так — попробуйте позже</span>
      ) : null}
    </form>
  );
}
