import { isServer } from "@/shared/utils/isServer";

export const isMobile = () => {
  if (isServer()) {
    return false;
  }

  return window.innerWidth < 480;
};
