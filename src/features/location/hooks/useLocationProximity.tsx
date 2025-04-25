"use client";

import { useEffect, useRef } from "react";

import {
  LocationFormatted,
  LocationName,
} from "@/features/location/types/location";
import useLocations from "@/features/location/hooks/useLocations";
import { getLocationProximity } from "@/features/location/utils/distance";
import { usePathname } from "next/navigation";
import { create } from "zustand";

const defaultValue: Record<
  LocationName,
  null | number
> = {
  "녹색기둥의 정원": null,
  선유교전망대: null,
  "시간의 정원": null,
  선유정: null,
  수질정화원: null,
};

export const useLocationProximityStore = create<{
  locationProximity: Record<
    LocationName,
    null | number
  >;
  setLocationProximity: (
    locationProximity: Record<
      LocationName,
      null | number
    >
  ) => void;
}>((set) => ({
  locationProximity: defaultValue,
  setLocationProximity: (locationProximity) =>
    set({ locationProximity }),
}));

const useLocationProximity = () => {
  const pathname = usePathname();

  const { locations } = useLocations();

  const { setLocationProximity } =
    useLocationProximityStore();

  const onSuccess = (
    position: GeolocationPosition
  ) => {
    const { coords: currentCoords } = position;

    if (!currentCoords) return;
    if (!locations) return;

    const locationsWithProximity =
      getLocationProximity(locations, currentCoords);

    setLocationProximity(
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

  const allowTracking =
    pathname.includes("map") ||
    (pathname.includes("ar") &&
      !(
        pathname.includes("contents") ||
        pathname.includes("share")
      ));

  const watchIdRef = useRef<null | number>(null);

  useEffect(() => {
    if (!allowTracking) {
      console.log("여기에선 안한다");

      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(
          watchIdRef.current
        );

        console.log("해제한다");

        watchIdRef.current = null;
      }

      return;
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    watchIdRef.current =
      navigator.geolocation.watchPosition(
        onSuccess,
        (error) => {
          console.error(
            "watch position error:",
            error
          );

          if (error.code === 3) {
            return;
          }
        },
        options
      );

    console.log("추적 시작");

    return () => {
      if (!watchIdRef.current) return;

      navigator.geolocation.clearWatch(
        watchIdRef.current
      );

      console.log("추적 해제");

      watchIdRef.current = null;
    };
  }, [locations, allowTracking]);
};

export default useLocationProximity;
