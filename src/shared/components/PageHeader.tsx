"use client";

import React from "react";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";

import Menu from "@/shared/components/Menu";
import Logo from "@/shared/components/Logo";
import {
  INTRODUCTION_SUBJECTS,
  IntroductionSubjects,
} from "@/views/about/constants";
import { menuStore } from "@/shared/store/menu";
import useElementHeight from "@/shared/hooks/useElementHeight";

const PageHeader = () => {
  const router = useRouter();
  const { setVisibility } = useStore(menuStore);

  const { setElementRef } =
    useElementHeight("page-header");

  return (
    <>
      <Logo ref={setElementRef} />

      <Menu.Toggler />
      <Menu.Container className="py-[80px] px-[16px]">
        <Menu.List>
          <Menu.Item
            subList={
              <Menu.List className="!gap-0">
                {INTRODUCTION_SUBJECTS.map(
                  (subject) => {
                    const handleClick = () => {
                      router.push(subject.href);
                      setVisibility(false);
                    };

                    return (
                      <Menu.Item
                        key={subject.label}
                        onClick={handleClick}
                        className="!mb-0"
                      >
                        {subject.label}
                      </Menu.Item>
                    );
                  }
                )}
              </Menu.List>
            }
          >
            소개
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              router.push("/map");
              setVisibility(false);
            }}
          >
            AR 지도
          </Menu.Item>
        </Menu.List>
      </Menu.Container>
    </>
  );
};

export default PageHeader;
