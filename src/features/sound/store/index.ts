import { create } from "zustand";

interface AudioStore {
  audioContext: AudioContext | null;
  buffer: AudioBuffer | null;
  source: AudioBufferSourceNode | null;
  isPlaying: boolean;
  startTime: number;
  pauseTime: number;
  url: string | null;

  setUrl: (url: string) => void;
  load: (url: string) => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
}

export const useAudioStore = create<AudioStore>(
  (set, get) => ({
    audioContext: null,
    buffer: null,
    source: null,
    isPlaying: false,
    startTime: 0,
    pauseTime: 0,
    url: null,

    setUrl: (url) => set({ url }),

    load: async (url: string) => {
      let ctx = get().audioContext;
      if (!ctx) {
        ctx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        set({ audioContext: ctx });
      }

      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await ctx.decodeAudioData(
        arrayBuffer
      );
      set({ buffer });
    },

    play: async () => {
      const {
        audioContext,
        buffer,
        pauseTime,
        isPlaying,
        stop,
      } = get();
      if (!audioContext || !buffer || isPlaying)
        return;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0, pauseTime);
      const startTime =
        audioContext.currentTime - pauseTime;

      source.onended = () =>
        set({
          isPlaying: false,
          source: null,
          pauseTime: 0,
        });

      stop(); // 기존 source 정리 (중첩 방지)

      set({ source, isPlaying: true, startTime });
    },

    pause: () => {
      const { audioContext, source, startTime } =
        get();
      if (source && audioContext) {
        source.stop();
        const pauseTime =
          audioContext.currentTime - startTime;
        set({
          isPlaying: false,
          pauseTime,
          source: null,
        });
      }
    },

    stop: () => {
      const { source } = get();
      source?.stop();
      set({
        isPlaying: false,
        pauseTime: 0,
        startTime: 0,
        source: null,
      });
    },
  })
);
