import { Component } from "react";
import ApiSearch from "./components/ApiSearch.tsx";
import ApiResults from "./components/ApiResults.tsx";
import Section from "./components/Section.tsx";

export default class SearchPage extends Component {
  render() {
    return (
      <div className={"flex flex-col w-full h-full p-4 items-center"}>
        <div className={"max-w-[600px] w-full flex flex-col gap-4"}>
          <Section title={"Search"}>
            <ApiSearch />
          </Section>
          <Section title={"Results"}>
            <ApiResults />
          </Section>
        </div>
      </div>
    );
  }
}
