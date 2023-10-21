import { Podcast } from "@prisma/client";

export interface QueryObject {
  show?: string | string[];
}

interface PodcastUserInfo extends Podcast {
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
