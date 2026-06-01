import type { ReactNode } from "react";

import { LkShell } from "@/components/lk/LkShell";

export const metadata = {
  title: "Личный кабинет — Самосайт",
  robots: { index: false, follow: false },
};

export default function LkLayout({ children }: { children: ReactNode }) {
  return <LkShell>{children}</LkShell>;
}
