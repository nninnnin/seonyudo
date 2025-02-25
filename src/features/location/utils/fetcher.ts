import { createMemexFetcher } from "@rebel9/memex-fetcher";

const memexFetcher = createMemexFetcher(
  process.env.MEMEX_TOKEN ?? ""
);

export const getLocations = async () => {
  return await memexFetcher.getList(
    "e2f62c45",
    "locations",
    {
      size: 1000,
      page: 0,
    }
  );
};
