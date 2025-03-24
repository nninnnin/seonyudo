import { useLayoutEffect, useState } from "react";
import { create, useStore } from "zustand";

const elementHeightStore = create<{
  elementHeight: Record<string, number>;
  setElementHeight: (
    elementName: string,
    height: number
  ) => void;
}>((set) => ({
  elementHeight: {},
  setElementHeight: (
    elementName: string,
    height: number
  ) => {
    set((state) => ({
      elementHeight: {
        ...state.elementHeight,
        [elementName]: height,
      },
    }));
  },
}));

const useElementHeight = (elementName: string) => {
  const { elementHeight, setElementHeight } = useStore(
    elementHeightStore
  );

  const [elementRef, setElementRef] =
    useState<null | HTMLElement>(null);

  useLayoutEffect(() => {
    if (!elementRef) return;

    setElementHeight(
      elementName,
      elementRef.getBoundingClientRect().height
    );
  }, [elementRef]);

  return {
    elementHeight: elementHeight[elementName] ?? 0,
    setElementRef,
  };
};

export default useElementHeight;
