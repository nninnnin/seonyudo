import { useEffect, useRef, useState } from "react";

export function useSound(url: string) {
  const audioContextRef = useRef<AudioContext | null>(
    null
  );
  const sourceRef =
    useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const startTimeRef = useRef(0); // 재생 시작 시점
  const pauseTimeRef = useRef(0); // 일시정지된 시간
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioContextRef.current =
      new (window.AudioContext ||
        (window as any).webkitAudioContext)();

    const loadAudio = async () => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer =
        await audioContextRef.current!.decodeAudioData(
          arrayBuffer
        );

      console.log("Buffer: ", audioBuffer);

      bufferRef.current = audioBuffer;
    };

    loadAudio();

    return () => {
      stop();
      audioContextRef.current?.close();
    };
  }, [url]);

  const play = () => {
    console.log(bufferRef.current);
    console.log(audioContextRef.current);

    if (!bufferRef.current || !audioContextRef.current)
      return;

    if (
      audioContextRef.current.state === "suspended"
    ) {
      audioContextRef.current.resume();
    }

    const source =
      audioContextRef.current.createBufferSource();
    source.buffer = bufferRef.current;
    source.connect(
      audioContextRef.current.destination
    );

    const offset = pauseTimeRef.current || 0;
    source.start(0, offset);
    startTimeRef.current =
      audioContextRef.current.currentTime - offset;

    source.onended = () => setIsPlaying(false);

    sourceRef.current = source;
    setIsPlaying(true);
  };

  const pause = () => {
    if (!audioContextRef.current || !sourceRef.current)
      return;

    sourceRef.current.stop();
    sourceRef.current = null;

    // 현재까지 재생된 시간 저장
    pauseTimeRef.current =
      audioContextRef.current.currentTime -
      startTimeRef.current;
    setIsPlaying(false);
  };

  const stop = () => {
    sourceRef.current?.stop();
    sourceRef.current = null;
    pauseTimeRef.current = 0;
    startTimeRef.current = 0;
    setIsPlaying(false);
  };

  return { play, pause, stop, isPlaying };
}

export default useSound;
