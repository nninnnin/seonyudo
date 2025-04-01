import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
} from "react";

export const PAGE_HEADER_POSITION_TOP = 16;

const Logo = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
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
        onClick={() => (location.href = "/")}
      >
        UNSEENING
      </div>
    );
  }
);

export default Logo;
