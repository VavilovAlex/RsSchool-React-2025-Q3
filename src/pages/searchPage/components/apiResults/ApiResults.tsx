import type { BookSearchResponse } from "@api/book/models.ts";
import Spinner from "@components/spinner/Spinner.tsx";
import TextLink from "@components/link/TextLink.tsx";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_PAGE,
  QUERY_PAGE_SIZE,
} from "@pages/searchPage/components/apiSearch/ApiSearch.constants.ts";
import { useSearchParams } from "react-router";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";
import Paginator from "@components/paginator/Paginator.tsx";
import { type MouseEvent } from "react";

interface Props {
  result: BookSearchResponse | null;
}

export default function ApiResults(props: Props) {
  const { result } = props;

  const setSearchParams = useSearchParams()[1];

  const openDetails = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    e.stopPropagation();
    setSearchParams((params) => {
      params.set(QUERY_DETAILS_ID, id);
      return params;
    });
  };

  const totalCount = result == null ? 0 : result.numFound;

  return (
    <div>
      <table className={"default-table"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Authors</th>
            <th>Open library</th>
          </tr>
        </thead>
        <tbody>
          {result == null ? (
            <tr>
              <td colSpan={4}>
                <div
                  role={"spinner"}
                  className={"flex justify-center items-center mt-4"}
                >
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {result.books.length === 0 && (
                <tr>
                  <td colSpan={4} className={"italic"}>
                    No results found.
                  </td>
                </tr>
              )}
              {result.books.map((book) => (
                <tr
                  role={"listitem"}
                  key={book.key}
                  onClick={(e) => openDetails(e, book.key)}
                >
                  <td>{book.title}</td>
                  <td>{book.firstPublishYear}</td>
                  <td>
                    {book.authors.map((author) => author.name).join(", ")}
                  </td>
                  <td>
                    <TextLink
                      href={"https://openlibrary.org/" + book.key}
                      target={"_blank"}
                    >
                      Link
                    </TextLink>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <Paginator
        queryPage={QUERY_PAGE}
        queryPageSize={QUERY_PAGE_SIZE}
        defaultPage={DEFAULT_PAGE}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        totalCount={totalCount}
      />
    </div>
  );
}
