"use client";

import clsx from "clsx";
import React from "react";

import PageHeader from "@/shared/components/PageHeader";
import LanguageToggler from "@/features/chat/components/LanguageToggler";

const GuideLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "w-full h-full",
        "home-background-gradient"
      )}
    >
      <PageHeader />
      {children}
      <LanguageToggler />
    </div>
  );
};

export default GuideLayout; 