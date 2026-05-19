"use client";

/**
 * Shared admin chrome — sidebar + auth-gate (PR-F).
 *
 * Wraps every /admin/* page (except /admin/login). On mount fetches
 * /admin/api/me; if the session is missing or expired the page
 * window-redirects to /admin/login so the cookie stays consistent
 * with the legacy Jinja flow (same path, same TTL).
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/AdminChrome.tsx`
 * (Concept A canvas). Tailwind classes ported from the canvas's
 * `stone-*` / `orange-*` to the project's `paper-soft` / `accent`
 * tokens so the admin shell shares the landing's palette.
 *
 * The page-level counter on "Заявки" is a live read of
 * /admin/api/dashboard.counters.apps_pending — refreshed on every
 * nav into a page that uses AdminChrome. Skipped silently if the
 * dashboard endpoint is unreachable; the chrome shouldn't fail open.
 */

import {
  Globe,
  Hourglass,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { adminRequest, type AdminMeData, type DashboardData } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  // Match function — segment-based so /admin/apps/<id> highlights "Заявки".
  match: (pathname: string) => boolean;
  counter?: "apps_pending";
}

const NAV: ReadonlyArray<NavItem> = [
  {
    href: "/admin",
    icon: LayoutDashboard,
    label: "Главная",
    match: (p) => p === "/admin",
  },
  {
    href: "/admin/apps",
    icon: Inbox,
    label: "Заявки",
    match: (p) => p.startsWith("/admin/apps"),
    counter: "apps_pending",
  },
  {
    href: "/admin/sites",
    icon: Globe,
    label: "Сайты",
    match: (p) => p.startsWith("/admin/sites"),
  },
  {
    href: "/admin/leads",
    icon: Mail,
    label: "Лиды",
    match: (p) => p.startsWith("/admin/leads"),
  },
  {
    href: "/admin/feedback",
    icon: MessageSquare,
    label: "Обратная связь",
    match: (p) => p.startsWith("/admin/feedback"),
  },
  {
    href: "/admin/waitlist",
    icon: Hourglass,
    label: "Waitlist",
    match: (p) => p.startsWith("/admin/waitlist"),
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Настройки",
    match: (p) => p.startsWith("/admin/settings"),
  },
];

interface AdminChromeProps {
  children: React.ReactNode;
}

export function AdminChrome({ children }: AdminChromeProps) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [me, setMe] = useState<AdminMeData | null>(null);
  const [authState, setAuthState] = useState<"checking" | "ok" | "denied">("checking");
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const meResult = await adminRequest<AdminMeData>("/me");
      if (cancelled) return;
      if (!meResult.ok) {
        setAuthState("denied");
        // Hard redirect so the URL changes in the address bar and the
        // login page renders without AdminChrome wrapping it.
        router.replace("/admin/login");
        return;
      }
      setMe(meResult.data);
      setAuthState("ok");
      // Best-effort counter; don't block render on this.
      const dash = await adminRequest<DashboardData>("/dashboard");
      if (!cancelled && dash.ok) {
        setPendingCount(dash.data.counters.apps_pending);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    await adminRequest("/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (authState === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="text-sm text-ink-faint">Проверяем сессию…</p>
      </div>
    );
  }
  if (authState === "denied") {
    // Render nothing while the redirect lands.
    return null;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-paper-soft md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-1 border-r border-line bg-paper p-4">
        <div className="mb-5 flex items-center gap-2 px-2">
          <span className="inline-block h-[22px] w-[22px] rounded-md bg-accent" />
          <span className="font-bold text-ink">Витрина</span>
          <span className="ml-auto rounded-md bg-paper-soft px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
            ADMIN
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(pathname);
            const counter = item.counter === "apps_pending" ? pendingCount : null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
                  isActive
                    ? "bg-accent-soft font-semibold text-accent"
                    : "text-ink-soft hover:bg-paper-soft hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{item.label}</span>
                {counter !== null && counter > 0 ? (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isActive ? "bg-accent text-white" : "bg-warn-soft text-warn",
                    )}
                  >
                    {counter}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-line pt-3 text-xs text-ink-faint">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft font-bold text-accent-ink">
            F
          </span>
          <span className="truncate">{me?.admin_id?.slice(0, 8) ?? "founder"}</span>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Выйти"
            className="ml-auto rounded-md p-1 text-ink-faint hover:bg-paper-soft hover:text-ink"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
