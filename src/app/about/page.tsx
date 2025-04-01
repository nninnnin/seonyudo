"use client";

import clsx from "clsx";
import React from "react";
import dynamic from "next/dynamic";

import PageHeader from "@/shared/components/PageHeader";
import PageFooter from "@/shared/components/PageFooter";

const AboutChat = dynamic(
  () => import("@/views/about/components/AboutChat"),
  {
    ssr: false,
  }
);

const AboutPage = () => {
  return (
    <AboutPage.Container>
      <PageHeader />

      <AboutChat />

      <PageFooter />
    </AboutPage.Container>
  );
};

AboutPage.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={clsx("w-full h-full")}>
      {children}
    </div>
  );
};

export default AboutPage;
