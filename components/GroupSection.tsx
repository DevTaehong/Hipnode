"use client";

import { useState } from "react";

import { ArrowIcon } from "./icons/outline-icons";
import { sectionHeadings } from "@/constants";
import { HeadingsType } from "@/types";
import SectionGroup from "./SectionGroup";

const TopPointDecoration = () => (
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
      <TopPointDecoration />
      <figure
        className={`${expandedGroupIndex === null && "hidden"} cursor-pointer`}
        onClick={() => setExpandedGroupIndex(null)}
      >
        <ArrowIcon.Left className="stroke-sc-2 dark:stroke-sc-3" />
      </figure>

      {sectionHeadings.map((section: HeadingsType, index: number) => (
        <SectionGroup
          key={section.title}
          section={section}
          index={index}
          expandedGroupIndex={expandedGroupIndex}
          setExpandedGroupIndex={setExpandedGroupIndex}
        />
      ))}
    </aside>
  );
};

export default GroupSection;