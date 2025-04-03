"use client";

import React, { createContext, useState } from "react";

import {
  LocationFormatted,
  LocationName,
} from "@/features/location/types/location";
import useWatchPosition from "@/features/location/hooks/useWatchPosition";
import useLocations from "@/features/location/hooks/useLocations";
import { getLocationProximity } from "@/features/location/utils/distance";

const defaultValue: Record<
  LocationName,
  null | number
> = {
  "녹색기둥의 정원": null,
  "선유도 전망대": null,
  "시간의 정원": null,
  선유정: null,
  수질정화원: null,
};

export const LocationProximityContext =
  createContext(defaultValue);

const LocationProximityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { locations } = useLocations();

  const [locationProximity, setLocationProxmity] =
    useState(defaultValue);

  const onSuccess = (
    position: GeolocationPosition
  ) => {
    const { coords: currentCoords } = position;

    if (!currentCoords) return;
    if (!locations) return;

    const locationsWithProximity =
      getLocationProximity(locations, currentCoords);

    setLocationProxmity(
      locationsWithProximity.reduce(
        (
          acc: Record<LocationName, boolean>,
          cur: LocationFormatted & { nearBy: boolean }
        ) => {
          acc[cur.name.KO ?? ""] = cur.nearBy;
          return acc;
        },
        {}
      )
    );
  };

  useWatchPosition(
    {
      onSuccess,
      onError: (error) => {
        console.error("watch position error:", error);

        if (error.code === 3) {
          return;
        }
      },
    },
    [locations]
  );

  return (
    <LocationProximityContext.Provider
      value={locationProximity}
    >
      {children}
    </LocationProximityContext.Provider>
  );
};

export default LocationProximityProvider;
