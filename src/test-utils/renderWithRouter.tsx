import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router";

interface Options {
  routerOptions?: MemoryRouterProps;
  renderOptions?: RenderOptions;
}

export default function renderWithRouter(
  ui: ReactElement,
  options: Options = {},
) {
  return render(
    <MemoryRouter {...options.routerOptions}>{ui}</MemoryRouter>,
    options.renderOptions,
  );
}
