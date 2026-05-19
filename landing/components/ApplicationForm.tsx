"use client";

/**
 * Step-2 application form (T1.5). One contact field with live-detected
 * type, consent checkbox, invisible SmartCaptcha, submit button.
 *
 * On submit:
 *   1. Request a captcha token (DEV_TOKEN in dev — see lib/captcha.ts).
 *   2. POST to /api/submit-application with source_url + source_type
 *      (passed by parent), contact (raw, server normalises), consent_given,
 *      captcha_token.
 *   3. Bubble status back to parent — SubmitModal then swaps to the
 *      confirmation screen.
 */

import { useId, useState } from "react";

import { badgeFor, detectContact } from "@/lib/contact-detect";
import { requestCaptchaToken } from "@/lib/captcha";
import { cn } from "@/lib/cn";

const CONTACT_PLACEHOLDER = "Email, телефон, @telegram или MAX";
const SUBMIT_LABEL = "Создать сайт →";
const ERROR_NO_CONTACT_TYPE = "Введите email, телефон, @имя в Telegram или MAX";

const POLICY_URL = "/privacy";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; code: string }
  | { status: "submitted" };

interface ApplicationFormProps {
  sourceUrl: string;
  sourceType: "ymaps" | "telegram" | "photo";
  onSubmitted: () => void;
}

export function ApplicationForm({ sourceUrl, sourceType, onSubmitted }: ApplicationFormProps) {
  const contactId = useId();
  const consentId = useId();
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const detected = detectContact(contact);
  const canSubmit = detected !== null && consent && state.status !== "submitting";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setState({ status: "submitting" });
    try {
      const captchaToken = await requestCaptchaToken();
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_url: sourceUrl || null,
          source_type: sourceType,
          contact,
          consent_given: consent,
          captcha_token: captchaToken,
        }),
      });

      if (response.status === 202) {
        setState({ status: "submitted" });
        onSubmitted();
        return;
      }

      const body = (await response.json().catch(() => ({}))) as { error?: string };
      setState({ status: "error", code: body.error ?? "unknown_error" });
    } catch (err) {
      setState({
        status: "error",
        code: err instanceof Error ? "network_error" : "unknown_error",
      });
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <div>
        <label className="text-sm font-medium text-neutral-800" htmlFor={contactId}>
          Как с вами связаться?
        </label>
        <div className="relative mt-2">
          <input
            id={contactId}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder={CONTACT_PLACEHOLDER}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 pr-24 text-base text-neutral-900",
              "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/70",
              detected ? "border-neutral-300" : contact ? "border-rose-300" : "border-neutral-300",
            )}
          />
          {detected ? (
            <span
              aria-live="polite"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800"
            >
              {badgeFor(detected.contactType).icon} {badgeFor(detected.contactType).label}
            </span>
          ) : null}
        </div>
        {!detected && contact.length > 0 ? (
          <p className="mt-2 text-sm text-rose-700">{ERROR_NO_CONTACT_TYPE}</p>
        ) : null}
      </div>

      <label className="flex items-start gap-2 text-sm text-neutral-700" htmlFor={consentId}>
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-neutral-400"
        />
        <span>
          Я согласен(а) на обработку моих персональных данных согласно{" "}
          <a className="underline" href={POLICY_URL} target="_blank" rel="noopener noreferrer">
            политике конфиденциальности
          </a>
          . Сервис соответствует ФЗ-152 — данные хранятся в России.
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "mt-2 inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium",
          canSubmit
            ? "bg-neutral-900 text-white hover:bg-neutral-800"
            : "cursor-not-allowed bg-neutral-200 text-neutral-500",
        )}
      >
        {state.status === "submitting" ? "Отправляем…" : SUBMIT_LABEL}
      </button>

      {state.status === "error" ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {translateError(state.code)}
        </p>
      ) : null}
    </form>
  );
}

function translateError(code: string): string {
  switch (code) {
    case "invalid_contact":
      return "Не получилось распознать контакт. Введите email, телефон, @имя в Telegram или MAX.";
    case "consent_required":
      return "Нужно согласие на обработку персональных данных.";
    case "invalid_captcha":
      return "Капча не прошла проверку — обновите страницу и попробуйте ещё раз.";
    case "rate_limited":
      return "Слишком много запросов с этого IP. Попробуйте через час.";
    case "validation_failed":
      return "Что-то заполнено неверно — проверьте поля и попробуйте ещё раз.";
    case "network_error":
      return "Не удалось связаться с сервером. Проверьте интернет и попробуйте ещё раз.";
    default:
      return "Что-то пошло не так. Попробуйте ещё раз через минуту.";
  }
}
