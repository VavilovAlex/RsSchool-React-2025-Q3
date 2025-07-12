import { Component } from "react";
import Button from "../../../components/button/Button.tsx";
import TextInput from "../../../components/textInput/TextInput.tsx";

export default class ApiSearch extends Component {
  render() {
    return (
      <div className="flex flex-row w-full gap-1">
        <TextInput className={"w-full"} onChange={() => {}} />
        <Button>Search</Button>
      </div>
    );
  }
}
