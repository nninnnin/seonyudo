import React, { useEffect } from "react";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence } from "motion/react";

import { useArCompletionStore } from "@/features/ar/store";
import HelloByeToast from "@/features/map/components/HelloByeToast";
import EndingToast from "@/features/map/components/EndingToast";

const useArCompletion = () => {
  const overlay = useOverlay();

  const {
    arCompletedLocations,
    helloByCompleted,
    resetHelloByCompleted,
  } = useArCompletionStore();

  useEffect(() => {
    if (helloByCompleted) return;

    if (arCompletedLocations.length >= 5) {
      overlay.open(({ isOpen, close }) => {
        return (
          <AnimatePresence>
            {isOpen && <HelloByeToast close={close} />}
          </AnimatePresence>
        );
      });
    }
  }, [arCompletedLocations, helloByCompleted]);

  useEffect(() => {
    if (helloByCompleted) {
      overlay.open(({ isOpen, close }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <EndingToast
                close={() => {
                  close();
                  resetHelloByCompleted();
                }}
              />
            )}
          </AnimatePresence>
        );
      });
    }
  }, [helloByCompleted]);
};

export default useArCompletion;
