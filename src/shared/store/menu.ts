import { create } from "zustand";

export const menuStore = create<{
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
  toggleVisibility: () => void;
}>((set) => ({
  visibility: false,
  setVisibility: (visibility) => set({ visibility }),
  toggleVisibility: () =>
    set((state) => ({
      visibility: !state.visibility,
    })),
}));
