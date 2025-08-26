import type { PropsWithChildren, ReactNode } from "react";
import { Provider } from "react-redux";
import { setupStore, type AppStoreType } from "@/store.ts";

export function withProviders(ui: ReactNode, store?: AppStoreType) {
  const appStore = store ?? setupStore();
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={appStore}>{children}</Provider>;
  }
  return { ui, Wrapper, store: appStore };
}
