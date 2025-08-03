import { type ClassValue, clsx } from "clsx";
import type { ChangeEventHandler, MouseEventHandler } from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: ClassValue;
  stopClickPropagation?: boolean;
}

export default function CheckBox({
  checked,
  onChange,
  className: propsClassName,
  stopClickPropagation = true,
}: CheckBoxProps) {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = () => {
    onChange(!checked);
  };

  const handleOnClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (stopClickPropagation) {
      e.stopPropagation();
    }
  };

  const className = "w-4 h-4 cursor-pointer";

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleOnChange}
      onClick={handleOnClick}
      className={clsx(className, propsClassName)}
    />
  );
}
