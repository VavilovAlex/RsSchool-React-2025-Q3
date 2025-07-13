import { Component } from "react";
import ApiSearch from "./components/ApiSearch.tsx";
import ApiResults from "./components/ApiResults.tsx";
import Section from "./components/Section.tsx";
import type { BookSearchResponse } from "../../api/book/models.ts";
import Button from "../../components/button/Button.tsx";

interface State {
  response: BookSearchResponse | null;
  errorToThrow: Error | null;
}

export default class SearchPage extends Component<object, State> {
  state: State = {
    response: null,
    errorToThrow: null,
  };

  handleSearchSuccess = (response: BookSearchResponse) => {
    this.setState({ response });
  };

  handleSearchStart = () => {
    this.setState({ response: null });
  };

  throw = () => {
    this.setState({ errorToThrow: new Error("Test error") });
  };

  render() {
    const { response } = this.state;

    if (this.state.errorToThrow != null) throw this.state.errorToThrow;

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
          <Section title={"Test"}>
            <Button onClick={this.throw}>Trigger Error Boundary</Button>
          </Section>
        </div>
      </div>
    );
  }
}
