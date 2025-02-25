import { create } from "zustand";

export const introStore = create<{
  isIntroWatched: boolean;
  setIsIntroWatched: (isIntroWatched: boolean) => void;
  hasPermissionError: boolean;
  setHasPermissionError: (
    hasPermissionError: boolean
  ) => void;
}>((set) => {
  return {
    isIntroWatched: false,
    setIsIntroWatched: (isIntroWatched: boolean) =>
      set({ isIntroWatched }),
    hasPermissionError: false,
    setHasPermissionError: (
      hasPermissionError: boolean
    ) => set({ hasPermissionError }),
  };
});
