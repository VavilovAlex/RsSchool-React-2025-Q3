import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";
import type { InputProps } from "@shared/InputProps.ts";

export default function Input(props: InputProps<HTMLInputElement>) {
  const {
    label,
    id,
    name,
    className,
    type = "text",
    errorText,
    register,
    ...rest
  } = props;

  const idValue = useIdName(id, name);
  const errorId = `${idValue}-error`;

  const baseClassName =
    type === "file"
      ? "p-1 border rounded cursor-pointer file:cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      : "p-1 border rounded";

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={idValue}>{label}</label>}
      <input
        id={idValue}
        type={type}
        aria-invalid={!!errorText}
        aria-describedby={errorText ? errorId : undefined}
        className={clsx(
          baseClassName,
          errorText && "border-red-600",
          className,
        )}
        {...(register
          ? register(name)
          : {
              name: name,
            })}
        {...rest}
      />
      {errorText && (
        <p id={errorId} className="text-red-600 text-sm">
          {errorText}
        </p>
      )}
    </div>
  );
}
