import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";
import mockRouter from "next-router-mock";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<
    typeof import("next-router-mock/navigation")
  >("next-router-mock/navigation");
  return {
    ...actual,
  };
});

afterEach(() => {
  cleanup();
  mockRouter.reset();
});
