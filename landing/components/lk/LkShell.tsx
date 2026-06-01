"use client";

/**
 * Client ЛК shell (PR-LK6) — header + responsive nav + auth guard + toast.
 *
 * Auth guard: fetches `GET /api/lk/site` on mount; a 401/403 (customer-session
 * gate) bounces to /login. Desktop (≥760) = left sidebar; mobile = fixed
 * bottom nav (spec 02 §1). Site name/domain + the «N новых» badge come from
 * the backend, never hardcoded. A bottom-centre toast is shared via context.
 */

import {
  BarChart3,
  CreditCard,
  ExternalLink,
  Inbox,
  type LucideIcon,
  MessageSquarePlus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { lkApi, type SiteData } from "@/lib/lk-api";
import { useIsMobile } from "@/lib/use-is-mobile";

interface LkCtx {
  site: SiteData;
  newCount: number;
  setNewCount: (n: number) => void;
  toast: (msg: string) => void;
}

const Ctx = createContext<LkCtx | null>(null);

export function useLk(): LkCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLk outside LkShell");
  return ctx;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV: NavItem[] = [
  { href: "/lk", label: "Заявки", icon: Inbox },
  { href: "/lk/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/lk/changes", label: "Изменения", icon: MessageSquarePlus },
  { href: "/lk/billing", label: "Оплата", icon: CreditCard },
  { href: "/lk/settings", label: "Настройки", icon: Settings },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/lk" ? pathname === "/lk" : pathname.startsWith(href);
}

export function LkShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [site, setSite] = useState<SiteData | null>(null);
  const [authFail, setAuthFail] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [s, leads] = await Promise.all([lkApi.site(), lkApi.leads()]);
      if (cancelled) return;
      if (!s.ok) {
        if (s.error === "auth_required") router.replace("/login");
        else setAuthFail(true);
        return;
      }
      setSite(s.data);
      if (leads.ok) setNewCount(leads.data.new_count);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (authFail) {
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <p className="text-[15px] text-ink-soft">Не удалось загрузить кабинет.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-full bg-accent px-5 py-2 text-[14px] font-semibold text-white hover:bg-accent-hover"
          >
            Обновить
          </button>
        </div>
      </div>
    );
  }
  if (!site) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
      </div>
    );
  }

  const ctx: LkCtx = { site, newCount, setNewCount, toast };
  const statusRu = site.status === "published" ? "опубликован" : site.status;

  return (
    <Ctx.Provider value={ctx}>
      <div className="min-h-screen bg-paper text-ink">
        {/* sticky header */}
        <header className="bg-paper/90 sticky top-0 z-30 border-b border-line backdrop-blur">
          <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 sm:px-6">
            <span className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-accent text-[15px] font-extrabold text-white">
                С
              </span>
              <span className="hidden text-[13px] font-semibold tracking-wide text-ink-faint sm:inline">
                ЛИЧНЫЙ КАБИНЕТ
              </span>
            </span>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-right sm:block">
                <span className="block font-mono text-[13px] text-ink">{site.domain}</span>
                <span className="block text-[11px] text-success">● {statusRu}</span>
              </span>
              <a
                href={`https://${site.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[13px] font-semibold text-ink hover:bg-paper-soft"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Открыть сайт
              </a>
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-[1200px] gap-6 px-4 sm:px-6">
          {/* desktop sidebar */}
          {!isMobile && (
            <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-[248px] shrink-0 py-6 sm:block">
              <div className="mb-4 rounded-2xl border border-line bg-white p-4">
                <p className="truncate text-[15px] font-bold text-ink">{site.name}</p>
                <p className="truncate font-mono text-[12px] text-ink-faint">{site.subdomain}</p>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={isActive(pathname, item.href)}
                    badge={item.href === "/lk" ? newCount : 0}
                  />
                ))}
              </nav>
            </aside>
          )}

          {/* content */}
          <main className="min-w-0 flex-1 py-6 pb-28 sm:pb-10">
            <div className="mx-auto max-w-[920px]">{children}</div>
          </main>
        </div>

        {/* mobile bottom nav */}
        {isMobile && (
          <nav className="bg-paper/95 fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line backdrop-blur">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              const badge = item.href === "/lk" ? newCount : 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] ${
                    active ? "text-accent" : "text-ink-faint"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                  {badge > 0 && (
                    <span className="absolute right-[22%] top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* toast */}
        {toastMsg && (
          <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 sm:bottom-8">
            <div className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white shadow-pop">
              {toastMsg}
            </div>
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

function NavLink({ item, active, badge }: { item: NavItem; active: boolean; badge: number }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
        active ? "bg-accent-soft text-accent-ink" : "text-ink-soft hover:bg-paper-soft"
      }`}
    >
      <Icon className="h-[18px] w-[18px]" />
      {item.label}
      {badge > 0 && (
        <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
