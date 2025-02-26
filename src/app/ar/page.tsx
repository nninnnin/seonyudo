"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import { useOverlay } from "@toss/use-overlay";
import { useSearchParams } from "next/navigation";

import Overlay from "@/shared/components/Overlay";
import ArFrame from "@/features/ar/components/ArFrame";
import useLocation from "@/features/location/hooks/useLocation";

const ArPage = () => {
  const overlay = useOverlay();
  const searchParams = useSearchParams();

  const locationName = searchParams?.get("location");
  const { location } = useLocation(locationName ?? "");

  if (!location || !location.arContentsUrl) {
    overlay.open(({ isOpen, close }) => (
      <>
        {isOpen && (
          <Overlay>
            <div
              className={clsx(
                "w-[200px] h-[200px] bg-white",
                "flex flex-col justify-center items-center"
              )}
            >
              <p>AR 컨텐츠가 없습니다.</p>
              <button onClick={close}>닫기</button>
            </div>
          </Overlay>
        )}
      </>
    ));

    return <></>;
  }

  useEffect(() => {
    overlay.open(({ close, isOpen }) => (
      <>
        {isOpen && (
          <Overlay>
            <div className="flex flex-col">
              <p>Guide</p>
              <button onClick={close}>close</button>
            </div>
          </Overlay>
        )}
      </>
    ));
  }, []);

  return (
    <div>
      <ArFrame src={location?.arContentsUrl ?? ""} />
    </div>
  );
};

export default ArPage;
