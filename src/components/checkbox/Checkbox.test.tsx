import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "./";

describe("Checkbox", () => {
  it("renders a checkbox and toggles via label", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept" name="terms" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(label).toHaveAttribute("for", checkbox.id);

    expect(checkbox).not.toBeChecked();
    await user.click(label);
    expect(checkbox).toBeChecked();
  });

  it("supports controlled checked prop and onChange", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox checked={false} onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Checkbox className="custom" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom");
  });

  it("copies name to id when id is not provided", () => {
    render(<Checkbox name="agree" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "agree");
    expect(checkbox).toHaveAttribute("id", "agree");
  });

  it("generates an id when neither id nor name provided and associates label", () => {
    render(<Checkbox label="I agree" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("I agree");
    expect(checkbox.id).toBeTruthy();
    expect(label).toHaveAttribute("for", checkbox.id);
  });
});
