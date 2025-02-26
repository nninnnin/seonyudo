"use client";

import { OverlayProvider } from "@toss/use-overlay";
import React from "react";
import SuspenseWrapper from "@/views/home/components/SuspenseWrapper";

const AppWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <OverlayProvider>
      <SuspenseWrapper>{children}</SuspenseWrapper>
    </OverlayProvider>
  );
};

export default AppWrapper;
