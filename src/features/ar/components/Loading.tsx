import clsx from "clsx";
import React from "react";
import localFont from "next/font/local";

import { createPortal } from "react-dom";
import Image from "next/image";

const mushFont = localFont({
  src: "../assets/fonts/MushyScript-Yoghurt.woff",
});

const Loading = () => {
  return createPortal(
    <div
      className={clsx(
        "fixed top-[0] left-0 z-[9999]",
        "w-full h-full",
        "flex flex-col justify-end items-center pb-[15px]"
      )}
      style={{
        background:
          "linear-gradient(180deg, #E4E4DC 0%, #160D78 53.37%)",
      }}
    >
      <Image
        width="169"
        height="128"
        src="/icons/loading/loader--top.svg"
        alt="ar-loader-top"
      />

      <div className="flex flex-col items-center justify-center my-[25px]">
        <div
          className={clsx(
            "flex flex-col items-center justify-center"
          )}
        >
          <span
            className={clsx(
              "text-white",
              "font-[430] leading-[134%] text-[20px]",
              mushFont.className
            )}
          >
            LOADING
          </span>
        </div>
        <span className="text-[#f0ff82] text-[16px] font-bold leading-[134%]">
          로딩중
        </span>
      </div>

      <Image
        width="178"
        height="294"
        src="/icons/loading/loader--bottom.svg"
        alt="ar-loader-bottom"
      />
    </div>,
    document.body
  );
};

export default Loading;
