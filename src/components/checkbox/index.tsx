import { type InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
}

export default function Checkbox(props: CheckboxProps) {
  const { label, id, name, className, errorText, ...rest } = props;

  const idValue = useIdName(id, name);
  const errorId = `${idValue}-error`;

  const baseClassName = "size-4 border rounded accent-blue-600";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          id={idValue}
          name={name}
          type="checkbox"
          aria-invalid={!!errorText}
          aria-describedby={errorText ? errorId : undefined}
          className={clsx(
            baseClassName,
            errorText && "border-red-600",
            className,
          )}
          {...rest}
        />
        {label && <label htmlFor={idValue}>{label}</label>}
      </div>
      {errorText && (
        <p id={errorId} className="text-red-600 text-sm">
          {errorText}
        </p>
      )}
    </div>
  );
}
