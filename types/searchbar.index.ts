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
  setShowSearch: (value: boolean) => void;
  showSearchBar: boolean;
  setShowSearchBar: (value: boolean) => void;
}

type NavBarUserInfoProps = {
  id: number;
  username: string | null | undefined;
  image: string | undefined;
  name: string;
};

export interface NavbarContentProps {
  userInfo: NavBarUserInfoProps;
  currentUserId: number;
  lastChecked: Date | null;
}
