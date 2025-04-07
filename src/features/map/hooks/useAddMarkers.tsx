import { useEffect } from "react";
import { Map } from "mapbox-gl";
import { pipe } from "@rebel9/memex-fetcher";
import { isEqual } from "lodash";
import { AnimatePresence } from "motion/react";

import "../styles/marker.css";
import {
  addMarker,
  createMarker,
  setMarkerCoords,
  addMarkerClickHandler,
  addCompletionStyles,
} from "@/features/map/utils/marker";
import { useOverlay } from "@toss/use-overlay";
import LocationDetailsToast from "@/features/location/components/LocationDetailsToast";
import { LocationFormatted } from "@/features/location/types/location";
import { useArCompletionStore } from "@/features/ar/store";

const useAddMarkers = (
  map: Map | null,
  locations: LocationFormatted[]
) => {
  const overlay = useOverlay();

  const handleClickMarker =
    (location: LocationFormatted) => () => {
      overlay.open(({ close, isOpen }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <LocationDetailsToast
                close={close}
                location={location}
              />
            )}
          </AnimatePresence>
        );
      });
    };

  const { arCompletedLocations } =
    useArCompletionStore();

  const addMarkers = (
    map: Map,
    locations: LocationFormatted[]
  ) => {
    locations.forEach((location) => {
      const { name, latitude, longitude } = location;

      const coords = {
        lat: Number(latitude),
        lng: Number(longitude),
      };

      const hasAlreadyAdded = map._markers.find(
        (marker) => {
          return isEqual(
            { ...marker._lngLat },
            coords
          );
        }
      );

      if (hasAlreadyAdded) return;

      const arCompleted =
        arCompletedLocations.includes(name.KO!);

      pipe(
        createMarker(name.KO!),
        setMarkerCoords(coords),
        addMarkerClickHandler(
          handleClickMarker(location)
        ),
        addCompletionStyles(arCompleted),
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
