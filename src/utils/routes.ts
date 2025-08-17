export const ROUTES = {
  About: "/about",
  Home: (page?: number, pageSize?: number) => {
    const base = "/";

    const params: string[] = [];

    if (page) {
      params.push(`page=${page}`);
    }
    if (pageSize) {
      params.push(`pageSize=${pageSize}`);
    }

    return params.length ? `${base}?${params.join("&")}` : base;
  },
} as const;
