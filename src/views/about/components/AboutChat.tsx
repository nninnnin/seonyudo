"use client";

import clsx from "clsx";
import { format } from "date-fns";
import { useStore } from "zustand";
import React from "react";
import { redirect } from "next/navigation";

import { ContentsTypeId } from "@/views/about/types";
import Chat from "@/features/chat/components/Chat";
import usePageHeaderHeight from "@/shared/hooks/usePageHeaderHeight";
import useIntroductionSubject from "@/views/about/hooks/useIntroductionSubject";
import useIntroductions from "@/views/about/hooks/useIntroductions";
import { IntroductionSubjects } from "@/views/about/constants";

import Navigation from "@/views/about/components/Navigation";
import { languageStore } from "@/shared/store/language";

const AboutChat = () => {
  const { pageHeaderHeight } = usePageHeaderHeight();
  const { subject } = useIntroductionSubject();

  const isSubjectValid = Object.values(
    IntroductionSubjects
  ).includes(subject as IntroductionSubjects);

  if (!subject || !isSubjectValid) {
    redirect("/");
  }

  const { language } = useStore(languageStore);

  const { data: introductions } = useIntroductions(
    subject as IntroductionSubjects,
    language
  );

  const currentTime = format(new Date(), "a h:mm");

  if (!introductions) return <></>;

  return (
    <Chat.Container
      style={{
        height: window.innerHeight,
        paddingTop: pageHeaderHeight,
      }}
    >
      <h1
        className={clsx(
          "w-full",
          "sticky top-[-40px] z-[1000]",
          "text-white text-[12px] font-bold leading-[22px] text-center"
        )}
      >
        (오늘) 오후 {currentTime}
      </h1>

      <Navigation />

      {introductions.map((introduction) => {
        const isQuestion =
          introduction.contentsType.id ===
          ContentsTypeId.Question;

        const imageSource = introduction.ideaImage
          ? introduction.ideaImage[0]
          : undefined;

        return (
          <Chat.Item
            uid={introduction.uid}
            key={introduction.uid}
            type={isQuestion ? "question" : "answer"}
            contents={introduction.contentsText}
            image={imageSource}
          />
        );
      })}
    </Chat.Container>
  );
};

export default AboutChat;
