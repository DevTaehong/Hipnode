import { MeetUp, Post, User } from "@prisma/client";

export type UserProfile = User & {
  following: {
    followed: {
      username: string;
      picture: string;
    };
  }[];
  _count: {
    followers: number;
    following: number;
  };
};

export type ProfileMeetup = MeetUp & {
  tags: {
    id: number;
    name: string;
  }[];
  userCanEditMedia: boolean;
};

export type PostPerformance = {
  id: number;
  image: string;
  viewCount: number;
  _count: {
    likes: number;
    comments: number;
  };
};
