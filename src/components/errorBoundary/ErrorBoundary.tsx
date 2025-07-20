import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "../button/Button.tsx";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  recoverFromError = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div
          className={"flex flex-col items-center justify-center w-full h-full"}
        >
          <div
            className={
              "border rounded p-4 bg-red-100 flex gap-4 justify-center"
            }
          >
            <div className={"text-4xl mb-3"}>Something went wrong</div>
            <Button onClick={this.recoverFromError} className={"text-lg"}>
              Reload
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}
