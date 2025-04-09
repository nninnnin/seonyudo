"use client";

import { useStore } from "zustand";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

import { introStore } from "@/views/intro/store/intro";
import ErrorDialog from "@/views/intro/components/ErrorDialog";
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
        <ErrorDialog>
          <p>권한을 확인해주세요</p>
          <p>브라우저를 완전히 끄고 다시 켜주세요.</p>
        </ErrorDialog>
      )}
    </div>
  );
};

export default IntroPage;
