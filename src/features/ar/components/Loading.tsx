import clsx from "clsx";
import React from "react";
import Lottie from "react-lottie";
import localFont from "next/font/local";

import animationData from "../assets/animation/wave.json";
import { createPortal } from "react-dom";

const mushFont = localFont({
  src: "../assets/fonts/MushyScript-Yoghurt.woff",
});

const Loading = () => {
  return createPortal(
    <div
      className={clsx(
        "fixed top-[0] left-0 z-[9999]",
        "w-full h-full",
        "flex justify-center items-center"
      )}
      style={{
        background:
          "linear-gradient(180deg, #E4E4DC 0%, #160D78 53.37%)",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={clsx(
            "relative",
            "flex flex-col items-center justify-center"
          )}
        >
          <Lottie
            options={{
              animationData,
            }}
            height={150}
            width={150}
          />
          <span
            className={clsx(
              "text-white",
              "absolute bottom-0",
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
    </div>,
    document.body
  );
};

export default Loading;
