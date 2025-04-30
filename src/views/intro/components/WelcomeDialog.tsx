"use client";

import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { requestDeviceMotionPermission } from "@/features/permission/utils/deviceMotion";
import {
  checkGeolocationPermission,
  requestGeolocation,
} from "@/features/permission/utils/geolocation";
import { GeolocationPermissionCode } from "@/features/permission/constants/index";
import Overlay from "@/shared/components/Overlay";
import { introStore } from "@/views/intro/store/intro";

const WelcomeDialog = ({
  close,
}: {
  close: () => void;
}) => {
  const { setHasPermissionError } =
    useStore(introStore);
  const showPermissionError = () =>
    setHasPermissionError(true);

  const handleClick = async () => {
    const deviceMotionPermission =
      await requestDeviceMotionPermission();

    if (deviceMotionPermission === "denied") {
      showPermissionError();

      return;
    }

    const geolocationPermission =
      await checkGeolocationPermission();

    if (geolocationPermission.state === "granted") {
      close();
      return;
    }

    requestGeolocation(
      (position) => {
        console.log(
          "position permission granted",
          position
        );

        close();
      },
      (err) => {
        console.log("geolocation request error", err);

        if (
          err.code ===
          GeolocationPermissionCode.PERMISSION_DENIED
        ) {
          showPermissionError();
        }
      }
    );
  };

  return (
    <Overlay className="!bg-opacity-30 z-[9999]">
      <div
        className={clsx(
          "intro-dialog-container",
          "bg-black bg-opacity-30",
          "p-[50px] pl-[48px] pr-[49px] pb-[24px] rounded-[18px]",
          "flex flex-col justify-center items-center",
          "text-white",
          "backdrop:blur-[10px]"
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
            선유도공원 곳곳에 숨겨 놓은 동화 같은
            풍경을 AR로 경험해 보세요!
          </span>

          <span>
            Explore hidden fairytale scenes in Seonyudo
            Park with AR in Unseeing: Seonyu Donghwa
          </span>
        </p>

        <button
          className={clsx(
            "p-[12px] rounded-[30px]",
            "bg-white p-[10px]",
            "text-black text-center text-[16px] font-[700] leading-[134%] tracking-[-0.198px]",
            "mt-[26px]",
            "flex items-center justify-center gap-[4px]"
          )}
          onClick={handleClick}
        >
          <img src="/icons/arrow--left.svg" />
          <span className="px-[8px]">Start</span>
        </button>
      </div>
    </Overlay>
  );
};

export default WelcomeDialog;
