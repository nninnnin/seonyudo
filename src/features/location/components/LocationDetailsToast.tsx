import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Toast from "@/shared/components/Toast";
import Button from "@/shared/components/Button";
import { LocationSlugs } from "@/features/location/types/location";
import { create, useStore } from "zustand";
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
  location: {
    name: {
      KO: string;
      EN: string;
    };
    description: {
      KO: string;
      EN: string;
    };
    slug: LocationSlugs;
  };
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
          <span>{location.name.KO}</span>
        </h1>

        <p className="body3">
          <span>{location.description.KO}</span>
          <br />
          <span>{location.description.EN}</span>
        </p>
      </div>

      <Button
        iconSource="/icons/twinkle--white.svg"
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
