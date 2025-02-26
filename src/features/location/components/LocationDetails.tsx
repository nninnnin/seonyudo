"use client";

import clsx from "clsx";
import { useStore } from "zustand";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import useLocation from "@/features/location/hooks/useLocation";
import { locationStore } from "@/features/location/store/location";
import Overlay from "@/shared/components/Overlay";
import LocationProximityProvider from "@/features/location/components/LocationProximityProvider";
import { LocationProximityContext } from "@/features/location/components/LocationProximityProvider";
import { LocationName } from "@/features/location/types/location";

const LocationDetails = () => {
  const { selectedLocation, resetSelectedLocation } =
    useStore(locationStore);

  const { location } = useLocation(
    selectedLocation ?? ""
  );

  return (
    <Overlay>
      <div
        className={clsx(
          "w-[300px] h-[300px]",
          "bg-white",
          "flex flex-col justify-center items-center",
          "p-[10px]",
          "relative"
        )}
      >
        <button
          className="absolute top-0 right-0 p-[10px]"
          onClick={() => resetSelectedLocation()}
        >
          X
        </button>

        <p>{location?.description ?? ""}</p>

        <LocationProximityProvider>
          <LocationDetails.ArTriggerButton
            locationName={location?.name ?? ""}
          />
        </LocationProximityProvider>
      </div>
    </Overlay>
  );
};

LocationDetails.ArTriggerButton = ({
  locationName,
}: {
  locationName: LocationName;
}) => {
  const router = useRouter();

  const locationProximity = useContext(
    LocationProximityContext
  );

  return (
    <button
      className={clsx(
        "bg-black text-white mt-[20px] p-[10px]",
        "disabled:bg-gray-300",
        "disabled:pointer-events-none"
      )}
      onClick={() =>
        router.push(`/ar?location=${locationName}`)
      }
      disabled={!locationProximity[locationName]}
    >
      AR 실행하기
    </button>
  );
};

export default LocationDetails;
