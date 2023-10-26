import { IPodcast } from "@/types/podcast.index";
import { create } from "zustand";

interface PodcastStore {
  isPlaying: boolean;
  songUrl: string;
  podcast: IPodcast | null;
  togglePlay: () => void;
  setSongUrl: (url: string) => void;
  setPodcast: (podcast: IPodcast | null) => void;
}

const usePodcastStore = create<PodcastStore>((set) => ({
  isPlaying: false,
  songUrl: "",
  podcast: null,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSongUrl: (url: string) => set({ songUrl: url }),
  setPodcast: (podcast: IPodcast | null) => set({ podcast }),
}));

export default usePodcastStore;
