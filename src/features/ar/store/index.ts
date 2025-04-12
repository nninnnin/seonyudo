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
  helloByCompleted: boolean;
  setHelloByCompleted: (completed: boolean) => void;
  resetHelloByCompleted: () => void;
}>()(
  persist(
    (set, get) => ({
      arCompletedLocations: [],
      addArCompletedLocations: (location) =>
        set((state) => {
          const prev = get().arCompletedLocations;

          const arCompletedLocations = [
            ...new Set([...prev, location]),
          ];

          return {
            arCompletedLocations,
          };
        }),
      resetArCompletedLocations: () =>
        set(() => ({
          arCompletedLocations: [],
        })),
      helloByCompleted: false,
      setHelloByCompleted: (completed) =>
        set(() => ({
          helloByCompleted: completed,
        })),
      resetHelloByCompleted: () =>
        set(() => ({
          helloByCompleted: false,
        })),
    }),
    {
      name: "ar-completion-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
