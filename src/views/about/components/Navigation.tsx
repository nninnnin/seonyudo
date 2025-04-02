import React from "react";

import Dropdown from "@/shared/components/Dropdown";
import clsx from "clsx";
import { INTRODUCTION_SUBJECTS } from "@/views/about/constants/index";
import {
  redirect,
  useRouter,
  useSearchParams,
} from "next/navigation";

export const STICKY_NAVIATION_HEIGHT = 46;

const Navigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subjectName = searchParams.get("subject");

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
      className={`sticky top-[0px] w-full h-[${STICKY_NAVIATION_HEIGHT}px] z-[1000]`}
    >
      <Dropdown.Container
        className={clsx(
          "relative top-0 left-0 z-[10]",
          "h-[30px] overflow-hidden",
          "gap-[4px]",
          "border-none rounded-[18px]"
        )}
        height={`${STICKY_NAVIATION_HEIGHT}px`}
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
            name: selectedSubject!.label,
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
              name={subject.label}
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
