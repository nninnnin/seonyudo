"use client";

import React from "react";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";

import Menu from "@/shared/components/Menu";
import Logo from "@/shared/components/Logo";
import { IntroductionSubjects } from "@/features/chat/constants";
import { menuStore } from "@/shared/store/menu";

const PageHeader = () => {
  const router = useRouter();
  const { setVisibility } = useStore(menuStore);

  const subItems = [
    {
      label: "프로젝트 소개",
      href: `/about?subject=${IntroductionSubjects.Project}`,
    },
    {
      label: "작품 소개",
      href: `/about?subject=${IntroductionSubjects.Work}`,
    },
    {
      label: "시민 아이디어 갤러리",
      href: `/about?subject=${IntroductionSubjects.Ideas}`,
    },
    {
      label: "선유도공원 소개",
      href: `/about?subject=${IntroductionSubjects.Seonyudo}`,
    },
  ];

  return (
    <>
      <Logo />

      <Menu.Toggler />
      <Menu.Container className="py-[80px] px-[16px]">
        <Menu.List>
          <Menu.Item
            subList={
              <Menu.List>
                {subItems.map((subItem) => {
                  const handleClick = () => {
                    router.push(subItem.href);
                    setVisibility(false);
                  };

                  return (
                    <Menu.Item
                      key={subItem.label}
                      onClick={handleClick}
                    >
                      {subItem.label}
                    </Menu.Item>
                  );
                })}
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
