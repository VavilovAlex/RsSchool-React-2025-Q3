import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "./SearchPage";
import renderWithRouter from "@/test-utils/renderWithRouter.tsx";

const render = renderWithRouter;

describe("SearchPage", () => {
  it("renders Search, Results and Test sections", () => {
    render(<SearchPage />);

    expect(screen.getByRole("heading", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Results" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Test" })).toBeInTheDocument();
  });

  it("throws error when the Test button is clicked", () => {
    render(<SearchPage />);
    const btn = screen.getByRole("button", { name: /trigger error boundary/i });

    expect(() => fireEvent.click(btn)).toThrow("Test error");
  });
});
