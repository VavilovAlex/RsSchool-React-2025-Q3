import { describe, expect } from "vitest";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { render, screen } from "@testing-library/react";

const ThrowOnRender = () => {
  throw new Error("Test error");
};

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
});
