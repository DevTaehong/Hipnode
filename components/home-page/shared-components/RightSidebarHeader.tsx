import { ArrowIcon } from "../../icons/outline-icons";

import { RightSidebarHeaderProps } from "@/types/homepage.index";

const RightSidebarHeader = ({ heading }: RightSidebarHeaderProps) => {
  return (
    <div className="flex items-center pb-[1.25rem]">
      <header className="pr-[0.188rem] text-[1rem] font-semibold text-sc-2 dark:text-light-2">
        {heading}
      </header>
      <ArrowIcon.Right />
    </div>
  );
};

export default RightSidebarHeader;
