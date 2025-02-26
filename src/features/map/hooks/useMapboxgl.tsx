import React, { useEffect, useState } from "react";

import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapSettings = {
  center: {
    lat: 37.543536,
    lng: 126.899887,
  },
  zoom: 16,
};

const useMapboxgl = () => {
  const [mapInstance, setMapInstance] =
    useState<Map | null>(null);

  const mapContainerRef =
    React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

    const mapInstance = new Map({
      ...mapSettings,
      container:
        mapContainerRef.current as HTMLDivElement,
    });

    setMapInstance(mapInstance);

    return () => {
      mapInstance?.remove();
    };
  }, [mapContainerRef]);

  return {
    mapInstance,
    mapContainerRef,
  };
};

export default useMapboxgl;
