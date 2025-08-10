import renderWithRouterAndRedux from "@/test-utils/renderWithRouterAndRedux.tsx";
import { describe, vi } from "vitest";
import { DetailsPage } from "@pages/detailsPage/DetailsPage.tsx";
import { act, screen, waitFor } from "@testing-library/react";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";

import server, { FAKE_DETAILS_API_RESPONSE } from "@/_test_/mocks/server.ts";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const details = FAKE_DETAILS_API_RESPONSE;
const render = renderWithRouterAndRedux;

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

    render(<DetailsPage />, {
      routerOptions: { initialEntries: [`/?${QUERY_DETAILS_ID}=${fakeKey}`] },
    });

    await waitFor(() => {
      expect(screen.getByText(details.title)).toBeInTheDocument();
      expect(
        screen.getByText(details.description.toString()),
      ).toBeInTheDocument();
    });
  });

  it("closes on close button click", async () => {
    const fakeKey = "fakeKey";

    render(<DetailsPage />, {
      routerOptions: { initialEntries: [`/?${QUERY_DETAILS_ID}=${fakeKey}`] },
    });

    await waitFor(() => {
      expect(screen.getByText(details.title)).toBeInTheDocument();
    });

    act(() => {
      const closeButton = screen.getByRole("button", { name: "Close" });
      closeButton.click();
    });

    await waitFor(() => {
      expect(screen.queryByText(details.title)).not.toBeInTheDocument();
    });
  });
});
