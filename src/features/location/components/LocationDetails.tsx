"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const mushFont = localFont({
  src: "../fonts/MushyScript-Yoghurt.woff",
});

import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import LocationProximityProvider from "@/features/location/components/LocationProximityProvider";
import { LocationProximityContext } from "@/features/location/components/LocationProximityProvider";
import Button from "@/shared/components/Button";
import Facade from "@/views/home/components/Facade";
import PageHeader from "@/shared/components/PageHeader";
import { useOverlay } from "@toss/use-overlay";

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
      <PageHeader />

      <Facade
        imageSource={
          location.arImage.path ?? "/images/whale.png"
        }
      />

      <div
        className={clsx(
          "w-[300px] min-h-[20vh]",
          "flex flex-col justify-center items-center",
          "gap-[32px]",
          "text-center break-keep",
          "text-[16px] font-bold leading-[134%]"
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
              "text-[5em] leading-[1.2em] font-extrabold",
              "leading-[49px] text-[55px] font-[430]",
              mushFont.className
            )}
          >
            {location.arTitle.EN}
          </h1>
          <h1>{location.arTitle.KO}</h1>
        </div>

        <div className="flex flex-col gap-[8px]">
          <p>{location.description.KO}</p>
          <p>{location.description.EN}</p>
        </div>

        <div className="text-center body4">
          <p>{location.name.KO}에서</p>
          <p>At {location.name.EN}</p>
        </div>
      </div>

      <div
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 bottom-[48px]",
          "flex flex-col items-center gap-[12px]"
        )}
      >
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
                <motion.div
                  className={clsx(
                    "fixed bottom-0 left-0 z-[9999]",
                    "w-full h-[100dvh]",
                    "home-background-gradient",
                    "pt-[40px]"
                  )}
                  initial={{
                    translateY: "100%",
                  }}
                  animate={{
                    translateY: 0,
                  }}
                  exit={{
                    translateY: "100%",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <button
                    className={clsx(
                      "absolute right-0 top-0 bg-white",
                      "rounded-[18px] p-[10px]"
                    )}
                    onClick={() => close()}
                  >
                    닫기
                  </button>

                  <div
                    className={clsx(
                      "w-[250px] text-center text-white",
                      "mx-auto"
                    )}
                  >
                    <h1 className="font-extrabold text-[25px] mb-[19px] tracking-[-0.408px]">
                      시민 아이디어 스케치 소개
                    </h1>

                    <p>
                      Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit.
                      Ullam eum omnis ipsam fugiat
                      fugit porro impedit minima cum!
                      Alias cumque quas facere magni
                      doloribus ex laudantium
                      repudiandae dolore voluptate
                      impedit magnam error quaerat
                      architecto debitis officia sint
                      nemo, provident labore quod
                      sapiente quos porro! Aliquam ea
                      accusantium officia optio
                      voluptatem.
                    </p>
                  </div>
                </motion.div>
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
