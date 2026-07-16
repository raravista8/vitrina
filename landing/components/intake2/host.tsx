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
 * ЗАГЛУШКА: полная реализация модалки (стейт-машина шагов, черновик в
 * localStorage, отправка в POST /api/submit-application/v2) заменяет
 * тело Intake2Host, НЕ меняя контракт openIntake2/события.
 */

import { useEffect } from "react";

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
  useEffect(() => {
    const on = () => {};
    window.addEventListener(INTAKE2_EVENT, on);
    return () => window.removeEventListener(INTAKE2_EVENT, on);
  }, []);
  return null;
}
