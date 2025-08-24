import { type InputHTMLAttributes, useId } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input(props: InputProps) {
  const { label, id, name, className, type = "text", ...rest } = props;
  const generatedId = useId();

  const idValue = id ?? name ?? generatedId;
  const nameValue = name;

  const baseClassName = "p-1 border rounded";

  return (
    <>
      {label && <label htmlFor={idValue}>{label}</label>}
      <input
        id={idValue}
        name={nameValue}
        type={type}
        className={clsx(baseClassName, className)}
        {...rest}
      />
    </>
  );
}
