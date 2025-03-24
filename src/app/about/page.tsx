"use client";

import clsx from "clsx";
import React from "react";
import { redirect } from "next/navigation";

import PageHeader from "@/shared/components/PageHeader";
import useIntroductionSubject from "@/views/about/hooks/useIntroductionSubject";
import useIntroductions from "@/views/about/hooks/useIntroductions";
import { IntroductionSubjects } from "@/views/about/constants";
import LanguageToggler from "@/features/chat/components/LanguageToggler";
import { ContentsTypeId } from "@/views/about/types";
import Chat from "@/features/chat/components/Chat";
import usePageHeaderHeight from "@/shared/hooks/usePageHeaderHeight";

const AboutPage = () => {
  const { subject } = useIntroductionSubject();

  const isSubjectValid = Object.values(
    IntroductionSubjects
  ).includes(subject as IntroductionSubjects);

  if (!subject || !isSubjectValid) {
    redirect("/");
  }

  const { data: introductions } = useIntroductions(
    subject as IntroductionSubjects
  );

  const { pageHeaderHeight } = usePageHeaderHeight();

  if (!introductions) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        "w-full h-full",
        "home-background-gradient",
        "pt-[calc(44px+32px)]"
      )}
      style={{
        paddingTop: `${pageHeaderHeight}px)`,
      }}
    >
      <PageHeader />

      <Chat.Container
        height={window.innerHeight - pageHeaderHeight}
      >
        {introductions.map((introduction) => {
          const isQuestion =
            introduction.contentsType.id ===
            ContentsTypeId.Question;

          const imageSource = introduction.ideaImage
            ? introduction.ideaImage[0]
            : undefined;

          return (
            <Chat.Item
              key={introduction.contentsText}
              type={isQuestion ? "question" : "answer"}
              contents={introduction.contentsText}
              image={imageSource}
            />
          );
        })}
      </Chat.Container>

      <LanguageToggler />
    </div>
  );
};

export default AboutPage;
