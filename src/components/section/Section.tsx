import { type ReactNode } from "react";
import { clsx } from "clsx";

interface SectionProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export default function Section(props: SectionProps) {
  const className = "border p-4";

  return (
    <div className={clsx(className, props.className)}>
      <div role={"heading"} className={"text-2xl mb-2"}>
        {props.title}
      </div>
      <div>{props.children}</div>
    </div>
  );
}
