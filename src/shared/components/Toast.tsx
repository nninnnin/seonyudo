import { motion } from "motion/react";
import clsx from "clsx";
import React from "react";

const Toast = ({
  children,
  className = "",
  close,
}: {
  children: React.ReactNode;
  className?: string;
  close: () => void;
}) => {
  return (
    <motion.div
      key="toast"
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: "-50%",
        opacity: 1,
      }}
      exit={{ x: 100, opacity: 0 }}
      className={clsx(
        "fixed bottom-[16px] left-1/2 -translate-x-1/2 z-[5000]",
        "w-[calc(100vw-32px)] min-h-[260px]",
        "flex flex-col justify-between",
        "py-[12px] px-[14px]",
        "glassmorph rounded-[16px]",
        className
      )}
    >
      <button
        className={clsx(
          "py-[15px] px-[21px]",
          "rounded-[16px]",
          "absolute top-[0px] right-[0px]"
        )}
        onClick={() => close()}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 100 100"
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="white"
            strokeWidth={14}
            strokeLinecap="round"
          ></line>

          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="white"
            strokeWidth={14}
            strokeLinecap="round"
          ></line>
        </svg>
      </button>

      {children}
    </motion.div>
  );
};

export default Toast;
