import {
  mapListItems,
  pipe,
} from "@rebel9/memex-fetcher";
import { curry } from "@fxts/core";
import { getDistance } from "geolib";
import { merge, zipWith } from "lodash";

import { LocationFormatted } from "@/features/location/types/location";
import { parseCoordString } from "@/features/map/utils";
import { ADJACENT_STANDARD_IN_METER } from "@/features/location/constants";

export const getLocationCoords = (
  location: LocationFormatted
): {
  latitude: number;
  longitude: number;
} => {
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

export const getProximity = curry(
  (standard: number, distance: number) => {
    return {
      nearBy: distance <= standard,
    };
  }
);

export const zipWithMerge = curry((arr1, arr2) => {
  return zipWith(arr1, arr2, merge);
});

export const getLocationProximity = (
  locations: LocationFormatted[],
  currentCoords: Coords
) => {
  return pipe(
    locations,
    mapListItems(getLocationCoords),
    mapListItems(
      getDistanceBetweenCoords(currentCoords)
    ),
    mapListItems(
      getProximity(ADJACENT_STANDARD_IN_METER)
    ),
    zipWithMerge(locations)
  );
};

const withDistance = curry(
  (
    currentCoords: Coords,
    location: LocationFormatted
  ) => {
    return {
      ...location,
      distance: getDistanceBetweenCoords(
        currentCoords,
        getLocationCoords(location)
      ),
    };
  }
);

const reduceMinimumDistant = (
  locations: (LocationFormatted & {
    distance: number;
  })[]
) => {
  if (locations.length === 0) {
    return null;
  }

  return locations.reduce((prev, cur) => {
    return Math.min(prev.distance, cur.distance) ===
      prev.distance
      ? prev
      : cur;
  });
};

const filterInappropriateDistances = (
  locations: (LocationFormatted & {
    distance: number;
  })[]
) => {
  return locations.filter((location) => {
    return !(
      location.distance === 0 ||
      isNaN(location.distance)
    );
  });
};

export const getMostProximateLocation = (
  currentCoords: Coords,
  locations: LocationFormatted[]
): LocationFormatted => {
  return pipe(
    locations,
    mapListItems(withDistance(currentCoords)),
    filterInappropriateDistances,
    reduceMinimumDistant
  );
};
