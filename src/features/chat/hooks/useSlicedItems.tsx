import useSlicedIndex from "@/features/chat/hooks/useSliceIndex";
import { groupBy } from "lodash";
import { useEffect, useState } from "react";

const useSlicedItems = <Item,>(
  list:
    | (Item & {
        order: number;
      })[]
    | undefined
) => {
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
    (Item & { order: number })[]
  > | null>(null);

  useEffect(() => {
    if (!slicedList) return;

    if (
      sliceIndex === Object.keys(slicedList)?.length
    ) {
      setIsEnding(true);
    }
  }, [sliceIndex, slicedList]);

  useEffect(() => {
    if (slicedList !== null) return;
    if (!list) return;

    const listGroupByOrder = groupBy(list, "order");

    setSlicedList(listGroupByOrder);
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
