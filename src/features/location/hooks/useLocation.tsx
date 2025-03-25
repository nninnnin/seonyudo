import useLocations from "@/features/location/hooks/useLocations";
import { LocationSlugs } from "@/features/location/types/location";

const useLocation = (locationSlug: LocationSlugs) => {
  const { locations } = useLocations();

  return {
    location: locations.find(
      (location) => location.slug === locationSlug
    ),
  };
};

export default useLocation;
