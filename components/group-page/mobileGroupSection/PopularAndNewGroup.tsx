import { colorVariants } from "@/components/GroupSectionHeader";
import GroupSectionListItem from "@/components/GroupSectionListItem";
import { mostPopularGroups, newlyLaunchedGroups } from "@/constants";
import { GroupSectionGroupType, GroupSectionHeaderProps } from "@/types";
import SeeAllButton from "@/components/group-page/mobileGroupSection/SeeAllButton";

const PopularAndNewGroup = ({ group }: { group: GroupSectionHeaderProps }) => {
  const Icon = group.icon;

  return (
    <>
      <div
        className={`flex flex-row justify-between rounded-[0.625rem] ${
          colorVariants[group.bgColor]
        } mt-5 p-2.5`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-[0.38rem]">
            <Icon />
            <h6 className="semibold-16 text-sc-2">{group.title}</h6>
          </div>
          <p className="regular-10 text-sc-3">
            List updated daily at midnight PST.
          </p>
        </div>
      </div>
      <ul className="my-2.5 flex flex-col gap-2.5 px-2.5">
        {group.title === "Most Popular"
          ? mostPopularGroups
              .slice(0, 3)
              .map((group: GroupSectionGroupType) => (
                <GroupSectionListItem key={group.groupName} group={group} />
              ))
          : newlyLaunchedGroups
              .slice(0, 3)
              .map((group: GroupSectionGroupType) => (
                <GroupSectionListItem key={group.groupName} group={group} />
              ))}
      </ul>
      <div className="px-2.5">
        <SeeAllButton groups={group.title} />
      </div>
    </>
  );
};

export default PopularAndNewGroup;
