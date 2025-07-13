import { type ChangeEvent, Component } from "react";
import TextInput from "../../../components/textInput/TextInput.tsx";
import AsyncButton from "../../../components/button/AsyncButton.tsx";
import { searchBooks } from "../../../api/book/client.ts";
import type { PaginationOptions } from "../../../shared/types/pagination.ts";
import type { BookSearchResponse } from "../../../api/book/models.ts";

interface Props {
  onSearchSuccess: (response: BookSearchResponse) => void;
  onSearchStart: () => void;
}

interface State {
  searchText: string;
  pagination: PaginationOptions;
}

export default class ApiSearch extends Component<Props> {
  state: State = {
    searchText: localStorage.getItem("apiSearchText") || "",
    pagination: {
      page: 1,
      pageSize: 10,
    },
  };

  componentDidMount() {
    this.search().catch(console.error);
  }

  handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({ searchText: value });
    localStorage.setItem("apiSearchText", value);
  };

  search = async () => {
    const { searchText, pagination } = this.state;

    this.props.onSearchStart();

    const result = await searchBooks(searchText, pagination);

    this.props.onSearchSuccess(result);
  };

  render() {
    const { searchText } = this.state;

    return (
      <div className="flex flex-row w-full gap-1">
        <TextInput
          className={"w-full"}
          value={searchText}
          onChange={this.handleSearchTextChange}
        />
        <AsyncButton onClick={this.search}>Search</AsyncButton>
      </div>
    );
  }
}
