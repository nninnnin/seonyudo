import { create } from "zustand";
import { HomeRoute } from "@/app/types/home";

export const homeStore = create<{
  route: HomeRoute;
  setRoute: (route: HomeRoute) => void;
}>((set) => ({
  route: "ar-list",
  setRoute: (route: HomeRoute) => set({ route }),
}));
