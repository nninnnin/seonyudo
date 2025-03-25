"use client";

import clsx from "clsx";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import LocationProximityProvider from "@/features/location/components/LocationProximityProvider";
import { LocationProximityContext } from "@/features/location/components/LocationProximityProvider";
import Overlay from "@/shared/components/Overlay";

const LocationDetails = ({
  locationSlug,
}: {
  locationSlug: LocationSlugs;
}) => {
  const { location } = useLocation(locationSlug);

  if (!location) return <></>;

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
        <p>{location.description}</p>

        <LocationProximityProvider>
          <LocationDetails.ArTriggerButton
            locationSlug={location?.slug}
          />
        </LocationProximityProvider>
      </div>
    </Overlay>
  );
};

LocationDetails.ArTriggerButton = ({
  locationSlug,
}: {
  locationSlug: LocationSlugs;
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
        router.push(`/ar/${locationSlug}/contents`)
      }
      // disabled={!locationProximity[locationName]}
    >
      AR 실행하기
    </button>
  );
};

export default LocationDetails;
