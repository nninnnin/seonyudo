import { create } from "zustand";

export const languageStore = create<{
  language: "KO" | "EN";
  setLanguage: (language: "KO" | "EN") => void;
}>((set) => ({
  language: "KO",
  setLanguage: (language: "KO" | "EN") =>
    set({ language }),
}));
