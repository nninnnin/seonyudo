"use client";

import React from "react";

import { requestDeviceMotionPermission } from "@/features/permission/utils/deviceMotion";
import {
  checkGeolocationPermission,
  requestGeolocation,
} from "@/features/permission/utils/geolocation";
import { GeolocationPermissionCode } from "@/features/permission/constants/index";

const WelcomeDialog = () => {
  return (
    <div>
      <p>어서오세요!</p>

      <button
        onClick={async () => {
          const deviceMotionPermission = await requestDeviceMotionPermission();

          if (deviceMotionPermission === "denied") {
            alert("denied");

            return;
          }

          const geolocationPermission = await checkGeolocationPermission();

          if (geolocationPermission.state === "granted") {
            // 홈 페이지로..
            return;
          }

          requestGeolocation(
            (position) => {
              // 홈 페이지로..
            },
            (err) => {
              console.log("geolocation request error", err);

              if (err.code === GeolocationPermissionCode.PERMISSION_DENIED) {
                // 에러 페이지로..
              }
            }
          );
        }}
      >
        confirm
      </button>
    </div>
  );
};

export default WelcomeDialog;
