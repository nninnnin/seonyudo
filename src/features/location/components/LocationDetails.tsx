"use client";

import clsx from "clsx";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence, motion } from "motion/react";
import React, {
  useContext,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { useStore } from "zustand";

const mushFont = localFont({
  src: "../fonts/MushyScript-Yoghurt.woff",
});

import useLocation from "@/features/location/hooks/useLocation";
import {
  LocationName,
  LocationSlugs,
} from "@/features/location/types/location";
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
import { replaceNewlineAsBreak } from "@/shared/utils";
import { requestDeviceMotionPermission } from "@/features/permission/utils/deviceMotion";
import { introStore } from "@/views/intro/store/intro";
import { useArContentsNavigationStore } from "@/features/ar/hooks/useCheckIsValidLocation";
import useLoadingOverlay from "@/shared/hooks/useLoadingOverlay";

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
          "mb-[12dvh]"
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

          {location.slug.includes("seonyujeong") && (
            <p>
              All About Birds Website
              <br />© Cornell Lab of Ornithology
            </p>
          )}
        </div>

        <LocationProximityProvider>
          <div className="flex gap-[20px]">
            <LocationDetails.ViewIdeasButton />
            <LocationDetails.ArTriggerButton
              locationName={
                location.name.KO as LocationName
              }
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
  locationName,
}: {
  locationSlug: LocationSlugs;
  locationName: LocationName;
}) => {
  const router = useRouter();
  const overlay = useOverlay();

  const { openLoadingOverlay } = useLoadingOverlay();

  const { setPassedLandingPage } =
    useArContentsNavigationStore();

  const { setHasPermissionError } =
    useStore(introStore);

  const locationProximity = useContext(
    LocationProximityContext
  );

  const hasAlert = useRef(false);

  console.log("거점별 Proxmity: ", locationProximity);

  const isDev = process.env.IS_DEV === "1";

  const 접근했는가 = isDev
    ? true
    : locationProximity[locationName];

  const handleOpenButtonArClick = async () => {
    if (!접근했는가) {
      if (hasAlert.current) return;

      hasAlert.current = true;

      overlay.open(({ isOpen, close }) => {
        useEffect(() => {
          setTimeout(() => {
            close();

            setTimeout(
              () => (hasAlert.current = false),
              160
            );
          }, 2000);
        }, []);

        return (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={clsx(
                  "intro-dialog-container",
                  "bg-black bg-opacity-30",
                  "p-[25px] pl-[24px] pr-[23px] rounded-[18px]",
                  "flex flex-col justify-center items-center",
                  "text-white",
                  "backdrop:blur-[10px]",
                  "fixed left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2 z-[9999]",
                  "backdrop-blur-[10px]"
                )}
              >
                <p
                  className={clsx(
                    "w-[236px]",
                    "text-[16px] font-[700] leading-[120%]",
                    "break-keep",
                    "flex flex-col gap-[16px]"
                  )}
                >
                  <span>
                    안내판 근처에서 Open AR 버튼을
                    눌러주세요.
                  </span>

                  <span>
                    Press 'Open AR' button nearby QR
                    code panel
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        );
      });

      return;
    }

    const deviceMotionPermission =
      await requestDeviceMotionPermission();

    if (deviceMotionPermission !== "granted") {
      const permission =
        await requestDeviceMotionPermission();

      if (permission === "denied") {
        setHasPermissionError(true);
        router.push("/intro");

        return;
      }
    }

    setPassedLandingPage(true);
    openLoadingOverlay("");
    router.push(`/ar/${locationSlug}/contents`);
  };

  return (
    <Button
      className={clsx(
        "!w-[130px]",
        "!bg-black !bg-opacity-20 backdrop-blur-[7.5px]",
        "*:!text-[#f0ff82]",
        "prevent-select",
        접근했는가
          ? ""
          : "!bg-slate-300 *:!text-white !bg-opacity-100"
      )}
      iconSource={
        접근했는가
          ? "/icons/twinkle--lime.svg"
          : "/icons/twinkle--white.svg"
      }
      onClick={handleOpenButtonArClick}
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
