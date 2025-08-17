import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";
import { type RootState, setupStore, type AppStoreType } from "@/store.ts";

export interface Options {
  renderOptions?: RenderOptions;
  reduxOptions?: ReduxOptions;
}

interface ReduxOptions {
  preloadedState?: Partial<RootState>;
  spySetup?: (store: AppStoreType) => void;
}

export default function renderWithReduxAndLocale(
  ui: ReactElement,
  options: Options = {},
) {
  const store = setupStore(options.reduxOptions?.preloadedState);

  if (options.reduxOptions?.spySetup) {
    options.reduxOptions.spySetup(store);
  }

  return {
    renderResult: render(
      <NextIntlClientProvider
        locale="en"
        messages={enMessages as unknown as Record<string, unknown>}
      >
        <Provider store={store}>{ui}</Provider>
      </NextIntlClientProvider>,
      options.renderOptions,
    ),
    store,
  };
}
