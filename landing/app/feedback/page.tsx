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
      <main className="mx-auto max-w-2xl px-6 py-20">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Обратная связь
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Что добавить и улучшить? Когда пункт набирает 10 голосов от разных пользователей —
            приоритизируем разработку и пишем вам когда выпустим.
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
