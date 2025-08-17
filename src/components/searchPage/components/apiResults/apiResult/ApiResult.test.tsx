import renderWithReduxAndLocale, {
  type Options,
} from "@/test-utils/renderWithReduxAndLocale.tsx";
import ApiResult from "@components/searchPage/components/apiResults/apiResult/ApiResult.tsx";
import type { Book } from "@api/book/models.ts";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  selectBook,
  unselectBook,
} from "@components/searchPage/components/apiResults/apiResultsSlice.ts";

const render = renderWithReduxAndLocale;

const book: Book = {
  authors: [
    {
      id: "555",
      name: "Bob Johnson",
    },
  ],
  firstPublishYear: 2000,
  key: "ABC123",
  languages: ["en"],
  title: "Book Title",
};

const renderApiResult = (book: Book, options?: Options) =>
  render(
    <table>
      <tbody>
        <ApiResult book={book} />
      </tbody>
    </table>,
    options,
  );

describe("ApiResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render book info", () => {
    renderApiResult(book);

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(
      screen.getByText(book.firstPublishYear.toString()),
    ).toBeInTheDocument();
    expect(screen.getByText(book.authors[0].name)).toBeInTheDocument();
  });

  it("should not be checked by default", () => {
    renderApiResult(book);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("should use selection state from redux", () => {
    renderApiResult(book, {
      reduxOptions: {
        preloadedState: {
          apiResults: {
            selectedBooks: [book],
          },
        },
      },
    });

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("should dispatch selectBook action checkbox ticked", async () => {
    const result = renderApiResult(book, {
      reduxOptions: {
        spySetup: (s) => {
          vi.spyOn(s, "dispatch");
        },
      },
    });

    const store = result.store;

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(selectBook(book));
  });

  it("should dispatch unselectBook action checkbox unticked", async () => {
    const result = renderApiResult(book, {
      reduxOptions: {
        spySetup: (s) => {
          vi.spyOn(s, "dispatch");
        },
        preloadedState: {
          apiResults: {
            selectedBooks: [book],
          },
        },
      },
    });

    const store = result.store;

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(unselectBook(book));
  });
});
