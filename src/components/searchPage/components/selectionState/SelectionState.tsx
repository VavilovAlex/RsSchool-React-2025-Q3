import Button from "@components/button/Button.tsx";
import Popup from "@components/popup/Popup.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { clearBookSelection } from "@components/searchPage/components/apiResults/apiResultsSlice.ts";
import { useDownload } from "@/hooks/useDownload.tsx";
import { booksToCsv } from "@components/searchPage/components/selectionState/booksToCsv.ts";

export default function SelectionState() {
  const [download, linkRef] = useDownload();

  const selectedBooks = useAppSelector(
    (state) => state.apiResults.selectedBooks,
  );

  const dispatch = useAppDispatch();

  const handleUnselectAll = () => {
    dispatch(clearBookSelection());
  };

  const handleExport = async () => {
    const csvContent = await booksToCsv(selectedBooks);

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
