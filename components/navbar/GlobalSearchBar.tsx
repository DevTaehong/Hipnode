"use client";

import { useState, useEffect } from "react";
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

const searchHeadings = ["Post", "Meetup", "Group", "Podcast", "Interview"];

const SearchBar = ({
  additionalStyles,
  setShowSearch,
  showSearchBar,
  setShowSearchBar,
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [activeSearchType, setActiveSearchType] = useState("");
  const [amountToSkip, setAmountToSkip] = useState(0);
  const [searchResults, setSearchResults] = useState<PostResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    let posts;
    if (activeSearchType === "") {
      posts = await getAllSearchBarResults(searchText, 0);
    } else {
      posts = await getSearchBarResults(searchText, activeSearchType, 0);
    }
    if (posts) {
      setIsLoading(false);
    }
    setSearchResults(posts.posts);
    setAmountToSkip(10);
    setShowButton(posts.isMorePosts);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [activeSearchType]);

  const handleHeadingClick = (heading: string) => {
    if (heading === activeSearchType) {
      setActiveSearchType("");
    } else {
      setActiveSearchType(heading);
    }
  };

  const handleClose = () => {
    setShowSearch(false);
    setShowSearchBar(false);
    setSearchText("");
    setActiveSearchType("");
    setAmountToSkip(0);
  };

  const loadMore = () => {
    setAmountToSkip((prev) => prev + 10);
    const fetchSearchResults = async () => {
      let posts: SearchBarResults;
      if (activeSearchType === "") {
        posts = await getAllSearchBarResults(searchText, amountToSkip);
      } else {
        posts = await getSearchBarResults(
          searchText,
          activeSearchType,
          amountToSkip
        );
      }
      setSearchResults((prev) => [...prev, ...posts.posts]);
      setIsLoading(false);
      setShowButton(posts.isMorePosts);
    };
    fetchSearchResults();
  };

  const handleFocus = () => {
    setShowSearchBar(true);
    setShowSearch(true);
  };

  return (
    <div
      className={`${additionalStyles} z-20 -translate-y-2 items-center gap-2 rounded-lg bg-light-2 px-5 py-3 lg:relative lg:mx-0 lg:flex lg:w-full lg:max-w-[27.5rem] lg:translate-y-0 lg:py-2 dark:bg-dark-4`}
    >
      <Input
        type="text"
        placeholder="Type here to search..."
        className="no-focus flex border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={handleFocus}
      />
      <div
        className={`${
          showSearchBar ? "flex" : "hidden"
        } absolute top-14 h-fit max-h-[80vh] w-full -translate-x-5 flex-col rounded-lg bg-light lg:top-12 lg:max-h-[20rem] dark:bg-dark-2`}
      >
        <div className="flex h-[3.75rem] gap-4 border-b border-sc-6 p-4 dark:border-dark-4">
          <p className="semibold-14 text-dark-3 dark:text-light-2">Type:</p>
          <div className="flex gap-2.5 overflow-x-scroll">
            {searchHeadings.map((heading) => {
              const isActive = heading === activeSearchType;
              return (
                <div
                  key={heading}
                  className={`semibold-9 flex-center h-[1.625rem] w-[3.75rem] shrink-0 cursor-pointer rounded-full ${
                    isActive
                      ? "bg-red-90 text-light"
                      : "bg-sc-6 text-sc-2 hover:bg-red-90 hover:text-light dark:bg-dark-4 dark:text-white"
                  }`}
                  onClick={() => {
                    handleHeadingClick(heading);
                    setAmountToSkip(0);
                  }}
                >
                  {heading}
                </div>
              );
            })}
          </div>
        </div>
        {isLoading ? (
          <div className="flex-center h-full w-full p-10">
            <LoaderComponent isGlobalSearch />
          </div>
        ) : (
          <div className="flex flex-col gap-4 overflow-auto py-5">
            <p className="semibold-14 px-4 text-dark-3 dark:text-light-2">
              Top Match:
            </p>
            <GlobalSearchBarList
              searchResults={searchResults}
              handleClose={handleClose}
              loadMore={loadMore}
              showButton={showButton}
            />
          </div>
        )}
      </div>

      <div className="flex" onClick={() => fetchSearchResults()}>
        <OutlineIcons.Search className="cursor-pointer stroke-sc-4" />
      </div>
      <div
        className="flex cursor-pointer text-xl text-sc-4 lg:hidden"
        onClick={handleClose}
      >
        <IoClose />
      </div>
    </div>
  );
};

export default SearchBar;
