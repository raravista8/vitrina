"use client";

import { useEffect, useState } from "react";

/** ЛК breakpoint (spec 02 §1): <760 → bottom nav, ≥760 → sidebar. */
export function useIsMobile(breakpoint = 760): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return mobile;
}
