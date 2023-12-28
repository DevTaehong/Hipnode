import { PostResult } from "@/types/searchbar.index";

export type SearchBarState = {
  searchText: string;
  activeSearchType: string;
  amountToSkip: number;
  searchResults: PostResult[];
  isLoading: boolean;
  showButton: boolean;
  showSearch: boolean;
  showSearchBar: boolean;
};

export const initialState: SearchBarState = {
  searchText: "",
  activeSearchType: "",
  amountToSkip: 0,
  searchResults: [],
  isLoading: false,
  showButton: false,
  showSearch: false,
  showSearchBar: false,
};

export type SearchBarAction =
  | { type: "SET_SEARCH_TEXT"; payload: string }
  | { type: "SET_ACTIVE_SEARCH_TYPE"; payload: string }
  | { type: "SET_AMOUNT_TO_SKIP"; payload: number }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | {
      type: "UPDATE_SEARCH_RESULTS";
      payload: {
        searchResults: PostResult[];
        amountToSkip: number;
        showButton: boolean;
      };
    }
  | {
      type: "HANDLE_CLOSE";
    }
  | {
      type: "HANDLE_LOAD_MORE";
      payload: {
        searchResults: (prev: PostResult[]) => PostResult[];
        isLoading: boolean;
        showButton: boolean;
      };
    }
  | {
      type: "HANDLE_FOCUS";
    }
  | {
      type: "HANDLE_UNFOCUS";
    };

export const reducer = (
  state: SearchBarState,
  action: SearchBarAction
): SearchBarState => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_ACTIVE_SEARCH_TYPE":
      return { ...state, activeSearchType: action.payload };
    case "SET_AMOUNT_TO_SKIP":
      return { ...state, amountToSkip: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "UPDATE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload.searchResults,
        amountToSkip: action.payload.amountToSkip,
        showButton: action.payload.showButton,
      };
    case "HANDLE_CLOSE":
      return {
        ...state,
        showSearch: false,
        showSearchBar: false,
        searchText: "",
        activeSearchType: "",
        amountToSkip: 0,
      };
    case "HANDLE_FOCUS":
      return {
        ...state,
        showSearch: true,
        showSearchBar: true,
      };
    case "HANDLE_UNFOCUS":
      return {
        ...state,
        showSearch: false,
        showSearchBar: false,
      };
    case "HANDLE_LOAD_MORE":
      return {
        ...state,
        searchResults:
          typeof action.payload.searchResults === "function"
            ? action.payload.searchResults(state.searchResults)
            : action.payload.searchResults,
        isLoading: action.payload.isLoading,
        showButton: action.payload.showButton,
      };
    default:
      return state;
  }
};
