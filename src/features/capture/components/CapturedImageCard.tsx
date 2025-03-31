'use client";';

import { capturedPictureStore } from "@/features/capture/store";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { useStore } from "zustand";

const CapturedImageCard = ({
  src,
  cardIndex,
}: {
  src: string;
  cardIndex: number;
}) => {
  const containerRef = useRef<HTMLImageElement | null>(
    null
  );

  const touchStart = useRef(0);
  const swipeTo = useRef<null | "left" | "right">(
    null
  );

  const {
    selectedCardIndex,
    increaseSelectedCardIndex,
  } = useStore(capturedPictureStore);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener(
        "touchstart",
        (e) => {
          const startPoint = e.touches[0].clientX;
          touchStart.current = startPoint;
        }
      );

      containerRef.current.addEventListener(
        "touchmove",
        (e) => {
          const moveX =
            touchStart.current - e.touches[0].clientX;

          containerRef.current!.style.transform = `translateX(${-moveX}px) rotateZ(${
            (moveX / 10) * -1
          }deg)`;

          const relativePosition =
            (e.touches[0].clientX /
              window.innerWidth) *
              2 -
            1;

          const isLeft =
            relativePosition < 0 &&
            relativePosition < -0.8;
          const isRight =
            relativePosition > 0 &&
            relativePosition > 0.8;

          if (isLeft) {
            swipeTo.current = "left";
          } else if (isRight) {
            swipeTo.current = "right";
          } else {
            swipeTo.current = null;
          }
        }
      );

      containerRef.current.addEventListener(
        "touchend",
        () => {
          if (!swipeTo.current) {
            containerRef.current!.style.transform = `translateX(0px)`;
          }

          if (swipeTo.current === "left") {
            containerRef.current!.style.transform = `translateX(-100vw)`;
          } else if (swipeTo.current === "right") {
            containerRef.current!.style.transform = `translateX(100vw)`;
          }

          const isSwiped = swipeTo.current !== null;
          if (isSwiped) {
            increaseSelectedCardIndex();
          }

          containerRef.current!.style.transition = `transform 0.3s ease-in-out`;

          setTimeout(() => {
            containerRef.current!.style.transition = ``;
          }, 300);
        }
      );
    }
  }, []);

  console.log("카드 인덱스: ", selectedCardIndex);

  return (
    <img
      ref={containerRef}
      className={clsx(
        "absolute top-0 left-0",
        "w-[240px] h-[360px] bg-white",
        "rounded-[18px]"
      )}
      style={{
        zIndex: 1000 - cardIndex,
      }}
      src={src}
    />
  );
};

export default CapturedImageCard;
