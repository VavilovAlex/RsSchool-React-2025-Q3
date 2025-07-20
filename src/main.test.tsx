import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";

describe("main", () => {
  it("renders into #root", async () => {
    document.body.innerHTML = `<div id="root"></div>`;

    const root = document.querySelector("#root");

    expect(root).toBeInTheDocument();
    expect(root?.children.length).toBe(0);

    await act(() => import("./main"));

    expect(root).toBeInTheDocument();
    expect(root?.children.length).toBeGreaterThan(0);
  });
});
