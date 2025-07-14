import { Component, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

class Button extends Component<ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    const { children, className: propsClassName, ...rest } = this.props;

    const className =
      "text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed";

    return (
      <button className={clsx(propsClassName, className)} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
