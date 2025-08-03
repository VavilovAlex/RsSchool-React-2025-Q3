import type { ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
}

export default function Popup({ isOpen, title, children }: Props) {
  return (
    <div className="fixed bottom-0 right-0 w-full flex justify-center pointer-events-none">
      <div
        data-testid="popup"
        className={clsx(
          "pointer-events-auto",
          "p-4 bg-gray-100 mb-4 rounded",
          "transform transition-all duration-300 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        <div className="text-xl">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
