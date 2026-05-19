import type { Metadata } from "next";

import { FeedbackForm } from "@/components/FeedbackForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Обратная связь",
  description:
    "Расскажите, какие источники добавить и какие фичи нужны. Когда пункт набирает 10 голосов — приоритизируем разработку.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16">
        <header className="text-left">
          <p className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            СТРАНИЦА · /FEEDBACK
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Скажите, чего не хватает
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-soft">
            Делаем по запросу. Чем больше людей просят одно и то же — тем быстрее запускаем. Когда
            пункт набирает 10 голосов от разных пользователей, приоритизируем разработку и пишем
            вам, когда выпустим.
          </p>
        </header>
        <div className="mt-10">
          <FeedbackForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
