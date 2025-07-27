import SearchPage from "@pages/searchPage/SearchPage.tsx";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";

export default function SearchPageLayout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const closeDetails = () => {
    searchParams.delete(QUERY_DETAILS_ID);
    navigate({ search: searchParams.toString() });
  };

  return (
    <div
      data-testid="search-page-layout"
      className={"flex justify-center w-full h-full p-4 gap-5"}
      onClick={closeDetails}
    >
      <SearchPage />
      <Outlet />
    </div>
  );
}
