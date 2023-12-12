import SidebarSection from "./SidebarSection";
import { sidebarItems } from "@/constants/index";

const Sidebar = () => (
  <aside className="flex h-fit w-full flex-row justify-between gap-[0.625rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3 lg:flex-col lg:justify-center lg:p-[0.625rem]">
    {sidebarItems.map((item, index) => (
      <SidebarSection key={index} {...item} />
    ))}
  </aside>
);

export default Sidebar;
