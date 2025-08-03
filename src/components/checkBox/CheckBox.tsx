import { clsx } from "clsx";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function CheckBox(props: CheckBoxProps) {
  const { checked, onChange, className: propsClassName } = props;

  const handleOnClick = () => {
    onChange(!checked);
  };

  const className = "w-4 h-4 cursor-pointer";

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleOnClick}
      className={clsx(className, propsClassName)}
    />
  );
}
