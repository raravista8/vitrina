"use client";

/**
 * Интейк v2 — консьюмер canon 0.12.0 `In2_*` («Фарфор и лак»).
 *
 * Стейт-машина (MANUAL MODE — заявки исполняет founder руками):
 *
 *   example ──claim──▶ source ──next──▶ booking ──next──▶ contacts ──submit──▶ done
 *      ▲                 │ ▲               │ ▲                │                  │
 *      └────── back ─────┘ └──── back ─────┘ └──── back ──────┘   «Изменить» ────┘
 *
 * Шаги `recognize`/`confirmCard` из ТЗ пропущены сознательно (см. state.ts):
 * пути name/screenshot идут source→booking напрямую.
 *
 * Canon-гэпы, обойдённые здесь (задокументированы в отчёте вендоринга):
 *   1. Футеры In2_StepBooking / In2_StepContacts несут no-op onClick —
 *      рендерим собственный FooterCta (те же классы .btn/.arw из In2_CSS,
 *      та же строка «Осталось: …»), гейтимся возвращёнными `bok`/`ok`.
 *   2. Внутренний Uploader канона НЕ отдаёт File-объекты (только имя/счётчик) —
 *      зеркалим файлы capture-слушателями (change/drop/click) с той же
 *      валидацией (image/*, ≤ 8 МБ, ≤ 5 фото) — паттерн DOM-mutation как в
 *      SiteHeader.tsx.
 *   3. CityInput канона запекает свой список из 20 городов и не принимает
 *      `citySuggestions` (ТЗ §3.2 A) — наш список ждёт в cities.ts; свободный
 *      ввод города валиден и сейчас.
 *   4. canon `contactValid`/`linkInfo` не экспортируются — contactValid
 *      зеркалирован в state.ts ради строки «Осталось: …».
 */

import React, { useEffect, useRef, useState } from "react";

import {
  In2_Modal,
  In2_StepBooking,
  In2_StepContacts,
  In2_StepDone,
  In2_StepExample,
  In2_StepExampleFooter,
  In2_StepSource,
  In2_Styles,
  NICHE_LIB_V2,
} from "@samosite/canon/intake";

import { requestCaptchaToken } from "@/lib/captcha";
import { useIsMobile } from "@/lib/use-is-mobile";

import { submitIntake2 } from "@/components/intake2/api";
import type { Intake2OpenDetail } from "@/components/intake2/host";
import {
  CHANNEL_TO_API,
  clearDraft,
  contactValid,
  initialForm,
  isFormDirty,
  loadDraft,
  routeSubmitError,
  saveDraft,
  type BookingPlatform,
  type ChannelLabel,
  type Intake2FormState,
  type Intake2Step,
  type SourcePath,
} from "@/components/intake2/state";
import { track } from "@/components/intake2/track";

// Заголовки шагов — canon STEP_TITLE не экспортирован; строки побайтово из in2.tsx.
const TITLES: Record<Intake2Step, string> = {
  example: "Вот такой сайт соберём",
  source: "Найдём ваше дело",
  booking: "Записью пользуетесь?",
  contacts: "Куда прислать готовый черновик?",
  done: "Готово",
};

// Тонкая линия прогресса под шапкой (ТЗ §9: линия, не доты).
const PROGRESS: Record<Intake2Step, number> = {
  example: 0.1,
  source: 0.35,
  booking: 0.6,
  contacts: 0.85,
  done: 1,
};

const SOURCE_PATHS: readonly SourcePath[] = ["name", "screenshot", "link", "photo"];
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const MAX_PHOTOS = 5;

interface CanonStepSlots {
  body: React.ReactNode;
  footer: React.ReactNode;
  bok?: boolean;
  ok?: boolean;
}

interface ServerErrors {
  source?: string;
  booking?: string;
  contacts?: string;
  /** true → generic-плашка канона в In2_StepContacts («Не получилось отправить…»). */
  generic?: boolean;
}

function resolveNiche(raw?: string): string | null {
  if (!raw) return null;
  const lib = NICHE_LIB_V2 as { id: string; label: string }[];
  const norm = raw.trim().toLowerCase();
  const hit = lib.find((n) => n.id.toLowerCase() === norm || n.label.toLowerCase() === norm);
  return hit ? hit.id : null;
}

function resolvePath(raw?: string): SourcePath | null {
  return raw && (SOURCE_PATHS as readonly string[]).includes(raw) ? (raw as SourcePath) : null;
}

/** Инлайн-ошибка сервера — та же палитра, что у submitError-плашки канона. */
function ErrorNote({ text }: { text: string }) {
  return (
    <div
      role="alert"
      style={{
        border: "1px solid #D98A8A",
        background: "#FAEFEE",
        padding: "11px 13px",
        fontSize: 13.5,
        lineHeight: 1.45,
        color: "#B23B3B",
        marginBottom: 10,
      }}
    >
      {text}
    </div>
  );
}

/**
 * Собственный футер-CTA для booking/contacts: зеркало canon `Cta`
 * (canon-гэп №1 — футеры этих шагов несут no-op onClick).
 */
function FooterCta({
  ok,
  busy,
  onClick,
  missing,
  dataCta,
  children,
}: {
  ok: boolean;
  busy?: boolean;
  onClick: () => void;
  missing: string;
  dataCta: string;
  children: React.ReactNode;
}) {
  const enabled = ok && !busy;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <button
        className="btn btn--block"
        type="button"
        data-cta={dataCta}
        onClick={onClick}
        disabled={!enabled}
        style={{ opacity: enabled ? 1 : 0.5, cursor: enabled ? "pointer" : "not-allowed" }}
      >
        {children} <span className="arw">→</span>
      </button>
      {!ok && missing ? (
        <span style={{ textAlign: "center", fontSize: 13, color: "var(--ink-45)" }}>
          Осталось: {missing}
        </span>
      ) : null}
    </div>
  );
}

export function Intake2Flow({
  detail,
  onClose,
}: {
  detail: Intake2OpenDetail;
  onClose: () => void;
}) {
  const mobile = useIsMobile();

  // ── init: черновик из localStorage + entry (ниша/путь из openIntake2) ──
  const [draft] = useState(() => (typeof window === "undefined" ? null : loadDraft()));
  const [form, setForm] = useState<Intake2FormState>(() => {
    const entryNiche = resolveNiche(detail.niche);
    const entryPath = resolvePath(detail.path);
    const base = draft ? draft.form : initialForm();
    return {
      ...base,
      ...(entryNiche ? { niche: entryNiche } : {}),
      ...(entryPath ? { path: entryPath } : {}),
    };
  });
  const [step, setStep] = useState<Intake2Step>(() => draft?.step ?? "example");
  const [restored, setRestored] = useState(Boolean(draft));

  // Файлы — вне сериализуемой формы (в черновик не едут; после restore
  // пользователь добавляет их заново — CTA шага источника это гейтит).
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});
  const [closeConfirm, setCloseConfirm] = useState(false);
  const attemptedRef = useRef(false);

  const pathRef = useRef(form.path);
  useEffect(() => {
    pathRef.current = form.path;
  }, [form.path]);

  const dirty =
    isFormDirty(form) || step !== "example" || screenshotFile !== null || photoFiles.length > 0;

  // ── черновик: пишем на каждое изменение, кроме шага «Готово» ──
  useEffect(() => {
    if (step === "done" || !dirty) return;
    saveDraft(step, form);
  }, [form, step, dirty]);

  // ── аналитика ──
  useEffect(() => {
    track("demo_shown", { niche: form.niche, entry: detail.entry });
    // один раз на открытие модалки
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (step === "source") track("source_path", { path: pathRef.current });
    if (step === "contacts") track("contacts_shown");
  }, [step]);

  // ── body scroll lock, пока модалка открыта ──
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ── навигация ──
  const patch = (p: Partial<Intake2FormState>) => setForm((f) => ({ ...f, ...p }));
  const go = (s: Intake2Step) => {
    setRestored(false);
    setStep(s);
  };
  const finishClose = () => onClose();
  const requestClose = () => {
    if (step === "done" || !dirty) {
      finishClose();
      return;
    }
    setCloseConfirm(true);
  };
  const handleBack = () => {
    if (step === "source") go("example");
    else if (step === "booking") go("source");
    else if (step === "contacts") go("booking");
  };
  const handleDraftReset = () => {
    clearDraft();
    setForm(initialForm(resolveNiche(detail.niche) ?? undefined));
    setScreenshotFile(null);
    setPhotoFiles([]);
    setServerErrors({});
    setRestored(false);
    setStep("example");
  };

  // ── Esc: confirm-close при «грязной» форме (latest-ref, чтобы слушатель был один) ──
  const escRef = useRef<() => void>(() => {});
  useEffect(() => {
    escRef.current = () => {
      if (closeConfirm) {
        setCloseConfirm(false);
        return;
      }
      requestClose();
    };
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") escRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── зеркало файлов canon-Uploader'а (canon-гэп №2) ──
  const sourceBodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sourceBodyRef.current;
    if (!el || step !== "source") return;

    // Та же валидация, что в canon Uploader.push: пустой f.type проходит.
    const acceptFile = (f: File) =>
      (!f.type || f.type.startsWith("image/")) && f.size <= MAX_PHOTO_BYTES;
    const mirrorAdd = (list: File[]) => {
      if (pathRef.current === "screenshot") {
        // single-режим канона: каждый валидный файл замещает, невалидные чистят
        let next: File | null = null;
        for (const f of list) if (acceptFile(f)) next = f;
        setScreenshotFile(next);
      } else if (pathRef.current === "photo") {
        setPhotoFiles((prev) => {
          const arr = [...prev];
          for (const f of list) if (acceptFile(f) && arr.length < MAX_PHOTOS) arr.push(f);
          return arr;
        });
      }
    };

    // capture-фаза: срабатываем ДО обработчиков канона (он чистит input.value)
    const onChange = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLInputElement && t.type === "file" && t.files && t.files.length > 0) {
        mirrorAdd(Array.from(t.files));
      }
    };
    const onDrop = (e: Event) => {
      const de = e as DragEvent;
      if (de.dataTransfer && de.dataTransfer.files.length > 0) {
        mirrorAdd(Array.from(de.dataTransfer.files));
      }
    };
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.('button[aria-label^="Убрать"]');
      if (!btn) return;
      if (pathRef.current === "screenshot") {
        setScreenshotFile(null);
        return;
      }
      if (pathRef.current !== "photo") return;
      const all = Array.from(el.querySelectorAll('button[aria-label^="Убрать"]'));
      const idx = all.indexOf(btn);
      if (idx >= 0) setPhotoFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    el.addEventListener("change", onChange, true);
    el.addEventListener("drop", onDrop, true);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("change", onChange, true);
      el.removeEventListener("drop", onDrop, true);
      el.removeEventListener("click", onClick, true);
    };
  }, [step]);

  // ── отправка ──
  const handleSubmit = async () => {
    if (submitting) return;
    const retry = attemptedRef.current;
    attemptedRef.current = true;
    track("submit", { channel: CHANNEL_TO_API[form.channel], retry });
    setSubmitting(true);
    setServerErrors({});

    let token: string;
    try {
      token = await requestCaptchaToken();
    } catch {
      setServerErrors({ generic: true });
      setSubmitting(false);
      return;
    }

    const result = await submitIntake2(
      form,
      { screenshot: screenshotFile, photos: photoFiles },
      token,
    );
    setSubmitting(false);

    if (result.ok) {
      clearDraft();
      go("done");
      return;
    }
    const route = routeSubmitError(result.code, result.status);
    if (route.message === null) {
      setServerErrors({ generic: true });
      return;
    }
    setServerErrors({ [route.step]: route.message } as ServerErrors);
    if (route.step !== "contacts") go(route.step);
  };

  // ── композиция шага ──
  let body: React.ReactNode = null;
  let footer: React.ReactNode = null;

  if (step === "example") {
    body = (
      <In2_StepExample
        niche={form.niche}
        onNicheChange={(n: string) => {
          track("niche_selected", { niche: n });
          patch({ niche: n });
        }}
        loading={false}
        mobile={mobile}
      />
    );
    footer = <In2_StepExampleFooter onClaim={() => go("source")} />;
  } else if (step === "source") {
    const slots = In2_StepSource({
      path: form.path,
      onPathChange: (p: SourcePath) => {
        track("source_path", { path: p });
        patch({ path: p });
      },
      name: form.businessName,
      onName: (v: string) => patch({ businessName: v }),
      city: form.city,
      onCity: (v: string) => patch({ city: v }),
      link: form.link,
      onLink: (v: string) => patch({ link: v }),
      screenshotName: screenshotFile?.name ?? "",
      onScreenshot: (name: string) => {
        if (!name) setScreenshotFile(null);
      },
      photos: photoFiles.length,
      onPhotos: (count: number) => {
        if (count === 0) setPhotoFiles([]);
      },
      niche: form.niche,
      onSubmit: () => {
        setServerErrors((e) => ({ ...e, source: undefined }));
        go("booking");
      },
      mobile,
    }) as CanonStepSlots;
    body = <div ref={sourceBodyRef}>{slots.body}</div>;
    footer = (
      <>
        {serverErrors.source ? <ErrorNote text={serverErrors.source} /> : null}
        {slots.footer}
      </>
    );
  } else if (step === "booking") {
    const slots = In2_StepBooking({
      platform: form.bookingPlatform,
      onPlatformChange: (p: BookingPlatform) => {
        track("booking_platform_selected", { platform: p });
        patch({ bookingPlatform: p });
        setServerErrors((e) => ({ ...e, booking: undefined }));
      },
      url: form.bookingUrl,
      onUrl: (v: string) => patch({ bookingUrl: v }),
      phone: form.bookingPhone,
      onPhone: (v: string) => patch({ bookingPhone: v }),
      mobile,
    }) as CanonStepSlots;
    const missing =
      form.bookingPlatform === "phone"
        ? "номер целиком — или очистите поле"
        : "рабочая ссылка — или очистите поле";
    body = slots.body;
    footer = (
      <>
        {serverErrors.booking ? <ErrorNote text={serverErrors.booking} /> : null}
        <FooterCta
          ok={Boolean(slots.bok)}
          onClick={() => {
            setServerErrors((e) => ({ ...e, booking: undefined }));
            go("contacts");
          }}
          missing={missing}
          dataCta="booking-next"
        >
          Дальше
        </FooterCta>
      </>
    );
  } else if (step === "contacts") {
    const slots = In2_StepContacts({
      channel: form.channel,
      onChannel: (c: ChannelLabel) => patch({ channel: c }),
      contact: form.contacts[form.channel],
      onContact: (v: string) =>
        setForm((f) => ({ ...f, contacts: { ...f.contacts, [f.channel]: v } })),
      consent: form.consent,
      onConsent: (v: boolean) => patch({ consent: v }),
      submitError: Boolean(serverErrors.generic),
      hrefs: { politika: "/privacy", oferta: "/offer" },
      touched: Boolean(serverErrors.contacts),
      mobile,
    }) as CanonStepSlots;
    const contactOk = contactValid(form.channel, form.contacts[form.channel]);
    const ok = contactOk && form.consent;
    const missing = [contactOk ? null : "контакт", form.consent ? null : "согласие"]
      .filter(Boolean)
      .join(" и ");
    const retryMode = Boolean(serverErrors.generic || serverErrors.contacts);
    body = slots.body;
    footer = (
      <>
        {serverErrors.contacts ? <ErrorNote text={serverErrors.contacts} /> : null}
        <FooterCta
          ok={ok}
          busy={submitting}
          onClick={() => void handleSubmit()}
          missing={missing}
          dataCta="submit"
        >
          {retryMode ? "Повторить отправку" : "Отправить заявку"}
        </FooterCta>
      </>
    );
  } else {
    const slots = In2_StepDone({
      channel: form.channel,
      contact: form.contacts[form.channel],
      onEditContact: () => go("contacts"),
      onClose: finishClose,
      mobile,
    }) as CanonStepSlots;
    body = slots.body;
    footer = slots.footer;
  }

  return (
    <>
      <In2_Styles />
      <In2_Modal
        step={step}
        title={TITLES[step]}
        canBack={step === "source" || step === "booking" || step === "contacts"}
        onBack={handleBack}
        onClose={requestClose}
        progress={PROGRESS[step]}
        restored={restored}
        onDraftReset={handleDraftReset}
        closeConfirm={closeConfirm}
        onConfirmClose={finishClose}
        onCancelClose={() => setCloseConfirm(false)}
        body={body}
        footer={footer}
        mobile={mobile}
      />
    </>
  );
}
