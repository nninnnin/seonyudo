import {
  CategoryInterface,
  MemexListResult,
} from "@/shared/types/memex";

export type IntroductionItem = {
  contentsOrder: number;
  contentsSubOrder: number;
  contentsText: {
    KO: string;
    EN: string;
  };
  contentsType: CategoryInterface;
};

export enum ContentsTypeId {
  Question = 4963,
  Answer = 4964,
}

type QuestionCategory = {
  id: ContentsTypeId.Question;
  value: "질문";
};

type AnswerCategory = {
  id: ContentsTypeId.Answer;
  value: "답변";
};

type ContentsType = QuestionCategory | AnswerCategory;

export type FormattedIntorductionItem = {
  contentsOrder: number;
  contentsSubOrder: number;
  contentsText: string;
  contentsType: ContentsType;
};

export type IntroductionQueryData =
  MemexListResult<IntroductionItem>;

export type IntroductionFormattedQueryData =
  FormattedIntorductionItem[];
