import { type ChangeEvent, Component } from "react";
import TextInput from "../../../components/textInput/TextInput.tsx";
import AsyncButton from "../../../components/button/AsyncButton.tsx";
import { searchBooks } from "../../../api/book/client.ts";
import type { PaginationOptions } from "../../../shared/types/pagination.ts";
import type { BookSearchResponse } from "../../../api/book/models.ts";

interface Props {
  onSearchSuccess: (response: BookSearchResponse) => void;
  onSearchStart: () => void;
  onSearchError: (error: Error) => void;
}

interface State {
  searchText: string;
  pagination: PaginationOptions;
  error?: Error | null;
}

export default class ApiSearch extends Component<Props, State> {
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
  };

  search = async () => {
    const { searchText, pagination } = this.state;

    const normalizedSearchText = searchText.trim();

    this.setState({ searchText: normalizedSearchText });

    localStorage.setItem("apiSearchText", normalizedSearchText);

    this.props.onSearchStart();

    try {
      const result = await searchBooks(normalizedSearchText, pagination);
      this.props.onSearchSuccess(result);
    } catch (e) {
      console.error(e);
      this.props.onSearchError(e as Error);
    }
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
