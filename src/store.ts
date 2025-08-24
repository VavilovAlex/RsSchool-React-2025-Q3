import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countriesSlice from "@components/forms/countriesSlice.ts";

const rootReducer = combineReducers({
  countries: countriesSlice,
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
