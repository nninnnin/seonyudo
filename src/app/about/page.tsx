"use client";

import clsx from "clsx";
import React from "react";
import { redirect } from "next/navigation";

import PageHeader from "@/shared/components/PageHeader";
import useIntroductionSubject from "@/features/chat/hooks/useIntroductionSubject";
import useIntroductions from "@/features/chat/hooks/useIntroductions";
import { IntroductionSubjects } from "@/features/chat/constants";
import LanguageToggler from "@/features/chat/components/LanguageToggler";
import { ContentsTypeId } from "@/features/chat/types";
import Chat from "@/features/chat/components/Chat";

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

  if (!introductions) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        "w-full h-full",
        "home-background-gradient",
        "pt-[4em]"
      )}
    >
      <PageHeader />

      <Chat.Container>
        {introductions.map((introduction) => {
          const isQuestion =
            introduction.contentsType.id ===
            ContentsTypeId.Question;

          return (
            <Chat.Item
              key={introduction.contentsText}
              type={isQuestion ? "question" : "answer"}
              contents={introduction.contentsText}
            />
          );
        })}
      </Chat.Container>

      <LanguageToggler />
    </div>
  );
};

export default AboutPage;
