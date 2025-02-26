import clsx from "clsx";
import React from "react";

const ArFrame = ({ src }: { src: string }) => {
  return (
    <iframe
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "fixed top-0 left-0"
      )}
      src={src}
      allow="camera; microphone; geolocation; accelerometer; gyroscope; magnetometer; xr-spatial-tracking;"
    ></iframe>
  );
};

export default ArFrame;
