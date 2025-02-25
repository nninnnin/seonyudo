export const requestDeviceMotionPermission = async () => {
  // @ts-ignore
  return await window.DeviceMotionEvent.requestPermission();
};
