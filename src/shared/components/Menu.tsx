"use client";

import clsx from "clsx";
import React from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
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
  subList,
}: {
  children: React.ReactNode;
  subList?: React.ReactNode;
}) => {
  const [height, setHeight] = useState<null | number>(
    null
  );
  const [openSubList, setOpenSubList] = useState(true);

  const subListContainerRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!subList) return;

    const subListContainerSize =
      subListContainerRef.current?.getBoundingClientRect();

    setHeight(subListContainerSize?.height || 0);
    setOpenSubList(false);
  }, [subList]);

  return (
    <Dropdown.Item className={clsx("bg-green-100")}>
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
          <button
            onClick={() =>
              setOpenSubList((prev) => !prev)
            }
          >
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
