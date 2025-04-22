import { useEffect } from "react";

const useUserLocation = (
  onSuccess: (position: GeolocationPosition) => void,
  preventRequest: boolean = true
) => {
  useEffect(() => {
    if (preventRequest) return;

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
  }, [preventRequest]);
};

export default useUserLocation;
