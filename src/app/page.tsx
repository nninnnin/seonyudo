"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";

import PageHeader from "@/shared/components/PageHeader";
import Button from "@/shared/components/Button";
import useLoadingOverlay from "@/shared/hooks/useLoadingOverlay";
import PageFooter from "@/shared/components/PageFooter";
import { isMobile } from "@/shared/utils/isMobile";
import useCheckPermissions from "@/views/intro/hooks/useCheckPermissions";

const Facade = dynamic(
  () => import("@/views/home/components/Facade"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full loading-background-gradient"></div>
    ),
  }
);

export default function Home() {
  const router = useRouter();
  const { openLoadingOverlay } = useLoadingOverlay();

  useEffect(() => {
    router.prefetch("/map");
  }, [router]);

  useCheckPermissions();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isMobile()) {
      redirect("/desktop");
    }

    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "flex flex-col justify-center items-center",
        "loading-background-gradient"
      )}
    >
      <PageHeader />

      <Facade
        imageSource={"/images/statue-bg--4.png"}
        isDesktop={false}
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
        iconSource="/icons/pin.svg"
      >
        Open the map
      </Button>

      <PageFooter />
    </div>
  );
}
