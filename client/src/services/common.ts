export const serverURL =
  process.env.NEXT_PUBLIC_BACKEND_HOST || "https://localhost:3002";

export const Server = {
  post: async ({ path, params }: { path: string; params?: object }) => {
    const urlToFetch = serverURL + path;
    const body = params ? JSON.stringify(params) : undefined;
    return fetch(urlToFetch, {
      body,
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  },
  get: async ({ path, query }: { path: string; query?: object }) => {
    let urlToFetch = serverURL + path;

    if (query) {
      const queryString = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      urlToFetch += `?${queryString}`;
    }

    return fetch(urlToFetch, {
      method: "GET",
      credentials: "include",
    });
  },
};
