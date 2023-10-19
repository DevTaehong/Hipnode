import { newest, followers, popular } from "@/public/images/index";
import SidebarSection from "./SidebarSection";

const sidebarItems = [
  {
    imgSrc: newest,
    imgAlt: "newest and recent",
    title: "Newest",
    subTitle: "and recent",
    description: "Find the latest update",
    imgContainerClass:
      "h-[1.75rem] w-[1.75rem] rounded-md bg-light-3 p-[0.25rem] dark:bg-dark-4",
  },
  {
    imgSrc: popular,
    imgAlt: "popular of the day",
    title: "Popular",
    subTitle: "of the day",
    description: "Shots featured today by curators",
    imgContainerClass:
      "flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-md bg-light-3 dark:bg-dark-4",
  },
  {
    imgSrc: followers,
    imgAlt: "followers",
    title: "Following",
    description: "Explore from your favorite person",
    notification: 24,
    imgContainerClass:
      "h-[1.75rem] w-[1.75rem] rounded-md bg-light-3 p-[0.25rem] dark:bg-dark-4",
  },
];

const Sidebar = () => (
  <aside className="flex w-full flex-row justify-center gap-[0.625rem] rounded-2xl bg-light p-[0.625rem] dark:bg-dark-3 md:flex-col">
    {sidebarItems.map((item, index) => (
      <SidebarSection key={index} {...item} />
    ))}
  </aside>
);

export default Sidebar;
