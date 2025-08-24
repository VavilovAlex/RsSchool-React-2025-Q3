import { type InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input(props: InputProps) {
  const { label, id, name, className, type = "text", ...rest } = props;

  const idValue = useIdName(id, name);

  const baseClassName = "p-1 border rounded";

  return (
    <>
      {label && <label htmlFor={idValue}>{label}</label>}
      <input
        id={idValue}
        name={name}
        type={type}
        className={clsx(baseClassName, className)}
        {...rest}
      />
    </>
  );
}
