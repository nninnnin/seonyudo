import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { locationStore } from "@/features/location/store/location";
import { LocationName } from "@/features/location/types/location";
import useLocations from "@/features/location/hooks/useLocations";

const Locations = () => {
  const { setSelectedLocation } =
    useStore(locationStore);

  const { locations } = useLocations();

  const handleItemClick =
    (locationName: LocationName) => () => {
      setSelectedLocation(locationName);
    };

  return (
    <ul
      className={clsx(
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "gap-[10px]",
        "bg-green-100"
      )}
    >
      {locations.map((location) => {
        return (
          <Locations.Item
            key={location.uid}
            onClick={handleItemClick(
              location.name.KO ?? ""
            )}
          >
            {location.name.KO}
          </Locations.Item>
        );
      })}
    </ul>
  );
};

Locations.Item = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return <li onClick={onClick}>{children}</li>;
};

export default Locations;
