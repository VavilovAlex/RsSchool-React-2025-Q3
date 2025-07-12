import { type ReactNode, Component } from "react";
import { clsx } from "clsx";
import type BaseComponentProps from "../../interfaces/base-component-props.ts";

interface ButtonProps extends BaseComponentProps {
  children: ReactNode;
  onClick?: () => void;
}

class Button extends Component<ButtonProps> {
  render() {
    const { children, onClick, className, style } = this.props;

    const baseClassName =
      "text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700";

    return (
      <button
        className={clsx(baseClassName, className)}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default Button;
