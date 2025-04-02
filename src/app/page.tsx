"use client";

import clsx from "clsx";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import PageHeader from "@/shared/components/PageHeader";
import Button from "@/shared/components/Button";
import useLoadingOverlay from "@/shared/hooks/useLoadingOverlay";
import PageFooter from "@/shared/components/PageFooter";

const Facade = dynamic(
  () => import("@/views/home/components/Facade"),
  {
    ssr: false,
  }
);

export default function Home() {
  const router = useRouter();
  const { openLoadingOverlay } = useLoadingOverlay();

  useEffect(() => {
    router.prefetch("/map");
  }, [router]);

  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "flex flex-col justify-center items-center"
      )}
    >
      <PageHeader />

      <Facade
        imageSource={"/images/statue-bg--4.png"}
      />

      <Button
        className={clsx(
          "glassmorph",
          "fixed bottom-[63px] left-1/2 -translate-x-1/2"
        )}
        onClick={() => {
          openLoadingOverlay(
            "지도를 불러오는 중입니다.."
          );
          router.push("/map");
        }}
        theme="white"
        iconSource="/icons/pin.svg"
      >
        Open the map
      </Button>

      <PageFooter />
    </div>
  );
}
