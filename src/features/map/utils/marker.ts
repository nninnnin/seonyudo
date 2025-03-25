import { Map, Marker } from "mapbox-gl";

import { curry } from "@fxts/core";

export const createMarker = (name: string) => {
  const markerElement = document.createElement("div");
  markerElement.className = "marker";

  const markerLabel = document.createElement("div");
  markerLabel.className = "marker-label";
  markerLabel.textContent = name;

  markerElement.appendChild(markerLabel);

  return new Marker({
    element: markerElement,
  });
};

export const setMarkerCoords = curry(
  (
    coords: { lat: number; lng: number },
    marker: Marker
  ) => {
    return marker.setLngLat([coords.lng, coords.lat]);
  }
);

export const addMarker = curry(
  (map: Map, marker: Marker) => {
    marker.addTo(map);
  }
);

export const addMarkerClickHandler = curry(
  (handler: () => void, marker: Marker) => {
    marker
      .getElement()
      .addEventListener("click", handler);

    return marker;
  }
);
