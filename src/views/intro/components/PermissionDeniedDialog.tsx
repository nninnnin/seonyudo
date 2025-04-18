import clsx from "clsx";
import React from "react";

import Overlay from "@/shared/components/Overlay";

const PermissionDeniedDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Overlay className="bg-white">
      <div
        className={clsx(
          "intro-dialog-container",
          "bg-black bg-opacity-30",
          "p-[50px] pl-[48px] pr-[49px] pb-[24px] rounded-[18px]",
          "flex flex-col justify-center items-center",
          "text-white",
          "backdrop:blur-[10px]"
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default PermissionDeniedDialog;
