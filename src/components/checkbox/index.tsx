import { type InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import useIdName from "@/hooks/useIdName.ts";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Checkbox(props: CheckboxProps) {
  const { label, id, name, className, ...rest } = props;

  const idValue = useIdName(id, name);

  const baseClassName = "size-4 border rounded accent-blue-600";

  return (
    <div className="flex items-center gap-2">
      <input
        id={idValue}
        name={name}
        type="checkbox"
        className={clsx(baseClassName, className)}
        {...rest}
      />
      {label && <label htmlFor={idValue}>{label}</label>}
    </div>
  );
}
