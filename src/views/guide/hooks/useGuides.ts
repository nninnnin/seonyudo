import { useQuery } from "@tanstack/react-query";
import {
  createMemexFetcher,
  pipe,
} from "@rebel9/memex-fetcher";

import { GuideSubjects } from "../constants";
import { GuideItem, MemexResponse } from "../types";
import { formatGuides, sortGuides } from "../utils/formatters";

const token = process.env.MEMEX_TOKEN ?? "";
const memexFetcher = createMemexFetcher(token);
const PROJECT_ID = "e2f62c45";

const MODEL_KEY = "notifications";

const useGuides = (subject: GuideSubjects) => {
  return useQuery<MemexResponse, null, GuideItem[]>({
    queryKey: ["guides", subject],
    queryFn: async () => {
      const response = await memexFetcher.getList(
        PROJECT_ID,
        MODEL_KEY,
        {
          page: 0,
          size: 1000,
        }
      );

      return await response.json();
    },
    select: (data: MemexResponse): GuideItem[] => {
      return pipe(
        data,
        formatGuides,
        sortGuides
      );
    },
  });
};

export default useGuides; 