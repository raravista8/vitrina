import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HomePage from "@/app/page";
import { INTAKE2_EVENT, type Intake2OpenDetail } from "@/components/intake2/host";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("landing v5 smoke (canon 0.12.0 «Витрина v5 · Фарфор и лак»)", () => {
  it("renders the v5 H1 «Сайт для бьюти-мастера за 2 часа»", () => {
    render(<HomePage />);
    // Копи в каноне несёт nbsp («за 2 часа») — матчим по
    // устойчивому префиксу без переносимых пробелов.
    expect(
      screen.getByRole("heading", { level: 1, name: /Сайт для бьюти-мастера/i }),
    ).toBeInTheDocument();
  });

  it("hero CTA dispatches the intake2 open event with entry='hero' and fires form_open into dataLayer", () => {
    const { container } = render(<HomePage />);

    const detail = vi.fn();
    const onOpen = (e: Event) => detail((e as CustomEvent<Intake2OpenDetail>).detail);
    window.addEventListener(INTAKE2_EVENT, onOpen);
    window.dataLayer = [];

    const cta = container.querySelector("button[data-entry='hero']");
    expect(cta).not.toBeNull();
    fireEvent.click(cta as Element);

    window.removeEventListener(INTAKE2_EVENT, onOpen);

    expect(detail).toHaveBeenCalledWith({ entry: "hero" });
    // ssTrack пушит цель в dataLayer даже без Metrika counter ID.
    expect(window.dataLayer).toContainEqual({ event: "form_open", entry: "hero" });
  });

  it("renders the FAQPage JSON-LD from canon FAQ_ITEMS", () => {
    const { container } = render(<HomePage />);
    const script = container.querySelector("script[type='application/ld+json']");
    expect(script).not.toBeNull();
    const parsed = JSON.parse(script?.textContent ?? "{}") as {
      "@type": string;
      mainEntity: unknown[];
    };
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity.length).toBeGreaterThanOrEqual(9);
  });
});
