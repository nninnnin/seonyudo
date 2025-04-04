"use client";

import clsx from "clsx";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";

import {
  initializeFacades,
  removeFacades,
} from "@/views/home/components/Facade/utils/renderer";

import "./facade.css";
import { FACADE_SLICES } from "@/views/home/constants/facade";
import { transitionGradientColors } from "@/views/home/components/Facade/utils/animate";

const Facade = ({
  imageSource,
}: {
  imageSource: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const facadeContainer = containerRef.current;
    if (!facadeContainer) return;

    initializeFacades(facadeContainer, imageSource);

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          removeFacades();
        } else {
          initializeFacades(
            facadeContainer,
            imageSource
          );
        }
      }
    );
  }, []);

  const GRADIENT_COLORS = {
    RED: { from: "#ecabfe", to: "#f1005c" },
    BLUE: { from: "#4378a6", to: "#000fb3" },
  };

  const [gradientColor, setGradientColor] = useState<
    keyof typeof GRADIENT_COLORS | null
  >(null);

  const isAnimating = useRef(false);

  useEffect(() => {
    const toggleGradientColor = () =>
      setGradientColor((prev) => {
        if (prev === null) return "RED";

        return prev === "RED" ? "BLUE" : "RED";
      });

    window.addEventListener("click", (e) => {
      if (isAnimating.current) return;

      toggleGradientColor();
    });
  }, []);

  useEffect(() => {
    if (isAnimating.current) return;

    const facadeContainer = containerRef.current;

    if (!facadeContainer) return;
    if (gradientColor === null) return;

    const current =
      gradientColor === "RED" ? "BLUE" : "RED";

    const updateAs =
      gradientColor === "RED" ? "RED" : "BLUE";

    isAnimating.current = true;

    transitionGradientColors(
      GRADIENT_COLORS[current],
      GRADIENT_COLORS[updateAs],
      facadeContainer,
      () => {
        isAnimating.current = false;
      }
    );
  }, [gradientColor]);

  const facadePillarWidth =
    window.innerWidth / FACADE_SLICES;

  return (
    <motion.div
      id="facade-container"
      ref={containerRef}
      className={clsx(
        "absolute top-0 left-0 z-[-1]",
        "h-full",
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
