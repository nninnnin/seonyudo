"use client";

import { last } from "lodash";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

import {
  ContentsTypeId,
} from "@/views/about/types";
import Chat from "@/features/chat/components/Chat";
import usePageHeaderHeight from "@/shared/hooks/usePageHeaderHeight";
import useGuideSubject from "@/views/guide/hooks/useGuideSubject";
import useGuides from "@/views/guide/hooks/useGuides";
import { GuideSubjects } from "@/views/guide/constants";
import useSlicedItems from "@/features/chat/hooks/useSlicedItems";
import { GuideItem } from "@/views/guide/types";

const GuideChat = () => {
  const { pageHeaderHeight } = usePageHeaderHeight();

  const { subject } = useGuideSubject();

  const isSubjectValid = Object.values(
    GuideSubjects
  ).includes(subject as GuideSubjects);

  if (!subject) {
    redirect("/guide?subject=" + GuideSubjects.Notice);
  }

  if (!isSubjectValid) {
    redirect("/guide?subject=" + GuideSubjects.Notice);
  }

  const { data: guides } = useGuides(
    subject as GuideSubjects
  );

  console.log("guides:", guides);

  const {
    slicedItems: slicedGuides,
    scrollContainerRef,
    isLoading,
    isEnding,
  } = useSlicedItems<GuideItem>(
    guides
      ? guides.map((guide) => ({
          ...guide,
          order: guide.contentsOrder,
        }))
      : undefined
  );

  console.log("slicedGuides:", slicedGuides);

  useEffect(() => {
    setTimeout(() => {
      const lastQuestionElement =
        document.getElementById(
          `chat-item=${
            last(
              slicedGuides.filter(
                (item) =>
                  item.contentsType._id ===
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
  }, [slicedGuides.length]);

  if (!slicedGuides) {
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
      {slicedGuides.map((guide) => {
        const isQuestion =
          guide.contentsType._id ===
          ContentsTypeId.Question;

        const imageSource = guide.ideaImage
          ? guide.ideaImage[0]
          : undefined;

        return (
          <Chat.Item
            uid={guide.uid}
            key={guide.contentsText}
            type={isQuestion ? "question" : "answer"}
            contents={guide.contentsText}
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

export default GuideChat; 