"use client";

import clsx from "clsx";
import React from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Dropdown from "@/shared/components/Dropdown";
import { useStore } from "zustand";
import { menuStore } from "@/shared/store/menu";

const Menu = () => {};

Menu.Toggler = () => {
  const { toggleVisibility } = useStore(menuStore);

  return (
    <div
      className={clsx(
        "fixed top-[16px] right-[16px] z-[9999]",
        "bg-white p-[10px]",
        "select-none"
      )}
      onClick={() => toggleVisibility()}
    >
      메뉴
    </div>
  );
};

Menu.Container = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { visibility } = useStore(menuStore);

  return (
    <AnimatePresence>
      {visibility && (
        <motion.div
          key="menu-container"
          className={clsx(
            "w-[100vw] h-[100dvh]",
            "fixed top-0 left-0 z-[10]",
            "bg-black bg-opacity-40",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Menu.List = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dropdown.Container
      className="flex flex-col gap-[10px]"
      showItems={false}
    >
      {children}
    </Dropdown.Container>
  );
};

Menu.Item = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dropdown.Item
      className={clsx(
        "bg-black text-white",
        "p-[10px]",
        "rounded-[4px]"
      )}
    >
      {children}
    </Dropdown.Item>
  );
};

export default Menu;
