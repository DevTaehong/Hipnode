import {
  SearchBarAction,
  SearchBarState,
} from "@/components/navbar/globalSearchReducer";
import { Dispatch } from "react";
import { BaseUserInfo } from "./profile.index";

export interface PostResult {
  id: number;
  title: string;
  type?: string;
}

export interface SearchBarResults {
  posts: PostResult[];
  isMorePosts: boolean;
}

export interface GlobalSearchBarListProps {
  searchResults: PostResult[];
  handleClose: () => void;
  loadMore: () => void;
  showButton: boolean;
}

export interface SearchBarProps {
  additionalStyles?: string;
  state: SearchBarState;
  dispatch: Dispatch<SearchBarAction>;
}

export interface NavbarContentProps {
  userInfo: BaseUserInfo;
  currentUserId: number;
  lastChecked?: Date | null;
}

export interface SearchResultItemProps {
  result: PostResult;
  handleClose: () => void;
}

export interface SearchTypeHeaderProps {
  state: SearchBarState;
  handleHeadingClick: (heading: string) => void;
}

export interface SearchResultListProps {
  state: SearchBarState;
  handleClose: () => void;
  loadMore: () => void;
}
