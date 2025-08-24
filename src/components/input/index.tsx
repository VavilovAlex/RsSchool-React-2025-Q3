import { type InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input(props: InputProps) {
  const { label, id, name, className, type = "text", ...rest } = props;

  const idValue = useIdName(id, name);

  const baseClassName =
    type === "file"
      ? "p-1 border rounded cursor-pointer file:cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      : "p-1 border rounded";

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={idValue}>{label}</label>}
      <input
        id={idValue}
        name={name}
        type={type}
        className={clsx(baseClassName, className)}
        {...rest}
      />
    </div>
  );
}
