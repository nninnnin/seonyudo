"use client";

import clsx from "clsx";
import React from "react";

import PageHeader from "@/shared/components/PageHeader";
import LanguageToggler from "@/features/chat/components/LanguageToggler";
import dynamic from "next/dynamic";

const AboutChat = dynamic(
  () => import("@/views/about/components/AboutChat"),
  {
    ssr: false,
  }
);

const AboutPage = () => {
  return (
    <div
      className={clsx(
        "w-full h-full",
        "home-background-gradient"
      )}
    >
      <PageHeader />

      <AboutChat />

      <LanguageToggler />
    </div>
  );
};

export default AboutPage;
