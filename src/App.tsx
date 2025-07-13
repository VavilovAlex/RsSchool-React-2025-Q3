import "./App.css";
import { Component } from "react";
import SearchPage from "./pages/searchPage/SearchPage.tsx";
import ErrorBoundary from "./components/errorBoundary/errorBoundary.tsx";

class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
