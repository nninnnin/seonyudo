import { useEffect } from "react";
import { useStore } from "zustand";
import { toAsync } from "@fxts/core";
import { pipe } from "@rebel9/memex-fetcher";

import { locationStore } from "@/features/location/store/location";
import { getLocations } from "@/features/location/utils/fetcher";
import {
  formatLocations,
  getJsonBody,
} from "@/features/location/utils/formatter";

const useLocations = () => {
  const { locations, setLocations } =
    useStore(locationStore);

  useEffect(() => {
    if (locations.length > 0) return;

    (async function () {
      const formattedLocations = await pipe(
        toAsync,
        getLocations,
        getJsonBody,
        formatLocations
      );

      setLocations(formattedLocations);
    })();
  }, [locations]);

  return { locations };
};

export default useLocations;
