import { CategoryInterface, FormattedImageMedia } from "@/shared/types/memex";

export type GuideItem = {
  contentsOrder: number;
  contentsSubOrder: number;
  contentsText: string;
  contentsType: CategoryInterface;
  ideaImage?: FormattedImageMedia[];
  uid: string;
}; 