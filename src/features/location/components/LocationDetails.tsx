"use client";

import clsx from "clsx";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import LocationProximityProvider from "@/features/location/components/LocationProximityProvider";
import { LocationProximityContext } from "@/features/location/components/LocationProximityProvider";
import Button from "@/shared/components/Button";
import Facade from "@/views/home/components/Facade";

const LocationDetails = ({
  locationSlug,
}: {
  locationSlug: LocationSlugs;
}) => {
  const { location } = useLocation(locationSlug);

  if (!location) return <></>;

  return (
    <div
      className={clsx(
        "w-full h-full",
        "flex flex-col justify-center items-center",
        "gap-[16px]",
        "p-[10px]",
        "relative",
        "text-white"
      )}
    >
      <Facade imageSource="/images/whale.png" />

      <div
        className={clsx(
          "w-[300px] min-h-[20vh]",
          "flex flex-col justify-center items-center",
          "gap-[4px]",
          "text-center break-keep",
          "text-[16px] font-bold leading-[134%]"
        )}
      >
        <h1 className="text-[5em] leading-[1.2em] font-extrabold">
          Whale
        </h1>

        <p>{location.description.KO}</p>
        <p>{location.description.EN}</p>
      </div>

      <div
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 bottom-[48px]",
          "flex flex-col items-center gap-[12px]"
        )}
      >
        <div className="body4 text-center">
          <p>{location.name.KO}에서</p>
          <p>At {location.name.EN}</p>
        </div>

        <LocationProximityProvider>
          <LocationDetails.ArTriggerButton
            locationSlug={location?.slug}
          />
          <LocationDetails.ViewIdeasButton />
        </LocationProximityProvider>
      </div>
    </div>
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
    <Button
      iconSource="/icons/magic.svg"
      onClick={() =>
        router.push(`/ar/${locationSlug}/contents`)
      }
    >
      Open AR
    </Button>
  );
};

LocationDetails.ViewIdeasButton = () => {
  return (
    <Button
      theme="white"
      iconSource="/icons/twinkle.svg"
      onClick={() => {}}
    >
      View Ideas
    </Button>
  );
};

export default LocationDetails;
