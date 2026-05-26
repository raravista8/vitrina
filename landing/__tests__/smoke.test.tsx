import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

describe("scaffolding smoke", () => {
  it("renders the canonical H1 (canon 0.6.0 — соберём за 2 часа)", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1, name: /Соберём за/i })).toBeInTheDocument();
  });
});
