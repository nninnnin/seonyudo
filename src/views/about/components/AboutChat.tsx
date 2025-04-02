"use client";

import clsx from "clsx";
import { last } from "lodash";
import { format } from "date-fns";
import { useStore } from "zustand";
import React, {
  useEffect,
  useLayoutEffect,
} from "react";
import { redirect } from "next/navigation";

import {
  ContentsTypeId,
  FormattedIntroductionItem,
} from "@/views/about/types";
import Chat from "@/features/chat/components/Chat";
import usePageHeaderHeight from "@/shared/hooks/usePageHeaderHeight";
import useIntroductionSubject from "@/views/about/hooks/useIntroductionSubject";
import useIntroductions from "@/views/about/hooks/useIntroductions";
import { IntroductionSubjects } from "@/views/about/constants";
import useSlicedItems from "@/features/chat/hooks/useSlicedItems";
import Navigation, {
  STICKY_NAVIATION_HEIGHT,
} from "@/views/about/components/Navigation";
import { languageStore } from "@/shared/store/language";
import { DEFAULT_SLICE_INDEX } from "@/features/chat/hooks/useSliceIndex";

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

  const {
    sliceIndex,
    slicedItems: slicedIntroductions,
    scrollContainerRef,
    isLoading,
    isEnding,
  } = useSlicedItems<FormattedIntroductionItem>(
    introductions
      ? introductions.map((introduction) => ({
          ...introduction,
          order: introduction.contentsOrder,
        }))
      : undefined
  );

  useEffect(() => {
    if (sliceIndex === DEFAULT_SLICE_INDEX) return;
    if (isEnding) return;

    setTimeout(() => {
      const lastQuestionElement =
        document.getElementById(
          `chat-item=${
            last(
              slicedIntroductions.filter(
                (item) =>
                  item.contentsType.id ===
                  ContentsTypeId.Question
              )
            )?.uid
          }`
        );

      if (lastQuestionElement) {
        scrollContainerRef.current?.scrollTo({
          top:
            lastQuestionElement.offsetTop -
            pageHeaderHeight -
            STICKY_NAVIATION_HEIGHT -
            20,
          behavior: "smooth",
        });
      }
    }, 200);
  }, [
    sliceIndex,
    slicedIntroductions.length,
    isEnding,
  ]);

  if (!slicedIntroductions) {
    return <></>;
  }

  const currentTime = format(new Date(), "a h:mm");

  return (
    <Chat.Container
      style={{
        height: window.innerHeight,
        paddingTop: pageHeaderHeight,
      }}
      ref={scrollContainerRef}
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

      {slicedIntroductions.map((introduction) => {
        const isQuestion =
          introduction.contentsType.id ===
          ContentsTypeId.Question;

        const imageSource = introduction.ideaImage
          ? introduction.ideaImage[0]
          : undefined;

        return (
          <Chat.Item
            uid={introduction.uid}
            key={introduction.contentsText}
            type={isQuestion ? "question" : "answer"}
            contents={introduction.contentsText}
            image={imageSource}
            animate={introduction.animateBubble}
            animateDelay={introduction.animateDelay}
          />
        );
      })}

      {isLoading && (
        <>
          {isEnding ? (
            <Chat.Ending />
          ) : (
            <Chat.Loading />
          )}
        </>
      )}
    </Chat.Container>
  );
};

export default AboutChat;
