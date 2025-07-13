import { type ButtonHTMLAttributes, Component, type MouseEvent } from "react";
import Button from "./Button.tsx";

interface State {
  isLoading: boolean;
}

interface AsyncButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<unknown>;
}

class AsyncButton extends Component<AsyncButtonProps> {
  state: State = {
    isLoading: false,
  };

  private get isDisabled() {
    return this.props.disabled || this.state.isLoading;
  }

  handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;

    this.setState({ isLoading: true });

    try {
      if (onClick == null) {
        console.warn("onClick is not defined");
      } else {
        await onClick(e);
      }
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Button {...rest} disabled={this.isDisabled} onClick={this.handleClick}>
        {children}
      </Button>
    );
  }
}

export default AsyncButton;
