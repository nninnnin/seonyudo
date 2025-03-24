"use client";

import { last } from "lodash";
import React, { useEffect } from "react";
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

const AboutChat = () => {
  const { pageHeaderHeight } = usePageHeaderHeight();

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

  const {
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
            pageHeaderHeight,
          behavior: "smooth",
        });
      }
    }, 200);
  }, [slicedIntroductions.length]);

  if (!slicedIntroductions) {
    return <></>;
  }

  return (
    <Chat.Container
      style={{
        height: window.innerHeight,
        paddingTop: pageHeaderHeight,
      }}
      ref={scrollContainerRef}
    >
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
