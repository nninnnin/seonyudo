"use client";

import React from "react";

import Menu from "@/shared/components/Menu";
import Logo from "@/shared/components/Logo";

const PageHeader = () => {
  return (
    <>
      <Logo />

      <Menu.Toggler />
      <Menu.Container className="py-[80px] px-[16px]">
        <Menu.List>
          <Menu.Item
            subList={
              <Menu.List>
                <Menu.Item>프로젝트 소개</Menu.Item>
                <Menu.Item>작품 소개</Menu.Item>
                <Menu.Item>
                  시민 아이디어 갤러리
                </Menu.Item>
                <Menu.Item>선유도공원 소개</Menu.Item>
              </Menu.List>
            }
          >
            About
          </Menu.Item>
          <Menu.Item>AR Map</Menu.Item>
        </Menu.List>
      </Menu.Container>
    </>
  );
};

export default PageHeader;
