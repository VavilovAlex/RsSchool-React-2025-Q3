import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "@api/book/models.ts";

interface ApiResultsState {
  selectedBooks: Book[];
}

const initialState: ApiResultsState = {
  selectedBooks: [],
};

export const apiResultsSlice = createSlice({
  name: "apiResults",
  initialState: initialState,
  reducers: {
    selectBook: (state, action: PayloadAction<Book>) => {
      const selectedBook = action.payload;

      if (state.selectedBooks.find((book) => book.key === selectedBook.key))
        return;

      state.selectedBooks.push(selectedBook);
    },
    unselectBook: (state, action: PayloadAction<Book>) => {
      const book = action.payload;
      state.selectedBooks = state.selectedBooks.filter(
        (b) => b.key !== book.key,
      );
    },
  },
});

export const { selectBook, unselectBook } = apiResultsSlice.actions;

export default apiResultsSlice.reducer;
