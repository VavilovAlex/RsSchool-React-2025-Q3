import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router";
import { Provider } from "react-redux";
import { type RootState, setupStore, type AppStoreType } from "@/store.ts";

export interface Options {
  routerOptions?: MemoryRouterProps;
  renderOptions?: RenderOptions;
  reduxOptions?: ReduxOptions;
}

interface ReduxOptions {
  preloadedState?: Partial<RootState>;
  spySetup?: (store: AppStoreType) => void;
}

export default function renderWithRouterAndRedux(
  ui: ReactElement,
  options: Options = {},
) {
  const store = setupStore(options.reduxOptions?.preloadedState);

  if (options.reduxOptions?.spySetup) {
    options.reduxOptions.spySetup(store);
  }

  return {
    renderResult: render(
      <Provider store={store}>
        <MemoryRouter {...options.routerOptions}>{ui}</MemoryRouter>
      </Provider>,
      options.renderOptions,
    ),
    store,
  };
}
