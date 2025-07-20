import { describe, expect } from "vitest";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { act, render, screen } from "@testing-library/react";

describe("ErrorBoundary", () => {
  it("renders when no error", () => {
    render(
      <ErrorBoundary>
        <div role={"test"}>Test</div>
      </ErrorBoundary>,
    );
    expect(screen.getByRole("test")).toHaveTextContent("Test");
  });

  it("renders error message when child throws", () => {
    const ThrowOnRender = () => {
      throw new Error("Test error");
    };

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("reloads on button click", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    let throwCount = 0;

    const ThrowOnRender = () => {
      throwCount++;
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    );

    expect(screen.queryByText(/Something went wrong/i)).toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalled();
    expect(throwCount).toBeGreaterThan(0);

    throwCount = 0;

    act(() => screen.getByRole("button", { name: /reload/i }).click());
    expect(throwCount).toBeGreaterThan(0);
    expect(screen.queryByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
