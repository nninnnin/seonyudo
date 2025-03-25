import React from "react";
import { useRouter } from "next/navigation";

import Toast from "@/shared/components/Toast";
import Button from "@/shared/components/Button";
import { LocationSlugs } from "@/features/location/types/location";

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
    slug: LocationSlugs;
  };
  close: () => void;
}) => {
  const router = useRouter();

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

      <Button
        iconSource="/icons/magic.svg"
        onClick={() =>
          router.push(`/ar/${location.slug}`)
        }
      >
        View Details
      </Button>
    </Toast>
  );
};

export default LocationDetailsToast;
