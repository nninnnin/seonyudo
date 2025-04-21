import { useStore } from "zustand";
import { introStore } from "@/views/intro/store/intro";
import { useEffect } from "react";
import WelcomeDialog from "@/views/intro/components/WelcomeDialog";
import clsx from "clsx";
import PermissionDeniedDialog from "@/views/intro/components/PermissionDeniedDialog";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence } from "motion/react";
import Overlay from "@/shared/components/Overlay";

const useCheckPermissions = () => {
  const overlay = useOverlay();

  const { setIsIntroWatched, hasPermissionError } =
    useStore(introStore);

  useEffect(() => {
    setIsIntroWatched(true);
  }, []);

  useEffect(() => {
    if (!hasPermissionError) {
      overlay.open(({ close, isOpen }) => (
        <AnimatePresence>
          {isOpen && <WelcomeDialog close={close} />}
        </AnimatePresence>
      ));
    } else {
      overlay.open(({ close, isOpen }) => (
        <AnimatePresence>
          {isOpen && (
            <Overlay>
              <PermissionDeniedDialog>
                <p
                  className={clsx(
                    "w-[236px]",
                    "text-[16px] font-[700] leading-[120%]",
                    "break-keep",
                    "flex flex-col gap-[16px]"
                  )}
                >
                  브라우저를 다시 실행한 후 위치 및
                  방향 정보
                  <br />
                  제공에 허용을 선택해 주세요.
                  <br />
                  <span>
                    Please restart your browser and
                    allow access to location and
                    orientation information.
                  </span>
                </p>
              </PermissionDeniedDialog>
            </Overlay>
          )}
        </AnimatePresence>
      ));
    }
  }, [hasPermissionError]);
};

export default useCheckPermissions;
