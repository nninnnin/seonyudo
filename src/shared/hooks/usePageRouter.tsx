"use client";

import { useRouter } from "next/navigation";

const usePageRouter = () => {
  const router = useRouter();

  return {
    goHome: () => router.push("/"),
  };
};

export default usePageRouter;
