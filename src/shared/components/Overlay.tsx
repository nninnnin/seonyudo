import clsx from "clsx";
import React from "react";

const Overlay = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-[5000]",
        "w-[100vw] h-[100dvh]",
        "flex justify-center items-center",
        "bg-black bg-opacity-80",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Overlay;
