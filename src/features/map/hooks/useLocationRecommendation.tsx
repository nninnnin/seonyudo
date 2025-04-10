"use client";

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

  const { arCompletedLocations, helloByCompleted } =
    useArCompletionStore();

  const { locations: allLocations } = useLocations();

  const filteredLocations = allLocations.filter(
    (location) =>
      !arCompletedLocations.includes(location.name.KO!)
  );

  useWatchPosition(
    {
      onSuccess: (
        currentPosition: GeolocationPosition
      ) => {
        if (arCompletedLocations.length >= 5) return;
        if (helloByCompleted) return;

        if (hasSeen) return;

        const { coords: currentCoords } =
          currentPosition;

        const 가장가까운거점 =
          getMostProximateLocation(
            currentCoords,
            filteredLocations
          );

        if (!가장가까운거점) return;

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
                        name: 가장가까운거점.arImage
                          .name,
                        path: 가장가까운거점.arImage
                          .path,
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
    [
      filteredLocations,
      hasSeen,
      arCompletedLocations,
      helloByCompleted,
    ]
  );
};

export default useLocationRecommendation;
