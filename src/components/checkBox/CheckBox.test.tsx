import { act, render, screen } from "@testing-library/react";
import CheckBox from "@components/checkBox/CheckBox.tsx";

describe("CheckBox", () => {
  it('renders input type="checkbox"', () => {
    const checked = false;
    const onChange = vi.fn();

    render(<CheckBox checked={checked} onChange={onChange} />);

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is checked when checked prop is true", () => {
    const checked = true;
    const onChange = vi.fn();

    render(<CheckBox checked={checked} onChange={onChange} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is not checked when checked prop is false", () => {
    const checked = false;
    const onChange = vi.fn();

    render(<CheckBox checked={checked} onChange={onChange} />);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const checked = false;
    const onChange = vi.fn();

    render(<CheckBox checked={checked} onChange={onChange} />);

    act(() => {
      screen.getByRole("checkbox").click();
    });

    expect(onChange).toHaveBeenCalled();
  });
});
