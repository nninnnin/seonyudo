import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { capturedPictureStore } from "@/features/capture/store";
import { pipe, range, toArray } from "@fxts/core";

const CapturedThumbnails = () => {
  const { capturedPictures } = useStore(
    capturedPictureStore
  );

  return (
    <div
      className={clsx(
        "flex flex-row gap-[10px]",
        "fixed bottom-[58px] right-[14px]"
      )}
    >
      {pipe(range(3), toArray).map((index) => {
        const pic = capturedPictures[index];

        return (
          <div key={`thumb-item-${index}`}>
            {pic ? (
              <img
                key={pic.id}
                className={clsx(
                  "border-[1px] border-[1px solid white] rounded-[3px]",
                  "w-[24px] h-[24px] object-cover"
                )}
                src={pic.url}
                alt="captured"
              />
            ) : (
              <CapturedThumbnails.Skeleton />
            )}
          </div>
        );
      })}
    </div>
  );
};

CapturedThumbnails.Skeleton = () => {
  return (
    <div className="w-[24px] h-[24px] border-[1px] border-[1px solid white] rounded-[3px]"></div>
  );
};

export default CapturedThumbnails;
