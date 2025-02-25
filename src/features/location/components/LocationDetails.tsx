import useLocation from "@/features/location/hooks/useLocation";
import { locationStore } from "@/features/location/store/location";
import Overlay from "@/shared/components/Overlay";
import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

const LocationDetails = () => {
  const { selectedLocation, resetSelectedLocation } =
    useStore(locationStore);

  const { location } = useLocation(
    selectedLocation ?? ""
  );

  return (
    <Overlay>
      <div
        className={clsx(
          "w-[300px] h-[300px]",
          "bg-white",
          "flex flex-col justify-center items-center",
          "p-[10px]",
          "relative"
        )}
      >
        <button
          className="absolute top-0 right-0 p-[10px]"
          onClick={() => resetSelectedLocation()}
        >
          X
        </button>

        <p>{location?.description ?? ""}</p>

        <button className="bg-black text-white mt-[20px] p-[10px]">
          AR 실행하기
        </button>
      </div>
    </Overlay>
  );
};

export default LocationDetails;
