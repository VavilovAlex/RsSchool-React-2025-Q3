import "./App.css";
import "styles/components/tables.css";
import { Component } from "react";
import SearchPage from "./pages/searchPage/SearchPage.tsx";

class App extends Component {
  render() {
    return (
      <>
        <SearchPage />
      </>
    );
  }
}

export default App;
