import React, { useEffect, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import { 지도_시작점 } from "@/features/map/constants";

const mapSettings = {
  center: 지도_시작점.선유도,
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
      style:
        "mapbox://styles/practice-r9/cm96hcc5v007r01r9dz9ubdve",
    });

    // Map settings: Disable double click zoom
    mapInstance.doubleClickZoom.disable();

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapInstance.addControl(geolocate, "bottom-left");

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
