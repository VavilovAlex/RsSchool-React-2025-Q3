import { useSearchParams } from "react-router";
import { useMemo } from "react";
import type { PaginationOptions } from "@shared/types/pagination.ts";
import { parseIntOrDefault } from "@shared/utils/parse.ts";
import PageButton from "@components/paginator/PageButton.tsx";

interface Props {
  queryPage: string;
  queryPageSize: string;
  defaultPage: number;
  defaultPageSize: number;
  totalCount: number;
  maxPages?: number;
}

export default function Paginator(props: Props) {
  const {
    queryPage,
    queryPageSize,
    defaultPage,
    defaultPageSize,
    totalCount = 0,
    maxPages = 10,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const pagination = useMemo<PaginationOptions>(
    () => ({
      page: parseIntOrDefault(searchParams.get(queryPage), defaultPage),
      pageSize: parseIntOrDefault(
        searchParams.get(queryPageSize),
        defaultPageSize,
      ),
    }),
    [defaultPage, defaultPageSize, queryPage, queryPageSize, searchParams],
  );

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pagination.pageSize);
  }, [totalCount, pagination]);

  const pages = useMemo(() => {
    if (totalPages <= 0) return [];
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
  }, [totalPages, pagination.page, maxPages]);

  const handlePageClick = (pageNum: number) => {
    setSearchParams((params) => {
      params.set(queryPage, String(pageNum));
      params.set(queryPageSize, String(pagination.pageSize));
      return params;
    });
  };

  return (
    <div className={"flex justify-center mt-3"}>
      {totalPages > 1 && (
        <div className={"flex gap-2"}>
          {pages.map((pageNum) => (
            <PageButton
              key={pageNum}
              current={pageNum === pagination.page}
              pageNum={pageNum}
              onClick={handlePageClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
