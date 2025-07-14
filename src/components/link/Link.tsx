import { Component, type ReactNode } from "react";

interface Props {
  target: string;
  href: string;
  children: ReactNode;
}

class Link extends Component<Props> {
  render() {
    const { target, href, children } = this.props;

    const className =
      "text-blue-500 hover:underline cursor-pointer hover:text-blue-700 active:text-blue-900 visited:text-purple-600";

    return (
      <a target={target} href={href} className={className}>
        {children}
      </a>
    );
  }
}

export default Link;
