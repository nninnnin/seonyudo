import { useEffect } from "react";
import { Map } from "mapbox-gl";
import { pipe } from "@rebel9/memex-fetcher";
import { isEqual } from "lodash";

import "../styles/marker.css";
import {
  addMarker,
  createMarker,
  setMarkerCoords,
} from "@/features/map/utils/marker";

type Locations = {
  name: string;
  coords: { lat: number; lng: number };
}[];

const useAddMarkers = (
  map: Map | null,
  locations: Locations
) => {
  const addMarkers = (
    map: Map,
    locations: Locations
  ) => {
    locations.forEach((location) => {
      const { name, coords } = location;

      // check if the location is already added
      const hasAlreadyAdded = map._markers.find(
        (marker) => {
          return isEqual(
            { ...marker._lngLat },
            location.coords
          );
        }
      );

      if (hasAlreadyAdded) return;

      pipe(
        createMarker(name),
        setMarkerCoords(coords),
        addMarker(map)
      );
    });
  };

  useEffect(() => {
    if (!map) return;
    if (!locations || !locations.length) return;

    addMarkers(map, locations);
  }, [map, locations]);
};

export default useAddMarkers;
