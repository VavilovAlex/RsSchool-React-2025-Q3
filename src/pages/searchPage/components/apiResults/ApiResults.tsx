import type { BookSearchResponse } from "@api/book/models.ts";
import Spinner from "@components/spinner/Spinner.tsx";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_PAGE,
  QUERY_PAGE_SIZE,
} from "@pages/searchPage/components/apiSearch/ApiSearch.constants.ts";
import Paginator from "@components/paginator/Paginator.tsx";
import ApiResult from "@pages/searchPage/components/apiResults/apiResult/ApiResult.tsx";

interface Props {
  result: BookSearchResponse | null;
}

export default function ApiResults(props: Props) {
  const { result } = props;

  const totalCount = result == null ? 0 : result.numFound;

  return (
    <div className={"flex flex-col h-full overflow-auto"}>
      <div className={"overflow-auto"}>
        <table className={"default-table"}>
          <thead>
            <tr>
              <th>#</th>
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
                  <ApiResult book={book} key={book.key} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
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
