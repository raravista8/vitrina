"use client";

/**
 * MetrikaGoals — analytics telemetry for the canon-rendered landing
 * sections, without touching canon source.
 *
 * Two mechanisms, both resilient to canon re-renders (mobile toggle,
 * hover) and to the dual desktop/mobile render of `ResponsiveCanonSection`:
 *
 *  1. IntersectionObserver on each `[data-section]` wrapper → fires a
 *     one-shot `*_view` goal the first time the section enters the
 *     viewport. De-duped per goal id (the dual-render means two nodes
 *     share one id — first to cross fires, the rest are ignored).
 *
 *  2. A single `document`-scoped click delegation for the secondary
 *     actions — FAQ open, feedback entries, login, analytics demo —
 *     since those live inside canon markup we can't add handlers to.
 *
 * Funnel + CTA goals live closer to their state: `cta_click` in
 * `SiteHeader` (the delegation that opens the modal) + `Hero`;
 * `submit_*` in `Hero` / `SubmitModal`. See `lib/metrika.ts` for the
 * full goal map.
 *
 * Returns null. Mount once in `app/page.tsx`.
 */

import { useEffect } from "react";

import { type MetrikaGoal, reachGoal } from "@/lib/metrika";

/** `[data-section]` id → one-shot view goal. */
const VIEW_GOALS: Record<string, MetrikaGoal> = {
  examples: "examples_view",
  cycle: "cycle_view",
  monday: "monday_view",
  pricing: "pricing_view",
  "final-cta": "final_cta_view",
};

export function MetrikaGoals() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // ── 1. Section-view goals (one-shot per id) ──────────────────────
    // Guard: IntersectionObserver is universal in real browsers, but
    // absent in jsdom (tests) and theoretically in ancient/headless envs.
    // Skip view-goals gracefully there; click delegation still wires up.
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      const fired = new Set<string>();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            const id = el.dataset["section"];
            if (!id) continue;
            const goal = VIEW_GOALS[id];
            if (goal && !fired.has(goal)) {
              fired.add(goal);
              reachGoal(goal);
            }
            io?.unobserve(el);
          }
        },
        // Fire when ~1/3 of the section is on screen — «реально увидел».
        { threshold: 0.33 },
      );
      for (const id of Object.keys(VIEW_GOALS)) {
        for (const el of Array.from(document.querySelectorAll(`[data-section="${id}"]`))) {
          io.observe(el);
        }
      }
    }

    // ── 2. Secondary-action click delegation ─────────────────────────
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      // FAQ — any <summary> opened inside the FAQ section. <details>
      // toggles AFTER the click; fire only when it's about to OPEN.
      const summary = t.closest<HTMLElement>('[data-section="faq"] summary');
      if (summary) {
        const details = summary.closest("details");
        // open===false at click-time means it's opening now.
        if (details && !details.open) {
          reachGoal("faq_open", { question: summary.textContent?.trim().slice(0, 80) });
        }
        return;
      }

      const a = t.closest<HTMLAnchorElement>("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";

      // Feedback entries — all resolve to /feedback; attribute by context.
      if (href.includes("/feedback")) {
        let source = "footer";
        if (a.closest("footer")) source = "footer";
        else if (a.closest('[data-section="sources"]')) source = "sources";
        else if (a.closest('[data-section="final-cta"]')) source = "final";
        else if (a.classList.contains("fixed")) source = "fab";
        reachGoal("feedback_open", { source });
        return;
      }
      // Floating «Чего не хватает?» FAB → /feedback (Next <Link> renders
      // the same href; covered above). Kept explicit comment for clarity.

      if (href === "/login") {
        reachGoal("login_click");
        return;
      }
      if (href === "/admin-demo") {
        reachGoal("analytics_demo_click");
        return;
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      io?.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
