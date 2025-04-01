import { orderBy } from "lodash";
import { GuideItem, MemexResponse } from "../types";
import { ContentsTypeId } from "@/views/about/types";

export const formatGuides = (data: MemexResponse): GuideItem[] => {
  return data.list.map((item) => ({
    contentsOrder: item.data.contentsOrder,
    contentsSubOrder: item.data.contentsSubOrder,
    contentsText: item.data.contentsText.KO,
    contentsType: {
      _id: item.data.contentsSubOrder % 2 === 1 ? ContentsTypeId.Question : ContentsTypeId.Answer,
      order: item.data.contentsOrder,
      languageMap: {
        KO: item.data.contentsSubOrder % 2 === 1 ? "질문" : "답변",
        EN: item.data.contentsSubOrder % 2 === 1 ? "Question" : "Answer"
      }
    },
    ideaImage: item.data.ideaImage,
    uid: item.uid,
  }));
};

export const sortGuides = (items: GuideItem[]): GuideItem[] => {
  return orderBy(
    items,
    [
      "contentsOrder",
      "contentsSubOrder",
      (item) => item.contentsType._id === ContentsTypeId.Question ? 0 : 1
    ],
    ["asc", "asc", "asc"]
  );
}; 