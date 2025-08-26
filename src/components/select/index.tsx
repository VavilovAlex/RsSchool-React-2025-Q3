import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";
import type { InputProps } from "@shared/InputProps.ts";

export default function Select(props: InputProps<HTMLSelectElement>) {
  const { label, id, name, className, children, errorText, register, ...rest } =
    props;

  const idValue = useIdName(id, name);
  const errorId = `${idValue}-error`;

  const baseClassName = "p-1 border rounded";

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={idValue}>{label}</label>}
      <select
        id={idValue}
        aria-invalid={!!errorText}
        aria-describedby={errorText ? errorId : undefined}
        className={clsx(
          baseClassName,
          errorText && "border-red-600",
          className,
        )}
        {...rest}
        {...(register
          ? register(name)
          : {
              name: name,
            })}
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
