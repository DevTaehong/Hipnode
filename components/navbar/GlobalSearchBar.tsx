"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";

import OutlineIcons from "@/components/icons/outline-icons";
import {
  getSearchBarResults,
  getAllSearchBarResults,
} from "@/lib/actions/search-bar.actions";
import GlobalSearchBarList from "./GlobalSearchBarList";
import {
  PostResult,
  SearchBarProps,
  SearchBarResults,
} from "@/types/searchbar.index";
import LoaderComponent from "../onboarding-components/LoaderComponent";
import { searchHeadings } from "@/constants/search-bar";

const SearchBar = ({ additionalStyles, state, dispatch }: SearchBarProps) => {
  const fetchSearchResults = async () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    let posts;

    try {
      if (state.activeSearchType === "") {
        posts = await getAllSearchBarResults(state.searchText, 0);
      } else {
        posts = await getSearchBarResults(
          state.searchText,
          state.activeSearchType,
          0
        );
      }
      if (posts) {
        dispatch({
          type: "UPDATE_SEARCH_RESULTS",
          payload: {
            searchResults: posts.posts,
            amountToSkip: 10,
            showButton: posts.isMorePosts,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [state.activeSearchType]);

  useEffect(() => {
    if (state.searchText === "") {
      fetchSearchResults();
    }
  }, [state.searchText]);

  const handleHeadingClick = (heading: string) => {
    if (state.isLoading) return;
    const payload = heading === state.activeSearchType ? "" : heading;
    dispatch({ type: "SET_ACTIVE_SEARCH_TYPE", payload });
    dispatch({ type: "SET_AMOUNT_TO_SKIP", payload: 0 });
  };

  const handleClose = () => {
    dispatch({ type: "HANDLE_CLOSE" });
  };

  const loadMore = () => {
    dispatch({ type: "SET_AMOUNT_TO_SKIP", payload: state.amountToSkip + 10 });

    const fetchSearchResults = async () => {
      try {
        let posts: SearchBarResults;
        if (state.activeSearchType === "") {
          posts = await getAllSearchBarResults(
            state.searchText,
            state.amountToSkip
          );
        } else {
          posts = await getSearchBarResults(
            state.searchText,
            state.activeSearchType,
            state.amountToSkip
          );
        }

        dispatch({
          type: "HANDLE_LOAD_MORE",
          payload: {
            searchResults: (prev: PostResult[]) => [...prev, ...posts.posts],
            isLoading: false,
            showButton: posts.isMorePosts,
          },
        });
      } catch (error) {
        console.error("Error occurred while loading more results:", error);
        dispatch({ type: "SET_IS_LOADING", payload: false });
      }
    };

    fetchSearchResults();
  };

  const handleFocus = () => {
    dispatch({ type: "HANDLE_OPEN" });
  };

  return (
    <div
      className={`${additionalStyles} z-20 -translate-y-2 items-center gap-2 rounded-lg bg-light-2 px-5 py-3 lg:relative lg:mx-0 lg:flex lg:w-full lg:max-w-[27.5rem] lg:translate-y-0 lg:py-2 dark:bg-dark-4`}
    >
      <Input
        type="text"
        placeholder="Type here to search..."
        className="no-focus flex border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
        value={state.searchText}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })
        }
        onFocus={handleFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchSearchResults();
          }
        }}
      />
      <section
        className={`${
          state.showSearch ? "flex" : "hidden"
        } absolute top-14 h-fit max-h-[80vh] w-full -translate-x-5 flex-col rounded-lg bg-light lg:top-12 lg:max-h-[20rem] dark:bg-dark-2`}
      >
        <header className="flex h-[3.75rem] gap-4 border-b border-sc-6 p-4 dark:border-dark-4">
          <p className="semibold-14 text-dark-3 dark:text-light-2">Type:</p>
          <div className="flex gap-2.5 overflow-x-scroll">
            {searchHeadings.map((heading) => {
              const isActive = heading === state.activeSearchType;
              return (
                <button
                  key={heading}
                  type="button"
                  className={`semibold-9 flex-center h-[1.625rem] w-[3.75rem] shrink-0 cursor-pointer rounded-full ${
                    isActive
                      ? "bg-red-90 text-light"
                      : "bg-sc-6 text-sc-2 hover:bg-red-90 hover:text-light dark:bg-dark-4 dark:text-white"
                  }`}
                  onClick={() => {
                    handleHeadingClick(heading);
                  }}
                >
                  {heading}
                </button>
              );
            })}
          </div>
        </header>
        {state.isLoading ? (
          <div className="flex-center h-full w-full p-10">
            <LoaderComponent isGlobalSearch />
          </div>
        ) : (
          <div className="flex flex-col gap-4 overflow-auto py-5">
            <p className="semibold-14 px-4 text-dark-3 dark:text-light-2">
              Top Match:
            </p>
            <GlobalSearchBarList
              searchResults={state.searchResults}
              handleClose={handleClose}
              loadMore={loadMore}
              showButton={state.showButton}
            />
          </div>
        )}
      </section>

      <button
        type="button"
        className="flex"
        onClick={() => fetchSearchResults()}
      >
        <OutlineIcons.Search className="cursor-pointer stroke-sc-4" />
      </button>
      <button
        type="button"
        className="flex cursor-pointer text-xl text-sc-4 lg:hidden"
        onClick={handleClose}
      >
        <IoClose />
      </button>
    </div>
  );
};

export default SearchBar;
