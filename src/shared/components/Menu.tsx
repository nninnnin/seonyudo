"use client";

import clsx from "clsx";
import React from "react";
import { AnimatePresence } from "motion/react";
import { useStore } from "zustand";
import {
  useRef,
  useState,
  useLayoutEffect,
} from "react";

import { menuStore } from "@/shared/store/menu";
import Image from "next/image";

const Menu = () => {};

Menu.Toggler = () => {
  const { toggleVisibility } = useStore(menuStore);

  return (
    <div
      className={clsx(
        "fixed top-[16px] right-[16px] z-[7000]",
        "bg-white",
        "px-[11px] pt-[5px] pb-[4px]",
        "rounded-[16px]",
        "select-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        toggleVisibility();
      }}
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
        <div
          key="menu-container"
          className={clsx(
            "w-[100vw] h-[100dvh]",
            "fixed top-0 left-0 z-[9000]",
            className
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-40"></div>

          {children}
        </div>
      )}
    </AnimatePresence>
  );
};

Menu.List = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-[8px]",
        className
      )}
    >
      {children}
    </div>
  );
};

Menu.Item = ({
  children,
  subList,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  subList?: React.ReactNode;
  onClick?: () => void;
  className?: string;
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
    <div onClick={handleClick}>
      <div
        className={clsx(
          "flex justify-between",
          "glassmorph",
          "px-[18px] py-[12px]",
          "rounded-[18px]",
          "text-[16px] font-bold leading-[134%] tracking-[-0.408px]",
          className
        )}
      >
        {children}

        {subList && (
          <button>
            {openSubList && height !== null ? (
              <Image
                width={16}
                height={16}
                alt="minus"
                src="/icons/minus.svg"
                priority
              />
            ) : (
              <Image
                width={16}
                height={16}
                alt="plus"
                src="/icons/plus.svg"
                priority
              />
            )}
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
          {subList}
        </div>
      )}
    </div>
  );
};

export default Menu;
