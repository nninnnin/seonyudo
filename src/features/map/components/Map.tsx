"use client";

import clsx from "clsx";
import React from "react";

import useMapboxgl from "@/features/map/hooks/useMapboxgl";
import useLocations from "@/features/location/hooks/useLocations";
import useAddMarkers from "@/features/map/hooks/useAddMarkers";
import useLocationRecommendation from "@/features/map/hooks/useLocationRecommendation";

import useArCompletion from "@/features/map/hooks/useArCompletion";
import useUserLocation from "@/features/map/hooks/useUserLocation";

const Map = () => {
  const { mapInstance, mapContainerRef } =
    useMapboxgl();

  const { locations } = useLocations();

  useAddMarkers(mapInstance, locations);

  useLocationRecommendation();

  useArCompletion();

  useUserLocation((position) => {
    console.log("user position", position);

    setTimeout(() => {
      const myLocationButton = document.querySelector(
        ".mapboxgl-ctrl-geolocate"
      ) as HTMLButtonElement | null;

      myLocationButton?.click();
    }, 100);
  });

  return (
    <>
      <div
        id="map-container"
        className={clsx(
          "w-full h-full",
          "relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
        ref={mapContainerRef}
      ></div>
    </>
  );
};

export default Map;
