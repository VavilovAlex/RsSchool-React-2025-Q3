import { render, screen } from "@testing-library/react";
import { vi, it, expect, afterEach } from "vitest";
import Page from "./page";

afterEach(() => vi.clearAllMocks());

it("renders author", async () => {
  const el = await Page();
  render(el);
  expect(screen.getByText("My name is Alex")).toBeInTheDocument();
});
