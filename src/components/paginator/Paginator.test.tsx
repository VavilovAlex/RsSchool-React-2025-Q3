import { beforeEach, describe } from "vitest";
import renderWithRedux from "@/test-utils/renderWithRedux.tsx";
import Paginator from "@components/paginator/Paginator.tsx";
import { act, screen } from "@testing-library/react";
import {
  QUERY_PAGE,
  QUERY_PAGE_SIZE,
} from "@components/searchPage/components/apiSearch/ApiSearch.constants.ts";
import mockRouter from "next-router-mock";

const render = renderWithRedux;

describe("Paginator", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("render correct number of pages", () => {
    render(
      <Paginator
        queryPage={"_"}
        queryPageSize={"_"}
        defaultPage={0}
        defaultPageSize={10}
        totalCount={55}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(6);
  });

  it("renders no more than max pages", () => {
    render(
      <Paginator
        queryPage={"_"}
        queryPageSize={"_"}
        defaultPage={0}
        defaultPageSize={10}
        totalCount={9999}
        maxPages={50}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(50);
  });

  it("renders pages around current page", () => {
    render(
      <Paginator
        queryPage={"_"}
        queryPageSize={"_"}
        defaultPage={50}
        defaultPageSize={10}
        totalCount={9999}
        maxPages={5}
      />,
    );

    expect(screen.queryByText("47")).not.toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("52")).toBeInTheDocument();
    expect(screen.queryByText("53")).not.toBeInTheDocument();
  });

  it("reads current page from query", () => {
    mockRouter.push(`/?${QUERY_PAGE}=4`);

    render(
      <Paginator
        queryPage={"page"}
        queryPageSize={"pageSize"}
        defaultPage={0}
        defaultPageSize={10}
        totalCount={9999}
        maxPages={1}
      />,
    );

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("reads page size from query", () => {
    mockRouter.push(`/?${QUERY_PAGE_SIZE}=7`);

    render(
      <Paginator
        queryPage={"page"}
        queryPageSize={"pageSize"}
        defaultPage={0}
        defaultPageSize={10}
        totalCount={10}
        maxPages={9999}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should update query when page is changed", () => {
    render(
      <>
        <Paginator
          queryPage={"page"}
          queryPageSize={"pageSize"}
          defaultPage={0}
          defaultPageSize={10}
          totalCount={9999}
          maxPages={5}
        />
      </>,
    );

    const page2 = screen.getByText("2");
    act(() => {
      page2.click();
    });

    expect(mockRouter).toMatchObject({
      pathname: "/",
      query: {
        [QUERY_PAGE]: "2",
        [QUERY_PAGE_SIZE]: "10",
      },
    });
  });
});
