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
  | { type: "SET_PODCAST_ID"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_TOTAL_DURATION"; payload: number }
  | { type: "SET_SHOW_PLAYER"; payload: boolean }
  | { type: "SET_SHOW_INFO"; payload: string }
  | { type: "SET_VOLUME"; payload: number[] }
  | { type: "SET_PODCAST_USER_IMAGE"; payload: string }
  | { type: "SET_PLAYBACK_SPEED_INDEX"; payload: number };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PODCAST_ID":
      return { ...state, id: action.payload };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_TOTAL_DURATION":
      return { ...state, totalDuration: action.payload };
    case "SET_SHOW_PLAYER":
      return { ...state, showPlayer: action.payload };
    case "SET_SHOW_INFO":
      return { ...state, showInfo: action.payload };
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
