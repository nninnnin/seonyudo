import { LocationFormatted } from "@/features/location/types/location";
import {
  extractStringValues,
  flattenListItem,
  mapListItems,
  pipe,
  pluckList,
} from "@rebel9/memex-fetcher";

export const formatLocations = (
  result: any
): LocationFormatted[] => {
  return pipe(
    result,
    pluckList,
    mapListItems(flattenListItem),
    mapListItems(
      extractStringValues(
        ["name", "description", "arContentsUrl"],
        "KO"
      )
    )
  );
};

export const getJsonBody = async (res: Response) =>
  await res.json();
