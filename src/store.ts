import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiResultsReducer from "@pages/searchPage/components/apiResults/apiResultsSlice.ts";

const rootReducer = combineReducers({
  apiResults: apiResultsReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStoreType = typeof store;
export type AppDispatch = typeof store.dispatch;
