import { groupBy, isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";

import useSlicedIndex, {
  DEFAULT_SLICE_INDEX,
} from "@/features/chat/hooks/useSliceIndex";

type ItemWithOrder<Item> = Item & {
  order: number;
};

type ItemWithAnimateFlag<Item> = Item & {
  animateBubble: boolean;
  animateDelay: number;
};

const LOADING_TIMEOUT = 500;

const useSlicedItems = <Item,>(
  list: ItemWithOrder<Item>[] | undefined
) => {
  const listMemo = useRef<
    null | ItemWithOrder<Item>[]
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const {
    sliceIndex,
    scrollContainerRef,
    resetSliceIndex,
  } = useSlicedIndex({
    preventUpdate: isLoading,
    onUpdateSlice: (callback: () => void) => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        callback();
      }, LOADING_TIMEOUT);
    },
  });

  const [slicedList, setSlicedList] = useState<Record<
    number,
    ItemWithOrder<Item>[]
  > | null>(null);

  useEffect(() => {
    if (!slicedList) return;

    if (
      sliceIndex === Object.keys(slicedList)?.length
    ) {
      setIsEnding(true);
    }
  }, [sliceIndex, slicedList]);

  // Initialize slicedList
  const initializeSlicedList = (
    list: ItemWithOrder<Item>[]
  ) => {
    const listGroupByOrder = groupBy(list, "order");
    setSlicedList(listGroupByOrder);
  };

  useEffect(() => {
    if (!list) return;

    const isListChanged = !isEqual(
      list,
      listMemo.current
    );

    if (!isListChanged) return;

    initializeSlicedList(list);
    resetSliceIndex();
    listMemo.current = list;
  }, [list]);

  const slicedItems = (
    slicedList
      ? Object.values(slicedList).reduce(
          (acc, cur) => {
            if (cur[0].order <= sliceIndex) {
              const isLast =
                sliceIndex === cur[0].order;

              acc.push(
                ...cur.map((item, itemIndex) => {
                  if (
                    sliceIndex === DEFAULT_SLICE_INDEX
                  ) {
                    return {
                      ...item,
                      animateBubble: false,
                      animateDelay: 0,
                    };
                  }

                  return {
                    ...item,
                    animateBubble: isLast,
                    animateDelay: isLast
                      ? 0.5 * itemIndex
                      : 0,
                  };
                })
              );
            }

            return acc;
          },
          []
        )
      : ([] as ItemWithAnimateFlag<
          ItemWithOrder<Item>
        >[])
  ) as ItemWithAnimateFlag<ItemWithOrder<Item>>[];

  return {
    sliceIndex,
    slicedItems,
    scrollContainerRef,
    isLoading,
    isEnding,
  };
};

export default useSlicedItems;
