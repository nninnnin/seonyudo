"use client";

import clsx from "clsx";
import React from "react";

import useMapboxgl from "@/features/map/hooks/useMapboxgl";
import useLocations from "@/features/location/hooks/useLocations";
import useAddMarkers from "@/features/map/hooks/useAddMarkers";
import { parseCoordString } from "@/features/map/utils/index";

const Map = () => {
  const { mapInstance, mapContainerRef } =
    useMapboxgl();
  const { locations } = useLocations();

  useAddMarkers(
    mapInstance,
    locations.map((loc) => ({
      name: loc.name,
      coords: {
        lat: parseCoordString(loc.latitude),
        lng: parseCoordString(loc.longitude),
      },
      slug: loc.slug,
    }))
  );

  return (
    <div
      id="map-container"
      className={clsx(
        "w-full h-full",
        "relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "bg-blue-100"
      )}
      ref={mapContainerRef}
    ></div>
  );
};

export default Map;
