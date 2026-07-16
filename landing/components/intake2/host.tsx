"use client";

/**
 * Intake v2 — событийный контракт между лендингом и модалкой.
 *
 * Лендинг (page.tsx, CTA секций V5_*) открывает интейк ТОЛЬКО через
 * `openIntake2(entry, opts)` — диспатч CustomEvent. `<Intake2Host />`
 * монтируется один раз (в page.tsx) и слушает событие. Такое разделение
 * позволяет собирать композицию страницы и модалку независимо (паттерн
 * FeedbackModal / samosite:open-feedback).
 *
 * Реализация модалки — `Intake2Flow` (стейт-машина шагов, черновик в
 * localStorage `ss_intake2_draft`, отправка в POST /api/submit-application/v2).
 * Контракт openIntake2 / INTAKE2_EVENT / Intake2Host — стабильный, не менять.
 */

import { useCallback, useEffect, useState } from "react";

import { Intake2Flow } from "@/components/intake2/Intake2Flow";

export const INTAKE2_EVENT = "samosite:open-intake";

export interface Intake2OpenDetail {
  entry: string; // hero | header | final | pricing-* | story | example-<id>
  niche?: string;
  path?: string;
}

export function openIntake2(entry: string, opts: Omit<Intake2OpenDetail, "entry"> = {}): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<Intake2OpenDetail>(INTAKE2_EVENT, { detail: { entry, ...opts } }),
  );
}

export function Intake2Host() {
  const [detail, setDetail] = useState<Intake2OpenDetail | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      const ce = e as CustomEvent<Intake2OpenDetail>;
      setDetail(ce.detail ?? { entry: "unknown" });
    };
    window.addEventListener(INTAKE2_EVENT, on);
    return () => window.removeEventListener(INTAKE2_EVENT, on);
  }, []);

  const close = useCallback(() => setDetail(null), []);

  if (!detail) return null;
  return <Intake2Flow detail={detail} onClose={close} />;
}
