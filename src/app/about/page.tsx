"use client";

import clsx from "clsx";
import React from "react";

import PageHeader from "@/shared/components/PageHeader";
import useIntroductionSubject from "@/features/introduction/hooks/useIntroductionSubject";

const AboutPage = () => {
  const { subject } = useIntroductionSubject();

  console.log(subject);

  // useIntroductions()

  return (
    <div
      className={clsx(
        "w-full h-full",
        "home-background-gradient"
      )}
    >
      <PageHeader />
    </div>
  );
};

export default AboutPage;
