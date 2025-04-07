import clsx from "clsx";
import { motion } from "motion/react";

import AboutChat from "@/views/about/components/AboutChat";
import { IntroductionSubjects } from "@/views/about/constants";

const LocationIdeas = ({
  close,
}: {
  close: () => void;
}) => {
  return (
    <motion.div
      className={clsx(
        "w-full h-full",
        "fixed top-0 left-0 z-[8000]"
      )}
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      <AboutChat
        chatSubject={IntroductionSubjects.Ideas}
        disableNavigation={true}
      />

      <LocationIdeas.CloseButton close={close} />
    </motion.div>
  );
};

LocationIdeas.CloseButton = ({
  close,
}: {
  close: () => void;
}) => {
  return (
    <button
      className={clsx(
        "absolute top-[16px] right-[14px]",
        "bg-white py-[9px] px-[15px] rounded-[16px]"
      )}
      onClick={(e) => {
        e.stopPropagation();

        close();
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 100 100"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="black"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="black"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default LocationIdeas;
