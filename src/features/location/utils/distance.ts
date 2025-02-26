import { curry } from "@fxts/core";
import { getDistance } from "geolib";

import { LocationFormatted } from "@/features/location/types/location";
import { parseCoordString } from "@/features/map/utils";
import { ADJACENT_STANDARD_IN_METER } from "@/features/location/constants";
import { merge, zipWith } from "lodash";

export const getLocationCoords = (
  location: LocationFormatted
) => {
  const { latitude, longitude } = location;

  return {
    latitude: parseCoordString(latitude),
    longitude: parseCoordString(longitude),
  };
};

type Coords = {
  latitude: number;
  longitude: number;
};

export const getDistanceBetweenCoords = curry(
  (coords1: Coords, coords2: Coords) => {
    return getDistance(
      {
        latitude: coords1.latitude,
        longitude: coords1.longitude,
      },
      {
        latitude: coords2.latitude,
        longitude: coords2.longitude,
      }
    );
  }
);

export const getProximity = (distance: number) => {
  return {
    nearBy: distance <= ADJACENT_STANDARD_IN_METER,
  };
};

export const zipWithMerge = curry((arr1, arr2) => {
  return zipWith(arr1, arr2, merge);
});
