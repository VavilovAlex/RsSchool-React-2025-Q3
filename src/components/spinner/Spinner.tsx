import { Component } from "react";

class Spinner extends Component {
  render() {
    const className =
      "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500";

    return <div className={className}></div>;
  }
}

export default Spinner;
