"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LEAD_STATUS_META, LEAD_STATUS_ORDER, type LeadStatus } from "@/lib/lk-api";

/** Status pill = dropdown (spec 02 §2.4). Checkmark on current; click-outside
 * closes; stopPropagation so it doesn't toggle the card it sits in. */
export function StatusMenu({
  status,
  onChange,
}: {
  status: LeadStatus;
  onChange: (s: LeadStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const meta = LEAD_STATUS_META[status];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${meta.pill}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
        {meta.label}
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-pop">
          {LEAD_STATUS_ORDER.map((s) => {
            const m = LEAD_STATUS_META[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (s !== status) onChange(s);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-ink hover:bg-paper-soft"
              >
                <span className={`h-2 w-2 rounded-full ${m.dot}`} />
                {m.label}
                {s === status && <Check className="ml-auto h-3.5 w-3.5 text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
