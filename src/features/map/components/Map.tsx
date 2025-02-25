import React from "react";
import clsx from "clsx";

const Map = () => {
  return (
    <div
      className={clsx(
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "bg-blue-100"
      )}
    >
      지도
    </div>
  );
};

export default Map;
