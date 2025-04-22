import { create } from "zustand";
import { redirect } from "next/navigation";
import { pipe } from "@rebel9/memex-fetcher";

import useUserLocation from "@/features/map/hooks/useUserLocation";
import {
  getDistanceBetweenCoords,
  getLocationCoords,
  getProximity,
} from "@/features/location/utils/distance";
import { LocationFormatted } from "@/features/location/types/location";
import { ADJACENT_STANDARD_LOOSEN_IN_METER } from "@/features/location/constants/index";

export const useArContentsNavigationStore = create<{
  passedLandingPage: boolean;
  setPassedLandingPage: (passed: boolean) => void;
}>((set) => ({
  passedLandingPage: false,
  setPassedLandingPage: (passed) =>
    set(() => ({ passedLandingPage: passed })),
}));

const useCheckIsValidLocation = (
  location: LocationFormatted | undefined
) => {
  const { passedLandingPage } =
    useArContentsNavigationStore();

  useUserLocation((position) => {
    const { coords: currentCoords } = position;

    const locationProximity = pipe(
      location,
      getLocationCoords,
      getDistanceBetweenCoords(currentCoords),
      getProximity(ADJACENT_STANDARD_LOOSEN_IN_METER)
    );

    if (!locationProximity.nearBy) {
      redirect("/map");
    }
  }, passedLandingPage || !location);
};

export default useCheckIsValidLocation;
