import { create } from "zustand";
import { HomeRoute } from "@/views/home/types/home";

export const homeStore = create<{
  route: HomeRoute;
  setRoute: (route: HomeRoute) => void;
}>((set) => ({
  route: "map",
  setRoute: (route: HomeRoute) => set({ route }),
}));
