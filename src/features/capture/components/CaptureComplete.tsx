import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import Button from "@/shared/components/Button";
import { capturedPictureStore } from "@/features/capture/store";
import { LocationSlugs } from "@/features/location/types/location";
import useSound from "@/features/sound/hooks/useSound";

const CaptureComplete = ({
  locationSlug,
}: {
  locationSlug: LocationSlugs;
}) => {
  const router = useRouter();

  const { capturedPictures } = useStore(
    capturedPictureStore
  );

  const { stop } = useSound("/sounds/scape.mp3");

  return (
    <motion.div
      key="capture-complete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(
        "w-[calc(100vw-28px)] h-[calc(100dvh-28px)]",
        "rounded-[18px]",
        "glassmorph",
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "flex flex-col justify-between items-center",
        "p-[31px] pt-[100px] pb-[74px]"
      )}
    >
      <p className="text-black text-center body1 break-keep">
        <span>
          마음에 드는 사진을 저장하고
          <br />
          공유해 보세요
        </span>
        <br />
        <span>
          Save and share
          <br />
          your favorite photos
        </span>
      </p>

      <div className="flex gap-[16px]">
        {capturedPictures.map(({ id, url }) => {
          return (
            <img
              key={`thumbnail-big-${id}`}
              className="w-[80px] h-[80px] rounded-[4px] object-cover"
              src={url}
            />
          );
        })}
      </div>

      <Button
        iconSource="/icons/thumbsup.svg"
        onClick={() => {
          stop();
          router.push(`/ar/share/${locationSlug}`);
        }}
      >
        Okay
      </Button>
    </motion.div>
  );
};

export default CaptureComplete;
