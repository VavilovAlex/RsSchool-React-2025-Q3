import { type ChangeEventHandler } from "react";
import type BaseComponentProps from "../../interfaces/base-component-props.ts";
import { clsx } from "clsx";

interface TextInputProps extends BaseComponentProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export default function TextInput(props: TextInputProps) {
  const { value = "", onChange, className, ...rest } = props;

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
