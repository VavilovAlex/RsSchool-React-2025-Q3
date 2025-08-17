import renderWithReduxAndLocale from "@/test-utils/renderWithReduxAndLocale.tsx";
import { describe, it, expect } from "vitest";
import { act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPageLayout from "@components/searchPage/SearchPageLayout.tsx";
import { QUERY_DETAILS_ID } from "@components/detailsPage/DetailsPage.constants.ts";
import mockRouter from "next-router-mock";

const render = renderWithReduxAndLocale;

describe("SearchPageLayout", () => {
  it("renders Search and Results sections", () => {
    render(<SearchPageLayout />);

    expect(screen.getByRole("heading", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Results" }),
    ).toBeInTheDocument();
  });

  it("resets detailsId query parameter when clicked within", () => {
    mockRouter.push(`/?${QUERY_DETAILS_ID}=1`);

    render(
      <>
        <SearchPageLayout />
      </>,
    );

    expect(mockRouter).toMatchObject({
      query: {
        [QUERY_DETAILS_ID]: "1",
      },
    });

    const container = screen.getByTestId("search-page-layout");

    act(() => {
      container.click();
    });

    expect(mockRouter).toMatchObject({
      query: {},
    });
  });
});
