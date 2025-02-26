import { useEffect } from "react";

const useWatchPosition = (
  callbacks: {
    onSuccess: (position: GeolocationPosition) => void;
    onError: (error: {
      code: number;
      message: string;
    }) => void;
  },
  deps: unknown[] = []
) => {
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    navigator.geolocation.watchPosition(
      callbacks.onSuccess,
      callbacks.onError,
      options
    );
  }, deps);
};

export default useWatchPosition;
