"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { isMobile } from "@/shared/utils/isMobile";
import { isServer } from "@/shared/utils/isServer";
import { redirect } from "next/navigation";

const DesktopNotice = dynamic(
  () =>
    import("@/views/intro/components/DesktopNotice"),
  { ssr: false }
);

const page = () => {
  useEffect(() => {
    if (!isServer() && isMobile()) {
      redirect("/");
    }
  }, []);

  return <DesktopNotice />;
};

export default page;
