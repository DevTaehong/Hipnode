import { Podcast } from "@prisma/client";

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

export interface HandlePlayProps {
  audioRef: {
    current: HTMLAudioElement | null;
  };
  isPlaying: boolean;
  setIsPlaying: (newIsPlaying: boolean) => void;
}

export type savePodcastTypeProps = {
  isPlaying: boolean;
  currentTime: any;
  songUrl: string | undefined;
};
