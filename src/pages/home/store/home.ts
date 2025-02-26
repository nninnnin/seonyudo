import { create } from "zustand";
import { HomeRoute } from "@/pages/home/types/home";

export const homeStore = create<{
  route: HomeRoute;
  setRoute: (route: HomeRoute) => void;
}>((set) => ({
  route: "ar-list",
  setRoute: (route: HomeRoute) => set({ route }),
}));
