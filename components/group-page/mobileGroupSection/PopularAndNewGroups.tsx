import PopularAndNewGroup from "@/components/group-page/mobileGroupSection/PopularAndNewGroup";
import { GroupProps } from "@/types/models";
import { getNewPopularSectionHeadings } from "@/utils";

const PopularAndNewGroups = ({
  mostPopularGroups,
  newlyLaunchedGroups,
}: {
  mostPopularGroups: GroupProps;
  newlyLaunchedGroups: GroupProps;
}) => {
  const sectionHeadings = getNewPopularSectionHeadings(
    mostPopularGroups,
    newlyLaunchedGroups
  );

  return (
    <>
      {sectionHeadings.map((group) => (
        <PopularAndNewGroup group={group} key={group.title} />
      ))}
    </>
  );
};

export default PopularAndNewGroups;
