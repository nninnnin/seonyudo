import { LocationFormatted } from "@/features/location/types/location";
import { MediaInterface } from "@/shared/types/memex";
import {
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
    mapListItems((item: unknown) =>
      mapObjectProps(
        item,
        ["arImage", "arThumbnail"],
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
