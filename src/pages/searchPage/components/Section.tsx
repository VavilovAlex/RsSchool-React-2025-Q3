import React, { Component } from "react";
import { clsx } from "clsx";

interface SectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

class Section extends Component<SectionProps> {
  render() {
    const { className: propClassName } = this.props;

    const className = "border p-4";

    return (
      <div className={clsx(className, propClassName)}>
        <div className={"text-2xl mb-2"}>{this.props.title}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Section;
