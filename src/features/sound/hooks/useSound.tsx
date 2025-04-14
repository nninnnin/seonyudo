import { useEffect } from "react";
import { useAudioStore } from "../store/index";

export function useSound(url: string) {
  const {
    setUrl,
    load,
    play,
    pause,
    stop,
    isPlaying,
  } = useAudioStore();

  useEffect(() => {
    setUrl(url);
    load(url);
  }, [url]);

  return {
    play,
    pause,
    stop,
    isPlaying,
  };
}

export default useSound;
