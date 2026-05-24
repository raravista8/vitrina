import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// HomePage → SiteHeader → useRouter — stub for jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

import HomePage from "@/app/page";

describe("scaffolding smoke", () => {
  it("renders the canonical H1 (v2 three-«сам» pattern)", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /сам себя соберёт/i }),
    ).toBeInTheDocument();
  });
});
