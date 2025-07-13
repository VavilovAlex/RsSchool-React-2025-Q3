import { Component } from "react";
import ApiSearch from "./components/ApiSearch.tsx";
import ApiResults from "./components/ApiResults.tsx";
import Section from "./components/Section.tsx";
import type { BookSearchResponse } from "../../api/book/models.ts";

interface State {
  response: BookSearchResponse | null;
}

export default class SearchPage extends Component<object, State> {
  state: State = {
    response: null,
  };

  handleSearchSuccess = (response: BookSearchResponse) => {
    this.setState({ response });
  };

  handleSearchStart = () => {
    this.setState({ response: null });
  };

  render() {
    const { response } = this.state;

    return (
      <div className={"flex flex-col items-center w-full h-full p-4"}>
        <div className={"flex flex-col gap-4 max-w-[1200px] w-full"}>
          <Section title={"Search"}>
            <ApiSearch
              onSearchStart={this.handleSearchStart}
              onSearchSuccess={this.handleSearchSuccess}
            />
          </Section>
          <Section title={"Results"}>
            <ApiResults result={response} />
          </Section>
        </div>
      </div>
    );
  }
}
