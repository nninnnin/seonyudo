import clsx from "clsx";
import React from "react";

const Logo = () => {
  return (
    <div
      className={clsx(
        "fixed",
        "top-[16px] left-[16px] z-[9999]",
        "bg-white p-[10px]"
      )}
    >
      UNSEENING
    </div>
  );
};

export default Logo;
