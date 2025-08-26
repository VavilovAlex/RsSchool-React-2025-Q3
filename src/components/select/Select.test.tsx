import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Select from "./";

describe("Select", () => {
  it("renders select with options", () => {
    render(
      <Select name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
  });

  it("applies custom className", () => {
    const customClass = "test-class";
    render(
      <Select name="x" className={customClass}>
        <option value="1">One</option>
      </Select>,
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass(customClass);
  });

  it("copies name to id when id is not provided", () => {
    render(
      <Select name="country">
        <option value="us">US</option>
      </Select>,
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("name", "country");
    expect(select).toHaveAttribute("id", "country");
  });

  it("generates an id when neither id nor name provided and associates label", () => {
    render(
      <Select label="Country">
        <option value="us">US</option>
      </Select>,
    );
    const select = screen.getByRole("combobox");
    const label = screen.getByText("Country");
    expect(select.id).toBeTruthy();
    expect(label).toHaveAttribute("for", select.id);
  });

  it("changes value when user selects an option (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(
      <Select name="pet" defaultValue="cat">
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </Select>,
    );

    const select = screen.getByRole<HTMLSelectElement>("combobox");
    expect(select.value).toBe("cat");
    await user.selectOptions(select, "dog");
    expect(select.value).toBe("dog");
  });
});
