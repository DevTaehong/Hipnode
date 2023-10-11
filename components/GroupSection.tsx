"use client";

import { useState } from "react";

import { ArrowIcon } from "./icons/outline-icons";
import GroupSectionListItem from "./GroupSectionListItem";
import GroupSectionHeader from "./GroupSectionHeader";
import { sectionHeadings } from "@/constants";

const OuterDivPattern = () => (
  <>
    <div className="bg-light_dark-4 absolute left-12 top-[-0.3rem] h-3 w-3 rotate-45 rounded-sm" />
    <div className="bg-light_dark-4 absolute left-[3.27rem] top-[-0.45rem] h-[0.125rem] w-[0.2rem] rounded-t-full" />
    <div className="bg-light-2_dark-2 absolute left-[2.53rem] top-[-0.5rem] h-2 w-[0.75rem] rounded-b-full" />
    <div className="bg-light-2_dark-2 absolute left-[3.46rem] top-[-0.5rem] h-2 w-[0.75rem] rounded-b-full" />
  </>
);

const GroupSection = () => {
  const [expandedGroupIndex, setExpandedGroupIndex] = useState<null | number>(
    null
  );
  return (
    <aside
      className={`bg-light_dark-4 relative flex w-56 flex-col rounded-2xl p-2.5 ${
        expandedGroupIndex !== null ? "gap-2.5" : "gap-5"
      }`}
    >
      <OuterDivPattern />
      <figure
        className={`${expandedGroupIndex === null && "hidden"} cursor-pointer`}
        onClick={() => setExpandedGroupIndex(null)}
      >
        <ArrowIcon.Left className="stroke-sc-2 dark:stroke-sc-3" />
      </figure>

      {sectionHeadings.map((section, index) => {
        const { title, bgColor, icon, groups } = section;
        const mappedGroups =
          expandedGroupIndex === index ? groups : groups.slice(0, 3);

        return (
          <section
            key={title}
            className={`flex flex-col gap-2.5 ${
              expandedGroupIndex !== null &&
              expandedGroupIndex !== index &&
              "hidden"
            }`}
          >
            <GroupSectionHeader title={title} bgColor={bgColor} icon={icon} />
            <ul className="flex flex-col gap-2.5">
              {mappedGroups.map((group) => (
                <GroupSectionListItem key={group.groupName} group={group} />
              ))}
            </ul>
            <button
              className={`semibold-9 flex h-3.5 w-fit rounded-full bg-purple-20 px-1 text-purple ${
                expandedGroupIndex !== null && "hidden"
              }`}
              onClick={() => setExpandedGroupIndex(index)}
            >
              See All
            </button>
          </section>
        );
      })}
    </aside>
  );
};

export default GroupSection;
