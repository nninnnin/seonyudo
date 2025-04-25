"use client";

import React from "react";
import { OverlayProvider } from "@toss/use-overlay";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import SuspenseWrapper from "@/views/home/components/SuspenseWrapper";
import useLocationProximity from "@/features/location/hooks/useLocationProximity";

const queryClient = new QueryClient();

const AppWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useLocationProximity();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <SuspenseWrapper>{children}</SuspenseWrapper>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
