"use client";

/**
 * SubmitModal — canon 0.3.0 intake flow (link OR photo).
 *
 * Two branches:
 *
 *   link  : Step 1 (URL + mode-switcher)
 *           → Step 2 (contact + consent + captcha)
 *           → Step 3 (final confirm inline)
 *
 *   photo : Step 1 (photos + mode-switcher)
 *           → Step 2 (description + city + customer_contact + opt. text_files)
 *           → Step 3 (contact + consent + captcha)
 *           → Step 4 (final confirm inline)
 *
 * Renders canon's `<SubmitModal>` from `@samosite/canon/intake` as the
 * step view; this file owns state, branching, and the backend wiring
 * (POST /api/submit-application for link mode, multipart
 * /api/submit-application/photo for photo mode).
 *
 * Mode switcher visible on Step 1 in both branches — user can change
 * mind without closing. Per-branch state is preserved when switching
 * (the link `url` survives a switch to photo and back).
 */

import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { SubmitModal as CanonSubmitModal } from "@samosite/canon/intake";
import { useEffect, useState } from "react";

import { reachGoal } from "@/lib/metrika";
import type { SourceDetection } from "@/lib/source-detect";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type SubmitMode = "link" | "photo";

export interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Mode to open on. Hero "Сделать сайт" → 'link'; "или загрузите фото" → 'photo'. */
  initialMode?: SubmitMode;
  /** Pre-filled URL when opened from Hero with a non-empty input. */
  initialUrl?: string;
  /** Live source detection from Hero (only meaningful in link mode). */
  initialDetection?: SourceDetection;
}

type Step = 1 | 2 | 3 | 4;

// ---------------------------------------------------------------------------
// Backend wiring helpers
// ---------------------------------------------------------------------------

interface SubmitOk {
  ok: true;
  application_id: string;
  contact_type: string;
}
interface SubmitFail {
  ok: false;
  code: string;
}
type SubmitResult = SubmitOk | SubmitFail;

async function submitLink(body: {
  url: string;
  source_type: string;
  channel: string;
  contact: string;
  consent: boolean;
  captcha_token: string;
}): Promise<SubmitResult> {
  const res = await fetch("/api/submit-application", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      mode: "link",
      source_url: body.url || undefined,
      source_type: body.source_type,
      channel: body.channel,
      contact: body.contact,
      consent_given: body.consent,
      captcha_token: body.captcha_token,
    }),
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, code: j?.error ?? `http_${res.status}` };
  }
  const j = (await res.json()) as { data: { application_id: string; contact_type: string } };
  return { ok: true, application_id: j.data.application_id, contact_type: j.data.contact_type };
}

async function submitPhoto(body: {
  files: File[];
  description: string;
  city: string;
  customer_contact_type: string;
  customer_contact_value: string;
  text_files: File[];
  channel: string;
  contact: string;
  consent: boolean;
  captcha_token: string;
}): Promise<SubmitResult> {
  const fd = new FormData();
  body.files.forEach((f) => fd.append("files", f));
  body.text_files.forEach((f) => fd.append("text_files", f));
  fd.append("contact", body.contact);
  fd.append("channel", body.channel);
  fd.append("consent_given", String(body.consent));
  fd.append("captcha_token", body.captcha_token);
  fd.append("description", body.description);
  fd.append("city", body.city);
  fd.append("customer_contact_type", body.customer_contact_type);
  fd.append("customer_contact_value", body.customer_contact_value);
  const res = await fetch("/api/submit-application/photo", {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, code: j?.error ?? `http_${res.status}` };
  }
  const j = (await res.json()) as { data: { application_id: string; contact_type: string } };
  return { ok: true, application_id: j.data.application_id, contact_type: j.data.contact_type };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SubmitModal({
  open,
  onOpenChange,
  initialMode = "link",
  initialUrl = "",
  initialDetection,
}: SubmitModalProps) {
  const [mode, setMode] = useState<SubmitMode>(initialMode);
  const [step, setStep] = useState<Step>(1);

  // Link branch state
  const [url, setUrl] = useState(initialUrl);

  // Photo branch state — preserved per-branch (canon CHANGELOG §1.9: «stale
  // URL при mode-switch сохраняется»).
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerContactType, setCustomerContactType] = useState<"phone" | "telegram">("phone");
  const [textFiles, setTextFiles] = useState<File[]>([]);

  // Shared contact step (used by both branches)
  const [channel, setChannel] = useState<"telegram" | "phone" | "email" | "max">("telegram");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(true);

  // Submit lifecycle
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to initial state every time the modal re-opens. setState in
  // effect is the React-recommended pattern for "reset on prop change"
  // when the prop is `open` (not a derivable state).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!open) return;
    setMode(initialMode);
    setUrl(initialUrl);
    setStep(initialUrl && initialMode === "link" ? 2 : 1);
    setFiles([]);
    setDescription("");
    setCity("");
    setCustomerContact("");
    setCustomerContactType("phone");
    setTextFiles([]);
    setChannel("telegram");
    setContact("");
    setConsent(true);
    setSubmitting(false);
    setError(null);
  }, [open, initialMode, initialUrl]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function handleBack() {
    if (step === 1) return;
    setStep((step - 1) as Step);
  }

  function handleContinue() {
    setStep((step + 1) as Step);
  }

  function handleClose() {
    onOpenChange(false);
  }

  async function handleSubmit() {
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    // CAPTCHA: dev mode passes "DEV_TOKEN", prod hooks up Yandex SmartCaptcha
    // (out of scope for this PR — wired in lib/captcha.ts when SmartCaptcha
    // is initialised; fall back to DEV_TOKEN otherwise).
    type WindowWithCaptcha = Window & { __getCaptchaToken?: () => Promise<string> };
    const captchaToken =
      typeof window !== "undefined" && (window as WindowWithCaptcha).__getCaptchaToken
        ? await (window as WindowWithCaptcha).__getCaptchaToken!()
        : "DEV_TOKEN";

    let result: SubmitResult;
    if (mode === "link") {
      const sourceType = initialDetection?.kind === "mvp" ? initialDetection.type : "photo";
      result = await submitLink({
        url,
        source_type: sourceType,
        channel,
        contact,
        consent,
        captcha_token: captchaToken,
      });
    } else {
      result = await submitPhoto({
        files,
        description,
        city,
        customer_contact_type: customerContactType,
        customer_contact_value: customerContact,
        text_files: textFiles,
        channel,
        contact,
        consent,
        captcha_token: captchaToken,
      });
    }

    setSubmitting(false);
    if (!result.ok) {
      setError(translateError(result.code));
      return;
    }

    reachGoal("hero_submit_success", { mode });
    // Advance to final step
    setStep((mode === "photo" ? 4 : 3) as Step);
  }

  const summary = {
    url,
    fileCount: files.length,
    description,
    city,
    customerContact,
    textFileCount: textFiles.length,
    channel,
    contact,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-ink/45 fixed inset-0 z-[60] backdrop-blur-sm" />
        <DialogContent
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[70] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[20px] bg-paper shadow-xl outline-none focus:outline-none sm:max-h-[90vh]"
        >
          <CanonSubmitModal
            mode={mode}
            step={step}
            url={url}
            source={initialDetection?.kind === "mvp" ? initialDetection.type : null}
            counts={null}
            onUrlChange={setUrl}
            onCorrect={() => {
              /* override popover — handled by SourceDetectionBadge in Hero */
            }}
            files={files}
            onPickPhoto={(picked: File[]) => setFiles([...files, ...picked])}
            onRemovePhoto={(index: number) => setFiles(files.filter((_, i) => i !== index))}
            onModeChange={(m: SubmitMode) => {
              setMode(m);
              setStep(1);
            }}
            description={description}
            city={city}
            customerContact={customerContact}
            customerContactType={customerContactType}
            textFiles={textFiles}
            onDescriptionChange={setDescription}
            onCityChange={setCity}
            onCustomerContactChange={setCustomerContact}
            onCustomerContactTypeChange={setCustomerContactType}
            onPickTextFile={(picked: File[]) => setTextFiles([...textFiles, ...picked])}
            onRemoveTextFile={(index: number) =>
              setTextFiles(textFiles.filter((_, i) => i !== index))
            }
            channel={channel}
            contact={contact}
            consent={consent}
            onChannelChange={(c: typeof channel) => setChannel(c)}
            onContactChange={setContact}
            onConsentChange={setConsent}
            onBack={handleBack}
            onContinue={handleContinue}
            onSubmit={handleSubmit}
            onClose={handleClose}
            summary={summary}
          />
          {error && (
            <div
              role="alert"
              className="text-danger-ink mx-6 mb-4 rounded-lg bg-danger-soft px-4 py-3 text-sm"
            >
              {error}
            </div>
          )}
          {submitting && (
            <div className="bg-paper/70 absolute inset-0 z-10 flex items-center justify-center">
              <div className="rounded-full bg-white px-6 py-3 text-sm text-ink shadow-lg">
                Отправляем заявку…
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function translateError(code: string): string {
  switch (code) {
    case "invalid_captcha":
      return "Не прошли captcha — попробуйте обновить страницу.";
    case "consent_required":
      return "Нужно согласие на обработку персональных данных.";
    case "invalid_contact":
      return "Не распознали формат контакта. Проверьте, что вы ввели корректный email, телефон или @username.";
    case "invalid_contact_for_channel":
      return "Контакт не подходит под выбранный канал. Проверьте формат.";
    case "description_too_short":
      return "Опишите дело подробнее — нужно хотя бы пара предложений.";
    case "city_required":
      return "Укажите город.";
    case "invalid_customer_contact_type":
      return "Выберите телефон или Telegram для контакта на сайте.";
    case "customer_contact_required":
      return "Введите телефон или Telegram, по которому клиенты будут связываться с вами.";
    case "too_few_files":
      return "Нужно загрузить минимум 5 фото.";
    case "file_too_large":
      return "Один из файлов слишком большой. Лимит — 15 МБ на файл.";
    case "batch_too_large":
      return "Общий размер файлов превышает 200 МБ.";
    case "bad_magic_bytes":
      return "Один из файлов не похож на изображение / документ. Проверьте формат.";
    case "too_many_files":
      return "Слишком много текстовых файлов — максимум 10.";
    case "photo_batch_rejected":
      return "Пачка фото не прошла проверку.";
    default:
      return `Что-то пошло не так (${code}). Попробуйте ещё раз через минуту.`;
  }
}
