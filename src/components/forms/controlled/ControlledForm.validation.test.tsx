import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ControlledForm from ".";
import { withProviders } from "@/test-utils.tsx";

describe("ControlledForm validation", () => {
  it("renders required fields and validates errors and clearing", async () => {
    const { Wrapper } = withProviders(<ControlledForm onCancel={() => {}} />);
    render(<ControlledForm onCancel={() => {}} />, { wrapper: Wrapper });
    const user = userEvent.setup();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/attachment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /submit/i });
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText(/name/i), "john");
    await user.click(screen.getByLabelText(/age/i));
    expect(await screen.findByText(/must start with a capital/i)).toBeVisible();

    await user.clear(screen.getByLabelText(/name/i));
    await user.type(screen.getByLabelText(/name/i), "John");
    expect(screen.queryByText(/must start with a capital/i)).toBeNull();
  });
});
