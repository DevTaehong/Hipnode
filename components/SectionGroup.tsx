import { GroupSectionGroupType, HeadingsType } from "@/types";
import GroupSectionHeader from "./GroupSectionHeader";
import GroupSectionListItem from "./GroupSectionListItem";

type SectionGroupProps = {
  section: HeadingsType;
  index: number;
  expandedGroupIndex: number | null;
  setExpandedGroupIndex: (index: number | null) => void;
};

const SectionGroup = ({
  section,
  index,
  expandedGroupIndex,
  setExpandedGroupIndex,
}: SectionGroupProps) => {
  const { title, bgColor, icon, groups } = section;
  const mappedGroups =
    expandedGroupIndex === index ? groups : groups.slice(0, 3);
  const isHidden = expandedGroupIndex !== null && expandedGroupIndex !== index;

  return (
    <section
      key={title}
      className={`flex flex-col gap-2.5 ${isHidden && "hidden"}`}
    >
      <GroupSectionHeader title={title} bgColor={bgColor} icon={icon} />
      <ul className="flex flex-col gap-2.5">
        {mappedGroups.map((group: GroupSectionGroupType) => (
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
};

export default SectionGroup;
