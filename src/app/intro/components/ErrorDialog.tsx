import Overlay from "@/shared/components/Overlay";
import clsx from "clsx";
import React from "react";

const ErrorDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Overlay>
      <div
        className={clsx(
          "bg-red-500 text-white w-[200px] h-[200px]",
          "flex flex-col justify-center items-center",
          "p-[10px]"
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default ErrorDialog;
