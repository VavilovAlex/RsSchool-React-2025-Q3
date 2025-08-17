import Button from "@components/button/Button.tsx";
import Popup from "@components/popup/Popup.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { clearBookSelection } from "@components/searchPage/components/apiResults/apiResultsSlice.ts";
import { stringifyCSV } from "@/utils/csv.ts";
import { useDownload } from "@/hooks/useDownload.tsx";

export default function SelectionState() {
  const [download, linkRef] = useDownload();

  const selectedBooks = useAppSelector(
    (state) => state.apiResults.selectedBooks,
  );

  const dispatch = useAppDispatch();

  const handleUnselectAll = () => {
    dispatch(clearBookSelection());
  };

  const handleExport = () => {
    const csvContent = stringifyCSV(selectedBooks, [
      {
        header: "Title",
        selector: (row) => row.title,
      },
      {
        header: "First Publish Year",
        selector: (row) => row.firstPublishYear.toString(),
      },
      {
        header: "Authors",
        selector: (row) => row.authors.map((author) => author.name).join(", "),
      },
      {
        header: "Link",
        selector: (row) => "https://openlibrary.org/" + row.key,
      },
    ]);

    const blob = new Blob([csvContent], { type: "text/csv" });

    download.blob(blob, selectedBooks.length + "_books.csv");
  };

  return (
    <>
      <Popup
        isOpen={selectedBooks.length > 0}
        title={`${selectedBooks.length} Book(s) selected`}
      >
        <div className={"flex gap-4 mt-2"}>
          <Button onClick={handleUnselectAll}>Unselect ALL</Button>
          <Button onClick={handleExport}>Export as CSV</Button>
        </div>
      </Popup>
      <a ref={linkRef} style={{ display: "none" }}></a>
    </>
  );
}
