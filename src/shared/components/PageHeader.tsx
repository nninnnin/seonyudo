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
          <Menu.Item>About</Menu.Item>
          <Menu.Item>AR Map</Menu.Item>
        </Menu.List>
      </Menu.Container>
    </>
  );
};

export default PageHeader;
