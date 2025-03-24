import { useQuery } from "@tanstack/react-query";
import {
  createMemexFetcher,
  pipe,
} from "@rebel9/memex-fetcher";

import {
  IntroductionSubjects,
  QueryKeys,
} from "@/features/chat/constants";
import { INTRODUCTION_MODEL_KEYS } from "@/features/chat/constants/index";
import {
  IntroductionQueryData,
  IntroductionFormattedQueryData,
} from "@/features/chat/types/index";
import {
  formatIntroductions,
  sortIntroductions,
} from "@/features/chat/utils/formatters";

const token = process.env.MEMEX_TOKEN ?? "";
const memexFetcher = createMemexFetcher(token);
const PROJECT_ID = "e2f62c45";

const useIntroductions = (
  subject: IntroductionSubjects
) => {
  const MODEL_KEY = INTRODUCTION_MODEL_KEYS[subject];

  return useQuery<
    IntroductionQueryData,
    null,
    IntroductionFormattedQueryData
  >({
    queryKey: [QueryKeys.Introductions, subject],
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
    select: (data): IntroductionFormattedQueryData => {
      return pipe(
        data,
        formatIntroductions,
        sortIntroductions
      );
    },
  });
};

export default useIntroductions;
