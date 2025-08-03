import { configureStore } from "@reduxjs/toolkit";
import apiResultsReducer from "@pages/searchPage/components/apiResults/apiResultsSlice.ts";

export const store = configureStore({
  reducer: {
    apiResults: apiResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
