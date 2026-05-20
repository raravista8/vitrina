"use client";

/**
 * Submit modal — covers UI Screens #3 (contact step), #4 (TG bot-invite
 * polling), and #5 (confirmation). One Dialog, three internal step
 * states; the user never has to manually advance.
 *
 * Design source: `~/Downloads/vitrina ui/code/SubmitModal.tsx`. The
 * existing T1.5 ApplicationForm contact-detect/consent/captcha logic
 * is inlined into Step 1 here so all three steps share state.
 *
 * Flow:
 *
 *   step=contact         → POST /api/submit-application → got application_id
 *                          → if sourceType=telegram: step=tg_bot;
 *                            else: step=confirmation
 *   step=tg_bot          → polls GET /api/applications/{id}/tg-bot-status
 *                          every 5s; when {data.added:true} → step=confirmation
 *   step=confirmation    → success + (for TG-contact) QR for @SamositeBot /start
 *
 * Polling is best-effort: closing the modal mid-step-2 aborts the
 * interval; the founder still ingests in the background. Re-opening
 * the modal starts fresh from step=contact.
 */

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, Copy, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { requestCaptchaToken } from "@/lib/captcha";
import { cn } from "@/lib/cn";
import { type ContactType, badgeFor, detectContact } from "@/lib/contact-detect";

interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceUrl: string;
  sourceType: "ymaps" | "telegram" | "photo";
}

type Step =
  | { kind: "contact" }
  | { kind: "tg_bot"; applicationId: string }
  | { kind: "confirmation"; contactType: ContactType };

export function SubmitModal({ open, onOpenChange, sourceUrl, sourceType }: SubmitModalProps) {
  const [step, setStep] = useState<Step>({ kind: "contact" });

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    // Reset on close — the next open starts from contact.
    if (!next) setStep({ kind: "contact" });
  }

  function handleApplicationCreated(applicationId: string, contactType: ContactType) {
    // TG sources need the bot-invite step. Photo + ymaps go straight
    // to confirmation.
    if (sourceType === "telegram") {
      setStep({ kind: "tg_bot", applicationId });
    } else {
      setStep({ kind: "confirmation", contactType });
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-ink/60 fixed inset-0 z-40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-paper p-7 shadow-pop focus:outline-none sm:p-8"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Подключение</Dialog.Title>

          {step.kind === "contact" && (
            <Step1Contact
              sourceUrl={sourceUrl}
              sourceType={sourceType}
              onApplicationCreated={handleApplicationCreated}
            />
          )}
          {step.kind === "tg_bot" && (
            <Step2TgBot
              applicationId={step.applicationId}
              onReady={() => setStep({ kind: "confirmation", contactType: "telegram" })}
            />
          )}
          {step.kind === "confirmation" && <Step3Confirmation contactType={step.contactType} />}

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute right-4 top-4 text-ink-faint hover:text-ink"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// -----------------------------------------------------------------------------
// Step 1 — contact + consent + captcha
// -----------------------------------------------------------------------------

const CONTACT_PLACEHOLDER = "Email, телефон, @telegram или MAX";

interface Step1Props {
  sourceUrl: string;
  sourceType: "ymaps" | "telegram" | "photo";
  onApplicationCreated: (applicationId: string, contactType: ContactType) => void;
}

function Step1Contact({ sourceUrl, sourceType, onApplicationCreated }: Step1Props) {
  const contactId = useId();
  const consentId = useId();
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const detected = detectContact(contact);
  const canSubmit = detected !== null && consent && !pending;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || !detected) return;
    setPending(true);
    setErrorCode(null);
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
        const body = (await response.json()) as {
          data: { application_id: string; contact_type: ContactType };
        };
        onApplicationCreated(body.data.application_id, body.data.contact_type);
        return;
      }
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      setErrorCode(body.error ?? "unknown_error");
    } catch {
      setErrorCode("network_error");
    } finally {
      setPending(false);
    }
  }

  const sourceLabel =
    sourceType === "telegram" ? "Telegram-канал" : sourceType === "ymaps" ? "Яндекс.Карты" : "Фото";

  return (
    <div>
      <StepHeader step={2} total={3} title="Куда отправлять заявки и уведомления?" />
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        Один контакт — туда придёт ссылка на ваш сайт и заявки клиентов.
      </p>

      {sourceUrl ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-success-soft px-3 py-2.5 text-sm text-success">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
          <span>
            Источник: <b>{sourceLabel}</b>
          </span>
          <span className="ml-auto truncate font-mono text-[11px] opacity-75">{sourceUrl}</span>
        </div>
      ) : null}

      <form className="mt-5" onSubmit={onSubmit} noValidate>
        <label className="mb-1.5 block text-xs font-medium text-ink-soft" htmlFor={contactId}>
          Ваш контакт
        </label>
        <div className="relative">
          <input
            id={contactId}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder={CONTACT_PLACEHOLDER}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            className={cn(
              "h-12 w-full rounded-lg border bg-white pl-3 pr-28 text-[15px] text-ink",
              "focus:ring-accent/40 placeholder:text-ink-faint focus:outline-none focus:ring-2",
              detected ? "border-line" : contact ? "border-danger" : "border-line",
            )}
          />
          {detected ? (
            <span
              aria-live="polite"
              className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-accent-soft px-2 py-1 text-[11px] font-medium text-accent-ink"
            >
              <span aria-hidden>{badgeFor(detected.contactType).icon}</span>{" "}
              {badgeFor(detected.contactType).label}
            </span>
          ) : null}
        </div>
        {!detected && contact.length > 0 ? (
          <p className="mt-2 text-sm text-danger">
            Введите email, телефон, @имя в Telegram или MAX
          </p>
        ) : null}

        <label
          className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-ink-soft"
          htmlFor={consentId}
        >
          <input
            id={consentId}
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-line accent-accent"
          />
          <span>
            Согласен на обработку персональных данных согласно{" "}
            <a className="text-accent underline" href="/privacy">
              политике конфиденциальности
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "mt-5 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-lg text-[15px] font-semibold",
            canSubmit
              ? "bg-accent text-white hover:bg-accent-hover"
              : "bg-ink-muted/70 cursor-not-allowed text-white/80",
          )}
        >
          {pending ? "Отправляем…" : "Отправить"} {!pending && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="mt-2.5 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
          <ShieldCheck className="h-3 w-3" /> Защищено Yandex SmartCaptcha · невидимо
        </p>

        {errorCode ? (
          <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
            {translateError(errorCode)}
          </p>
        ) : null}
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Step 2 — TG bot-invite (polls /api/applications/{id}/tg-bot-status)
// -----------------------------------------------------------------------------

const TG_POLL_INTERVAL_MS = 5000;

function Step2TgBot({ applicationId, onReady }: { applicationId: string; onReady: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      try {
        const r = await fetch(`/api/applications/${applicationId}/tg-bot-status`);
        if (!r.ok || cancelled) return;
        const body = (await r.json()) as { data?: { added: boolean } };
        if (body.data?.added) onReady();
      } catch {
        // Silent — keep polling.
      }
    };
    const id = setInterval(() => void tick(), TG_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [applicationId, onReady]);

  function copyHandle() {
    void navigator.clipboard.writeText("@SamositeIntakeBot");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <StepHeader step={3} total={3} title="Добавьте бота в канал на 5 минут" />
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        Чтобы достать посты канала — добавьте <code>@SamositeIntakeBot</code> админом. Как только
        всё прочитаем — сразу выйдем.
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-white p-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-xl">
          🤖
        </span>
        <div className="flex-1">
          <div className="font-mono text-sm">@SamositeIntakeBot</div>
          <div className="text-xs text-ink-faint">админом → «Управление сообщениями»</div>
        </div>
        <button
          type="button"
          onClick={copyHandle}
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink hover:bg-paper-soft"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "скопировано" : "скопировать"}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-paper-soft p-3 text-sm text-ink-soft">
        <Loader2 className="h-4 w-4 animate-spin text-accent" />
        Жду пока добавите бота…
        <span className="ml-auto font-mono text-[11px]">polling · каждые 5с</span>
      </div>

      <p className="mt-3 text-sm text-ink-soft">
        Не получается? Канал приватный?{" "}
        <a href="#tg-export" className="text-accent underline">
          Загрузите HTML-экспорт канала →
        </a>
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Step 3 — confirmation (+ QR for TG-contacts)
// -----------------------------------------------------------------------------

function Step3Confirmation({ contactType }: { contactType: ContactType }) {
  const isTg = contactType === "telegram";
  return (
    <div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
        <Check className="h-8 w-8" strokeWidth={3} />
      </div>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink">Готовим ваш сайт</h2>
      <p className="mt-2 text-ink-soft">Напишем когда будет готово — через 2–24 часа.</p>

      {isTg ? (
        <div className="mt-5 flex gap-4 rounded-2xl border border-line bg-white p-5">
          {/* QR placeholder — a real QR (e.g. via `qrcode.react`) lands
              when the TG bot deep-link token is wired (T1.6d). */}
          <div className="grid h-32 w-32 place-items-center rounded-md bg-paper-soft font-mono text-[10px] text-ink-faint">
            [QR]
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[11px] tracking-widest text-accent">
              НАЖМИТЕ /START
            </div>
            <div className="font-semibold text-ink">Чтобы получать сообщения от «Витрины»</div>
            <p className="mt-1 text-sm text-ink-soft">
              Откройте бот <code>@SamositeBot</code> и нажмите «Старт» — иначе не сможем написать в
              Telegram.
            </p>
          </div>
        </div>
      ) : null}

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper-soft"
      >
        Вернуться на главную <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Shared
// -----------------------------------------------------------------------------

function StepHeader({ step, total, title }: { step: number; total: number; title: string }) {
  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-[11px] tracking-widest text-ink-faint">
          ШАГ {step}/{total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn("h-1 w-7 rounded-full", i < step ? "bg-accent" : "bg-line")}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
    </>
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
