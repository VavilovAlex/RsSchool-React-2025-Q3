import "@/App.css";
import ErrorBoundary from "@components/errorBoundary/ErrorBoundary.tsx";
import { HashRouter, Route, Routes } from "react-router";
import NotFound from "@pages/notFound/NotFound.tsx";
import About from "@pages/about/About.tsx";
import Navbar from "@components/navbar/Navbar.tsx";
import { ROUTES } from "@pages/routes.ts";
import SearchPageLayout from "@pages/searchPage/SearchPageLayout.tsx";
import { DetailsPage } from "@pages/detailsPage/DetailsPage.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <ErrorBoundary>
          <HashRouter>
            <div className={"w-screen h-screen flex flex-col overflow-hidden"}>
              <Navbar />
              <Routes>
                <Route path={ROUTES.Home()} element={<SearchPageLayout />}>
                  <Route index element={<DetailsPage />} />
                </Route>
                <Route path={ROUTES.About} element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </HashRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}
