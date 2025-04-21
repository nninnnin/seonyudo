import { create } from "zustand";

export const useDesktopStore = create<{
  hasOverlayPanel: boolean;
  setHasOverlayPanel: (
    hasOverlayPanel: boolean
  ) => void;
}>((set) => ({
  hasOverlayPanel: false,
  setHasOverlayPanel: (hasOverlayPanel: boolean) =>
    set({ hasOverlayPanel }),
}));
