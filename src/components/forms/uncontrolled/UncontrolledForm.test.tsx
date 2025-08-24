import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UncontrolledForm from ".";
import { withProviders } from "@/test-utils.tsx";

describe("UncontrolledForm", () => {
  it("submits valid data, dispatches to store and calls onCancel", async () => {
    const onCancel = vi.fn();
    const { Wrapper, store } = withProviders(
      <UncontrolledForm onCancel={onCancel} />,
    );

    render(<UncontrolledForm onCancel={onCancel} />, { wrapper: Wrapper });

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), "John");
    await user.clear(screen.getByLabelText(/age/i));
    await user.type(screen.getByLabelText(/age/i), "30");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "Aa1!");
    await user.type(screen.getByLabelText(/repeat password/i), "Aa1!");

    await user.selectOptions(screen.getByLabelText(/gender/i), "male");

    const file = new File(["hello"], "hello.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/attachment/i) as HTMLInputElement;
    await user.upload(fileInput, file);

    await user.type(screen.getByLabelText(/country/i), "Australia");

    await user.click(screen.getByLabelText(/i agree to the terms/i));

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));

    const state = store.getState();
    expect(state.submissions.items).toHaveLength(1);
    expect(state.submissions.items[0].attachment).toMatch(
      /^data:image\/(jpeg|jpg);base64,/,
    );
  });
});
