"use client";

import React from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

const ArContentsPage = () => {
  const params = useParams();

  console.log(params);

  const arContentsSlug = params["arContentsSlug"];

  return (
    <div
      className={clsx(
        "bg-violet-100",
        "w-[100vw] h-[100dvh]",
        "flex justify-center items-center",
        "font-medium text-lg"
      )}
    >
      {`${arContentsSlug}의 AR 컨텐츠 페이지가 연결될 예정입니다.`}
    </div>
  );
};

export default ArContentsPage;
