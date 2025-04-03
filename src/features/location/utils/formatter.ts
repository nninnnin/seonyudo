import { LocationFormatted } from "@/features/location/types/location";
import { MediaInterface } from "@/shared/types/memex";
import {
  extractStringValues,
  flattenListItem,
  mapListItems,
  mapObjectProps,
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
      extractStringValues(["arTitle"], "KO")
    ),
    mapListItems((item: unknown) =>
      mapObjectProps(
        item,
        ["arImage"],
        (value: MediaInterface[]) => {
          const media = value[0];

          if (!media) {
            return value;
          }

          const formattedMedia = {
            name: media.file.name,
            path: media.file.path,
          };

          return formattedMedia;
        }
      )
    )
  );
};

export const getJsonBody = async (res: Response) =>
  await res.json();
