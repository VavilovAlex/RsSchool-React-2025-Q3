import renderWithRouterAndRedux from "@/test-utils/renderWithRouterAndRedux.tsx";
import { describe, it, expect } from "vitest";
import { act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPageLayout from "@components/searchPage/SearchPageLayout.tsx";
import LocationDisplay from "@/test-utils/LocationDisplay.tsx";
import { QUERY_DETAILS_ID } from "@components/detailsPage/DetailsPage.constants.ts";

const render = renderWithRouterAndRedux;

describe("SearchPageLayout", () => {
  it("renders Search and Results sections", () => {
    render(<SearchPageLayout />);

    expect(screen.getByRole("heading", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Results" }),
    ).toBeInTheDocument();
  });

  it("resets detailsId query parameter when clicked within", () => {
    render(
      <>
        <SearchPageLayout />
        <LocationDisplay />
      </>,
      {
        routerOptions: {
          initialEntries: [`/?${QUERY_DETAILS_ID}=1`],
        },
      },
    );

    expect(screen.getByTestId("search")).toHaveTextContent(
      `?${QUERY_DETAILS_ID}=1`,
    );

    const container = screen.getByTestId("search-page-layout");

    act(() => {
      container.click();
    });

    expect(screen.getByTestId("search")).toHaveTextContent(``);
  });
});
