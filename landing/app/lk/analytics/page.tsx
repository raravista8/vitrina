"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div data-section="lk-analytics">
      <h1 className="mb-5 text-[26px] font-extrabold tracking-tight">Аналитика</h1>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6">
        <span className="inline-block rounded-full bg-paper-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
          В разработке
        </span>
        {/* blurred mock bar chart, no numbers */}
        <div className="pointer-events-none mt-6 flex h-40 items-end gap-3 opacity-40 blur-[3px]">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-accent-soft"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-6 grid place-items-center">
          <div className="rounded-2xl border border-line bg-white/90 px-6 py-5 text-center shadow-card backdrop-blur">
            <BarChart3 className="mx-auto h-8 w-8 text-accent" />
            <p className="mt-2 text-[16px] font-bold text-ink">Скоро откроем</p>
            <p className="mt-1 max-w-xs text-[13.5px] text-ink-soft">
              Посетители, источники трафика, заявки и конверсия. Включится автоматически — собирать
              ничего не нужно.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
