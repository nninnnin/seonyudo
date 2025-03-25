import clsx from "clsx";
import Image from "next/image";
import React from "react";

const Button = ({
  children,
  iconSource,
}: {
  children: React.ReactNode;
  iconSource?: string;
}) => {
  return (
    <button
      className={clsx(
        "bg-black text-white",
        "w-fit h-[32px]",
        "flex justify-between items-center gap-[4px]",
        "px-[12px]",
        "rounded-[30px]"
      )}
    >
      {iconSource && (
        <Image
          width="20"
          height="20"
          src={iconSource}
          alt="button-icon"
          priority
        />
      )}
      <span className="px-[8px] button-typo">
        {children}
      </span>
    </button>
  );
};

export default Button;
