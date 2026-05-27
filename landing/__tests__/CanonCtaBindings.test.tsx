import "@testing-library/jest-dom/vitest";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CanonCtaBindings } from "@/components/CanonCtaBindings";

/* CanonCtaBindings is a side-effect-only component (returns null). It
 * walks `<main>` after mount and:
 *   1. tags every `<a href="#hero">` with inline accent background as
 *      `data-ss-primary-cta="1"` so SiteHeader's global click handler
 *      can pick it up and dispatch the SubmitModal-open event.
 *   2. rewrites every `<a href*="client-admin-demo">` to `/admin-demo`
 *      so canon's relative `client-admin-demo.html` resolves to our
 *      Next.js route instead of 404.
 *
 * The component's effect runs against `document.querySelector("main")`,
 * so each test wraps the markup it wants to assert against in a
 * `<main>` container BEFORE mounting the component. */

function setupMain(innerHtml: string) {
  const main = document.createElement("main");
  main.innerHTML = innerHtml;
  document.body.appendChild(main);
  return main;
}

describe("CanonCtaBindings — body CTA wiring + demo link rewrite", () => {
  it("marks accent-background #hero anchors with data-ss-primary-cta", () => {
    const main = setupMain(`
      <section>
        <a href="#hero" style="background: oklch(0.605 0.155 35); color: #fff;">Собрать сайт за 2 часа</a>
      </section>
    `);
    render(<CanonCtaBindings />);
    const cta = main.querySelector<HTMLAnchorElement>("a[href='#hero']")!;
    expect(cta.dataset["ssPrimaryCta"]).toBe("1");
    main.remove();
  });

  it("does NOT tag #hero anchors without accent background (brand-mark, nav-link)", () => {
    const main = setupMain(`
      <section>
        <a href="#hero" style="text-decoration: none; color: inherit;">Brand</a>
        <a href="#hero" style="background: oklch(0.605 0.155 35); color: #fff;">Primary CTA</a>
      </section>
    `);
    render(<CanonCtaBindings />);
    const anchors = main.querySelectorAll<HTMLAnchorElement>("a[href='#hero']");
    expect(anchors).toHaveLength(2);
    /* First anchor — no inline background — must NOT be tagged. */
    expect(anchors[0]!.dataset["ssPrimaryCta"]).toBeUndefined();
    /* Second anchor — has accent background — must BE tagged. */
    expect(anchors[1]!.dataset["ssPrimaryCta"]).toBe("1");
    main.remove();
  });

  it("rewrites client-admin-demo.html links to /admin-demo", () => {
    const main = setupMain(`
      <section>
        <a href="client-admin-demo.html">Посмотреть демо ЛК</a>
        <a href="./client-admin-demo.html">Альтернативный относительный путь</a>
      </section>
    `);
    render(<CanonCtaBindings />);
    const links = main.querySelectorAll<HTMLAnchorElement>("a");
    expect(links).toHaveLength(2);
    for (const link of Array.from(links)) {
      expect(link.getAttribute("href")).toBe("/admin-demo");
    }
    main.remove();
  });

  it("returns null (renders nothing into the DOM)", () => {
    setupMain("");
    const { container } = render(<CanonCtaBindings />);
    expect(container.firstChild).toBeNull();
  });

  it("does not crash when <main> is absent", () => {
    /* Pre-mount: ensure no <main> exists. */
    document.querySelectorAll("main").forEach((m) => m.remove());
    expect(() => render(<CanonCtaBindings />)).not.toThrow();
  });
});
