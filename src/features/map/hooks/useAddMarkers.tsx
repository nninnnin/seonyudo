import { useEffect } from "react";
import { Map } from "mapbox-gl";
import { pipe } from "@rebel9/memex-fetcher";

import "../styles/marker.css";
import {
  addMarker,
  createMarker,
  setMarkerCoords,
} from "@/features/map/utils/marker";

const useAddMarkers = (
  map: Map | null,
  locations: {
    name: string;
    coords: { lat: number; lng: number };
  }[]
) => {
  useEffect(() => {
    if (!map) return;
    if (!locations || !locations.length) return;

    locations.forEach((location) => {
      const { name, coords } = location;

      pipe(
        createMarker(name),
        setMarkerCoords(coords),
        addMarker(map)
      );
    });
  }, [map, locations]);
};

export default useAddMarkers;
