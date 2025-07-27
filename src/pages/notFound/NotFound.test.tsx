import { render, screen } from "@testing-library/react";
import NotFound from "@pages/notFound/NotFound.tsx";

describe("NotFound", () => {
  it("should render text", () => {
    render(<NotFound />);

    expect(screen.getByText("404 - Page not found")).toBeInTheDocument();
  });
});
