import { useEffect } from "react";

const useUserLocation = (
  onSuccess: (position: GeolocationPosition) => void
) => {
  useEffect(() => {
    const onError = (
      error: GeolocationPositionError
    ) => {
      console.error(
        "Error getting user location: ",
        error
      );
    };

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError
    );
  }, []);
};

export default useUserLocation;
