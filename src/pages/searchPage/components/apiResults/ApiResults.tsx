import type { BookSearchResponse } from "@api/book/models.ts";
import Spinner from "@components/spinner/Spinner.tsx";
import TextLink from "@components/link/TextLink.tsx";
import { useMemo } from "react";
import type { PaginationOptions } from "@shared/types/pagination.ts";
import { parseIntOrDefault } from "@shared/utils/parse.ts";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_PAGE,
  QUERY_PAGE_SIZE,
} from "@pages/searchPage/components/apiSearch/ApiSearch.constants.ts";
import { Link, useSearchParams, useNavigate } from "react-router";
import { ROUTES } from "@pages/routes.ts";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";

interface Props {
  result: BookSearchResponse | null;
}

export default function ApiResults(props: Props) {
  const { result } = props;

  const [searchParams] = useSearchParams();

  const pagination = useMemo<PaginationOptions>(
    () => ({
      page: parseIntOrDefault(searchParams.get(QUERY_PAGE), DEFAULT_PAGE),
      pageSize: parseIntOrDefault(
        searchParams.get(QUERY_PAGE_SIZE),
        DEFAULT_PAGE_SIZE,
      ),
    }),
    [searchParams],
  );

  const totalPages = useMemo(() => {
    if (result == null) return 0;
    return Math.ceil(result.numFound / pagination.pageSize);
  }, [result, pagination]);

  const pages = useMemo(() => {
    if (totalPages <= 0) return [];
    const maxPages = 10;
    const currentPage = pagination.page;

    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let end = start + maxPages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [totalPages, pagination.page]);

  const navigate = useNavigate();
  const openDetails = (id: string) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set(QUERY_DETAILS_ID, id);
    navigate({ search: currentSearchParams.toString() });
  };

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
                  onClick={() => openDetails(book.key)}
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
      <div className={"flex justify-center mt-3"}>
        {totalPages > 1 && (
          <div className={"flex gap-2"}>
            {pages.map((pageNum) => (
              <Link
                key={pageNum}
                to={ROUTES.Home(pageNum, pagination.pageSize)}
              >
                <div className={"bg-blue-500 text-white rounded p-1"}>
                  {pageNum}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
