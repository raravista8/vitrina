import "@testing-library/jest-dom/vitest";

// Recharts (`AnalyticsSection`) uses `ResponsiveContainer`, which queries
// `ResizeObserver` on mount. jsdom не имеет implementation — добавляем
// minimal stub чтобы тесты smoke / Hero / AnalyticsSection не падали с
// `ReferenceError: ResizeObserver is not defined`.
//
// API surface: observe/unobserve/disconnect — no-ops. Components,
// тестируемые в нашем suite, не зависят от real-resize events, поэтому
// noop достаточно. Real размер контейнера в jsdom всегда 0×0, что
// означает Recharts рендерит без svg-children — это OK для test'ов,
// они проверяют React tree mounting, не graphical output.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserverStub {
    observe(): void {
      /* noop */
    }
    unobserve(): void {
      /* noop */
    }
    disconnect(): void {
      /* noop */
    }
  };
}

// jsdom не имеет `window.matchMedia` — нужен для `lib/use-is-mobile.ts`
// (SubmitModal instant-preview steps передают canon'у `mobile` prop).
// Stub всегда matches=false → тесты рендерят desktop-вариант шагов.
if (typeof window !== "undefined" && typeof window.matchMedia === "undefined") {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
