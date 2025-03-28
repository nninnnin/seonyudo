import { useQuery } from "@tanstack/react-query";
import { GuideSubjects } from "../constants";
import { GuideItem } from "../types";
import { ContentsTypeId } from "@/views/about/types";

const useGuides = (subject: GuideSubjects) => {
  return useQuery({
    queryKey: ["guides", subject],
    queryFn: async (): Promise<GuideItem[]> => {
      // 임시 데이터
      return [
        {
          contentsOrder: 1,
          contentsSubOrder: 1,
          contentsText: "체험 안내 유의사항에 대해 알고 싶으신가요?",
          contentsType: {
            _id: ContentsTypeId.Question,
            order: 1,
            languageMap: {
              KO: "질문",
              EN: "Question"
            }
          },
          uid: "guide-question-1",
        },
        {
          contentsOrder: 2,
          contentsSubOrder: 1,
          contentsText: "선유도공원 AR 체험을 위한 주요 안내사항을 알려드리겠습니다.",
          contentsType: {
            _id: ContentsTypeId.Answer,
            order: 2,
            languageMap: {
              KO: "답변",
              EN: "Answer"
            }
          },
          uid: "guide-answer-1",
        },
        {
          contentsOrder: 3,
          contentsSubOrder: 2,
          contentsText: "안전한 체험을 위해 어떤 점을 주의해야 하나요?",
          contentsType: {
            _id: ContentsTypeId.Question,
            order: 1,
            languageMap: {
              KO: "질문",
              EN: "Question"
            }
          },
          uid: "guide-question-2",
        },
        {
          contentsOrder: 4,
          contentsSubOrder: 2,
          contentsText: "AR 체험 시 주변 환경을 잘 살피고, 안전한 위치에서 체험해주세요.",
          contentsType: {
            _id: ContentsTypeId.Answer,
            order: 2,
            languageMap: {
              KO: "답변",
              EN: "Answer"
            }
          },
          uid: "guide-answer-2",
        },
      ];
    },
  });
};

export default useGuides; 