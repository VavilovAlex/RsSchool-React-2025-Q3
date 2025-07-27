import renderWithRouter from "@/test-utils/renderWithRouter.tsx";
import { describe, vi } from "vitest";
import { DetailsPage } from "@pages/detailsPage/DetailsPage.tsx";
import { screen, waitFor } from "@testing-library/react";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";
import { getBook } from "@api/book/client.ts";
import type { BookDetailsResponse } from "@api/book/models.ts";

const render = renderWithRouter;

vi.mock("@api/book/client");

const mockedGetBook = vi.mocked(getBook);

describe("DetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("doesn't render when no query parameter", async () => {
    render(<DetailsPage />, { routerOptions: { initialEntries: [`/`] } });

    await waitFor(() => {
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });
  });

  it("renders when detailsId query parameter is present", async () => {
    render(<DetailsPage />, {
      routerOptions: { initialEntries: [`/?${QUERY_DETAILS_ID}=...`] },
    });

    await waitFor(() => {
      expect(screen.getByText("Details")).toBeInTheDocument();
    });
  });

  it("renders details retrieved from api", async () => {
    const fakeKey = "fakeKey";

    const details: BookDetailsResponse = {
      key: fakeKey,
      subjects: [],
      title: "My Book",
      description: "My Book Description",
    };

    mockedGetBook.mockResolvedValue(details);

    render(<DetailsPage />, {
      routerOptions: { initialEntries: [`/?${QUERY_DETAILS_ID}=${fakeKey}`] },
    });

    await waitFor(() => {
      expect(screen.getByText(details.title)).toBeInTheDocument();
      expect(screen.getByText(details.description || "")).toBeInTheDocument();

      expect(mockedGetBook).toHaveBeenCalledWith(fakeKey);
    });
  });
});
