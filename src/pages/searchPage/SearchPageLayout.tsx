import SearchPage from "@pages/searchPage/SearchPage.tsx";
import { Outlet } from "react-router";

export default function SearchPageLayout() {
  return (
    <div className={"flex justify-center w-full h-full p-4 gap-5"}>
      <SearchPage />
      <Outlet />
    </div>
  );
}
