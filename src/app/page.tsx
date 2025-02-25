"use client";

import { useStore } from "zustand";
import { redirect } from "next/navigation";

import { introStore } from "@/app/intro/store/intro";
import { homeStore } from "@/app/store/home";

import ARMap from "@/features/map/components/Map";
import About from "@/app/components/About";
import NavigationBar from "@/app/components/NavigationBar";
import Locations from "@/features/location/components/Locations";
import LocationDetails from "@/features/location/components/LocationDetails";
import { locationStore } from "@/features/location/store/location";

export default function Home() {
  const { isIntroWatched } = useStore(introStore);
  const { route } = useStore(homeStore);
  const { selectedLocation } = useStore(locationStore);

  if (!isIntroWatched) {
    return redirect("/intro");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 w-full">
        {route === "ar-list" && (
          <>
            <Locations />
            {selectedLocation && <LocationDetails />}
          </>
        )}
        {route === "map" && <ARMap />}
        {route === "about" && <About />}
      </div>

      <NavigationBar />
    </div>
  );
}
