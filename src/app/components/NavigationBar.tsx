import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { homeStore } from "@/app/store/home";
import { HomeRoute } from "@/app/types/home";

const NavigationBar = () => {
  const { route, setRoute } = useStore(homeStore);

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
