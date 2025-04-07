import { Map, Marker } from "mapbox-gl";

import { curry } from "@fxts/core";
import { LanguageMap } from "@/shared/types/memex";

type MarkerType = "location" | "decorative";

export const createMarker = (
  name: LanguageMap,
  markerType: MarkerType
) => {
  const textClass =
    markerType === "location" ? "body4" : "body5";

  const markerElement = document.createElement("div");
  markerElement.classList.add(
    "marker",
    markerType,
    textClass
  );

  const markerLabel = document.createElement("div");
  markerLabel.classList.add(
    "marker-label",
    markerType,
    textClass
  );

  const labelContents = createLocationLabel(name);

  markerLabel.appendChild(labelContents);

  markerElement.appendChild(markerLabel);

  return new Marker({
    element: markerElement,
  });
};

const createLocationLabel = (name: LanguageMap) => {
  const labelContents = document.createElement("div");
  const labelKorean = document.createElement("span");
  const labelEnglish = document.createElement("span");

  labelKorean.innerHTML = name.KO!;
  labelEnglish.innerHTML = name.EN ?? "";

  labelContents.appendChild(labelKorean);
  labelContents.appendChild(
    document.createElement("br")
  );
  labelContents.appendChild(labelEnglish);

  return labelContents;
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

export const addCompletionStyles = curry(
  (isArCompleted: boolean, marker: Marker) => {
    marker
      .getElement()
      .classList.toggle("completed", isArCompleted);

    return marker;
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
