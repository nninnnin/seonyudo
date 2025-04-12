import { Map } from "mapbox-gl";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { pipe } from "@rebel9/memex-fetcher";
import { useOverlay } from "@toss/use-overlay";

import "../styles/marker.css";
import {
  addMarker,
  createMarker,
  setMarkerCoords,
  addMarkerClickHandler,
  addCompletionStyles,
} from "@/features/map/utils/marker";
import LocationDetailsToast from "@/features/location/components/LocationDetailsToast";
import { LocationFormatted } from "@/features/location/types/location";
import { useArCompletionStore } from "@/features/ar/store";
import { DECORATIVE_LOCATIONS } from "@/features/map/constants";

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

  const addLocationMarkers = (
    map: Map,
    locations: LocationFormatted[]
  ) => {
    locations.forEach((location) => {
      const { name, latitude, longitude } = location;

      const coords = {
        lat: Number(latitude),
        lng: Number(longitude),
      };

      const alreadyAddedMarker = map._markers.find(
        (marker) => {
          const isCoordsEqual = isEqual(
            { ...marker._lngLat },
            coords
          );

          const isNameEqual =
            marker.getElement().id === name.KO;

          return isCoordsEqual && isNameEqual;
        }
      );

      if (alreadyAddedMarker) {
        alreadyAddedMarker.remove();
      }

      const arCompleted =
        arCompletedLocations.includes(name.KO!);

      pipe(
        createMarker(name, "location"),
        setMarkerCoords(coords),
        addMarkerClickHandler(
          handleClickMarker(location)
        ),
        addCompletionStyles(arCompleted),
        addMarker(map)
      );
    });
  };

  const addDecorativeMarkers = (
    map: Map,
    decoratives: {
      label: string;
      coords: { lat: number; lng: number };
    }[]
  ) => {
    decoratives.forEach(({ label, coords }) => {
      pipe(
        createMarker(
          {
            KO: label,
          },
          "decorative"
        ),
        setMarkerCoords(coords),
        addMarkerClickHandler(() => {}),
        addMarker(map)
      );
    });
  };

  const removeAllMarkers = (map: Map) => {
    map._markers.forEach((marker) => {
      marker.remove();
    });
  };

  useEffect(() => {
    if (!map) return;
    if (!locations || !locations.length) return;

    removeAllMarkers(map);

    addLocationMarkers(map, locations);
    addDecorativeMarkers(map, DECORATIVE_LOCATIONS);
  }, [map, locations, arCompletedLocations]);
};

export default useAddMarkers;
