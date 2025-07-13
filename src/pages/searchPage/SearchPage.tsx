import { Component } from "react";
import ApiSearch from "./components/ApiSearch.tsx";
import ApiResults from "./components/ApiResults.tsx";
import Section from "./components/Section.tsx";
import type { BookSearchResponse } from "../../api/book/models.ts";
import Button from "../../components/button/Button.tsx";
import type { HttpError } from "../../shared/errors/httpError.ts";

interface State {
  response: BookSearchResponse | null;
  errorToThrow: Error | null;
  searchError?: Error | null;
}

export default class SearchPage extends Component<object, State> {
  state: State = {
    response: null,
    errorToThrow: null,
  };

  handleSearchSuccess = (response: BookSearchResponse) => {
    this.setState({ response, searchError: null });
  };

  handleSearchStart = () => {
    this.setState({ response: null });
  };

  handleSearchError = (error: Error) => {
    this.setState({ searchError: error });
  };

  throw = () => {
    this.setState({ errorToThrow: new Error("Test error") });
  };

  render() {
    const { response, searchError } = this.state;

    if (this.state.errorToThrow != null) throw this.state.errorToThrow;

    const httpError = searchError as HttpError;

    return (
      <div className={"flex flex-col items-center w-full h-full p-4"}>
        <div className={"flex flex-col gap-4 max-w-[1200px] w-full"}>
          <Section title={"Search"}>
            <ApiSearch
              onSearchStart={this.handleSearchStart}
              onSearchSuccess={this.handleSearchSuccess}
              onSearchError={this.handleSearchError}
            />
          </Section>
          {searchError && (
            <Section title={"Search error"}>
              Search failed with code: {httpError.statusCode}
            </Section>
          )}
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
