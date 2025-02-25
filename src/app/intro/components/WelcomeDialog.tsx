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
import { introStore } from "@/app/intro/store/intro";

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
          "bg-black text-white",
          "w-[200px] h-[200px]",
          "flex flex-col justify-center items-center",
          "gap-[10px]"
        )}
      >
        <p>어서오세요!</p>

        <button
          className="bg-white text-black p-[10px]"
          onClick={handleClick}
        >
          들어가기
        </button>
      </div>
    </Overlay>
  );
};

export default WelcomeDialog;
