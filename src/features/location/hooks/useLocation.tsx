import useLocations from "@/features/location/hooks/useLocations";
import { LocationName } from "@/features/location/types/location";

const useLocation = (locationName: LocationName) => {
  const { locations } = useLocations();

  return {
    location: locations.find(
      (location) => location.name === locationName
    ),
  };
};

export default useLocation;
