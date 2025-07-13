import { Component, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

class Button extends Component<ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    const { children, className, ...rest } = this.props;

    const baseClassName =
      "text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700";

    return (
      <button className={clsx(baseClassName, className)} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
