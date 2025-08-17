"use client";

import SearchPage from "@components/searchPage/SearchPage.tsx";
import { QUERY_DETAILS_ID } from "@components/detailsPage/DetailsPage.constants.ts";
import { DetailsPage } from "@components/detailsPage/DetailsPage.tsx";
import { useMutableSearchParams } from "@/hooks/useMutableSearchParams.tsx";

export default function SearchPageLayout() {
  const { setSearchParams } = useMutableSearchParams();

  const closeDetails = async () => {
    setSearchParams([{ key: QUERY_DETAILS_ID, value: null }]);
  };

  return (
    <div
      data-testid="search-page-layout"
      className={"flex justify-center w-full h-full p-4 gap-5 overflow-auto"}
      onClick={closeDetails}
    >
      <SearchPage />
      <DetailsPage />
    </div>
  );
}
