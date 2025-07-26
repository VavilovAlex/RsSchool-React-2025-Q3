import "./App.css";
import SearchPage from "./pages/searchPage/SearchPage.tsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./pages/notFound/NotFound.tsx";

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}
