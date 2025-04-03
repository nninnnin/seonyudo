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
