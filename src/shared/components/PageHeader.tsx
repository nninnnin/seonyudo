"use client";

import React from "react";
import { useStore } from "zustand";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import dynamic from "next/dynamic";

import Menu from "@/shared/components/Menu";

const Logo = dynamic(
  () => import("@/shared/components/Logo"),
  {
    ssr: false,
    loading: () => <LogoSkeleton />,
  }
);

import { INTRODUCTION_SUBJECTS } from "@/views/about/constants";
import { menuStore } from "@/shared/store/menu";
import useElementHeight from "@/shared/hooks/useElementHeight";
import useLoadingOverlay from "@/shared/hooks/useLoadingOverlay";
import { LogoSkeleton } from "@/shared/components/Logo";
import { languageStore } from "@/shared/store/language";

const PageHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { setVisibility } = useStore(menuStore);
  const { openLoadingOverlay } = useLoadingOverlay();

  const { language } = useStore(languageStore);

  const { setElementRef } =
    useElementHeight("page-header");

  const isClickPrevented =
    searchParams.get("aboutOnly") === "1";

  return (
    <>
      <Logo
        ref={setElementRef}
        preventClick={isClickPrevented}
      />

      <Menu.Toggler preventClick={isClickPrevented} />
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
                        {language === "EN"
                          ? subject.labelEn
                          : subject.label}
                      </Menu.Item>
                    );
                  }
                )}
              </Menu.List>
            }
          >
            {language === "EN"
              ? "Introduction"
              : "소개"}
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              if (!pathname.includes("map")) {
                openLoadingOverlay(
                  "지도를 불러오는 중입니다.."
                );
              }

              router.push("/map");
              setVisibility(false);
            }}
          >
            {language === "EN" ? "AR Map" : "AR 지도"}
          </Menu.Item>
        </Menu.List>
      </Menu.Container>
    </>
  );
};

export default PageHeader;
