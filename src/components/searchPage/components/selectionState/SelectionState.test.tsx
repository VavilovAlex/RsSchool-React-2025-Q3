import renderWithRouterAndRedux from "@/test-utils/renderWithRouterAndRedux.tsx";
import SelectionState from "@components/searchPage/components/selectionState/SelectionState.tsx";
import type { Book } from "@api/book/models.ts";
import { beforeEach, expect } from "vitest";
import { screen } from "@testing-library/react";
import * as useDownloadHook from "@/hooks/useDownload.tsx";
import userEvent from "@testing-library/user-event";
import { clearBookSelection } from "@components/searchPage/components/apiResults/apiResultsSlice.ts";

const render = renderWithRouterAndRedux;

vi.mock("@/hooks/useDownload.tsx");
vi.mocked(useDownloadHook.useDownload).mockReturnValue([
  { blob: vi.fn() },
  undefined,
]);

const emptyBook: Book = {
  key: "",
  firstPublishYear: 0,
  title: "",
  authors: [],
  languages: [],
};

describe("SelectionState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("title renders book count from state", () => {
    render(<SelectionState />, {
      reduxOptions: {
        preloadedState: {
          apiResults: {
            selectedBooks: Array(5).fill(emptyBook),
          },
        },
      },
    });

    expect(screen.getByText("5 Book(s) selected")).toBeInTheDocument();
  });

  it("render unselect button", () => {
    render(<SelectionState />);

    expect(
      screen.getByRole("button", { name: "Unselect ALL" }),
    ).toBeInTheDocument();
  });

  it("renders Export as CSV button", () => {
    render(<SelectionState />);

    expect(
      screen.getByRole("button", { name: "Export as CSV" }),
    ).toBeInTheDocument();
  });

  it("calls download.blob on export button click", async () => {
    render(<SelectionState />);

    const exportButton = screen.getByRole("button", { name: "Export as CSV" });
    await userEvent.click(exportButton);

    expect(useDownloadHook.useDownload).toHaveBeenCalled();
  });

  it("dispatches clearBookSelection action on unselect button click", async () => {
    const result = render(<SelectionState />, {
      reduxOptions: {
        spySetup: (s) => {
          vi.spyOn(s, "dispatch");
        },
        preloadedState: {
          apiResults: {
            selectedBooks: Array(5).fill(emptyBook),
          },
        },
      },
    });
    const store = result.store;

    const unselectButton = screen.getByRole("button", { name: "Unselect ALL" });
    await userEvent.click(unselectButton);

    expect(store.dispatch).toHaveBeenCalledWith(clearBookSelection());
    expect(store.getState().apiResults.selectedBooks).toHaveLength(0);
  });
});
