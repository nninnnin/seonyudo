import { create, useStore } from "zustand";
import { AnimatePresence } from "motion/react";
import { useOverlay } from "@toss/use-overlay";

import { useArCompletionStore } from "@/features/ar/store";
import useLocations from "@/features/location/hooks/useLocations";
import useWatchPosition from "@/features/location/hooks/useWatchPosition";
import { getMostProximateLocation } from "@/features/location/utils/distance";
import LocationRecommendationToast from "@/features/location/components/LocationRecommendationToast";

export const recommendationToastStore = create<{
  hasSeen: boolean;
  setHasSeen: (hasSeen: boolean) => void;
}>((set) => ({
  hasSeen: false,
  setHasSeen: (hasSeen) => set({ hasSeen }),
}));

const useLocationRecommendation = () => {
  const overlay = useOverlay();

  const { hasSeen, setHasSeen } = useStore(
    recommendationToastStore
  );

  const { arCompletedLocations } =
    useArCompletionStore();

  console.log(
    "AR 완료된 위치들",
    arCompletedLocations
  );

  // 1. 모든 로케이션에서 AR 완료된 위치를 필터링
  const { locations: allLocations } = useLocations();

  // 2. 필터링 된 위치들 중 가장 가까운 것을 판단
  const filteredLocations = allLocations.filter(
    (location) =>
      !arCompletedLocations.includes(location.name.KO!)
  );

  useWatchPosition(
    {
      onSuccess: (
        currentPosition: GeolocationPosition
      ) => {
        if (hasSeen) return;

        const { coords: currentCoords } =
          currentPosition;

        const 가장가까운거점 =
          getMostProximateLocation(
            currentCoords,
            filteredLocations
          );

        if (!가장가까운거점) return;

        console.log(가장가까운거점);

        setHasSeen(true);

        const openRecommendationToast = () =>
          overlay.open(({ close, isOpen }) => {
            return (
              <AnimatePresence>
                {isOpen && (
                  <LocationRecommendationToast
                    close={close}
                    location={{
                      name: {
                        KO: 가장가까운거점.name.KO!,
                        EN: 가장가까운거점.name.EN!,
                      },
                      thumbnail: {
                        name: 가장가까운거점
                          .arThumbnail.name,
                        path: 가장가까운거점
                          .arThumbnail.path,
                      },
                    }}
                  />
                )}
              </AnimatePresence>
            );
          });

        setTimeout(() => {
          openRecommendationToast();
        }, 1500);
      },
      onError: (error) => {
        console.error(
          "Error getting location:",
          error
        );
      },
    },
    [filteredLocations, hasSeen]
  );

  return {};
};

export default useLocationRecommendation;
