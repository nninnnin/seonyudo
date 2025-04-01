import { create } from "zustand";

export type Languages = "KO" | "EN";

export const languageStore = create<{
  language: Languages;
  setLanguage: (language: Languages) => void;
  toggleLanguage: () => void;
}>((set) => ({
  language: "KO",
  setLanguage: (language: Languages) =>
    set({ language }),
  toggleLanguage: () => {
    const currentLanguage =
      languageStore.getState().language;

    if (currentLanguage === "KO") {
      set({ language: "EN" });
    }

    if (currentLanguage === "EN") {
      set({ language: "KO" });
    }
  },
}));
