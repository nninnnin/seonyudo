"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import PageHeader from "@/shared/components/PageHeader";

const Facade = dynamic(
  () => import("@/views/home/components/Facade"),
  {
    ssr: false,
  }
);

export default function Home() {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "flex flex-col justify-center items-center"
      )}
    >
      <Facade />

      <button
        className={clsx(
          "bg-white",
          "px-[14px] py-[8px] rounded-[20px]",
          "fixed left-1/2 -translate-x-1/2 bottom-[40px]"
        )}
        onClick={() => router.push("/map")}
      >
        Open the map
      </button>

      <PageHeader />
    </div>
  );
}
