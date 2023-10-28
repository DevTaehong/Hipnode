import { IPodcast } from "@/types/podcast.index";

type State = {
  id: number | undefined;
  currentTime: number;
  totalDuration: number;
  showPlayer: boolean;
  showInfo: string;
  volume: number[];
  podcastUserImage: string;
  playbackSpeedIndex: number;
};

export type Action =
  | { type: "INITIALIZE_PODCAST"; payload: IPodcast | null }
  | {
      type: "UPDATE_PODCAST_INFO";
      payload: { image: string; showInfo: string };
    }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_TOTAL_DURATION"; payload: number }
  | { type: "SET_SHOW_PLAYER"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number[] }
  | { type: "SET_PODCAST_USER_IMAGE"; payload: string }
  | { type: "SET_PLAYBACK_SPEED_INDEX"; payload: number };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INITIALIZE_PODCAST": {
      const podcast = action.payload;
      return {
        ...state,
        id: podcast?.id,
        showInfo: podcast
          ? `#${podcast.episodeNumber} - ${podcast.title}`
          : state.showInfo,
        podcastUserImage: podcast?.image || state.podcastUserImage,
      };
    }
    case "UPDATE_PODCAST_INFO":
      return {
        ...state,
        podcastUserImage: action.payload.image,
        showInfo: action.payload.showInfo,
      };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_TOTAL_DURATION":
      return { ...state, totalDuration: action.payload };
    case "SET_SHOW_PLAYER":
      return { ...state, showPlayer: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_PODCAST_USER_IMAGE":
      return { ...state, podcastUserImage: action.payload };
    case "SET_PLAYBACK_SPEED_INDEX":
      return { ...state, playbackSpeedIndex: action.payload };
    default:
      return state;
  }
};

export const initialState: State = {
  id: undefined,
  currentTime: 0,
  totalDuration: 0,
  showPlayer: false,
  showInfo: "",
  volume: [100],
  podcastUserImage: "",
  playbackSpeedIndex: 1,
};
