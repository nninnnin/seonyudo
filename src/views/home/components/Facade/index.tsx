"use client";

import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

import {
  initializeFacades,
  removeFacades,
} from "@/views/home/components/Facade/utils/renderer";

import "./facade.css";
import { FACADE_SLICES } from "@/views/home/constants/facade";

const Facade = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const facadeContainer = containerRef.current;
    if (!facadeContainer) return;

    initializeFacades(facadeContainer);

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          removeFacades();
        } else {
          initializeFacades(facadeContainer);
        }
      }
    );
  }, []);

  const facadePillarWidth =
    window.innerWidth / FACADE_SLICES;

  return (
    <motion.div
      id="facade-container"
      ref={containerRef}
      className={clsx(
        "absolute top-0 left-0",
        "h-full bg-red-300 bg-opacity-20",
        "overflow-x-hidden"
      )}
      style={{
        width: `calc(100vw + ${facadePillarWidth}px)`,
        transform: `translateX(${-facadePillarWidth}px)`,
      }}
    ></motion.div>
  );
};

export default Facade;
