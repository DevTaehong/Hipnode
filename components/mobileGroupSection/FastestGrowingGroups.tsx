import SeeAllButton from "@/components/mobileGroupSection/SeeAllButton";
import { fastestGrowingGroups } from "@/constants";
import { GroupSectionGroupType } from "@/types";
import GroupSectionListItem from "../GroupSectionListItem";

const FastestGrowingGroups = () => {
  return (
    <div className="m-2.5 mb-5 flex flex-col gap-2.5">
      <ul className="flex flex-col gap-2.5">
        {fastestGrowingGroups
          .slice(0, 3)
          .map((group: GroupSectionGroupType) => (
            <GroupSectionListItem key={group.groupName} group={group} />
          ))}
      </ul>
      <SeeAllButton groups="fastest-growing" />
    </div>
  );
};

export default FastestGrowingGroups;
