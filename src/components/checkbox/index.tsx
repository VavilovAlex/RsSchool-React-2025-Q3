import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";
import type { InputProps } from "@shared/InputProps.ts";

export default function Checkbox(props: InputProps<HTMLInputElement>) {
  const { label, id, name, className, errorText, ...rest } = props;

  const idValue = useIdName(id, name);
  const errorId = `${idValue}-error`;

  const baseClassName = "size-4 border rounded accent-blue-600";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          id={idValue}
          type="checkbox"
          aria-invalid={!!errorText}
          aria-describedby={errorText ? errorId : undefined}
          className={clsx(
            baseClassName,
            errorText && "border-red-600",
            className,
          )}
          name={name}
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
