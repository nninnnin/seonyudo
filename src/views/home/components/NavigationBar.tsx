import clsx from "clsx";
import React, { useEffect } from "react";
import { useStore } from "zustand";

import { useSearchParams } from "next/navigation";
import { locationStore } from "@/features/location/store/location";
import { homeStore } from "@/views/home/store/home";
import { HomeRoute } from "@/views/home/types/home";

const NavigationBar = () => {
  const { route, setRoute } = useStore(homeStore);
  const { setSelectedLocation } =
    useStore(locationStore);

  const searchParams = useSearchParams();

  useEffect(() => {
    const locationName = searchParams?.get("location");

    if (locationName) {
      setSelectedLocation(locationName);
    }
  }, [searchParams]);

  const handleItemClick =
    (homeRoute: HomeRoute) => () => {
      setRoute(homeRoute);
    };

  return (
    <ul
      className={clsx(
        "relative bottom-0",
        "w-full bg-slate-200",
        "p-[10px]",
        "flex justify-around items-center"
      )}
    >
      <NavigationBar.Item
        className={clsx(
          route === "ar-list" && "text-white"
        )}
        onClick={handleItemClick("ar-list")}
      >
        Home
      </NavigationBar.Item>

      <NavigationBar.Item
        className={clsx(
          route === "map" && "text-white"
        )}
        onClick={handleItemClick("map")}
      >
        Map
      </NavigationBar.Item>

      <NavigationBar.Item
        className={clsx(
          route === "about" && "text-white"
        )}
        onClick={handleItemClick("about")}
      >
        About
      </NavigationBar.Item>
    </ul>
  );
};

NavigationBar.Item = ({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <li
      className={clsx("p-[10px]", className)}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default NavigationBar;
