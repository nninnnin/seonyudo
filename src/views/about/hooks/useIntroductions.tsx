import { useQuery } from "@tanstack/react-query";
import {
  createMemexFetcher,
  pipe,
} from "@rebel9/memex-fetcher";

import {
  IntroductionSubjects,
  QueryKeys,
} from "@/views/about/constants";
import { INTRODUCTION_MODEL_KEYS } from "@/views/about/constants/index";
import {
  IntroductionQueryData,
  FormattedIntroductionItem,
} from "@/views/about/types/index";
import {
  formatIntroductions,
  sortIntroductions,
} from "@/views/about/utils/formatters";
import { Languages } from "@/shared/store/language";

const token = process.env.MEMEX_TOKEN ?? "";
const memexFetcher = createMemexFetcher(token);
const PROJECT_ID = "e2f62c45";

const useIntroductions = (
  subject: IntroductionSubjects,
  language: Languages
) => {
  const MODEL_KEY = INTRODUCTION_MODEL_KEYS[subject];

  return useQuery<
    IntroductionQueryData,
    null,
    FormattedIntroductionItem[]
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
    select: (data): FormattedIntroductionItem[] => {
      return pipe(
        data,
        formatIntroductions(language),
        sortIntroductions
      );
    },
  });
};

export default useIntroductions;
