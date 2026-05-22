/**
 * `<AnalyticsSection>` — landing v2.2 demo-аналитика, canon match.
 *
 * Spec: `CLAUDE_CODE_TZ_session_v2.1.3.md` §1.3 + canon `AnalyticsSection`
 * (landing-samosite.jsx line 1603).
 *
 * Closes the conversion loop «вижу что получу» — visitor sees the exact
 * dashboard UI the master will get in their личный кабинет.
 *
 * Canon layout (Phase C-Analytics rebuild):
 *   • Single white "dashboard window" card with faux chrome header
 *     (3 traffic-light dots + «Личный кабинет · аналитика» mono caption).
 *     Replaces prod's three separate cards stacked vertically.
 *   • 4 stat-tiles on `bg-paper-soft` INSIDE the window card. Each:
 *       label (12 px ink-faint) → big number 24 px + ↑+delta in success
 *       green → inline SVG sparkline (100×28).
 *   • 1.6fr/1fr grid INSIDE the window: big chart on left + source
 *     breakdown on right. Both on `bg-paper-soft` tiles.
 *   • Big chart — inline SVG (NO Recharts). Area path for visits +
 *     vertical bars for leads. Y-axis grid lines + tick labels. X-axis
 *     date labels (1/8/15/22/30 мая).
 *   • Source breakdown — small heading + sub + stacked bar 12 px high +
 *     5-row legend with name/percent.
 *   • Delivery note OUTSIDE the window card — accent-soft pill with
 *     paper-plane icon, centered, max-w 760.
 *
 * Why dropped Recharts:
 *   • Canon uses static inline SVG. Matching it pixel-perfect requires
 *     the same path, same coordinates, same fill opacity.
 *   • Recharts adds tooltip/animation runtime that we don't need on
 *     landing — this is a marketing visual, not a live dashboard.
 *   • -120 KB bundle (recharts + lib/dependency) once we remove the only
 *     remaining call site. Defer the dep removal to a follow-up since
 *     other admin views import it.
 *
 * **All data — fixture**. Real analytics comes through
 * `GET /api/admin/analytics` in the real ЛК (`/admin-demo`).
 */

// --- Big chart fixture (30 days, weekly seasonality) ----------------------

const TRAFFIC_DAYS = 30;
const visits = Array.from({ length: TRAFFIC_DAYS }, (_, i) =>
  Math.round(80 + 40 * Math.sin(i * 0.6) + 60 * (i / TRAFFIC_DAYS) + (i % 7 === 0 ? 30 : 0)),
);
const leads = visits.map((v) => Math.round(v * (0.04 + (Math.sin(v) + 1) * 0.02)));

const CHART_W = 720;
const CHART_H = 220;
const CHART_PAD = { top: 16, right: 16, bottom: 28, left: 36 } as const;
const chartInner = {
  w: CHART_W - CHART_PAD.left - CHART_PAD.right,
  h: CHART_H - CHART_PAD.top - CHART_PAD.bottom,
};
const maxV = Math.max(...visits) * 1.15;
const xFor = (i: number) => CHART_PAD.left + (i / (TRAFFIC_DAYS - 1)) * chartInner.w;
const yFor = (v: number) => CHART_PAD.top + chartInner.h - (v / maxV) * chartInner.h;

const visitsPath = visits.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
const visitsArea = `${visitsPath} L ${xFor(TRAFFIC_DAYS - 1)} ${yFor(0)} L ${xFor(0)} ${yFor(0)} Z`;
const X_LABELS = [
  { i: 0, t: "1 мая" },
  { i: 7, t: "8 мая" },
  { i: 14, t: "15 мая" },
  { i: 21, t: "22 мая" },
  { i: 29, t: "30 мая" },
] as const;

// --- 4 stat tiles (sparkline data inline) ---------------------------------

interface StatTile {
  num: string;
  delta: string;
  label: string;
  /** When 'accent' — number renders in terracotta, не ink. Canon line 1714. */
  tone: "ink" | "accent";
  /** Sparkline stroke + area-fill colour (OKLCH / hex / var). */
  color: string;
  /** 14 daily values для sparkline shape — canon line 1605-1612. */
  sparkline: readonly number[];
}

const STATS: readonly StatTile[] = [
  {
    num: "2 847",
    delta: "+18%",
    label: "посещений за 30 дней",
    tone: "ink",
    color: "var(--accent, #c66333)",
    sparkline: [210, 198, 215, 240, 232, 260, 275, 290, 280, 295, 310, 325, 345, 360],
  },
  {
    num: "78",
    delta: "+34%",
    label: "заявок принято",
    tone: "accent",
    color: "oklch(0.55 0.12 145)",
    sparkline: [2, 3, 4, 3, 5, 4, 5, 6, 5, 7, 6, 8, 7, 9],
  },
  {
    num: "2,7%",
    delta: "+0,4пп",
    label: "конверсия в заявку",
    tone: "ink",
    color: "oklch(0.55 0.15 35)",
    sparkline: [2.1, 2.2, 2.3, 2.2, 2.4, 2.3, 2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.8],
  },
  {
    num: "4,9★",
    delta: "+0,1",
    label: "средняя оценка",
    tone: "ink",
    color: "oklch(0.55 0.15 75)",
    sparkline: [4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9],
  },
];

const SOURCES: readonly { name: string; share: number; color: string }[] = [
  { name: "Яндекс.Карты", share: 45, color: "#FFCC00" },
  { name: "Telegram", share: 28, color: "#229ED9" },
  { name: "Прямые", share: 15, color: "var(--accent, #c66333)" },
  { name: "2ГИС", share: 8, color: "#19BB4F" },
  { name: "Google", share: 4, color: "oklch(0.55 0.18 25)" },
];

// --- Inline sparkline SVG (no Recharts) ------------------------------------

function Sparkline({ points, color }: { points: readonly number[]; color: string }) {
  const w = 100;
  const h = 28;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((p) => h - ((p - min) / range) * (h - 4) - 2);
  const path = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i]!.toFixed(1)}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" aria-hidden>
      <path d={area} fill={color} fillOpacity="0.12" />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- Stat tile ------------------------------------------------------------

function StatTileView({ tile }: { tile: StatTile }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-[14px] bg-paper-soft p-3.5">
      <div className="text-[12px] font-medium text-ink-faint">{tile.label}</div>
      <div className="flex items-baseline gap-2">
        <span
          className={[
            "text-[24px] font-bold leading-none tracking-[-0.025em]",
            tile.tone === "accent" ? "text-accent" : "text-ink",
          ].join(" ")}
        >
          {tile.num}
        </span>
        <span className="font-mono text-[12px] font-semibold text-success">↑ {tile.delta}</span>
      </div>
      <Sparkline points={tile.sparkline} color={tile.color} />
    </div>
  );
}

// --- Big traffic chart (inline SVG, no Recharts) ---------------------------

function TrafficChart() {
  return (
    <div className="rounded-[14px] bg-paper-soft p-4">
      <div className="mb-2.5 flex flex-wrap items-baseline gap-3.5">
        <div className="text-[14px] font-bold text-ink">Трафик за 30 дней</div>
        <div className="ml-auto inline-flex gap-3 text-[11.5px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent" />
            посещения
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block h-[2px] w-2 align-middle"
              style={{ background: "oklch(0.5 0.13 240)" }}
            />
            заявки
          </span>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        width="100%"
        height={CHART_H}
        preserveAspectRatio="none"
        className="block"
        aria-hidden
      >
        {/* Y-axis grid + tick labels at 0/25/50/75/100% of max */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <g key={i}>
            <line
              x1={CHART_PAD.left}
              x2={CHART_W - CHART_PAD.right}
              y1={CHART_PAD.top + chartInner.h * t}
              y2={CHART_PAD.top + chartInner.h * t}
              stroke="oklch(0.93 0.010 70)"
              strokeWidth="1"
            />
            <text
              x={CHART_PAD.left - 8}
              y={CHART_PAD.top + chartInner.h * t + 4}
              fontSize="10"
              fill="oklch(0.56 0.020 60)"
              textAnchor="end"
              fontFamily='"JetBrains Mono", monospace'
            >
              {Math.round(maxV * (1 - t))}
            </text>
          </g>
        ))}
        {/* Visits area (terracotta, low opacity) + line */}
        <path d={visitsArea} fill="var(--accent, #c66333)" fillOpacity="0.10" />
        <path
          d={visitsPath}
          fill="none"
          stroke="var(--accent, #c66333)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Leads bars (blue) — 4 px wide, half-opacity, multiplied 10× so a
            small lead count is visually readable vs the visits curve. */}
        {leads.map((l, i) => (
          <rect
            key={i}
            x={xFor(i) - 2}
            y={yFor(l * 10)}
            width="4"
            height={CHART_PAD.top + chartInner.h - yFor(l * 10)}
            fill="oklch(0.5 0.13 240)"
            opacity="0.5"
            rx="1"
          />
        ))}
        {/* X-axis labels — 5 dates evenly spaced */}
        {X_LABELS.map((l) => (
          <text
            key={l.i}
            x={xFor(l.i)}
            y={CHART_H - 8}
            fontSize="11"
            fill="oklch(0.56 0.020 60)"
            textAnchor="middle"
          >
            {l.t}
          </text>
        ))}
      </svg>
    </div>
  );
}

// --- Source breakdown ------------------------------------------------------

function SourceBreakdown() {
  return (
    <div className="rounded-[14px] bg-paper-soft p-4">
      <div className="mb-1 text-[14px] font-bold text-ink">Откуда приходят</div>
      <div className="mb-3.5 text-[11.5px] text-ink-faint">
        Самосайт держит карточки свежими — поэтому Я.Карты #1
      </div>
      <div className="mb-3 flex h-3 overflow-hidden rounded-md">
        {SOURCES.map((s) => (
          <span key={s.name} style={{ width: `${s.share}%`, background: s.color }} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {SOURCES.map((s) => (
          <div key={s.name} className="flex items-center gap-2.5 text-[12.5px] text-ink">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="flex-1">{s.name}</span>
            <b className="font-mono text-ink">{s.share}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Section ---------------------------------------------------------------

export function AnalyticsSection() {
  return (
    <section
      id="analytics"
      data-section="analytics"
      aria-labelledby="analytics-title"
      className="bg-paper pb-0 pt-14 sm:pb-0 sm:pt-24"
    >
      <div data-section-body="analytics" className="px-5 sm:px-16">
        <header className="mx-auto mb-7 max-w-[760px] sm:mb-12 sm:text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Аналитика</p>
          <h2
            id="analytics-title"
            className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
          >
            {/* v2.2 canon (финал 2) — «Видно, как…» (third-person, abstract)
              → «Видите всё, что…» (second-person address, dashboard framing).
              Subhead extended to surface the delivery channel promise
              («сводку куда скажете — TG/MAX/почта»). */}
            Видите всё,
            <br className="hidden sm:block" /> что происходит с сайтом
          </h2>
          <p className="mt-3 max-w-[760px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
            Сколько людей зашли, откуда пришли и сколько оставили заявок — в одном экране. Самосайт
            ещё пришлёт сводку куда скажете — в Telegram, MAX или на почту
          </p>
        </header>

        {/* Single "dashboard window" wrapper card per canon line 1672. White
          bg + warm shadow + faux chrome header. Holds the 4 stat tiles +
          the chart/sources grid. */}
        <div
          className="ss-card-lift mx-auto max-w-[1200px] rounded-[22px] border border-line bg-white p-5 sm:p-7"
          style={{ boxShadow: "0 24px 48px -24px rgba(120,60,30,0.18)" }}
        >
          {/* Faux window chrome — 3 traffic lights + path-style label */}
          <div className="-mx-1 mb-[18px] flex items-center gap-1.5 border-b border-line-soft pb-3.5">
            <span
              aria-hidden
              className="h-[9px] w-[9px] rounded-full"
              style={{ background: "oklch(0.74 0.13 25)" }}
            />
            <span
              aria-hidden
              className="h-[9px] w-[9px] rounded-full"
              style={{ background: "oklch(0.82 0.13 85)" }}
            />
            <span
              aria-hidden
              className="h-[9px] w-[9px] rounded-full"
              style={{ background: "oklch(0.78 0.13 145)" }}
            />
            <span className="ml-2.5 font-mono text-[11.5px] text-ink-faint">
              Личный кабинет · аналитика
            </span>
          </div>

          {/* 4 stat tiles — 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <StatTileView key={s.label} tile={s} />
            ))}
          </div>

          {/* Big chart + source breakdown — 1.6fr/1fr grid on desktop, stacked on mobile */}
          <div className="mt-[18px] grid gap-4 sm:grid-cols-[1.6fr_1fr]">
            <TrafficChart />
            <SourceBreakdown />
          </div>
        </div>

        {/* Delivery note pill — OUTSIDE the dashboard window card, centered,
          accent-soft bg, paper-plane icon. Canon line 1769. */}
        <div className="mx-auto mt-[18px] flex max-w-[760px] flex-col items-start gap-2.5 rounded-[14px] bg-accent-soft px-4 py-3.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-3.5 sm:px-5">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 L11 13" />
              <path d="M22 2 L15 22 L11 13 L2 9 L22 2 Z" />
            </svg>
          </span>
          <p className="flex-1 text-[13.5px] leading-[1.45] text-accent-ink sm:text-[14.5px]">
            <b className="font-semibold text-accent-ink">Кратко и регулярно</b> — Самосайт пришлёт
            сводку аналитики, куда скажете: в Telegram, MAX или на почту. Не нужно заходить в
            кабинет, чтобы знать как идут дела
          </p>
        </div>
      </div>
    </section>
  );
}
