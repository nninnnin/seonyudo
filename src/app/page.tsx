"use client";

import { useStore } from "zustand";
import {
  redirect,
  useSearchParams,
} from "next/navigation";

import { introStore } from "@/views/intro/store/intro";
import { homeStore } from "@/views/home/store/home";

import ARMap from "@/features/map/components/Map";
import About from "@/views/home/components/About";
import NavigationBar from "@/views/home/components/NavigationBar";
import Locations from "@/features/location/components/Locations";
import LocationDetails from "@/features/location/components/LocationDetails";
import { locationStore } from "@/features/location/store/location";

export default function Home() {
  const { route } = useStore(homeStore);
  const { isIntroWatched } = useStore(introStore);
  const { selectedLocation } = useStore(locationStore);

  const searchParams = useSearchParams();
  const hasNoSearchParam = searchParams?.size === 0;

  if (!isIntroWatched && hasNoSearchParam) {
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
