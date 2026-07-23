"use client";

/**
 * FeedbackModal — consumer adapter around canon `FeedbackV2Modal`
 * (canon 0.13.0 «Фидбек v2», `docs/handoff/CANON_FEEDBACK_V2_TZ.md`).
 * NO JSX transcription: canon renders, we own state + side-effects.
 *
 * Два режима одной модалки:
 *   blocker  — «Что останавливает прямо сейчас?»: авто-триггер exit-intent
 *              ИЛИ скролл ≥60% без клика ни одного CTA (`data-entry`) и без
 *              открытия интейка; не чаще 1 раза на посетителя (localStorage);
 *              не срабатывает на /admin*, /login, /privacy, /offer (ТЗ §5).
 *   question — FAB «Задать вопрос» (всегда, кроме founder-зон) + легаси-входы
 *              `samosite:open-feedback` / `[data-ss-feedback]` (футер).
 *
 * Сабмит: SmartCaptcha → POST /api/feedback/v2 (202 → экран «Спасибо»).
 * consent_given=true уходит только при наличии контакта — в каноне строки
 * согласия нет (canon-gap, залогирован в CHANGELOG 0.13.0), юр-приписку
 * решает founder.
 *
 * Метрика (runbook yandex-metrika-goals.md): feedback_open {trigger},
 * feedback_reason {reason}, feedback_contact_left {channel},
 * feedback_question_sent. Vote-first цель feedback_submit затихла.
 */

import { Fb2_Styles, FeedbackV2Fab, FeedbackV2Modal } from "@samosite/canon/feedback";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { INTAKE2_EVENT } from "@/components/intake2/host";
import { requestCaptchaToken } from "@/lib/captcha";
import { ssTrack } from "@/lib/metrika";

// canon ships `dts: false` — ambient shim types the entry as `any`;
// mirror the 0.13.0 controlled contract locally (CHANGELOG §2).
type FbV2Mode = "blocker" | "question";
type FbV2Channel = "telegram" | "whatsapp" | "email";
type FbV2Payload = {
  mode: FbV2Mode;
  reason?: string;
  note?: string;
  question?: string;
  channel?: FbV2Channel;
  contact?: string;
};
type ModalProps = {
  open?: boolean;
  mode?: FbV2Mode;
  onOpenChange?: (open: boolean) => void;
  reason?: string | null;
  onReasonChange?: (code: string) => void;
  note?: string;
  onNoteChange?: (v: string) => void;
  question?: string;
  onQuestionChange?: (v: string) => void;
  channel?: FbV2Channel;
  onChannelChange?: (c: FbV2Channel) => void;
  contact?: string;
  onContactChange?: (v: string) => void;
  onSubmit?: (payload: FbV2Payload) => void;
  submitting?: boolean;
  error?: boolean;
  submitted?: boolean;
  mobile?: boolean;
  embedded?: boolean;
};
const Modal = FeedbackV2Modal as unknown as ComponentType<ModalProps>;
const Fab = FeedbackV2Fab as unknown as ComponentType<{ onClick?: () => void; embedded?: boolean }>;
const Styles = Fb2_Styles as unknown as ComponentType<Record<string, never>>;

/** Легаси-событие (футер «Поддержка» и пр.) — открывает режим «Вопрос». */
export const SAMOSITE_OPEN_FEEDBACK = "samosite:open-feedback";

/** 1-раз-на-посетителя для авто-триггера блокера (ТЗ §5). */
const BLOCKER_SHOWN_KEY = "ss_fb2_blocker_shown";

/** Роуты, где авто-триггер блокера запрещён (ТЗ §5). */
const BLOCKER_EXCLUDED = ["/login", "/privacy", "/offer"];

type Trigger = "exit" | "scroll" | "button";

export function FeedbackModal(): ReactElement | null {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FbV2Mode>("question");
  const [reason, setReason] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [question, setQuestion] = useState("");
  const [channel, setChannel] = useState<FbV2Channel>("telegram");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const triggerRef = useRef<Trigger>("button");
  const ctaClickedRef = useRef(false);
  const intakeOpenedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const openAs = useCallback((nextMode: FbV2Mode, trigger: Trigger) => {
    triggerRef.current = trigger;
    setMode(nextMode);
    setError(false);
    setOpen(true);
    ssTrack("feedback_open", { trigger });
  }, []);

  // ── Режим B: легаси-входы (футер «Поддержка», событие) ──────────────────
  useEffect(() => {
    const onEvent = () => openAs("question", "button");
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-ss-feedback]");
      if (!el) return;
      e.preventDefault();
      openAs("question", "button");
    };
    window.addEventListener(SAMOSITE_OPEN_FEEDBACK, onEvent);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(SAMOSITE_OPEN_FEEDBACK, onEvent);
      document.removeEventListener("click", onClick);
    };
  }, [openAs]);

  // ── Режим A: авто-триггер блокера (exit-intent / скролл ≥60%) ────────────
  useEffect(() => {
    if (BLOCKER_EXCLUDED.includes(pathname) || pathname.startsWith("/admin")) return;
    let shown = false;
    try {
      shown = window.localStorage.getItem(BLOCKER_SHOWN_KEY) === "1";
    } catch {
      shown = true; // приватный режим без localStorage — не рискуем спамить
    }
    if (shown) return;

    const onCta = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest("[data-entry]")) ctaClickedRef.current = true;
    };
    const onIntake = () => {
      intakeOpenedRef.current = true;
    };

    let fired = false;
    const fire = (trigger: Trigger) => {
      if (fired || ctaClickedRef.current || intakeOpenedRef.current) return;
      fired = true;
      try {
        window.localStorage.setItem(BLOCKER_SHOWN_KEY, "1");
      } catch {
        /* показ всё равно один на сессию — fired=true */
      }
      openAs("blocker", trigger);
    };

    // exit-intent — только desktop (на тач-устройствах mouseout не сигнал)
    const onMouseOut = (e: MouseEvent) => {
      if (
        e.relatedTarget === null &&
        e.clientY <= 0 &&
        !window.matchMedia("(pointer: coarse)").matches
      ) {
        fire("exit");
      }
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.6) fire("scroll");
    };

    document.addEventListener("click", onCta, true);
    window.addEventListener(INTAKE2_EVENT, onIntake);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onCta, true);
      window.removeEventListener(INTAKE2_EVENT, onIntake);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, openAs]);

  const onOpenChange = useCallback((v: boolean) => {
    setOpen(v);
    if (!v) {
      // Свежий лист при следующем открытии
      setReason(null);
      setNote("");
      setQuestion("");
      setContact("");
      setError(false);
      setSubmitted(false);
    }
  }, []);

  const onReasonChange = useCallback((code: string) => {
    setReason(code);
    ssTrack("feedback_reason", { reason: code });
  }, []);

  const onSubmit = useCallback(async (payload: FbV2Payload) => {
    setSubmitting(true);
    setError(false);
    try {
      const captchaToken = await requestCaptchaToken();
      const res = await fetch("/api/feedback/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: payload.mode,
          trigger: triggerRef.current,
          ...(payload.reason ? { reason: payload.reason } : {}),
          ...(payload.note ? { note: payload.note } : {}),
          ...(payload.question ? { question: payload.question } : {}),
          ...(payload.contact
            ? {
                contact_channel: payload.channel,
                contact: payload.contact,
                // Канон 0.13.0 не несёт строки согласия (canon-gap в CHANGELOG);
                // контакт вводится добровольно ради ответа — фиксируем согласие
                // фактом отправки, юр-приписка — открытый вопрос founder'у.
                consent_given: true,
              }
            : {}),
          captcha_token: captchaToken,
        }),
      });
      if (!res.ok) throw new Error(`feedback_v2_${res.status}`);
      setSubmitted(true);
      if (payload.mode === "question") {
        ssTrack("feedback_question_sent");
      } else if (payload.contact) {
        ssTrack("feedback_contact_left", { channel: payload.channel });
      }
    } catch {
      setError(true); // канон рендерит инлайн-ошибку, модалка остаётся открытой
    } finally {
      setSubmitting(false);
    }
  }, []);

  // Founder-зоны без FAB (конвенция с vote-first версии).
  if (pathname === "/login" || pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  return (
    <>
      <Styles />
      <Fab embedded={false} onClick={() => openAs("question", "button")} />
      <Modal
        open={open}
        mode={mode}
        onOpenChange={onOpenChange}
        reason={reason}
        onReasonChange={onReasonChange}
        note={note}
        onNoteChange={setNote}
        question={question}
        onQuestionChange={setQuestion}
        channel={channel}
        onChannelChange={setChannel}
        contact={contact}
        onContactChange={setContact}
        onSubmit={onSubmit}
        submitting={submitting}
        error={error}
        submitted={submitted}
        mobile={mobile}
        embedded={false}
      />
    </>
  );
}
