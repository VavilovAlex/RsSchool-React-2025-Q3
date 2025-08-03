import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router";
import { Provider } from "react-redux";
import { type RootState, setupStore } from "@/store.ts";

interface Options {
  routerOptions?: MemoryRouterProps;
  renderOptions?: RenderOptions;
  reduxOptions?: ReduxOptions;
}

interface ReduxOptions {
  preloadedState: Partial<RootState>;
}

export default function renderWithRouterAndRedux(
  ui: ReactElement,
  options: Options = {},
) {
  const store = setupStore(options.reduxOptions?.preloadedState);

  return render(
    <Provider store={store}>
      <MemoryRouter {...options.routerOptions}>{ui}</MemoryRouter>
    </Provider>,
    options.renderOptions,
  );
}
