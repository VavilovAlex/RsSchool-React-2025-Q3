import { type ReactNode } from "react";
import { clsx } from "clsx";

interface SectionProps {
  title: string;
  className?: string;
  children: ReactNode;
  overflow?: boolean;
}

export default function Section(props: SectionProps) {
  const overflowClass = props.overflow ? "overflow-auto" : "";

  const className = clsx("border p-4 flex flex-col", overflowClass);

  return (
    <div className={clsx(className, props.className)}>
      <div role={"heading"} className={"text-2xl mb-2"}>
        {props.title}
      </div>
      <div className={overflowClass}>{props.children}</div>
    </div>
  );
}
