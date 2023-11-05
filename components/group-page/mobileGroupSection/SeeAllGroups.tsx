import GroupSectionListItem from "@/components/GroupSectionListItem";
import { GroupProps } from "@/types/models";

const SeeAllGroups = ({ allGroups }: { allGroups: GroupProps[] }) => {
  return (
    <ul className="my-2.5 flex flex-col gap-2.5 px-2.5">
      {allGroups.slice(0, 11).map((group) => (
        <GroupSectionListItem
          id={group.id}
          key={group.name}
          groupName={group.name}
          logo={group.logo}
          description={group.description}
        />
      ))}
    </ul>
  );
};

export default SeeAllGroups;
