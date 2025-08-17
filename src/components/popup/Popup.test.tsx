import { render } from "@testing-library/react";
import Popup from "@components/popup/Popup.tsx";

describe("Popup", () => {
  it("has the opacity 100 when open", () => {
    const { getByTestId } = render(
      <Popup isOpen={true} title="Hello">
        <div>Child</div>
      </Popup>,
    );
    const popup = getByTestId("popup");
    expect(popup).toHaveClass("opacity-100");
  });

  it("has the opacity 0 when closed", () => {
    const { getByTestId } = render(
      <Popup isOpen={false} title="Hello">
        <div>Child</div>
      </Popup>,
    );
    const popup = getByTestId("popup");
    expect(popup).toHaveClass("opacity-0");
  });

  it("renders title and children", () => {
    const { getByText } = render(
      <Popup isOpen={true} title="Hello">
        <div>Child</div>
      </Popup>,
    );
    expect(getByText("Hello")).toBeInTheDocument();
    expect(getByText("Child")).toBeInTheDocument();
  });
});
