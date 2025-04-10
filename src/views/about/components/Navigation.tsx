import React from "react";

import Dropdown from "@/shared/components/Dropdown";
import clsx from "clsx";
import {
  INTRODUCTION_SUBJECTS,
  IntroductionSubjects,
} from "@/views/about/constants/index";
import {
  redirect,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useStore } from "zustand";
import { languageStore } from "@/shared/store/language";

export const STICKY_NAVIATION_HEIGHT = 46;

const Navigation = ({
  introductionSubject,
  disabled = false,
}: {
  introductionSubject?: IntroductionSubjects;
  disabled?: boolean;
}) => {
  const { language } = useStore(languageStore);

  const router = useRouter();
  const searchParams = useSearchParams();

  const subjectName =
    introductionSubject || searchParams.get("subject");

  const selectedSubject = INTRODUCTION_SUBJECTS.find(
    (subject) => {
      return subject.href.includes(subjectName ?? "");
    }
  );

  if (!selectedSubject) {
    redirect("/");
  }

  return (
    <div
      className={clsx(
        "sticky top-[0px] w-full z-[1000]"
      )}
      style={{
        paddingTop: `${STICKY_NAVIATION_HEIGHT}px`,
      }}
    >
      <Dropdown.Container
        className={clsx(
          "!absolute top-0 left-0 z-[10]",
          "h-[30px] overflow-hidden",
          "gap-[4px]",
          "border-none rounded-[18px]"
        )}
        height={`${STICKY_NAVIATION_HEIGHT}px`}
        disabled={disabled}
      >
        <Dropdown.SelectedItem
          className="glassmorph rounded-[18px]"
          indicator={{
            width: "20px",
            height: "20px",
            source: {
              open: "/icons/caret--top.svg",
              close: "/icons/caret--bottom.svg",
            },
          }}
          defaultValue={{
            name:
              language === "EN"
                ? selectedSubject.labelEn
                : selectedSubject.label,
            value: null,
          }}
        />

        {INTRODUCTION_SUBJECTS.filter(
          (subject) =>
            subject.label !== selectedSubject.label
        ).map((subject) => {
          return (
            <Dropdown.Item
              key={subject.label}
              className="glassmorph rounded-[18px]"
              name={
                language === "EN"
                  ? subject.labelEn
                  : subject.label
              }
              value="abc"
              onClick={() => {
                router.push(subject.href);
              }}
            />
          );
        })}
      </Dropdown.Container>
    </div>
  );
};

export default Navigation;
