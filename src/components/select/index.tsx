import { type SelectHTMLAttributes } from "react";
import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select(props: SelectProps) {
  const { label, id, name, className, children, ...rest } = props;

  const idValue = useIdName(id, name);

  const baseClassName = "p-1 border rounded";

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={idValue}>{label}</label>}
      <select
        id={idValue}
        name={name}
        className={clsx(baseClassName, className)}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}
