import React from "react";
import clsx from "clsx";
import Toast from "@/shared/components/Toast";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { useArCompletionStore } from "@/features/ar/store";

const HelloByeToast = ({
  close,
}: {
  close: () => void;
}) => {
  const router = useRouter();

  const {
    setHelloByCompleted,
    resetArCompletedLocations,
  } = useArCompletionStore();

  return (
    <Toast
      className="!min-h-[219px] !h-[219px]"
      close={() => {
        setHelloByCompleted(true);
        resetArCompletedLocations();

        close();
      }}
    >
      <p className="w-[258px] body3">
        숨겨진 이야기를 모두 만나셨네요
        <br />
        마지막으로 우리 함께 추억을 남겨요
        <br />
        You’ve found all the hidden stories Let’s leave
        one last memory together
      </p>

      <img
        className={clsx(
          "absolute bottom-[12px] right-[14px]",
          "w-[109px] h-[109px] object-cover"
        )}
        src="/images/hellobye.png"
      />

      <Button
        theme="white"
        className="!w-[165px] !h-[38px] flex justify-center items-center"
        iconSource="/icons/camera--black.svg"
        onClick={() => {
          router.push("/ar/hellobye/contents");
        }}
      >
        Photo frames
      </Button>
    </Toast>
  );
};

export default HelloByeToast;
