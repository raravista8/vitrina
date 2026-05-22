"use client";

/**
 * Photo drawer — Design canvas screen #6.
 *
 * Mobile: full-width bottom-sheet rooted at the bottom edge.
 * Desktop: centered modal.
 *
 * Implemented with a single Radix Dialog whose Content uses two
 * positioning class blocks (one for `sm:` desktop centering, one for
 * mobile bottom-anchored sheet). Avoids pulling in `vaul` + a second
 * shadcn Drawer component just for the bottom-sheet variant.
 *
 * Behaviour:
 *
 *   - Drop-area accepts JPEG/PNG/WebP/HEIC, 5–30 files, ≤10MB each,
 *     ≤100MB total (FR-014/015). Files exceeding limits are silently
 *     skipped on the client; the server enforces the same limits and
 *     returns 413/400 if a hand-crafted POST tries to bypass.
 *   - Each row gets a per-file `photo_type` dropdown — `work` by
 *     default; user can switch to `profile_screenshot`, `business_card`,
 *     `booklet`. The vision-LLM in T4 reclassifies whatever the user
 *     left as `unknown`.
 *   - Submit POSTs multipart to /api/submit-application/photo with
 *     captcha token (DEV_TOKEN in dev) + business name + category +
 *     city + contact + consent flag.
 *
 * Anti-pattern guard (CLAUDE.md): never block the user on an upstream
 * failure. Network error → display retry CTA; do NOT silently swallow.
 */

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Camera, Check, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";

import { requestCaptchaToken } from "@/lib/captcha";
import { cn } from "@/lib/cn";

const ICP = [
  "Маникюр",
  "Барбер",
  "Тату-мастер",
  "Фитнес-тренер",
  "Психолог",
  "Фотограф",
  "Кондитер",
  "Кулинар",
  "Репетитор",
  "Мастер ресниц",
  "Бровист",
  "Прочее",
];

type PhotoType = "work" | "profile_screenshot" | "business_card" | "booklet";

interface Uploaded {
  id: string;
  file: File;
  type: PhotoType;
}

const ACCEPT = "image/jpeg,image/png,image/webp,image/heic";
const MAX_FILES = 30;
const MIN_FILES = 5;
const MAX_PER_FILE = 10 * 1024 * 1024;
const MAX_TOTAL = 100 * 1024 * 1024;

interface PhotoDrawerProps {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}

type Stage =
  | { kind: "form" }
  | { kind: "submitting" }
  | { kind: "done" }
  | { kind: "error"; code: string };

export function PhotoDrawer({ open, onOpenChange }: PhotoDrawerProps) {
  const [files, setFiles] = useState<Uploaded[]>([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("Маникюр");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [stage, setStage] = useState<Stage>({ kind: "form" });
  const inputRef = useRef<HTMLInputElement>(null);
  const nameId = useId();
  const cityId = useId();
  const categoryId = useId();
  const contactId = useId();

  function reset() {
    setFiles([]);
    setName("");
    setCity("");
    setCategory("Маникюр");
    setContact("");
    setConsent(false);
    setStage({ kind: "form" });
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) reset();
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    let total = next.reduce((s, x) => s + x.file.size, 0);
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) break;
      if (file.size > MAX_PER_FILE) continue;
      if (total + file.size > MAX_TOTAL) break;
      next.push({ id: crypto.randomUUID(), file, type: "work" });
      total += file.size;
    }
    setFiles(next);
  }

  function setType(id: string, type: PhotoType) {
    setFiles(files.map((x) => (x.id === id ? { ...x, type } : x)));
  }

  function remove(id: string) {
    setFiles(files.filter((x) => x.id !== id));
  }

  const total = files.reduce((s, x) => s + x.file.size, 0);
  const canSubmit =
    files.length >= MIN_FILES &&
    name.trim().length > 0 &&
    city.trim().length > 0 &&
    contact.trim().length > 0 &&
    consent &&
    stage.kind !== "submitting";

  async function submit() {
    if (!canSubmit) return;
    setStage({ kind: "submitting" });
    try {
      const captchaToken = await requestCaptchaToken();
      const fd = new FormData();
      files.forEach((u) => {
        fd.append("files", u.file);
        fd.append("photo_types", u.type);
      });
      fd.append("business_name", name);
      fd.append("category", category);
      fd.append("city", city);
      fd.append("contact", contact);
      fd.append("consent_given", "true");
      fd.append("captcha_token", captchaToken);
      const response = await fetch("/api/submit-application/photo", {
        method: "POST",
        body: fd,
      });
      if (response.status === 202) {
        setStage({ kind: "done" });
        return;
      }
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      setStage({ kind: "error", code: body.error ?? "unknown_error" });
    } catch {
      setStage({ kind: "error", code: "network_error" });
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-ink/60 fixed inset-0 z-40 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed z-50 bg-paper shadow-pop focus:outline-none",
            // Mobile bottom-sheet
            "inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-2xl p-5",
            // Desktop centered modal — overrides mobile positioning at ≥sm
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[92vw] sm:max-w-[640px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8",
          )}
        >
          <Dialog.Title className="sr-only">Загрузка фото</Dialog.Title>

          {stage.kind === "done" ? (
            <DoneScreen />
          ) : (
            <FormScreen
              files={files}
              total={total}
              stage={stage}
              name={name}
              setName={setName}
              city={city}
              setCity={setCity}
              category={category}
              setCategory={setCategory}
              contact={contact}
              setContact={setContact}
              consent={consent}
              setConsent={setConsent}
              canSubmit={canSubmit}
              onSubmit={submit}
              inputRef={inputRef}
              addFiles={addFiles}
              setType={setType}
              remove={remove}
              ids={{ nameId, cityId, categoryId, contactId }}
            />
          )}

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

// ---------------------------------------------------------------------------
// Sub-views
// ---------------------------------------------------------------------------

interface FormScreenProps {
  files: Uploaded[];
  total: number;
  stage: Stage;
  name: string;
  setName: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  contact: string;
  setContact: (v: string) => void;
  consent: boolean;
  setConsent: (v: boolean) => void;
  canSubmit: boolean;
  onSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  addFiles: (list: FileList | null) => void;
  setType: (id: string, type: PhotoType) => void;
  remove: (id: string) => void;
  ids: { nameId: string; cityId: string; categoryId: string; contactId: string };
}

function FormScreen({
  files,
  total,
  stage,
  name,
  setName,
  city,
  setCity,
  category,
  setCategory,
  contact,
  setContact,
  consent,
  setConsent,
  canSubmit,
  onSubmit,
  inputRef,
  addFiles,
  setType,
  remove,
  ids,
}: FormScreenProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-ink">Загрузите фото</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Работы, скриншот шапки профиля, визитка или буклет. От 5 до 30 файлов, до 10 МБ каждый.
      </p>

      {/* Drop zone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-accent-soft/40 hover:bg-accent-soft/60 mt-4 w-full rounded-2xl border-2 border-dashed border-accent p-7 text-center"
      >
        <Camera className="mx-auto h-6 w-6 text-accent" />
        <div className="mt-1 font-semibold text-ink">Перетащите файлы сюда</div>
        <div className="text-sm text-ink-soft">
          или нажмите чтобы выбрать · JPEG / PNG / WebP / HEIC
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        hidden
        onChange={(event) => addFiles(event.target.files)}
      />

      {/* Files list */}
      {files.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex justify-between font-mono text-[11px] tracking-wider text-ink-faint">
            <span>
              ЗАГРУЖЕНО · {files.length} ИЗ {MAX_FILES}
            </span>
            <span>{(total / 1024 / 1024).toFixed(1)} МБ · ≤ 100 МБ</span>
          </div>
          <div className="flex flex-col gap-2">
            {files.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-3 rounded-lg border border-line bg-white p-2.5"
              >
                <div className="h-12 w-12 flex-none rounded-md bg-accent-soft" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-ink">{u.file.name}</div>
                  <div className="font-mono text-[11px] text-ink-faint">
                    {u.file.type || "image"} · {(u.file.size / 1024 / 1024).toFixed(1)} МБ
                  </div>
                </div>
                <select
                  aria-label="Тип фото"
                  value={u.type}
                  onChange={(event) => setType(u.id, event.target.value as PhotoType)}
                  className="focus:ring-accent/40 h-8 rounded-md border border-line bg-white px-2 text-xs text-ink focus:outline-none focus:ring-2"
                >
                  <option value="work">работа</option>
                  <option value="profile_screenshot">шапка профиля</option>
                  <option value="business_card">визитка</option>
                  <option value="booklet">буклет</option>
                </select>
                <button
                  type="button"
                  onClick={() => remove(u.id)}
                  aria-label="Удалить"
                  className="rounded-md p-1 text-ink-faint hover:bg-paper-soft hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field label="Название дела" htmlFor={ids.nameId}>
          <input
            id={ids.nameId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Студия Анны"
            className="focus:ring-accent/40 h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2"
          />
        </Field>
        <Field label="Город" htmlFor={ids.cityId}>
          <input
            id={ids.cityId}
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Петрозаводск"
            className="focus:ring-accent/40 h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2"
          />
        </Field>
        <Field label="Категория" htmlFor={ids.categoryId}>
          <select
            id={ids.categoryId}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="focus:ring-accent/40 h-10 w-full rounded-md border border-line bg-white px-2 text-sm text-ink focus:outline-none focus:ring-2"
          >
            {ICP.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Контакт (email, телефон, @telegram)" htmlFor={ids.contactId}>
          <input
            id={ids.contactId}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="anya@example.com"
            className="focus:ring-accent/40 h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2"
          />
        </Field>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="focus:ring-accent/40 mt-0.5 h-4 w-4 rounded border-line text-accent"
        />
        <span>
          Согласен на обработку персональных данных согласно{" "}
          <Link href="/privacy" className="text-accent underline">
            политике конфиденциальности
          </Link>
        </span>
      </label>

      {stage.kind === "error" ? (
        <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          Не получилось отправить ({stage.code}). Попробуйте ещё раз.
        </p>
      ) : null}

      <button
        type="button"
        disabled={!canSubmit}
        onClick={onSubmit}
        className={cn(
          "mt-4 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-lg bg-accent text-base font-semibold text-white",
          "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {stage.kind === "submitting" ? "Отправляем…" : "Создать сайт из фото"}
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
        <ShieldCheck className="h-3 w-3" /> Защищено Yandex SmartCaptcha · невидимо
      </p>
    </div>
  );
}

function DoneScreen() {
  return (
    <div className="py-2 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
        <Check className="h-7 w-7 text-success" strokeWidth={3} />
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">Фото получили</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Готовим ваш сайт. Свяжемся с вами и пришлём ссылку в течение 2 часов
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper-soft"
      >
        Вернуться на главную <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-2 space-y-1 sm:col-span-1">
      <label className="block text-xs text-ink-soft" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
