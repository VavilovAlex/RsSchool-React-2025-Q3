import { type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className: propsClassName, ...rest } = props;

  const className =
    "p-2 rounded cursor-pointer " +
    "text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed " +
    "dark:text-gray-200 dark:bg-blue-700 dark:hover:bg-blue-800 dark:active:bg-blue-900 dark:disabled:bg-gray-600";

  return (
    <button className={clsx(propsClassName, className)} {...rest}>
      {children}
    </button>
  );
}
