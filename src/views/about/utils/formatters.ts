import { orderBy } from "lodash";
import { curry, filter } from "@fxts/core";
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
  MediaInterface,
  FormattedImageMedia,
} from "@/shared/types/memex";
import {
  FormattedIntroductionItem,
  IntroductionQueryData,
} from "@/views/about/types";
import { Languages } from "@/shared/store/language";

export const formatIntroductions = curry(
  (
    language: Languages,
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
            language,
            multiple: false,
          })
        )
      ),
      mapListItems(
        extractStringValues(["contentsText"], language)
      ),
      mapListItems((item: any) => {
        if (
          !item.ideaImage ||
          item.ideaImage.length === 0
        ) {
          return item;
        }

        return mapObjectProps(
          item,
          ["ideaImage"],
          extractImageMedia
        );
      })
    );
  }
);

export const extractImageMedia = (
  medias: MediaInterface[]
): FormattedImageMedia[] => {
  return medias
    .filter((media) => media.fileType === "IMAGE")
    .map((media) => {
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
