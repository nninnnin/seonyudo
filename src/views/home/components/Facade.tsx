"use client";

import clsx from "clsx";
import React from "react";
import { map, pipe, range, toArray } from "@fxts/core";
import { motion } from "motion/react";

import { FACADE_SLICES } from "@/views/home/constants/facade";

const Facade = () => {
  return (
    <div
      className={clsx(
        "absolute top-0 left-0",
        "w-full h-full bg-red-300 bg-opacity-20",
        "flex"
      )}
    >
      {pipe(
        range(FACADE_SLICES),
        map((index) => (
          <Facade.Pillar
            key={`facade-pillar-${index}`}
            index={index}
          />
        )),
        toArray
      )}
    </div>
  );
};

Facade.Pillar = ({ index }: { index: number }) => {
  return (
    <motion.div
      className={clsx(
        "bg-blue-300",
        "h-full",
        "overflow-hidden"
      )}
      style={{
        width: window.innerWidth / FACADE_SLICES,
        backgroundImage: `url("/images/statue-bg--4.png")`,
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0%",
      }}
      initial={{ backgroundPosition: "0%" }}
      animate={{ backgroundPosition: "100%" }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        delay: index * 0.3,
      }}
    >
      <div
        className="w-full h-full bg-red-500 bg-opacity-10"
        style={{
          background:
            "linear-gradient(to right, rgba(200, 50, 50, 0.1), rgba(0, 0, 0, 0.1))",
        }}
      ></div>
    </motion.div>
  );
};

export default Facade;
