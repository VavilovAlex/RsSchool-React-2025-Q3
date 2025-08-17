import { render, screen } from "@testing-library/react";
import NotFoundMessage from "./page.tsx";

describe("NotFound", () => {
  it("should render text", () => {
    render(<NotFoundMessage />);

    expect(screen.getByText("404 - Page not found")).toBeInTheDocument();
  });
});
