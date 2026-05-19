"use client";

/**
 * Public feedback form (T1.7). Two sections per ADR-0009 + ТЗ §6:
 *
 *   - "Хочу источник" — 9 waitlist source checkboxes + open "другое" text
 *   - "Хочу фичу"    — 8 feature wishlist checkboxes + open notes
 *
 * The two sections share one submit. The backend type is decided
 * client-side: if any source box is ticked or `source_name` is filled in,
 * we send `source_request`; otherwise `feature_request`. Pure bug reports
 * use the dedicated link in Footer (T?.?).
 */

import { useId, useState } from "react";

import { requestCaptchaToken } from "@/lib/captcha";
import { cn } from "@/lib/cn";

const WAITLIST_OPTIONS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "instagram", label: "Instagram" },
  { key: "vkontakte", label: "ВКонтакте" },
  { key: "twogis", label: "2GIS" },
  { key: "avito", label: "Avito" },
  { key: "ozon", label: "Ozon" },
  { key: "wildberries", label: "Wildberries" },
  { key: "whatsapp", label: "WhatsApp Catalog" },
  { key: "youtube", label: "YouTube / Shorts" },
  { key: "dzen", label: "Дзен" },
  { key: "max-channel", label: "MAX-канал" },
  { key: "own-site", label: "Парсинг своего сайта" },
];

const FEATURE_OPTIONS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "yclients", label: "Интеграция с YCLIENTS" },
  { key: "amocrm", label: "Интеграция с amoCRM" },
  { key: "custom-domain", label: "Свой домен (не *.vitrina.site)" },
  { key: "watermark-removal", label: "Убрать водяной знак Free" },
  { key: "multilang", label: "Мультиязычный сайт" },
  { key: "online-payment", label: "Онлайн-оплата на сайте" },
  { key: "blog", label: "Блог-CMS" },
  { key: "stats", label: "Расширенная статистика" },
];

type Status = "idle" | "submitting" | "submitted" | "error";

export function FeedbackForm() {
  const emailId = useId();
  const messageId = useId();
  const otherSourceId = useId();
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});
  const [otherSource, setOtherSource] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  function toggle(key: string) {
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const anySourceTicked =
    WAITLIST_OPTIONS.some((o) => checkboxes[o.key]) || otherSource.trim().length > 0;
  const anyFeatureTicked = FEATURE_OPTIONS.some((o) => checkboxes[o.key]);
  const hasContent = anySourceTicked || anyFeatureTicked || message.trim().length > 0;
  const canSubmit = hasContent && consent && status !== "submitting";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const captchaToken = await requestCaptchaToken();
      const type = anySourceTicked ? "source_request" : "feature_request";
      const sourceName = anySourceTicked
        ? (WAITLIST_OPTIONS.find((o) => checkboxes[o.key])?.key ??
          (otherSource.trim() ? "other" : null))
        : null;

      const body = {
        type,
        email: email.trim() || null,
        source_name: sourceName,
        source_url: null,
        message:
          [message.trim(), otherSource.trim() ? `Другое: ${otherSource.trim()}` : ""]
            .filter(Boolean)
            .join("\n") || null,
        checkboxes,
        consent_given: consent,
        captcha_token: captchaToken,
      };

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(response.status === 202 ? "submitted" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <p className="rounded-xl bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
        ✓ Спасибо! Учтём в приоритизации. Если оставили email — напишем, когда добавим.
      </p>
    );
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <section>
        <h2 className="text-xl font-semibold text-neutral-900">Хочу источник</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Что мы пока не парсим — поставьте галочку. Когда наберём 10 голосов на один пункт,
          приоритизируем разработку.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {WAITLIST_OPTIONS.map((opt) => (
            <li key={opt.key}>
              <Checkbox
                checked={Boolean(checkboxes[opt.key])}
                onChange={() => toggle(opt.key)}
                label={opt.label}
              />
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <label className="text-sm text-neutral-700" htmlFor={otherSourceId}>
            Другое (укажите)
          </label>
          <input
            id={otherSourceId}
            type="text"
            placeholder="Свой источник…"
            value={otherSource}
            onChange={(e) => setOtherSource(e.target.value)}
            className={cn(
              "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm",
              "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/70",
            )}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-neutral-900">Хочу фичу</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Что хочется видеть в продукте — отметьте всё, что нужно.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {FEATURE_OPTIONS.map((opt) => (
            <li key={opt.key}>
              <Checkbox
                checked={Boolean(checkboxes[opt.key])}
                onChange={() => toggle(opt.key)}
                label={opt.label}
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <label className="text-sm font-medium text-neutral-800" htmlFor={messageId}>
          Дополнительно
        </label>
        <textarea
          id={messageId}
          rows={4}
          placeholder="Расскажите подробнее…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(
            "mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/70",
          )}
        />
      </section>

      <section>
        <label className="text-sm font-medium text-neutral-800" htmlFor={emailId}>
          Email для ответа (опционально)
        </label>
        <input
          id={emailId}
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/70",
          )}
        />
      </section>

      <label className="flex items-start gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-neutral-400"
        />
        <span>
          Согласен на обработку моих ПДн согласно{" "}
          <a className="underline" href="/privacy" target="_blank" rel="noopener noreferrer">
            политике конфиденциальности
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium",
          canSubmit
            ? "bg-neutral-900 text-white hover:bg-neutral-800"
            : "cursor-not-allowed bg-neutral-200 text-neutral-500",
        )}
      >
        {status === "submitting" ? "Отправляем…" : "Отправить →"}
      </button>

      {status === "error" ? (
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800">
          Что-то пошло не так. Попробуйте ещё раз через минуту.
        </p>
      ) : null}
    </form>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-neutral-400"
      />
      <span>{label}</span>
    </label>
  );
}
