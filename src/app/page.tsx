"use client";

import { useStore } from "zustand";
import { redirect } from "next/navigation";

import { introStore } from "@/shared/store/intro";
import ARList from "@/features/ar/components/ARList";
import NavigationBar from "@/features/home/components/NavigationBar";

export default function Home() {
  const { isIntroWatched } = useStore(introStore);

  if (!isIntroWatched) {
    return redirect("/intro");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ARList />
      <NavigationBar />
    </div>
  );
}
