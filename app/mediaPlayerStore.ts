import { create } from "zustand";

interface MediaPlayerStore {
  isAudioPlaying: boolean;
  setIsAudioPlaying: (isPlaying: boolean) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (isPlaying: boolean) => void;
  audioMessageId: number | undefined;
  setAudioMessageId: (audioMessageId: number | undefined) => void;
  videoMessageId: number | undefined;
  setVideoMessageId: (videoMessageId: number | undefined) => void;
}

const useMediaPlayerStore = create<MediaPlayerStore>((set) => ({
  isAudioPlaying: false,
  setIsAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
  isVideoPlaying: false,
  setIsVideoPlaying: (isVideoPlaying: boolean) => set({ isVideoPlaying }),
  audioMessageId: undefined,
  setAudioMessageId: (audioMessageId: number | undefined) =>
    set({ audioMessageId }),
  videoMessageId: undefined,
  setVideoMessageId: (videoMessageId: number | undefined) =>
    set({ videoMessageId }),
}));

export default useMediaPlayerStore;
