"use client";

import React from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

const ArContentsPage = () => {
  const params = useParams();

  console.log(params);

  return (
    <div
      className={clsx(
        "bg-violet-100",
        "w-[100vw] h-[100dvh]",
        "flex justify-center items-center",
        "font-bold text-4xl"
      )}
    >
      {params["arContentsSlug"]}
    </div>
  );
};

export default ArContentsPage;
