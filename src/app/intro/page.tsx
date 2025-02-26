"use client";

import dynamic from "next/dynamic";
import { useStore } from "zustand";
import React, { useEffect } from "react";

import Splash from "@/pages/intro/components/Splash";

import { isMobile } from "@/shared/utils/isMobile";
import { introStore } from "@/pages/intro/store/intro";
import ErrorDialog from "@/pages/intro/components/ErrorDialog";
import { isServer } from "@/shared/utils/isServer";
import WelcomeDialog from "@/pages/intro/components/WelcomeDialog";

const DesktopNotice = dynamic(
  () =>
    import("@/pages/intro/components/DesktopNotice"),
  { ssr: false }
);

const IntroPage = () => {
  if (!isServer() && !isMobile()) {
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
