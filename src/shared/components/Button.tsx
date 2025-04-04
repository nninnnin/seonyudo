import clsx from "clsx";
import Image from "next/image";
import React from "react";

const Button = ({
  children,
  className = "",
  iconSource,
  theme = "black",
  onClick = () => {},
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  iconSource?: string;
  theme?: "black" | "white";
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={clsx(
        theme === "black" && "bg-black",
        theme === "white" && "bg-white",
        disabled && "bg-gray-300 cursor-not-allowed",
        "w-fit h-[32px]",
        "flex justify-between items-center gap-[4px]",
        "px-[12px]",
        "rounded-[30px]",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
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
          theme === "white" && "text-black",
          disabled && "text-gray-100",
          "whitespace-nowrap"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
