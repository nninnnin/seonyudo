"use client";

import React, { Suspense } from "react";

const SuspenseWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Suspense>{children}</Suspense>;
};

export default SuspenseWrapper;
