import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";

export const PAGE_HEADER_POSITION_TOP = 16;

const Logo = forwardRef(
  (
    {
      preventClick = false,
    }: {
      preventClick?: boolean;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return createPortal(
      <div
        ref={ref}
        className={clsx(
          "fixed",
          "left-[16px] z-[9998]",
          "logo-typo",
          preventClick && "pointer-events-none"
        )}
        style={{
          top: `${PAGE_HEADER_POSITION_TOP}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          location.href = "/";
        }}
      >
        UNSEEING
      </div>,
      document.body
    );
  }
);

export const LogoSkeleton = () => {
  return (
    <div
      className={clsx(
        "fixed top-[16px] left-[16px] z-[9999]",
        "w-[113px] h-[27px]",
        "logo-typo"
      )}
    >
      UNSEEING
    </div>
  );
};

export default Logo;
