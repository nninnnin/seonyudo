"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import { useOverlay } from "@toss/use-overlay";
import {
  redirect,
  useSearchParams,
} from "next/navigation";

import Overlay from "@/shared/components/Overlay";
import ArFrame from "@/features/ar/components/ArFrame";
import useLocation from "@/features/location/hooks/useLocation";

const ArPage = () => {
  const overlay = useOverlay();
  const searchParams = useSearchParams();

  const locationName = searchParams?.get("location");
  const { location } = useLocation(locationName ?? "");

  useEffect(() => {
    if (!location?.arContentsUrl) return;

    overlay.open(({ close, isOpen }) => (
      <>
        {isOpen && (
          <Overlay>
            <div
              className={clsx(
                "flex flex-col items-center justify-center",
                "gap-[10px]",
                "p-[20px]",
                "w-[300px] h-[300px]",
                "bg-white"
              )}
            >
              <h2>AR Guide</h2>

              <p>
                Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Similique quia qui
                minima impedit necessitatibus. Iure
                eveniet asperiores dolor placeat
                voluptates.
              </p>

              <button
                className="bg-black text-white p-[10px]"
                onClick={close}
              >
                close
              </button>
            </div>
          </Overlay>
        )}
      </>
    ));
  }, [location]);

  if (!location || !location.arContentsUrl) {
    overlay.open(({ isOpen, close }) => (
      <>
        {isOpen && (
          <Overlay>
            <div
              className={clsx(
                "w-[200px] h-[200px] bg-white",
                "flex flex-col justify-center items-center",
                "gap-[20px]"
              )}
            >
              <p>AR 컨텐츠가 없습니다.</p>

              <button
                onClick={() => {
                  close();
                  redirect("/intro");
                }}
              >
                닫기
              </button>
            </div>
          </Overlay>
        )}
      </>
    ));

    return <></>;
  }

  return (
    <div>
      <ArFrame src={location?.arContentsUrl ?? ""} />
    </div>
  );
};

export default ArPage;
