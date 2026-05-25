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
import { useEffect, useMemo, useRef, useState } from "react";

import { reachGoal } from "@/lib/metrika";
import { type SourceDetection, detectSource } from "@/lib/source-detect";

/**
 * Map our `detectSource()` output to canon's `SOURCE_LIB` key (see
 * packages/canon/src/intake/index.tsx §SOURCE_LIB).
 *
 * Canon's `<LinkInput loading={!!url && !source}>` shows a green
 * spinner whenever url is set but source is null. To avoid an
 * infinite-spinner state, this function returns a non-null value for
 * EVERY non-empty input — empty input is handled separately by the
 * caller (returns `null` directly to suppress the badge).
 *
 *   - mvp/ymaps             → 'yandex_maps'  → ✓ Распознали: Яндекс.Карты
 *   - mvp/telegram          → 'telegram'     → ✓ Распознали: Telegram-канал
 *   - waitlist (vk/wa/yt)   → source key     → ⚠️  скоро поддержим
 *   - unknown_url / not_url → 'unknown'      → ⚠️  Не узнали источник
 */
function detectionToCanonSource(d: SourceDetection): string {
  switch (d.kind) {
    case "mvp":
      return d.type === "ymaps" ? "yandex_maps" : d.type;
    case "waitlist":
      return d.source;
    case "unknown_url":
    case "not_url":
      return "unknown";
  }
}

/** Debounce window before the URL is classified — fast enough to feel
 * live, slow enough that typing «https://t.m» doesn't briefly flash
 * «Не узнали источник» before the user finishes «https://t.me/...». */
const URL_DEBOUNCE_MS = 300;

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

  // Debounced URL — drives canon's source badge. While the user is
  // actively typing, debouncedUrl lags the live `url` state by
  // URL_DEBOUNCE_MS; canon's `<LinkInput loading={!!url && !source}>`
  // sees an `!source` for that window because the previous-stable
  // classification doesn't match the new typed text → shows the green
  // spinner briefly (intended UX: «still classifying, give us a sec»).
  // After 300 ms of inactivity the source resolves to one of:
  //   ✓ mvp (yandex_maps/telegram)         → green «Распознали» pill
  //   ⚠️  waitlist (vk/whatsapp/youtube)    → blue «скоро поддержим»
  //   ⚠️  unknown_url / not_url             → orange «Не узнали источник»
  // The detectionToCanonSource() helper never returns null for
  // non-empty input — that's how we prevent the «spinner forever» bug
  // reported after canon 0.5.0.
  const [debouncedUrl, setDebouncedUrl] = useState(url);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedUrl(url), URL_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [url]);
  const canonSource = useMemo<string | null>(() => {
    if (debouncedUrl.trim().length === 0) return null;
    return detectionToCanonSource(detectSource(debouncedUrl));
  }, [debouncedUrl]);

  // Hidden file-input refs. Canon's PhotoDropZone / TextFilesDropZone
  // render «Выбрать файлы» as a presentational <button onClick={onPick}>
  // — the click handler receives no arguments. The consumer (this file)
  // is expected to own the actual file picker. We mount a hidden
  // <input type="file" multiple> per branch and trigger .click() from
  // the canon callbacks; the input's onChange feeds File[] back into
  // state.
  const photoInputRef = useRef<HTMLInputElement>(null);
  const textFileInputRef = useRef<HTMLInputElement>(null);

  function openPhotoPicker() {
    // Reset value first so picking the same file twice still fires
    // onChange — by default `<input type=file>` doesn't re-emit
    // change for identical selections.
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
      photoInputRef.current.click();
    }
  }

  function openTextFilePicker() {
    if (textFileInputRef.current) {
      textFileInputRef.current.value = "";
      textFileInputRef.current.click();
    }
  }

  function handlePhotoInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length === 0) return;
    setFiles((prev) => [...prev, ...picked]);
  }

  function handleTextFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length === 0) return;
    setTextFiles((prev) => [...prev, ...picked]);
  }

  // Canon's PHOTO_LIMITS.minFiles=5 (packages/canon/src/intake/index.tsx
  // §275) renders a «Загрузите ещё N — нужно минимум 5» warn pill below
  // the threshold. Our actual minimum is 1 (user: «пусть будет хоть
  // одно»). This effect hides that warn pill via text-content match —
  // canon ships no classes / data-attrs, and the warn pill shares its
  // background colour (`VT.warnSoft`) with the SourceBadge unknown
  // tier so a CSS selector by inline-style would over-match.
  //
  // Button opacity is forced separately via the CSS rule
  // `.ss-submit-modal-host button[data-ss-cta] { opacity: 1 !important }`
  // in globals.css — CSS with !important survives canon's re-renders,
  // which kept overwriting an earlier JS approach.
  useEffect(() => {
    if (!open || mode !== "photo" || step !== 1) return;
    const host = document.querySelector(".ss-submit-modal-host");
    if (!host) return;
    for (const el of host.querySelectorAll("div")) {
      if (el.textContent?.trimStart().startsWith("Загрузите ещё ")) {
        (el as HTMLElement).style.display = files.length >= 1 ? "none" : "";
      }
    }
  }, [open, mode, step, files.length]);

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
      // Re-classify on submit (not initialDetection from Hero) — the
      // user may have edited the URL inside the modal. Falls back to
      // 'photo' for unknown/non-URL inputs to match the prior shape.
      const liveDetection = detectSource(url);
      const sourceType = liveDetection.kind === "mvp" ? liveDetection.type : "photo";
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
        {/* Backdrop — inline style instead of `bg-ink/N` Tailwind
            class because our `ink` token is defined as a plain
            oklch() string (no `<alpha-value>` placeholder), so
            Tailwind silently drops the `/N` opacity modifier and
            no rule ends up in the generated CSS. Inline style
            bypasses the JIT entirely.
            65% opacity gives the modal card enough separation from
            the page (user: «модалка сливается с контентом»).
            Adding `<alpha-value>` to tailwind.config.ts would fix
            this for all classes but risks visual diffs across the
            other 100+ `bg-ink` callsites — out of scope for this
            hot-fix. */}
        <DialogOverlay
          className="fixed inset-0 z-[60] backdrop-blur-sm"
          style={{ backgroundColor: "oklch(0.215 0.018 60 / 0.65)" }}
        />
        <DialogContent
          aria-describedby={undefined}
          /* Positioning + sizing only — visual chrome (background,
             rounded corners, shadow) lives on canon's inner card so
             we don't double-layer. The «ss-submit-modal-host» class
             scopes the CSS override that neutralises canon's outer
             ModalShell backdrop (the `rgba(0,0,0,0.32)` layer that
             canon ships for standalone use).

             Width: canon's steps use `ModalShell width={540|560}` —
             clamping DialogContent at 540 means the wider 560-step
             card gets its own `maxWidth: '100%'` to shrink to 540,
             eliminating the left/right gap that previously rendered
             as a translucent gray ring. See globals.css. */
          className="ss-submit-modal-host fixed left-1/2 top-1/2 z-[70] w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto outline-none focus:outline-none sm:max-h-[90vh]"
          /* Event delegation for canon-shipped buttons that need to
             be wired up on the consumer side:
             1. × close: canon's <ModalShell> renders <button
                aria-label="Закрыть"> with no onClick — call
                onOpenChange(false).
             2. «Продолжить» on photo step 1: canon gates this on
                files.length >= 5 (PHOTO_LIMITS.minFiles). We allow
                ≥1, so when files.length is 1..4 the button has
                onClick=undefined → call handleContinue() ourselves.
             Radix's own ESC + overlay-click paths still work for close. */
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest('button[aria-label="Закрыть"]')) {
              onOpenChange(false);
              return;
            }
            if (mode === "photo" && step === 1 && files.length >= 1 && files.length < 5) {
              const btn = target.closest("button");
              if (btn && btn.textContent?.trim().startsWith("Продолжить")) {
                handleContinue();
              }
            }
          }}
        >
          {/* Hidden file inputs — opened from canon PhotoDropZone /
              TextFilesDropZone «Выбрать файлы» buttons via the refs
              above. accept= matches canon's published limits
              (intake §PHOTO_LIMITS / TextFilesDropZone). */}
          <input
            ref={photoInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handlePhotoInputChange}
          />
          <input
            ref={textFileInputRef}
            type="file"
            multiple
            accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/rtf,.pdf,.docx,.txt,.rtf"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleTextFileInputChange}
          />
          <CanonSubmitModal
            mode={mode}
            step={step}
            url={url}
            source={canonSource}
            counts={null}
            onUrlChange={setUrl}
            onCorrect={() => {
              /* override popover — handled by SourceDetectionBadge in Hero */
            }}
            files={files}
            // Canon calls onPick() with no args — consumer triggers
            // the hidden <input type=file> below.
            onPickPhoto={openPhotoPicker}
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
            // Same pattern as onPickPhoto — canon dispatches a click,
            // hidden input below actually opens the OS file picker.
            onPickTextFile={openTextFilePicker}
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
