"use client";

import React from "react";
import dynamic from "next/dynamic";

const DesktopNotice = dynamic(
  () =>
    import("@/views/intro/components/DesktopNotice"),
  { ssr: false }
);

const page = () => {
  return <DesktopNotice />;
};

export default page;
