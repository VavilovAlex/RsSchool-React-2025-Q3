import { type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className: propsClassName, ...rest } = props;

  const className =
    "text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed";

  return (
    <button className={clsx(propsClassName, className)} {...rest}>
      {children}
    </button>
  );
}
