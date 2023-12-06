"use client";

import { useState } from "react";

import { notificationTabs } from "@/constants";

const HorizontalScrollList = () => {
  const [selectedTab, setSelectedTab] = useState("All notifications");

  return (
    <div
      className="flex h-[2.0625rem] cursor-pointer gap-[1.625rem] border-b
        border-light-2 px-5 dark:border-dark-3 xl:h-[2.1875rem] xl:px-[2.06rem]"
    >
      {notificationTabs.map((tab) => {
        const IconComponent = tab.icon;
        const isTabComments = tab.title === "Comments";

        return (
          <button
            key={tab.title}
            className={`${
              selectedTab === tab.title &&
              "border-b border-blue dark:border-blue-80"
            } flex h-[2.0625rem] items-center justify-start gap-2 overflow-visible whitespace-nowrap pb-[0.625rem] 
                text-start hover:opacity-80 hover:transition-opacity xl:h-[2.1875rem]`}
            onClick={() => setSelectedTab(tab.title)}
          >
            {IconComponent && (
              <IconComponent
                className={`${
                  selectedTab === tab.title
                    ? isTabComments
                      ? "stroke-blue dark:stroke-blue-80"
                      : "fill-blue dark:fill-blue-80"
                    : isTabComments
                      ? "stroke-sc-2 dark:stroke-sc-3"
                      : "fill-sc-2 dark:fill-sc-3"
                } shrink-0`}
              />
            )}
            <span
              className={`semibold-14 xl:semibold-16 ${
                selectedTab === tab.title
                  ? "text-blue dark:text-blue-80"
                  : "text-sc-2 dark:text-sc-3"
              }`}
            >
              {tab.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default HorizontalScrollList;
