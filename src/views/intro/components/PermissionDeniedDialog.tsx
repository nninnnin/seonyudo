import clsx from "clsx";
import React from "react";

import Overlay from "@/shared/components/Overlay";

const PermissionDeniedDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Overlay>
      <div
        className={clsx(
          "intro-dialog-container",
          "bg-white",
          "p-[20px] rounded-[8px]",
          "flex flex-col justify-center items-center",
          "gap-[20px]"
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default PermissionDeniedDialog;
