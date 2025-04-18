"use client";

import clsx from "clsx";
import { useStore } from "zustand";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

import { introStore } from "@/views/intro/store/intro";
import PermissionDeniedDialog from "@/views/intro/components/PermissionDeniedDialog";
import WelcomeDialog from "@/views/intro/components/WelcomeDialog";
import { isMobile } from "@/shared/utils/isMobile";
import { isServer } from "@/shared/utils/isServer";

const IntroPage = () => {
  if (!isServer() && !isMobile()) {
    return redirect("/desktop");
  }

  const { setIsIntroWatched, hasPermissionError } =
    useStore(introStore);

  useEffect(() => {
    setIsIntroWatched(true);
  }, []);

  return (
    <div>
      {!hasPermissionError && <WelcomeDialog />}
      {hasPermissionError && (
        <PermissionDeniedDialog>
          <p
            className={clsx(
              "w-[236px]",
              "text-[16px] font-[700] leading-[120%]",
              "break-keep",
              "flex flex-col gap-[16px]"
            )}
          >
            브라우저를 다시 실행한 후 위치 및 방향 정보
            <br />
            제공에 허용을 선택해 주세요.
            <br />
            <span>
              Please restart your browser and allow
              access to location and orientation
              information.
            </span>
          </p>
        </PermissionDeniedDialog>
      )}
    </div>
  );
};

export default IntroPage;
