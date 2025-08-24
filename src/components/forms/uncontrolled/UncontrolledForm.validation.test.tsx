import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import UncontrolledForm from ".";
import { withProviders } from "@/test-utils.tsx";
import { act } from "react";

describe("UncontrolledForm validation", () => {
  it("shows errors on invalid submit and clears after fix", async () => {
    const { Wrapper } = withProviders(<UncontrolledForm onCancel={() => {}} />);
    render(<UncontrolledForm onCancel={() => {}} />, { wrapper: Wrapper });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "joh");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/invalid email/i)).toBeVisible();

    await user.type(screen.getByLabelText(/email/i), "joh@asd.com");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /submit/i }));
    });

    expect(screen.queryByText(/invalid email/i)).toBeNull();
  });
});
