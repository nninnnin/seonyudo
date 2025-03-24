import { useEffect, useRef, useState } from "react";

const useSlicedIndex = ({
  preventUpdate,
  onUpdateSlice,
}: {
  preventUpdate: boolean;
  onUpdateSlice: (callback: () => void) => void;
}) => {
  const preventUpdateRef =
    useRef<boolean>(preventUpdate);

  const touchStartAt = useRef<null | {
    x: number;
    y: number;
  }>(null);

  const scrollContainerRef =
    useRef<HTMLUListElement | null>(null);

  const isAtBottomRef = useRef<boolean>(false);

  const direction = useRef<"up" | "down">("up");

  const [sliceIndex, setSliceIndex] = useState(1);

  useEffect(() => {
    preventUpdateRef.current = preventUpdate;
  }, [preventUpdate]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    document.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];

      touchStartAt.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    });

    document.addEventListener("touchmove", (e) => {
      if (!touchStartAt.current) return;

      const currentTouch = e.touches[0];

      const moveY =
        currentTouch.clientY - touchStartAt.current.y;
      const directionY = moveY > 0 ? "up" : "down";

      direction.current = directionY;
    });

    document.addEventListener("touchend", (e) => {
      const isScrollable = scrollContainerRef.current
        ? scrollContainerRef.current.scrollHeight >
          scrollContainerRef.current.clientHeight
        : false;

      touchStartAt.current = null;

      const isAtBottom = isAtBottomRef.current;

      if (
        ((!isScrollable &&
          direction.current === "down") ||
          (isScrollable &&
            isAtBottom &&
            direction.current === "down")) &&
        !preventUpdateRef.current
      ) {
        onUpdateSlice(() =>
          setSliceIndex((prev) => prev + 1)
        );
      }
    });

    scrollContainerRef.current.addEventListener(
      "scroll",
      (e) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;

        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;

        const isAtBottom =
          scrollHeight - scrollTop <=
          clientHeight + 20;

        isAtBottomRef.current = isAtBottom;
      }
    );
  }, []);

  return {
    sliceIndex,
    scrollContainerRef,
  };
};

export default useSlicedIndex;
