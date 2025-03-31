import clsx from "clsx";
import Image from "next/image";
import React from "react";

const Button = ({
  children,
  iconSource,
  theme = "black",
  onClick = () => {},
}: {
  children: React.ReactNode;
  iconSource?: string;
  theme?: "black" | "white";
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        theme === "black" && "bg-black",
        theme === "white" && "bg-white",
        "w-fit h-[32px]",
        "flex justify-between items-center gap-[4px]",
        "px-[12px]",
        "rounded-[30px]"
      )}
      onClick={onClick}
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

      <span
        className={clsx(
          "px-[8px] button-typo",
          theme === "black" && "text-white",
          theme === "white" && "text-black"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
