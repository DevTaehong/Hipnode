import { GroupSectionGroupType } from "@/types";
import GroupSectionListItem from "@/components/GroupSectionListItem";

const SeeAllGroups = ({
  allGroups,
}: {
  allGroups: GroupSectionGroupType[];
}) => {
  return (
    <ul className="my-2.5 flex flex-col gap-2.5 px-2.5">
      {allGroups.slice(0, 10).map((group: GroupSectionGroupType) => (
        <GroupSectionListItem key={group.groupName} group={group} />
      ))}
    </ul>
  );
};

export default SeeAllGroups;
