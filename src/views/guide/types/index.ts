import { CategoryInterface, FormattedImageMedia } from "@/shared/types/memex";

export type GuideItem = {
  contentsOrder: number;
  contentsSubOrder: number;
  contentsText: string;
  contentsType: CategoryInterface;
  ideaImage?: FormattedImageMedia[];
  uid: string;
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

export type MemexResponse = {
  list: Array<{
    data: {
      contentsOrder: number;
      contentsSubOrder: number;
      contentsText: {
        KO: string;
        EN: string;
      };
      contentsType: CategoryInterface;
      ideaImage?: FormattedImageMedia[];
    };
    uid: string;
  }>;
}; 

export type FormattedIntroductionItem = {
    contentsOrder: number;
    contentsSubOrder: number;
    contentsText: string;
    contentsType: ContentsType;
    ideaImage?: FormattedImageMedia[];
    uid: string;
  };