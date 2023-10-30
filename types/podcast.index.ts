import React from "react";

import { Podcast } from "@prisma/client";
import { Action, State } from "@/components/podcast-components/podcastReducer";

export interface QueryObject {
  show?: string | string[];
}

export interface PodcastUserInfo extends Podcast {
  user: {
    name: string;
    location: string | null;
    picture: string;
  };
}

export interface PodcastPageFilterProps {
  listedPodcasts: PodcastUserInfo[] | undefined;
  userShowsIds: number[];
}

type UserInfo = {
  name: string;
  location: string | null;
  picture: string;
};

export type PodcastWithUserInfo = {
  id: number;
  title: string;
  details: string;
  user: UserInfo;
};

export interface IPodcast extends Podcast {
  user: {
    name: string;
  };
  show: {
    name: string;
  };
}

export type SavePodcastTypeProps = {
  isPlaying: boolean;
  currentTime: any;
  songUrl: string | undefined;
};

export interface handleProgressClickProps {
  percentage: number | React.MouseEvent<HTMLDivElement, MouseEvent>;
  audioRef: React.RefObject<HTMLAudioElement>;
}
export interface PodcastPlayerState {
  isPlaying: boolean;
  currentTime: number;
  songUrl: string;
}

export interface FetchPodcastProps {
  podcast: IPodcast | null;
  getFromLocalStorage: (key: string) => PodcastPlayerState;
  getPodcastById: (id: number) => Promise<IPodcast | null>;
  dispatch: any;
}

export interface LoadPodcastProps {
  storedState: PodcastPlayerState | null;
  setSongUrl: (url: string) => void;
  setCurrentTime: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface HandlePlayCallProps {
  podcast: IPodcast | null;
  dispatch: React.Dispatch<Action>;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  state: State;
}

export interface CyclePlaybackSpeedProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  playbackSpeedIndex: number;
}

export interface PodcastSpeedButtonProps {
  showInfo: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  playbackSpeedIndex: number;
  dispatch: React.Dispatch<Action>;
}

export interface PodcastProgressBarProps {
  currentTime: number;
  totalDuration: number;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface PodcastPlayButtonProps {
  url: string;
  podcast: IPodcast;
}

export type PodcastListColumnType = {
  podcasts: {
    listNumber: string;
    list: PodcastUserInfo[] | undefined;
  };
};

export type PodcastEpisodeInfoType = {
  showName: string;
  episodeNumber: number;
  creatorName: string;
};

export interface HandleVolumeChangeProps {
  newVolume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

export interface PodcastBarVolumeControlProps {
  handleVolumeChange: (props: HandleVolumeChangeProps) => void;
  handleVolumeIconClick: () => void;
  handleCloseClick: () => void;
  volume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

export interface PodcastBarPlayButtonProps {
  songUrl: string | undefined;
  audioRef: React.RefObject<HTMLAudioElement>;
  handlePlayClick: () => void;
  isPlaying: boolean;
}

export interface PodcastBarImageProps {
  id: number | undefined;
  podcastUserImage: string;
}

export type LargePodcastCardType = {
  title: string;
  details: string;
  episodeNumber: number;
};
