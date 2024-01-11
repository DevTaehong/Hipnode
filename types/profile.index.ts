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

export interface EditSocialsProps {
  website: string | null | undefined;
  twitter: string | null | undefined;
  instagram: string | null | undefined;
  facebook: string | null | undefined;
  isLoggedInUser: boolean;
}

export interface SocialLinkProps {
  website: string | readonly string[] | undefined;
  twitter: string | readonly string[] | undefined;
  instagram: string | readonly string[] | undefined;
  facebook: string | readonly string[] | undefined;
}
