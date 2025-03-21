"use client";

import clsx from "clsx";

import PageHeader from "@/shared/components/PageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "flex flex-col justify-center items-center",
        "home-background-gradient"
      )}
    >
      <div className="text-white text-center text-[20px] font-bold">
        <h1>UNSEENING</h1>
        <h2>선유동화</h2>
      </div>

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
