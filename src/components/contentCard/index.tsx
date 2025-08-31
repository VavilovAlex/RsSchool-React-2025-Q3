import type { ReactNode } from "react";

export default function ContentCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className={
        "flex-1 flex flex-col min-h-0 overflow-hidden p-2 m-2 border rounded"
      }
    >
      <div className={"text-2xl flex-none mb-2"}>{title}</div>
      <div className={"flex-1 min-h-0 overflow-auto"}>{children}</div>
    </div>
  );
}
