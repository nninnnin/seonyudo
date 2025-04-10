"use client";

import clsx from "clsx";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence } from "motion/react";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import dynamic from "next/dynamic";

const mushFont = localFont({
  src: "../fonts/MushyScript-Yoghurt.woff",
});

import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import LocationProximityProvider from "@/features/location/components/LocationProximityProvider";
import { LocationProximityContext } from "@/features/location/components/LocationProximityProvider";
import Button from "@/shared/components/Button";
const Facade = dynamic(
  () => import("@/views/home/components/Facade"),
  {
    ssr: false,
    loading: () => (
      <div className="w-[100vw] h-[100dvh] loading-background-gradient"></div>
    ),
  }
);
import PageHeader from "@/shared/components/PageHeader";
import LocationIdeas from "@/features/location/components/LocationIdeas";
import { replaceNewlineAsBreak } from "@/app/ar/[locationSlug]/contents/page";

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
        "text-white",
        "loading-background-gradient"
      )}
    >
      <PageHeader />

      <Facade
        imageSource={
          location.arImage.path ?? "/images/whale.png"
        }
      />

      <div
        className={clsx(
          "w-[100vw] h-[100dvh]",
          "absolute top-0 left-0",
          "bg-[black] bg-opacity-30"
        )}
      ></div>

      <div
        className={clsx(
          "w-[300px] min-h-[20vh]",
          "flex flex-col justify-center items-center",
          "gap-[32px]",
          "text-center break-keep",
          "text-[16px] font-bold leading-[134%]",
          "absolute z-[10]",
          "mb-[8dvh]"
        )}
      >
        <div
          className={clsx(
            "text-[#f0ff82]",
            "flex flex-col gap-[8px]"
          )}
        >
          <h1
            className={clsx(
              "text-[15vw] leading-[1.2em] font-extrabold",
              "leading-[13vw] text-[55px] font-[430]",
              "w-[80vw] break-keep",
              mushFont.className
            )}
          >
            {location.arTitle.EN}
          </h1>
          <h1>{location.arTitle.KO}</h1>
        </div>

        <div className="flex flex-col gap-[8px]">
          <p
            dangerouslySetInnerHTML={{
              __html: replaceNewlineAsBreak(
                location.description.KO ?? ""
              ),
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: replaceNewlineAsBreak(
                location.description.EN ?? ""
              ),
            }}
          ></p>
        </div>
      </div>

      <div
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 bottom-[5dvh]",
          "flex flex-col items-center gap-[20px]"
        )}
      >
        <div className="text-center body4">
          <p>{location.name.KO}에서</p>
          <p>At {location.name.EN}</p>
        </div>

        <LocationProximityProvider>
          <div className="flex gap-[20px]">
            <LocationDetails.ViewIdeasButton />
            <LocationDetails.ArTriggerButton
              locationSlug={location?.slug}
            />
          </div>
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
      className={clsx(
        "!w-[130px]",
        "!bg-black !bg-opacity-20 backdrop-blur-[7.5px]",
        "*:!text-[#f0ff82]"
      )}
      iconSource="/icons/twinkle--lime.svg"
      onClick={() =>
        router.push(`/ar/${locationSlug}/contents`)
      }
    >
      Open AR
    </Button>
  );
};

LocationDetails.ViewIdeasButton = () => {
  const overlay = useOverlay();

  return (
    <Button
      className="!bg-black !bg-opacity-20 backdrop-blur-[7.5px] text-white"
      onClick={() => {
        overlay.open(({ close, isOpen }) => {
          return (
            <AnimatePresence>
              {isOpen && (
                <LocationIdeas close={close} />
              )}
            </AnimatePresence>
          );
        });
      }}
    >
      View Ideas
    </Button>
  );
};

export default LocationDetails;
