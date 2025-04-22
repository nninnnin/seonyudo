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
    capturedPictures,
    addCapturedPicture,
  } = useStore(capturedPictureStore);

  useEffect(() => {
    const touchStartHandler = (e: TouchEvent) => {
      const startPoint = e.touches[0].clientX;
      touchStart.current = startPoint;
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (cardIndex !== selectedCardIndex) {
        return;
      }

      const moveX =
        touchStart.current - e.touches[0].clientX;

      containerRef.current!.style.transform = `translateX(calc(-50% + ${-moveX}px)) rotateZ(${
        (moveX / 10) * -1
      }deg)`;

      const relativePosition =
        (e.touches[0].clientX / window.innerWidth) *
          2 -
        1;

      const isLeft =
        relativePosition < 0 &&
        relativePosition < -0.45;
      const isRight =
        relativePosition > 0 &&
        relativePosition > 0.45;

      if (isLeft) {
        swipeTo.current = "left";
      } else if (isRight) {
        swipeTo.current = "right";
      } else {
        swipeTo.current = null;
      }
    };

    const addNewCard = () => {
      setTimeout(() => {
        const currentCard =
          capturedPictures[selectedCardIndex];

        addCapturedPicture(currentCard.url);
      }, 400);
    };

    const touchEndHandler = () => {
      if (swipeTo.current === "left") {
        containerRef.current!.style.transform = `translateX(-150vw)`;
      } else if (swipeTo.current === "right") {
        containerRef.current!.style.transform = `translateX(150vw)`;
      } else {
        containerRef.current!.style.transform = `translateX(-50%)`;
      }

      const isSwiped = swipeTo.current !== null;

      if (isSwiped) {
        increaseSelectedCardIndex();
        addNewCard();
      }

      containerRef.current!.style.transition = `transform 0.3s ease-in-out`;

      setTimeout(() => {
        containerRef.current!.style.transition = ``;
      }, 300);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener(
        "touchstart",
        touchStartHandler
      );

      containerRef.current.addEventListener(
        "touchmove",
        touchMoveHandler
      );

      containerRef.current.addEventListener(
        "touchend",
        touchEndHandler
      );
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "touchstart",
          touchStartHandler
        );
        containerRef.current.removeEventListener(
          "touchmove",
          touchMoveHandler
        );
        containerRef.current.removeEventListener(
          "touchend",
          touchEndHandler
        );
      }
    };
  }, [selectedCardIndex]);

  const isSelectedCard =
    selectedCardIndex === cardIndex;

  return (
    <div
      className={clsx(
        "absolute top-[2dvh] left-1/2 -translate-x-1/2",
        "h-[56dvh]"
      )}
      ref={containerRef}
      style={{
        zIndex: 1000 - cardIndex,
        aspectRatio: `${
          window.innerWidth / window.innerHeight
        }`,
      }}
    >
      <img
        className={clsx(
          "w-full h-full bg-white",
          "rounded-[18px]",
          "object-cover",
          "transition duration-500 ease-in-out",
          "shadow-xl"
        )}
        src={src}
        style={{
          transformOrigin: "center",
          transform: isSelectedCard
            ? ""
            : `rotateZ(${getRandomRotation(
                cardIndex
              )}deg) translateX(calc(${getRandomTranslateX(
                cardIndex
              )}px)) scale(0.8)`,
        }}
      />
    </div>
  );
};

const isOdd = (n: number) => n % 2 === 1;
const isEven = (n: number) => n % 2 === 0;

const getRandomRotation = (index: number) => {
  if (isOdd(index)) {
    return Math.random() * 20 + 10;
  } else if (isEven(index)) {
    return Math.random() * -20 - 10;
  }

  return 0;
};

const getRandomTranslateX = (index: number) => {
  if (isOdd(index)) {
    return Math.random() * 20 + 50;
  } else if (isEven(index)) {
    return Math.random() * -20 - 50;
  }
  return 0;
};

export default CapturedImageCard;
