"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import useTimeout from "@/views/intro/hooks/useTimeout";

const Splash = () => {
  const { isTimeout } = useTimeout(2000);

  return (
    <AnimatePresence>
      {!isTimeout && (
        <Splash.Container>
          이상한 선유도 탐험대
        </Splash.Container>
      )}
    </AnimatePresence>
  );
};

Splash.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      key="splash"
      className={clsx(
        "bg-black text-white",
        "w-[100vw] h-[100dvh]",
        "fixed top-0 left-0 z-[9999]",
        "flex justify-center items-center"
      )}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Splash;
