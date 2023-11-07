import SeeAllButton from "@/components/group-page/mobileGroupSection/SeeAllButton";
import GroupSectionListItem from "@/components/GroupSectionListItem";
import { GroupProps } from "@/types/models";

const FastestGrowingGroups = ({
  fastestGrowingGroups,
}: {
  fastestGrowingGroups: GroupProps;
}) => {
  return (
    <div className="m-2.5 mb-5 flex flex-col gap-2.5">
      <ul className="flex flex-col gap-2.5">
        {fastestGrowingGroups.slice(0, 3).map((group) => (
          <GroupSectionListItem
            id={group.id}
            key={group.name}
            groupName={group.name}
            logo={group.logo ?? "/images/hipnode.svg"}
            description={group.description ?? "N/A"}
          />
        ))}
      </ul>
      <SeeAllButton groups="fastest-growing" />
    </div>
  );
};

export default FastestGrowingGroups;
