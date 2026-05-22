"use client";

/**
 * `<AnalyticsSection>` — landing v2.1.3 секция демо-аналитики.
 *
 * Spec: `CLAUDE_CODE_TZ_session_v2.1.3.md` §1.3 + §2.2 + reference UI в
 * `screens-client-admin-demo.jsx` (Analytics tab) — это **точно** тот
 * экран, который мастер увидит в личном кабинете.
 *
 * Цель — closes-loop конверсии «вижу что получу»: визитор лендинга
 * видит ровно UI аналитики, которая будет в его ЛК после подключения.
 *
 * Структура:
 *   1. Header (eyebrow + H2 + sub)
 *   2. 4 stat-card с sparkline-ами (Посещений / Заявок / Конверсия / Оценка)
 *   3. Большой chart «Трафик за 30 дней» — area visits + bars leads
 *   4. Source breakdown stacked-bar (5 источников)
 *   5. Delivery note: «Самосайт пришлёт сводку в Telegram/MAX/email»
 *
 * **Данные — fixture**. Реальная аналитика приходит через
 * `GET /api/admin/analytics` в личный кабинет (отдельный PR backend).
 * На лендинге показывается «как это выглядит в среднем» — числа
 * подобраны правдоподобными для мастера маникюра / барбера через 1-2
 * месяца после подключения.
 *
 * "use client" — необходим для Recharts (ResponsiveContainer, Tooltip
 * требуют DOM измерений в runtime).
 */

import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- Fixture data --------------------------------------------------------

/** 30-day visits + leads с правдоподобной weekly seasonality (выше в чт-сб). */
const TRAFFIC_30D: readonly { day: number; visits: number; leads: number }[] = (() => {
  const base = [
    78, 92, 110, 134, 156, 178, 142, 88, 96, 118, 142, 168, 192, 156, 102, 110, 128, 152, 176, 198,
    164, 114, 124, 138, 162, 188, 214, 178, 132, 148,
  ];
  return base.map((visits, i) => ({
    day: i + 1,
    visits,
    leads: Math.round(visits * (0.024 + Math.sin(i / 4) * 0.008)),
  }));
})();

/** Sparkline data for stat-cards — 30 points, normalized к ~range. */
const sparkVisits = TRAFFIC_30D.map((d) => ({ v: d.visits }));
const sparkLeads = TRAFFIC_30D.map((d) => ({ v: d.leads }));
const sparkConversion = TRAFFIC_30D.map((d) => ({ v: (d.leads / d.visits) * 100 }));
const sparkRating: readonly { v: number }[] = [
  { v: 4.6 },
  { v: 4.7 },
  { v: 4.7 },
  { v: 4.8 },
  { v: 4.8 },
  { v: 4.7 },
  { v: 4.8 },
  { v: 4.9 },
  { v: 4.9 },
  { v: 4.9 },
  { v: 4.9 },
  { v: 4.9 },
];

/** Source breakdown — fits 100% per design canvas. */
const SOURCES: readonly { name: string; share: number; color: string }[] = [
  { name: "Я.Карты", share: 45, color: "#FFCC00" },
  { name: "Telegram", share: 28, color: "#229ED9" },
  { name: "Прямые", share: 15, color: "var(--accent, #c66333)" },
  { name: "2ГИС", share: 8, color: "#19BB4F" },
  { name: "Google", share: 4, color: "#EA4335" },
];

// --- Stat card ------------------------------------------------------------

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  spark: readonly { v: number }[];
  /** CSS color (oklch / hex / var()) — используется в sparkline fill+stroke. */
  color: string;
}

function StatCard({ label, value, delta, deltaPositive, spark, color }: StatCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-card">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">{label}</p>
      <div className="flex items-baseline gap-2.5">
        <span className="text-[28px] font-bold tracking-tight text-ink sm:text-[32px]">
          {value}
        </span>
        <span
          className={[
            "text-[12px] font-semibold",
            deltaPositive ? "text-success" : "text-warn",
          ].join(" ")}
        >
          {delta}
        </span>
      </div>
      {/* Sparkline — full-width inside card, фиксированная высота 36px.
          Skip axes/grid/tooltip — sparkline это «общий тренд», не «точные числа». */}
      <div className="h-[36px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[...spark]} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.45} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={1.8}
              fill={`url(#spark-${label})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

// --- Section --------------------------------------------------------------

export function AnalyticsSection() {
  return (
    <section
      id="analytics"
      aria-labelledby="analytics-title"
      className="bg-paper px-5 py-14 sm:px-16 sm:py-24"
    >
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Аналитика</p>
        <h2
          id="analytics-title"
          className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
        >
          Видно, как сайт работает на вас
        </h2>
        <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
          В личном кабинете — посещения, заявки, источники трафика и рейтинг. Без графиков для
          специалистов — только то, что вам нужно
        </p>
      </header>

      <div className="mx-auto max-w-[1200px]">
        {/* 4 stat-cards row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          <StatCard
            label="Посещения"
            value="2 847"
            delta="+18%"
            deltaPositive
            spark={sparkVisits}
            color="var(--accent, #c66333)"
          />
          <StatCard
            label="Заявки"
            value="78"
            delta="+34%"
            deltaPositive
            spark={sparkLeads}
            color="#229ED9"
          />
          <StatCard
            label="Конверсия"
            value="2,7%"
            delta="+0,4 п.п."
            deltaPositive
            spark={sparkConversion}
            color="#FF9C00"
          />
          <StatCard
            label="Оценка"
            value="4,9"
            delta="+0,1"
            deltaPositive
            spark={sparkRating}
            color="#FFB400"
          />
        </div>

        {/* Big composed chart — area visits + bars leads */}
        <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-card sm:mt-8 sm:p-7">
          <div className="mb-4 flex items-baseline justify-between gap-4 sm:mb-5">
            <h3 className="text-[16px] font-semibold text-ink sm:text-[18px]">Трафик за 30 дней</h3>
            <div className="flex items-center gap-4 text-[12px] text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--accent, #c66333)" }}
                />
                Посещения
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "#229ED9" }}
                />
                Заявки
              </span>
            </div>
          </div>
          <div className="h-[220px] w-full sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={[...TRAFFIC_30D]}
                margin={{ top: 10, right: 8, bottom: 0, left: -10 }}
              >
                <defs>
                  <linearGradient id="visitsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent, #c66333)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--accent, #c66333)" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2DA" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#9C8F82"
                  fontSize={10}
                  tickFormatter={(v) => (v % 5 === 0 ? `${v}` : "")}
                />
                <YAxis stroke="#9C8F82" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E8E2DA",
                    fontSize: 12,
                  }}
                  formatter={(value: number, name) =>
                    name === "visits" ? [value, "Посещения"] : [value, "Заявки"]
                  }
                  labelFormatter={(day) => `День ${day}`}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="var(--accent, #c66333)"
                  strokeWidth={2}
                  fill="url(#visitsArea)"
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="leads"
                  fill="#229ED9"
                  barSize={4}
                  radius={[2, 2, 0, 0]}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source breakdown — stacked horizontal bar */}
        <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-card sm:mt-8 sm:p-7">
          <h3 className="mb-4 text-[16px] font-semibold text-ink sm:text-[18px]">
            Откуда приходят клиенты
          </h3>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-paper-soft">
            {SOURCES.map((s) => (
              <div
                key={s.name}
                style={{ width: `${s.share}%`, background: s.color }}
                title={`${s.name} · ${s.share}%`}
                aria-label={`${s.name} ${s.share} процентов`}
              />
            ))}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] sm:grid-cols-5 sm:gap-x-3">
            {SOURCES.map((s) => (
              <li key={s.name} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ background: s.color }}
                />
                <span className="text-ink-soft">{s.name}</span>
                <span className="ml-auto font-mono tabular-nums text-ink">{s.share}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery note — single pill */}
        <p className="mx-auto mt-8 max-w-[720px] rounded-2xl bg-accent-soft px-5 py-4 text-center text-[14px] leading-relaxed text-accent-ink sm:mt-10 sm:text-[15.5px]">
          <b className="font-semibold">Кратко и регулярно.</b> Самосайт пришлёт сводку аналитики
          куда скажете — в Telegram, MAX или на почту
        </p>
      </div>
    </section>
  );
}
