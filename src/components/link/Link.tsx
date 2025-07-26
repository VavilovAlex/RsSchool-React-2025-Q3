import { type ReactNode } from "react";

interface Props {
  target: string;
  href: string;
  children: ReactNode;
}

export default function Link(props: Props) {
  const { target, href, children } = props;

  const className =
    "text-blue-500 hover:underline cursor-pointer hover:text-blue-700 active:text-blue-900 visited:text-purple-600";

  return (
    <a target={target} href={href} className={className}>
      {children}
    </a>
  );
}
