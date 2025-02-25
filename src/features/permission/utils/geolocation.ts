import { GeolocationPermissionCode } from "@/features/permission/constants/index";
export const checkGeolocationPermission = async () => {
  return await navigator.permissions.query({ name: "geolocation" });
};

export const requestGeolocation = (
  onSuccess: (position: unknown) => void,
  onError: (err: { code: GeolocationPermissionCode; message: string }) => void
) => {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
};
