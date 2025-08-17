import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders a text input", () => {
    render(<TextInput value={""} onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("uses the value when provided", () => {
    render(<TextInput value="hello" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TextInput onChange={onChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "abc");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("applies custom className", () => {
    const customClass = "test-class";

    render(
      <TextInput className={customClass} value={""} onChange={() => {}} />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(customClass);
  });
});
