"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { debounce } from "lodash";
import { motion } from "motion/react";

import {
  initializeFacades,
  removeFacades,
} from "@/views/home/components/Facade/utils/renderer";

import "./facade.css";
import { transitionGradientColors } from "@/views/home/components/Facade/utils/animate";
import { FacadeConfigs } from "@/views/home/constants/facade";

const Facade = ({
  imageSource,
  isDesktop = false,
}: {
  imageSource: string;
  isDesktop?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const facadeContainer = containerRef.current;
    if (!facadeContainer) return;

    initializeFacades(
      facadeContainer,
      imageSource,
      isDesktop
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          removeFacades();
        } else {
          initializeFacades(
            facadeContainer,
            imageSource,
            isDesktop
          );
        }
      }
    );
  }, []);

  useEffect(() => {
    const facadeContainer = containerRef.current;
    if (!facadeContainer) return;

    const resizeHandler = () => {
      removeFacades();
    };

    const resizeOverHandler = debounce(
      () => {
        initializeFacades(
          facadeContainer,
          imageSource,
          isDesktop
        );
      },
      100,
      {
        leading: false,
        trailing: true,
      }
    );

    window.addEventListener("resize", resizeHandler);
    window.addEventListener(
      "resize",
      resizeOverHandler
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeHandler
      );
      window.removeEventListener(
        "resize",
        resizeOverHandler
      );
    };
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

  const configs = isDesktop
    ? FacadeConfigs.Desktop
    : FacadeConfigs.Mobile;

  const facadePillarWidth =
    window.innerWidth / configs.Slices;

  return (
    <motion.div
      id="facade-container"
      ref={containerRef}
      className={clsx(
        "absolute top-0 left-0 z-[0]",
        isDesktop
          ? "h-[calc(100dvh+176px)]"
          : "h-full",
        "overflow-x-hidden"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        width: `calc(100vw + ${facadePillarWidth}px)`,
        transform: `translateX(${-facadePillarWidth}px)`,
      }}
    ></motion.div>
  );
};

export default Facade;
