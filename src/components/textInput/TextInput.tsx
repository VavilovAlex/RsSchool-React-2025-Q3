import { type ChangeEventHandler, Component } from "react";
import type BaseComponentProps from "../../interfaces/base-component-props.ts";
import { clsx } from "clsx";

interface TextInputProps extends BaseComponentProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

class TextInput extends Component<TextInputProps> {
  render() {
    const { value = "", onChange, className, ...rest } = this.props;

    const baseClassName = "p-2 border rounded";

    return (
      <input
        type={"text"}
        className={clsx(baseClassName, className)}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
}

export default TextInput;
