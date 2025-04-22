"use client";

import clsx from "clsx";
import { last } from "lodash";
import { format } from "date-fns";
import { ko, enUS } from "date-fns/locale";
import { useStore } from "zustand";
import React, { useEffect } from "react";
import {
  redirect,
  usePathname,
} from "next/navigation";

import { ContentsTypeId } from "@/views/about/types";
import Chat from "@/features/chat/components/Chat";
import usePageHeaderHeight from "@/shared/hooks/usePageHeaderHeight";
import useIntroductionSubject from "@/views/about/hooks/useIntroductionSubject";
import useIntroductions from "@/views/about/hooks/useIntroductions";
import { IntroductionSubjects } from "@/views/about/constants";

import Navigation from "@/views/about/components/Navigation";
import { languageStore } from "@/shared/store/language";

const AboutChat = ({
  chatSubject,
  disableNavigation = false,
}: {
  chatSubject?: IntroductionSubjects;
  disableNavigation?: boolean;
}) => {
  const { pageHeaderHeight } = usePageHeaderHeight();
  const { subject } = useIntroductionSubject();

  const introductionSubject =
    chatSubject || (subject as IntroductionSubjects);

  const isSubjectValid = Object.values(
    IntroductionSubjects
  ).includes(
    introductionSubject as IntroductionSubjects
  );

  if (!introductionSubject || !isSubjectValid) {
    redirect("/");
  }

  const { language } = useStore(languageStore);

  const { data: introductions } = useIntroductions(
    introductionSubject as IntroductionSubjects,
    language
  );

  const currentTime = format(new Date(), "a h:mm", {
    locale: language === "KO" ? ko : enUS,
  });

  const pathname = usePathname();

  const currentLocationSlug =
    last(pathname.split("/")) ?? "";

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <Chat.Container
      style={{
        height: window.innerHeight,
        paddingTop: pageHeaderHeight,
      }}
    >
      <Navigation
        introductionSubject={introductionSubject}
        disabled={disableNavigation}
      />

      <h1
        className={clsx(
          "w-fit mx-auto",
          "text-white text-[12px] font-bold leading-[22px] text-center"
        )}
      >
        (오늘) {currentTime}
      </h1>

      {introductions?.map((introduction) => {
        const isQuestion =
          introduction.contentsType.id ===
          ContentsTypeId.Question;

        const imageSource = introduction.ideaImage
          ? introduction.ideaImage[0]
          : undefined;

        if (
          introduction.relatedLocationSlug &&
          currentLocationSlug.includes(
            introduction.relatedLocationSlug
          )
        ) {
          setTimeout(() => {
            const element = document.getElementById(
              `chat-item=${introduction.uid}`
            );

            if (element) {
              const chatContainer =
                document.querySelector(
                  ".chat-container"
                ) as HTMLDivElement;

              chatContainer.scrollTo({
                top:
                  element.offsetTop -
                  pageHeaderHeight -
                  46 -
                  20,
                behavior: "smooth",
              });
            }
          }, 500);
        }

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
