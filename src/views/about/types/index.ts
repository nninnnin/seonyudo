import {
  CategoryInterface,
  FormattedImageMedia,
  MediaInterface,
  MemexListResult,
  RelationInterface,
} from "@/shared/types/memex";

export type IntroductionItem = {
  contentsOrder: number;
  contentsSubOrder: number;
  contentsText: {
    KO: string;
    EN: string;
  };
  contentsType: CategoryInterface;
  ideaImage?: MediaInterface[];
  relatedLocationName?: RelationInterface[];
  relatedLocationSlug: string;
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

export type FormattedIntroductionItem = {
  uid: string;
  contentsOrder: number;
  contentsSubOrder: number;
  contentsText: string;
  contentsType: ContentsType;
  ideaImage?: FormattedImageMedia[];
  relatedLocationSlug: string;
};

export type IntroductionQueryData =
  MemexListResult<IntroductionItem>;
