import React, { Component } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

class Section extends Component<SectionProps> {
  render() {
    return (
      <div className={"border p-4"}>
        <div className={"text-2xl mb-2"}>{this.props.title}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Section;
