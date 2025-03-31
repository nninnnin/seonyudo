"use client";

import clsx from "clsx";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import LocationProximityProvider from "@/features/location/components/LocationProximityProvider";
import { LocationProximityContext } from "@/features/location/components/LocationProximityProvider";
import Button from "@/shared/components/Button";

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
        "bg-violet-300",
        "flex flex-col justify-center items-center",
        "gap-[16px]",
        "p-[10px]",
        "relative",
        "text-white"
      )}
    >
      <div
        className={clsx(
          "w-full min-h-[20vh]",
          "flex flex-col justify-center items-center",
          "gap-[4px]",
          "text-center"
        )}
      >
        <h1 className="text-[5em] leading-[1.2em] font-extrabold">
          Whale
        </h1>

        <p>
          바다와 구름이 떠도든 무엇이든 문의해주세요{" "}
          <br />
          꽃이 오면 봄이 간다 가을 겨울 봄 여름
          예술경영
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Tempora, modi.
        </p>
      </div>

      <LocationProximityProvider>
        <div
          className={clsx(
            "fixed left-1/2 -translate-x-1/2 bottom-[48px]",
            "flex flex-col items-center gap-[12px]"
          )}
        >
          <LocationDetails.ArTriggerButton
            locationSlug={location?.slug}
          />
          <LocationDetails.ViewIdeasButton />
        </div>
      </LocationProximityProvider>
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
