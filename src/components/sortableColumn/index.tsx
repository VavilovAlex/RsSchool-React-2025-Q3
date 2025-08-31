import type { ReactNode, ThHTMLAttributes } from "react";
import { clsx } from "clsx";
import type {
  SortState,
  SortDirection,
} from "@components/sortableColumn/sortTypes.ts";

interface Props<TKey>
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "children"> {
  activeSort: SortState<TKey>;
  sortKey: TKey;
  onSort: (key: SortState<TKey>) => void;
  children: ReactNode;
}

export default function SortableColumn<TKey>(props: Props<TKey>) {
  const { activeSort, sortKey, children, className, onSort, ...rest } = props;

  const handleClick = () => {
    let direction: SortDirection = "desc";

    if (activeSort.key === sortKey) {
      direction = activeSort.direction === "asc" ? "desc" : "asc";
    }

    onSort({ key: sortKey, direction });
  };

  return (
    <th
      onClick={handleClick}
      className={clsx(className, "cursor-pointer")}
      {...rest}
    >
      {children}
      {activeSort.key == sortKey && (
        <span className={"ml-2"}>
          {activeSort.direction === "asc" ? "▲" : "▼"}
        </span>
      )}
    </th>
  );
}
