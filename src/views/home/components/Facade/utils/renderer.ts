import { FacadeConfigs } from "@/views/home/constants/facade";

export const createFacadePillar = (
  index: number,
  imageSource: string,
  isDesktop: boolean
) => {
  const configs = isDesktop
    ? FacadeConfigs.Desktop
    : FacadeConfigs.Mobile;

  const div = document.createElement("div");
  div.classList.add("facade-pillar");

  const width = window.innerWidth / configs.Slices;
  div.style.width = width + configs.coverWidth + "px";

  const percent = Math.min(
    Math.floor((index / configs.Slices) * 10) / 10,
    1
  );

  const percentValue = Math.min(
    Math.floor(percent * 100),
    100
  );

  div.style.setProperty(
    "--background-position-start",
    percentValue + "%"
  );

  div.style.setProperty(
    "--background-position-end",
    configs.flowEnd + "%"
  );

  div.style.setProperty(
    "--left-px",
    (index * width).toString() + "px"
  );

  const background = document.createElement("div");
  background.classList.add("facade-pillar-bg");
  background.style.setProperty(
    "background-image",
    `url("${imageSource}")`
  );
  background.style.setProperty("width", "100%");
  background.style.setProperty("height", "100%");

  const backgroundPositionStart =
    (isDesktop ? index - 4 : index) *
      (configs.PositionEnd / configs.Slices) +
    "%";

  background.style.setProperty(
    "--background-position-start",
    backgroundPositionStart
  );

  div.appendChild(background);

  return div;
};

export const initializeFacades = (
  container: HTMLDivElement,
  imageSource: string,
  isDesktop: boolean
) => {
  const configs = isDesktop
    ? FacadeConfigs.Desktop
    : FacadeConfigs.Mobile;

  for (let i = 0; i < configs.Slices + 1; i++) {
    const facadePillar = createFacadePillar(
      i,
      imageSource,
      isDesktop
    );

    addObserver(facadePillar, imageSource, isDesktop);

    container.appendChild(facadePillar);
  }
};

export const removeFacades = () => {
  const container = document.getElementById(
    "facade-container"
  ) as HTMLDivElement;
  if (!container) return;

  const facades = container.querySelectorAll(
    ".facade-pillar"
  );

  facades.forEach((pillar) => {
    pillar.remove();
  });
};

export const addFacadePillar = (
  imageSource: string,
  isDesktop: boolean
) => {
  const container = document.getElementById(
    "facade-container"
  ) as HTMLDivElement;
  if (!container) return;

  const facadePillar = createFacadePillar(
    0,
    imageSource,
    isDesktop
  );

  addObserver(facadePillar, imageSource, isDesktop);

  // append at the first child
  container.prepend(facadePillar);
};

const addObserver = (
  target: HTMLDivElement,
  imageSource: string,
  isDesktop: boolean
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (
        !entry.isIntersecting &&
        !!entry.rootBounds
      ) {
        entry.target.remove();
        addFacadePillar(imageSource, isDesktop);
      }
    }
  );

  observer.observe(target);
};
