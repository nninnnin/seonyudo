import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";

export const PAGE_HEADER_POSITION_TOP = 16;

const Logo = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    return createPortal(
      <div
        ref={ref}
        className={clsx(
          "fixed",
          "left-[16px] z-[9999]",
          "logo-typo"
        )}
        style={{
          top: `${PAGE_HEADER_POSITION_TOP}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          location.href = "/";
        }}
      >
        UNSEENING
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
      UNSEENING
    </div>
  );
};

export default Logo;
