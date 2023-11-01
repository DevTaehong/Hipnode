import { sectionHeadings } from "@/constants";
import PopularAndNewGroup from "@/components/group-page/mobileGroupSection/PopularAndNewGroup";

const PopularAndNewGroups = () => {
  return (
    <>
      {sectionHeadings.slice(1, 3).map((group) => (
        <PopularAndNewGroup group={group} key={group.title} />
      ))}
    </>
  );
};

export default PopularAndNewGroups;
