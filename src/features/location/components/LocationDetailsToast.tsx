import React, { useEffect } from "react";
import { create, useStore } from "zustand";
import { useRouter } from "next/navigation";

import Toast from "@/shared/components/Toast";
import Button from "@/shared/components/Button";
import { LocationFormatted } from "@/features/location/types/location";
import useLoadingOverlay from "@/shared/hooks/useLoadingOverlay";

export const detailsToastStore = create<{
  isVisible: boolean;
  setDetailsToastVisible: (isVisible: boolean) => void;
}>((set) => ({
  isVisible: false,
  setDetailsToastVisible: (isVisible: boolean) =>
    set({ isVisible }),
}));

const LocationDetailsToast = ({
  location,
  close,
}: {
  location: LocationFormatted;
  close: () => void;
}) => {
  const router = useRouter();

  const { setDetailsToastVisible } = useStore(
    detailsToastStore
  );

  useEffect(() => {
    setDetailsToastVisible(true);

    return () => {
      setDetailsToastVisible(false);
    };
  }, []);

  const { openLoadingOverlay } = useLoadingOverlay();

  return (
    <Toast
      close={() => {
        close();
        setDetailsToastVisible(false);
      }}
    >
      <div className="flex flex-col gap-[20px]">
        <h1 className="body2">
          <span>{location.name.KO}</span>
          <br />
          <span>{location.name.EN}</span>
        </h1>

        <div className="flex justify-between gap-[8px]">
          <p className="body3">
            <span>{location.placeDescription.KO}</span>
            <br />
            <span>{location.placeDescription.EN}</span>
          </p>

          <img
            src={location.locationThumbnail.path}
            alt={location.locationThumbnail.name}
            width={109}
            height={109}
          />
        </div>
      </div>

      <Button
        theme="white"
        className="w-[130px] h-[38px] mt-[13px]"
        iconSource="/icons/twinkle.svg"
        onClick={() => {
          openLoadingOverlay("");
          router.push(`/ar/${location.slug}`);
        }}
      >
        Open AR
      </Button>
    </Toast>
  );
};

export default LocationDetailsToast;
