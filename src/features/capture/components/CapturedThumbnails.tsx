import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { capturedPictureStore } from "@/features/capture/store";

const CapturedThumbnails = () => {
  const { capturedPictures } = useStore(
    capturedPictureStore
  );

  return (
    <div
      className={clsx(
        "flex flex-row gap-[10px]",
        "fixed bottom-[50px] right-[24px]"
      )}
    >
      {capturedPictures.map((pic) => {
        return (
          <img
            key={pic.id}
            className={clsx(
              "border-[1px] border-[1px solid white] rounded-[3px]",
              "w-[24px] h-[24px] object-cover"
            )}
            src={pic.url}
            alt="captured"
          />
        );
      })}
    </div>
  );
};

export default CapturedThumbnails;
