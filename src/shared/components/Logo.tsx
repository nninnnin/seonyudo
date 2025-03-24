import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
} from "react";
import { useRouter } from "next/navigation";

export const PAGE_HEADER_POSITION_TOP = 16;

const Logo = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const router = useRouter();

    return (
      <div
        ref={ref}
        className={clsx(
          "fixed",
          "left-[16px] z-[9999]",
          "bg-white p-[10px]"
        )}
        style={{
          top: `${PAGE_HEADER_POSITION_TOP}px`,
        }}
        onClick={() => router.push("/")}
      >
        UNSEENING
      </div>
    );
  }
);

export default Logo;
