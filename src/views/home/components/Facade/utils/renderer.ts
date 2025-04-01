import { FACADE_SLICES } from "@/views/home/constants/facade";

export const createFacadePillar = (index: number) => {
  const div = document.createElement("div");
  div.classList.add("facade-pillar");

  const width = window.innerWidth / FACADE_SLICES;
  div.style.width = width + "px";

  // set css variable
  div.style.setProperty(
    "--left-px",
    (index * width).toString() + "px"
  );

  const background = document.createElement("div");
  background.classList.add("facade-pillar-bg");
  background.style.setProperty("width", "100%");
  background.style.setProperty("height", "100%");

  const POSITION_END = 120;
  const backgroundPositionStart =
    index * (POSITION_END / FACADE_SLICES) + "%";

  background.style.setProperty(
    "--background-position-start",
    backgroundPositionStart
  );

  div.appendChild(background);

  return div;
};

export const initializeFacades = (
  container: HTMLDivElement
) => {
  for (let i = 0; i < FACADE_SLICES + 1; i++) {
    const facadePillar = createFacadePillar(i);

    addObserver(facadePillar);

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

export const addFacadePillar = () => {
  const container = document.getElementById(
    "facade-container"
  ) as HTMLDivElement;
  if (!container) return;

  const facadePillar = createFacadePillar(0);

  addObserver(facadePillar);

  // append at the first child
  container.prepend(facadePillar);
};

const addObserver = (target: HTMLDivElement) => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (
        !entry.isIntersecting &&
        !!entry.rootBounds
      ) {
        entry.target.remove();
        addFacadePillar();
      }
    }
  );

  observer.observe(target);
};
