"use client";

import clsx from "clsx";
import React from "react";

import { requestDeviceMotionPermission } from "@/features/permission/utils/deviceMotion";
import {
  checkGeolocationPermission,
  requestGeolocation,
} from "@/features/permission/utils/geolocation";
import { GeolocationPermissionCode } from "@/features/permission/constants/index";
import Overlay from "@/shared/components/Overlay";
import usePageRouter from "@/shared/hooks/usePageRouter";
import { useStore } from "zustand";
import { introStore } from "@/views/intro/store/intro";

const WelcomeDialog = () => {
  const { goHome } = usePageRouter();
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
      goHome();
      return;
    }

    requestGeolocation(
      (position) => {
        goHome();
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
    <Overlay>
      <div
        className={clsx(
          "intro-dialog-container",
          "bg-white",
          "p-[20px] rounded-[8px]",
          "flex flex-col justify-center items-center",
          "gap-[20px]"
        )}
      >
        <p
          className={clsx(
            "w-[236px]",
            "text-[12px] font-[700] leading-[150%]",
            "break-keep"
          )}
        >
          <span>
            〈Unseeing: 선유동화〉에서 선유도공원
            곳곳에 숨겨 놓은 동화 같은 풍경을 AR로
            경험해 보세요!
          </span>

          <br />

          <span className="text-[11px] font-normal">
            Explore hidden fairytale scenes in Seonyudo
            Park with AR in Unseeing: Seonyu Donghwa.
          </span>
        </p>

        <button
          className={clsx(
            "w-[240px] py-[12px] rounded-[8px]",
            "bg-black text-white p-[10px]",
            "text-center text-[18px] font-[700] leading-[150%] tracking-[-0.198px]"
          )}
          onClick={handleClick}
        >
          시작하기
        </button>
      </div>
    </Overlay>
  );
};

export default WelcomeDialog;
