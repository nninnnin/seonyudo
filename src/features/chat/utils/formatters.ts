import { orderBy } from "lodash";
import { curry } from "@fxts/core";
import {
  flattenListItem,
  mapListItems,
  pipe,
  pluckList,
  mapObjectProps,
  extractStringValues,
} from "@rebel9/memex-fetcher";

import {
  CategoryInterface,
  FormattedCategory,
  FormattedImageMedia,
  MediaInterface,
} from "@/shared/types/memex";
import {
  FormattedIntroductionItem,
  IntroductionQueryData,
} from "@/views/about/types";

export const formatIntroductions = (
  introductions: IntroductionQueryData
): FormattedIntroductionItem => {
  return pipe(
    introductions,
    pluckList,
    mapListItems(flattenListItem),
    mapListItems((item: any) =>
      mapObjectProps(
        item,
        ["contentsType"],
        extractCategoryValues({
          language: "KO",
          multiple: false,
        })
      )
    ),
    mapListItems(
      extractStringValues(["contentsText"], "KO")
    ),
    mapListItems((item: any) =>
      mapObjectProps(
        item,
        ["ideaImage"],
        extractMediaImage
      )
    )
  );
};

export const extractMediaImage = (
  medias: MediaInterface[]
): (MediaInterface | FormattedImageMedia)[] => {
  return medias.map((media) => {
    if (media.fileType !== "IMAGE") {
      return media;
    }

    return {
      id: media._id,
      name: media.file.name,
      path: media.file.path,
    };
  });
};

export const extractCategoryValues = curry(
  (
    options: {
      language: "KO" | "EN";
      multiple: boolean;
    },
    categories: Array<CategoryInterface>
  ): FormattedCategory | FormattedCategory[] => {
    const formatted = categories.map((category) => {
      return {
        id: category._id,
        value: category.languageMap[
          options.language
        ] as string,
      };
    });

    return options.multiple ? formatted : formatted[0];
  }
);

export const sortIntroductions = (
  formattedIntroductions: FormattedIntroductionItem[]
) => {
  return orderBy(
    formattedIntroductions,
    [
      "contentsOrder",
      "contentsType.id",
      "contentsSubOrder",
    ],
    ["asc", "asc", "asc"]
  );
};
