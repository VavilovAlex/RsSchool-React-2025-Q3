import type { BookSearchResponse } from "@api/book/models.ts";
import Spinner from "@components/spinner/Spinner.tsx";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_PAGE,
  QUERY_PAGE_SIZE,
} from "@components/searchPage/components/apiSearch/ApiSearch.constants.ts";
import Paginator from "@components/paginator/Paginator.tsx";
import ApiResult from "@components/searchPage/components/apiResults/apiResult/ApiResult.tsx";
import { useTranslations } from "next-intl";

interface Props {
  result: BookSearchResponse | null;
}

export default function ApiResults(props: Props) {
  const { result } = props;

  const t = useTranslations("SearchPage");

  const totalCount = result == null ? 0 : result.numFound;

  return (
    <div className={"flex flex-col h-full overflow-auto"}>
      <div className={"overflow-auto"}>
        <table className={"default-table"}>
          <thead>
            <tr>
              <th>{t("thNumber")}</th>
              <th>{t("thName")}</th>
              <th>{t("thYear")}</th>
              <th>{t("thAuthors")}</th>
              <th>{t("thOpenLibrary")}</th>
            </tr>
          </thead>
          <tbody>
            {result == null ? (
              <tr>
                <td colSpan={5}>
                  <div
                    role={"spinner"}
                    className={
                      "flex justify-center items-center mt-4 h-[200px]"
                    }
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
                      {t("noResults")}
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
