import { clsx } from "clsx";

interface Props {
  current: boolean;
  pageNum: number;
  onClick: (pageNum: number) => void;
}

export default function PageButton(props: Props) {
  const { pageNum, onClick } = props;

  let className =
    "flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white rounded p-1 cursor-pointer min-w-[1.5rem] min-h-[1.5rem]";

  if (props.current) className = clsx(className, "bg-blue-700");

  return (
    <div className={className} onClick={() => onClick(pageNum)} key={pageNum}>
      {pageNum}
    </div>
  );
}
