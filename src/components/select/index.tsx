import { type SelectHTMLAttributes } from "react";
import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  errorText?: string;
}

export default function Select(props: SelectProps) {
  const { label, id, name, className, children, errorText, ...rest } = props;

  const idValue = useIdName(id, name);
  const errorId = `${idValue}-error`;

  const baseClassName = "p-1 border rounded";

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={idValue}>{label}</label>}
      <select
        id={idValue}
        name={name}
        aria-invalid={!!errorText}
        aria-describedby={errorText ? errorId : undefined}
        className={clsx(
          baseClassName,
          errorText && "border-red-600",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      {errorText && (
        <p id={errorId} className="text-red-600 text-sm">
          {errorText}
        </p>
      )}
    </div>
  );
}
