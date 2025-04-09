import useSound from "@/features/sound/hooks/useSound";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SoundToggler = () => {
  const [showToggler, setShowToggler] =
    useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    setShowToggler(pathname.includes("seonyujeong"));
  }, [pathname]);

  const { play, isPlaying, pause } = useSound(
    "/sounds/scape.mp3"
  );

  if (!showToggler) return <></>;

  const handleClick = () => {
    console.log("click");

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div
      className={clsx(
        "w-[32px] h-[32px]",
        "fixed left-[45px] bottom-[54px] z-[4000]",
        "rounded-[20px] bg-white bg-opacity-40 backdrop-blur-[4px]",
        "flex justify-center items-center"
      )}
      onClick={handleClick}
    >
      {isPlaying ? (
        <Image
          width="20"
          height="20"
          src="/icons/sound/sound--active.svg"
          alt="sound-active"
          priority
        />
      ) : (
        <Image
          width="20"
          height="20"
          src="/icons/sound/sound--mute.svg"
          alt="sound-mute"
          priority
        />
      )}
    </div>
  );
};

export default SoundToggler;
