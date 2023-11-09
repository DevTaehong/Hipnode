import PopularAndNewGroup from "@/components/group-page/mobileGroupSection/PopularAndNewGroup";
import { sectionHeadings } from "@/constants";
import { GroupProps } from "@/types/models";

const PopularAndNewGroups = ({
  mostPopularGroups,
  newlyLaunchedGroups,
}: {
  mostPopularGroups: GroupProps;
  newlyLaunchedGroups: GroupProps;
}) => {
  const headings = sectionHeadings(mostPopularGroups, newlyLaunchedGroups);

  return (
    <>
      {headings.map((group) => (
        <PopularAndNewGroup group={group} key={group.title} />
      ))}
    </>
  );
};

export default PopularAndNewGroups;
