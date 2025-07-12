import React, { Component } from "react";

interface TextInputProps {
  onChange?: (string) => void;
}

class TextInput extends Component<TextInputProps> {
  render() {
    return (
      <input
        type={"text"}
        className={"p-2 border rounded"}
        onChange={this.props.onChange}
      />
    );
  }
}

export default TextInput;
