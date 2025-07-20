import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  countdown: number;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, countdown: 3 };

  static getDerivedStateFromError() {
    return { hasError: true, countdown: 5 };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  recoverFromError() {
    this.setState({ hasError: false, countdown: 5 });
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      const timer = setTimeout(() => {
        if (this.state.countdown > 0) {
          this.setState((state) => ({ countdown: state.countdown - 1 }));
        } else {
          this.recoverFromError();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div
          className={"flex flex-col items-center justify-center w-full h-full"}
        >
          <div className={"border rounded p-4 bg-red-100"}>
            <div className={"text-4xl mb-3"}>Something went wrong</div>
            <div>
              Application will be reloaded automatically in{" "}
              {this.state.countdown} seconds.
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}
