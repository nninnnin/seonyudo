import clsx from "clsx";
import React from "react";
import { motion } from "motion/react";

const Dropdown = () => {};

Dropdown.Container = ({
  children,
  showItems,
  className = "",
}: {
  children: React.ReactNode;
  showItems: boolean;
  className?: string;
}) => {
  return (
    <ul className={clsx("w-full", className)}>
      {children}
    </ul>
  );
};

Dropdown.Item = ({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <motion.li
      className={clsx(
        "w-full",
        "text-[16px] text-white tracking-[-0.408px] leading-[134%] font-bold",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
};

export default Dropdown;
