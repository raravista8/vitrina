"use client";

/**
 * Admin chrome — canon `AdminChrome` drop-in (canon 0.2.0-alpha.1).
 *
 * Replaces the previous hand-rolled Tailwind sidebar with the controlled
 * canon component. Visual = canon's verbatim render (terracotta sidebar
 * with emoji nav icons, Onest type, accent-soft active highlight).
 * Drift = 0 from design canvas.
 *
 * What this wrapper still owns (consumer concern):
 *   - Auth gate: fetch `/admin/api/me` on mount; redirect to `/admin/login`
 *     on missing/expired session. Same as the previous chrome.
 *   - Routing: map canon's `onNavigate(section)` to Next.js `router.push`.
 *     Canon's `active` prop maps from `usePathname()` — section IDs
 *     in canon: `dashboard | apps | sites | leads | feedback |
 *     waitlist | settings`.
 *   - Logout: POST `/admin/api/logout`, redirect.
 *   - Live badge counts: best-effort GET `/admin/api/dashboard` for
 *     `apps_pending` — feeds canon's `badgeCounts.apps`.
 *   - User identity: `me.admin_id.slice(0,8)` → canon's `user.username`,
 *     initials default `'F'`.
 *
 * Source: `packages/canon/src/admin-core/index.tsx::AdminChrome`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.11`.
 */

import { AdminChrome as CanonAdminChrome } from "@samosite/canon/admin-core";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { adminRequest, type AdminMeData, type DashboardData } from "@/lib/admin-api";

// Canon's nav sections — keep in lockstep with NAV array in
// `packages/canon/src/admin-core/index.tsx`. Adding a section here
// without canon support is fine (canon ignores unknown keys), removing
// one canon ships will break navigation.
type Section = "dashboard" | "apps" | "sites" | "leads" | "feedback" | "waitlist" | "settings";

// Pathname → section mapper. Segment-based so `/admin/apps/<id>` still
// highlights «Заявки» (was the same behaviour in the hand-rolled chrome).
function sectionFromPath(pathname: string): Section {
  if (pathname === "/admin" || pathname === "/admin/") return "dashboard";
  if (pathname.startsWith("/admin/apps")) return "apps";
  if (pathname.startsWith("/admin/sites")) return "sites";
  if (pathname.startsWith("/admin/leads")) return "leads";
  if (pathname.startsWith("/admin/feedback")) return "feedback";
  if (pathname.startsWith("/admin/waitlist")) return "waitlist";
  if (pathname.startsWith("/admin/settings")) return "settings";
  return "dashboard";
}

function pathFromSection(section: Section): string {
  return section === "dashboard" ? "/admin" : `/admin/${section}`;
}

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

  if (authState === "checking") {
    // Match canon's `bgSoft` background so the auth-check splash doesn't flash
    // a different colour for a frame before the chrome mounts.
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          background: "var(--vt-bg-soft, #faf6f1)",
          fontFamily: "Onest, system-ui, sans-serif",
          fontSize: 14,
          color: "var(--vt-ink-soft, #6b6157)",
        }}
      >
        <p>Проверяем сессию…</p>
      </div>
    );
  }
  if (authState === "denied") {
    // Render nothing while the redirect lands.
    return null;
  }

  return (
    <CanonAdminChrome
      active={sectionFromPath(pathname)}
      user={{
        username: me?.admin_id?.slice(0, 8) ?? "founder",
        initials: "F",
      }}
      onNavigate={(section: Section) => router.push(pathFromSection(section))}
      onLogout={async () => {
        await adminRequest("/logout", { method: "POST" });
        router.replace("/admin/login");
      }}
      badgeCounts={pendingCount !== null ? { apps: pendingCount } : undefined}
    >
      {children}
    </CanonAdminChrome>
  );
}
