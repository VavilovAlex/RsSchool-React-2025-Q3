import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AsyncButton from "./AsyncButton";

describe("AsyncButton", () => {
  it("renders button with provided text", () => {
    render(<AsyncButton>Click me</AsyncButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("forwards HTML attributes", () => {
    render(
      <AsyncButton id="my-btn" type="submit" data-test="bar">
        Submit
      </AsyncButton>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("id", "my-btn");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveAttribute("data-test", "bar");
  });

  it("is disabled when disabled prop is true", () => {
    render(<AsyncButton disabled>Disabled</AsyncButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick and disables/enables during async operation", async () => {
    let resolvePromise: () => void;
    const onClick = vi.fn(
      () =>
        new Promise<void>((res) => {
          resolvePromise = res;
        }),
    );

    render(<AsyncButton onClick={onClick}>Async</AsyncButton>);
    const btn = screen.getByRole("button");

    act(() => {
      fireEvent.click(btn);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(btn).toBeDisabled();

    await act(async () => {
      resolvePromise();
    });

    expect(btn).not.toBeDisabled();
  });

  it("warns if no onClick provided", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<AsyncButton>Click</AsyncButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(warnSpy).toHaveBeenCalledWith("onClick is not defined");
    warnSpy.mockRestore();
  });
});
