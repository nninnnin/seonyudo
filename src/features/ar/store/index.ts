import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import { LocationName } from "@/features/location/types/location";

export const useArCompletionStore = create<{
  arCompletedLocations: Array<LocationName>;
  addArCompletedLocations: (
    location: LocationName
  ) => void;
  resetArCompletedLocations: () => void;
}>()(
  persist(
    (set, get) => ({
      arCompletedLocations: [],
      // arCompletedLocations: [
      //   "테스트_녹색기둥의 정원",
      //   "테스트_선유교전망대",
      //   "테스트_시간의정원",
      //   "테스트_선유정",
      //   "테스트_수질정화원",
      // ],
      addArCompletedLocations: (location) =>
        set((state) => {
          const arCompletedLocations = [
            ...new Set([
              ...state.arCompletedLocations,
              location,
            ]),
          ];

          return {
            arCompletedLocations,
          };
        }),
      resetArCompletedLocations: () =>
        set(() => ({
          arCompletedLocations: [],
        })),
    }),
    {
      name: "ar-completion-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
