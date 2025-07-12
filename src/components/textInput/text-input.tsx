import { type ChangeEventHandler, Component } from "react";
import type BaseComponentProps from "../../interfaces/base-component-props.ts";
import { clsx } from "clsx";

interface TextInputProps extends BaseComponentProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

class TextInput extends Component<TextInputProps> {
  render() {
    const { onChange, style, className } = this.props;

    const baseClassName = "p-2 border rounded";

    return (
      <input
        type={"text"}
        style={style}
        className={clsx(baseClassName, className)}
        onChange={onChange}
      />
    );
  }
}

export default TextInput;
