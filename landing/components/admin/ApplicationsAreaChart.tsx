"use client";

/**
 * 14-day applications-per-day area chart used by the admin dashboard.
 *
 * Wrapped in dynamic({ ssr: false }) at the caller so recharts never
 * runs at build/SSR time — keeps the route group's first-paint cost
 * isolated to whoever visits /admin/*. Chart colours pulled from the
 * Concept A token set (accent / accent-soft) to stay in palette.
 */

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Point {
  day: string;
  count: number;
}

export default function ApplicationsAreaChart({ points }: { points: ReadonlyArray<Point> }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={[...points]}>
        <defs>
          <linearGradient id="apps-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.045 40)" stopOpacity={0.9} />
            <stop offset="100%" stopColor="oklch(0.92 0.045 40)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="count"
          stroke="oklch(0.605 0.155 35)"
          fill="url(#apps-fill)"
          strokeWidth={2}
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: "currentColor" }}
          stroke="currentColor"
          tickFormatter={formatTick}
          interval="preserveStartEnd"
        />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid oklch(0.88 0.012 70)",
            borderRadius: 8,
            fontSize: 12,
            color: "oklch(0.215 0.018 60)",
          }}
          labelFormatter={(label: string) => formatTooltipLabel(label)}
          formatter={(value: number) => [value, "Заявки"]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function formatTick(value: string): string {
  // Backend ships ISO day strings ("2026-05-20"); reduce to "20.05".
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatTooltipLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}
