import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";
import { AnimatePresence } from "motion/react";
import { useOverlay } from "@toss/use-overlay";

import Toast from "@/shared/components/Toast";
import { detailsToastStore } from "@/features/location/components/LocationDetailsToast";
import { useArCompletionStore } from "@/features/ar/store";
import LocationDetailsToast from "@/features/location/components/LocationDetailsToast";
import { LocationFormatted } from "@/features/location/types/location";

const LocationRecommendationToast = ({
  close,
  location,
}: {
  close: () => void;
  location: LocationFormatted;
}) => {
  const { isVisible: detailsToastVisible } = useStore(
    detailsToastStore
  );

  const overlay = useOverlay();

  const handleLocationSectionClick =
    (location: LocationFormatted) => () => {
      overlay.open(({ close, isOpen }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <LocationDetailsToast
                close={close}
                location={location}
              />
            )}
          </AnimatePresence>
        );
      });
    };

  return (
    <Toast
      className={clsx(
        "min-h-[219px] h-[219px]",
        "flex flex-col gap-[8px]",
        "text-[14px] font-bold leading-[134%]",
        "transition-transform duration-300 ease-in-out",
        detailsToastVisible &&
          clsx(
            "!translate-y-[-10%] blur-[1px] scale-90 pointer-events-none !z-[4000]"
          )
      )}
      close={close}
    >
      <LocationRecommendationToast.Message />

      <div
        className="flex items-start justfiy-between gap-[8px]"
        onClick={handleLocationSectionClick(location)}
      >
        <p className="w-[162px] break-keep">
          {location.name.KO}
          <br />
          {location.name.EN}
        </p>

        <img
          className="w-[111px] h-[111px]"
          src={location.arImage.path}
          alt={location.arImage.name}
        />
      </div>
    </Toast>
  );
};

LocationRecommendationToast.Message = () => {
  const { arCompletedLocations } =
    useArCompletionStore();

  const 하나도_완료되지_않았음 =
    arCompletedLocations.length === 0;

  if (하나도_완료되지_않았음) {
    return (
      <p>
        근처에 작품이 있어요
        <br />
        장소를 확인하고 체험해 보세요
        <br />
        An artwork is nearby
        <br />
        Check the location and enjoy the experience!
        <br />
      </p>
    );
  }

  return (
    <p className="w-[281px] break-keep">
      근처에 또 다른 작품이 있어요
      <br />
      다음 장소에서 계속 체험해 보세요
      <br />
      There’s another artwork nearby
      <br />
      Continue the experience at the next spot
      <br />
    </p>
  );
};

export default LocationRecommendationToast;
