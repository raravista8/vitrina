import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админка · Самосайт",
  description: "Внутренний интерфейс. Доступ только для founder.",
  robots: { index: false, follow: false },
};

/**
 * Admin route group layout. The actual AdminChrome (sidebar +
 * auth-gate) wraps INSIDE each non-login page; the /admin/login
 * page intentionally renders without chrome so it can be visited
 * without an active session. This layout exists only to set the
 * route-group metadata (noindex) — the FeedbackFloatingButton
 * from the root layout still mounts, but the admin login form
 * has its own consent + auth surface so that's harmless.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
