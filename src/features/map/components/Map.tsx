import clsx from "clsx";
import React from "react";

import useMapboxgl from "@/features/map/hooks/useMapboxgl";

const Map = () => {
  const { mapContainerRef } = useMapboxgl();

  return (
    <div
      id="map-container"
      className={clsx(
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "bg-blue-100"
      )}
      ref={mapContainerRef}
    ></div>
  );
};

export default Map;
