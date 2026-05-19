"use client";

/**
 * Public feedback form (T1.7 / PR-D #9).
 *
 * Two sections per ADR-0009 + ТЗ §6:
 *
 *   - "Хочу источник" — 9 waitlist source checkboxes + open "другое" text
 *   - "Хочу фичу"    — 8 feature wishlist checkboxes + open notes
 *
 * The two sections share one submit. The backend `type` is decided
 * client-side: if any source box is ticked or `source_name` is filled
 * in, we send `source_request`; otherwise `feature_request`. Pure bug
 * reports use the dedicated link in Footer.
 *
 * Design source: `~/Downloads/vitrina ui/code/FeedbackForm.tsx` (Concept
 * A canvas screen #9). Logic — T1.7 — is preserved verbatim from the
 * backend wire-up; only Tailwind classes change to the Concept A
 * palette tokens (`paper`, `ink`, `accent`, `line`, `success-soft`,
 * `danger-soft`).
 */

import { MessageCircle } from "lucide-react";
import Link from "next/link";
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
      <div className="rounded-2xl border border-line bg-paper-soft p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Спасибо — записали</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Соберём 10 голосов на источник — приоритизируем и напишем вам.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <SectionHeader title="Хочу источник" hint="Когда соберём 10 голосов — добавим." />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {WAITLIST_OPTIONS.map((opt) => (
              <li key={opt.key}>
                <CheckRow
                  checked={Boolean(checkboxes[opt.key])}
                  onChange={() => toggle(opt.key)}
                  label={opt.label}
                />
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <label className="block text-xs font-medium text-ink-soft" htmlFor={otherSourceId}>
              Своё
            </label>
            <input
              id={otherSourceId}
              type="text"
              placeholder="название источника"
              value={otherSource}
              onChange={(event) => setOtherSource(event.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink",
                "focus:ring-accent/40 placeholder:text-ink-faint focus:outline-none focus:ring-2",
              )}
            />
          </div>
        </Card>

        <Card>
          <SectionHeader title="Хочу фичу" hint="Отметьте всё, что нужно." />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {FEATURE_OPTIONS.map((opt) => (
              <li key={opt.key}>
                <CheckRow
                  checked={Boolean(checkboxes[opt.key])}
                  onChange={() => toggle(opt.key)}
                  label={opt.label}
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Контакт и сообщение" />
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_2fr]">
          <div>
            <label className="block text-xs font-medium text-ink-soft" htmlFor={emailId}>
              Email или @telegram
            </label>
            <input
              id={emailId}
              type="text"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink",
                "focus:ring-accent/40 placeholder:text-ink-faint focus:outline-none focus:ring-2",
              )}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-soft" htmlFor={messageId}>
              Сообщение (опционально)
            </label>
            <textarea
              id={messageId}
              rows={3}
              placeholder="Расскажите подробнее…"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink",
                "focus:ring-accent/40 placeholder:text-ink-faint focus:outline-none focus:ring-2",
              )}
            />
          </div>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="focus:ring-accent/40 mt-0.5 h-4 w-4 rounded border-line text-accent"
          />
          <span>
            Согласен на обработку моих ПДн согласно{" "}
            <Link
              href="/privacy"
              className="text-accent underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              политике конфиденциальности
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white",
            "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {status === "submitting" ? "Отправляем…" : "Отправить →"}
        </button>

        {status === "error" ? (
          <p className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
            Что-то пошло не так. Попробуйте ещё раз через минуту.
          </p>
        ) : null}
      </Card>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-white p-5 shadow-card">{children}</div>;
}

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
      {hint ? <p className="mt-1 text-xs text-ink-faint">{hint}</p> : null}
    </div>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="focus:ring-accent/40 h-4 w-4 rounded border-line text-accent"
      />
      <span>{label}</span>
    </label>
  );
}

/**
 * Floating "Что не хватает?" button. Mount once in `app/layout.tsx`
 * to expose feedback access on every page — matches Design canvas
 * screen #9's bottom-right global CTA.
 */
export function FeedbackFloatingButton() {
  return (
    <Link
      href="/feedback"
      className={cn(
        "fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-paper shadow-pop",
        "hover:bg-ink-soft",
      )}
    >
      <MessageCircle className="h-4 w-4" />
      Что не хватает?
    </Link>
  );
}
