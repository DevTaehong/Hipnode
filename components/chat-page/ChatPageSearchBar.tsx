import React from "react";
import OutlineIcon from "../icons/outline-icons";

const ChatPageSearchBar = () => {
  return (
    <section
      className="flex border-b border-sc-6 bg-light px-4 pb-3 dark:border-dark-4
    dark:bg-dark-2"
    >
      <div className="flex w-full justify-between gap-3 rounded-lg bg-sc-6 px-5 py-3 dark:bg-dark-4">
        <input
          className="w-full bg-sc-6 text-sc-4 outline-none dark:bg-dark-4"
          placeholder="Type here to search..."
        />
        <OutlineIcon.Search className="cursor-pointer stroke-sc-4" />
      </div>
    </section>
  );
};

export default ChatPageSearchBar;
