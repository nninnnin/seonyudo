import React, { useEffect, useRef } from "react";
import clsx from "clsx";

const CapturedImageCard = ({
  src,
}: {
  src: string;
}) => {
  const containerRef = useRef<HTMLImageElement | null>(
    null
  );

  const touchStart = useRef(0);
  const swipeTo = useRef<null | "left" | "right">(
    null
  );

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

          console.log(relativePosition);

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

          containerRef.current!.style.transition = `transform 0.3s ease-in-out`;
          setTimeout(() => {
            containerRef.current!.style.transition = ``;
          }, 300);
        }
      );
    }
  }, []);

  return (
    <img
      ref={containerRef}
      className={clsx(
        "w-[240px] h-[360px] bg-white",
        "rounded-[18px]"
      )}
      src={src}
    />
  );
};

export default CapturedImageCard;
