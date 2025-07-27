import "@/App.css";
import SearchPage from "@pages/searchPage/SearchPage.tsx";
import ErrorBoundary from "@components/errorBoundary/ErrorBoundary.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "@pages/notFound/NotFound.tsx";
import About from "@pages/about/About.tsx";
import Navbar from "@components/navbar/Navbar.tsx";
import { ROUTES } from "@pages/routes.ts";

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={ROUTES.Home()} element={<SearchPage />} />
            <Route path={ROUTES.About} element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}
