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
          "absolute top-[50px] right-[14px]",
          "w-[109px] h-[109px] object-cover"
        )}
        src="/images/hellobye.png"
      />

      <Button
        theme="white"
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
