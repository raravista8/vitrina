import "@testing-library/jest-dom/vitest";

import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the metrika wrapper so we can assert goal calls without a counter ID.
vi.mock("@/lib/metrika", () => ({ reachGoal: vi.fn() }));

import { MetrikaGoals } from "@/components/MetrikaGoals";
import { reachGoal } from "@/lib/metrika";

const reachGoalMock = vi.mocked(reachGoal);

// Capture the IntersectionObserver callback so tests can drive it manually
// (jsdom has no real IntersectionObserver).
let ioCallback: IntersectionObserverCallback | null = null;
const observed: Element[] = [];

beforeEach(() => {
  reachGoalMock.mockClear();
  ioCallback = null;
  observed.length = 0;
  // Class mock — the component calls `new IntersectionObserver(...)`, so an
  // arrow fn (non-constructable) won't do.
  class IOMock {
    constructor(cb: IntersectionObserverCallback) {
      ioCallback = cb;
    }
    observe(el: Element) {
      observed.push(el);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  globalThis.IntersectionObserver = IOMock as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  document.body.innerHTML = "";
});

function mount(html: string) {
  const host = document.createElement("div");
  host.innerHTML = html;
  document.body.appendChild(host);
  render(<MetrikaGoals />);
  return host;
}

describe("MetrikaGoals — section views (IntersectionObserver)", () => {
  it("fires examples_view once when the section intersects", () => {
    const host = mount('<div data-section="examples">Examples</div>');
    const el = host.querySelector('[data-section="examples"]')!;
    // Drive the IO callback as if the section scrolled into view.
    ioCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(reachGoalMock).toHaveBeenCalledWith("examples_view");
    // Second intersection must NOT re-fire (one-shot).
    ioCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(reachGoalMock.mock.calls.filter((c) => c[0] === "examples_view")).toHaveLength(1);
  });

  it("does not fire for a non-intersecting entry", () => {
    const host = mount('<div data-section="pricing">Pricing</div>');
    const el = host.querySelector('[data-section="pricing"]')!;
    ioCallback!(
      [{ isIntersecting: false, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(reachGoalMock).not.toHaveBeenCalledWith("pricing_view");
  });
});

describe("MetrikaGoals — secondary click delegation", () => {
  it("faq_open fires when a closed FAQ <summary> is clicked", () => {
    const host = mount(
      '<div data-section="faq"><details><summary>Как это работает?</summary><p>…</p></details></div>',
    );
    fireEvent.click(host.querySelector("summary")!);
    expect(reachGoalMock).toHaveBeenCalledWith("faq_open", { question: "Как это работает?" });
  });

  it("feedback_open attributes source by context", () => {
    const host = mount(`
      <footer><a href="/feedback">Обратная связь</a></footer>
      <div data-section="sources"><a href="/feedback">Не нашли свою? Напишите →</a></div>
    `);
    fireEvent.click(host.querySelector("footer a")!);
    expect(reachGoalMock).toHaveBeenCalledWith("feedback_open", { source: "footer" });
    fireEvent.click(host.querySelector('[data-section="sources"] a')!);
    expect(reachGoalMock).toHaveBeenCalledWith("feedback_open", { source: "sources" });
  });

  it("login_click + analytics_demo_click fire on their hrefs", () => {
    const host = mount('<a href="/login">Войти</a><a href="/admin-demo">Демо</a>');
    fireEvent.click(host.querySelector('a[href="/login"]')!);
    expect(reachGoalMock).toHaveBeenCalledWith("login_click");
    fireEvent.click(host.querySelector('a[href="/admin-demo"]')!);
    expect(reachGoalMock).toHaveBeenCalledWith("analytics_demo_click");
  });

  it("returns null (no DOM output)", () => {
    const { container } = render(<MetrikaGoals />);
    expect(container.firstChild).toBeNull();
  });
});
