"use client";

import { useStore } from "zustand";
import { redirect } from "next/navigation";

import { introStore } from "@/app/intro/store/intro";
import { homeStore } from "@/app/store/home";

import ARList from "@/features/ar/components/ARList";
import ARMap from "@/features/map/components/Map";
import About from "@/app/components/About";
import NavigationBar from "@/app/components/NavigationBar";

export default function Home() {
  const { isIntroWatched } = useStore(introStore);
  const { route } = useStore(homeStore);

  if (!isIntroWatched) {
    return redirect("/intro");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 w-full">
        {route === "ar-list" && <ARList />}
        {route === "map" && <ARMap />}
        {route === "about" && <About />}
      </div>

      <NavigationBar />
    </div>
  );
}
