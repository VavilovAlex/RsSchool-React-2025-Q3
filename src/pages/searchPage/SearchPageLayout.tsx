import SearchPage from "@pages/searchPage/SearchPage.tsx";
import { Outlet, useSearchParams } from "react-router";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";

export default function SearchPageLayout() {
  const setSearchParams = useSearchParams()[1];

  const closeDetails = () => {
    setSearchParams((params) => {
      params.delete(QUERY_DETAILS_ID);
      return params;
    });
  };

  return (
    <div
      data-testid="search-page-layout"
      className={"flex justify-center w-full h-full p-4 gap-5 overflow-auto"}
      onClick={closeDetails}
    >
      <SearchPage />
      <Outlet />
    </div>
  );
}
