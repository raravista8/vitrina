"use client";

/**
 * FeedbackModal — thin consumer adapter around canon `S9_FeedbackModal`
 * (canon 0.9.1 controlled API). NO JSX transcription: we import the canon
 * component and wire behaviour through its props.
 *
 *   tally    ← GET /api/feedback/tally        (X/10 counters + «за неделю»)
 *   onSubmit → POST /api/feedback (votes[])    (+ SmartCaptcha around it)
 *   embedded = false                            (real global modal, position:fixed)
 *
 * Mounted ONCE in `app/layout.tsx`; self-hides on `/admin*` and `/login`
 * (founder area + auth — the paid-service-polish convention keeps the FAB
 * off those). The canon component renders its own floating «Чего не
 * хватает?» button (position:fixed, zero layout footprint). Extra entry
 * points open it via either:
 *   - the `samosite:open-feedback` CustomEvent (`detail.source`), or
 *   - any `<a data-ss-feedback="<source>">` (document-delegated click) —
 *     used by Footer + the Sources «Не нашли свою?» link.
 *
 * Backend contract (live, PR #170): `docs/handoff/FEEDBACK_BACKEND.md`.
 * Canon контракт: `docs/handoff/CANON_FEEDBACK_INTERACTIVE_TZ.md`.
 *
 * Replaces the hand-rolled `/feedback` page + `FeedbackForm` (retired in
 * this PR — `/feedback` now 301-redirects to `/`).
 */

import { S9_FeedbackModal as CanonFeedbackModal } from "@samosite/canon/customer";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { requestCaptchaToken } from "@/lib/captcha";
import { reachGoal } from "@/lib/metrika";

// canon ships `dts: false`; the ambient shim types `@samosite/canon/customer`
// as `any`. Mirror the 0.9.1 controlled contract locally so the adapter is
// fully typed (FbTally / FbSubmitPayload / S9_FeedbackModalProps).
type FbVote = { kind: "source" | "feature"; key: string };
type FbTally = { items: Record<string, number>; total_week: number };
type FbSubmitPayload = {
  votes: FbVote[];
  own_source: string | null;
  own_feature: string | null;
  message: string | null;
  name: string | null;
  contact: string | null;
};
type S9Props = {
  mobile?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  tally?: FbTally;
  onSubmit?: (payload: FbSubmitPayload) => void | Promise<void>;
  submitting?: boolean;
  error?: string | null;
  embedded?: boolean;
};
const Modal = CanonFeedbackModal as unknown as ComponentType<S9Props>;

/** Window event other components dispatch to open the modal (with a source). */
export const SAMOSITE_OPEN_FEEDBACK = "samosite:open-feedback";

export function FeedbackModal() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tally, setTally] = useState<FbTally | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sourceRef = useRef<string>("fab");

  // `mobile` via matchMedia post-mount — SSR-safe: first client render matches
  // the server (false), the effect corrects before any interaction.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Open via CustomEvent + any `[data-ss-feedback]` anchor (document-delegated,
  // so Footer / Sources links work without their own handlers).
  useEffect(() => {
    const openFrom = (source: string) => {
      sourceRef.current = source;
      setOpen(true);
    };
    const onEvent = (e: Event) =>
      openFrom((e as CustomEvent<{ source?: string }>).detail?.source ?? "event");
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-ss-feedback]");
      if (!el) return;
      e.preventDefault();
      openFrom(el.getAttribute("data-ss-feedback") || "link");
    };
    window.addEventListener(SAMOSITE_OPEN_FEEDBACK, onEvent);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(SAMOSITE_OPEN_FEEDBACK, onEvent);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // On open: pull the live tally + fire the funnel goal once (source-attributed).
  useEffect(() => {
    if (!open) return;
    reachGoal("feedback_open", { source: sourceRef.current });
    const controller = new AbortController();
    fetch("/api/feedback/tally", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok && j.data) setTally(j.data as FbTally);
      })
      .catch(() => {
        /* canon falls back to baked base counts when `tally` is absent */
      });
    return () => controller.abort();
  }, [open]);

  const onOpenChange = useCallback((v: boolean) => {
    if (!v) {
      setError(null);
      sourceRef.current = "fab";
    }
    setOpen(v);
  }, []);

  const onSubmit = useCallback(async (payload: FbSubmitPayload) => {
    setSubmitting(true);
    setError(null);
    try {
      const captchaToken = await requestCaptchaToken();
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, captcha_token: captchaToken }),
      });
      if (!res.ok) throw new Error(`feedback_failed_${res.status}`);
      const body = (await res.json().catch(() => null)) as { data?: { tally?: FbTally } } | null;
      if (body?.data?.tally) setTally(body.data.tally); // server-echoed counts
      reachGoal("feedback_submit", { votes: payload.votes.length });
    } catch (err) {
      // Canon keeps the modal open on reject and renders `error` inline.
      setError("Не получилось отправить. Попробуйте ещё раз");
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  // Founder admin (/admin*) + auth (/login) stay clean — no feedback FAB there.
  if (pathname === "/login" || pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  return (
    <Modal
      mobile={mobile}
      embedded={false}
      open={open}
      onOpenChange={onOpenChange}
      tally={tally}
      submitting={submitting}
      error={error}
      onSubmit={onSubmit}
    />
  );
}
