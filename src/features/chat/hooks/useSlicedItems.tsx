import useSlicedIndex from "@/features/chat/hooks/useSliceIndex";
import { groupBy, isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";

type ItemWithOrder<Item> = Item & {
  order: number;
};

const useSlicedItems = <Item,>(
  list: ItemWithOrder<Item>[] | undefined
) => {
  const listMemo = useRef<
    null | ItemWithOrder<Item>[]
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const { sliceIndex, scrollContainerRef } =
    useSlicedIndex({
      preventUpdate: isLoading,
      onUpdateSlice: (callback: () => void) => {
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          callback();
        }, 2000);
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
    listMemo.current = list;
  }, [list]);

  return {
    slicedItems: slicedList
      ? Object.values(slicedList).reduce(
          (acc, cur) => {
            if (cur[0].order <= sliceIndex) {
              acc.push(...cur);
            }

            return acc;
          },
          [] as (Item & { order: number })[]
        )
      : [],
    scrollContainerRef,
    isLoading,
    isEnding,
  };
};

export default useSlicedItems;
