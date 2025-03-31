"use client";

import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";

import { capturedPictureStore } from "@/features/capture/store";
import CapturedImageCard from "@/features/capture/components/CapturedImageCard";

const SharePage = () => {
  // const { capturedPictures } = useStore(
  //   capturedPictureStore
  // );

  const capturedPictures = [
    {
      id: "1",
      url: "/images/captured1.jpg",
    },
    // {
    //   id: "2",
    //   url: "/images/captured2.jpg",
    // },
    // {
    //   id: "3",
    //   url: "/images/captured3.jpg",
    // },
  ];

  return (
    <div
      className={clsx(
        "w-full h-full",
        "home-background-gradient"
      )}
    >
      <h1
        className={clsx(
          "w-full",
          "body1 text-center text-white",
          "fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%-236px)]"
        )}
      >
        <span>사진을 저장하고 공유하세요</span>
        <br />
        <span>Save and share your photos</span>
      </h1>

      <div
        className={clsx(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "flex gap-[30px]"
        )}
      >
        {capturedPictures.map(({ id, url }) => {
          return (
            <CapturedImageCard
              key={`captured-image-${id}`}
              src={url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SharePage;
