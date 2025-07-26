import "./App.css";
import SearchPage from "./pages/searchPage/SearchPage.tsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx";

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </>
  );
}
