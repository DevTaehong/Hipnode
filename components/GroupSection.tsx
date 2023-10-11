"use client";

import { useState } from "react";

import { ArrowIcon } from "./icons/outline-icons";
import GroupSectionListItem from "./GroupSectionListItem";
import GroupSectionHeader from "./GroupSectionHeader";
import FillIcon from "./icons/fill-icons";
import { christopher, santiago, negan } from "@/public/assets";

const fastestGrowingGroups = [
  {
    icon: christopher,
    groupDescription: "Lorem ipsum dolor sit amet consectetur",
    groupName: "Lorem ipsum dolor",
  },
  {
    icon: christopher,
    groupDescription: "Adipiscing elit, sed do eiusmod tempor",
    groupName: "Sit amet consectetur",
  },
  {
    icon: christopher,
    groupDescription: "Incididunt ut labore et dolore magna",
    groupName: "Adipiscing elit duis",
  },
  {
    icon: christopher,
    groupDescription: "Aliqua enim ad minim veniam quis",
    groupName: "Tristique sollicitudin nibh",
  },
  {
    icon: christopher,
    groupDescription: "Nostrud exercitation ullamco laboris nisi ut",
    groupName: "Sit amet commodo",
  },
  {
    icon: christopher,
    groupDescription: "Nostrud exercitation ex ea commodo",
    groupName: "Odio aenean sed",
  },
  {
    icon: christopher,
    groupDescription: "Aliquip ex ea commodo consequat duis",
    groupName: "Adipiscing diam donec",
  },
  {
    icon: christopher,
    groupDescription: "Aute irure dolor in reprehenderit in",
    groupName: "Amet venenatis urna",
  },
  {
    icon: christopher,
    groupDescription: "Voluptate velit esse cillum dolore eu",
    groupName: "Cursus eget nunc",
  },
  {
    icon: christopher,
    groupDescription: "Fugiat nulla pariatur excepteur sint occaeca",
    groupName: "Scelerisque viverra mauris",
  },
];

const mostPopularGroups = [
  {
    icon: santiago,
    groupDescription: "Praesent sapien massa, convallis a pellentesque",
    groupName: "Vivamus suscipit tortor",
  },
  {
    icon: santiago,
    groupDescription: "Donec sollicitudin molestie malesuada curabitur",
    groupName: "Non nulla sit",
  },
  {
    icon: santiago,
    groupDescription: "Nulla porttitor accumsan tincidunt vestibulum",
    groupName: "Ac felis donec",
  },
  {
    icon: santiago,
    groupDescription: "Sed augue lacus viverra vitae congue",
    groupName: "Eu augue ut",
  },
  {
    icon: santiago,
    groupDescription: "Eu sem integer vitae justo eget",
    groupName: "Magnis dis parturient",
  },
  {
    icon: santiago,
    groupDescription: "Felis bibendum ut tristique et egestas",
    groupName: "Purus viverra accumsan",
  },
  {
    icon: santiago,
    groupDescription: "Pellentesque elit eget gravida cum sociis",
    groupName: "Natoque penatibus magnis",
  },
  {
    icon: santiago,
    groupDescription: "Purus in mollis nunc sed id",
    groupName: "Semper risus in",
  },
  {
    icon: santiago,
    groupDescription: "Donec pretium vulputate sapien nec sagittis",
    groupName: "Aliquam malesuada bibendum",
  },
  {
    icon: santiago,
    groupDescription: "Aliquam faucibus purus in massa tempor",
    groupName: "Nec dui nunc",
  },
];

const newlyLaunchedGroups = [
  {
    icon: negan,
    groupDescription: "Viverra mauris in aliquam sem fringilla",
    groupName: "Ullamcorper dignissim cras",
  },
  {
    icon: negan,
    groupDescription: "Risus pretium quam vulputate dignissim suspendisse",
    groupName: "Ultrices gravida dictum",
  },
  {
    icon: negan,
    groupDescription: "Nisl purus in mollis nunc sed",
    groupName: "Id interdum velit",
  },
  {
    icon: negan,
    groupDescription: "Enim nunc faucibus a pellentesque sit",
    groupName: "Amet tellus cras",
  },
  {
    icon: negan,
    groupDescription: "Feugiat in ante metus dictum at",
    groupName: "Tempor commodo ullamcorper",
  },
  {
    icon: negan,
    groupDescription: "Turpis egestas maecenas pharetra convallis posuere",
    groupName: "Morbi tristique senectus",
  },
  {
    icon: negan,
    groupDescription: "Consequat semper viverra nam libero justo",
    groupName: "Laoreet sit amet",
  },
  {
    icon: negan,
    groupDescription: "Leo urna molestie at elementum eu",
    groupName: "Facilisis lacinia egestas",
  },
  {
    icon: negan,
    groupDescription: "Eros donec ac odio tempor orci",
    groupName: "Dapibus ultrices in",
  },
  {
    icon: negan,
    groupDescription: "Ac orci phasellus egestas tellus rutrum",
    groupName: "Consectetur adipiscing elit",
  },
];

const sectionHeadings = [
  {
    title: "Fastest Growing",
    icon: FillIcon.Growing,
    bgColor: "bgYellow",
    groups: fastestGrowingGroups,
  },
  {
    title: "Most Popular",
    icon: FillIcon.Fire,
    bgColor: "bgRed",
    groups: mostPopularGroups,
  },
  {
    title: "Newly Launched",
    icon: FillIcon.Rocket,
    bgColor: "bgBlue",
    groups: newlyLaunchedGroups,
  },
];

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
