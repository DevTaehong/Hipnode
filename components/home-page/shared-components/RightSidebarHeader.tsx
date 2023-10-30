import OutlineIcon from "@/components/icons/outline-icons";

import { RightSidebarHeaderProps } from "@/types/homepage";
const RightSidebarHeader = ({ heading }: RightSidebarHeaderProps) => (
  <div className="flex items-center pb-[1.25rem]">
    <header className="pr-[0.188rem] text-[1rem] font-semibold text-sc-2 dark:text-light-2">
      {heading}
    </header>
    <OutlineIcon.ArrowRight />
  </div>
);

export default RightSidebarHeader;
