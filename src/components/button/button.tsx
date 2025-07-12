import { ReactNode, Component } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        className={
          "text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700"
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
