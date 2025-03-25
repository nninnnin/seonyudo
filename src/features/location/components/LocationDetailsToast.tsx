import React from "react";

import Toast from "@/shared/components/Toast";

import Button from "@/shared/components/Button";

const LocationDetailsToast = ({
  location,
  close,
}: {
  location: {
    name: {
      KO: string;
      EN: string;
    };
    description: {
      KO: string;
      EN: string;
    };
  };
  close: () => void;
}) => {
  return (
    <Toast close={close}>
      <div className="flex flex-col gap-[20px]">
        <h1 className="body2">
          <span>{location.name.KO}</span>
          <br />
          <span>{location.name.KO}</span>
        </h1>

        <p className="body3">
          <span>{location.description.KO}</span>
          <br />
          <span>{location.description.EN}</span>
        </p>
      </div>

      <Button iconSource="/icons/magic.svg">
        View Details
      </Button>
    </Toast>
  );
};

export default LocationDetailsToast;
