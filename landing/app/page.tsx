// T0.1 placeholder. T1.4 will replace this page with the canonical Hero,
// benefits stack, and waitlist capture per docs/COPY.md §2.

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs uppercase tracking-widest text-neutral-500">
        Vitrina — scaffold placeholder (T0.1)
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
        Сайт, который сам себя ведёт и приносит вам заявки
      </h1>
      <p className="mt-6 max-w-xl text-base text-neutral-600">
        Финальный лендинг собирается в T1.4 по канону{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">docs/COPY.md</code>.
      </p>
    </main>
  );
}
