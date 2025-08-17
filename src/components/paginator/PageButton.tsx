import { clsx } from "clsx";
import { type MouseEvent } from "react";

interface Props {
  current: boolean;
  pageNum: number;
  onClick: (pageNum: number) => void;
}

export default function PageButton(props: Props) {
  const { pageNum, onClick } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick(pageNum);
  };

  let className =
    "flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white rounded p-1 cursor-pointer min-w-[1.5rem] min-h-[1.5rem]";

  if (props.current) className = clsx(className, "bg-blue-700");

  return (
    <div
      className={className}
      onClick={handleClick}
      key={pageNum}
      role={"button"}
    >
      {pageNum}
    </div>
  );
}
