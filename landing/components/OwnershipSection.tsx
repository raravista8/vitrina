/**
 * Восемь «сам» — но кнопка всегда у вас
 *
 * Bridge section between BigFeatures (autonomy claim) and Analytics
 * (proof of dashboard). User-test feedback on v2.1.3: «8 «сам» звучит
 * как "ничего нельзя поправить руками"» → this section reframes the
 * promise: yes, Самосайт делает рутину сам, но финальные решения и
 * правка — за вами, всегда видны в личном кабинете.
 *
 * Two halves on desktop, stacked on mobile:
 *   • Left — copy: H2 + 4 «контроль» bullets + CTA «Посмотреть демо ЛК»
 *   • Right — `<ControlPanelMock>` (faux admin dashboard card)
 *
 * Canon: `~/Desktop/самосайт финал 2/landing-samosite.jsx:1797-1893`.
 * ControlPanelMock: same file, lines 1478-1598.
 */

import {
  Check,
  Pause,
  Pencil,
  Image as ImageIcon,
  Download,
  Play,
  ArrowUpRight,
} from "lucide-react";

// ── ControlPanelMock — faux admin dashboard card ───────────────────────────
//
// Visual-only mock — NOT functional. Demonstrates what users see in their
// личный кабинет:
//   • Site row (subdomain + «опубликован»)
//   • 3 mini-stats (visitors / leads / rating)
//   • Recent leads list (3 entries, masked PII)
//   • Action grid (4 chips — edit / replace photos / pause / download)
//
// All copy + numbers come from the canon. PII in leads is intentionally
// masked («Анна П.», «+7 999 111-11-11») to mirror what real admin shows.

function ControlPanelMock() {
  const stats = [
    { num: "347", label: "посетителей", accent: false },
    { num: "14", label: "заявок", accent: true },
    { num: "4.9", label: "оценка", accent: false },
  ];

  const leads = [
    { name: "Анна П.", contact: "+7 999 111-11-11", when: "14:32 · TG" },
    { name: "Юлия В.", contact: "@example_user", when: "12:18 · TG" },
    { name: "Михаил С.", contact: "+7 999 222-22-22", when: "вчера · телефон" },
  ];

  const actions = [
    {
      icon: <Pencil className="h-3.5 w-3.5" strokeWidth={2} />,
      label: "Редактировать тексты",
      primary: true,
    },
    {
      icon: <ImageIcon className="h-3.5 w-3.5" strokeWidth={2} />,
      label: "Заменить фото",
      primary: false,
    },
    {
      icon: <Pause className="h-3.5 w-3.5" strokeWidth={2} />,
      label: "Поставить на паузу",
      primary: false,
    },
    {
      icon: <Download className="h-3.5 w-3.5" strokeWidth={2} />,
      label: "Скачать архив",
      primary: false,
    },
  ];

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_24px_48px_-24px_rgba(120,60,30,0.25)]">
      {/* faux window chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-paper-soft px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.13_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.13_85)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.13_145)]" />
        <span className="ml-2.5 font-mono text-[11.5px] text-ink-faint">
          Личный кабинет — samosite.online
        </span>
      </div>

      <div className="p-[18px] sm:p-[22px]">
        {/* site row */}
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 rounded-xl border border-line"
            style={{
              background:
                "repeating-linear-gradient(135deg, var(--tw-color-accent-soft, oklch(0.92 0.045 40)) 0 8px, var(--tw-color-paper-soft, oklch(0.945 0.014 75)) 8px 16px)",
            }}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <div className="text-[14.5px] font-bold tracking-tight text-ink">
              студия-анны.samosite.online
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1.5 text-[12px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              опубликован · обновлён сегодня в 14:02
            </div>
          </div>
        </div>

        {/* mini stats */}
        <div className="mt-[18px] grid grid-cols-3 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-paper-soft p-3">
              <div
                className={`text-[22px] font-bold leading-none tracking-tight ${s.accent ? "text-accent" : "text-ink"}`}
              >
                {s.num}
              </div>
              <div className="mt-[3px] text-[11.5px] text-ink-faint">{s.label}</div>
            </div>
          ))}
        </div>

        {/* recent leads */}
        <div className="mt-4 font-mono text-[10.5px] font-semibold uppercase tracking-widest text-ink-faint">
          Последние заявки
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {leads.map((l) => (
            <div
              key={l.contact}
              className="flex items-center gap-2.5 rounded-lg border border-line-soft bg-white px-2.5 py-2 text-[12.5px]"
            >
              <span className="min-w-[70px] font-semibold text-ink">{l.name}</span>
              <span className="flex-1 font-mono text-ink-soft">{l.contact}</span>
              <span className="font-mono text-[11px] text-ink-faint">{l.when}</span>
            </div>
          ))}
        </div>

        {/* action chips */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {actions.map((a) => (
            <div
              key={a.label}
              className={`flex items-center gap-2 rounded-[10px] border px-3 py-2.5 text-[13px] ${
                a.primary
                  ? "border-accent bg-accent-soft font-semibold text-accent"
                  : "border-line bg-paper-soft font-medium text-ink-soft"
              }`}
            >
              {a.icon}
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

const BULLETS = [
  {
    title: "Полный контроль",
    body: "Правьте тексты, заменяйте фото, ставьте на паузу — в одно нажатие.",
  },
  {
    title: "Сайт ваш",
    body: "Заберёте файлы или унесёте на другой домен — в любой момент.",
  },
  {
    title: "Аналитика тоже",
    body: "Видите кто пришёл, откуда и сколько оставил заявок.",
  },
  {
    title: "Удалить за секунду",
    body: "Передумали — нажали «удалить». Никаких звонков в поддержку.",
  },
];

export function OwnershipSection() {
  return (
    <section
      id="ownership"
      data-section="ownership"
      aria-labelledby="ownership-title"
      className="px-5 pb-0 pt-14 sm:px-16 sm:pb-0 sm:pt-20"
    >
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-7 overflow-hidden rounded-[22px] border border-line bg-white p-7 sm:grid-cols-[1fr_1.1fr] sm:gap-14 sm:rounded-[28px] sm:p-14">
        {/* decorative bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[120px] -top-[100px] h-[360px] w-[360px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, var(--tw-color-accent-soft, oklch(0.92 0.045 40)) 0%, transparent 65%)",
          }}
        />

        {/* copy side */}
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Личный кабинет
          </p>
          <h2
            id="ownership-title"
            className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[44px]"
          >
            Восемь «сам» —
            <br className="hidden sm:block" /> но кнопка всегда у&nbsp;вас
          </h2>
          <p className="mt-3.5 max-w-[480px] text-[16px] leading-relaxed text-ink-soft sm:text-[18px]">
            Самосайт делает рутину, но решения — за вами. В личном кабинете видна аналитика и
            доступны все действия с сайтом.
          </p>

          <ul className="mt-6 flex list-none flex-col gap-3.5 p-0">
            {BULLETS.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <div>
                  <div className="text-[15.5px] font-bold tracking-tight text-ink sm:text-[17px]">
                    {b.title}
                  </div>
                  <div className="mt-0.5 text-[14px] leading-relaxed text-ink-soft sm:text-[14.5px]">
                    {b.body}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/*
           * CTA to client-admin-demo (interactive sandbox). Per canon (line 1870)
           * it links to `client-admin-demo.html` — a separate prototype page
           * from the design archive. На проде demo пока не хостится — линк
           * пока ведёт на якорь Analytics секции как ближайший visual proof.
           * После Phase 7c (порт client-admin-demo) подставить /admin/demo.
           */}
          <a
            href="#analytics"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[14px] font-semibold text-white no-underline shadow-[0_14px_28px_-14px_rgba(0,0,0,0.4)] sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
              <Play className="h-3 w-3 fill-current" strokeWidth={0} />
            </span>
            Посмотреть аналитику ниже
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </a>
        </div>

        {/* visual side — admin dashboard mock */}
        <div className="relative">
          <ControlPanelMock />
        </div>
      </div>
    </section>
  );
}
