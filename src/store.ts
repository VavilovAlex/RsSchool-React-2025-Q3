import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiResultsReducer from "@pages/searchPage/components/apiResults/apiResultsSlice.ts";
import { bookApi } from "@api/book/bookApi.ts";

const rootReducer = combineReducers({
  apiResults: apiResultsReducer,
  [bookApi.reducerPath]: bookApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bookApi.middleware),
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStoreType = typeof store;
export type AppDispatch = typeof store.dispatch;
