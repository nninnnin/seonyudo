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
import { LocationSlugs } from "@/features/location/types/location";

type Location = {
  name: string;
  coords: { lat: number; lng: number };
  slug: LocationSlugs;
  arCompleted: boolean;
};

type Locations = Location[];

const useAddMarkers = (
  map: Map | null,
  locations: Locations
) => {
  const overlay = useOverlay();

  const handleClickMarker =
    (location: Location) => () => {
      overlay.open(({ close, isOpen }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <LocationDetailsToast
                close={close}
                location={{
                  name: {
                    KO: location.name,
                    EN: location.name,
                  },
                  description: {
                    KO: "설명",
                    EN: "Description",
                  },
                  slug: location.slug,
                }}
              />
            )}
          </AnimatePresence>
        );
      });
    };

  const addMarkers = (
    map: Map,
    locations: Locations
  ) => {
    locations.forEach((location) => {
      const { name, coords, arCompleted } = location;

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
