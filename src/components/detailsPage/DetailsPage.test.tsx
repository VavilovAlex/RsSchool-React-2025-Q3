import renderWithRedux from "@/test-utils/renderWithRedux.tsx";
import { describe, vi } from "vitest";
import { act, screen, waitFor } from "@testing-library/react";
import { QUERY_DETAILS_ID } from "@components/detailsPage/DetailsPage.constants.ts";

import server, { FAKE_DETAILS_API_RESPONSE } from "@/_test_/mocks/server.ts";
import { DetailsPage } from "@components/detailsPage/DetailsPage.tsx";
import mockRouter from "next-router-mock";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const details = FAKE_DETAILS_API_RESPONSE;
const render = renderWithRedux;

describe("DetailsPage", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await mockRouter.push("/");
  });

  it("doesn't render when no query parameter", async () => {
    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });
  });

  it("renders when detailsId query parameter is present", async () => {
    await mockRouter.push(`/?${QUERY_DETAILS_ID}=...`);

    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.getByText("Details")).toBeInTheDocument();
    });
  });

  it("renders details retrieved from api", async () => {
    const fakeKey = "fakeKey";

    await mockRouter.push(`/?${QUERY_DETAILS_ID}=${fakeKey}`);

    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(details.title)).toBeInTheDocument();
      expect(
        screen.getByText(details.description.toString()),
      ).toBeInTheDocument();
    });
  });

  it("removes parameter from url on close click", async () => {
    const fakeKey = "fakeKey";

    await mockRouter.push(`/?${QUERY_DETAILS_ID}=${fakeKey}`);

    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(details.title)).toBeInTheDocument();
    });

    act(() => {
      const closeButton = screen.getByRole("button", { name: "Close" });
      closeButton.click();
    });

    expect(mockRouter).toMatchObject({
      asPath: "/",
    });
  });
});
