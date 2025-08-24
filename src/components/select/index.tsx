import { type SelectHTMLAttributes, useId } from "react";
import { clsx } from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select(props: SelectProps) {
  const { label, id, name, className, children, ...rest } = props;
  const generatedId = useId();

  const idValue = id ?? name ?? generatedId;
  const nameValue = name;

  const baseClassName = "p-1 border rounded";

  return (
    <>
      {label && <label htmlFor={idValue}>{label}</label>}
      <select
        id={idValue}
        name={nameValue}
        className={clsx(baseClassName, className)}
        {...rest}
      >
        {children}
      </select>
    </>
  );
}
