const requestDeviceMotionOnSafariIOS = async () => {
  // @ts-ignore
  return await window.DeviceMotionEvent.requestPermission();
};

const requestDeviceMotionOnAndroidWeb = () => {
  window.addEventListener("devicemotion", () => {});
};

export const requestDeviceMotionPermission =
  async () => {
    if (isSafariOver13()) {
      return await requestDeviceMotionOnSafariIOS();
    } else {
      requestDeviceMotionOnAndroidWeb();

      return {
        state: "granted",
      };
    }
  };

const isSafariOver13 = () => {
  return (
    window.DeviceOrientationEvent !== undefined &&
    // @ts-ignore
    window.DeviceOrientationEvent.requestPermission &&
    typeof (
      // @ts-ignore
      window.DeviceOrientationEvent.requestPermission
    ) === "function"
  );
};
