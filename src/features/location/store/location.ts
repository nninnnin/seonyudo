import { create } from "zustand";

import {
  LocationFormatted,
  LocationName,
} from "@/features/location/types/location";

export const locationStore = create<{
  selectedLocation: null | LocationName;
  setSelectedLocation: (
    location: LocationName
  ) => void;
  resetSelectedLocation: () => void;
  locations: Array<LocationFormatted>;
  setLocations: (
    locations: Array<LocationFormatted>
  ) => void;
}>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) =>
    set({ selectedLocation: location }),
  resetSelectedLocation: () =>
    set({ selectedLocation: null }),
  locations: [],
  setLocations: (
    locations: Array<LocationFormatted>
  ) => set({ locations }),
}));
