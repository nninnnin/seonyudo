"use client";

import clsx from "clsx";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useStore } from "zustand";

import Dropdown from "@/shared/components/Dropdown";
import { menuStore } from "@/shared/store/menu";

const Menu = () => {};

Menu.Toggler = () => {
  const { toggleVisibility } = useStore(menuStore);

  return (
    <div
      className={clsx(
        "fixed top-[16px] right-[16px] z-[9999]",
        "bg-white",
        "px-[11px] pt-[5px] pb-[4px]",
        "rounded-[16px]",
        "select-none"
      )}
      onClick={() => toggleVisibility()}
    >
      <img
        className="w-[20px] h-[21px]"
        src="/icons/menu.svg"
      />
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
  subList,
  onClick,
}: {
  children: React.ReactNode;
  subList?: React.ReactNode;
  onClick?: () => void;
}) => {
  const [height, setHeight] = useState<null | number>(
    null
  );
  const [openSubList, setOpenSubList] = useState(true);

  const subListContainerRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!subList) return;

    const alreadySetHeight = height !== null;
    if (alreadySetHeight) return;

    const setSubListContainerHeight = () => {
      const subListContainerSize =
        subListContainerRef.current?.getBoundingClientRect();

      setHeight(subListContainerSize?.height || 0);
    };

    setSubListContainerHeight();

    // close after height is calculated
    setOpenSubList(false);
  }, [subList]);

  const toggleSubList = () =>
    setOpenSubList((prev) => !prev);

  const handleClick =
    !subList && onClick
      ? onClick
      : () => toggleSubList();

  return (
    <Dropdown.Item onClick={handleClick}>
      <div
        className={clsx(
          "flex justify-between",
          "bg-black text-white",
          "p-[10px]",
          "rounded-[4px]"
        )}
      >
        {children}

        {subList && (
          <button>
            {openSubList ? "닫기" : "열기"}
          </button>
        )}
      </div>

      {subList && (
        <div
          style={{
            transition: "0.2s height",
            height: !openSubList
              ? 0
              : height
              ? `${height}px`
              : "auto",
            overflow: "hidden",
          }}
          ref={subListContainerRef}
        >
          <div
            style={{
              marginTop: "10px",
            }}
          >
            {subList}
          </div>
        </div>
      )}
    </Dropdown.Item>
  );
};

export default Menu;
