"use client";

import { useStore } from "zustand";
import React, { useEffect } from "react";

import Splash from "@/app/intro/components/Splash";
import WelcomeDialog from "@/app/intro/components/WelcomeDialog";
import DesktopNotice from "@/app/intro/components/DesktopNotice";
import { isMobile } from "@/shared/utils/isMobile";
import { introStore } from "@/shared/store/intro";
import ErrorDialog from "@/app/intro/components/ErrorDialog";

const IntroPage = () => {
  if (!isMobile()) {
    return <DesktopNotice />;
  }

  const { setIsIntroWatched, hasPermissionError } =
    useStore(introStore);

  useEffect(() => {
    setIsIntroWatched(true);
  }, []);

  return (
    <div>
      <Splash />

      {!hasPermissionError && <WelcomeDialog />}
      {hasPermissionError && (
        <ErrorDialog>
          <p>권한을 좀 양보하세요.</p>
          <p>
            양보할 마음이 드신다면 브라우저를 완전히
            끄고 다시 켜세요.
          </p>
        </ErrorDialog>
      )}
    </div>
  );
};

export default IntroPage;
