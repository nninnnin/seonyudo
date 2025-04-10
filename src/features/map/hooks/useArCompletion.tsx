import clsx from "clsx";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence } from "motion/react";

import Toast from "@/shared/components/Toast";
import Button from "@/shared/components/Button";
import { useArCompletionStore } from "@/features/ar/store";

const useArCompletion = () => {
  const overlay = useOverlay();

  const { arCompletedLocations } =
    useArCompletionStore();

  const router = useRouter();

  useEffect(() => {
    if (arCompletedLocations.length >= 5) {
      overlay.open(({ isOpen, close }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <Toast close={close}>
                <p className="w-[258px] body3">
                  숨겨진 이야기를 모두 만나셨네요
                  마지막으로 우리 함께 추억을 남겨요
                  <br />
                  You’ve found all the hidden stories
                  Let’s leave one last memory together
                </p>

                <img
                  className={clsx(
                    "absolute top-[50px] right-[14px]",
                    "w-[109px] h-[109px] object-cover"
                  )}
                  src="/images/whale.png"
                />

                <Button
                  theme="white"
                  iconSource="/icons/camera--black.svg"
                  onClick={() => {
                    router.push(
                      "/ar/hellobye/contents"
                    );
                  }}
                >
                  Photo frames
                </Button>
              </Toast>
            )}
          </AnimatePresence>
        );
      });
    }
  }, [arCompletedLocations]);
};

export default useArCompletion;
