import { MeetUp, User } from "@prisma/client";

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
  isLoggedInUser: boolean;
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

export type BaseUserInfo = {
  id: number;
  username: string;
  image: string;
  name: string;
};
