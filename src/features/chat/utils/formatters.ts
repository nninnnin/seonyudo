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
} from "@/shared/types/memex";
import {
  IntroductionFormattedQueryData,
  IntroductionQueryData,
} from "@/features/chat/types";
import { FormattedIntorductionItem } from "@/features/chat/types/index";
import { orderBy } from "lodash";

export const formatIntroductions = (
  introductions: IntroductionQueryData
): IntroductionFormattedQueryData => {
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
    )
  );
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
  formattedIntroductions: FormattedIntorductionItem[]
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
