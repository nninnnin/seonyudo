import { zip } from "lodash";
import chroma from "chroma-js";

const ANIMATE_STEPS = 10;
const ANIMATE_DURATION_PER_FRAME = 20;

const getColorSteps = (
  colorA: string,
  colorB: string
) => {
  const colors = chroma
    .scale([colorA, colorB])
    .mode("lab")
    .colors(ANIMATE_STEPS);

  return colors;
};

const setGradientColors = (
  element: HTMLElement,
  colors: [string, string][],
  callback: () => void
) => {
  let timeoutId: NodeJS.Timeout | number = 0;

  const currentColors = colors.shift();

  if (!currentColors) {
    console.log("end");
    clearTimeout(timeoutId);
    callback();

    return;
  }

  const [from, to] = currentColors;

  requestAnimationFrame(() => {
    element.style.setProperty(
      "--gradient-color--left",
      from
    );

    element.style.setProperty(
      "--gradient-color--right",
      to
    );

    timeoutId = setTimeout(() => {
      setGradientColors(element, colors, callback);
    }, ANIMATE_DURATION_PER_FRAME);
  });
};

export const transitionGradientColors = (
  gradientA: {
    from: string;
    to: string;
  },
  gradientB: {
    from: string;
    to: string;
  },
  element: HTMLElement,
  callback: () => void
) => {
  const fromColors = getColorSteps(
    gradientA.from,
    gradientB.from
  );

  const toColors = getColorSteps(
    gradientA.to,
    gradientB.to
  );

  const zippedColors = zip(fromColors, toColors) as [
    string,
    string
  ][];

  setGradientColors(element, zippedColors, callback);
};
