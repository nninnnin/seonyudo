import React, { useEffect } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const useMapboxgl = () => {
  const mapRef = React.useRef<mapboxgl.Map | null>(
    null
  );
  const mapContainerRef =
    React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container:
        mapContainerRef.current ?? "map-container",
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [mapContainerRef]);

  return {
    mapRef,
    mapContainerRef,
  };
};

export default useMapboxgl;
