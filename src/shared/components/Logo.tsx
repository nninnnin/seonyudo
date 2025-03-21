import clsx from "clsx";
import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "fixed",
        "top-[16px] left-[16px] z-[9999]",
        "bg-white p-[10px]"
      )}
      onClick={() => router.push("/")}
    >
      UNSEENING
    </div>
  );
};

export default Logo;
