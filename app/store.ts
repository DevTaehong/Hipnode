import { create } from "zustand";

interface PodcastStore {
  isPlaying: boolean;
  songUrl: string;
  togglePlay: () => void;
  setSongUrl: (url: string) => void;
}

const usePodcastStore = create<PodcastStore>((set) => ({
  isPlaying: false,
  songUrl: "",
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSongUrl: (url: string) => set({ songUrl: url }),
}));

export default usePodcastStore;
