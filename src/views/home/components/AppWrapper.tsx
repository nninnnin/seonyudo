"use client";

import React from "react";
import { OverlayProvider } from "@toss/use-overlay";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import SuspenseWrapper from "@/views/home/components/SuspenseWrapper";

const queryClient = new QueryClient();

const AppWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <SuspenseWrapper>{children}</SuspenseWrapper>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
