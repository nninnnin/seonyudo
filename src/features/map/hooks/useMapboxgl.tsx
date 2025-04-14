import React, { useEffect, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import { 지도_시작점 } from "@/features/map/constants";

const DEFAULT_ZOOM = 16;
const MIN_ZOOM = 15;

const mapCenter =
  process.env.IS_DEV === "1"
    ? 지도_시작점.한남동
    : 지도_시작점.선유도;

const mapSettings = {
  center: mapCenter,
  zoom: DEFAULT_ZOOM,
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
      minZoom: MIN_ZOOM,
    });

    // Map settings: Disable double click zoom
    mapInstance.doubleClickZoom.disable();

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      fitBoundsOptions: {
        zoom: DEFAULT_ZOOM,
        minZoom: DEFAULT_ZOOM,
      },
      showAccuracyCircle: false,
    });

    mapInstance.addControl(geolocate, "bottom-left");

    const showMarkers = (
      markers: NodeListOf<Element>
    ) => {
      markers.forEach((marker) => {
        marker.classList.add("show");
      });
    };

    const hideMarkers = (
      markers: NodeListOf<Element>
    ) => {
      markers.forEach((marker) => {
        marker.classList.remove("show");
      });
    };

    mapInstance.on("zoom", (z) => {
      const zoomLevel = z.target.getZoom();

      console.log("zoomLevel", zoomLevel);

      const locationMarkers =
        document.querySelectorAll(".marker.location");
      const decorativeMarkers =
        document.querySelectorAll(
          ".marker.decorative"
        );

      if (zoomLevel < 16) {
        hideMarkers(decorativeMarkers);
      } else {
        showMarkers(decorativeMarkers);
      }

      if (zoomLevel >= MIN_ZOOM && zoomLevel < 16) {
        locationMarkers.forEach((marker) => {
          marker.classList.add("icon--smaller");
          marker.classList.add("label--smaller");
        });
      } else {
        locationMarkers.forEach((marker) => {
          marker.classList.remove("icon--smaller");
          marker.classList.remove("label--smaller");
        });
      }
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
