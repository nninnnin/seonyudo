"use client";

import React from "react";
import clsx from "clsx";
import { pipe } from "@fxts/core";

import { FACADE_SLICES } from "@/views/home/constants/facade";

const ChatBackground = () => {
  const pillarGradients = [
    { from: -10, to: 11.68 },
    { from: -10, to: 16.97 },
    { from: -10, to: 30.72 },
    { from: -10, to: 47.12 },
    { from: -10, to: 60 },
    { from: -10, to: 72 },
    { from: -10, to: 88 },
    { from: -10, to: 100 },
    { from: -10, to: 100 },
  ];

  return (
    <div
      className={clsx(
        "absolute top-0 left-0 z-[-1]",
        "w-full h-[100lvh]",
        "bg-red-500",
        "flex"
      )}
    >
      {pipe(pillarGradients, (list) =>
        list.map((grad, index) => {
          return (
            <Pillar
              gradient={grad}
              key={`chat-bg-pillar-${index}`}
            />
          );
        })
      )}
    </div>
  );
};

const Pillar = ({
  gradient,
}: {
  gradient: {
    from: number;
    to: number;
  };
}) => {
  return (
    <div
      className="h-[100lvh]"
      style={{
        width:
          window.innerWidth / FACADE_SLICES + "px",
        background: `linear-gradient(to right, #60ACED ${gradient.from}%, #0015FF ${gradient.to}%)`,
        backgroundColor: "red",
      }}
    ></div>
  );
};

export default ChatBackground;
