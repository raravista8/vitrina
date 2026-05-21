"use client";

/**
 * Submit modal v2 — 3-шаговый wizard per docs/COPY.md §3 + canon
 * `/tmp/samosite-canon/screens-intake.jsx`.
 *
 * Conceptually 3 шага:
 *   - **Шаг 1 — Дайте ссылку** живёт на Hero-странице (URL input + paste).
 *     Модалка открывается УЖЕ с заполненной ссылкой; шаг 1 показан в
 *     прогресс-индикаторе но без UI («Назад» на шаге 2 закрывает модалку
 *     и возвращает юзера на Hero к шагу 1).
 *   - **Шаг 2 — Куда вам писать?** Explicit radio на 4 канала
 *     (TG / Phone / Email / MAX) — НЕТ auto-detect. Validate против
 *     выбранного канала. См. ADR-0008 v2 — UX-batch-2 testing fix.
 *   - **Шаг 3 — Бот-flow** (только если контакт-`channel=telegram`):
 *     юзер `/start`-ит `@SamositeBot` (personal-бот per ADR-0011);
 *     polling `/api/tg-bot-personal-status`. Иначе сразу confirmation.
 *
 * Legacy `Step2TgBot` (для add-intake-bot-to-source-channel) сохраняется
 * как **`Step4IntakeChannelBot`** для будущей интеграции — когда source
 * URL = `t.me/<private_channel>` нужен отдельный экран добавления
 * `@SamositeIntakeBot` админом в этот канал. На текущей итерации
 * (PR-D / E12) — frontend channel radio + minimum bot-flow shape;
 * personal-bot endpoint реализуется в PR-D's backend follow-up
 * (`/api/tg-bot-personal-status` — см. FR-002d).
 *
 * Polling is best-effort: closing the modal aborts the interval;
 * the founder still ingests in the background. Re-opening starts fresh.
 */

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Check, Copy, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { requestCaptchaToken } from "@/lib/captcha";
import { cn } from "@/lib/cn";
import { reachGoal } from "@/lib/metrika";
import {
  type ContactType,
  formatPhoneProgressive,
  validateContactForChannel,
} from "@/lib/contact-detect";

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
              onBack={() => handleOpenChange(false)}
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

// v2 (PR-D / E12): explicit channel radio per ADR-0008 v2 + canon
// screens-intake.jsx. Юзер выбирает канал явно — потом вводит значение
// под канал-specific placeholder.

interface ChannelOption {
  value: ContactType;
  icon: string;
  label: string;
  placeholder: string;
  inputMode: "email" | "tel" | "text";
}

const CHANNELS: ChannelOption[] = [
  {
    value: "telegram",
    icon: "✈️",
    label: "Telegram",
    placeholder: "@your_handle",
    inputMode: "text",
  },
  { value: "phone", icon: "📱", label: "Телефон", placeholder: "+7 ...", inputMode: "tel" },
  { value: "email", icon: "📧", label: "Email", placeholder: "you@example.ru", inputMode: "email" },
  { value: "max", icon: "💬", label: "MAX", placeholder: "@your_max_handle", inputMode: "text" },
];

const CHANNEL_LABEL_INPUT: Record<ContactType, string> = {
  telegram: "Логин в Telegram",
  phone: "Номер телефона",
  email: "Email",
  max: "Логин в MAX",
};

interface Step1Props {
  sourceUrl: string;
  sourceType: "ymaps" | "telegram" | "photo";
  onApplicationCreated: (applicationId: string, contactType: ContactType) => void;
  /**
   * Closes the modal — surfaced as an explicit "← Назад" button in
   * the step header. The ✕ in the corner does the same thing, but
   * user batch 1 testing showed users don't recognise the close icon
   * as "return to the Hero" (they reported "никак не могу вернуться
   * на шаг 1"). The labelled chevron makes the back path obvious.
   */
  onBack: () => void;
}

function Step1Contact({ sourceUrl, sourceType, onApplicationCreated, onBack }: Step1Props) {
  const contactId = useId();
  const consentId = useId();
  // v2: explicit channel selection — defaults to email (most universal).
  // Юзер всегда видит radio первым, не «угадывает» что мы примем.
  const [channel, setChannel] = useState<ContactType>("email");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const isValid = validateContactForChannel(channel, contact);
  const canSubmit = isValid && consent && !pending;

  function handleChannelChange(next: ContactType) {
    setChannel(next);
    // Не очищаем contact при смене канала — если юзер уже ввёл что-то,
    // оставляем для редактирования. Validation просто перепроверится.
    setErrorCode(null);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
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
          // v2 explicit fields — see FR-002a v2 / ADR-0008 v2.
          channel,
          contact,
          consent_given: consent,
          captcha_token: captchaToken,
        }),
      });

      if (response.status === 202) {
        const body = (await response.json()) as {
          data: { application_id: string; contact_type: ContactType };
        };
        // Я.Метрика goal — backend подтвердил приём заявки. Это
        // конверсионный «золотой» сигнал воронки. Channel передаём как
        // dimension для cohort-анализа (какой канал реально доходит до
        // 202). Никакой PII (telegram/phone/email значений) не уходит.
        reachGoal("hero_submit_success", { channel });
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

  return (
    <div>
      <StepHeader step={2} total={3} title="Куда вам писать?" onBack={onBack} />
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        Туда придёт ссылка на готовый сайт и заявки клиентов.
      </p>

      <form className="mt-5" onSubmit={onSubmit} noValidate>
        {/* Channel radio — explicit selection, no auto-detect (ADR-0008 v2) */}
        <fieldset className="mb-4">
          <legend className="mb-2 text-xs font-medium text-ink-soft">Выберите канал</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CHANNELS.map((c) => {
              const checked = c.value === channel;
              return (
                <label
                  key={c.value}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border p-2.5 text-[13px] font-medium transition",
                    checked
                      ? "border-accent bg-accent-soft text-accent-ink"
                      : "border-line bg-white text-ink-soft hover:border-ink-faint",
                  )}
                >
                  <input
                    type="radio"
                    name="contact-channel"
                    value={c.value}
                    checked={checked}
                    onChange={() => handleChannelChange(c.value)}
                    className="sr-only"
                  />
                  <span aria-hidden>{c.icon}</span>
                  <span>{c.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Per-channel input */}
        <label className="mb-1.5 block text-xs font-medium text-ink-soft" htmlFor={contactId}>
          {CHANNEL_LABEL_INPUT[channel]}
        </label>
        <input
          id={contactId}
          type="text"
          autoComplete="off"
          spellCheck={false}
          inputMode={CHANNELS.find((c) => c.value === channel)?.inputMode}
          placeholder={CHANNELS.find((c) => c.value === channel)?.placeholder}
          value={contact}
          onChange={(event) => {
            const next = event.target.value;
            // Прогрессивный phone format ТОЛЬКО когда channel=phone.
            // Для других каналов оставляем raw как есть.
            if (channel === "phone") {
              const formatted = formatPhoneProgressive(next);
              setContact(formatted ?? next);
            } else {
              setContact(next);
            }
          }}
          className={cn(
            "h-12 w-full rounded-lg border bg-white px-3 text-[15px] text-ink",
            "focus:ring-accent/40 placeholder:text-ink-faint focus:outline-none focus:ring-2",
            !contact || isValid ? "border-line" : "border-danger",
          )}
        />
        {!isValid && contact.length > 0 ? (
          <p className="mt-2 text-sm text-danger">
            Это не похоже на {CHANNEL_LABEL_INPUT[channel].toLowerCase()}. Проверьте формат или
            выберите другой канал выше.
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
            <div className="font-semibold text-ink">Чтобы получать сообщения от «Самосайта»</div>
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

function StepHeader({
  step,
  total,
  title,
  onBack,
}: {
  step: number;
  total: number;
  title: string;
  /**
   * Optional explicit back-affordance. When provided, renders a labelled
   * "← Назад" button before the step counter so the user can return to
   * the previous logical step (Hero, for step 2/3). The corner ✕ is
   * kept as the destructive "cancel and lose state" action; this one
   * is the "I want to fix my last input" action.
   */
  onBack?: () => void;
}) {
  return (
    <>
      <div className="mb-3 flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[12px] font-medium text-ink-soft hover:bg-paper-soft hover:text-ink"
          >
            <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
            Назад
          </button>
        ) : null}
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
