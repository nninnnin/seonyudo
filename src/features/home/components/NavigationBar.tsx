import clsx from "clsx";
import React from "react";

const NavigationBar = () => {
  return (
    <ul
      className={clsx(
        "relative bottom-0",
        "w-full bg-slate-200",
        "p-[10px]",
        "flex justify-around items-center"
      )}
    >
      <li>Home</li>
      <li>Map</li>
      <li>About</li>
    </ul>
  );
};

export default NavigationBar;
