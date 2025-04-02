"use client";

import clsx from "clsx";
import React from "react";
import { redirect, useParams } from "next/navigation";

import LocationDetails from "@/features/location/components/LocationDetails";
import { LocationSlugs } from "@/features/location/types/location";

const ArContentsPage = () => {
  const params = useParams();
  const locationSlug = params["locationSlug"];

  if (!locationSlug) {
    redirect("/");
  }

  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "flex justify-center items-center",
        "font-medium text-lg"
      )}
    >
      <LocationDetails
        locationSlug={locationSlug as LocationSlugs}
      />
    </div>
  );
};

export default ArContentsPage;
